import mongoose from "mongoose";

const connection: { isConnected: null | mongoose.ConnectionStates } = {
  isConnected: null,
};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected, "connected");
  } catch (error) {
    console.log("Could not connect to the database", error);
  }
};
