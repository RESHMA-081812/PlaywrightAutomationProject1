import { test } from '@playwright/test';
import ApiHelpers from '../../utils/apiHelpers';

test('@api Create User API – create and validate user', async () => {

  // ✅ Use shared API helper (TLS handled here)
  const apiContext = await ApiHelpers.createApiContext();

  const email = ApiHelpers.generateRandomEmail();

  await ApiHelpers.createUser(apiContext, {
    name: 'API User',
    email,
    password: 'Password@123',
  });

  await apiContext.dispose();
});
