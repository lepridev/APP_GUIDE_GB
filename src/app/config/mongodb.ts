import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connexion = await mongoose.connect(process.env.MONGO_DB_URI!);
    if (connexion.ConnectionStates.connected) {
      console.log("Connected !");
    }
  } catch (error) {
    console.log("Connected !", error);
  }
};
