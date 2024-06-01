const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const verificationSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: true },
  },
);

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;
