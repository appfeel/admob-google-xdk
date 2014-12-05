/*
 app.js
 Copyright 2014 AppFeel. All rights reserved.
 http://www.appfeel.com
 
 AdMobAds Cordova Plugin (com.admob.google)
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false, dev:false, admob:false */

var onXDKReady = function () {
  intel.xdk.device.hideSplashScreen();
};
document.addEventListener("intel.xdk.device.ready", onXDKReady, false);

var onDeviceReady = function() {
  testAdMob_main();
};
document.addEventListener("deviceready", onDeviceReady, false);

var admobid = {
  banner: 'ca-app-pub-8440343014846849/3119840614',
  interstitial: 'ca-app-pub-8440343014846849/4596573817'
};

function testAdMob_main() {
  if (!window.admob) {
    alert('admob plugin not ready');
    return;
  }
 
  initAds();
  admob.createBannerView(function () {
  }, function (data) {
    alert(JSON.stringify(data));
  });
}

function initAds() {
  var defaultOptions = admob.options;
 
  defaultOptions.publisherId = admobid.banner;
  defaultOptions.interstitialId = admobid.interstitial;
  defaultOptions.isTesting = true;
  defaultOptions.bannerAtTop = true;
  defaultOptions.overlap = false;
 
  admob.setOptions(defaultOptions);
  registerAdEvents();
}

// optional, in case respond to events or handle error
function registerAdEvents() {
  document.addEventListener(admob.events.onAdFailedToLoad, function (data) {
    alert(data.adType + ' failed. Error: ' + data.error + ', reason: ' + data.reason);
  });
  document.addEventListener(admob.events.onAdLoaded, function (e) {
    if (e.adType = admob.AD_TYPE.INTERSTITIAL) {
      var autoshow = document.getElementById('autoshow').checked;
      if (!autoshow) {
        alert("Interstital available, click show to view it");
      }
    }
  });
  document.addEventListener(admob.events.onAdOpened, function (e) {});
  document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
  document.addEventListener(admob.events.onAdClosed, function (e) {});
  document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});
}

// click button to call following functions
function getSelectedAdSize() {
  var i = document.getElementById("adSize").selectedIndex;
  var items = document.getElementById("adSize").options;
  return items[i].value;
}

function createSelectedBanner() {
  var overlap = document.getElementById('overlap').checked;
  var bannerAtTop = document.getElementById("bannerAtTop").checked;
  admob.createBannerView({
    adId:admobid.banner,
    bannerAtTop: bannerAtTop,
    overlap:overlap,
    adSize: getSelectedAdSize()
  }, function () {
  }, function (e) {
    alert(JSON.stringify(e));
  });
}

function prepareInterstitial() {
  var autoshow = document.getElementById('autoshow').checked;
  admob.requestInterstitialAd({
    adId:admobid.interstitial,
    autoShow:autoshow
  }, function () {
  }, function (e) {
    alert(JSON.stringify(e));
  });
}