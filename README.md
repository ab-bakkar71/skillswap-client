# 🛠️ SkillSwap — Freelance Micro-Task Platform

SkillSwap is a secure, full-stack micro-task marketplace platform where Clients can seamlessly post quick jobs (e.g., logo design, article writing, bug fixing), and Freelancers can browse, apply via proposals, get hired, and earn secure payouts through Stripe Integration. It operates with a fully responsive dashboard experience for three core system roles: Client, Freelancer, and Admin.

---

## 🔗 Project Links & Credentials

* **🌐 Live Client Website:** [SkillSwap Live](https://skillswap-client-dun.vercel.app/)
* **💻 Client (Frontend) Repository:** [GitHub Client Repo](https://github.com/ab-bakkar71/skillswap-client)
* **📡 Server (Backend) Repository:** [GitHub Server Repo](https://github.com/ab-bakkar71/skillswap-server)
* **⚙️ Live Server Base URL:** [Live API Endpoint](https://skillswap-server-nu.vercel.app/)

### 🔑 Test Accounts & Credentials
* **Admin Access (Hardcoded Dashboard):**
    * **Email:** `admin@gmail.com`
    * **Password:** `Asd123@asd`

---

## 🏗️ System Workflow & Architecture

The workflow below illustrates how the Client, Freelancer, and Stripe checkout pipelines interact securely within the application to complete a micro-task lifecycle:

## ✨ Key Features & Business Logic

### 1. Robust Role-Based Dashboards
* **Client Panel:** Post new tasks (default status: open), track task states, review received application proposals, accept/reject freelancer bids, and manage active jobs.
* **Freelancer Panel:** Track total/pending/accepted proposals, evaluate current running earnings, manage a public portfolio, and instantly submit active task deliverables.
* **Admin Panel:** Access platform-wide metrics (Total Users, Tasks, Active Pipelines), control user states via immediate Block/Unblock actions, and audit Stripe historical records.

### 2. Multi-Tier Authentication (Better-Auth)
* Engineered via `Better-Auth` incorporating standard secure Credentials and Google OAuth workflows.
* **Role Binding Rules:** Google login users strictly register as Clients. Form logins require manual checkbox selectors for onboarding Freelancer profiles.

### 3. Core Technical Challenges Solved
* **Dynamic Search & Filter Pipeline:** Client-side live title parsing working seamlessly side-by-side with localized string filter drops (Design, Development, Writing, Marketing, Other) without causing any generic browser window updates.
* **Server-Driven Pagination Loop:** Strict query parameters rendering a maximum allocation boundary of 9 documents per pagination index equipped with safe Prev/Next navigation blocks.
* **Stripe Escrow Architecture:** Implements a direct runtime server function verification process. Success page handlers confirm actual transaction state tokens natively before making changes on Mongo collections.
* **Status Automation Pipeline:** Payment validation hooks auto-transition matching `tasks` models directly into `in-progress` and target `proposals` straight into an `accepted` registry concurrently.

---

## 📦 Core NPM Packages Utilized

### Production Runtime Dependencies
* `next` - React application routing engine (App Router architecture).
* `react` & `react-dom` - Component baseline virtualization.
* `better-auth` & `@better-auth/mongo-adapter` - Identity validation system.
* `mongodb` - Native Database aggregation interface driver.
* `stripe` & `@stripe/stripe-js` - Financial gateway handling protocols.
* `@heroui/react` & `@heroui/styles` - Premium layout engine primitives.
* `react-icons` - Icon utility ecosystem wrapper.
* `react-toastify` - Realtime state notifications alert box.
* `react-spinners` - Micro-state runtime loaders.

### Development Utilities
* `tailwindcss` & `@tailwindcss/postcss` - Utility-first styling sheet processor.
* `babel-plugin-react-compiler` - Build memoization automation engine.
* `eslint` & `eslint-config-next` - Local standard codebase compilation auditing tool.

---