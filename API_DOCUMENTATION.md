# API Documentation

## Authentication

### Register
- **Method:** `POST`
- **Path:** `/api/auth/registro`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "nombre": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "integer",
      "nombre": "string",
      "email": "string",
      "password": "string",
      "creado_en": "timestamp"
    }
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Login
- **Method:** `POST`
- **Path:** `/api/auth/login`
- **Description:** Logs in a user.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "string"
  }
  ```
- **Response (400 Bad Request):**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Get Profile
- **Method:** `GET`
- **Path:** `/api/auth/perfil`
- **Description:** Gets the profile of the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Response (200 OK):**
  ```json
  {
    "id": "integer",
    "nombre": "string",
    "email": "string"
  }
  ```
- **Response (401 Unauthorized):**
  ```json
  {
    "error": "Access denied, no token provided" or "Invalid token"
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "error": "User not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

## Categories
All category routes are protected and require authentication.

### Get All Categories
- **Method:** `GET`
- **Path:** `/api/categories`
- **Description:** Gets all categories for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "integer",
      "nombre": "string",
      "usuario_id": "integer",
      "creado_en": "timestamp"
    }
  ]
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Create Category
- **Method:** `POST`
- **Path:** `/api/categories`
- **Description:** Creates a new category for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:**
  ```json
  {
    "nombre": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "integer",
    "nombre": "string",
    "usuario_id": "integer",
    "creado_en": "timestamp"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Update Category
- **Method:** `PUT`
- **Path:** `/api/categories/:id`
- **Description:** Updates a category for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `id`: The ID of the category to update.
- **Request Body:**
  ```json
  {
    "nombre": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "integer",
    "nombre": "string",
    "usuario_id": "integer",
    "creado_en": "timestamp"
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "error": "Category not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Delete Category
- **Method:** `DELETE`
- **Path:** `/api/categories/:id`
- **Description:** Deletes a category for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `id`: The ID of the category to delete.
- **Response (204 No Content):**
- **Response (404 Not Found):**
  ```json
  {
    "error": "Category not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

## Tags
All tag routes are protected and require authentication.

### Get All Tags
- **Method:** `GET`
- **Path:** `/api/tags`
- **Description:** Gets all tags for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Response (200 OK):**
  ```json
  [
    {
      "id": "integer",
      "nombre": "string",
      "usuario_id": "integer",
      "creado_en": "timestamp"
    }
  ]
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Create Tag
- **Method:** `POST`
- **Path:** `/api/tags`
- **Description:** Creates a new tag for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:**
  ```json
  {
    "nombre": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "integer",
    "nombre": "string",
    "usuario_id": "integer",
    "creado_en": "timestamp"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Create Task Tag
- **Method:** `POST`
- **Path:** `/api/tags/tarea-etiquetas`
- **Description:** Associates a tag with a task.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:**
  ```json
  {
    "tarea_id": "integer",
    "etiqueta_id": "integer"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "tarea_id": "integer",
    "etiqueta_id": "integer"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

## Tasks
All task routes are protected and require authentication.

### Get All Tasks
- **Method:** `GET`
- **Path:** `/api/tasks`
- **Description:** Gets all tasks for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Query Parameters:**
  - `completada`: (boolean) Filter by completed status.
  - `categoria`: (integer) Filter by category ID.
  - `prioridad`: (integer) Filter by priority.
  - `fecha_vencimiento`: (string) Filter by due date (YYYY-MM-DD).
  - `busqueda`: (string) Search by title or description.
  - `etiquetas`: (string) Comma-separated list of tag names.
  - `ordenar`: (string) Field to sort by (`creado_en`, `fecha_vencimiento`, `prioridad`, `titulo`).
  - `direccion`: (string) Sort direction (`asc` or `desc`).
- **Response (200 OK):**
  ```json
  [
    {
      "id": "integer",
      "titulo": "string",
      "descripcion": "string",
      "fecha_vencimiento": "date",
      "prioridad": "integer",
      "completada": "boolean",
      "usuario_id": "integer",
      "categoria_id": "integer",
      "creado_en": "timestamp",
      "actualizado_en": "timestamp",
      "categoria_nombre": "string",
      "etiquetas": "string"
    }
  ]
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Create Task
- **Method:** `POST`
- **Path:** `/api/tasks`
- **Description:** Creates a new task for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:**
  ```json
  {
    "titulo": "string",
    "descripcion": "string",
    "fecha_vencimiento": "date",
    "prioridad": "integer",
    "categoria_id": "integer",
    "etiquetas": ["integer"]
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "integer",
    "titulo": "string",
    "descripcion": "string",
    "fecha_vencimiento": "date",
    "prioridad": "integer",
    "completada": "boolean",
    "usuario_id": "integer",
    "categoria_id": "integer",
    "creado_en": "timestamp",
    "actualizado_en": "timestamp"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Update Task
- **Method:** `PUT`
- **Path:** `/api/tasks/:id`
- **Description:** Updates a task for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `id`: The ID of the task to update.
- **Request Body:**
  ```json
  {
    "titulo": "string",
    "descripcion": "string",
    "fecha_vencimiento": "date",
    "prioridad": "integer",
    "categoria_id": "integer",
    "etiquetas": ["integer"]
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "integer",
    "titulo": "string",
    "descripcion": "string",
    "fecha_vencimiento": "date",
    "prioridad": "integer",
    "completada": "boolean",
    "usuario_id": "integer",
    "categoria_id": "integer",
    "creado_en": "timestamp",
    "actualizado_en": "timestamp"
  }
  ```
- **Response (400 Bad Request):**
    ```json
    {
        "error": "One or more tag IDs are invalid or do not belong to the user."
    }
    ```
- **Response (404 Not Found):**
  ```json
  {
    "error": "Task not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Delete Task
- **Method:** `DELETE`
- **Path:** `/api/tasks/:id`
- **Description:** Deletes a task for the authenticated user.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `id`: The ID of the task to delete.
- **Response (204 No Content):**
- **Response (404 Not Found):**
  ```json
  {
    "error": "Task not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Complete Task
- **Method:** `PATCH`
- **Path:** `/api/tasks/:id/completar`
- **Description:** Marks a task as completed or not completed.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `id`: The ID of the task to update.
- **Request Body:**
  ```json
  {
    "completada": "boolean"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "id": "integer",
    "titulo": "string",
    "descripcion": "string",
    "fecha_vencimiento": "date",
    "prioridad": "integer",
    "completada": "boolean",
    "usuario_id": "integer",
    "categoria_id": "integer",
    "creado_en": "timestamp",
    "actualizado_en": "timestamp"
  }
  ```
- **Response (404 Not Found):**
  ```json
  {
    "error": "Task not found"
  }
  ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

## Health Check

### Health Check
- **Method:** `GET`
- **Path:** `/api/health`
- **Description:** Checks the health of the API and database connection.
- **Response (200 OK):** `OK`
- **Response (500 Internal Server Error):** `Database connection failed`

## Business Intelligence
All Business Intelligence routes are protected and require authentication.

### Get BI Query
- **Method:** `GET`
- **Path:** `/api/bi/:queryName`
- **Description:** Executes a pre-defined BI query.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Path Parameters:**
  - `queryName`: The name of the query to execute.
- **Available Queries:**
  - `userParticipationAnalysis`
  - `completionRateTrends`
  - `categoryPerformance`
  - `userProductivityPatterns`
  - `overdueTaskAnalysis`
  - `tagUsageStatistics`
  - `userRetentionMetrics`
  - `priorityDistributionAnalysis`
  - `seasonalTrends`
  - `performanceBenchmarking`
- **Response (200 OK):**
  ```json
  [
    {
      "column1": "value1",
      "column2": "value2"
    }
  ]
  ```
- **Response (404 Not Found):**
    ```json
    {
        "error": "Query not found"
    }
    ```
- **Response (500 Internal Server Error):**
  ```json
  {
    "error": "string"
  }
  ```

### Post BI Query
- **Method:** `POST`
- **Path:** `/api/bi/query`
- **Description:** Executes a dynamic BI query.
- **Headers:**
  - `Authorization`: `Bearer <token>`
- **Request Body:**
  ```json
  {
    "model": "string",
    "dimensions": ["string"],
    "measures": ["string"],
    "filters": [
      {
        "dimension": "string",
        "operator": "string",
        "value": "any"
      }
    ]
  }
  ```
- **Response (200 OK):**
    ```json
    [
        {
            "column1": "value1",
            "column2": "value2"
        }
    ]
    ```
- **Response (400 Bad Request):**
    ```json
    {
        "error": "Invalid model" or "Invalid dimensions" or "Invalid measures"
    }
    ```
- **Response (500 Internal Server Error):**
    ```json
    {
        "error": "string"
    }
    ```

