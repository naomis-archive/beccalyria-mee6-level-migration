import { connect } from "mongoose";

/**
 * Connects to MongoDB.
 */
export const connectDatabase = async () => {
  await connect(process.env.MONGO_URI as string);
};
