const paypal = require("@paypal/paypal-server-sdk");

// Set up PayPal Environment
const environment =
  process.env.PAYPAL_MODE === "live"
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
      );

// Create PayPal Client
const paypalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = paypalClient;
