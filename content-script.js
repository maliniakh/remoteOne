"use strict";

function Site() {
    throw new Error("Abstract class")
}

Site.prototype.isIt = function () {
    throw new Error("Not implemented");
};

Site.prototype.isPlaying = function () {
    throw new Error("Not implemented");
};

Site.prototype.play = function () {
    throw new Error("Not implemented");
};

Site.prototype.pause = function () {
    throw new Error("Not implemented");
};

Site.prototype.prev = function () {
    throw new Error("Not implemented");
};

Site.prototype.replay = function () {
    throw new Error("Not implemented");
};

Site.prototype.isPrevAvailable = function () {
    throw new Error("Not implemented");
};

Site.prototype.isNextAvailable = function () {
    throw new Error("Not implemented");
};

Site.prototype.next = function () {
    throw new Error("Not implemented");
};

Site.prototype.getTitle = function () {
    throw new Error("Not implemented");
};

var YouTube = function () {
};
YouTube.prototype = Object.create(Site.prototype);
YouTube.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("youtube.com") >= 0;
};

YouTube.prototype.isPlaying = function () {
    if ($(".playing-mode").length == 1) {
        return true;
    } else if ($(".paused-mode").length == 1 || $(".ended-mode").length) {
        return false;
    } else {
        throw new Error('cant tell if the video is being played')
    }
};

YouTube.prototype.play = function () {
    $(".ytp-button.ytp-play-button").click();
};

YouTube.prototype.pause = function () {
    $(".ytp-button.ytp-play-button").click();
};

YouTube.prototype.prev = function () {
    $(".ytp-button.ytp-prev-button")[0].click();
};

YouTube.prototype.next = function () {
    $(".ytp-button.ytp-next-button")[0].click();
};

YouTube.prototype.isPrevAvailable = function () {
    var el = $(".ytp-button.ytp-prev-button");
    if (el.length == 0) {
        return false;
    }
    return el.css('display') != 'none';
};

YouTube.prototype.isNextAvailable = function () {
    var el = $(".ytp-button.ytp-next-button");
    if (el.length == 0) {
        return false;
    }
    return el.css('display') != 'none';
};

YouTube.prototype.replay = function () {
    $('video')[0].currentTime = 0;
    this.play();
};

YouTube.prototype.getTitle = function () {
    return $('#eow-title').attr('title');
};

var Soundcloud = function () {
};
Soundcloud.prototype = Object.create(Site.prototype);
Soundcloud.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("soundcloud.com") >= 0;
};

Soundcloud.prototype.isPlaying = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var btn = $(".playControl.playing");
    if (btn.length >= 1) {
        return true;
    } else {
        return false;
    }
};

Soundcloud.prototype.play = function () {
    $(".playControl").click();
};

Soundcloud.prototype.pause = function () {
    $(".playControl").click();
};

Soundcloud.prototype.prev = function () {
    $(".skipControl__previous").click();
};

Soundcloud.prototype.next = function () {
    $(".skipControl__next").click();
};

Soundcloud.prototype.isPrevAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $(".skipControl__previous");
    if (el.length == 0) {
        return false;
    }
    return !el.hasClass('disabled');
};

Soundcloud.prototype.isNextAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $(".skipControl__next");
    if (el.length == 0) {
        return false;
    }
    return !el.css('disabled');
};

Soundcloud.prototype.replay = function () {
    // there might not be a better way at all
    this.next();
    this.prev();
};

Soundcloud.prototype.getTitle = function () {
    //return $(".soundTitle__title > span").html();
    var title = $(document).find("title").text().replace(' | Free Listening on SoundCloud', '');
    return title;
};

Soundcloud.prototype.controlBarHidden = function () {
    return $('.playControls').hasClass('m-visible') == false;
};


var sites = [new YouTube(), new Soundcloud()];

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

        //console.log("clicked " + btn);
    });
