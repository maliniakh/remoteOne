console.log('ver 0.1.1')

var pausedTab = undefined;

function hello() {
    var qi =  {
        url: '*://*.youtube.com/*'
    }

    chrome.tabs.query(qi, function (tabs) {
        console.log("tabs.length: " + tabs.length)
        //tabs.forEach(function(t){
        //    chrome.tabs.highlight({windowId: tabs.windowId, tabs: t.index}, function(w) {})
        //})



        // todo: pause or play?
        var cmd = 'pause';
        //if('play') {
        //    cmd = 'pause'
        //} else {
        //    cmd = 'play'
        //}

        tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, {cmd: cmd}, function (response) {
                console.log(response);
            });
        })
    })
}

chrome.browserAction.onClicked.addListener(function (tab) {
    //chrome.windows.getCurrent(function(w) {
    //    alert(w.id);
    //});

    hello();
});