import Task from "../models/Task.js";

// @desc    Crear nueva tarea
// @route   POST /api/tasks
// @access  Private

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "El título es obligatorio"
            });
        }
        const task = await Task.create({
            userId: req.user._id,
            title,
            description,
            dueDate
        });

        res.status(201).json({
            message: "Tarea creada exitosamente",
            task
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        });
    }
};

// @desc    Obtener todas las tareas del usuario
// @route   GET /api/tasks
// @access  Private

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id})
        .sort({createdAt: -1}) //Más recientes primero

        res.json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las tareas",
            error: error.message
        });
    }
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "No autorizado para ver esta tarea"
            });
        }
        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la tarea",
            error: error.message
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, description, completed, dueDate } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "No autorizado para actualizar esta tarea"
            })
        }

        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

        const updatedTask = await task.save();

        res.json({
            message: "Tarea actualizada",
            task: updateTask
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la tarea",
            error: error.message
        });
    }
};

export const deleteTask = async (req, res) => {
   try{
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        })
    }
    
    if (task.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "No autorizado para eliminar esta tarea"
        })
    }
    await task.deleteOne();

    res.json({
        message: "Tarea eliminada exitosamente"
    })
   } catch(error){
    res.status(500).json({
        message: "Error al eliminar la tarea",
        error: error.message
    });
   } 
};

