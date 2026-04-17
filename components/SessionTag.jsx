// components/DayDetail.jsx
// Shows the revision sessions / exams for a tapped calendar day

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { sessionLabel, formatDate } from '../utils/timetableLogic';

export default function DayDetail({ date, sessions }) {
  if (!date) return null;

  const entries = sessions[date] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.dateLabel}>{formatDate(date)}</Text>

      {entries.length === 0 ? (
        <Text style={styles.emptyText}>No sessions scheduled</Text>
      ) : (
        entries.map((entry, i) => (
          <View
            key={i}
            style={[
              styles.entry,
              entry.type === 'exam' ? styles.examEntry : styles.sessionEntry,
              { borderLeftColor: entry.type === 'exam' ? entry.color : entry.examColor },
            ]}
          >
            <View style={[styles.dot, { backgroundColor: entry.color }]} />
            <View style={styles.entryText}>
              <Text style={styles.entryName}>{entry.name}</Text>
              <Text style={styles.entryType}>
                {entry.type === 'exam'
                  ? '🎓 Exam day'
                  : `📖 Revision — ${entry.daysBeforeExam} days before exam`}
              </Text>
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 3,
    paddingLeft: 10,
    paddingVertical: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  examEntry: {
    backgroundColor: '#FFF7ED',
  },
  sessionEntry: {
    backgroundColor: '#F9FAFB',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  entryText: {
    flex: 1,
  },
  entryName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  entryType: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
