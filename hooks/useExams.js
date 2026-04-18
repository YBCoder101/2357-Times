import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useExams() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem("exams");
        if (data) setExams(JSON.parse(data));
      } catch (e) {
        console.log("Load error", e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem("exams", JSON.stringify(exams));
      } catch (e) {
        console.log("Save error", e);
      }
    };
    save();
  }, [exams]);

  const addExam = (name, date) => {
    if (!name || !date) return;

    const newExam = {
      id: Date.now().toString(),
      name: name.trim(),
      date: date.trim(),
    };

    setExams((prev) => [...prev, newExam]);
  };

  const removeExam = (id) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const validExams = exams.filter(
    (e) => e.name && e.name.trim() && e.date && e.date.trim()
  );

  return { exams, validExams, addExam, removeExam };
}