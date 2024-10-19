
# Scanalyze Setup Guide

## Set Up Python Virtual Environment

### Create a virtual environment:
```bash
python -m venv venv
```

### Activate the virtual environment:
- On Windows:
  ```bash
  venv\Scripts\activate
  ```
- On macOS/Linux:
  ```bash
  source venv/bin/activate
  ```

## Install Python Dependencies

### Navigate to the backend directory:
```bash
cd backend
```

### Install required packages:
```bash
pip install -r requirements.txt
```

## Set Up Node.js Environment

### Navigate to the frontend directory:
```bash
cd ../frontend
```

### Initialize npm:
```bash
npm init -y
```

### Install necessary libraries:
```bash
npm install axios
```

## Backend Setup

### Create Environment Variables
Create a `.env` file in the backend directory to store any environment variables (e.g., API keys).

### Run the Flask Application
Ensure your virtual environment is activated and navigate to the backend directory. Start the Flask server:
```bash
python app.py
```

## Frontend Setup

### Load the Extension in Your Browser
1. Open your browser and navigate to the extensions page (e.g., `chrome://extensions/` for Chrome).
2. Enable "Developer mode" (usually a toggle in the top right).
3. Click on "Load unpacked" and select the frontend directory.

## Running the Project
1. Open your browser and navigate to a website you want to scan.
2. Click on the Scanalyze extension icon to activate it.
3. Refresh the page to capture request and response data.

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Create a new Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
