Proyecto Delilah Resto - Johana García

Para ejecutar el proyecto continue los siguientes pasos:

1. Se deben instalar las siguientes aplicaciones:
    -Node.js
    -Mariadb y alguna extensión para administrar esta base de datos como WorkBrench o Heidi
 
2. Crear pack.json ejecutando el comando npm init, tenga en cuenta que el archivo principal se llama endpoints.js

3. Ejecutar npm install para instalar todas las dependencias del package.json 

4. Digitar los datos de la conexión, usuario y contraseña de la base de datos en un archivo .env que será creado por usted mismo. Digitar en este mismo archivo una contraseña segura para la variable que firmara el token. Dejo un archivo de referencia llamado .envEjemplo en el que se detalla las variables y la sintaxis que espera consumir la API.

5. Ejecutar en el WorkBrench/Heidi el archivo creandoTablas.sql ubicado en la carpeta QueriesBasesDeDatos. Con este podrá crear la base de datos y sus respectivas tablas.

6. Ejecutar en el WorkBrench/Heidi el archivo insertandoDatos.sql ubicado en la carpeta QueriesBasesDeDatos. Con este podrá insertar en las tablas los datos necesarios para usar la aplicación.

7. Desde la consola ejecutar el comando node endpoints.js para iniciar la aplicación 

8. En el archivo documentacionDelilaRestoJohana.yml se indica cuales son las consultas que se puede realizar a cada modelo y cuales deben ser los parametros a ingresar, así cómo, la manera de ingresarlos (por body, por query o por header). Este archivo lo puede visualizar mejor con el editor de swagger.

9. Recuerde loguearse y obtener el token antes de consultar cualquier petición.

10. Recuerde, antes de realizar cualquier petición, agregar el token de autorización en el header de la misma. 
    
