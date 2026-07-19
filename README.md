# NMS Portfolio Website (NMS Glass)

A premium, modern architectural portfolio and service catalogue website built for **NMS Glass, Aluminum & Fiber Solutions**. It serves as the client-facing storefront, displaying service categories, nested subcategories, product specs, and capturing inquiries.

## 🚀 Features

- **🌐 Dynamic Showcase**: Automatically fetches and renders architectural services, parent categories, and nested subcategories directly from the Supabase database.
- **✨ Premium Glassmorphism UI**: Beautifully designed dark-mode layout with custom glassmorphism effects, smooth animations (via Framer Motion), and micro-interactions.
- **💬 WhatsApp Sales Integration**: Instant WhatsApp quick-chats generated dynamically using clean phone numbers from global configurations.
- **✉️ Zod-Validated Contact Form**: A robust inquiries form allowing potential clients to submit project requirements. Automatically registers entries in the Supabase inquiries table (monitored by the NMS Admin Panel).
- **📱 Fully Responsive**: Seamless, high-fidelity experience optimized across mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2 (App Router)
- **Library**: React 19
- **Database**: Supabase
- **Styling**: TailwindCSS 4, React Icons
- **Animation**: Framer Motion
- **Form Handling / Validation**: React Hook Form, Zod
- **Testing / Formatting**: Vitest, Prettier, ESLint

## 📦 Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and `pnpm` installed.

### 2. Installation

Install project dependencies:

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and populate it with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Running the Development Server

Start the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (or the assigned port) with your browser to view the client-facing website.

### 5. Running Production Build

Build the project for production deployment:

```bash
pnpm run build
```
