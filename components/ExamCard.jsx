// app/index.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useExams } from '../hooks/useExams';
import ExamCard from '../components/ExamCard';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  const router = useRouter();
  const { exams, validExams, addExam, removeExam, updateExam, clearAll } = useExams();
  const [newExamName, setNewExamName] = useState('');
  const [newExamDate, setNewExamDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddExam = () => {
    if (!newExamName.trim() || !newExamDate.trim()) {
      Alert.alert('Missing info', 'Please enter both exam name and date.');
      return;
    }
    addExam(newExamName, newExamDate);
    setNewExamName('');
    setNewExamDate('');
  };

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
        {/* Hero section (same as before) */}
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

        {/* Add Exam Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>➕ Add a new exam</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Exam name (e.g. Calculus)"
            value={newExamName}
            onChangeText={setNewExamName}
          />
          
          {Platform.OS === 'web' ? (
            <input
              type="date"
              value={newExamDate}
              onChange={e => setNewExamDate(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                marginTop: 8,
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 12,
              }}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {newExamDate || 'Tap to select date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={newExamDate ? new Date(newExamDate + 'T00:00:00') : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setNewExamDate(selectedDate.toISOString().split('T')[0]);
                    }
                  }}
                />
              )}
            </>
          )}

          <TouchableOpacity style={styles.addButton} onPress={handleAddExam}>
            <Text style={styles.addButtonText}>+ Add exam to list</Text>
          </TouchableOpacity>
        </View>

        {/* Your exams section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>YOUR EXAMS</Text>
          <Text style={styles.sectionCount}>{exams.length} added</Text>
        </View>

        {exams.length === 0 ? (
          <View style={styles.emptyList}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>No exams yet. Add one above!</Text>
          </View>
        ) : (
          exams.map((exam, index) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              index={index}
              onUpdate={updateExam}
              onRemove={removeExam}
            />
          ))
        )}

        {/* Stats and generate button (same as before) */}
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
        >
          <Text style={styles.generateBtnText}>
            {validExams.length === 0 ? 'Add exams to continue' : 'View my timetable  →'}
          </Text>
        </TouchableOpacity>

        {exams.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
            <Text style={styles.clearBtnText}>Clear all exams</Text>
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

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 12,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#78716C',
  },
  addButton: {
    backgroundColor: '#1C1917',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 8 },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#A8A29E', letterSpacing: 1.2 },
  sectionCount: { fontSize: 12, color: '#A8A29E' },

  emptyList: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#F9F9F8',
    borderRadius: 16,
    marginBottom: 12,
  },
  emptyEmoji: { fontSize: 42 },
  emptyText: { fontSize: 14, color: '#A8A29E', marginTop: 8 },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '800', color: '#1C1917' },
  statLbl: { fontSize: 11, fontWeight: '700', marginTop: 2 },

  generateBtn: {
    backgroundColor: '#1C1917',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#1C1917',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateBtnDisabled: { backgroundColor: '#D6D3D1', shadowOpacity: 0, elevation: 0 },
  generateBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },

  clearBtn: { marginTop: 14, alignItems: 'center', padding: 8 },
  clearBtnText: { fontSize: 13, color: '#EF4444', fontWeight: '500' },
});