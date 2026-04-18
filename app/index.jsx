import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>

      <TouchableOpacity onPress={() => router.push("/timetable")}>
        <Text>Go to Timetable</Text>
      </TouchableOpacity>
    </View>
  );
}