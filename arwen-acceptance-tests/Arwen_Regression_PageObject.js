// Copyright 2013 Selenium committers
// Copyright 2013 Software Freedom Conservancy
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview An example test that may be run using Mocha. To run, you must
 * have the chromedriver installed on the system PATH.
 */

var assert = require('assert'),
    fs = require('fs');

var chai = require("chai");
var expect = chai.expect;

var webdriver = require('../node_modules/selenium-webdriver'),
    test = require('../node_modules/selenium-webdriver/testing'),
    remote = require('../node_modules/selenium-webdriver/remote'),
    SeleniumServer = require('../node_modules/selenium-webdriver/remote').SeleniumServer;


var server = new SeleniumServer("../libs/selenium-server-standalone.jar", {
  port: 4444
});
    server.start ();


var baseURL = 'http://m.olx.com.py/';

var driver;

var capabilities = {
    'browserName' : 'chrome' ,
//    'logLevel': 'silent',
    }


// HOMEPAGE
function HomePage(){
  this.post_button = webdriver.By.xpath("//a[contains(@class,'post')]");
  this.login_button = webdriver.By.xpath("//a[contains(@href, '/login')]");
  this.myolx = webdriver.By.xpath("//a[contains(@href,'/myolx')]");
  this.logout_button = webdriver.By.xpath("//a[contains(@href,'/logout')]");
  this.ChangeCity_link = webdriver.By.xpath("//div[@id='locationSelect']/a");
  this.search_field = webdriver.By.name("search");
  this.search_button = webdriver.By.className("submit");
}

HomePage.prototype.goToHomePage = function() {
        driver.manage().deleteAllCookies();
        driver.get('http://m.olx.com.py/?location=www.olx.com.py&language=en-US');
    }

HomePage.prototype.goToPostingPage = function() {
        driver.findElement(this.post_button).click();
    }

HomePage.prototype.goToLoginPage = function() {
        driver.findElement(this.login_button).click();
    }

HomePage.prototype.logOut = function(){
    driver.findElement(this.myolx).click();
    driver.findElement(this.logout_button).click();
}

HomePage.prototype.isUserLoggedOut = function(){
      var login_button = this.login_button
      driver.wait(function() {
      return driver.findElement(login_button).then(function(res) {
        return driver.findElement(login_button);
      });
    }, 8000);
  }

HomePage.prototype.isUserLoggedIn = function(username, password) {
      var myolx = this.myolx
      driver.wait(function() {
      return driver.findElement(myolx).then(function(res) {
        return driver.findElement(myolx);
      });
    }, 8000);
  }

HomePage.prototype.goToChangeCity = function(){
     driver.findElement(this.ChangeCity_link).click();     
}

HomePage.prototype.isUserLocatedInCity = function() {
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("location?location=");
        });
    }, 8000);
}

HomePage.prototype.globalSearch = function(term){
    driver.findElement(this.search_field).clear();
    driver.findElement(this.search_field).sendKeys(term);
    driver.findElement(this.search_button).click();
}

//LISTING

function ListingPage(){
  this.item_listing = webdriver.By.xpath("//*[@class='imageCont'][1]");
}

ListingPage.prototype.openItem = function (index){
    this.item_listing = webdriver.By.xpath("//*[@class='imageCont']["+index+"]");
    driver.findElement(this.item_listing).click();
}


//LOGIN

function LoginPage(){
  this.username_field = webdriver.By.name("usernameOrEmail");
  this.password_field = webdriver.By.name("password");
  this.submit_button = webdriver.By.name("submit");
//  this.userLoggedIn = 
}

LoginPage.prototype.logInWith = function(username, password) {
    driver.findElement(this.username_field).clear();
    driver.findElement(this.username_field).sendKeys(username);
    driver.findElement(this.password_field).clear();
    driver.findElement(this.password_field).sendKeys(password);
    driver.findElement(this.submit_button).click();
  }




//POSTING

function PostingPage(){
  this.city = webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]");
  this.category = webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]");
  this.subcategory = webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]");  

  this.title = webdriver.By.id("text-title");
  this.description = webdriver.By.id("text-description");
  this.contactName = webdriver.By.id("text-contactName");
  this.phone = webdriver.By.id("text-phone");
  this.email = webdriver.By.id("text-email");
  this.submitButton = webdriver.By.xpath("//div[@class='formActions']/div/input[@type='submit']");
  }


PostingPage.prototype.selectCityCategoryAndSubcategory = function() {
      driver.findElement(this.city).click();
      driver.findElement(this.category).click();
      driver.findElement(this.subcategory).click();
    }


PostingPage.prototype.postWith = function(title, description, contact_name, phone, email) {
    driver.findElement(this.title).clear();
    driver.findElement(this.title).sendKeys(title);
    driver.findElement(this.description).clear();
    driver.findElement(this.description).sendKeys(description);
    driver.findElement(this.contactName).clear();
    driver.findElement(this.contactName).sendKeys(contact_name);
    driver.findElement(this.phone).clear();
    driver.findElement(this.phone).sendKeys(phone);
    driver.findElement(this.email).clear();
    driver.findElement(this.email).sendKeys(email);
    driver.findElement(this.submitButton).click();
    }

