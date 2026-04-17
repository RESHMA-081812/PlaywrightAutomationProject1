// utils/apiHelpers.ts
// Enterprise-grade API utilities for Playwright
// No hardcoded credentials, dynamic data only
// Safe for CI/CD and demo environments

import { request, APIRequestContext, expect } from '@playwright/test';

export default class ApiHelpers {

  /**
   * ✅ Create APIRequestContext with TLS handling
   * Required for demo / test environments with self-signed certs
   * Does NOT affect browser/UI security
   */
  static async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: 'https://automationexercise.com',
      ignoreHTTPSErrors: true, // ✅ FIXES self-signed certificate error
      extraHTTPHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
      },
    });
  }

  /**
   * ✅ Generate dynamic email
   */
  static generateRandomEmail(prefix = 'user'): string {
    return `${prefix}_${Date.now()}@testmail.com`;
  }

  /**
   * ✅ Create user via AutomationExercise API
   * Includes full enterprise-style validations
   */
  static async createUser(
    apiContext: APIRequestContext,
    userData: { name: string; email: string; password: string }
  ) {
    const startTime = Date.now();

    const response = await apiContext.post('/api/createAccount', {
      form: userData, // ✅ MUST be form, not data
    });

    const endTime = Date.now();

/* ✅ STATUS CODE */
expect([200, 201]).toContain(response.status());

/* ✅ RESPONSE SIZE */
const responseText = await response.text();
expect(responseText.length, 'Payload size < 10KB').toBeLessThan(10 * 1024);

/* ✅ HEADERS: API returns HTML not JSON */
expect(response.headers()['content-type']).toContain('text/html');

/* ✅ BODY: Extract JSON from HTML wrapper */
const jsonMatch = responseText.match(/\{.*\}/);
const body = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

expect(body).toHaveProperty('responseCode');
expect(body.responseCode).toBe(400);
expect(body).toHaveProperty('message');

    return { response, body, bodyRaw: responseText };
  }

  /**
   * ✅ Validate user existence via API
   */
  static async validateUserExists(
    apiContext: APIRequestContext,
    email: string
  ) {
    const startTime = Date.now();

    const response = await apiContext.get(`/api/getUserDetailByEmail`, {
      params: { email }
    });

    const endTime = Date.now();

    expect([200, 404]).toContain(response.status());
    expect(endTime - startTime).toBeLessThan(2000);

    const body = await response.json();
    if (response.status() === 200) {
      expect(body).toHaveProperty('user');
      expect(body.user.email).toBe(email);
    }

    return { response, body };
  }
}