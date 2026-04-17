// Folder structure for API and Hybrid automation support:
//
// utils/
//   apiHelpers.ts         <-- Reusable API utility layer
// tests/
//   api/
//     createUser.api.spec.ts    <-- Example API-only test (@api)
//   hybrid/
//     userSignupAndLogin.hybrid.spec.ts  <-- Example API+UI hybrid test (@hybrid)
//
// All tests use Playwright's APIRequestContext and follow enterprise-grade validation and tagging.
//
// To run tests by tag:
//   npx playwright test --grep @api      # API-only tests
//   npx playwright test --grep @hybrid   # Hybrid API+UI tests
//   npx playwright test --grep @ui       # UI-only tests
//
// All tests share the same Playwright config and can be run independently.
