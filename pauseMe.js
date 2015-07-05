"use strict"

var pausedTabs = undefined;

var sitesUrls = ['*://*.youtube.com/*', '*://soundcloud.com/*'];

function execute() {
    // todo: pause or play?
    var cmd = 'pause';
    //if('play') {
    //    cmd = 'pause'
    //} else {
    //    cmd = 'play'
    //}

    sitesUrls.forEach(function (url) {
        var qi = {
            url: url
        };

        chrome.tabs.query(qi, function (tabs) {
            console.log("tabs for " + url + ": " + tabs.length);

            tabs.forEach(function (tab) {
                chrome.tabs.sendMessage(tab.id, {cmd: cmd}, function (response) {
                    console.log(response);
                });
            });
        });
    });
}

chrome.browserAction.onClicked.addListener(function (tab) {
    execute();
});


function getRelevantTabs() {
    var result = [];

    sitesUrls.forEach(function (url) {
        var qi = {
            url: url
        };

        chrome.tabs.query(qi, function (tabs) {
            console.log("tabs for " + url + ": " + tabs.length);
            result = $.merge(result, tabs);
        });
    });

    console.log("all relevant tabs: " + result.length);
    return result;
}
