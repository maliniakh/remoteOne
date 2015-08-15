"use strict";

function Site() {
    throw new Error("Abstract class")
}

Site.prototype.isIt = function () {
    throw new Error("Not implemented");
};

Site.prototype.getName = function () {
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