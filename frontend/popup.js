let lastDisplayedRequests = []; // To keep track of displayed requests

document.getElementById('start-scan').addEventListener('click', () => {
    const currentURL = window.location.href;
    console.log('Starting scan on:', currentURL);
    chrome.runtime.sendMessage({ type: "start-scan", url: currentURL }, (response) => {
        if (response && response.status === "scan-started") {
            document.querySelector('.status-text').textContent = 'Connected';
            document.querySelector('.status-light').style.backgroundColor = 'green';
            startListeningForRequests();
        }
    });
});

document.getElementById('stop-scan').addEventListener('click', () => {
    console.log('Stopping scan');
    chrome.runtime.sendMessage({ type: "stop-scan" }, (response) => {
        if (response && response.status === "scan-stopped") {
            document.querySelector('.status-text').textContent = 'Not Connected';
            document.querySelector('.status-light').style.backgroundColor = 'red';
        }
    });
});

// Function to sanitize HTML
function sanitizeHTML(html) {
    const text = document.createElement('div');
    text.innerText = html; // Escape HTML by creating a text node
    return text.innerHTML; // Return the sanitized HTML
}

// Update request/response list and show only relevant data
function updateRequestList(requests) {
    const requestList = document.querySelector('.results-content');
    requestList.innerHTML = ''; // Clear old data

    requests.forEach((req) => {
        // Check if the request has already been displayed
        const existingRequest = lastDisplayedRequests.find(existing => existing.id === req.id);
        if (!existingRequest) {
            const requestItem = document.createElement('div');
            requestItem.classList.add('request-item');

            // Display only key request details
            requestItem.innerHTML = `<p><strong>${sanitizeHTML(req.method)}:</strong> ${sanitizeHTML(req.url)}</p>`;
            requestItem.addEventListener('click', () => sendRequestToPython(req)); // Send request to Python

            requestList.appendChild(requestItem);

            if (req.response) {
                const responseItem = document.createElement('div');
                responseItem.classList.add('response-item');
                responseItem.innerHTML = `<p><strong>Status:</strong> ${sanitizeHTML(req.response.statusCode)}</p>`;
                responseItem.innerHTML += `<p>${sanitizeHTML(req.response.responseBody ? req.response.responseBody.substring(0, 100) : "No body available")}...</p>`; // Show truncated response body
                responseItem.addEventListener('click', () => sendResponseToPython(req)); // Send response to Python
                requestList.appendChild(responseItem);
            }

            // Add to displayed requests to avoid duplicates
            lastDisplayedRequests.push(req);
        }
    });
}

// Function to send request data to Python server
function sendRequestToPython(request) {
    fetch('http://localhost:5000/scan-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
    .then(response => response.json())
    .then(data => console.log('Request sent to Python:', data))
    .catch(error => console.error('Error sending request:', error));
}

// Function to send response data to Python server
function sendResponseToPython(request) {
    fetch('http://localhost:5000/scan-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.response)
    })
    .then(response => response.json())
    .then(data => console.log('Response sent to Python:', data))
    .catch(error => console.error('Error sending response:', error));
}

// Function to listen for new requests and update dynamically
function startListeningForRequests() {
    setInterval(() => {
        chrome.runtime.sendMessage({ type: 'get-requests' }, (response) => {
            if (response && response.requests) {
                updateRequestList(response.requests);
            } else {
                console.log('No requests received or error:', response);
            }
        });
    }, 2000); // Update every 2 seconds
}
