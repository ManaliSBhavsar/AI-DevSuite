# AI DevSuite

AI DevSuite is an AI-driven platform with three cutting-edge tools:

**Generate-UI** - Frontend UI Code Generator (React + Tailwind CSS)
**Debug-Code** - AI Code Debugger & Optimizer
**Generate-Wireframe** - AI-Powered UI Layout Generator

Developed with **Next.js 13 (App Router), TypeScript, Tailwind CSS, Zustand, NextAuth.js**, and AI APIs (**Gemini & Stability AI**), AI DevSuite automates frontend development with smart automation.

---

## Features

- **Generate-UI:** Automatically generate UI elements in React + Tailwind CSS from text inputs.
- **Debug-Code:** AI-based debugging and optimization of JavaScript & React code.
- **Generate-Wireframe:** Turn design concepts into wireframe-style images.
- **User Authentication:** Secure login with **NextAuth.js** and Google & GitHub providers.
- **State Management:** **Zustand** for global state management.
- **Pre-Styled UI Components:** **ShadCN/UI** for cool modern UI components.

---

## Tech Stack

- **Frontend:** React.js, Next.js 13, TypeScript, Tailwind CSS, ShadCN/UI
- **Backend:** Next.js Serverless API
- **Authentication:** NextAuth.js
- **State Management:** Zustand
- **AI APIs:** Gemini API (UI code generation & debugging), Stability AI API (wireframe generation)
- **Deployment:** Vercel

---

## Project Structure

```
├── app
│   ├── api/generate-ui (Serverless API for UI code generation)
│   ├── api/debug-code (Serverless API for code debugging)
│   ├── api/generate-wireframe (Serverless API for wireframes)
│   ├── components (Reusable UI components)
```
│   ├── store (Global state management using Zustand store)
│   ├── auth (NextAuth.js authentication configuration)
│   ├── pages (Tool and Dashboard pages)
├── public
├── styles
├── package.json
└── README.md
```

---

