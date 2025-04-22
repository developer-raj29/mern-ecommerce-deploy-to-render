const paypal = require("@paypal/paypal-server-sdk");
const paypalClient = require("../../config/paypal"); // Import PayPal Client

// ✅ Create PayPal Order
const createOrder = async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: req.body.amount, // Accept amount dynamically
        },
      },
    ],
  });

  try {
    const response = await paypalClient.execute(request);
    console.log("✅ Order Created:", response.result.id);
    res.status(200).json({ orderId: response.result.id });
  } catch (error) {
    console.error("❌ Error Creating Order:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Capture PayPal Order (After User Approves Payment)
const captureOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: "Missing orderId" });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const response = await paypalClient.execute(request);
    console.log("✅ Payment Captured:", response.result);
    res
      .status(200)
      .json({ message: "Payment successful", data: response.result });
  } catch (error) {
    console.error("❌ Error Capturing Payment:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, captureOrder };
