import { Schema } from "mongoose";

import type { AdvancedResultsOptions, Pagination } from "@/types";

const checkPathInSchema = (schema: Schema, path: string): boolean => {
  const pathParts = path.split(".");
  let currentSchema = schema;

  for (const part of pathParts) {
    if (currentSchema.pathType(part) === "adhocOrUndefined") {
      return false;
    }

    if (currentSchema.path(part).schema) {
      currentSchema = currentSchema.path(part).schema;
    }
  }

  return true;
};

export const advancedResults = async <T, K>(
  options: AdvancedResultsOptions<T>
) => {
  const { model, req, strict = true, populate } = options;

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

  const parsedQuery = JSON.parse(queryStr);

  for (const key in parsedQuery) {
    if (!checkPathInSchema(model.schema, key)) {
      return {
        count: 0,
        pagination: {},
        data: [],
      };
    }
  }

  if (!strict) {
    for (const key in parsedQuery) {
      if (typeof parsedQuery[key] === "string") {
        parsedQuery[key] = { $regex: parsedQuery[key], $options: "i" };
      }
    }
  }

  // Finding resource
  query = model.find(parsedQuery);

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
    if (Array.isArray(populate)) {
      for (const item of populate) {
        query = query.populate(item);
      }
    } else {
      query = query.populate(populate);
    }
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
    data: results as K,
  };
};
