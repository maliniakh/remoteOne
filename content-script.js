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

var sites = [new YouTube(), new Soundcloud()];

var site = $.grep(sites, function(st, i){
    return st.isIt();
})[0];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        //if (request. == "execute")
        //    sendResponse({farewell: "goodbye"});

        //$(".ytp-button").click(function () {
        //    console.log("click " + $(this));
        //})

        var playing = site.isPlaying();
        if(request.cmd == 'pause' && playing) {
            site.pause();
        } else if(request.cmd == 'play' && !playing) {
            site.play();
        }

        // todo: sendResponse?

        //console.log("clicked " + btn);
    });

