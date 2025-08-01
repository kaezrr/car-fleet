# Fleet Telemetry API

A backend API to manage vehicle telemetry, alerts, and analytics for fleet management.

---

## Tech Stack

- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- Docker + Docker Compose

---

## Getting Started

### Prerequisites

- Docker + Docker Compose installed

### Run the App

```bash
docker-compose up --build
```

- API will run on: `http://localhost:3000`
- PostgreSQL will run on: `localhost:5432`

---

## Environment Variables

Create a `.env` file with:

```
DATABASE_URL=postgres://hackathon:1234@postgres:5432/mydb
```

---

## API Endpoints

### Vehicles

- `POST   /vehicle/:fleetId` — Add a new vehicle
- `GET    /vehicle/:fleetId` — List all vehicles
- `GET    /vehicle/:fleetId/:carId` — Get a specific vehicle
- `DELETE /vehicle/:fleetId/:carId` — Delete a vehicle

### Telemetry

- `POST /telemetry/:fleetId` — Add telemetry data
- `GET  /telemetry/:fleetId` — Get all telemetry
- `GET  /telemetry/:fleetId/latest` — Get latest telemetry per vehicle

### Alerts

- `GET /alert/:fleetId` — Get all alerts
- `GET /alert/:fleetId/:alertId` — Get alerts by type

### Analytics

- `GET /analytics/:fleetId` — Fleet-level analytics

---

## Prisma Commands (if developing locally)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Folder Structure (Simplified)

```
src/
├── routers/     # Route handlers
├── prisma/      # Prisma schema + client
├── app.ts       # Entry point
```
