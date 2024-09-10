import test, { expect } from "@playwright/test";

async function login(page: any, username: string, password: string) {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator(`//input[@placeholder='Username']`).fill(username);
  await page.locator(`//input[@placeholder='Password']`).fill(password);
  await page.locator(`//button[@type='submit']`).click();
  await page.waitForTimeout(3000);
}
test.describe("Verrify function login", () => {
  test("Login thành công khi điền đúng user name, password", async ({
    page,
  }) => {
    await login(page, "Admin", "admin123");
    expect(await page.title()).toBe("OrangeHRM");
  });

  test("Login không thành công khi bỏ trống user name", async ({ page }) => {
    await login(page, "", "admin123");
    expect(
      await page
        .locator(`//span[contains(@class,'input-field-error-message')]`)
        .isVisible()
    ).toBeTruthy();
  });

  test("Login không thành công khi bỏ trống password", async ({ page }) => {
    await login(page, "Admin", "");
    expect(
      await page
        .locator(`//span[contains(@class,'input-field-error-message')]`)
        .isVisible()
    ).toBeTruthy();
  });
});
