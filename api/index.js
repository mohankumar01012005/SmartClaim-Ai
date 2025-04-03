require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINIAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINIAI_API_KEY);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};
connectDB();

// Home Route
app.get('/', (req, res) => {
    res.send("✅ Welcome to SmartClaim-AI Backend!");
});

// Function to convert image URL to base64
async function imageUrlToBase64(imageUrl) {
    console.log("Image URL:", imageUrl);
    try {
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(response.data).toString("base64");
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
}

// Add Claim Route
app.post("/:userId/add-claim", async (req, res) => {
    try {
        const { userId } = req.params;
        const { image } = req.body;
        let extractedData = null;

        if (!image) {
            return res.status(400).json({ error: "Image is required" });
        }

        const base64Image = await imageUrlToBase64(image);
        if (!base64Image) {
            return res.status(500).json({ error: "Failed to convert image to base64" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const serverPrompt = `Extract the following key details from this medical invoice or insurance claim document and return **only** valid JSON (no additional text). Ensure all details are accurate:

{
  "patient_name": "Extracted name of the holder or patient from the image",
  "dateOfClaim": "YYYY-MM-DD of the claim from the image",
  "provider_name": "Provider name from the image",
  "address": "Address of the holder or patient from the image",
  "service_date": "YYYY-MM-DD of service from the image",
  "claim_number": "Claim number from the image",
  "total_amount": "Total billed amount (with currency) from the image",
  "insurance_provider": "Insurance Company Name",
  "claim_status": "Approved / Pending / Denied from the image"
}

⚠️ Return **only** the JSON output (no extra text, no markdown, no explanations).`;

        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: "image/jpeg",
            },
        };

        const generatedContent = await model.generateContent([serverPrompt, imagePart]);
        const rawText = generatedContent.response.text();
        const cleanedJson = rawText.replace(/```json\n|\n```/g, "").trim();

        try {
            extractedData = JSON.parse(cleanedJson);
        } catch (error) {
            console.error("❌ Error parsing JSON:", error);
            return res.status(500).json({ error: "Failed to parse extracted data" });
        }

        if (!extractedData.claim_number) {
            return res.status(400).json({ error: "Claim number missing in extracted data" });
        }

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the claim already exists
        const claimExists = user.userClaims.some(claim => claim.claimNumber === extractedData.claim_number);
        if (claimExists) {
            return res.status(400).json({ error: "Claim already exists" });
        }

        // Create the new claim object
        const newClaim = {
            claimNumber: extractedData.claim_number,
            HolderDetails: [
                {
                    patientName: extractedData.patient_name,
                    dateOfClaim: extractedData.dateOfClaim,
                    address: extractedData.address,
                    providerName: extractedData.provider_name,
                    serviedate: extractedData.service_date,
                    totalAmount: extractedData.total_amount,
                    claimStatus: extractedData.claim_status,
                    insuranceProvider: extractedData.insurance_provider
                }
            ]
        };

        // Add the new claim to the userClaims array
        user.userClaims.push(newClaim);

        // Save the updated user
        await user.save();

        res.status(201).json({ message: "Claim added successfully", claim: newClaim });

    } catch (error) {
        console.error("❌ Error adding claim:", error);
        res.status(500).json({ error: "Server error" });
    }
});



app.get("/:userId/claims", async (req, res) => {
    try {
        const { userId } = req.params;

        // Find user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return all claims
        res.status(200).json({ claims: user.userClaims });

    } catch (error) {
        console.error("❌ Error fetching claims:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Authentication Routes
app.use('/auth', require('./routes/auth'));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
