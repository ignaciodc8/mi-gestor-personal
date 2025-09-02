# Planificación - Sistema de Gestión Personal

## 1. Funcionalidades MVP
### Usuario puede:
- [x] Registrarse con email y contraseña
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

## Decisiones tomadas:
- [x] Funciones del MVP: CRUD de tareas, autenticación
- [x] Pantallas: Login/Registro, Dashboard, Formulario tareas  
- [x] Base de datos: MongoDB con usuarios y tareas
- [x] Tecnologías: Node.js, Express, MongoDB, JWT, React

## Progreso Técnico

### ✅ Completado:
- **Backend configurado**: Express, MongoDB Atlas, estructura MVC
- **Modelo User**: Con todos los campos requeridos
- **Autenticación completa**:
  - Registro con validaciones y encriptación bcrypt
  - Login con verificación y generación de JWT
  - Tokens con expiración de 30 días

### 🚧 En progreso:
- Middleware de autenticación para proteger rutas
- Modelo de Task
- CRUD de tareas

### 📝 Próximos pasos técnicos:
1. Crear middleware que verifique el JWT en las rutas protegidas
2. Implementar el modelo Task con Mongoose
3. Crear controladores para el CRUD de tareas
4. Crear rutas para las tareas
5. Probar todo con Thunder Client antes de pasar al frontend