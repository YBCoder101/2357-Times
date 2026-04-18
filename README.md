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
