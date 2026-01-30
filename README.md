# WAHI Regional Admin

This repository contains the full source code for the WAHI Regional Admin platform, designed for independent deployment on your own server and domain.

The application uses Supabase for database, authentication, storage, and edge functions, and supports full data portability via the built-in Admin → Export Database feature.

---

## Overview

WAHI Regional Admin allows you to:

- Manage projects and regional content
- Configure SEO, content, and contact settings
- Manage admin users
- Export the full database for independent deployment or migration
- Run the system on your own Supabase instance and hosting provider

---

## Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (Database, Auth, Storage, Edge Functions)

---

## Prerequisites

Before starting, make sure you have:

- Node.js (v18+ recommended)
- npm
- A Supabase account
- Git

---

## Installation & Local Setup

### 1. Clone the repository

Run the following commands:

    git clone https://github.com/wahigroup/wahi-regional
    cd wahi-regional

---

### 2. Install dependencies

    npm install

---

### 3. Environment configuration

Create a `.env` file in the project root and fill in your Supabase credentials:

    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

---

## Supabase Setup (Required)

### 1. Create a new Supabase project

Create a fresh Supabase project from the Supabase dashboard.

---

### 2. Run database migrations

Execute all SQL files inside the following directory:

    supabase/migrations/

This will create the required tables, relationships, and policies.

---

### 3. Import application data (optional)

If you are migrating or deploying from an existing instance:

1. Open the Admin panel
2. Navigate to Export Data
3. Click Export Full Database
4. Download the exported JSON file
5. Import the JSON into your new Supabase project

Password hashes use bcrypt encryption and are compatible with Supabase Auth.

---

### 4. Deploy Edge Functions

Deploy all Edge Functions located in:

    supabase/functions/

These functions are required for backend logic and integrations.

---

### 5. Storage setup (images)

Project images are stored in the Supabase Storage bucket:

    project-images

You can either:

- Download them manually from Supabase Storage, or
- Continue using the image URLs provided in the database export

---

## Running Locally

Start the development server:

    npm run dev

The application will start with hot reload enabled.

---

## Production Build

Build the application:

    npm run build

Deploy the output to your preferred hosting provider (Vercel, Netlify, VPS, etc.).

---

## Deployment Checklist

- Supabase project created
- Database migrations executed
- Database imported (if applicable)
- Edge Functions deployed
- Environment variables configured
- Storage bucket configured
- Application built and deployed

---

## Notes

- This project is fully white-label and not tied to any external platform.
- You are free to deploy it on multiple domains or environments.
- Database exports allow easy backup, migration, and independent scaling.

---

## License

Internal / Private Use  
© WAHI Group
