class dashboardPage{
    constructor(page){
        this.page = page;
        this.dashboardUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index";
        this.dashboardHeaderTitle = this.page.locator('.oxd-topbar-header-title h6'); 
        this.dashboardMenu = this.page.getByRole('link', {name: "Dashboard"});
        this.dashboardWidgetsHeader = this.page.locator('.orangehrm-dashboard-widget-name p');
        this.userProfileSection = this.page.locator('.oxd-userdropdown');
    }

    async getDashboardWidgets(){
        const widgetNames = await this.dashboardWidgetsHeader.allTextContents();
        return widgetNames;
    }

    async userProfileDropdown(){
        await this.userProfileSection.click();
        const dropmenus = await this.page.locator('.oxd-dropdown-menu li').allTextContents();
        console.log(dropmenus);
        return dropmenus;
    }


}

module.exports = {dashboardPage};