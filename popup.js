"use strict"

var sitesUrls = ['*://*.youtube.com/*', '*://soundcloud.com/*'];
var result = [];


function addEventHandlers(controlsDiv, tabId) {
    controlsDiv.find('#prev').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'prev'}, function(resp) {console.log('resp: ' + resp)})
        chrome.tabs.get(tabId, function(tab) {
            controlsDiv.find('.title').text(tab.title);
        });
    });

    controlsDiv.find('#pause').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'pause'}, function(resp) {console.log('resp: ' + resp)})
        showPlayBtn(controlsDiv);
    });

    controlsDiv.find('#play').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'play'}, function(resp) {console.log('resp: ' + resp)})
        showPauseBtn(controlsDiv);
    });

    controlsDiv.find('#next').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'next'}, function(resp) {
            console.log('resp: ' + resp)
            chrome.tabs.get(tabId, function(tab) {
                controlsDiv.find('.title').text(tab.title);
            });
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    getRelevantTabs(addControls);
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

        console.log('tmplDiv: ' + templateDiv)
        var controlsDiv = templateDiv.clone(false);
        controlsDiv.attr('id', 'tab_' + tab.windowId + "_" + tab.id);
        controlsDiv.attr('data-tabId', tab.id);
        controlsDiv.css('visibility', 'visible');

        // title
        controlsDiv.find('.title').text(tab.title);

        addEventHandlers(controlsDiv, tab.id);

        chrome.tabs.sendMessage(tab.id, {action: 'isPlaying'},
            function(resp) {
                var isPlaying = resp.resp;
                console.log('tabid (' + tab.id + ') is playing: ' + isPlaying);

                if(isPlaying) {
                    showPauseBtn(controlsDiv);
                } else {
                    showPlayBtn(controlsDiv);
                }
            }
        );

        templateDiv.after(controlsDiv);
    }

}

function showPauseBtn(controlsDiv) {
    controlsDiv.find('#play').hide();
    controlsDiv.find('#pause').show();
}

function showPlayBtn(controlsDiv) {
    controlsDiv.find('#play').show();
    controlsDiv.find('#pause').hide();
}