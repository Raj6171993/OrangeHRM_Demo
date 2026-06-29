const { loginPage } = require('./loginPage.js');
const { adminPage } = require('./adminPage.js');
const { dashboardPage } = require('./dashboardPage.js');
const { pimPage } = require('./pimPage.js');

class pageManager{
    constructor(page){
        this.page = page;
        this._loginPage = new loginPage(this.page);
        this._adminPage = new adminPage(this.page);
        this._dashboardPage = new dashboardPage(this.page);
        this._pimPage = new pimPage(this.page);
    }

    loginPage(){
        return this._loginPage;
    }
    
    adminPage(){
        return this._adminPage;
    }

    dashboardPage(){
        return this._dashboardPage;
    }

    pimPage(){
        return this._pimPage;
    }
}

module.exports = {pageManager};