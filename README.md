# Car Management

โปรเจคนี้มี 3 ส่วนหลัก

- `frontend` React + Vite
- `backend` Express
- `postgres` Database

## Setup Env

สร้างไฟล์ `backend/.env`

```env
POSTGRES_DB=car_management
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL=postgres://postgres:postgres@localhost:5432/car_management
PORT=3000
JWT_SECRET=change-me
JWT_EXPIRES_IN=1h
```

ถ้าใช้ Docker Compose ค่า database ใน backend container จะชี้ไปที่ service `postgres` ให้แล้ว

## Run With Docker

ใช้คำสั่งนี้ที่ root project

```bash
docker compose up
```

Docker จะรันให้ครบ

- PostgreSQL: `localhost:5432`
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

backend จะรัน migrate และ seed user admin ให้อัตโนมัติ

```text
username: admin
password: admin12345
```

ถ้าต้องการปิด service

```bash
docker compose down
```

ถ้าต้องการลบ database volume ด้วย

```bash
docker compose down -v
```

## Run Without Docker

ต้องมี Node.js และ PostgreSQL ในเครื่องก่อน

สร้าง database ชื่อ `car_management`

```sql
CREATE DATABASE car_management;
```

ติดตั้งและรัน backend

```bash
cd backend
npm install
npm run db:setup
npm run dev
```

ติดตั้งและรัน frontend

```bash
cd frontend
npm install
npm run dev
```

เปิดเว็บ

```text
http://localhost:5173
```

## Login

ใช้ user ที่ seed ไว้

```text
username: admin
password: admin12345
```

## Useful Commands

รัน migration อย่างเดียว

```bash
cd backend
npm run db:migrate
```

รัน seed อย่างเดียว

```bash
cd backend
npm run db:seed
```

ตรวจ frontend

```bash
cd frontend
npm run lint
npm run build
```
