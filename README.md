# Henry Countries

Henry Countries es una aplicación full-stack para explorar países, consultar información geográfica y crear actividades turísticas asociadas a uno o más países. Permite navegar un listado paginado, buscar por nombre, aplicar filtros, ordenar resultados, revisar el detalle de cada país y registrar nuevas actividades.

El proyecto nació como una práctica individual de bootcamp y fue estabilizado con foco en presentación profesional para portfolio, manteniendo el stack y la arquitectura original.

## Vista previa

> Capturas sugeridas antes de publicar el portfolio:
>
> - `docs/screenshots/home-desktop.png` — pantalla principal con filtros y cards de países.
> - `docs/screenshots/details-desktop.png` — detalle de país con actividades asociadas.
> - `docs/screenshots/create-activity-mobile.png` — formulario responsive para crear actividades.
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

## Arquitectura

```text
PI-Countries/
├── api/
│   ├── index.js              # Inicio de API, sincronización de DB y seed de países
│   ├── src/
│   │   ├── app.js            # App Express, middleware, CORS y manejo de errores
│   │   ├── db.js             # Conexión Sequelize y relaciones entre modelos
│   │   ├── models/           # Modelos Country y Activity
│   │   └── routes/           # Rutas /countries y /activities
│   └── tests/                # Tests de modelos y rutas del backend
└── client/
    ├── public/
    └── src/
        ├── Actions/          # Acciones Redux y llamadas a la API
        ├── Components/       # Páginas y componentes de UI
        ├── Reducer/          # Reducer Redux y tests del reducer
        └── Store/            # Configuración del store
```

Frontend y backend están pensados para desplegarse por separado. El frontend lee la URL base de la API desde `REACT_APP_API_URL` y el backend lee el origen permitido del cliente desde `CLIENT_URL`.

## Variables de entorno

### Backend (`api/.env`)

Crear un archivo local a partir del ejemplo:

```bash
cd api
cp .env.example .env
```

Variables disponibles:

| Variable | Obligatoria | Descripción | Ejemplo |
| --- | --- | --- | --- |
| `PORT` | No | Puerto donde corre la API. | `3001` |
| `NODE_ENV` | No | Entorno de ejecución. | `development` |
| `CLIENT_URL` | Sí en deploy | Origen del frontend habilitado por CORS. | `http://localhost:3000` |
| `DB_USER` | Sí en local | Usuario de PostgreSQL. | `postgres` |
| `DB_PASSWORD` | Sí en local | Contraseña de PostgreSQL. | `postgres` |
| `DB_HOST` | Sí en local | Host de PostgreSQL. | `localhost` |
| `DB_PORT` | No | Puerto de PostgreSQL. | `5432` |
| `DB_NAME` | No | Nombre de la base de datos. | `countries` |
| `DATABASE_URL` | Alternativa en deploy | Cadena completa de conexión a PostgreSQL. Tiene prioridad sobre `DB_*`. | `postgres://user:pass@host:5432/db` |
| `COUNTRIES_API_URL` | No | Endpoint utilizado para el seed desde Rest Countries. | `https://restcountries.com/v3.1/all` |

### Frontend (`client/.env`)

Crear un archivo local a partir del ejemplo:

```bash
cd client
cp .env.example .env
```

| Variable | Obligatoria | Descripción | Ejemplo |
| --- | --- | --- | --- |
| `REACT_APP_API_URL` | Sí en deploy | URL base del backend sin barra final. | `http://localhost:3001` |

> Create React App solo expone variables que empiezan con `REACT_APP_`.

## Instalación

### Requisitos previos

- Node.js y npm
- PostgreSQL
- Una base de datos PostgreSQL llamada `countries` para desarrollo local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd PI-Countries
```

### 2. Instalar dependencias del backend

```bash
cd api
npm install
cp .env.example .env
```

Actualizar `api/.env` con las credenciales locales de PostgreSQL.

### 3. Instalar dependencias del frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Actualizar `client/.env` si la API no corre en `http://localhost:3001`.

## Ejecución local

Iniciar el backend:

```bash
cd api
npm run dev
```

En otra terminal, iniciar el frontend:

