import { connect } from "mongoose";
import env from "./env";

const connectMongoDB = async () => {
  try {
    await connect(env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export { connectMongoDB };
