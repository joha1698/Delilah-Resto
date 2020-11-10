

CREATE DATABASE `proyecto3`;

--Creando tabla de Usuarios 
CREATE TABLE `usuarios` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`usuario` VARCHAR(50) NOT NULL DEFAULT '0',
	`nombreCompleto` VARCHAR(50) NOT NULL DEFAULT '0',
	`email` VARCHAR(50) NOT NULL DEFAULT '0',
	`telefono` INT NOT NULL DEFAULT 0,
	`direccionEnvio` VARCHAR(50) NOT NULL DEFAULT '0',
	`contraseña` VARCHAR(50) NOT NULL DEFAULT '0',
	`rolUsuario` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de Productos 
CREATE TABLE `Productos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`nombreProducto` VARCHAR(50) NOT NULL DEFAULT '0',
	`precio` INT NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;


--Creando tabla de Rol de usuario 
CREATE TABLE `rolUsuario` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`rolDeUsuario` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de Estado de Pedidos 
CREATE TABLE `estadosPedidos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`estadoDePedidos` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando tabla de Medios de Pago
CREATE TABLE `mediosDePago` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`medioDePago` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
;

--Creando la tabla de Pedidos
CREATE TABLE `pedidos` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`id_Producto` INT NOT NULL DEFAULT '0',
	`id_Usuario` INT NOT NULL DEFAULT '0',
	`id_EstadoPedido` INT NOT NULL DEFAULT '0',
	`id_MetodoPago` INT NOT NULL DEFAULT '0',
	`descripcionPedido` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`),
	CONSTRAINT `FK__productos` FOREIGN KEY (`id_Producto`) REFERENCES `productos` (`id`),
	CONSTRAINT `FK__usuarios` FOREIGN KEY (`id_Usuario`) REFERENCES `usuarios` (`id`),
	CONSTRAINT `FK__estadospedidos` FOREIGN KEY (`id_EstadoPedido`) REFERENCES `estadospedidos` (`id`),
	CONSTRAINT `FK__mediosdepago` FOREIGN KEY (`id_MetodoPago`) REFERENCES `mediosdepago` (`id`)
)
COLLATE='utf8_general_ci'
;

