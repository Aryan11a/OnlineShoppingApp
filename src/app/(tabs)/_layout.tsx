import { Tabs } from "expo-router";
import { Heart, House, MessageCircle, UserRound } from "lucide-react-native";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E65B46",
        tabBarInactiveTintColor: dark ? "#A5AFA7" : "#788079",
        tabBarStyle: {
          backgroundColor: dark ? "#171F1C" : "#FBFAF6",
          borderTopColor: dark ? "#34433E" : "#E8E5DC",
          height: 63,
          paddingTop: 7,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Explore", tabBarIcon: ({ color }) => <House size={20} color={color} /> }} />
      <Tabs.Screen name="saved" options={{ title: "Saved", tabBarIcon: ({ color }) => <Heart size={20} color={color} /> }} />
      <Tabs.Screen name="inbox" options={{ title: "Inbox", tabBarIcon: ({ color }) => <MessageCircle size={20} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <UserRound size={20} color={color} /> }} />
    </Tabs>
  );
}
