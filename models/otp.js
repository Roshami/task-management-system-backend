import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model('OTP', OTPSchema);

export default OTP;
