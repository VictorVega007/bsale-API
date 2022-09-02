<br />
<div align="center">
  <a href="">
    <img src="src/img/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Desafío Backend Bsale</h3>
  <h2>API para el backend de la App solicitada</h2>
</div>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

En este desafío se implementa una API REST para ser consumida por cualquier aplicación web que quiera conectarse a ella. La API contiene data de productos los cuales deben obtenerse por categoria a las que pertenecen y atributos de filtrado por cada producto. 

La base de datos a la cual la API se conecta es remota y creada en MySQL. Por este motivo decidí usar Sequelize como ORM para entablar la conexión respectiva. 

Igualmente para generar la documentación de la API usé la dependencia de Swagger, cuya característica funcional se explicará más adelante en el punto resepectivo. 

## Features

### Stack seleccionado para el desarrollo

El stack que se utilizó para el desarrollo de la API fue el siguiente:

[![Node][Node.js]][Node-url] Entorno de desarrollo.

[![Express][Express.js]][Express-url] Gestión de rutas o controladores.

[![Swagger][Swagger]][Swagger-url] Generación de documentación de la API.

[![Sequelize][Sequelize]][Sequelize-url] Usado como ORM para conexión a la base de datos en MySQL

## Inicializar la app

### Requerimientos
Para poder iniciar la aplicación se debe instalar en el equipo NodeJS (https://nodejs.org/en/) ya que es el entorno en que se desarrollo la API.

### App start 
1. Al momento de clonar el repositorio de GitHub se deben instalar las dependencias requeridas para que se la app funcione. Para ello el comando a utilizar por medio de CLI es el siguiente:

```console
npm install
```

2. Una vez que las dependencias estén instaladas, los comandos para iniciar la app pueden ser los siguientes:

```console
nodemon src/index.js
node src/index.js
```

## Rutas y métodos

### Ruta '/categories'

- GET: '/'
Se obtiene el listado de las categorías disponibles de los productos que conforman cada una de ellas. El schema o model se definió con Sequelize. 

### Ruta '/products'

- GET: '/'
Se obtiene el listado completo de todos los productos según los parámetros de paginación implementada, la cual muestra 12 ítems por número de página disponible por productos.

## Documentación
La documentación respectiva que se generó con Swagger se encuentra disponible en el siguiente enlace:

-

### Queries para filtrar productos

Para el filtrado de productos se implementaron los siguientes atributos:
#### 1. Paginación
Este parámetro devolverá la cantidad de páginas disponibles por productos. Se puede filtrar conjuntamente con número de categoria, nombre de producto, descuento y poder ordenarlos de forma ascendente o descendente por precio. 

#### 2. Categoria
Con este query se puede obtener los productos disponibles y pertenecientes al número de categoria disponible en la base de datos. En total son 7 categorias. 

#### 3. Nombre del producto
Se listará la cantidad de productos disponibles según el nombre que se use como query para el filtrado en la base de datos. 

#### 4. Ordenar por precio
Es una array de dos índices (ASC = Ascendente y DESC = Descendente) para ordenar los productos respecto a su precio de acuerdo al parámetro usado.

#### 5. Descuento
Son dos queries usados para filtrar los productos que tengan un 10% o 20% de descuento en su precio. 

## Autor
Elaborado por **Victor Vega**


[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- MARKDOWN LINKS & IMAGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/victor-vega-v/
[Node.js]: https://img.shields.io/badge/Node-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB
[Node-url]: https://nodejs.org/en/
[Express.js]: https://img.shields.io/badge/Express-35495E?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://expressjs.com/
[Swagger]: https://img.shields.io/badge/Swagger-green?style=for-the-badge&logo=swagger&logoColor=black
[Swagger-url]: https://swagger.io/
[Sequelize]: https://img.shields.io/badge/Sequelize-0769AD?style=for-the-badge&logo=sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/