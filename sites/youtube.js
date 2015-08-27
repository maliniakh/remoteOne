"use strict";

var YouTube = function () {
};
YouTube.prototype = Object.create(Site.prototype);

YouTube.prototype.registerMutationObservers = function () {
    var instance = new YouTube();

    // updating titles
    var el = $('.ytp-chrome-controls')[0];
    new MutationObserver(function() {
            instance.sendTitle(instance.getTitle());
        }
    ).observe(el, {subtree: true, attributes:true});

    // updating buttons
    new MutationObserver(function() {
            instance.sendControlsState(
                {   playing: instance.isPlaying(),
                    prevAvailable: instance.isPrevAvailable(),
                    nextAvailable: instance.isNextAvailable()
                });
        }
    ).observe(el, {subtree: true, attributes: true});
};

YouTube.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("youtube.com") >= 0;
};

YouTube.prototype.getName = function () {
    return 'yt';
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

YouTube.prototype.getThumbnail = function () {
    return 'img/site/yt.png';
};