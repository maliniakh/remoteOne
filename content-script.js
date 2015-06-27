//$(".ytp-button").click(function () {
//    //alert("test ")
//
//})



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

function pauseVid(tab ) {

}

function isYoutube() {
    return $(location).attr('host').contains("youtube.com");
}

function isSoundcloud() {
    return $(location).attr('host').contains("soundcloud.com");
}

function isVimeo() {
    return $(location).attr('host').contains("vimeo.com");
}

function isWrzuta() {
    return $(location).attr('host').contains("wrzuta.pl");
}
