-- Crear base de datos 
CREATE DATABASE readsmate;

-- Ingresar a la base de datos despues de haber sido creada
USE readsmate;

-- Crea todas las tablas a continuacion, copia la estructura de cada una de las tablas, tal y como estan
-- Si usas MySQL desde una consola, solo copia y pega el lenguaje SQL
CREATE TABLE user (
  userId INT NOT NULL AUTO_INCREMENT,
  nickname VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  role VARCHAR(5) NOT NULL DEFAULT 'user',
  PRIMARY KEY (userId)
);

CREATE TABLE article (
  articleId INT NOT NULL AUTO_INCREMENT,
  userId INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  urlFile VARCHAR(255) NOT NULL,
  PRIMARY KEY (articleId),
  FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE comment (
  commentId INT NOT NULL AUTO_INCREMENT,
  articleId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (commentId),
  FOREIGN KEY (articleId) REFERENCES article(articleId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);

/*
INSERT INTO user (nickname, email, password) VALUES ('user1', 'user1@example.com', 'password1');
INSERT INTO article (userId, title, urlFile) VALUES (1, 'Este es un titulo', 'https://example.com/article1');
INSERT INTO comment (articleId, userId, content) VALUES (1, 1, 'Este es un comentario de ejemplo');
 */