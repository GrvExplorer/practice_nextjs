import { connect } from "mongoose";

export const connectToDB = async () => {
  try {
    const res = await connect(process.env.MONGODB_URL);
    if (res) {
      console.log("connected successfully");
    }else {
      console.log("error accrued at database connection.");
    }
  } catch (error) {
    console.log("error accrued at database connection.");
    console.log(error);
  }
};
