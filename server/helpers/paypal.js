// const paypal = require("@paypal/paypal-server-sdk");

// paypal.configure({
//   mode: process.env.PAYPAL_MODE || "sandbox", // "sandbox" or "live"
//   client_id: process.env.PAYPAL_CLIENT_ID,
//   client_secret: process.env.PAYPAL_CLIENT_SECRET,
// });

// module.exports = paypal;

// const paypal = require("@paypal/paypal-server-sdk");

// const environment =
//   process.env.PAYPAL_MODE === "live"
//     ? new paypal.core.LiveEnvironment(
//         process.env.PAYPAL_CLIENT_ID,
//         process.env.PAYPAL_CLIENT_SECRET
//       )
//     : new paypal.core.SandboxEnvironment(
//         process.env.PAYPAL_CLIENT_ID,
//         process.env.PAYPAL_CLIENT_SECRET
//       );

// // Create PayPal client
// const paypalClient = new paypal.core.PayPalHttpClient(environment);

// const createOrder = async () => {
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.requestBody({
//     intent: "CAPTURE",
//     purchase_units: [
//       {
//         amount: {
//           currency_code: "USD",
//           value: "10.00",
//         },
//       },
//     ],
//   });

//   try {
//     const response = await paypalClient.execute(request);
//     console.log("Order ID:", response.result.id);
//     return response.result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = { createOrder };

// const captureOrder = async (orderId) => {
//   const request = new paypal.orders.OrdersCaptureRequest(orderId);
//   request.requestBody({});

//   try {
//     const response = await paypalClient.execute(request);
//     console.log("Payment Captured:", response.result);
//     return response.result;
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = { createOrder, captureOrder };
