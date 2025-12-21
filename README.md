# Assets Manager

A React application for managing assets and viewing the current value with a daily depreciation.

## Features

- **Asset Management**: Add, edit, and delete assets.
- **Depreciation Calculation**: Automatically calculates and displays the current depreciated value of assets.
- **Data Persistence**: Persists data using `localStorage` so you don't lose your assets on refresh.
- **Robust Modeling**: Uses TypeScript classes for structured asset data.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Tooling**: Vite
- **Styling**: Vanilla CSS / CSS Modules

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository (if applicable) or navigate to the project directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will typically run at `http://localhost:5173`.

### Building for Production

To build the app for production:

```bash
npm run build
```

---

### ESLint Configuration (Vite Template)

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
