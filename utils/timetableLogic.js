// utils/timetableLogic.js
// Core 2-3-5-7 spaced repetition logic

const REVISION_GAPS = [2, 3, 5, 7];

export const EXAM_COLORS = [
  { session: '#A78BFA', exam: '#7C3AED' }, // purple
  { session: '#6EE7B7', exam: '#059669' }, // green
  { session: '#FCA5A5', exam: '#DC2626' }, // red
  { session: '#93C5FD', exam: '#2563EB' }, // blue
  { session: '#FCD34D', exam: '#D97706' }, // amber
  { session: '#F9A8D4', exam: '#DB2777' }, // pink
];

/**
 * Given an array of { id, name, date } exam objects,
 * returns a map of { 'YYYY-MM-DD': [ session objects ] }
 */
export function generateSessions(exams) {
  const sessions = {};

  exams.forEach((exam, index) => {
    if (!exam.name.trim() || !exam.date) return;

    const color = EXAM_COLORS[index % EXAM_COLORS.length];
    const examDate = new Date(exam.date + 'T00:00:00');

    // Mark the exam day
    const examKey = exam.date;
    if (!sessions[examKey]) sessions[examKey] = [];
    sessions[examKey].push({
      type: 'exam',
      examId: exam.id,
      name: exam.name.trim(),
      color: color.exam,
      index,
    });

    // Mark revision sessions 2, 3, 5, 7 days before
    REVISION_GAPS.forEach(days => {
      const sessionDate = new Date(examDate);
      sessionDate.setDate(sessionDate.getDate() - days);

      // Only schedule future sessions (from today)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (sessionDate < today) return;

      const key = sessionDate.toISOString().split('T')[0];
      if (!sessions[key]) sessions[key] = [];
      sessions[key].push({
        type: 'session',
        examId: exam.id,
        name: exam.name.trim(),
        daysBeforeExam: days,
        color: color.session,
        examColor: color.exam,
        index,
      });
    });
  });

  return sessions;
}

/**
 * Converts session map into the format required by react-native-calendars
 * for multi-dot marking mode
 */
export function toCalendarMarking(sessions) {
  const marking = {};

  Object.entries(sessions).forEach(([date, entries]) => {
    const dots = entries.map(e => ({
      key: `${e.examId}-${e.type}-${e.daysBeforeExam ?? 'exam'}`,
      color: e.type === 'exam' ? e.color : e.color,
      selectedDotColor: e.color,
    }));

    marking[date] = {
      dots,
      marked: true,
    };
  });

  return marking;
}

/**
 * Returns a human-readable label for a session
 */
export function sessionLabel(session) {
  if (session.type === 'exam') return `${session.name} — EXAM`;
  return `${session.name} — Revision (${session.daysBeforeExam} days before exam)`;
}

/**
 * Returns today's date as a YYYY-MM-DD string
 */
export function todayString() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns a formatted display date e.g. "Mon 14 Apr 2025"
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Counts total revision sessions across all exams
 */
export function countSessions(sessions) {
  return Object.values(sessions)
    .flat()
    .filter(s => s.type === 'session').length;
}
