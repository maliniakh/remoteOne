"use strict";

function Site() {
    throw new Error("Abstract class")
}

Site.prototype.isIt = function () {
    throw new Error ("Not implemented");
};

var YouTube = function() {};
YouTube.prototype = Object.create(Site.prototype);
YouTube.prototype.isIt = function() {
    return purl(location).attr('host').indexOf("youtube.com") >= 0;
};

YouTube.prototype.isPlaying = function() {
    var btn = $(".ytp-button.ytp-button-pause");
    if(btn.length == 1) {
        return true;
    } else if(btn.length == 0) {
        return false;
    } else {
        throw new Error('cant tell if the video is being played')
    }
};

YouTube.prototype.play = function() {
    $(".ytp-button.ytp-button-play").trigger('click');
};

YouTube.prototype.pause = function() {
    $(".ytp-button.ytp-button-pause").trigger('click');
};

YouTube.prototype.prev = function() {
    $(".ytp-button.ytp-button-prev").trigger('click');
};

YouTube.prototype.next = function() {
    $(".ytp-button.ytp-button-next").trigger('click');
};

var Soundcloud = function() {};
Soundcloud.prototype = Object.create(Site.prototype);
Soundcloud.prototype.isIt = function() {
    return purl(location).attr('host').indexOf("soundcloud.com") >= 0;
};

Soundcloud.prototype.isPlaying = function() {
    var btn = $(".playControl.playing");
    if(btn.length >= 1) {
        return true;
    } else {
        return false;
    }
};

Soundcloud.prototype.play = function() {
    $(".playControl").trigger('click');
};

Soundcloud.prototype.pause = function() {
    $(".playControl").trigger('click');
};

Soundcloud.prototype.prev = function() {
    $(".skipControl__previous").trigger('click');
};

Soundcloud.prototype.next = function() {
    $(".skipControl__next").trigger('click');
};

var sites = [new YouTube(), new Soundcloud()];

var site = $.grep(sites, function(st, i){
    return st.isIt();
})[0];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

        console.log('request.action: ' + request.action);
        //var playing = site.isPlaying();
        if(request.action == 'play') {
            site.play();
        } else if(request.action == 'pause') {
            site.pause();
        } else if(request.action == 'prev') {
            site.prev();
        } else if(request.action == 'next') {
            site.next();
        } else {
            console.error('unrecognized command: ' + request.action)
        }

        sendResponse({resp: 'ok'});

        //console.log("clicked " + btn);
    });
