import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ArrowLeft, BadgeCheck, MapPin, MessageCircle, Star } from "lucide-react-native";
import AppText from "@/components/AppText";
import ListingCard from "@/components/ListingCard";
import { currentSeller, useMarketplace } from "@/lib/store";

export default function SellerProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { listings } = useMarketplace();
  const sellerListings = useMemo(() => listings.filter((item) => item.sellerId === id), [id, listings]);
  const seller = sellerListings[0] ?? (id === currentSeller.id ? { sellerId: currentSeller.id, seller: currentSeller.name, avatar: currentSeller.avatar, phone: currentSeller.phone, rating: 4.9, reviews: 12, soldCount: 6, area: "Brooklyn" } : undefined);
  if (!seller) return <View className="flex-1 items-center justify-center bg-canvas dark:bg-night"><AppText>Seller not found.</AppText></View>;
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <View className="flex-row items-center gap-2 px-4 pb-3 pt-3"><Pressable onPress={() => router.back()} className="h-9 w-9 items-center justify-center"><ArrowLeft size={18} color="#24332D" /></Pressable><AppText className="text-[17px] font-bold">Seller profile</AppText></View>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <View className="items-center border-b border-[#E8E5DC] pb-5 pt-3 dark:border-[#34433E]">
          <View className="h-[78px] w-[78px] overflow-hidden rounded-full bg-[#E9E4DB]"><Image source={{ uri: seller.avatar }} className="h-[78px] w-[78px]" /></View>
          <View className="mt-3 flex-row items-center gap-1.5"><AppText className="text-[19px] font-bold">{seller.seller}</AppText><BadgeCheck size={18} color="#397052" /></View>
          <View className="mt-1 flex-row items-center gap-1"><Star size={13} color="#D89536" fill="#D89536" /><AppText className="text-[12px] font-bold">{seller.rating.toFixed(1)}</AppText><AppText className="text-[11px] text-muted dark:text-nightMuted">· {seller.reviews} reviews</AppText><MapPin size={12} color="#788079" /><AppText className="text-[10px] text-muted dark:text-nightMuted">{seller.area.split(",")[0]}</AppText></View>
          <AppText className="mt-2 text-[10px] text-muted dark:text-nightMuted">Member since 2022 · {seller.soldCount} successful sales</AppText>
          <Pressable onPress={() => router.push({ pathname: "/chat/[seller]", params: { seller: seller.sellerId, item: sellerListings[0]?.id ?? "chair" } })} className="mt-4 flex-row items-center gap-2 rounded-full bg-papaya px-5 py-2.5"><MessageCircle size={15} color="#FFFFFF" /><AppText className="text-[11px] font-bold text-white">Message seller</AppText></Pressable>
        </View>
        <View className="my-4 flex-row gap-2"><View className="flex-1 rounded-[12px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Positive reviews</AppText><AppText className="mt-1 text-[15px] font-extrabold">98%</AppText></View><View className="flex-1 rounded-[12px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Response time</AppText><AppText className="mt-1 text-[15px] font-extrabold">&lt; 1 hr</AppText></View><View className="flex-1 rounded-[12px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Items sold</AppText><AppText className="mt-1 text-[15px] font-extrabold">{seller.soldCount}</AppText></View></View>
        <AppText className="mb-3 text-[16px] font-bold">Items by {seller.seller.split(" ")[0]}</AppText>
        {sellerListings.length ? <View className="flex-row flex-wrap justify-between">{sellerListings.map((item) => <ListingCard key={item.id} listing={item} />)}</View> : <AppText className="py-6 text-center text-[11px] text-muted dark:text-nightMuted">No active listings right now.</AppText>}
        <AppText className="mb-2 mt-1 text-[16px] font-bold">Recent reviews</AppText>
        {["Exactly as pictured, easy pickup.", "Friendly, quick to reply. Would buy again.", "Great item and a smooth handoff."].map((review, index) => <View key={review} className="border-b border-[#E8E5DC] py-3 dark:border-[#34433E]"><View className="flex-row items-center justify-between"><AppText className="text-[11px] font-bold">{["Riley K.", "Morgan L.", "Taylor P."][index]}</AppText><View className="flex-row">{[0, 1, 2, 3, 4].map((star) => <Star key={star} size={10} color="#D89536" fill="#D89536" />)}</View></View><AppText className="mt-1 text-[11px] text-muted dark:text-nightMuted">{review}</AppText></View>)}
        <AppText className="mb-6 mt-4 text-center text-[10px] text-muted dark:text-nightMuted">Have a concern about this seller? Contact Sewa support from your profile.</AppText>
      </ScrollView>
    </View>
  );
}
