
function saveBook() {
    alert("Save");
}


function removeBook() {
    alert("Remove");
}


// Create a parent item and two children.
// var parent = chrome.contextMenus.create({ "title": "Bookmaks" });
// var child1 = chrome.contextMenus.create(
//     { "title": "Save", "parentId": parent, "onclick": saveBook });
// var child2 = chrome.contextMenus.create(
//     { "title": "Remove", "parentId": parent, "onclick": removeBook });
// console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


// var views = chrome.extension.getViews({ type: 'popup' });

// console.log(views);

// //
// var parent = chrome.contextMenus.create({
//     "title": "Translate into chinese",
//     contexts: ['selection'],
//     onclick: function (params) {
//         if (views.length > 0) {
//             alert("opening")
//         } else {
//             window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
//         }
//     }
// });

// 发起请求
function sendRequest(url, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url, true);
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            var res = JSON.parse(json)
            callback(res);
        }
    };
}


function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
            if (callback) callback(response);
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendRequest(request.url, (res) => {
        sendMessageToContentScript({ value: res }, function (response) {
            console.log(response);
        });

    });
});

