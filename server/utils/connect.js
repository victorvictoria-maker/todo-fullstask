import mongoose from "mongoose";

const connection = { isConnected: null };

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected, "connected");
  } catch (error) {
    console.log("Could not connect to the database", error);
  }
};
