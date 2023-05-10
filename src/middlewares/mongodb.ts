import mongoose, { ConnectOptions } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

/**
 * Creates a new connection to the database if one is not already connected.
 * If already connected, the current connection will be used.
 * @param handler callback function
 * @returns callback handler with req and res params passed.
 */
export const mongoHandler =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<any>,
      next: NextHandler
    ) => void
  ) =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return await handler(req, res, next);
    }

    // Use new db connection
    mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    return await handler(req, res, next);
  };

export const mongoConnect = () => {
  if (mongoose.connections[0].readyState) {
    // if connection is open return the instance of the database for cleaner queries
    return mongoose.connection.db;
  }

  return mongoose.connect(process.env.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
};
