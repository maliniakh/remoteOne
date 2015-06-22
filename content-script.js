//$(".ytp-button").click(function () {
//    //alert("test")
//
//})

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url : "from the extension");
        //if (request. == "hello")
        //    sendResponse({farewell: "goodbye"});

        //$(".ytp-button").click(function () {
        //    //alert("test")
        //    console.log("click " + $(this));
        //})

        var btn = $(".ytp-button.ytp-button-play");
        if(btn.length == 1) {
            btn.trigger('click');
        } else {
            btn = $(".ytp-button.ytp-button-pause");
            if(btn.length == 1) {
                btn.trigger('click');
            }
        }

        console.log("clicked " + btn);
    });
>>>>>>> 0f23081... pausing yt tabs works

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url : "from the extension");
        //if (request. == "hello")
        //    sendResponse({farewell: "goodbye"});

        //$(".ytp-button").click(function () {
        //    //alert("test")
        //    console.log("click " + $(this));
        //})

        var btn = $(".ytp-button.ytp-button-play");
        if(btn.length == 1) {
            btn.trigger('click');
        } else {
            btn = $(".ytp-button.ytp-button-pause");
            if(btn.length == 1) {
                btn.trigger('click');
            }
        }

        console.log("clicked " + btn);
    });
>>>>>>> 487e657... pausing yt tabs works, autor zmieniony


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
        "from a content script:" + sender.tab.url : "from the extension");
        //if (request. == "hello")
        //    sendResponse({farewell: "goodbye"});

        //$(".ytp-button").click(function () {
        //    //alert("test")
        //    console.log("click " + $(this));
        //})

        var btn = $(".ytp-button.ytp-button-play");
        if(btn.length == 1) {
            btn.trigger('click');
        } else {
            btn = $(".ytp-button.ytp-button-pause");
            if(btn.length == 1) {
                btn.trigger('click');
            }
        }

        console.log("clicked " + btn);
    });

function pauseVid(tab) {

}

function isYoutube() {
    return $(location).attr('host').contains("youtube.com");
}

function isSoundcloud() {
    return $(location).attr('host').contains("soundcloud.com");
}