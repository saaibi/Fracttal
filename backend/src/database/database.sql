CREATE SCHEMA fracttaldb;

CREATE TABLE fracttaldb.usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fracttaldb.categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    usuario_id INTEGER REFERENCES fracttaldb.usuarios(id) ON DELETE CASCADE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fracttaldb.tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_vencimiento DATE,
    prioridad INTEGER DEFAULT 1, -- 1: Baja, 2: Media, 3: Alta
    completada BOOLEAN DEFAULT FALSE,
    usuario_id INTEGER REFERENCES fracttaldb.usuarios(id) ON DELETE CASCADE,
    categoria_id INTEGER REFERENCES fracttaldb.categorias(id) ON DELETE SET NULL,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    actualizado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fracttaldb.etiquetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) UNIQUE NOT NULL,
    usuario_id INTEGER REFERENCES fracttaldb.usuarios(id) ON DELETE CASCADE,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fracttaldb.tarea_etiquetas (
    tarea_id INTEGER REFERENCES fracttaldb.tareas(id) ON DELETE CASCADE,
    etiqueta_id INTEGER REFERENCES fracttaldb.etiquetas(id) ON DELETE CASCADE,
    PRIMARY KEY (tarea_id, etiqueta_id)
);