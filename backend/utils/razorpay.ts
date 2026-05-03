
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  throw new Error("Razorpay keys missing in .env");
}

const instance = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export default instance;