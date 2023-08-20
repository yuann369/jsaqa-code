const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.screenshot({
    path: "screenshots/successful_authorization/main_page.png",
  });

  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.screenshot({
    path: "screenshots/successful_authorization/authorization_page.png",
  });

  await page.fill('[placeholder="Email"]', email);

  await page.fill('[placeholder="Пароль"]', password);

  await page.click('[data-testid="login-submit-btn"]');

  await expect(page).toHaveURL("https://netology.ru/profile");
  await page.screenshot({
    path: "screenshots/successful_authorization/profile_page.png",
  });
});

test("Unsuccessful authorization - Wrong ", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.screenshot({
    path: "screenshots/unsuccessful_authorization/main_page.png",
  });

  await page.click("text=Войти");
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.screenshot({
    path: "screenshots/unsuccessful_authorization/authorization_page.png",
  });

  await page.fill('[placeholder="Email"]', "test@gmail.com");

  await page.fill('[placeholder="Пароль"]', "123456");

  await page.click('[data-testid="login-submit-btn"]');

  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );

  await page.screenshot({
    path: "screenshots/unsuccessful_authorization/error_authorization.png",
  });
});
