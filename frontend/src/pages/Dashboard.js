import React, {useState, useEffect} from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import './Dashboard.css';
import TaskModal from '../components/Tasks/TaskModal';
import { es } from 'date-fns/locale';
import { isAfter, startOfDay, format, parseISO } from 'date-fns';

const Dashboard = () => {
    const {user, logout} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, completed, pending
    const [showModal, setShowModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Cargar tareas al montar el componente
    useEffect(() => {
        fetchTasks()
    }, [filter]);


    const saveTask = async (taskData, taskId = null) => {
        try {
            if (taskId) {
                // Editar tarea existente
                await api.put(`/tasks/${taskId}`, taskData);
            } else {
                // Crear nueva tarea
                await api.post('/tasks', taskData);
            }
            fetchTasks(); // Recargar tareas
            setShowModal(false);
            setTaskToEdit(null);
        } catch (error) {
            console.error('Error al guardar tarea:', error);
            throw error;
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task);
        setShowModal(true);
    };

    const handleCreate = () => {
        setTaskToEdit(null);
        setShowModal(true);
    };

    const fetchTasks = async () => {
        try {
            setLoading(true);
            let url = '/tasks';
            
            if (filter === 'completed') {
                url += '?completed=true';
            } else if (filter === 'pending') {
                url += '?completed=false';
            }

            const response = await api.get(url);
            setTasks(response.data.tasks);
        } catch (error) {
            console.log('Error al cargar las tareas: ', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTaskComplete = async (taskId, currentStatus) => {
        try {
            await api.put(`/tasks/${taskId}`, {
                completed: !currentStatus
            });
            fetchTasks();
        } catch (error) {
            console.error('Error al actualizar tarea: ', error);
        }
    };
    const deleteTask = async (taskId) => {
        if (window.confirm('¿Estas seguro de eliminar esta tarea?')) {
            try {
                await api.delete(`/tasks/${taskId}`);
                fetchTasks();       //Recargar las tareas
            } catch (error) {
                console.log('Error al eliminar la tarea: ', error);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div>
                    <h1>Mis Tareas</h1>
                    <p>Bienvenido {user?.name}!</p>
                </div>
                <button onClick={logout} className="logout-btn">
                    Cerrar Sesión
                </button>
            </header>
            <div className="dashboard-content">
                <div className="filters">
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                        >
                            Todas ({tasks.length})
                    </button>
                    <button 
                        className={filter === 'pending' ? 'active' : ''}
                        onClick={() => setFilter('pending')}
                    >
                        Pendientes
                    </button>
                    <button
                        className={filter === 'completed' ? 'active' : ''}
                        onClick={() => setFilter('completed')}
                    >
                        Completadas
                    </button>
                </div>

                <button className="add-task-btn" onClick={handleCreate}>
                    + Nueva Tarea
                </button>

                {loading ? (
                    <p className="loading">Cargando tareas...</p>
                ) : tasks.length === 0 ? (
                    <p className="no-tasks">No hay tareas {filter !== 'all' ? `${filter === 'completed' ? 'completadas' : 'pendientes'}` : ''}</p>
                ) : (
                    <div className="tasks-list">
                        {tasks.map(task => (
                            <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''} ${!task.completed && task.dueDate && isAfter(startOfDay(new Date()), startOfDay(parseISO(task.dueDate))) ? 'overdue' : ''}`}>
                                <div className="task-content">
                                    <input 
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTaskComplete(task._id, task.completed)}
                                    />
                                    <div>
                                        <h3>{task.title}</h3>
                                        {task.description && <p>{task.description}</p>}
                                        {task.dueDate && (
                                            <span className="due-date">
                                                Vence: {format(parseISO(task.dueDate), 'dd MMMM yyyy', { locale: es })}
                                            </span>
                                        )}
                                    </div>
                        </div>
                        <div className="task-actions">
                            <button className="edit-btn" onClick={() => handleEdit(task)}>✏️</button>
                            <button 
                                className="delete-btn"
                                onClick={() => deleteTask(task._id)}
                            >
                                🗑️
                            </button> 
                         </div>
                        </div>      
                        ))}
                    </div>
                )
            }
            </div>
            <TaskModal 
            isOpen={showModal}
            onClose={() => {
            setShowModal(false);
            setTaskToEdit(null);
            }}
            onTaskCreated={saveTask}
            taskToEdit={taskToEdit}
            />
        </div>
    );
};

export default Dashboard;

