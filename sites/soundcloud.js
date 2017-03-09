"use strict";

var Soundcloud = function () {
};

Soundcloud.prototype = Object.create(Site.prototype);

Soundcloud.prototype.registerMutationObservers = function () {
    var instance = new Soundcloud();

    // updating titles
    new MutationObserver(function (mutations) {
            instance.sendTitle(new Soundcloud().getTitle());
        }
    ).observe(document.querySelector('.playControls__soundBadge'),
        //attributeFilter: ['title'], subtree: true, childList:true, attributes: true, characterData: true
        {subtree: true, childList: true});

    // updating buttons
    new MutationObserver(function (mutations) {
            instance.sendControlsState(
                {
                    playing: instance.isPlaying(),
                    prevAvailable: instance.isPrevAvailable(),
                    nextAvailable: instance.isNextAvailable()
                });
        }
    ).observe(document.querySelector('.playControls__play'),
        {attributeFilter: ['class'], subtree: true, attributes: true});
};

Soundcloud.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("soundcloud.com") >= 0;
};

Soundcloud.prototype.getName = function () {
    return 'sc';
};

Soundcloud.prototype.isPlaying = function () {
    if (this.controlBarHidden()) {
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
    if (this.controlBarHidden()) {
        return false;
    }

    var el = $(".skipControl__previous");
    if (el.length == 0) {
        return false;
    }
    return !el.hasClass('disabled');
};

Soundcloud.prototype.isNextAvailable = function () {
    if (this.controlBarHidden()) {
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

Soundcloud.prototype.getThumbnail = function () {
    return 'img/site/sc.png';
};

Soundcloud.prototype.controlBarHidden = function () {
    return $('.playControls').hasClass('m-visible') == false;
};