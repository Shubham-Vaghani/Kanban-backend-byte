import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controller/task.controller";

const router = Router();

// get all task
router.get("/", getAllTasks);

// get perticular task
router.get("/:id", getTaskById);

// create
router.post("/", createTask);

// update
router.put("/:id", updateTask);

// delete
router.delete("/:id", deleteTask);

export default router;
