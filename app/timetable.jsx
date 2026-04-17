// app/timetable.jsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { useExams } from '../hooks/useExams';
import DayDetail from '../components/SessionTag';
import {
  generateSessions,
  toCalendarMarking,
  todayString,
  countSessions,
  EXAM_COLORS,
} from '../utils/timetableLogic';

const STAT_COLORS = [
  { bg: '#EDE9FE', text: '#7C3AED' },
  { bg: '#D1FAE5', text: '#059669' },
  { bg: '#FEF3C7', text: '#D97706' },
];

export default function TimetableScreen() {
  const router = useRouter();
  const { validExams } = useExams();
  const [selectedDate, setSelectedDate] = useState(todayString());

  const sessions = useMemo(() => generateSessions(validExams), [validExams]);
  const marking = useMemo(() => {
    const m = toCalendarMarking(sessions);
    const selected = m[selectedDate] || {};
    m[selectedDate] = { ...selected, selected: true, selectedColor: '#1C1917' };
    return m;
  }, [sessions, selectedDate]);

  const totalSessions = countSessions(sessions);
  const uniqueStudyDays = new Set(
    Object.entries(sessions)
      .filter(([, entries]) => entries.some(e => e.type === 'session'))
      .map(([date]) => date)
  ).size;

  const stats = [
    { val: validExams.length, label: 'exams', emoji: '📝' },
    { val: totalSessions, label: 'sessions', emoji: '📖' },
    { val: uniqueStudyDays, label: 'study days', emoji: '📅' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Your timetable</Text>
            <Text style={styles.titleEmoji}>🗓️</Text>
          </View>
          <Text style={styles.subtitle}>Tap any day to see your sessions</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: STAT_COLORS[i].bg }]}>
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={[styles.statLbl, { color: STAT_COLORS[i].text }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legendWrap}>
          <Text style={styles.legendTitle}>LEGEND</Text>
          <View style={styles.legend}>
            {validExams.map((exam, i) => (
              <View key={exam.id} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: EXAM_COLORS[i % EXAM_COLORS.length].exam }]} />
                <Text style={styles.legendText} numberOfLines={1}>{exam.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarWrap}>
          <Calendar
            markingType="multi-dot"
            markedDates={marking}
            onDayPress={day => setSelectedDate(day.dateString)}
            current={todayString()}
            theme={{
              backgroundColor: '#FFFFFF',
              calendarBackground: '#FFFFFF',
              textSectionTitleColor: '#A8A29E',
              selectedDayBackgroundColor: '#1C1917',
              selectedDayTextColor: '#FFFFFF',
              todayTextColor: '#7C3AED',
              todayBackgroundColor: '#EDE9FE',
              dayTextColor: '#1C1917',
              textDisabledColor: '#D6D3D1',
              arrowColor: '#1C1917',
              monthTextColor: '#1C1917',
              textMonthFontWeight: '800',
              textDayFontWeight: '600',
              textDayFontSize: 14,
              textMonthFontSize: 17,
              textDayHeaderFontSize: 12,
              textDayHeaderFontWeight: '700',
            }}
            style={styles.calendar}
          />
        </View>

        {/* Day detail */}
        <DayDetail date={selectedDate} sessions={sessions} />

        {/* Upcoming list */}
        <Text style={styles.sectionLabel}>ALL UPCOMING SESSIONS</Text>
        {Object.entries(sessions)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([date, entries]) =>
            entries.map((entry, i) => {
              const isExam = entry.type === 'exam';
              return (
                <TouchableOpacity
                  key={`${date}-${i}`}
                  style={[styles.sessionRow, { borderLeftColor: entry.color }]}
                  onPress={() => setSelectedDate(date)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sessionEmoji}>{isExam ? '🎓' : '📖'}</Text>
                  <View style={styles.sessionInfo}>
                    <Text style={styles.sessionName}>{entry.name}</Text>
                    <Text style={styles.sessionDate}>
                      {new Date(date + 'T00:00:00').toLocaleDateString('en-ZA', {
                        weekday: 'short', day: 'numeric', month: 'short',
                      })}
                      {isExam ? ' · Exam day 🎉' : ` · ${entry.daysBeforeExam} days before exam`}
                    </Text>
                  </View>
                  {isExam && (
                    <View style={[styles.examBadge, { backgroundColor: entry.color }]}>
                      <Text style={styles.examBadgeText}>EXAM</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })
          )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFBF5' },
  scroll: { flex: 1 },
  content: { padding: 22, paddingBottom: 48 },

  header: { marginBottom: 20 },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 14, color: '#7C3AED', fontWeight: '700' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontSize: 34, fontWeight: '800', color: '#1C1917', letterSpacing: -1 },
  titleEmoji: { fontSize: 30 },
  subtitle: { fontSize: 14, color: '#78716C', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 12, alignItems: 'center', gap: 2 },
  statEmoji: { fontSize: 18 },
  statVal: { fontSize: 22, fontWeight: '800', color: '#1C1917' },
  statLbl: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

  legendWrap: { marginBottom: 14 },
  legendTitle: { fontSize: 10, fontWeight: '700', color: '#A8A29E', letterSpacing: 1.2, marginBottom: 8 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  legendItem: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1.5, borderColor: '#F5F5F4',
  },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontWeight: '600', color: '#1C1917', maxWidth: 100 },

  calendarWrap: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#F5F5F4',
    backgroundColor: '#FFFFFF',
  },
  calendar: { borderRadius: 20 },

  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A8A29E',
    letterSpacing: 1.2,
    marginTop: 22,
    marginBottom: 10,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 4,
    gap: 12,
    borderWidth: 1.5,
    borderColor: '#F5F5F4',
  },
  sessionEmoji: { fontSize: 20 },
  sessionInfo: { flex: 1 },
  sessionName: { fontSize: 14, fontWeight: '700', color: '#1C1917' },
  sessionDate: { fontSize: 12, color: '#78716C', marginTop: 2, fontWeight: '500' },
  examBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  examBadgeText: { fontSize: 9, fontWeight: '800', color: '#1C1917', letterSpacing: 0.5 },
});