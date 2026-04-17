// app/index.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useExams } from '../hooks/useExams';
import ExamCard from '../components/ExamCard';

export default function HomeScreen() {
  const router = useRouter();
  const { exams, validExams, addExam, removeExam, updateExam, clearAll } = useExams();

  function handleRemove(id) {
    if (exams.length <= 1) {
      Alert.alert('Keep at least one', 'Add an exam name and date to get started.');
      return;
    }
    removeExam(id);
  }

  function handleGenerate() {
    if (validExams.length === 0) {
      Alert.alert('No valid exams', 'Please add at least one exam with both a name and a date.');
      return;
    }
    router.push('/timetable');
  }

  function handleClear() {
    Alert.alert('Clear all exams?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearAll },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">

        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.emojiRow}>
            <Text style={styles.heroEmoji}>📚</Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>2 · 3 · 5 · 7</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Study{'\n'}Timetable</Text>
          <Text style={styles.heroSub}>Spaced repetition, made simple</Text>
        </View>

        {/* Rule pill strip */}
        <View style={styles.pillStrip}>
          {[
            { label: '7 days', color: '#F9A8D4' },
            { label: '5 days', color: '#FCD34D' },
            { label: '3 days', color: '#6EE7B7' },
            { label: '2 days', color: '#93C5FD' },
            { label: '🎓 exam!', color: '#C4B5FD' },
          ].map((item, i) => (
            <View key={i} style={[styles.pill, { backgroundColor: item.color }]}>
              <Text style={styles.pillText}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>YOUR EXAMS</Text>
          <Text style={styles.sectionCount}>{exams.length} added</Text>
        </View>

        {exams.map((exam, index) => (
          <ExamCard key={exam.id} exam={exam} index={index} onUpdate={updateExam} onRemove={handleRemove} />
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={addExam} activeOpacity={0.7}>
          <Text style={styles.addBtnText}>＋  Add another exam</Text>
        </TouchableOpacity>

        {/* Stats */}
        {validExams.length > 0 && (
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#EDE9FE' }]}>
              <Text style={styles.statVal}>{validExams.length}</Text>
              <Text style={[styles.statLbl, { color: '#7C3AED' }]}>exams</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#D1FAE5' }]}>
              <Text style={styles.statVal}>{validExams.length * 4}</Text>
              <Text style={[styles.statLbl, { color: '#059669' }]}>sessions</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FEF3C7' }]}>
              <Text style={styles.statVal}>{validExams.length * 4 * 45}m</Text>
              <Text style={[styles.statLbl, { color: '#D97706' }]}>est. study</Text>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.generateBtn, validExams.length === 0 && styles.generateBtnDisabled]}
          onPress={handleGenerate}
          activeOpacity={0.85}
        >
          <Text style={styles.generateBtnText}>
            {validExams.length === 0 ? 'Add exams to continue' : 'View my timetable  →'}
          </Text>
        </TouchableOpacity>

        {exams.some(e => e.name || e.date) && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Clear all</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFBF5' },
  scroll: { flex: 1 },
  content: { padding: 22, paddingBottom: 48 },

  hero: { marginBottom: 20, paddingTop: 12 },
  emojiRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  heroEmoji: { fontSize: 38 },
  heroBadge: { backgroundColor: '#FDE68A', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  heroBadgeText: { fontSize: 13, fontWeight: '700', color: '#92400E', letterSpacing: 1 },
  heroTitle: { fontSize: 52, fontWeight: '800', color: '#1C1917', letterSpacing: -2, lineHeight: 54, marginBottom: 8 },
  heroSub: { fontSize: 15, color: '#78716C' },

  pillStrip: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 26 },
  pill: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  pillText: { fontSize: 12, fontWeight: '700', color: '#1C1917' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#A8A29E', letterSpacing: 1.2 },
  sectionCount: { fontSize: 12, color: '#A8A29E' },

  addBtn: {
    borderWidth: 2, borderColor: '#E7E5E4', borderStyle: 'dashed',
    borderRadius: 14, padding: 14, alignItems: 'center', marginTop: 4, marginBottom: 20,
  },
  addBtnText: { fontSize: 14, color: '#78716C', fontWeight: '600' },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '800', color: '#1C1917' },
  statLbl: { fontSize: 11, fontWeight: '700', marginTop: 2 },

  generateBtn: {
    backgroundColor: '#1C1917', borderRadius: 16, padding: 18, alignItems: 'center',
    shadowColor: '#1C1917', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4,
  },
  generateBtnDisabled: { backgroundColor: '#D6D3D1', shadowOpacity: 0, elevation: 0 },
  generateBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },

  clearBtn: { marginTop: 14, alignItems: 'center', padding: 8 },
  clearBtnText: { fontSize: 13, color: '#EF4444', fontWeight: '500' },
});