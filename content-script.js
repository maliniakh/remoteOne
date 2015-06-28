function Site() {
    throw new Error("Abstract class")
}

Site.prototype.isIt = function () {
    throw new Error ("Not implemented");
}

var YouTube = function() {};
YouTube.prototype = Object.create(Site.prototype);
YouTube.prototype.isIt = function() {
    return purl(location).attr('host').indexOf("youtube.com") >= 0;
}

YouTube.prototype.isPlaying = function() {
    var btn = $(".ytp-button.ytp-button-pause");
    if(btn.length == 1) {
        return true;
    } else if(btn.length == 0) {
        return false;
    } else {
        throw new Error('cant tell if the video is being played')
    }
}

YouTube.prototype.play = function() {
    $(".ytp-button.ytp-button-play").trigger('click');
}

YouTube.prototype.pause = function() {
    $(".ytp-button.ytp-button-pause").trigger('click');
}



var yt = new YouTube();

var site = yt;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
        //if (request. == "hello")
        //    sendResponse({farewell: "goodbye"});

        //$(".ytp-button").click(function () {
        //    //alert("test")
        //    console.log("click " + $(this));
        //})

        var playing = site.isPlaying();
        if(request.cmd == 'pause' && playing) {
            site.pause();
        } else if(request.cmd == 'play' && !playing) {
            site.play();
        }

        //var btn = $(".ytp-button.ytp-button-play");
        //if(btn.length == 1) {
        //    btn.trigger('click');
        //} else {
        //    btn = $(".ytp-button.ytp-button-pause");
        //    if(btn.length == 1) {
        //        btn.trigger('click');
        //    }
        //}

        //console.log("clicked " + btn);
    });

//function pauseVid(tab) {
//
//}
//
//function isYoutube() {
//    return $(location).attr('host').contains("youtube.com");
//}
//
//function isSoundcloud() {
//    return $(location).attr('host').contains("soundcloud.com");
//}
//
//function isVimeo() {
//    return $(location).attr('host').contains("vimeo.com");
//}
//
//function isWrzuta() {
//    return $(location).attr('host').contains("wrzuta.pl");
//}
