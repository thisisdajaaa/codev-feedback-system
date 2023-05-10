import { Model } from "mongoose";
import { NextApiRequest } from "next";

import type { Pagination, Populate } from "@/types";

export const advancedResults = async <T>(
  model: Model<T>,
  req: NextApiRequest,
  populate?: Populate
) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = String(req.query.select).split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = String(req.query.sort).split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  let pagination: Pagination = {};

  if (endIndex < total) {
    pagination = {
      next: {
        page: page + 1,
        limit,
      },
    };
  }

  if (startIndex > 0) {
    pagination = {
      ...pagination,
      prev: {
        page: page - 1,
        limit,
      },
    };
  }

  return {
    count: results.length,
    pagination,
    data: results,
  };
};
