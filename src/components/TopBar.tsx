import { Bell, ChevronDown, MapPin, Tag } from "lucide-react-native";
import { Pressable, View } from "react-native";
import AppText from "@/components/AppText";

export default function TopBar() {
  return (
    <View className="mb-4 flex-row items-center justify-between px-5 pt-1">
      <View className="flex-row items-center gap-2">
        <View className="h-9 w-9 items-center justify-center rounded-xl bg-papaya">
          <Tag size={19} color="#24332D" strokeWidth={2.4} />
        </View>
        <AppText className="text-[24px] font-black tracking-tight">sewa</AppText>
        <Pressable className="ml-1 flex-row items-center gap-1 rounded-full bg-[#EEECE5] px-2.5 py-1.5 dark:bg-nightCard" accessibilityRole="button" accessibilityLabel="Change location">
          <MapPin size={12} color="#788079" />
          <AppText className="text-[11px] font-semibold">Brooklyn</AppText>
          <ChevronDown size={12} color="#788079" />
        </Pressable>
      </View>
      <Pressable className="h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-nightCard" accessibilityRole="button" accessibilityLabel="Notifications">
        <Bell size={17} color="#24332D" />
        <View className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-papaya" />
      </Pressable>
    </View>
  );
}
