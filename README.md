1. Checkout master branch to clone the latest version of source code.
2. At root path, run command "docker-compose up -d" to start all services.

* NOTE: there're some sample API endpoints for testing.

- Create order:
+ Path: http://localhost:3000/orders
+ Method: POST
+ Body: {
    "totalQuantity": 26,
    "totalAmount": 100000,
    "customerId": 1
}

- Get order detail:
+ Path: http://localhost:3000/orders/:orderId
+ Method: GET

- Cancel order:
+ Path: http://localhost:3000/orders/:orderId
+ Method: PUT


* Kubernetes deployment: 
- The kubernetes templates are still be in-progress.