# Adidas Coding Challenge - NodeJS Back-End
Author: Tsung-Yao Hsu  
Submission: 2023/3/16  
Email: ayao780607@gmail.com  

### Design

![Architecture Diagram](figures/design-architecture-diagram.jpg)

The public service and subscription service will be implemented with **NodeJS** and **Express** for RESTful APIs. When receiving client requests, public service sends HTTP requests to subscription service to access / modify subscriptions. For high availability and scalability, we can spin off multiple instances of each service independently since they are stateless services. Each instance will be running inside a Docker container. I plan to use a NGINX load balancer to distribute the load (with least connections method possibly) and monitor the health of the instances.

The subscription information will be persisted in a **PostgreSQL** database. I chose to store this in relational fashion since this is a structural dataset - each subscription will have the name and the email of the user.

For each new subscription, a message will be pushed by the subscription service to a **RabbitMQ** broker, and it sends the message to a queue consumed by an email service. Since we only need 85% uptime (~4.5 days downtime per month) , the messages can be non-persistent. This way, the publisher does not need to wait for publish confirms so the cost on performance will be minimal.  

### Implementation

![Implementation Diagram](figures/implementation-architecture-diagram.jpg)

At this time, only the public service, the subscription service, and the database are implemented.

Workflows:
1. Create New Subscriptions - Implemented  
2. Cancel Existing Subscriptions - Not Implemented  
3. Get Details of a Subscription - Not Implemented  
4. Get All Subscriptions - Not Implemented  

### Run The Application

```
docker compose up -d --build
```

To send a subscription request:
```
POST http://localhost:49160/subscribe
Body
{
    "firstName": "David",
    "lastName": "Jackson",
    "email": "abc@123.com"
}
```

### Testing

I attempted to implement a [unit test](tests/public_server.test.js) with Jest in public service but could not seem to resolve an issue.
Potentially, an end-to-end test could also be added for creating new subscription. A sample request can be sent to the public service, and compare the database record with the expected record.

### CI/CD Proposal

Code change & pull request created by engineers   
-> Build triggered by Jenkins  
-> Run unit tests and integration tests by Jenkins  
-> Code reviewed and merged by engineers  
-> Create a release tag by engineers  
-> Build the version by Jenkins  
-> Deployed to production by Jenkins  