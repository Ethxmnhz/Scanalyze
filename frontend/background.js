let collectedRequests = [];
let isScanning = false;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'start-scan') {
        console.log('Scan started for URL:', message.url);
        isScanning = true;
        collectedRequests = [];
        chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeRequest, { urls: ["<all_urls>"] }, ["requestHeaders", "extraHeaders"]);
        chrome.webRequest.onCompleted.addListener(onCompleted, { urls: ["<all_urls>"] }, ["responseHeaders", "extraHeaders"]);
        sendResponse({ status: "scan-started" });
    } else if (message.type === 'stop-scan') {
        console.log('Scan stopped');
        isScanning = false;
        chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeRequest);
        chrome.webRequest.onCompleted.removeListener(onCompleted);
        sendResponse({ status: "scan-stopped" });
    } else if (message.type === 'get-requests') {
        console.log('Sending collected requests:', collectedRequests);
        sendResponse({ requests: collectedRequests });
    }
    return true; // Keeps message channel open
});

// Collect Request Details
function onBeforeRequest(details) {
    console.log('Intercepted request:', details.url);
    if (isScanning) {
        const requestEntry = {
            id: details.requestId,
            url: details.url,
            method: details.method,
            type: 'request',
            requestHeaders: details.requestHeaders,
            requestBody: null // Placeholder for the body, will be filled later
        };
        collectedRequests.push(requestEntry);
        console.log('Request added to collected requests:', requestEntry);
    }
}

// Collect Response Details
function onCompleted(details) {
    console.log('Intercepted response:', details.url);
    if (isScanning) {
        const request = collectedRequests.find(req => req.id === details.requestId);
        if (request) {
            request.response = {
                statusCode: details.statusCode,
                responseHeaders: details.responseHeaders,
                responseBody: null // Placeholder for the body, will be filled later
            };
            console.log('Response associated with request:', request);
            injectContentScript(details.tabId, request.id);
        } else {
            console.log('No matching request found for this response:', details.url);
        }
    }
}

// Inject content script to capture response body
function injectContentScript(tabId, requestId) {
    console.log('Injecting content script to capture response body for request:', requestId);
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: captureResponseBody,
        args: [requestId]
    });
}

// Function to capture the response body in the content script
function captureResponseBody(requestId) {
    console.log('Capturing response body for request:', requestId);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', location.href, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            chrome.runtime.sendMessage({ type: 'capture-body', requestId: requestId, body: xhr.responseText });
        }
    };
    xhr.send();
}

// Capture the response body from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'capture-body') {
        console.log('Received captured body for request:', message.requestId);
        const request = collectedRequests.find(req => req.id === message.requestId);
        if (request && request.response) {
            request.response.responseBody = message.body;
            console.log('Response body captured and stored:', message.body);
        } else {
            console.log('No matching request found for captured body:', message.requestId);
        }
    }
});
