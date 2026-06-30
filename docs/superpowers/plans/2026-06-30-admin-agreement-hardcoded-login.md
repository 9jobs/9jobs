# Admin Agreement Hardcoded Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken DB-backed admin login with a single env-backed admin sign-in, simplify the login UI, and make agreement creation auto-generate the same PDF that is previewed and sent through DocuSign.

**Architecture:** Keep the current admin session and agreement storage model, but swap the login route to use the existing env credential verifier. On agreement creation, reuse the existing PDF generation service so the detail page opens with a ready preview and the DocuSign send route continues using the generated document as the single source of truth.

**Tech Stack:** Next.js App Router, React 19, Jest, Mongoose, PDFKit, DocuSign integration helpers

---

### Task 1: Lock env-backed admin login with tests first

**Files:**
- Modify: `frontend/tests/admin-login-route.test.js`
- Modify: `frontend/app/api/admin/login/route.js`
- Modify: `frontend/lib/admin/auth/credentials.js`

- [ ] **Step 1: Write the failing login-route tests**

Add coverage for:
- valid env-backed login
- invalid env-backed login
- missing env configuration

```js
test('logs an admin in with valid env credentials', async () => {
  process.env.ADMIN_EMAIL = 'admin@9jobs.co';
  process.env.ADMIN_PASSWORD_HASH = await bcrypt.hash('super-secret', 4);
  const response = await loginPost(validLoginRequest);
  expect(response.status).toBe(200);
});

test('returns a configuration error when env credentials are missing', async () => {
  delete process.env.ADMIN_EMAIL;
  delete process.env.ADMIN_PASSWORD_HASH;
  const response = await loginPost(validLoginRequest);
  expect(response.status).toBe(500);
});
```

- [ ] **Step 2: Run the login-route tests to verify they fail**

Run: `npm test -- --runInBand tests/admin-login-route.test.js`
Expected: FAIL because the route still calls `authenticateAdminUser()` instead of the env verifier.

- [ ] **Step 3: Implement env-backed login route**

Update the route to import and call `verifyAdminCredentials()` and create the admin session payload from the submitted email.

```js
const isValidAdmin = await verifyAdminCredentials(credentials);

if (!isValidAdmin) {
  return NextResponse.json({ error: 'Invalid admin credentials.' }, { status: 401 });
}

const token = await createAdminSessionToken({
  email: credentials.email.trim().toLowerCase(),
  name: '9Jobs Admin',
});
```

- [ ] **Step 4: Tighten credentials verifier error handling**

Keep bcrypt verification but trim and normalize the env email and throw a configuration error only when env values are absent.

```js
if (!adminEmail || !adminPasswordHash) {
  throw new Error('Admin credentials are not configured.');
}
```

- [ ] **Step 5: Re-run the login-route tests**

Run: `npm test -- --runInBand tests/admin-login-route.test.js`
Expected: PASS

### Task 2: Simplify the admin login UI into a single secure sign-in card

**Files:**
- Modify: `frontend/components/admin/AdminLoginForm.js`
- Modify: `frontend/app/admin/login/page.js`
- Modify: `frontend/app/globals.css`

- [ ] **Step 1: Write the failing login UI test**

Add a render-level test that proves the form only shows sign-in affordances and does not render sign-up or forgot-password controls.

```js
expect(screen.getByRole('heading', { name: /admin login/i })).toBeTruthy();
expect(screen.queryByText(/sign up/i)).toBeNull();
expect(screen.queryByText(/forgot password/i)).toBeNull();
```

- [ ] **Step 2: Run the UI test to verify it fails**

Run: `npm test -- --runInBand tests/admin-login-ui.test.js`
Expected: FAIL because the current component still renders multi-mode auth controls.

- [ ] **Step 3: Replace the multi-mode client logic with a sign-in-only form**

Keep only email, password, error state, pending state, and submit behavior.

```js
<form className="admin-auth-card" onSubmit={handleSubmit}>
  <p className="admin-auth-card__eyebrow">Secure Access</p>
  <h2>Admin Login</h2>
  <p className="admin-auth-card__text">Protected sign-in for agreement preview and DocuSign delivery.</p>
  ...
</form>
```

- [ ] **Step 4: Update the page copy and CSS to match the secure card direction**

Adjust the left-panel copy and remove switcher/footer styles that no longer apply. Add card polish for a tighter internal-tool feel.

- [ ] **Step 5: Re-run the UI test**

