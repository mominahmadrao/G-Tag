import { Category } from "../models/category.models.js";
import { Product } from "../models/products.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate("createdBy", "username email");

  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});


const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).populate(
    "createdBy",
    "username email"
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category fetched successfully"));
});


// ADMIN


const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const existing = await Category.findOne({ name });

  if (existing) {
    throw new ApiError(400, "Category already exists");
  }

  const category = await Category.create({
    name,
    description,
    createdBy: req.user._id,  
  });

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});


const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  category.name = req.body.name || category.name;
  category.description = req.body.description || category.description;

  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Category updated successfully"));
});


const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const productExists = await Product.findOne({ category: category._id });

  if (productExists) {
    throw new ApiError(
      400,
      "Cannot delete category with existing products"
    );
  }

  await category.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
