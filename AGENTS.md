# Card Memory Game Development Guidelines

These guidelines apply to changes in this repository. Keep changes focused and consistent with the existing React application.

## General principles

- Write clean, simple, readable, and maintainable code.
- Prefer clarity over cleverness and avoid unnecessary complexity.
- Keep modules focused and preserve the existing architecture unless a change has a clear benefit.
- Do not add features or claim behavior that is not implemented.

## Language and names

- Write source code, identifiers, comments, technical documentation, and commit messages in English.
- Use simple English that is easy to understand for a Spanish-speaking developer.
- Choose clear, descriptive names and prefer complete words over abbreviations.

## React and project structure

- This project uses React, React Router, and Redux Toolkit with Create React App. Follow the existing patterns and dependencies.
- Keep route screens, reusable components, services, configuration, and assets in their existing areas.
- Keep components focused on rendering and user interaction; place reusable game logic in services.
- Keep services independent of global UI state where practical. Pass data or callbacks across the boundary instead of importing the Redux store directly.
- Add dependencies only when they solve a real project need. Keep `package.json` and `package-lock.json` synchronized when dependencies change.

## Configuration and browser storage

- Keep game settings in `src/config/config.js` and preserve the existing configurability.
- Handle unavailable or invalid browser storage without making the game unusable.
- Do not commit credentials, private keys, or local authentication state.

## Validation and workflow

- Run checks that match the change and report any checks that were not run.
- Use the existing npm scripts: `npm start`, `npm run build`, and `npm test`.
- Keep changes focused, preserve unrelated work, and review both staged and unstaged diffs before committing.
- Commit only the intended staged changes; do not include unrelated staged or unstaged files.

## Commit messages

- Write commit messages in English.
- Start the subject directly with the feature or change being made. Do not use a type or scope prefix such as `feat:` or `fix:`.
- Capitalize the first letter of the subject and keep the summary clear and concise.
- Put any supporting details on following lines rather than extending the subject.
