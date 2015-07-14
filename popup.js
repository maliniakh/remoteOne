"use strict"

var sitesUrls = ['*://*.youtube.com/*', '*://soundcloud.com/*'];
var result = [];



document.addEventListener('DOMContentLoaded', function () {
    getRelevantTabs(addControls);

    document.getElementById('prev').onclick = function () {
        alert('prev');
    };

    document.getElementById('pause').onclick = function () {
        alert('pause');
    };

    document.getElementById('play').onclick = function () {
        alert('play');
    };

    document.getElementById('next').onclick = function () {
        alert('next');
    };
});

// make it return tabs actually
function getRelevantTabs(callback) {
    sitesUrls.forEach(function (url) {
        var qi = {
            url: url
        };

        chrome.tabs.query(qi, function (tabs) {
            console.log("tabs for " + url + ": " + tabs.length);
            result = $.merge(result, tabs);
            addControls(tabs)
        });
    });

    console.log("all relevant tabs: " + result.length);
    //return result;
}

function addControls(tabs) {
    if(tabs.length == 0) {
        return;
    }

    for(var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];

        // id, visibility
        var templateDiv = $('#template');
        var controlsDiv = templateDiv.clone(false);
        controlsDiv.attr('id', 'tab_' + tab.windowId + "_" + tab.id);
        controlsDiv.css('visibility', 'visible');

        // title
        controlsDiv.find('.title').text(tab.title);

        templateDiv.after(controlsDiv);
    }

}

//$("#next").click(function () {
//    alert('next')
//});
