import { TaskModel } from "../models/task.model";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import mongoose from "mongoose";

export const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await TaskModel.find({});

  res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks retrived successfully"));
});

export const getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid task ID format");
  }

  const task = await TaskModel.findById(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, task, "Task retrived successfully"));
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "title is required");
  }

  const task = await TaskModel.create({
    title: title.trim(),
    description: description?.trim() || undefined,
    status: "todo",
  });

  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid task ID format");
  }

  let updateData: any = {};

  if (title !== undefined) {
    if (!title || !title.trim()) {
      throw new ApiError(400, "title cannot be empty");
    }
    updateData.title = title.trim();
  }

  if (description !== undefined) {
    if (description && description.trim()) {
      updateData.description = description.trim();
    } else {
      updateData.description = "";
    }
  }

  if (status !== undefined) {
    if (!["todo", "in-progress", "done"].includes(status)) {
      throw new ApiError(400, "Invalid status value");
    }
    updateData.status = status;
  }

  // Check if at least one field is being updated
  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "At least one field must be provided for update");
  }

  const task = await TaskModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid task ID format");
  }

  const task = await TaskModel.findByIdAndDelete(id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json(new ApiResponse(200, task, "Task deleted successfully"));
});
