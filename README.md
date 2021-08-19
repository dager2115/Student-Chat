# Student-Chat
Esta es una aplicacion en donde se simula el sreaming de una clase cualquiera en donde los participantes tienen la posivilidad de utilizar un chat para poder comunicarse, para ello debem loguearse con su nombre de usuario y contraseña y directamente entraran a la clase.

Tambien se cuenta con la posibilidad de crear una cuenta nueva pero esta se creara siempre con un rol de estudiante para usar la de moderador tendras que ingresar con la especificada mas adelante.

Ademas de esto tendra una tabla para los moderadores en donde podra ver una lista de todos los usuarios existentes y de los mensajes que haya enviado cada uno, ademas de una manera de enlistar dichos mensajes.  

# `npm insatll y start`

Para poder utilizar esta aplicacion debes correr el comando npm install tanto en la carpeta server como en la de client y  luego npm start tambien en ambas, ellos se correran en puertos diferentes que tendras que colocar en tus variables de entorno

# `database`

para poder utilizar el servidor deberas crear una base de datos en postgres, no importa el nombre y luego colocar en tus variables de entorno las credenciales para poder acceder a la base de datos.

en esta vendran por defecto 2 usuarios cargados los cuales puedes usar para probar el chat en tiempo real, estos iniciaran sesion con su respectivo nombre de usuario y contraseña que son:

moderador
userName: Profesor
password: 12345

Estudiante
userName: Alumno
password: 12345

# `.env`

deberas tener un archivo .env en el server y el otro en el client y deberas manejar las siguientes variables 

para el client deberas usar:

1. EACT_APP_API_PATH ejm: https://my.api.path
2. REACT_APP_SERVER_HOST_API ejm: http://localhost:3000/
3. REACT_APP_SERVER_HOST  ejm: http://localhost:3000/
4. PORT ejm: 3001

para el server deberar usar:

1. DB_NAME ejm: database
2. DB_HOST ejm: localhost 
3. DB_PASSWORD ejm: password
4. DB_USER ejm: postgres 
5. PORT ejm: 3001
6. SECRET ejm: estoEsUnSecreto
