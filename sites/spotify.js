"use strict";

// todo: make it work, had some issues when using it that way before
//var appPlayerFrm = $('#app-player').contents();

$('#app-player').contents().mutationSummary("connect", callback, [{
    all: true
}]);

//$('#app-player').contents().find("#cover-art").mutationSummary("connect", callback, [{
//    all: true
//}]);

function callback(summaries) {
    var firstSummary = summaries[0],
        $firstElement = $(firstSummary.added[0]);

    console.log('mutation: ' + $firstElement);
}

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

    var btn = $('#app-player').contents().find("#play-pause");
    if (btn.hasClass('playing')) {
        return true;
    } else {
        return false;
    }
};

Spotify.prototype.play = function () {
    $('#app-player').contents().find("#play-pause").click();
};

Spotify.prototype.pause = function () {
    $('#app-player').contents().find("#play-pause").click();
};

Spotify.prototype.prev = function () {
    $('#app-player').contents().find("#previous").click();
};

Spotify.prototype.next = function () {
    $('#app-player').contents().find("#next").click();
};

Spotify.prototype.isPrevAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $('#app-player').contents().find('#previous');
    if (el.length == 0) {
        return false;
    }

    return !el.hasClass('disabled');
};

Spotify.prototype.isNextAvailable = function () {
    if(this.controlBarHidden()) {
        return false;
    }

    var el = $('#app-player').contents().find("#next");
    if (el.length == 0) {
        return false;
    }
    return !el.hasClass('disabled');
};

Spotify.prototype.replay = function () {
    // there might not be a better way at all
    this.next();
    this.prev();
};

Spotify.prototype.getTitle = function () {
    return $('#app-player').contents().find('#track-name > a').text() + ' - ' + $('#app-player').contents().find('#track-artist > a').text()
};

Spotify.prototype.controlBarHidden = function () {
    return false;
};