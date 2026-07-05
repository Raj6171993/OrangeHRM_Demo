const { pageManager } = require('../pages/pageManager.js');
const { test, expect } = require('@playwright/test');
const validData = JSON.parse(JSON.stringify(require('../Utils/validLoginTestData.json')));
const inValidData = JSON.parse(JSON.stringify(require('../Utils/inValidTestData.json')));

//test.describe.configure({mode : 'parallel'});//Running tests in Parallel mode
test.describe('1 test', () => {
    test('Valid Login', async ({ page }) => {
    
        //Initializing object for pageManager
        const _pageManager = new pageManager(page);
        //Accessing Login class
        const _loginpage = _pageManager.loginPage();

        //Calling gotoLoginPage function from login class
        await _loginpage.gotoLoginPage();
        await expect(await page).toHaveTitle("OrangeHRM");
        await expect(_loginpage.userNameInput).toBeVisible();
        await expect(_loginpage.passwordInput).toBeVisible();

        //calling login function from the login class
        await _loginpage.login(validData.username, validData.password);
        //Accsessing Dashboard Class for putting elements asertion
        const _dashboardpage = _pageManager.dashboardPage();
        //Assertions
        await expect(await _dashboardpage.dashboardHeaderTitle).toBeVisible(); //Asser the header title is visible
        await expect(await _dashboardpage.dashboardHeaderTitle).toHaveText('Dashboard'); // Assert the Header of the page after login
        await expect(await _dashboardpage.dashboardMenu).toContainClass('active'); //Assert the Dashbaord Menu is selected
        await expect(await page.url()).toContain('/dashboard/'); //Assert the URL after login
        const widgetNames = await _dashboardpage.getDashboardWidgets(); //calling widgetnames function
        await expect(widgetNames).toContain('Time at Work');// Asserting at least one widget is present on the dashhboard page after logging in
        await expect(page.locator('.orangehrm-login-form')).not.toBeVisible();//Assert that Login Form is not present anymore
        await expect(await _dashboardpage.userProfileSection).toBeVisible(); //User Profile area is visible
        await expect(await _dashboardpage.userProfileSection).toBeEnabled();
        const dropmenus = await _dashboardpage.userProfileDropdown();
        await expect(await _dashboardpage.userProfileSection).toContainClass('--active');
        await expect(await dropmenus).toContain('About', 'Support', 'Change Password', 'Logout');
    });
});

test.describe('2 tests', () => {
    for (const data of inValidData) {
        test(`Invalid Login with ${data.TestData}`, async ({ page }) => {

            //Initializing object for pageManager
            const _pageManager = new pageManager(page);
            //Accessing Login class
            const _loginpage = _pageManager.loginPage();

            //Calling gotoLoginPage function from login class
            await _loginpage.gotoLoginPage();
            await expect(await page).toHaveTitle("OrangeHRM");
            await expect(_loginpage.userNameInput).toBeVisible();
            await expect(_loginpage.passwordInput).toBeVisible();

            //calling login function from the login class
            await _loginpage.login(data.username, data.password);
            await expect(await _loginpage.loginErrorMsg).toBeVisible();
            await expect(await _loginpage.loginErrorMsg).toHaveText('Invalid credentials');
            await expect(await page).toHaveURL(/login/);//User is not redirected to other page
            await expect(await page).not.toHaveURL(/dashboard/);//Dashboard items are not visible

            //Acessing Dashboard Page
            const _dashboardpage = _pageManager.dashboardPage();
            await expect(await _dashboardpage.dashboardWidgetsHeader).not.toBeVisible();
            await expect(await _dashboardpage.userProfileSection).not.toBeVisible();


        });
    }
});
