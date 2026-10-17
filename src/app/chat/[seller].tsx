import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, TextInput, View } from "react-native";
import { ArrowLeft, BadgeCheck, Flag, MoreHorizontal, Send } from "lucide-react-native";
import AppText from "@/components/AppText";
import { formatPrice } from "@/lib/data";
import { useMarketplace } from "@/lib/store";

export default function ChatScreen() {
  const { seller: sellerId, item: itemId } = useLocalSearchParams<{ seller: string; item: string }>();
  const router = useRouter();
  const { listings } = useMarketplace();
  const listing = listings.find((item) => item.id === itemId) ?? listings.find((item) => item.sellerId === sellerId);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [blocked, setBlocked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  if (!listing) return <View className="flex-1 items-center justify-center bg-canvas dark:bg-night"><AppText>Conversation unavailable.</AppText></View>;

  return (
    <KeyboardAvoidingView className="flex-1 bg-canvas dark:bg-night" behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}>
      <View className="flex-row items-center border-b border-[#E8E5DC] px-3 py-2.5 dark:border-[#34433E]">
        <Pressable onPress={() => router.back()} className="mr-2 h-9 w-9 items-center justify-center"><ArrowLeft size={18} color="#24332D" /></Pressable>
        <View className="mr-2 h-9 w-9 overflow-hidden rounded-full bg-[#E9E4DB]"><Image source={{ uri: listing.avatar }} className="h-9 w-9" /></View>
        <View className="flex-1"><View className="flex-row items-center gap-1"><AppText className="text-[12px] font-bold">{listing.seller}</AppText><BadgeCheck size={13} color="#397052" /></View><AppText className="text-[9px] text-muted dark:text-nightMuted">About: {listing.title}</AppText></View>
        <Pressable onPress={() => setMenuOpen((open) => !open)} className="h-9 w-9 items-center justify-center" accessibilityRole="button" accessibilityLabel="Conversation options"><MoreHorizontal size={19} color="#68756D" /></Pressable>
      </View>
      {menuOpen ? <>
        <Pressable onPress={() => setMenuOpen(false)} className="absolute inset-0 z-10" accessibilityLabel="Close conversation options" />
        <View className="absolute right-3 top-[58px] z-20 w-[190px] rounded-[12px] border border-[#E8E5DC] bg-white p-1.5 shadow-lg dark:border-[#34433E] dark:bg-nightCard">
          <Pressable onPress={() => { setMenuOpen(false); router.push({ pathname: "/support", params: { topic: `Seller: ${listing.seller}` } }); }} className="flex-row items-center gap-2 rounded-[8px] px-3 py-2.5" accessibilityRole="button"><Flag size={14} color="#68756D" /><AppText className="text-[11px] font-semibold">Report seller</AppText></Pressable>
          <Pressable onPress={() => { setBlocked((current) => !current); setMenuOpen(false); }} className="flex-row items-center gap-2 rounded-[8px] px-3 py-2.5" accessibilityRole="button"><MoreHorizontal size={14} color="#A94738" /><AppText className="text-[11px] font-semibold text-[#A94738]">{blocked ? "Unblock seller" : "Block seller"}</AppText></Pressable>
        </View>
      </> : null}
      <View className="flex-row items-center gap-2 border-b border-[#E8E5DC] px-4 py-2.5 dark:border-[#34433E]"><Image source={{ uri: listing.images[0] }} className="h-10 w-10 rounded-[8px]" /><View className="flex-1"><AppText numberOfLines={1} className="text-[10px] font-semibold">{listing.title}</AppText><AppText className="mt-0.5 text-[10px] font-bold">{formatPrice(listing.price)}</AppText></View><Pressable onPress={() => router.push({ pathname: "/listing/[id]", params: { id: listing.id } })}><AppText className="text-[9px] font-bold text-[#397052] dark:text-[#A8D5B8]">View item</AppText></Pressable></View>
      <ScrollView className="flex-1 px-4 pt-4" contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        <View className="mb-4 self-center rounded-full bg-[#EEEAE1] px-3 py-1.5 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Today · Keep payments and chats on Sewa</AppText></View>
        <View className="mb-2 max-w-[84%] self-start rounded-[15px] rounded-tl-[4px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[11px] leading-[17px]">Hi! Yes, it is still available. Happy to share more details or arrange a safe local pickup.</AppText></View>
        <View className="mb-4 max-w-[84%] self-end rounded-[15px] rounded-tr-[4px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><AppText className="text-[11px] leading-[17px]">Thanks! Is the price firm, and are you free for pickup this weekend?</AppText></View>
        {messages.map((message, index) => <View key={`${message}-${index}`} className="mb-2 max-w-[84%] self-end rounded-[15px] rounded-tr-[4px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><AppText className="text-[11px] leading-[17px]">{message}</AppText></View>)}
        {blocked ? <View className="mt-3 self-center rounded-full bg-[#F2E7DC] px-3 py-2"><AppText className="text-[10px] font-semibold text-[#A94738]">Seller blocked. Messages are paused.</AppText></View> : null}
      </ScrollView>
      <View className="border-t border-[#E8E5DC] px-3 py-3 dark:border-[#34433E]">
        {blocked ? <Pressable onPress={() => setBlocked(false)} className="items-center py-2"><AppText className="text-[11px] font-bold text-[#397052]">Unblock seller</AppText></Pressable> : <View className="flex-row items-center rounded-full bg-white px-3 dark:bg-nightCard"><TextInput value={text} onChangeText={setText} placeholder="Write a message..." placeholderTextColor="#8D958F" className="h-10 flex-1 text-[11px] text-ink dark:text-nightText" returnKeyType="send" onSubmitEditing={() => { if (text.trim()) { setMessages((current) => [...current, text.trim()]); setText(""); } }} /><Pressable onPress={() => { if (text.trim()) { setMessages((current) => [...current, text.trim()]); setText(""); } }} className="h-8 w-8 items-center justify-center rounded-full bg-papaya"><Send size={14} color="#FFFFFF" /></Pressable></View>}
        <View className="mt-2 flex-row items-center justify-center gap-1"><Flag size={10} color="#788079" /><AppText className="text-[9px] text-muted dark:text-nightMuted">Never share payment details or verification codes.</AppText></View>
      </View>
    </KeyboardAvoidingView>
  );
}
