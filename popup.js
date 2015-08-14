"use strict"

var sitesUrls =
    ['*://*.youtube.com/watch*',
    '*://soundcloud.com/*',
    '*://*.mixcloud.com/*'];
var result = [];


function addSiteNameAndEventHandlers(controlsDiv, tabId) {
    // set site's name data attribute (to start with)
    chrome.tabs.sendMessage(tabId, {action: 'getName'}, function(resp) {
        console.log('site name for ' + tabId + ': ' + resp.name)
        controlsDiv.attr('data-site-name', resp.name);

        addEventHandlers(controlsDiv, tabId);
    });
}

function addEventHandlers(controlsDiv, tabId) {
    controlsDiv.find('#prev').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'prev'}, function(resp) {console.log('resp: ' + resp)});
        chrome.tabs.sendMessage(tabId, {action: 'prevNextAvailability'}, function(resp) {updatePrevNextAvailability(controlsDiv,resp)});
        sendMessageTitle(controlsDiv, tabId);
    });

    controlsDiv.find('#pause').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'pause'}, function(resp) {console.log('resp: ' + resp)});
        showPlayBtn(controlsDiv);
    });

    controlsDiv.find('#play').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'play'}, function(resp) {console.log('resp: ' + resp)});
        showPauseBtn(controlsDiv);

        if(controlsDiv.attr('data-site-name') == 'sc') {
            pauseAllBut(controlsDiv, 'sc');
        }
    });

    controlsDiv.find('#next').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'next'}, function(resp) {console.log('resp: ' + resp)});
        chrome.tabs.sendMessage(tabId, {action: 'prevNextAvailability'}, function(resp) {updatePrevNextAvailability(controlsDiv,resp)});
        sendMessageTitle(controlsDiv, tabId);
    });

    controlsDiv.find('#replay').click(function () {
        chrome.tabs.sendMessage(tabId, {action: 'replay'}, function(resp) {
            console.log('resp: ' + resp)
            showPauseBtn(controlsDiv);
        });
    });

    controlsDiv.find('#close').click(function () {
        chrome.tabs.remove(tabId);
        controlsDiv.hide();
    });
}
document.addEventListener('DOMContentLoaded', function () {
    getRelevantTabs(addControls);
});

// make it return tabs actually
function getRelevantTabs(callback) {
    for(var i = 0; i < sitesUrls.length; i++) {
        var url = sitesUrls[i];
        var qi = {
            url: url
        };

        chrome.tabs.query(qi, function (tabs) {
            console.log("tabs for " + url + ": " + tabs.length);
            //result = $.merge(result, tabs);
            callback(tabs)
        });
    };

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
        controlsDiv.attr('data-tabId', tab.id);
        controlsDiv.css('display', '');

        // title & others
        sendMessageTitle(controlsDiv, tab.id);
        sendMessageIsPlaying(controlsDiv, tab.id);
        sendMessagePrevNextAvailability(controlsDiv, tab.id);

        addSiteNameAndEventHandlers(controlsDiv, tab.id);

        $('#main').append(controlsDiv);
        //templateDiv.after(controlsDiv);
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

function updatePrevNextAvailability(controlsDiv, status) {
    var prevEl = controlsDiv.find('#prev');
    if(status.prev) {
        prevEl.addClass('enabled');
        prevEl.removeClass('disabled');
    } else {
        prevEl.addClass('disabled');
        prevEl.removeClass('enabled');
    }

    var nextEl = controlsDiv.find('#next');
    if(status.next) {
        nextEl.removeClass('disabled');
        nextEl.addClass('enabled')
    } else {
        nextEl.addClass('disabled');
        nextEl.removeClass('enabled');
    }
}

function sendMessageTitle(controlsDiv, tabId) {
    chrome.tabs.sendMessage(tabId, {action: 'title'}, function(resp) {
        console.log('got title: ' + resp.title);
        controlsDiv.find('.title').text(resp.title);
    });
}

function sendMessageIsPlaying(controlsDiv, tabId) {
    chrome.tabs.sendMessage(tabId, {action: 'isPlaying'},
        function(resp) {
            var isPlaying = resp.resp;
            console.log('tab ' + tabId + ' is playing: ' + isPlaying);

            if(isPlaying) {
                showPauseBtn(controlsDiv);
            } else {
                showPlayBtn(controlsDiv);
            }
        }
    );
}

function sendMessagePrevNextAvailability(controlsDiv, tabId) {
    chrome.tabs.sendMessage(tabId, {action: 'prevNextAvailability'},
        function(resp) {
            console.log('prev/next availability (' + tabId + '): ' + resp.prev + "/" + resp.next);

            updatePrevNextAvailability(controlsDiv, resp);
        }
    );
}

/**
 * pause all sites but this one.
 * @param controlsDiv
 * @param site's name ('yt', 'sc' etc)
 */
function pauseAllBut(controlsDiv, site) {
    $('.controlBar').not('#template').each(function () {
        if($(this).attr('id') == controlsDiv.attr('id')) {
            return;
        }

        if($(this).attr('data-site-name') != site) {
            return;
        }

        showPlayBtn($(this));
    });
}

function activate() {
    chrome.tabs.get(tabId, function (tab) {
        chrome.tabs.highlight({windowId: tab.windowId, tabs: tab.index}, null);
    });
}