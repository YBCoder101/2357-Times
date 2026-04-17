// components/DayDetail.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDate } from '../utils/timetableLogic';

export default function DayDetail({ date, sessions }) {
  if (!date) return null;
  const entries = sessions[date] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.dateLabel}>{formatDate(date)}</Text>

      {entries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>😴</Text>
          <Text style={styles.emptyText}>No sessions — enjoy the rest!</Text>
        </View>
      ) : (
        entries.map((entry, i) => (
          <View
            key={i}
            style={[
              styles.entry,
              { backgroundColor: entry.type === 'exam' ? '#FEF3C7' : '#F5F3FF' },
            ]}
          >
            <View style={[styles.entryIcon, { backgroundColor: entry.color }]}>
              <Text style={styles.entryIconText}>
                {entry.type === 'exam' ? '🎓' : '📖'}
              </Text>
            </View>
            <View style={styles.entryText}>
              <Text style={styles.entryName}>{entry.name}</Text>
              <Text style={styles.entryType}>
                {entry.type === 'exam'
                  ? 'Exam day — good luck!'
                  : `Revision session · ${entry.daysBeforeExam} days before exam`}
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
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 2,
    borderColor: '#F5F5F4',
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A8A29E',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 4,
  },
  emptyEmoji: { fontSize: 28 },
  emptyText: { fontSize: 14, color: '#A8A29E', fontWeight: '500' },

  entry: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    gap: 12,
  },
  entryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entryIconText: { fontSize: 20 },
  entryText: { flex: 1 },
  entryName: { fontSize: 15, fontWeight: '700', color: '#1C1917' },
  entryType: { fontSize: 12, color: '#78716C', marginTop: 2, fontWeight: '500' },
});