## Getting Started

This is a Node.js application that uses Express to create a simple REST API for managing products. This project is designed to demonstrate the setup and execution of unit, integration, and end-to-end (e2e) tests using Mocha, Chai and Newman. The tests are configured to generate detailed reports using Mochawesome and Newman reporters.

### Prerequisites

    Node.js and npm install on your system

  1. Clone the repository: https://github.com/vaidehibhambure/Test-Submission-Task-2
    

  2. Navigate to the project directory: 
  cd Test-Submission-Task-2

  3. Install the dependencies: 
    npm install

    Running the application:
    Start the server: node server.js

    This will start the server on port 3000. You can access the API endpoints using a tool like Postman.

    **API Endpoints**

    GET /api/products - Retrieves all products
    GET /api/products - Retrieves a product by ID
    GET /api/products?name= - Retrieves products by name (using a LIKE query)
    POST /api/products - Creates a new product
    PUT /api/products/id - Updates a product by ID
    DELETE /api/products/id - Delete a product by ID

    ### Example Usage (using Postman)

    Create a new GET request and enter http://localhost:3000/api/products in the URL field.
    Send the request. The response should be a JSON array containing all of the products in the database.

    **./app.js:**

    This is the main application logic file.

    **./logic.js:**

    This file contains functions for interacting with the database (likely containing product data).

    **./server.js:**

    This file starts the Node server and connects it to the app.js file.

    **./database.js:**

    This file contains functions for connecting to and interacting with the database.

    **./unit.test.js:**

    This file contains unit tests for the logic.js functions.

    **./integration.test.js:**

    This file contains integration tests for the API endpoints defined in app.js.

    ## **Tests**
    The project includes unit and integration tests written with Chai and Mocha. To run the tests:

### 1. Unit Tests
**npm run test:unit**

This script runs unit tests located in __tests__/unit/unit.test.js and generates a report in the mochawesome format saved as unit.html.

### 2. Integration Tests
**npm run test:integration**

This script runs integration tests located in __tests__/integration/integration.test.js and generates a mochawesome report saved as integration.html.

### 3. End-to-End (E2E) Tests
**npm run test:e2e**

This script runs e2e tests using Newman with a Postman collection located in __tests__/e2e/postman_collection.json. The report is generated using htmlextra reporter with the title "e2e test report".

  ## Reports

    ### Unit Test Report
        Location: mochawesome-report/unit.html
        Description: Provides detailed information about the unit tests including pass/fail status, errors, and test duration.

    ### Integration Test Report
        Location: mochawesome-report/integration.html
        Description: Provides detailed information about the integration tests, including pass/fail status, errors, and test duration.

    ### E2E Test Report
        Location: mochawesome-report/e2e.html
        Description: Provides detailed information about the end-to-end tests, including pass/fail status, request/response details, and test duration.

## License
This project is licensed under the ISC License.

You can customize the repository URL and add any additional details you find necessary. This README file provides a clear overview of the project, installation instructions, available scripts, and details about the generated reports.
