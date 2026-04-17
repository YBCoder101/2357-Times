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
