# Henry Countries

Henry Countries es una aplicación full-stack para explorar países, consultar información geográfica y crear actividades turísticas asociadas a uno o más países. Permite navegar un listado paginado, buscar por nombre, aplicar filtros, ordenar resultados, revisar el detalle de cada país y registrar nuevas actividades.

El proyecto nació como una práctica individual de bootcamp y fue estabilizado con foco en presentación profesional para portfolio, manteniendo el stack y la arquitectura original.

## Vista previa

> Capturas sugeridas antes de publicar el portfolio:
>
> - `"C:\Users\eduma\Downloads\Screenshot 2026-05-11 at 19-19-52 Henry Countries.png"` — pantalla principal con filtros y cards de países.
> - `"C:\Users\eduma\Downloads\Screenshot 2026-05-11 at 19-20-00 Henry Countries.png"` — detalle de país con actividades asociadas.
> - `"C:\Users\eduma\Downloads\Screenshot 2026-05-11 at 19-20-14 Henry Countries.png"` — formulario responsive para crear actividades.
>
> Podés generarlas manualmente después de levantar la aplicación en local.

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

## Estado para portfolio

El proyecto es apto como pieza de portfolio junior frontend/fullstack después de agregar capturas y URLs de deploy. Demuestra flujo full-stack, integración con API externa, modelado relacional, manejo de estado con Redux, diseño responsive y pruebas básicas.
