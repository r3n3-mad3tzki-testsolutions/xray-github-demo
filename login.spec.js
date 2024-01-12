const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/Login');

test.describe("Login validations", () => {

    test('Login with valid credentials', async({ page }, testInfo) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("demo","mode");
        const name = await loginPage.getInnerText();

        expect(name).toBe('Login succeeded. Now you can logout.');
    });

    test('Login with invalid credentials', async({ page }, testInfo) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login("demo","mode1");
        const name = await loginPage.getInnerText();


        // Capture a screenshot and attach it.
        const path = testInfo.outputPath('tmp_screenshot.png');
        await page.screenshot({ path });
        testInfo.attachments.push({ name: 'screenshot.png', path, contentType: 'image/png' });

        expect(name).toBe('Login failed. Invalid user name and/or password.');
    });
}) 
