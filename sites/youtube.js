"use strict";

var YouTube = function () {
};
YouTube.prototype = Object.create(Site.prototype);

YouTube.prototype.init = function () {
    var instance = new YouTube();

    // updating titles
    new MutationObserver(function(mutations) {
            instance.sendTitle(instance.getTitle());
        }
    ).observe(document.querySelector('.ytp-chrome-controls'),
        //attributeFilter: ['title'], subtree: true, childList:true, attributes: true, characterData: true
        {subtree: true, attributes:true});

    // updating buttons
    new MutationObserver(function(mutations) {
            instance.sendControlsState(
                {   playing: instance.isPlaying(),
                    prevAvailable: instance.isPrevAvailable(),
                    nextAvailable: instance.isNextAvailable()
                });
        }
    ).observe(document.querySelector('.ytp-chrome-controls'),
        {subtree: true, attributes: true});
    //{attributeFilter: ['class'], subtree: true, attributes: true});
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