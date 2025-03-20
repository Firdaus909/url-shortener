# URL Shortener

## Overview

This is a simple URL shortening application that allows users to convert long URLs into shorter, more manageable links. It is designed to be lightweight, efficient, and easy to use.

## Features

- Shorten long URLs into compact links.
- Redirect users to the original URL when the short link is accessed.
- Track the number of times a short link is used (optional).
- Simple and intuitive interface.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/url-shortener.git
    ```
2. Navigate to the project directory:
    ```bash
    cd url-shortener
    ```
3. Set up the client:
    - Create a `.env` file in the `client` directory and add the following line:
        ```
        VITE_SERVER_URL=http://localhost:5000
        ```
      (Replace `5000` with the port your backend server is running on, if different.)
    - Install dependencies for the client:
        ```bash
        cd client
        npm install
        ```
4. Set up the server:
    - Obtain your MongoDB Atlas cluster URI.
    - Create a `.env` file in the `server` directory and add the following line:
        ```
        MONGODB_URI=your-mongodb-atlas-uri
        ```
    - Navigate to the server directory and install dependencies:
        ```bash
        cd server
        npm install
        ```

## Usage

1. Start the client application:
    ```bash
    cd client
    npm start
    ```
2. Start the server application:
    ```bash
    cd server
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

3. Enter a long URL in the input field and click "Shorten" to generate a short link.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.