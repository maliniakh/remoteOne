"use strict";

function Site() {
    throw new Error("Abstract class")
}

Site.prototype.isIt = function () {
    throw new Error ("Not implemented");
};

Site.prototype.isPlaying = function () {
    throw new Error ("Not implemented");
};

Site.prototype.play = function () {
    throw new Error ("Not implemented");
};

Site.prototype.pause = function () {
    throw new Error ("Not implemented");
};

Site.prototype.prev = function () {
    throw new Error ("Not implemented");
};

Site.prototype.isPrevAvailable = function () {
    throw new Error ("Not implemented");
};

Site.prototype.isNextAvailable = function () {
    throw new Error ("Not implemented");
};

Site.prototype.next = function () {
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

YouTube.prototype.isPrevAvailable = function() {
    var el = $(".ytp-button.ytp-button-prev");
    if(el.length == 0) {
        return false;
    }
    return el.css('display') != 'none';
};

YouTube.prototype.isNextAvailable = function() {
    var el = $(".ytp-button.ytp-button-next");
    if(el.length == 0) {
        return false;
    }
    return el.css('display') != 'none';
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

Soundcloud.prototype.isPrevAvailable = function() {
    var el = $(".skipControl__previous");
    if(el.length == 0) {
        return false;
    }
    return !el.hasClass('disabled');
};

Soundcloud.prototype.isNextAvailable = function() {
    var el = $(".skipControl__next");
    if(el.length == 0) {
        return false;
    }
    return !el.css('disabled');
};


var sites = [new YouTube(), new Soundcloud()];

var site = $.grep(sites, function(st, i){
    return st.isIt();
})[0];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        console.log('request.action: ' + request.action);

        if(request.action == 'isPlaying'){
            //alert('isplaying cs');
            sendResponse({resp: site.isPlaying()});
            return;
        } else if (request.action == 'prevNextAvailability') {
            sendResponse({prev: site.isPrevAvailable(), next: site.isNextAvailable()});
            return;
        }

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
