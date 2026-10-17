import { useRouter } from "expo-router";
import { BadgeCheck, ChevronRight, LockKeyhole } from "lucide-react-native";
import { Image, Pressable, ScrollView, View } from "react-native";
import AppText from "@/components/AppText";
import TopBar from "@/components/TopBar";
import { useMarketplace } from "@/lib/store";

export default function InboxScreen() {
  const router = useRouter();
  const { listings } = useMarketplace();
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <TopBar />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <AppText className="text-[24px] font-bold">Messages</AppText>
        <AppText className="mb-5 mt-1 text-[12px] text-muted dark:text-nightMuted">A good deal starts with a good conversation.</AppText>
        {listings.slice(0, 5).map((listing, index) => (
          <Pressable key={listing.id} onPress={() => router.push({ pathname: "/chat/[seller]", params: { seller: listing.sellerId, item: listing.id } })} className="mb-1 flex-row items-center gap-3 border-b border-[#E8E5DC] py-3.5 dark:border-[#34433E]">
            <View className="h-[46px] w-[46px] overflow-hidden rounded-full bg-[#E9E4DB]"><Image source={{ uri: listing.avatar }} className="h-[46px] w-[46px]" /></View>
            <View className="flex-1"><View className="flex-row items-center gap-1"><AppText className="text-[13px] font-bold">{listing.seller}</AppText><BadgeCheck size={13} color="#397052" /></View><AppText numberOfLines={1} className="mt-1 text-[11px] text-muted dark:text-nightMuted">{index % 2 ? "Could I pick it up Saturday afternoon?" : `Is the ${listing.title.toLowerCase()} still available?`}</AppText></View>
            <View className="items-end gap-2"><AppText className="text-[9px] text-muted dark:text-nightMuted">{index + 1}h</AppText>{index === 0 ? <View className="h-2 w-2 rounded-full bg-papaya" /> : <ChevronRight size={15} color="#788079" />}</View>
          </Pressable>
        ))}
        <View className="mt-5 flex-row items-center gap-2 rounded-[13px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><LockKeyhole size={15} color="#397052" /><AppText className="flex-1 text-[10px] leading-[15px] text-[#53685B] dark:text-[#C1D0C4]">Keep payments and personal details private. Sewa will never ask for a verification code.</AppText></View>
      </ScrollView>
    </View>
  );
}
