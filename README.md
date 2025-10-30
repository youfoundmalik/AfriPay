## AfriPay

AfriPay is a simple finance tracker built with React, TypeScript, and Vite. It allows you to log and review your personal transactions (credits and debits), view running balances, and export data with ease. All transaction data is handled on the client side and is saved in the browser, so you don't need any backend to get started.

## Getting Started

To set up AfriPay on your local machine, just follow these steps:

1. Make sure you have Node.js (version 18 or higher is recommended).
2. Clone this repository to your computer.
3. Open a terminal in the project folder and run:

   ```bash
   npm install
   npm run dev
   ```

By default, the app will be available at http://localhost:3000.

## Project Structure

Here's a quick look at the key parts of the codebase:

- **src/app/transactions/** - Contains the main Transactions page and its high-level logic.
- **src/components/**
  - **tables/** - Table UI for listing transactions plus pagination controls.
  - **modals/** - Modal dialog for adding a new transaction.
  - **forms/** - Form logic for transaction entry.
  - **layout/** - Dashboard layout and sidebar UI.
  - **pages/transactions/** - Displays summary cards for quick stats at the top of the dashboard.
- **src/ui/** - Atomic UI kit with shared building blocks like TextInput, Select, and TextArea. These are used throughout forms and tables for consistency and fast updates.
- **src/context/TransactionsContext.tsx** - Global provider that manages all transaction data, exposes CRUD methods, and syncs with localStorage.
- **src/hooks/useTransactions.ts** - Custom React hook to encapsulate business/data logic for transactions, such as filtering, exporting, and pagination.
- **src/router/** - Routing setup. There's one main dashboard layout and a dedicated transactions route.
- **src/types/** - TypeScript type definitions for things like `TransactionData`.
- **src/utils/** - Utilities and config for everything from formatting functions to cross-app constants and mock data. All number/date formatting, selectable field values, and app-wide config come from here so everything stays in sync.

## Why Was It Built Like This?

- **Frontend Only:** AfriPay is easy to run and demo—no need for a backend or database. All transaction data lives in the browser (localStorage).
- **Global State:** Transaction data and related logic are managed via React Context, meaning all related UI/components consume state from a single source of truth.
- **Strong Typing:** Everything is in TypeScript for fewer bugs and easier refactoring.
- **Reusability:** Key UI features—form elements, tables, modals, etc.—are designed as simple reusable components, with true atoms kept in `/ui` for maximum flexibility.
- **Consistent Formatting:** Date and currency formatting, selectable field options, and "magic values" are all single-sourced in `src/utils`, so the UI stays consistent no matter where you update.
- **User-facing Error Feedback:** If anything fails (like saving to storage or an export problem), a clear error message is shown inside the app, not just in the console.
- **Easy Export:** With ExcelJS and FileSaver, users can export their data as an Excel spreadsheet with a single click.
- **Fast Development:** Vite, along with TailwindCSS, provides instant hot reloads and rapid styling, so the interface is quick to develop and update.
- **Mobile Friendly:** The layout uses responsive CSS via Tailwind, so it works on both desktop and mobile screens.

---

Feel free to fork, clone, or adapt AfriPay for your own needs. If you have ideas for improvements, just open an issue or submit a pull request.
