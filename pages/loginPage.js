class loginPage{
    constructor(page){
        this.page = page;
        this.loginUrl = "https://opensource-demo.orangehrmlive.com/";
        this.userNameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
        this.loginbtn = this.page.getByRole('button', {name : " Login "});
        this.loginErrorMsg = this.page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
    }

    async gotoLoginPage(){
        await this.page.goto(this.loginUrl,{waitUnitl : 'load'});
    }

    async login(username, password){
        console.log(username,password);//Prinitng test data being used from inValidtestData.json
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginbtn.click();
    }
}

module.exports = { loginPage };