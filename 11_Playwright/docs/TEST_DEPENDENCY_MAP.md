# Test Dependency Map

`Config` means the root `playwright.config.js` unless noted. `None` means the source has no such dependency. `Practice Library` entries are intentionally excluded by `testIgnore: ['practice/**']`; they have no Playwright project and no root-config run command.

## tests/e2e/interaction-workflows/interaction-workflows.spec.js

- Playwright Project: `demo-e2e-chromium`; Test Type: deterministic UI E2E.
- Config: `playwright.config.js` (`e2e/**/*.spec.js`, Desktop Chrome channel, optional `BASE_URL`).
- Base Fixture / Extended Fixtures: Playwright base fixture extended by `fixtures/demo-app.fixture.js` overriding `page` (test scope, manual).
- Page Objects / API Clients: None; Resources: `resources/demo-pages.resource.js` through the fixture.
- Test Data / Helpers: `data/upload-files.data.js`; no helper, schema, auth, or storage state.
- Environment / Setup: optional `BASE_URL`; no global/auth/setup dependency.
- Direct Imports: custom fixture and upload data. Indirect Dependencies: `@playwright/test` and demo page resources. Owner: PROJECT-SPECIFIC.
- Run Command: `npx.cmd playwright test --project=demo-e2e-chromium`.

Dependency Flow: `playwright.config.js → demo-e2e-chromium → demo-app.fixture.js → demo-pages.resource.js → interaction-workflows.spec.js`, with `upload-files.data.js` imported by the spec.

## tests/practice/all-practice/BTM.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: UI practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Environment Variables: None; Owner Classification: TEST-SPECIFIC / UNREGISTERED.
- Run Command: none until a dedicated practice project is registered.

## tests/practice/all-practice/Data Table.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: non-executable code snippet; it has no Playwright import or `test()` call.
- Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup, Environment: None detected.
- Direct / Indirect Dependencies: None; Owner Classification: OBSOLETE OR INCOMPLETE PRACTICE MATERIAL.
- Run Command: none; do not register without converting it to a valid test.

## tests/practice/all-practice/From Validation Assertions.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: UI assertion practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Environment Variables: None; Owner Classification: TEST-SPECIFIC / UNREGISTERED.
- Run Command: none until a dedicated practice project is registered.

## tests/practice/all-practice/Login From.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: locator practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Environment Variables: None; Owner Classification: TEST-SPECIFIC / UNREGISTERED.
- Run Command: none until a dedicated practice project is registered.

## tests/practice/all-practice/LOV.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: UI selection/sort practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Environment Variables: None; Owner Classification: TEST-SPECIFIC / UNREGISTERED.
- Run Command: none until a dedicated practice project is registered.

## tests/practice/all-practice/Modal Dialog.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: non-executable code snippet; it has no Playwright import or `test()` call.
- Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup, Environment: None detected.
- Direct / Indirect Dependencies: None; Owner Classification: OBSOLETE OR INCOMPLETE PRACTICE MATERIAL.
- Run Command: none; do not register without converting it to a valid test.

## tests/practice/all-practice/Multi-step.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: checkout UI practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Environment Variables: None; Owner Classification: TEST-SPECIFIC / UNREGISTERED.
- Run Command: none until a dedicated practice project is registered.

## tests/practice/all-practice/Navigation Menu.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: non-executable code snippet; it has no Playwright import or `test()` call.
- Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup, Environment: None detected.
- Direct / Indirect Dependencies: None; Owner Classification: OBSOLETE OR INCOMPLETE PRACTICE MATERIAL.
- Run Command: none; do not register without converting it to a valid test.

## tests/practice/all-practice/product-item.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: non-executable code snippet; it has no Playwright import or `test()` call.
- Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup, Environment: None detected.
- Direct / Indirect Dependencies: None; Owner Classification: OBSOLETE OR INCOMPLETE PRACTICE MATERIAL.
- Run Command: none; do not register without converting it to a valid test.

## tests/practice/all-practice/reading.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: mixed UI interaction practice; Fixture, Resource, Support, Page Object, API Client, Auth/Setup: None.
- Test Data: inline form values and relative file paths; this is MIXED RESPONSIBILITY.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered and made self-contained.

## tests/practice/all-practice/Shopping Cart Count.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: UI cart practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered.

## tests/practice/fundamentals/set1-locators.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: locator practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered.

## tests/practice/fundamentals/set2-interaction.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: interaction practice; Fixture, Resource, Support, Page Object, API Client, Auth/Setup: None.
- Test Data: inline values and a relative upload path; MIXED RESPONSIBILITY.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered and supplied with data.

## tests/practice/fundamentals/set3-assertions.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: assertion practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered.

## tests/practice/fundamentals/set4-pom.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: POM practice; Page Object: `CheckoutPage` embedded in the specification (MIXED RESPONSIBILITY).
- Fixture, Resource, Support, API Client, Data, Auth/Setup: None; Environment: none.
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until page object is extracted and the project is registered.

## tests/practice/fundamentals/set5-api-mocking.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: UI/API mocking practice; Fixture, Resource, Support, Page Object, Data, Auth/Setup: None.
- API behavior and request validation are embedded in the specification (MIXED RESPONSIBILITY).
- Direct Imports: `@playwright/test`; Indirect Dependencies: Playwright only; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until registered.

## tests/practice/fundamentals/set6-e2e-complete.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: public-site E2E practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: the external demo site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until a separately owned public-site project is registered.

## tests/practice/sandbox/API NewEndpoint.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: API and schema-validation practice; Schema: inline JSON schema compiled with Ajv (MIXED RESPONSIBILITY).
- Fixture, Resource, Support, Page Object, Data, Auth/Setup: None; Environment: none.
- Direct Imports: `@playwright/test`, `ajv`; Indirect Dependencies: external API and Playwright.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until endpoints and schema are isolated in an API project.

## tests/practice/sandbox/Demo.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: mixed UI, multi-context, API, and route-mocking practice; all support behavior is embedded.
- Fixture, Resource, Support, Page Object, Data, Auth/Setup: None; Environment: none.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public demo/API endpoints and Playwright.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED / MIXED RESPONSIBILITY; Run Command: none until split by test type.

## tests/practice/sandbox/example.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: external documentation-site smoke example; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public documentation site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until an external-site project is registered.

## tests/practice/sandbox/Exercise Sets.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: mixed locator, POM, UI mocking, API, and public-site exercises.
- Page Object: `CheckoutPage` embedded in spec; API route/schema/data are also embedded (MIXED RESPONSIBILITY).
- Direct Imports: `@playwright/test`; Indirect Dependencies: public sites/APIs and Playwright; Environment/Auth: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until decomposed by test type.

## tests/practice/sandbox/firstTest.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: external-site smoke example; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public search site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until an external-site project is registered.

## tests/practice/sandbox/saucedemo.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: public demo login practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public demo site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until separately owned and external data is managed.

## tests/practice/sandbox/shopping.spec.js

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: public demo shopping practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public demo site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until separately owned and external data is managed.

## tests/practice/sandbox/test-1.spec.ts

- Playwright Project / Config: Practice Library; excluded by root config.
- Test Type: public demo TypeScript login practice; Fixture, Resource, Support, Page Object, API Client, Data, Auth/Setup: None.
- Direct Imports: `@playwright/test`; Indirect Dependencies: public demo site and Playwright; Environment: none.
- Owner Classification: TEST-SPECIFIC / UNREGISTERED; Run Command: none until a TypeScript-capable project is registered.
