const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Route to verify Flutterwave transaction
app.post("/verify", async (req, res) => {
  const { tx_ref } = req.body;

  try {
    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${tx_ref}/verify`,
      {
        headers: {
          Authorization: `Bearer FLWSECK_TEST-d44fd8953e737fa2f0d4dae6ec17e761-X`, // Replace with your secret key
        },
      }
    );

    const { data } = response;
    if (data.status === "success") {
      return res.json({ status: "successful", data });
    } else {
      return res.json({ status: "failure" });
    }
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