//AFTER POSTING
function AfterPostingPage(){
    this.adLink = webdriver.By.xpath("//a[contains(@href,'testing-iid')]");
  }

  AfterPostingPage.prototype.openAdLink = function() {
      driver.findElement(this.adLink).click();
    }

  AfterPostingPage.prototype.isItemDisplayed = function(title){
      driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain(title);
      });
    }, 8000);
  }


// LOCATION
function LocationPage(){
    this.city_link = webdriver.By.xpath("//ul[@class='normalList']/li[1]/a");
  }

  LocationPage.prototype.selectCity = function(number) {
    this.city_link = webdriver.By.xpath("//ul[@class='normalList']/li["+number+"]/a");
    driver.findElement(this.city_link).click();
  }


// ITEM PAGE
function ItemPage(){
  this.message_field = webdriver.By.name("message");
  this.name_field = webdriver.By.name("name");
  this.email_field = webdriver.By.name("email");
  this.phone_field = webdriver.By.name("phone");
  this.reply_button = webdriver.By.xpath("//a[contains(@href,'/reply')]");
  this.send_button = webdriver.By.name("submit");
  this.favorite_on = webdriver.By.xpath("//input[@class='favorite favoriteOn']");
  this.favorite_off = webdriver.By.xpath("//input[@class='favorite favoriteOff']");
}

  
  ItemPage.prototype.isItemDisplayed = function(){
      var item_page_element = webdriver.By.id("itemPage");
      driver.wait(function() {
      return driver.findElement(item_page_element).then(function(res) {
        return driver.findElement(item_page_element);
      });
    }, 8000);
  }

  ItemPage.prototype.replyAnAdWith = function(message, name, email, phone){
    driver.findElement(this.reply_button).click();
    driver.findElement(this.message_field).sendKeys(message);
    driver.findElement(this.name_field).clear();
    driver.findElement(this.name_field).sendKeys(name);
    driver.findElement(this.email_field).clear();
    driver.findElement(this.email_field).sendKeys(email);
    driver.findElement(this.phone_field).clear();
    driver.findElement(this.phone_field).sendKeys(phone);
    driver.findElement(this.send_button).click();
  }

  ItemPage.prototype.isMessageConfirmationDisplayed = function(){
    var confirmation_message = "Your message has been sent";
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain(confirmation_message);
      });
    }, 8000);
  }

  ItemPage.prototype.addItemToFavorites = function(){
    driver.findElement(this.favorite_off).click();
    driver.wait(function() {
      return driver.findElement(this.favorite_on).then(function(res) {
        return driver.findElement(this.favorite_on).isDisplayed();
      });
    }, 8000);
  }



test.describe('ARWEN Test Suite', function() {

  test.before(function() {
    driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(capabilities). 
    build();
    driver.manage().timeouts().implicitlyWait(30000, 1000);
    driver.manage().deleteAllCookies();
  });


  test.it('POST - Anonymous', function() {
    var homePage =  new HomePage();
    var postingPage = new PostingPage();
    var afterPostingPage = new AfterPostingPage();

    homePage.goToHomePage();
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory();
    postingPage.postWith("Title for testing","Description for testing", "Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });


  test.it('POST - Logged In', function() {
    var homePage =  new HomePage();
    var postingPage = new PostingPage();
    var afterPostingPage = new AfterPostingPage();
    var loginPage = new LoginPage();


    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory();
    postingPage.postWith("Title for testing","Description for testing", "Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });




  test.it('LOGIN with valid user', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.isUserLoggedIn();
  });




test.it('LOGOUT - Logout with valid user', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.logOut();
    homePage.isUserLoggedOut();

  });


test.it('LOCATION - Select city', function() {
    var homePage =  new HomePage();
    var locationPage = new LocationPage();

    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
  });




test.it('LOCATION - Change city', function() {
    var homePage =  new HomePage();
    var locationPage = new LocationPage();

    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
    homePage.goToChangeCity();
    locationPage.selectCity(2);
    homePage.isUserLocatedInCity();

  });


test.it('SEARCH - Search logged in', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("a");
    listingPage.openItem(1);
    itemPage.isItemDisplayed();
  });




test.it('ITEM PAGE - Reply an Ad', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("a");
    listingPage.openItem(1);
    itemPage.replyAnAdWith('Reply message for testing', 'robot', 'robot_test@olx.com', '1231231231');
    itemPage.isMessageConfirmationDisplayed();
  });

/*
test.it('ITEM PAGE - Add Remove to Favorites', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("b");
    listingPage.openItem(1);
    itemPage.addItemToFavorites();
  });

*/
  test.after(function() { driver.quit(); });
});

/*

var url =
var number = url.match(/(\d+){4,20}/);
*/