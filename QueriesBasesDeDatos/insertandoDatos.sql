--Ingresando datos de rol de usuario
INSERT INTO `rolusuario` (`rolDeUsuario`)
VALUES ("cliente"),
("administrador");

--Ingresando datos de Estados de Pedidos
INSERT INTO `estadospedidos` (`estadoDePedidos`)
VALUES ("nuevo"),
("confirmado"),
("preparando"),
("enviado"),
("cancelado"),
("entregado");

--Ingresando datos de Medios de Pago
INSERT INTO `mediosdepago` (`medioDePago`)
VALUES ("tarjeta"),
("efectivo");

--Ingresando datos a la tabla de productos
INSERT INTO `productos` (`nombreProducto`, `precio`)
VALUES ("pizza", 500),
("hamburguesa", 100),
("perro", 50),
("papas", 600),
("arroz", 300),
("pasta", 800);