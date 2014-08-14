var assert = require('assert'),
    fs = require('fs');

var chai = require("chai");
var expect = chai.expect;

var webdriver = require('../node_modules/selenium-webdriver'),
    test = require('../node_modules/selenium-webdriver/testing'),
    remote = require('../node_modules/selenium-webdriver/remote');

var baseURL = 'http://m.olx.com.py/force/html4';


test.describe('ARWEN Test Suite', function() {
  var driver;

  var capabilities = {
    'browserName' : 'firefox', 
    'logLevel': 'silent',
  }



  test.before(function() {
    driver = new webdriver.Builder().
    withCapabilities(capabilities). 
    build();
    driver.manage().timeouts().implicitlyWait(30000, 1000); 
  });


  test.it('POST - Anonymous', function() {
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.className("post")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.id("text-title")).clear();
    driver.findElement(webdriver.By.id("text-title")).sendKeys("Title for testing");
    driver.findElement(webdriver.By.id("text-description")).clear();
    driver.findElement(webdriver.By.id("text-description")).sendKeys("Description for testing");
    driver.findElement(webdriver.By.id("text-contactName")).clear();
    driver.findElement(webdriver.By.id("text-contactName")).sendKeys("Testing contact");
    driver.findElement(webdriver.By.id("text-phone")).clear();
    driver.findElement(webdriver.By.id("text-phone")).sendKeys("1231231231");
    driver.findElement(webdriver.By.id("text-email")).clear();
    driver.findElement(webdriver.By.id("text-email")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.xpath("//div[@class='formActions']/div/input[@type='submit']")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("title-for-testing-iid");
      });
    }, 8000);
  });


  test.it('POST - Logged In', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.className("post")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.findElement(webdriver.By.id("text-title")).clear();
    driver.findElement(webdriver.By.id("text-title")).sendKeys("Title for testing");
    driver.findElement(webdriver.By.id("text-description")).clear();
    driver.findElement(webdriver.By.id("text-description")).sendKeys("Description for testing");
    driver.findElement(webdriver.By.id("text-contactName")).clear();
    driver.findElement(webdriver.By.id("text-contactName")).sendKeys("Testing contact");
    driver.findElement(webdriver.By.id("text-phone")).clear();
    driver.findElement(webdriver.By.id("text-phone")).sendKeys("1231231231");
    driver.findElement(webdriver.By.id("text-email")).clear();
    driver.findElement(webdriver.By.id("text-email")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.xpath("//div[@class='formActions']/div/input[@type='submit']")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("title-for-testing-iid");
      });
    }, 8000);
  });


  test.it('LOGIN with valid user', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("user loggedIn");
      });
    }, 8000);
  });



test.it('LOGOUT - Logout with valid user', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'/myolx')]")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'/logout')]")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("/login");
      });
    }, 8000);
  });




test.it('LOCATION - Select city', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//div[@id='locationSelect']/a")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a[1]")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("location?location=");
      });
    }, 8000);
  });




test.it('LOCATION - Change city', function() {
    var city1,city2;
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//div[@id='locationSelect']/a")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[1]/a")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'location?location=')]")).click();
    driver.findElement(webdriver.By.xpath("//ul[@class='normalList']/li[2]/a")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("Asunción");
      });
    }, 8000);
  });



test.it('SEARCH - Search logged in', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=www.olx.com.py');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.name("search")).clear();
    driver.findElement(webdriver.By.name("search")).sendKeys("a");
    driver.findElement(webdriver.By.className("submit")).click();
    driver.findElement(webdriver.By.xpath("//li//a[contains(@href,'iid')][1]")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.id("itemPage")).then(function(res) {
        return driver.findElement(webdriver.By.id("itemPage"));
      });
    }, 8000);
  });



test.it('ITEM PAGE - Reply an Ad', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=&language=en-US');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.xpath("//a[@class='user loggedIn']")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'myadslisting')]")).click();
    driver.findElement(webdriver.By.xpath("//h2[contains(text(),'Curso de Hindi')]")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'/reply')]")).click();
    driver.findElement(webdriver.By.name("message")).clear();
    driver.findElement(webdriver.By.name("message")).sendKeys("Reply message for testing");
    driver.findElement(webdriver.By.name("name")).clear();
    driver.findElement(webdriver.By.name("name")).sendKeys("robot");
    driver.findElement(webdriver.By.name("email")).clear();
    driver.findElement(webdriver.By.name("email")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("phone")).clear();
    driver.findElement(webdriver.By.name("phone")).sendKeys("1231231231");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("Your message has been sent");
      });
    }, 8000);
  });



test.it('ITEM PAGE - Add Remove to Favorites', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=&language=en-US');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.name("search")).clear();
    driver.findElement(webdriver.By.name("search")).sendKeys("a");
    driver.findElement(webdriver.By.className("submit")).click();
    driver.findElement(webdriver.By.xpath("//*[@class='imageCont'][1]")).click();
    driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOff']")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOn']")).then(function(res) {
        return driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOn']"));
      });
    }, 8000);
    driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOn']")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOff']")).then(function(res) {
        return driver.findElement(webdriver.By.xpath("//input[@class='favorite favoriteOff']"));
      });
    }, 8000);
  });



test.it('MYOLX - Go to My Ads', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=&language=en-US');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.xpath("//a[@class='user loggedIn']")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'myadslisting')]")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.xpath("//div[@class='users_myads_view']")).then(function(res) {
        return driver.findElement(webdriver.By.xpath("//div[@class='users_myads_view']"));
      });
    }, 8000);
  });



test.it('MYOLX - Go to My Favorites', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=&language=en-US');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.name("usernameOrEmail")).clear();
    driver.findElement(webdriver.By.name("usernameOrEmail")).sendKeys("robot_test@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("robotium2014");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.findElement(webdriver.By.xpath("//a[@class='user loggedIn']")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'favorite')]")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.xpath("//div[@class='users_favorites_view']")).then(function(res) {
        return driver.findElement(webdriver.By.xpath("//div[@class='users_favorites_view']"));
      });
    }, 8000);
  });



test.it('REGISTER - Register new user', function() {
    driver.manage().deleteAllCookies();
    driver.get(baseURL + '/?location=&language=en-US');
    driver.findElement(webdriver.By.xpath("//a[contains(@href, '/login')]")).click();
    driver.findElement(webdriver.By.xpath("//a[contains(@href,'register')]")).click();
    driver.findElement(webdriver.By.name("username")).sendKeys(new Date().getTime());
    driver.findElement(webdriver.By.name("email")).sendKeys(new Date().getTime()+"@olx.com");
    driver.findElement(webdriver.By.name("password")).clear();
    driver.findElement(webdriver.By.name("password")).sendKeys("seleniumpass");
    driver.findElement(webdriver.By.name("submit")).click();
    driver.wait(function() {
      return driver.findElement(webdriver.By.xpath("//a[@class='user loggedIn']")).then(function(res) {
        return driver.findElement(webdriver.By.xpath("//a[@class='user loggedIn']"));
      });
    }, 8000);
  });


  test.after(function() { driver.quit(); });
});


