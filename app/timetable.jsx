import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useRouter } from "expo-router";
import { useExams } from "../hooks/useExams";
import {
  generateSessions,
  toCalendarMarking,
  todayString,
} from "../utils/timetableLogic";

export default function TimetableScreen() {
  const router = useRouter();
  const { validExams } = useExams();
  const [selectedDate, setSelectedDate] = useState(todayString());

  const sessions = useMemo(() => generateSessions(validExams), [validExams]);

  const sortedSessions = useMemo(() => {
    return Object.entries(sessions).sort(([a], [b]) =>
      a.localeCompare(b)
    );
  }, [sessions]);

  const todaySessions = sessions[todayString()] || [];
  const nextSession = sortedSessions[0];

  const marking = useMemo(() => {
    const m = toCalendarMarking(sessions);
    const selected = m[selectedDate] || {};
    m[selectedDate] = { ...selected, selected: true, selectedColor: "#111" };
    return m;
  }, [sessions, selectedDate]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <Header />

        <TodayCard sessions={todaySessions} />

        {nextSession && <NextCard session={nextSession} />}

        <CalendarCard
          marking={marking}
          onSelect={setSelectedDate}
        />

        <SessionList
          sessions={sortedSessions}
          onSelect={setSelectedDate}
        />

      </ScrollView>
    </SafeAreaView>
  );
}


const Header = () => (
  <View style={styles.header}>
    <Text style={styles.greeting}>Welcome back 👋</Text>
    <Text style={styles.title}>Let’s study smart</Text>
  </View>
);

const TodayCard = ({ sessions }) => (
  <View style={styles.todayCard}>
    <Text style={styles.sectionLabel}>TODAY</Text>

    {sessions.length === 0 ? (
      <Text style={styles.todayEmpty}>
        You’re all caught up 🎉
      </Text>
    ) : (
      sessions.map((s, i) => (
        <Text key={i} style={styles.todayItem}>
          📖 {s.name}
        </Text>
      ))
    )}
  </View>
);

const NextCard = ({ session }) => {
  const [date, entries] = session;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>NEXT UP</Text>

      <Text style={styles.cardTitle}>
        {entries[0]?.name}
      </Text>

      <Text style={styles.cardSub}>
        {date}
      </Text>
    </View>
  );
};

const CalendarCard = ({ marking, onSelect }) => (
  <View style={styles.card}>
    <Calendar
      markingType="multi-dot"
      markedDates={marking}
      onDayPress={(d) => onSelect(d.dateString)}
      current={todayString()}
      theme={{
        selectedDayBackgroundColor: "#111",
        todayTextColor: "#7C3AED",
        arrowColor: "#111",
      }}
    />
  </View>
);

const SessionList = ({ sessions, onSelect }) => (
  <View style={{ marginTop: 10 }}>
    <Text style={styles.sectionTitle}>All Sessions</Text>

    {sessions.map(([date, entries]) =>
      entries.map((entry, i) => (
        <TouchableOpacity
          key={`${date}-${i}`}
          style={styles.listItem}
          onPress={() => onSelect(date)}
        >
          <View>
            <Text style={styles.itemTitle}>
              {entry.type === "exam" ? "🎓" : "📖"} {entry.name}
            </Text>
            <Text style={styles.itemSub}>{date}</Text>
          </View>

          {entry.type === "exam" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>EXAM</Text>
            </View>
          )}
        </TouchableOpacity>
      ))
    )}
  </View>
);



const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FAFAF9" },

  container: { padding: 20, paddingBottom: 40 },

  header: { marginBottom: 20 },
  greeting: { color: "#6B7280", fontSize: 14 },
  title: { fontSize: 30, fontWeight: "800", marginTop: 4 },

  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },

  todayCard: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
  },

  todayItem: {
    color: "#fff",
    fontSize: 15,
    marginTop: 6,
  },

  todayEmpty: {
    color: "#fff",
    fontSize: 16,
    marginTop: 6,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E7E5E4",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  cardSub: {
    color: "#6B7280",
    marginTop: 2,
  },

  listItem: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemTitle: { fontWeight: "600" },
  itemSub: { color: "#6B7280", fontSize: 12 },

  badge: {
    backgroundColor: "#7C3AED20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: "#7C3AED",
    fontSize: 10,
    fontWeight: "700",
  },
});