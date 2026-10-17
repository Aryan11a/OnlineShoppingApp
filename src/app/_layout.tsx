import "@/../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { MarketplaceProvider } from "@/lib/store";

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <MarketplaceProvider>
      <View className="w-full max-w-[760px] flex-1 self-center bg-canvas dark:bg-night">
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colorScheme === "dark" ? "#171F1C" : "#F7F6F1" } }} />
      </View>
    </MarketplaceProvider>
  );
}
