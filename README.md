# Dev-Bookstore

A complete e-commerce app built on the MERN stack that sells developer books.

## Project Setup

```javascript
1. Clone the repo
2. cd Dev-Bookstore
3. npm install
4. make a .env file with the following keys: DATABASE, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY, BRAINTREE_PRIVATE_KEY, EMAILID, EMAILPASSWORD, NAME
5. cd client
6. npm install
7. cd ..
5. npm run dev
6. Open the project on 127.0.0.1:3010
```

## Features

- User signup/signin with welcome email
- Create Category and Product by Admin
- CRUD operations on products
- Payment gateway (Braintree and Paypal)
- View Product and Add to cart for a user
- Update Profile for user
- Checkout using credit card and paypal (using Braintree as the payment gateway)
- Advanced search filters based on category and price range
- Books also categorized upon arrival date and bestsellers
- Order confirmation through email
- The admin can change the order status

## Technology Stack

##### MERN stack

- MongoDB
- Express.js
- React.js
- Node.js

### Check out the deployed application at:

- https://devbookstore.herokuapp.com/

#### Contributiong

Feel free to fork this repo and raise an issue or submit a PR in case of any bugs.

### Resources:

1. https://www.udemy.com/course/react-node-ecommerce/
2. https://developers.braintreepayments.com/
