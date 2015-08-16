"use strict";

var appPlayerFrm = $('#app-player');

var Spotify = function () {
};
Spotify.prototype = Object.create(Site.prototype);
Spotify.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("play.spotify.com") >= 0;
};

Spotify.prototype.getName = function () {
    return 'sf';
};

Spotify.prototype.isPlaying = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var btn = appPlayerFrm.find("#play-pause");
    if (btn.hasClass('playing')) {
        return true;
    } else {
        return false;
    }
};

Spotify.prototype.play = function () {
    appPlayerFrm.find("#play-pause").click();
};

Spotify.prototype.pause = function () {
    appPlayerFrm.find("#play-pause").click();
};

Spotify.prototype.prev = function () {
    appPlayerFrm.find("#previous").click();
};

Spotify.prototype.next = function () {
    appPlayerFrm.find("#next").click();
};

Spotify.prototype.isPrevAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $(".skipControl__previous");
    if (el.length == 0) {
        return false;
    }
    return !el.hasClass('disabled');
};

Spotify.prototype.isNextAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $(".skipControl__next");
    if (el.length == 0) {
        return false;
    }
    return !el.css('disabled');
};

Spotify.prototype.replay = function () {
    // there might not be a better way at all
    this.next();
    this.prev();
};

Spotify.prototype.getTitle = function () {
    var title = appPlayerFrm.contents().find('#track-name > a').text() + ' - ' +
        appPlayerFrm.contents().find('#track-artist > a').text()
    return title;
};

Spotify.prototype.controlBarHidden = function () {
    return false;
};