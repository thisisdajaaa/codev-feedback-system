import { Query, Schema } from "mongoose";

import type {
  AdvancedResultsOptions,
  Pagination,
  Populate,
  QueryOptions,
} from "@/types";

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

const setPopulation = (
  query: Query<unknown, unknown>,
  population: Populate | Populate[]
) => {
  if (Array.isArray(population)) {
    for (const item of population) {
      query = setPopulation(query, item);
    }
  } else {
    query = query.populate(population);
  }

  return query;
};

/**
 * This function is used for pre defined and simplified api response
 * which only supports one level of model relationship
 */
export const advancedResults = async <T, K>(
  options: AdvancedResultsOptions<T>
) => {
  const { model, req, strict = true, populate, discardQueryList } = options;

  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = [
    "select",
    "sort",
    "page",
    "limit",
    ...(discardQueryList || []),
  ];

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

  if (populate) setPopulation(query, populate);

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
    total,
    data: results as unknown as K,
  };
};

/**
 * This class is used for custom chaining
 */
export class QueryBuilder {
  private query: Query<unknown, unknown>;
  private schema: Schema;
  private total: number;
  private page: number | undefined;
  private limit: number | undefined;

  constructor(query: Query<unknown, unknown>, schema: Schema, total: number) {
    this.query = query;
    this.schema = schema;
    this.total = total;
    this.page = undefined;
    this.limit = undefined;
  }

  pagination({ page = 1, limit = 25 }: QueryOptions): this {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let pagination: Pagination = {};

    if (endIndex < this.total) {
      pagination.next = {
        page: page + 1,
        limit,
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

    this.query = this.query.skip(startIndex).limit(limit);

    // Store page and limit for further reference
    this.page = page;
    this.limit = limit;

    return this;
  }

  sorting(sort: string): this {
    if (sort) {
      const sortBy = String(sort).split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  filtering(filter: Record<string, unknown>): Promise<this> {
    return new Promise((resolve, reject) => {
      if (!filter) {
        resolve(this);
        return;
      }

      let anyValidFilters = false;

      for (const key in filter) {
        if (!checkPathInSchema(this.schema, key)) {
          reject(new Error(`Invalid filter field: ${key}`));
          return;
        }
      }

      anyValidFilters = Object.keys(filter).length > 0;

      if (!anyValidFilters) {
        reject(new Error("No valid filter fields provided."));
        return;
      }

      this.query = this.query.find(filter);
      resolve(this);
    });
  }

  selectFields(select: string): this {
    if (select) {
      const fields = String(select).split(",").join(" ");
      this.query = this.query.select(fields);
    }
    return this;
  }

  populateFields(populate: any): this {
    this.query = this.query.populate(populate);
    return this;
  }

  build(): { query: Query<unknown, unknown>; pagination: Pagination } {
    const pagination: Pagination = {};

    if (this.page && this.limit) {
      if (this.page * this.limit < this.total) {
        pagination.next = {
          page: this.page + 1,
          limit: this.limit,
        };
      }

      if ((this.page - 1) * this.limit > 0) {
        pagination.prev = {
          page: this.page - 1,
          limit: this.limit,
        };
      }
    }

    return { query: this.query, pagination };
  }
}
