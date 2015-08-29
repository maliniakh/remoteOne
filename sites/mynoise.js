"use strict";

var MyNoise = function () {
};
MyNoise.prototype = Object.create(Site.prototype);

MyNoise.prototype.registerMutationObservers = function () {
    var instance = new MyNoise();

    // updating buttons
    new MutationObserver(function(mutations) {
            instance.sendControlsState(
                {   playing: instance.isPlaying(),
                    prevAvailable: instance.isPrevAvailable(),
                    nextAvailable: instance.isNextAvailable()
                });
        }
    ).observe(document.querySelector('#muteLabel'),
        {attributeFilter: ['class'], subtree: true, attributes: true});
};


MyNoise.prototype.isIt = function () {
    return purl(location).attr('host').indexOf("mynoise.net") >= 0;
};

MyNoise.prototype.getName = function () {
    return 'mn';
};

MyNoise.prototype.isPlaying = function () {
    var muteEl = $('#muteLabel');
    if(muteEl.attr('aria-pressed') == 'true') {
        return false;
    } else {
        return true;
    }
};

MyNoise.prototype.play = function () {
    $('#muteLabel').click();
};

MyNoise.prototype.pause = function () {
    $('#muteLabel').click();
};

//MyNoise.prototype.prev = function () {
//    $(".skipControl__previous").click();
//};

//MyNoise.prototype.next = function () {
//    $(".skipControl__next").click();
//};

MyNoise.prototype.isPrevAvailable = function () {
    // todo:
    return false;
};

MyNoise.prototype.isNextAvailable = function () {
    // todo:
    return false;
};

MyNoise.prototype.replay = function () {
};

MyNoise.prototype.getTitle = function () {
    var title = $('.bigTitle').text().trim();
    return title;
};

MyNoise.prototype.getThumbnail = function () {
    return '';
};