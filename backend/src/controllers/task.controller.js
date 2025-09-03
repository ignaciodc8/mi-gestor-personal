import Task from "../models/Task.js";

/**
 * Crear nueva tarea
 * @route   POST /api/tasks
 * @access  Private (requiere autenticación)
 * @body    {title, description?, dueDate?}
 */

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;

        // Validar que el título existe (único campo requerido)
        if (!title) {
            return res.status(400).json({
                message: "El título es obligatorio"
            });
        }

        // Crear tarea asociada al usuario autenticado
        // req.user viene del middleware protect
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

/**
 * Obtener todas las tareas del usuario autenticado
 * @route   GET /api/tasks
 * @access  Private
 * @returns {Array} Lista de tareas del usuario
 */
export const getTasks = async (req, res) => {
    try {
        console.log("Query params recibidos: ", req.query)

        // 1. Construir objeto de consulta base
        const query = { userId: req.user._id };

        // 2. Filtro por estado completado
        if (req.query.completed !== undefined) {
            query.completed = req.query.completed === 'true';
        }

        // 3. Búsqueda por título
        if (req.query.search) {
            query.title = {
                $regex: req.query.search,
                $options: 'i'
            };
            console.log("Query con búsqueda: ", query);
        }

        // 4. Filtros de fecha
        const now = new Date();

        if (req.query.dueSoon === 'true') {
            const sevenDaysFromNow = new Date();
            sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

            query.dueDate = {
                $gte: now,
                $lte: sevenDaysFromNow
            };
        }

        if (req.query.overdue === 'true') {
            query.dueDate = {
                $lt: now,
                $ne: null
            };

            query.completed = false;
        }

         // 5. Construir la consulta
        let tasksQuery = Task.find(query);

        // 6. Aplicar ordenamiento
        if (req.query.sort) {
            const sortField = req.query.sort;
            tasksQuery = tasksQuery.sort(sortField);
        } else {
            tasksQuery = tasksQuery.sort('-createdAt');
        }

         // 7. Ejecutar la consulta
        const tasks = await tasksQuery;

        // 8. Responder
        res.json({
            count: tasks.length,
            filters: {
                completed: req.query.completed,
                search: req.query.search,
                sort: req.query.sort,
                dueSoon: req.query.dueSoon,
                overdue: req.query.overdue
            },
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las tareas",
            error: error.message
        });
    }
};


/**
 * Obtener una tarea específica por ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
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
            })
        }

        res.json(task);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las tareas",
            error: error.message
        });
    }
};


/**
 * Actualizar una tarea
 * @route   PUT /api/tasks/:id
 * @access  Private
 * @body    {title?, description?, completed?, dueDate?}
 */
export const updateTask = async (req, res) => {
    try {
        const { title, description, completed, dueDate } = req.body;
        
        // Buscar la tarea
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        // Verificar pertenencia
        if (task.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "No autorizado para actualizar esta tarea"
            })
        }

        // Actualizar solo los campos proporcionados
        // Si el campo no viene en el body, mantener el valor actual
        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.completed = completed !== undefined ? completed : task.completed;
        task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

        // Guardar los cambios
        const updatedTask = await task.save();

        res.json({
            message: "Tarea actualizada",
            task: updatedTask
        })
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la tarea",
            error: error.message
        });
    }
};


/**
 * Eliminar una tarea
 * @route   DELETE /api/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res) => {
   try{

    // Primero buscar la tarea
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        })
    }
    
    // Verificar que pertenece al usuario
    if (task.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            message: "No autorizado para eliminar esta tarea"
        })
    }

    // Eliminar la tarea
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

