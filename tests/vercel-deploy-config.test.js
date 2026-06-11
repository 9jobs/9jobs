const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

describe('Vercel deployment config', () => {
  test('frontend production deploy runs the package build script', () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(root, 'frontend/vercel.json'), 'utf8'));
    const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'frontend/package.json'), 'utf8'));

    expect(vercelConfig.buildCommand).toBe('npm run build');
    expect(packageJson.scripts.build).toBe('next build');
    expect(packageJson.scripts.postbuild).toBe('node scripts/ensure-vercel-manifest.cjs');
  });

  test('postbuild mirrors deterministic routes manifest for Vercel build hooks', () => {
    const script = fs.readFileSync(path.join(root, 'frontend/scripts/ensure-vercel-manifest.cjs'), 'utf8');

    expect(script).toContain('routes-manifest-deterministic.json');
    expect(script).toContain('process.env.VERCEL');
    expect(script).toContain('path.basename(process.cwd())');
    expect(script).toContain('fs.mkdirSync');
    expect(script).toContain('fs.symlinkSync');
    expect(script).toContain('node_modules');
  });
});
