import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      // Admin who creates it
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const category = mongoose.model("Category", categorySchema);
