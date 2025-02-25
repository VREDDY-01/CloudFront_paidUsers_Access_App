const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = 3000;

// CloudFront Configurations
const CLOUDFRONT_URL = "https://d3jroxsxpty2ym.cloudfront.net";
const PRIVATE_KEY_PATH = "./key.pem"; // CloudFront private key path in your project
const KEY_PAIR_ID = "K3K8C33DACIZFV"; // Set this to have your key paid id which you ll get when you create a public key

// Dummy user database (Replace with real DB)
const users = {
  user1: { paid: true },
  user2: { paid: false },
};

// Function to create a signed CloudFront URL
function getSignedUrl(objectPath, expiresInSeconds = 600) {
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const policy = JSON.stringify({
    Statement: [
      {
        Resource: `${CLOUDFRONT_URL}/${objectPath}`,
        Condition: { DateLessThan: { "AWS:EpochTime": expires } },
      },
    ],
  });

  const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
  const sign = crypto.createSign("RSA-SHA1");
  sign.update(policy);
  const signature = sign.sign(privateKey, "base64");

  return `${CLOUDFRONT_URL}/${objectPath}?Expires=${expires}&Signature=${encodeURIComponent(signature)}&Key-Pair-Id=${KEY_PAIR_ID}`;
}

// Route to get a signed URL
app.get("/get-content", (req, res) => {
  const username = req.query.user; // Simulated auth
  const filePath = "index.html"; // Example content

  if (!users[username] || !users[username].paid) {
    return res.status(403).json({ message: "Access Denied: Not a paid user" });
  }

  const signedUrl = getSignedUrl(filePath);
  res.redirect(signedUrl);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
