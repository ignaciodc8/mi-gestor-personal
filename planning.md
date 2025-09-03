# Planificación - Sistema de Gestión Personal

## 1. Funcionalidades MVP
### Usuario puede:
- [x] Registrarse con email y contraseña
- [x] Iniciar sesión
- [x] Cerrar sesión
- [x] Ver su perfil

### Tareas:
- [x] Crear una tarea nueva
- [x] Ver lista de todas sus tareas
- [x] Marcar tarea como completada/pendiente
- [x] Editar una tarea
- [x] Eliminar una tarea
- [x] Filtrar tareas (todas/completadas/pendientes)

### Extras implementados:
- [x] Búsqueda por título
- [x] Ordenamiento personalizable
- [x] Filtros por fecha

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


### 📝 Próximos pasos técnicos:
