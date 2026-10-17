import { useRouter } from "expo-router";
import { BadgeCheck, ChevronRight, CircleHelp, Clock3, ShieldCheck, Tag, UserRound } from "lucide-react-native";
import { Pressable, ScrollView, View } from "react-native";
import AppText from "@/components/AppText";
import TopBar from "@/components/TopBar";
import { useColorScheme } from "nativewind";

const options = [
  { title: "My listings", detail: "Edit items and mark them sold", icon: Tag, href: "/seller/jordan" as const },
  { title: "Purchase history", detail: "Items you have found on Sewa", icon: Clock3, href: "/support" as const },
  { title: "Contact Sewa support", detail: "Report a problem or ask a question", icon: CircleHelp, href: "/support" as const },
  { title: "Safety & privacy", detail: "Stay safer while buying and selling", icon: ShieldCheck, href: "/support" as const },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <TopBar />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <AppText className="mb-4 text-[24px] font-bold">Your profile</AppText>
        <View className="mb-5 flex-row items-center gap-3 border-b border-[#E8E5DC] pb-5 dark:border-[#34433E]">
          <View className="h-[54px] w-[54px] items-center justify-center rounded-full bg-papaya"><AppText className="text-[19px] font-bold text-white">JD</AppText></View>
          <View className="flex-1"><AppText className="text-[16px] font-bold">Jordan Davis</AppText><View className="mt-1 flex-row items-center gap-1"><BadgeCheck size={13} color="#397052" /><AppText className="text-[10px] text-muted dark:text-nightMuted">Verified member · Joined 2022</AppText></View></View>
          <UserRound size={18} color="#788079" />
        </View>
        <AppText className="mb-2 text-[10px] font-bold uppercase tracking-[1px] text-muted dark:text-nightMuted">Appearance</AppText>
        <View className="mb-5 flex-row rounded-[12px] bg-[#EEEAE1] p-1 dark:bg-nightCard">
          {(["system", "light", "dark"] as const).map((mode) => <Pressable key={mode} onPress={() => setColorScheme(mode)} className={`flex-1 items-center rounded-[9px] py-2.5 ${colorScheme === mode ? "bg-white dark:bg-[#34433E]" : ""}`} accessibilityRole="button" accessibilityState={{ selected: colorScheme === mode }}><AppText className={`text-[11px] font-semibold capitalize ${colorScheme === mode ? "text-ink dark:text-nightText" : "text-muted dark:text-nightMuted"}`}>{mode}</AppText></Pressable>)}
        </View>
        <AppText className="mb-1 text-[10px] font-bold uppercase tracking-[1px] text-muted dark:text-nightMuted">Your Sewa</AppText>
        {options.map(({ title, detail, icon: Icon, href }) => <Pressable key={title} onPress={() => router.push(href)} className="flex-row items-center border-b border-[#E8E5DC] py-3.5 dark:border-[#34433E]"><Icon size={18} color="#68756D" /><View className="ml-3 flex-1"><AppText className="text-[12px] font-bold">{title}</AppText><AppText className="mt-0.5 text-[10px] text-muted dark:text-nightMuted">{detail}</AppText></View><ChevronRight size={16} color="#788079" /></Pressable>)}
        <Pressable onPress={() => router.push("/support")} className="my-5 flex-row items-center gap-3 rounded-[14px] bg-[#F2E7DC] p-4 dark:bg-[#403530]"><CircleHelp size={19} color="#E65B46" /><View className="flex-1"><AppText className="text-[12px] font-bold">Something not right?</AppText><AppText className="mt-1 text-[10px] leading-[15px] text-muted dark:text-nightMuted">Tell our team about a misleading price, a suspicious post, or another issue.</AppText></View><ChevronRight size={16} color="#788079" /></Pressable>
        <AppText className="mb-6 text-center text-[10px] text-muted dark:text-nightMuted">Sewa · A little more life in good things.</AppText>
      </ScrollView>
    </View>
  );
}
