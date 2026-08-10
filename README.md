# MemoryOS

> **Every memory deserves a story.**

MemoryOS is a personal operating system for human memory — designed to preserve not only photos and files, but the **people, places, stories, moments, and context** that make them meaningful.

The goal is simple:

**Your life, remembered.**

---

## 🌱 Vision

Most digital platforms store individual pieces of our lives:

* Photos
* Videos
* Messages
* Documents
* Locations
* Notes

But these pieces are usually scattered across different services.

MemoryOS aims to bring meaningful memories together into one private, structured personal space.

Instead of simply storing a photograph, MemoryOS can eventually understand:

```text
Photo
  ↓
When did it happen?
  ↓
Where?
  ↓
Who was there?
  ↓
What happened?
  ↓
What story does it belong to?
  ↓
What other memories connect to it?
```

MemoryOS is being designed as a long-term personal memory system rather than another generic cloud-storage application.

---

# ✨ Core Concepts

MemoryOS is being built around several interconnected concepts:

### Memories

Individual moments from a person's life.

### Timeline

A chronological representation of memories across time.

### Places

Memories connected to geographical locations.

### People

People connected to memories and life events.

### Collections

Curated groups of memories representing chapters, journeys, relationships, or periods of life.

### Search

Search across memories using structured information, with semantic search planned for future versions.

### AI

AI will assist with organizing, connecting, understanding, and discovering memories without replacing the user's own memories or stories.

---

# 🏗️ Current Architecture

MemoryOS currently uses:

```text
Frontend
    ↓
React + JavaScript
    ↓
Spring Boot REST API
    ↓
PostgreSQL
    ↓
Supabase Infrastructure
```

### Frontend

* React
* JavaScript / JSX
* Vite
* Tailwind CSS

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Maven

### Database

* PostgreSQL
* Flyway migrations

### Infrastructure

* Supabase Authentication
* Supabase PostgreSQL
* Supabase Storage

### Planned

* pgvector / semantic memory search
* AI-powered memory organization
* Memory connections
* Advanced media processing
* Geographic memory exploration

---

# 📁 Project Structure

```text
MemoryOs-1/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/memoryos/
│   │   │   │   ├── config/
│   │   │   │   ├── security/
│   │   │   │   ├── controller/
│   │   │   │   ├── service/
│   │   │   │   ├── repository/
│   │   │   │   ├── entity/
│   │   │   │   ├── dto/
│   │   │   │   ├── mapper/
│   │   │   │   ├── exception/
│   │   │   │   └── util/
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── db/migration/
│   │   │
│   │   └── test/
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── pom.xml
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── ...
│
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

# 🔐 Security

MemoryOS is being designed with privacy as a first-class principle.

User-owned data must always be associated with the authenticated user.

The backend is responsible for enforcing ownership.

For example:

```text
User A
 ├── Memory 1
 ├── Memory 2
 └── Memory 3

User B
 ├── Memory 4
 └── Memory 5
```

User A must never be able to access User B's memories.

### Environment Variables

Sensitive credentials are stored locally in:

```text
backend/.env
```

The `.env` file must **never be committed to GitHub**.

A safe template is provided:

```text
backend/.env.example
```

---

# 🚀 Local Development

## Requirements

Install:

* Git
* Node.js
* npm
* Java
* Maven
* PostgreSQL/Supabase account

Recommended Java version:

```text
Java 21 LTS
```

Verify:

```bash
java -version
mvn -version
node -v
npm -v
```

---

# 🎨 Frontend Setup

From the project root:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend should normally be available at:

```text
http://localhost:5173
```

---

# ☕ Backend Setup

Move into the backend:

```bash
cd backend
```

Create the local environment file:

```bash
cp .env.example .env
```

Then add your local credentials to:

```text
backend/.env
```

Start Spring Boot:

```bash
mvn spring-boot:run
```

The backend should normally run at:

```text
http://localhost:8080
```

---

# 🩺 Backend Health Check

Once the backend is running:

```text
http://localhost:8080/actuator/health
```

A healthy backend should return a response indicating:

```json
{
  "status": "UP"
}
```

---

# 🔌 API

The MemoryOS API uses:

```text
/api/v1
```

Current API areas include:

```text
/api/v1/auth
/api/v1/profile
/api/v1/memories
/api/v1/people
/api/v1/collections
/api/v1/timeline
/api/v1/search
```

The API is being developed incrementally as the MemoryOS workspace becomes functional.

---

# 🗄️ Database

MemoryOS uses PostgreSQL.

Database migrations are managed using:

```text
Flyway
```

Migration files are located at:

```text
backend/src/main/resources/db/migration/
```

Migrations are versioned and executed automatically when the Spring Boot application starts.

---

# 🔑 Supabase

Supabase is currently used as infrastructure for:

* Authentication
* PostgreSQL
* Storage

The Spring Boot application remains responsible for MemoryOS application logic and REST APIs.

Sensitive Supabase credentials belong only in:

```text
backend/.env
```

Never expose server-side Supabase credentials in the React application.

---

# 🧪 Testing

Run backend tests:

```bash
cd backend
mvn test
```

Build the backend:

```bash
mvn clean package
```

---

# 🛣️ Development Roadmap

## Phase 1 — Foundation

* [x] React frontend foundation
* [x] Landing page
* [x] Authentication route structure
* [x] Spring Boot backend foundation
* [x] PostgreSQL architecture
* [x] Flyway migrations
* [ ] Complete authentication integration
* [ ] Profile API

## Phase 2 — Core Memory System

* [ ] Create memory
* [ ] View memory
* [ ] Edit memory
* [ ] Delete memory
* [ ] Memory media
* [ ] Memory details
* [ ] Timeline
* [ ] People
* [ ] Collections
* [ ] Places

## Phase 3 — Discovery

* [ ] Memory search
* [ ] Map-based memory exploration
* [ ] Tags
* [ ] Advanced filtering
* [ ] Memory relationships

## Phase 4 — AI

* [ ] Semantic memory search
* [ ] Memory organization
* [ ] Memory connections
* [ ] Memory summaries
* [ ] AI-assisted storytelling

## Phase 5 — Long-Term Memory

* [ ] Advanced privacy controls
* [ ] Memory sharing
* [ ] Family memory spaces
* [ ] Memory export
* [ ] Long-term archival
* [ ] Future-generation memory preservation

---

# 🎯 Product Principle

MemoryOS is not intended to be another:

* Social network
* Cloud drive
* Note-taking application
* Photo gallery
* AI chatbot
* Productivity dashboard

The goal is to create a **personal memory system** that preserves not just files, but the meaning and context surrounding them.

> **Every memory deserves a story.**

---

# 🔒 Privacy Philosophy

MemoryOS deals with some of the most personal information a person can have.

Privacy is therefore a core architectural principle.

The project aims to follow:

```text
Private by default
        ↓
User controlled
        ↓
Explicit sharing
        ↓
Secure storage
        ↓
Minimal unnecessary data exposure
```

---

# 🤝 Development

MemoryOS is currently under active development.

The architecture and features may change as the product evolves.

The current focus is building the foundation:

```text
Authentication
      ↓
Backend
      ↓
Database
      ↓
Memory
      ↓
Timeline
      ↓
People
      ↓
Places
      ↓
AI
```

---

# 📜 License

License information will be added as the project moves toward its public release.

---

## MemoryOS

**Your life, remembered.**