```bash
cd client
npm start
```

Abrir `http://localhost:3000`.

En el primer inicio del backend, si la tabla `countries` está vacía, los países se cargan desde Rest Countries. Los datos existentes se conservan al reiniciar.

## Scripts disponibles

### Backend (`api`)

| Script | Descripción |
| --- | --- |
| `npm start` | Inicia la API con `node index.js`, útil para entornos tipo producción. |
| `npm run dev` | Inicia la API con Nodemon para desarrollo local. |
| `npm test` | Ejecuta una vez los tests del backend. |
| `npm run test:watch` | Ejecuta los tests del backend en modo observación. |

### Frontend (`client`)

| Script | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo de Create React App. |
| `npm run build` | Genera una build de producción. |
| `npm test -- --watchAll=false` | Ejecuta una vez los tests del frontend. |
| `npm test` | Ejecuta los tests del frontend en modo interactivo/observación. |

## Endpoints de la API

URL base en desarrollo local: `http://localhost:3001`

### Países

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/countries` | Devuelve todos los países con sus actividades asociadas. |
| `GET` | `/countries?name=arg` | Devuelve países cuyo nombre coincide parcialmente, sin distinguir mayúsculas/minúsculas. |
| `GET` | `/countries/:id` | Devuelve un país por código de 3 letras y sus actividades. |

### Actividades

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/activities` | Devuelve actividades con IDs de países asociados y datos mínimos de cada país. |
| `POST` | `/activities` | Crea una actividad y la asocia con países por ID. |

Ejemplo de body para `POST /activities`:

```json
{
  "name": "Senderismo",
  "difficulty": 3,
  "duration": 4,
  "season": "Summer",
  "countries": ["ARG", "BRA"]
}
```

> Nota: el backend mantiene las temporadas en inglés (`Summer`, `Autumn`, `Winter`, `Spring`) para conservar compatibilidad interna. La interfaz las muestra en español: Verano, Otoño, Invierno y Primavera.

## Testing

Backend:

```bash
cd api
npm test
```

Frontend:

```bash
cd client
npm test -- --watchAll=false
```

Chequeo de build:

```bash
cd client
npm run build
```

## Deploy

La aplicación está preparada para desplegar frontend y backend por separado.

### Checklist para backend

- Definir `NODE_ENV=production`.
- Definir `PORT` si el proveedor lo requiere.
- Configurar `DATABASE_URL` o todas las variables `DB_*`.
- Configurar `CLIENT_URL` con la URL del frontend desplegado.
- Verificar que la base PostgreSQL exista y sea accesible.
- Ejecutar `npm start` desde la carpeta `api`.

### Checklist para frontend

- Definir `REACT_APP_API_URL` con la URL del backend desplegado.
- Ejecutar `npm run build` desde la carpeta `client`.
- Desplegar la carpeta generada `client/build`.

## Soporte responsive

La interfaz contempla:

- Grilla de países y filtros optimizados para desktop.
- Ajuste de filtros en tablet para evitar desbordes.
- Vista de una columna en mobile para Home, Detalle y Crear actividad.
- Buscador, formularios y paginado usables en pantallas pequeñas.

## Mejoras futuras

- Agregar capturas o GIFs reales en `docs/screenshots`.
- Sumar tests end-to-end con Cypress o Playwright.
- Agregar paginación server-side si el dataset crece.
- Incorporar autenticación para administrar actividades.
- Optimizar imágenes estáticas.
- Implementar internacionalización formal si la app apunta a múltiples idiomas.
- Reemplazar `sequelize.sync()` por un flujo de migraciones listo para producción.

## Autor y contacto

**Eduardo Damián Gómez**

- GitHub: [Eduman8](https://github.com/Eduman8)
- LinkedIn: [Eduardo Damián Gómez](https://www.linkedin.com/in/eduardo-dami%C3%A1n-g%C3%B3mez-89a432217/)

## Estado para portfolio

El proyecto es apto como pieza de portfolio junior frontend/fullstack después de agregar capturas y URLs de deploy. Demuestra flujo full-stack, integración con API externa, modelado relacional, manejo de estado con Redux, diseño responsive y pruebas básicas.
