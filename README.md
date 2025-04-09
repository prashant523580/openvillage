# OpenVillage

**OpenVillage** is a community development and management platform built with Next.js, designed to empower rural communities through surveys, project tracking, and transparent governance. It features Google authentication, a responsive UI with TailwindCSS, MongoDB with Prisma for data management, and an admin dashboard for oversight.

---

## Features
- **Community Surveys**: Collect needs and challenges from users with offline support.
- **Project Dashboard**: Manage and display ongoing and completed community projects.
- **Governance Transparency**: Share decisions and reports with the community.
- **User Authentication**: Sign in with Google using NextAuth.js.
- **Admin Panel**: Restricted area for admins to manage users, projects, and governance.
- **Responsive Design**: Mobile-first navigation and layout with TailwindCSS.
- **Offline Capability**: Save survey responses locally when offline and sync when online.

---

## Prerequisites
Before setting up the project, ensure you have the following installed on your machine:
- **Node.js**: Version 18.x or later (recommended: `v18.17.0`).
- **npm**: Version 9.x or later (comes with Node.js).
- **MongoDB**: A local or cloud instance (e.g., MongoDB Atlas).
- **Git**: For cloning the repository.
- **Google Cloud Console**: For OAuth credentials (optional, for authentication).

---

## Setup Instructions
Follow these steps to clone, set up, and run the project locally:

### 1. Clone the Repository
git clone https://github.com/prashant523580/openvillage.git
```bash
cd openvillage
```

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

#### MongoDB connection string (replace with your own)
DATABASE_URL="mongodb://localhost:27017/openvillage"

#### NextAuth configuration
AUTH_URL="http://localhost:3000".
AUTH_SECRET="your-random-secret" # Generate with `openssl rand -base64 32` or `npx auth secret`

#### Google OAuth credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id".
GOOGLE_CLIENT_SECRET="your-google-client-secret"
#### HashPassword
AES_SECRET="your-random-secret"

- **DATABASE_URL**: Use a local MongoDB instance or a MongoDB Atlas URI.
- **AUTH_SECRET**: A random string for session encryption.
- **Google OAuth**: Get GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET by creating an OAuth 2.0 Client ID in the Google Cloud Console. Set the redirect URI to http://localhost:3000/api/auth/callback/google.

### 4. Initialize Prisma
Set up the database schema with Prisma:
```bash
npx prisma generate
npx prisma db push
```
This generates the Prisma client and pushes the schema to your MongoDB instance.
If you encounter issues, ensure your MongoDB server is running.

### 5. Run the Development Server
Start the Next.js application:
```bash
npm run dev
```
