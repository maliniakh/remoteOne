"use strict";

var Mixcloud = function () {
};
Mixcloud.prototype = Object.create(Site.prototype);

Mixcloud.prototype.registerMutationObservers = function () {
    var instance = new Mixcloud();

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


Mixcloud.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("mixcloud.com") >= 0;
};

Mixcloud.prototype.getName = function () {
    return 'mx';
};

Mixcloud.prototype.isPlaying = function () {
    var pauseEl = $('.player-control.pause-state');
    if(pauseEl.length == 0) {
        return false;
    } else {
        return true;
    }
};

Mixcloud.prototype.play = function () {
    $(".player-control").click();
};

Mixcloud.prototype.pause = function () {
    $(".player-control").click();
};

//Mixcloud.prototype.prev = function () {
//    $(".skipControl__previous").click();
//};

//Mixcloud.prototype.next = function () {
//    $(".skipControl__next").click();
//};

Mixcloud.prototype.isPrevAvailable = function () {
    // todo:
    return false;
};

Mixcloud.prototype.isNextAvailable = function () {
    // todo:
    return false;
};

Mixcloud.prototype.replay = function () {
    // there might not be a better way at all
    // todo:
    this.next();
    this.prev();
};

Mixcloud.prototype.getTitle = function () {
    var title = $('.player-cloudcast-title').text() + ' by ' + $('.player-cloudcast-author-link').text();
    return title;
};