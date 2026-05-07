import { Product } from "../models/products.models.js";
import { Category } from "../models/category.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";

const getAllProducts = asyncHandler(async (req, res) => {
  const { search, category } = req.query;

  const pipeline = [];

  //  ALWAYS start with match
  const matchStage = {};

  // Search by name
  if (search) {
    matchStage.name = { $regex: search, $options: "i" };
  }

  // Filter by category
  if (category) {
    matchStage.category = new mongoose.Types.ObjectId(category);
  }

  pipeline.push({ $match: matchStage });

  // Join category details
  pipeline.push({
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
  });

  pipeline.push({
    $unwind: "$category",
  });

  // Join creator details
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "createdBy",
      foreignField: "_id",
      as: "createdBy",
    },
  });

  pipeline.push({
    $unwind: "$createdBy",
  });

  const products = await Product.aggregate(pipeline);

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unwind: "$createdBy",
    },
  ]);

  if (!product.length) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product[0], "Product fetched successfully"));
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.aggregate([
    {
      $match: { isFeatured: true },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unwind: "$createdBy",
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Featured products fetched"));
});

// Admin only

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, images } = req.body;

  // check category exists
  const categoryExists = await Category.findById(category);

  if (!categoryExists) {
    throw new ApiError(404, "Category not found");
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
    createdBy: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // whitelist allowed fields
  const allowedFields = [
    "name",
    "description",
    "price",
    "stock",
    "images",
    "category",
    "isFeatured",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"));
});

const toggleFeaturedProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.isFeatured = !product.isFeatured;
  await product.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        `Product ${product.isFeatured ? "marked as featured" : "removed from featured"}`
      )
    );
});


const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"));
});

export {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  toggleFeaturedProduct,
  deleteProduct,
};
