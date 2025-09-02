import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    createTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .put(updateTask)
    .delete(deleteTask);

    export default router;