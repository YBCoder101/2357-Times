<<<<<<< HEAD
# Study Timetable — 2-3-5-7 Rule

A React Native (Expo) app that generates a personalised study timetable using
spaced repetition. For each exam you add, revision sessions are automatically
scheduled 2, 3, 5, and 7 days before the exam date.

---

## Project structure

```
StudyTimetable/
├── app/
│   ├── _layout.jsx        # Navigation stack setup
│   ├── index.jsx          # Home screen (add/edit exams)
│   └── timetable.jsx      # Calendar screen
├── components/
│   ├── ExamCard.jsx       # Single exam input row
│   └── DayDetail.jsx      # Selected-day session detail panel
├── hooks/
│   └── useExams.js        # Exam state + AsyncStorage persistence
├── utils/
│   └── timetableLogic.js  # Core 2-3-5-7 calculation logic
├── package.json
└── app.json
```

---

## Getting started

### 1. Prerequisites
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (Android or iOS)

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

---

## Building for production

### Android APK
```bash
npx eas build --platform android --profile preview
```

### iOS (requires Apple Developer account)
```bash
npx eas build --platform ios
```

Install EAS CLI first: `npm install -g eas-cli` then `eas login`.

---

## Key packages

| Package | Purpose |
|---|---|
| `expo-router` | File-based navigation between screens |
| `react-native-calendars` | Calendar grid with multi-dot marking |
| `@react-native-async-storage/async-storage` | Persists exams between sessions |
| `@react-native-community/datetimepicker` | Native date picker on Android & iOS |

---

## How the 2-3-5-7 logic works

See `utils/timetableLogic.js`. The core function `generateSessions(exams)`:

1. Takes an array of `{ id, name, date }` exam objects
2. For each exam, creates session entries at `examDate - 2`, `- 3`, `- 5`, `- 7` days
3. Skips sessions that fall before today
4. Returns a map of `{ 'YYYY-MM-DD': [session, ...] }` used to drive the calendar

---

## Extending the app

Ideas for future features:
- Push notifications reminding you of upcoming sessions
- Study duration / hours per session tracking
- Progress marking (tick off completed sessions)
- Share timetable as PDF or image
- Dark mode support
=======
# 2357-Times App

## Overview

2357-Times is a lightweight mobile app (built with Expo/React Native) for tracking study sessions, exams, and time-based activities. It focuses on simplicity and clarity, helping users stay organized and manage their schedules effectively.

## Features

* Track study or work sessions
* Organize exams and schedules
* Reusable UI components (cards, tags)
* Fast and responsive (Expo-powered)
* Custom hooks for state management

## Tech Stack

* React Native (Expo)
* JavaScript (JSX)
* Custom hooks + modular utilities

## Project Structure

```
2357-times/
├── app/                # Main app screens and navigation
│   ├── index.jsx       # Entry screen
│   ├── layout.jsx      # Layout/navigation wrapper
│   └── timetable.jsx   # Timetable screen logic/UI
│
├── components/         # Reusable UI components
│   ├── ExamCard.jsx
│   └── SessionTag.jsx
│
├── hooks/              # Custom React hooks
│   └── useExams.js
│
├── utils/              # Helper logic and utilities
│   └── timetableLogic.js
│
├── assets/             # Static assets (images, icons)
│   └── icon.png
│
├── .expo/              # Expo configuration (auto-generated)
├── .vscode/            # Editor settings
├── app.json            # Expo config
├── package.json        # Dependencies and scripts
└── README.md
```

## Installation

### Prerequisites

* Node.js (v16+ recommended)
* Expo CLI

### Setup

```bash
# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

## Usage

* Open the app using Expo Go or an emulator
* Navigate through the timetable screen to manage sessions
* Add and view exams using the provided UI components

## Key Concepts

* **Component-based design**: UI is broken into reusable pieces like `ExamCard` and `SessionTag`
* **Custom hooks**: Logic such as exam handling is abstracted into `useExams`
* **Separation of concerns**: Business logic (utils) is separated from UI

## Future Improvements

* Add persistent storage (AsyncStorage / database)
* Notifications for upcoming exams/sessions
* Improved analytics and insights
* UI/UX enhancements

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/feature-name`)
3. Commit your changes
4. Push and open a pull request

## License

MIT License

## Contact

Open an issue for bugs, suggestions, or support.
>>>>>>> eee216f3336274f8f48ccae07a685ad6badefdb8
