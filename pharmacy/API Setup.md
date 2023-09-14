Building a Node.js API with Express, MongoDB, JWT (for authentication), and deploying it on AWS involves several steps. Here's a high-level guide:

1. **Set Up Your Development Environment**:
   - Install Node.js and npm: [Node.js Downloads](https://nodejs.org/)
   - Set up MongoDB: [MongoDB Installation](https://docs.mongodb.com/manual/administration/install-community/)
   - Install Express.js: `npm install express`

2. **Create a New Node.js Project**:
   - Navigate to your project directory and run: `npm init -y`

3. **Install Required Packages**:
   ```bash
   npm install express mongoose jsonwebtoken body-parser dotenv
   ```

4. **Set Up Express and MongoDB**:
   - Create a folder structure for your project (e.g., `controllers`, `models`, `routes`, `middleware`).
   - Connect your Node.js app to MongoDB using Mongoose.

5. **Implement Authentication with JWT**:
   - Create routes for user registration, login, and protected routes.
   - Use JWT to generate tokens for authenticated requests.

6. **Create .env File**:
   - Store sensitive information (like database URL, JWT secret, AWS credentials) in a `.env` file. Make sure to add this file to your `.gitignore` to keep it private.

7. **Set Up AWS**:
   - Create an AWS account if you don't have one.
   - Set up an S3 bucket for storing files.

8. **Install AWS SDK**:
   - Install the AWS SDK for Node.js: `npm install aws-sdk`

9. **Upload and Retrieve Files to/from AWS S3**:
   - Use the AWS SDK to upload and retrieve files from your S3 bucket.

10. **Secure Your API**:
    - Implement CORS, Helmet, and other security measures to protect your API.

11. **Testing and Debugging**:
    - Write tests using a testing framework like Mocha or Jest. Use debugging tools like `console.log` or a debugger.

12. **Document Your API**:
    - Use tools like Swagger or API Blueprint to create documentation for your API.

13. **Deploy to AWS**:
    - Choose an AWS service to host your API (e.g., EC2, Elastic Beanstalk, Lambda, etc.).
    - Configure security groups, IAM roles, and other necessary settings.

14. **Continuous Integration/Continuous Deployment (CI/CD)**:
    - Set up a CI/CD pipeline for automated testing and deployment.

15. **Monitor and Scale**:
    - Monitor your API's performance using AWS CloudWatch and scale resources as needed.

Please note that this is a high-level guide, and each step involves detailed implementation. Be sure to refer to official documentation for each technology (Express, MongoDB, AWS SDK, etc.) for specific implementation details.

Remember to handle sensitive data securely, and follow best practices for authentication, data validation, and error handling. Additionally, consider implementing rate limiting and other security measures to protect against common vulnerabilities.