import { connect } from "mongoose";

const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export { connectMongoDB };
