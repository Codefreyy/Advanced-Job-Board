<img width="1191" alt="image" src="https://github.com/Codefreyy/Advanced-Job-Board/assets/104683968/49ebac20-f2c7-4724-91f0-5bcd0b9e61f5">

<img width="1184" alt="image" src="https://github.com/Codefreyy/Advanced-Job-Board/assets/104683968/cfd7c8f9-0c96-4ff3-96f5-2d4aec22bad1">

This is a repository for An advanced Job board: React, TypeScript, Prisma, Stripe, Tailwind.

### Key Features

1.  User Authentication androute guard
2. Create/Delete/Edit/Publish job listing
3. Publishing Job listing with Stripe Integration
4. Job Board Filtering
5. shadcnUI & TailwindCSS
6. Responsive web app
5. Dark Mode toggling

#### Cloning the repository

```
git clone https://github.com/Codefreyy/Advanced-Job-Board.git
```

#### Prepare for the backend
To get the backend setup you will need to do the following:

1. Install Sqlite on your machine
2. Run `npm i`
3. Copy the .env.example file to .env
4. Run `npx prisma db push`
5. Run `npm run dev`

#### Start the app

```
cd client
npm i
npm run dev
```

#### Stripe Setup
To ensure smooth payment processing, this project utilizes Stripe as the payment gateway. Follow the steps below for proper Stripe setup:

Sign up for a Stripe account to facilitate testing and transactions. While most of the information is geared towards production, you can focus on setting up the necessary elements for development and testing purposes.

Obtain your secret API key from Stripe, which will be used for API authentication. Save this key securely in your `.env` file under the variable `STRIPE_SECRET_KEY`. You can find a template of the required environment variables in the `.env.example` file provided.

#### Webhook Setup
To test webhooks locally, this project includes three Stripe CLI versions in the root directory. Follow the steps outlined below:

Log in to your Stripe account using the Stripe CLI by running the command `stripe login`.

Set up the webhook listener by executing the command `stripe listen --forward-to localhost:3000/stripe-webhooks/job-listing-order-complete`. This command ensures that webhooks are forwarded to the specified endpoint for local testing.

Replace the command stripe with the appropriate version of the Stripe CLI according to your operating system. For example, on macOS, use stripeMac, and if you downloaded the CLI directly from Stripe's website, use stripe as the command.

Upon running the stripe listen command, you will receive a webhook signing secret in the terminal. Copy this secret and add it to your `.env` file under the variable `STRIPE_ORDER_COMPLETE_WEBHOOK_SECRET`. This secret ensures secure communication between your application and Stripe's webhooks.

With the Stripe setup and webhook configuration completed, you can now test publishing jobs as long as the Stripe CLI listener command is running.
