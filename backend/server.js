import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import axios from "axios";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Login with Google
app.get("/auth/google", (req, res) => {
  const redirect_uri = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    prompt: "consent"
  });

  res.redirect(`${redirect_uri}?${params.toString()}`);
});

// Google callback
app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 1️⃣ Get tokens from Google
    const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/auth/google/callback`,
      grant_type: "authorization_code",
    });

    const { id_token } = tokenRes.data;

    // 2️⃣ Decode user info from Google
    const userInfo = JSON.parse(
      Buffer.from(id_token.split(".")[1], "base64").toString()
    );

    // 3️⃣ Save/find user
    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = await User.create({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      });
    }

    // 4️⃣ Create JWT
    const myToken = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${encodeURIComponent(myToken)}`);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("OAuth Error");
  }
});

// Protected route example
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Profile data", user: decoded });
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
