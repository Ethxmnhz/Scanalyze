from flask import Flask, request, jsonify

app = Flask(__name__)

def check_cors(headers):
    """ Check for CORS vulnerabilities. """
    origin_header = next((h['value'] for h in headers if h['name'].lower() == 'origin'), None)
    if not origin_header:
        return {"status": "Vulnerable", "details": "No Access-Control-Allow-Origin header present."}
    
    allow_origin_header = next((h['value'] for h in headers if h['name'].lower() == 'access-control-allow-origin'), None)
    if allow_origin_header == '*':
        return {"status": "Vulnerable", "details": "Wildcard '*' allows all origins."}
    
    return {"status": "Not Vulnerable", "details": "CORS headers configured correctly."}

def check_clickjacking(response_headers):
    """ Check for clickjacking vulnerabilities. """
    x_frame_options = next((h['value'] for h in response_headers if h['name'].lower() == 'x-frame-options'), None)
    content_security_policy = next((h['value'] for h in response_headers if h['name'].lower() == 'content-security-policy'), None)

    if x_frame_options is None and content_security_policy is None:
        return {"status": "Vulnerable", "details": "No X-Frame-Options or Content-Security-Policy header present."}
    
    return {"status": "Not Vulnerable", "details": "Clickjacking protections are in place."}

@app.route('/scan-request', methods=['POST'])
def scan_request():
    # Get request data
    request_data = request.get_json()
    
    # Prepare headers
    request_headers = request_data.get('requestHeaders', [])
    response_headers = request_data.get('response', {}).get('responseHeaders', [])

    # Check for vulnerabilities
    cors_result = check_cors(request_headers)
    clickjacking_result = check_clickjacking(response_headers)

    # Prepare structured results
    results = {
        'scanId': request_data['id'],
        'url': request_data['url'],
        'vulnerabilities': {
            'CORS': cors_result,
            'Clickjacking': clickjacking_result
        }
    }

    # Log the results
    print(f"Scan Results: {results}")
    
    return jsonify(results), 200

if __name__ == '__main__':
    app.run(debug=True)
