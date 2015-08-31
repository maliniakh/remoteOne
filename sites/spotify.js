"use strict";

// todo: make it work, had some issues when using it that way before
//var appPlayerFrm = $('#app-player').contents();

var Spotify = function () {
};
Spotify.prototype = Object.create(Site.prototype);

Spotify.prototype.registerMutationObservers = function () {
    var instance = new Spotify();

    $('#app-player').ready(function () {
        // updating titles


        $('#track-name').waitUntilExists(function () {
            //var iframe = $('#app-player').contents()[0];

            console.log('#track-name just appeared');

            new MutationObserver(function (mutations) {
                    instance.sendTitle(instance.getTitle());
                    console.log('title changed event');
                }
            ).observe($('#app-player').contents().find("#track-name-wrapper")[0], {
                    subtree: true,
                    attributes: true,
                    childList: true
                });

            // updating buttons
            new MutationObserver(function (mutations) {
                    instance.sendControlsState(
                        {
                            playing: instance.isPlaying(),
                            prevAvailable: instance.isPrevAvailable(),
                            nextAvailable: instance.isNextAvailable()
                        });
                    console.log('controls changed event');
                }
            ).observe($('#app-player').contents().find("#controls")[0], {subtree: true, attributes: true});
        }, true, '#app-player');
    });
};

Spotify.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("play.spotify.com") >= 0;
};

Spotify.prototype.getName = function () {
    return 'sf';
};

Spotify.prototype.isPlaying = function () {
    if (this.controlBarHidden()) {
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
    if (this.controlBarHidden()) {
        return false;
    }

    var el = $('#app-player').contents().find('#previous');
    if (el.length == 0) {
        return false;
    }

    return !el.hasClass('disabled');
};

Spotify.prototype.isNextAvailable = function () {
    if (this.controlBarHidden()) {
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

Spotify.prototype.getThumbnail = function () {
    return 'img/site/sf.ico';
};

Spotify.prototype.controlBarHidden = function () {
    return false;
};