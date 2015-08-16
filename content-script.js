"use strict";

var sites = [new YouTube(), new Soundcloud(), new Mixcloud(), new Spotify()];

var site = $.grep(sites, function (st, i) {
    return st.isIt();
})[0];

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log('request.action: ' + request.action);

        if (request.action == 'isPlaying') {
            sendResponse({resp: site.isPlaying()});
            return;
        } else if (request.action == 'prevNextAvailability') {
            sendResponse({prev: site.isPrevAvailable(), next: site.isNextAvailable()});
            return;
        } else if (request.action == 'title') {
            sendResponse({title: site.getTitle()});
            return;
        } else if(request.action == 'getName') {
            sendResponse({name: site.getName()});
            return;
        }

        if (request.action == 'play') {
            site.play();
        } else if (request.action == 'pause') {
            site.pause();
        } else if (request.action == 'prev') {
            site.prev();
        } else if (request.action == 'next') {
            site.next();
        } else if (request.action == 'replay') {
            site.replay();
        } else {
            console.error('unrecognized command: ' + request.action);
        }

        sendResponse({resp: 'ok'});
    });
