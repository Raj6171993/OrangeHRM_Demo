class pimPage{
    constructor(page){
        this.page = page;
        this.addEmmployeebtn = this.page.getByRole('link',{name:"Add Employee"});
        this.formCard = this.page.locator('.orangehrm-card-container');
        this.firstNameInput = this.page.locator('input[name="firstName"]');
        this.middleNameInput = this.page.locator('input[name="middleName"]');
        this.lastNameInput = this.page.locator('input[name="lastName"]');
        this.employeeIdInput = this.page.locator('form input.oxd-input').nth(3);
        this.uploadLocator = this.page.locator('.oxd-file-input');
        this.photoPreview = this.page.locator('form img[alt="profile picture"]');
        this.submitEmployeebtn = this.page.getByRole('button', {name:"Save"});
        this.toastContainer = this.page.locator('.oxd-toast');
        this.toastContainerMessage = this.page.locator('.oxd-text--toast-message');
        this.employeeListMenu = this.page.getByRole('link', { name: 'Employee List' });
        this.tableRows = this.page.locator('.oxd-table-body .oxd-table-card'); 
        this.firstRow = this.page.locator('.oxd-table-body .oxd-table-card').first();
        this.firstRowSecondColumn = this.firstRow.locator('.oxd-table-cell').nth(1);
        this.masterCheckbox = this.page.locator('.oxd-checkbox-input').first();
        this.recordFoundMessage = this.page.locator('.orangehrm-horizontal-padding .oxd-text');
        this.firstRowCheckbox = this.firstRow.locator('.oxd-table-card-cell-checkbox');
        this.deteleBtn = this.firstRow.locator('.bi-trash');
        this.deletePopup = this.page.locator('.oxd-sheet');
        this.confirmDelbtn = this.deletePopup.getByRole('button', {name : ' Yes, Delete '});
        this.uniqueEmployeeId = Math.floor(100000 + Math.random() * 900000).toString();
    }

    async navigateToPIMPage(){
        const pimMenu = this.page.getByRole('link',{name:"PIM"});
        await pimMenu.click();
        await this.page.waitForLoadState("networkidle");
        const topBarMenus =  await this.page.locator('.oxd-topbar-body-nav-tab-item').allTextContents();
        //console.log(topBarMenus);
        return topBarMenus;
    }

    async navigateToAddEmployeePage(){
        await this.addEmmployeebtn.click();
    }

    async fillForm(firstName,middleName,lastName){
        await this.firstNameInput.fill(firstName);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
        await this.employeeIdInput.clear();
        await this.employeeIdInput.fill(this.uniqueEmployeeId);
    }

    async uploadPhoto(){
        await this.uploadLocator.setInputFiles('ProfilePhoto/My img.jpg');
    }

    async saveEmployee(){
        this.employeeId = await this.employeeIdInput.inputValue();
        console.log(this.employeeId);
        await this.submitEmployeebtn.click();
        await this.toastContainer.waitFor({state : 'visible'});
        const message = await this.toastContainerMessage.textContent();
        console.log(message);
        return message;
    }

    async searchEmployee(){
        await this.employeeListMenu.click();
        await this.page.locator("div[class='--toggle'] button[type='button']").waitFor({state: 'visible'});
        await this.page.locator("div[class='--toggle'] button[type='button']").click();
        await this.page.locator("div[class='--toggle'] button[type='button']").click();
        await this.page.locator('.oxd-form-row input').nth(1).waitFor({state: 'visible'});
        await this.page.locator('.oxd-form-row input').nth(1).fill(this.employeeId);
        await this.page.getByRole('button', {name:'Search'}).click();
        await this.page.waitForLoadState('networkidle');
        const id = await this.firstRowSecondColumn.textContent();
        console.log(id);
        return id.trim();
    }

    async deleteEmployee(){
        await this.firstRowCheckbox.click();
        await this.deteleBtn.click();
        await this.deletePopup.waitFor({sate : 'visible'});
        await this.confirmDelbtn.click();
        const message = await this.toastContainerMessage.textContent();
        await console.log(message);
        return message;
    }

}

module.exports = {pimPage};