# Henry Countries

Henry Countries es una aplicación full-stack para explorar países, consultar información geográfica y crear actividades turísticas asociadas a uno o más países. Permite navegar un listado paginado, buscar por nombre, aplicar filtros, ordenar resultados, revisar el detalle de cada país y registrar nuevas actividades.

El proyecto nació como una práctica individual de bootcamp y fue estabilizado con foco en presentación profesional para portfolio, manteniendo el stack y la arquitectura original.

## Vista previa

## Capturas

### Pantalla principal

![Pantalla principal](https://res.cloudinary.com/dbkfkpjjl/image/upload/v1778546417/Screenshot_2026-05-11_at_21-40-02_Henry_Countries_cq5lus.png)

### Detalle de país

![Detalle de país](https://res.cloudinary.com/dbkfkpjjl/image/upload/v1778542720/Screenshot_2026-05-11_at_19-20-00_Henry_Countries_lnk18w.png)

### Crear actividad

![Formulario para crear actividad](https://res.cloudinary.com/dbkfkpjjl/image/upload/v1778542732/Screenshot_2026-05-11_at_19-20-14_Henry_Countries_xn5q9b.png)

## Stack tecnológico

### Frontend

- React 17
- Redux clásico + Redux Thunk
- React Router DOM v5
- Axios
- Estilos por componente con CSS plano / convención tipo CSS Modules
- SweetAlert2 para mensajes de feedback
- Jest + React Testing Library

### Backend

- Node.js
- Express
- Sequelize
- PostgreSQL
- Axios para la carga inicial desde Rest Countries
- Mocha, Chai y Supertest

### API externa

- [Rest Countries](https://restcountries.com/) para poblar inicialmente la base de datos de países.

## Funcionalidades principales

- Listado de países con bandera, nombre y continente.
- Búsqueda de países por coincidencia parcial de nombre.
- Filtro por continente.
- Filtro por actividad turística asociada.
- Orden alfabético y orden por población.
- Grilla paginada de países.
- Vista de detalle con capital, subregión, área, población y actividades.
- Creación de actividades turísticas asociadas a múltiples países.
- Interfaz responsive para desktop, tablet y mobile.
- Estados básicos de carga, vacío y error.
- Validaciones en backend para países, actividades y relaciones país/actividad.



## Autor y contacto

**Eduardo Damián Gómez**

- GitHub: [Eduman8](https://github.com/Eduman8)
- LinkedIn: [Eduardo Damián Gómez](https://www.linkedin.com/in/eduardo-dami%C3%A1n-g%C3%B3mez-89a432217/)
