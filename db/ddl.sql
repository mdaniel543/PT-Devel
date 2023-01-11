-- Se crea la tabla usuario para poder crear encuestas

CREATE TABLE usuario
(
    id_usuario int IDENTITY(1,1) PRIMARY KEY,
    email varchar(150) NOT NULL,
    password varchar(150) NOT NULL
);

-- Se crea la tabla encuesta

CREATE TABLE encuesta
(
    id_encuesta int IDENTITY(1,1) PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    descripcion varchar(50) NOT NULL,
    estado bit NOT NULL,
    id_usuario int NOT NULL,
    CONSTRAINT FK_usuario_encuesta FOREIGN KEY (id_usuario) REFERENCES [db-acme].[pt-net].usuario(id_usuario)
);

-- se crea la tabla tipos

CREATE TABLE tipo
(
    id_tipo int IDENTITY(1,1) PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

-- se crea la tabla de campos de la encuesta y se relaciona con la tabla encuesta y tipo

CREATE TABLE campo
(
    id_campo int IDENTITY(1,1) PRIMARY KEY,
    id_encuesta int NOT NULL,
    id_tipo int NOT NULL,
    nombre varchar(50) NOT NULL,
    titulo varchar(50) NOT NULL,
    es_requerido bit NOT NULL, -- 1 si es requerido, 0 si no es requerido
    CONSTRAINT fk_campo_encuesta FOREIGN KEY (id_encuesta) REFERENCES encuesta(id_encuesta),
    CONSTRAINT fk_campo_tipo FOREIGN KEY (id_tipo) REFERENCES tipo(id_tipo)
);

-- se crea la tabla respuesta

CREATE TABLE respuesta
(
    id_respuesta int IDENTITY(1,1) PRIMARY KEY,
    id_campo int NOT NULL,
    valor varchar(100) NOT NULL,
    CONSTRAINT fk_respuesta_campo FOREIGN KEY (id_campo) REFERENCES campo(id_campo)
);


INSERT INTO usuario (email, password) VALUES ('correo@gmail.com', '1234');

Insert into tipo(nombre) values ('text');

Insert into tipo(nombre) values ('date');

Insert into tipo(nombre) values ('number');

