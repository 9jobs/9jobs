# Admin Agreement Hardcoded Login Design

Date: 2026-06-30

## Summary

This change replaces the current database-backed admin login experience with a single protected admin sign-in backed by environment variables. The admin login page will be simplified into one secure access card with only sign-in fields. After a successful login, the agreement workflow will create the agreement record, automatically generate the agreement PDF, show the preview on the agreement detail page, and send that same generated PDF to the client through DocuSign.

The goal is to make the admin access reliable, remove unused auth paths from the UI, and ensure the PDF shown in preview is the exact PDF sent for signature.

## Goals

- Fix admin login failures when the correct email and password are entered.
- Use a single admin login based on `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`.
- Remove sign-up and forgot-password controls from the admin login experience.
- Present the login form inside a secure access card matching the current agreement-console layout direction.
- Automatically generate the agreement PDF after agreement creation.
- Show the generated PDF as a preview from the agreement detail page.
- Ensure the DocuSign send action uses the same generated PDF that the preview route serves.

## Non-Goals

- Rebuilding the full agreement template or changing contract clauses.
- Introducing multi-admin account management.
- Reintroducing sign-up, password reset, or self-service account recovery in the UI.
- Changing signed-PDF webhook handling beyond what is required for consistency with the generated-PDF flow.

## Current State

The current codebase already contains:

- An admin login page and login API route.
- A credentials verifier that reads `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`.
- Database-oriented admin auth logic that the login API currently uses instead of the env-based verifier.
- Agreement creation, PDF generation, PDF preview, and DocuSign send routes.

The main problems are:

1. The login UI still exposes sign-up and forgot-password modes that are no longer desired.
2. The login API uses database auth instead of the env-based credentials verifier, which can cause valid credentials to fail.
3. The agreement flow requires extra manual coordination to ensure preview generation happens before send.

## Proposed Design

### 1. Admin Authentication

The admin login flow will use environment-backed credentials only.

- The login API route will validate the payload with the existing login schema.
- The route will call the env-based credentials verifier instead of the database-backed `authenticateAdminUser()` path.
- On success, the route will create the existing admin session cookie and redirect behavior will remain unchanged.
- On failure, the route will continue returning a clear `Invalid admin credentials.` message.
- If `ADMIN_EMAIL` or `ADMIN_PASSWORD_HASH` are missing, the route will return a controlled server error so the configuration issue is visible instead of looking like a bad password.

This keeps the existing session/cookie model while replacing the fragile credential source.

### 2. Admin Login UI

The login page will become a single-mode protected admin sign-in screen.

- The right-side auth card will remain the primary sign-in surface.
- The card will show one mode only: secure sign-in.
- Sign-up and forgot-password tabs, buttons, and state management will be removed from the form.
- The copy will focus on secure contract creation, preview, and DocuSign delivery.
- The card should feel closer to the provided visual direction: a clear secure-access label, one login action, and less noise around the fields.

The surrounding left-side marketing panel can stay, but the login experience must read as a protected internal tool instead of a public auth flow.

### 3. Agreement Creation Flow

Agreement creation will become a create-and-generate flow.

- The agreement form will continue to validate inputs with the existing agreement schema.
- After the agreement record is created successfully, the client will trigger or receive an automatic generated-PDF step before landing on the agreement detail page.
- The redirect target remains the agreement detail page so the admin can review the result immediately.

Implementation detail:

- Preferred approach: perform PDF generation on the server side as part of the create agreement flow, or immediately after creation in the same user action, so the preview is ready when the detail page opens.
- If the current route boundaries make that awkward, the client may create the agreement first and then immediately call the existing generate-PDF route before navigation completes. The final user-visible behavior must still feel automatic.

### 4. PDF Preview

The agreement detail page will show the generated PDF as the primary review artifact.

- If a generated PDF exists, the detail page will render a preview frame or a highly visible preview link.
- The preview source will remain the existing generated-PDF preview route.
- The preview must be available without asking the admin to click generate first during the normal happy path.
- If preview generation fails, the UI must clearly surface the error and offer a retry.

This preserves the current preview endpoint while making it part of the default workflow.

### 5. DocuSign Send Flow

The DocuSign send action will continue to use the existing send route, but the route will be treated as dependent on the generated PDF.

- The send action will use the generated PDF buffer, not a separate ad hoc document build.
- If a generated PDF does not yet exist, the backend may generate and store it before send as a fallback.
- The envelope creation payload must continue using the exact generated PDF buffer retrieved by the agreement service.

Expected result:

- The admin sees one PDF in preview.
- The client receives that same PDF through DocuSign.

This is the core consistency guarantee for the feature.

## Data and Configuration

### Environment Variables

Required:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

Behavior:

- Email comparison stays case-insensitive.
- Password verification remains bcrypt-hash based.

No new persistent database tables or models are required for login.

### Agreement Data

The existing agreement model and stored generated-PDF fields remain the source of truth.

No schema redesign is required as long as:

- the generated PDF can be stored or referenced after creation
- the preview route can retrieve it
- the DocuSign send route can retrieve the same asset

## Error Handling

### Login

- Invalid email/password: return `401` with `Invalid admin credentials.`
- Missing env credentials: return `500` with a controlled configuration error message.
- Rate limit behavior remains in place.

### Agreement Creation and PDF Generation

- If agreement creation fails, show the existing create-agreement error toast.
- If PDF generation fails after create succeeds, preserve the agreement and show a retryable error state on the detail page.
- If preview is unavailable, render a clear fallback message and a regenerate action.

### DocuSign

- If DocuSign send fails, keep the agreement record intact and show the backend error in the existing toast pattern.
- If no generated PDF can be resolved, block send with a clear response instead of attempting to continue silently.

## Testing Strategy

Update and add focused coverage for:

1. Admin login API
   - accepts valid env-backed credentials
   - rejects invalid credentials
   - handles missing env configuration predictably

2. Admin login UI
   - renders sign-in only
   - does not render sign-up or forgot-password controls

3. Agreement flow
   - create agreement leads to generated preview availability
   - preview route returns the generated PDF
   - DocuSign send uses the generated PDF path

4. Regression checks
   - existing signed-PDF preview/download behavior still works
   - protected admin routes still require session auth

## Implementation Plan Shape

Expected touched areas:

- `frontend/components/admin/AdminLoginForm.js`
- `frontend/app/admin/login/page.js`
- `frontend/app/api/admin/login/route.js`
- `frontend/lib/admin/auth/credentials.js`
- agreement creation client/server flow files
- agreement detail page and action components
- affected tests under `frontend/tests/`

## Risks and Mitigations

### Risk: Missing production environment configuration

Mitigation:

- Fail loudly with a controlled server response.
- Document that the bcrypt hash must be present before release.

### Risk: Automatic PDF generation adds latency after create

Mitigation:

- Keep generation in the existing service path.
- Provide visible loading state during create.
- Prefer navigating only after the preview is ready, or show a clear pending state on the detail page.

### Risk: Preview and sent PDF diverge

Mitigation:

- Always source DocuSign send from the stored generated PDF buffer.
- Keep one authoritative generated-PDF retrieval path in the agreement service.

## Acceptance Criteria

- Admin can log in successfully with the configured env email and password hash.
- Login page shows only the secure sign-in experience.
- No sign-up or forgot-password controls appear on the admin login card.
- Creating an agreement leads to an available generated PDF preview without a separate manual generate step in the normal flow.
- Sending via DocuSign uses the same generated PDF shown in preview.
- Existing signed-PDF completion, preview, and download behaviors continue to work.
