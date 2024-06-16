import { connect } from "mongoose";

export const connectToDB = async () => {
  try {
    const res = await connect(process.env.MONGODB_URL);
    if (res) {
      console.log("connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};