Run: `npm test -- --runInBand tests/admin-login-ui.test.js`
Expected: PASS

### Task 3: Make agreement creation auto-generate the preview PDF

**Files:**
- Create: `frontend/tests/agreements-route.test.js`
- Modify: `frontend/app/api/agreements/route.js`
- Modify: `frontend/lib/agreements/service.js`
- Modify: `frontend/components/admin/AgreementForm.js`

- [ ] **Step 1: Write the failing agreement-create route test**

Cover that `POST /api/agreements` returns a created agreement with preview readiness and that PDF generation is invoked as part of the flow.

```js
expect(createAgreement).toHaveBeenCalled();
expect(generateAndStoreAgreementPdf).toHaveBeenCalled();
expect(body.previewUrl).toBe('/api/agreements/agreement-1/preview-pdf');
```

- [ ] **Step 2: Run the agreement route test to verify it fails**

Run: `npm test -- --runInBand tests/agreements-route.test.js`
Expected: FAIL because the route currently creates the agreement only.

- [ ] **Step 3: Update the agreement route to generate the PDF after create**

Load the created agreement document and call `generateAndStoreAgreementPdf()` before responding.

```js
const createdAgreement = await createAgreement(payload);
const agreementDocument = await getAgreementDocumentById(createdAgreement._id);
const result = await generateAndStoreAgreementPdf(agreementDocument);
return NextResponse.json({ agreement: result.agreement, previewUrl: `/api/agreements/${result.agreement._id}/preview-pdf` }, { status: 201 });
```

- [ ] **Step 4: Update the client form submit flow**

After a successful create response, navigate directly to the detail page that already has a generated preview.

```js
router.push(`/admin/agreements/${data.agreement._id}`);
```

- [ ] **Step 5: Re-run the agreement route test**

Run: `npm test -- --runInBand tests/agreements-route.test.js`
Expected: PASS

### Task 4: Make the agreement detail page default to preview-ready behavior

**Files:**
- Modify: `frontend/app/admin/agreements/[id]/page.js`
- Modify: `frontend/components/admin/AgreementActions.js`
- Modify: `frontend/app/globals.css`

- [ ] **Step 1: Write the failing agreement detail behavior test**

Add coverage that a generated PDF renders preview UI by default and that the CTA wording reflects preview readiness.

```js
expect(screen.getByTitle(/agreement pdf preview/i)).toBeTruthy();
expect(screen.getByRole('button', { name: /regenerate preview/i })).toBeTruthy();
```

- [ ] **Step 2: Run the detail test to verify it fails if needed**

Run: `npm test -- --runInBand tests/agreement-detail-page.test.js`
Expected: FAIL if preview-only state is not rendered consistently.

- [ ] **Step 3: Update action labels and empty state copy**

The agreement detail page should assume preview exists in the happy path and the regenerate button should remain available.

```js
{hasGeneratedPdf ? 'Regenerate Preview' : 'Generate Preview'}
```

- [ ] **Step 4: Keep DocuSign send bound to the generated PDF**

Do not change the send route contract; preserve the fallback generation behavior there as a guardrail.

- [ ] **Step 5: Re-run the detail test**

Run: `npm test -- --runInBand tests/agreement-detail-page.test.js`
Expected: PASS

### Task 5: Run targeted regression verification

**Files:**
- Modify as needed based on test failures under `frontend/tests/`

- [ ] **Step 1: Run targeted admin/auth/agreement regressions**

Run:
`npm test -- --runInBand tests/admin-login-route.test.js tests/admin-protected-routes.test.js tests/agreements-route.test.js tests/agreement-template.test.js tests/agreement-schema.test.js`

Expected: PASS

- [ ] **Step 2: Run DocuSign regression coverage**

Run:
`npm test -- --runInBand tests/docusign-status.test.js tests/docusign-callback.test.js`

Expected: PASS

- [ ] **Step 3: Run any new UI behavior tests added in Tasks 2 and 4**

Run:
`npm test -- --runInBand tests/admin-login-ui.test.js tests/agreement-detail-page.test.js`

Expected: PASS

- [ ] **Step 4: Review the spec against final behavior**

Confirm:
- login is env-backed
- signup/forgot are removed from login UI
- agreement create auto-generates preview
- previewed PDF is the same PDF sent to DocuSign

- [ ] **Step 5: Summarize any remaining gaps honestly**

If browser-level verification cannot be run in this session, state that explicitly and report the exact automated evidence collected.
