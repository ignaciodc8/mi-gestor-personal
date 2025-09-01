# Planificación - Sistema de Gestión Personal

## 1. Funcionalidades MVP
### Usuario puede:
- [ ] Registrarse con email y contraseña
- [ ] Iniciar sesión
- [ ] Cerrar sesión
- [ ] Ver su perfil

### Tareas:
- [ ] Crear una tarea nueva
- [ ] Ver lista de todas sus tareas
- [ ] Marcar tarea como completada/pendiente
- [ ] Editar una tarea
- [ ] Eliminar una tarea
- [ ] Filtrar tareas (todas/completadas/pendientes)

## 2. Funcionalidades para después:
- [ ] Notas
- [ ] Recordatorios
- [ ] Categorías

## 3. Estructura de Base de Datos

### Colección/Tabla: Users
- _id/id
- email (único)
- password (encriptada)
- name
- createdAt
- updatedAt

### Colección/Tabla: Tasks
- _id/id
- userId (referencia al usuario)
- title
- description
- completed (boolean)
- dueDate (opcional)
- createdAt
- updatedAt

### Relaciones:
- Un usuario tiene muchas tareas
- Una tarea pertenece a un usuario

