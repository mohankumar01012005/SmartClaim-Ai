const mongoose = require('mongoose');

const holderDetails = new mongoose.Schema({
    patientName: { type: String },
    dateOfClaim: { type: String },
    providerName: { type: String },
    serviedate: { type: String },
    claimNumber: { type: String },
    totalAmount: { type: String },
    claimStatus: { type: String },
    insuranceProvider: { type: String },
    Address:{type:String}
})

const claimNumber = new mongoose.Schema({
    claimNumber: { type: String },
    HolderDetails: [holderDetails],
})

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userClaims : [claimNumber]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
