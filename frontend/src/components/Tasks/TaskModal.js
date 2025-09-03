import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import { format, parseISO } from 'date-fns';

const TaskModal = ({ isOpen, onClose, onTaskCreated, taskToEdit = null }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos si estamos editando
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title || '');
            setDescription(taskToEdit.description || '');
            // Formatear fecha para el input
            if (taskToEdit.dueDate) {
                const date = format(parseISO(taskToEdit.dueDate), 'yyyy-MM-dd');
                setDueDate(date);
            }
        } else {
            // Limpiar si es nueva tarea
            setTitle('');
            setDescription('');
            setDueDate('');
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const taskData = { 
                title, 
                description, 
                dueDate: dueDate ? new Date(dueDate + 'T12:00:00').toISOString() : null
            };
            await onTaskCreated(taskData, taskToEdit?._id);
            
            // Limpiar formulario
            setTitle('');
            setDescription('');
            setDueDate('');
            onClose();
        } catch (error) {
            setError('Error al guardar la tarea');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="title">Título *</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="¿Qué necesitas hacer?"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detalles adicionales (opcional)"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Fecha de vencimiento</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading || !title.trim()}>
                            {loading ? 'Guardando...' : (taskToEdit ? 'Guardar Cambios' : 'Crear Tarea')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;