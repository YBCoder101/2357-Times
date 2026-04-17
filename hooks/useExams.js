// hooks/useExams.js
// Manages exam list state and persists to device storage

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@study_timetable_exams';

let nextId = 1;

function createExam(name = '', date = '') {
  return { id: String(nextId++), name, date };
}

export function useExams() {
  const [exams, setExams] = useState([createExam(), createExam()]);
  const [loaded, setLoaded] = useState(false);

  // Load saved exams on mount
  useEffect(() => {
    async function load() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0) {
            // Restore IDs correctly so nextId stays ahead
            const maxId = Math.max(...parsed.map(e => parseInt(e.id) || 0));
            nextId = maxId + 1;
            setExams(parsed);
          }
        }
      } catch (e) {
        console.warn('Failed to load exams from storage:', e);
      } finally {
        setLoaded(true);
      }
    }
    load();
  }, []);

  // Save to storage whenever exams change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    async function save() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
      } catch (e) {
        console.warn('Failed to save exams:', e);
      }
    }
    save();
  }, [exams, loaded]);

  const addExam = useCallback(() => {
    setExams(prev => [...prev, createExam()]);
  }, []);

  const removeExam = useCallback((id) => {
    setExams(prev => prev.filter(e => e.id !== id));
  }, []);

  const updateExam = useCallback((id, field, value) => {
    setExams(prev =>
      prev.map(e => (e.id === id ? { ...e, [field]: value } : e))
    );
  }, []);

  const clearAll = useCallback(() => {
    setExams([createExam(), createExam()]);
  }, []);

  const validExams = exams.filter(e => e.name.trim() && e.date);

  return {
    exams,
    validExams,
    loaded,
    addExam,
    removeExam,
    updateExam,
    clearAll,
  };
}
