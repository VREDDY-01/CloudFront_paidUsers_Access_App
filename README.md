# Secure Content Access with AWS CloudFront Signed URLs

## Overview
This project implements secure content delivery using **AWS S3 and CloudFront Signed URLs**. It ensures that only authenticated and paid users can access premium content while preventing unauthorized access and sharing.

## Features
- Securely store paid content in **Amazon S3**.
- Use **Amazon CloudFront** for efficient content distribution.
- Restrict access using **Origin Access Control (OAC) or Origin Access Identity (OAI)**.
- Generate **signed URLs** for authorized users only.
- Implement a **Node.js (Express.js) backend** for authentication and URL signing.

---
## Implementation Steps
### 1. Set Up S3 and CloudFront
- Store paid content in an **S3 bucket**.
- Set up an **Amazon CloudFront distribution** linked to the S3 bucket.
- Restrict direct S3 access by using **Origin Access Control (OAC) or Origin Access Identity (OAI)** so that content is only accessible via CloudFront.

### 2. Enable Signed URLs on CloudFront
- Configure CloudFront to use a **Key Pair** for signed URLs.
- Generate a **CloudFront Key Pair** from AWS IAM.
- Use the **private key** to sign URLs in the backend.

### 3. Implement Access Control for Paid Users
- Authenticate users via the existing **payment system**.
- Generate a **signed CloudFront URL** only for paid users.
- Provide a **limited expiration time** to prevent sharing.

---
## Code Implementation (Node.js with Express.js)
This backend API will authenticate a user, check if they are a paid subscriber, and return a signed CloudFront URL.

### 1. Install Dependencies
```sh
npm install express aws-sdk crypto create-hash
```

### 2. Clone the Repository
```sh
git clone https://github.com/VREDDY-01/CloudFront_paidUsers_Access_App.git
cd CloudFront_paidUsers_Access_App
```

### 3. Configuration & Usage
#### A. Configure CloudFront
- Enable **Signed URLs** in CloudFront and generate a **key pair**.
- Save the **Private Key (`private_key.pem`)** securely.
- Set the **Key Pair ID** in the code.

#### B. Secure the S3 Bucket
- Use a **Bucket Policy** to allow only CloudFront **OAC/OAI**.
- Ensure that users **cannot directly access S3**.

#### C. Run the Server
```sh
node server.js
```

#### D. Request a Signed URL
```sh
http://localhost:3000/get-content?user=user1
```
- **Paid users** receive access to paid content.
- **Non-paid users** receive a `403 Forbidden` error.

---
## How It Works
1. Users **authenticate** via the API.
2. The backend **verifies** if they are a paid user.
3. A **signed URL** with an expiration time is generated.
4. The user accesses **paid content securely** through CloudFront.

---
## Security Considerations
- **Keep Private Keys secure** and never expose them in the frontend.
- Use **short expiration times** for signed URLs.
- Restrict **CloudFront access** to S3 using **OAC/OAI**.

---
## License
This project is licensed under the **MIT License**.

---
## Author
K Vishnu Teja

