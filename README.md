
# Learning App

A comprehensive learning application with flashcards, multiple-choice questions, and tests to help you master any subject.

## Features

- **Flashcards**: Review concepts with interactive flashcards
- **Multiple Choice Questions**: Test your knowledge with MCQs
- **Tests**: Complete comprehensive tests
- **Import Feature**: Upload your own learning materials via Excel
- **Dark/Light Mode**: Toggle between themes for comfortable studying
- **Filtering**: Filter study materials by subject and topic

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0 or later)
- npm (included with Node.js) or [pnpm](https://pnpm.io/) (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd learning-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with pnpm
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or with pnpm
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Importing Learning Materials

The app supports importing flashcards, MCQs, and tests via Excel files. To import your own learning materials:

1. Create an Excel file named `app.xlsx` with the following sheets:
   - `Flashcards`: Columns should include id, question, answer, subject, topic
   - `MCQs`: Columns should include id, question, options (as JSON array), correctAnswer, subject, topic
   - `Tests`: Columns should include id, title, questions (as JSON array), subject, topic

2. Use the import feature on the homepage to upload your Excel file.

## Project Structure

```
src/
├── components/         # UI components
│   ├── flashcards/     # Flashcard-related components
│   ├── import/         # Import functionality
│   ├── layout/         # Layout components (navbar, footer, etc.)
│   ├── mcq/            # MCQ-related components
│   ├── ui/             # Shadcn UI components
│   └── ui-custom/      # Custom UI components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI component library
- [Tanstack Query](https://tanstack.com/query/latest) - Data fetching
- [XLSX](https://github.com/SheetJS/sheetjs) - Excel file processing

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally

### Adding New Features

When adding new features or components:

1. Create new components in the appropriate folders
2. Update types as needed in `src/types/`
3. Use the existing context providers for state management
4. Follow the established patterns for consistency

## License

This project is licensed under the MIT License - see the LICENSE file for details.
