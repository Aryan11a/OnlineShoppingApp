import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { ArrowLeft, BadgeCheck, Check, ChevronRight, Flag, Heart, MapPin, MessageCircle, Phone, Star } from "lucide-react-native";
import AppText from "@/components/AppText";
import PriceTrustNote from "@/components/PriceTrustNote";
import { formatPrice } from "@/lib/data";
import { useMarketplace } from "@/lib/store";

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { listings, savedIds, toggleSaved, markSold } = useMarketplace();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const listing = listings.find((item) => item.id === id);
  if (!listing) return <View className="flex-1 items-center justify-center bg-canvas dark:bg-night"><AppText>Listing not found.</AppText></View>;

  const report = () => router.push({ pathname: "/support", params: { topic: `Listing: ${listing.title}` } });
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image source={{ uri: listing.images[photoIndex] }} className="h-[340px] w-full bg-[#E8E6DF]" resizeMode="cover" />
          <Pressable onPress={() => router.back()} className="absolute left-5 top-4 h-9 w-9 items-center justify-center rounded-full bg-white/95"><ArrowLeft size={18} color="#24332D" /></Pressable>
          <Pressable onPress={() => toggleSaved(listing.id)} className="absolute right-5 top-4 h-9 w-9 items-center justify-center rounded-full bg-white/95"><Heart size={17} color={savedIds.includes(listing.id) ? "#E65B46" : "#24332D"} fill={savedIds.includes(listing.id) ? "#E65B46" : "transparent"} /></Pressable>
          <View className="absolute bottom-3 right-4 rounded-full bg-black/60 px-3 py-1.5"><AppText className="text-[10px] font-semibold text-white">{photoIndex + 1} / {listing.images.length}</AppText></View>
          {listing.images.length > 1 ? <ScrollView horizontal className="absolute bottom-2 left-3" showsHorizontalScrollIndicator={false}>{listing.images.map((image, index) => <Pressable key={`${image}-${index}`} onPress={() => setPhotoIndex(index)} className={`mr-1.5 overflow-hidden rounded-[8px] border-2 ${photoIndex === index ? "border-white" : "border-transparent"}`}><Image source={{ uri: image }} className="h-10 w-10" /></Pressable>)}</ScrollView> : null}
        </View>
        <View className="px-5 pb-8 pt-4">
          <View className="flex-row items-center justify-between"><View className="rounded-full bg-[#E8EEE5] px-2.5 py-1 dark:bg-[#263B36]"><AppText className="text-[10px] font-bold text-[#397052] dark:text-[#A8D5B8]">{listing.condition} condition</AppText></View><Pressable onPress={report} className="flex-row items-center gap-1"><Flag size={13} color="#788079" /><AppText className="text-[10px] text-muted dark:text-nightMuted">Report listing</AppText></Pressable></View>
          <AppText className="mt-2 text-[23px] font-bold leading-[29px]">{listing.title}</AppText>
          <View className="mt-1.5 flex-row items-baseline gap-2"><AppText className="text-[24px] font-extrabold">{formatPrice(listing.price)}</AppText>{listing.status === "sold" ? <AppText className="text-[11px] font-bold text-papaya">SOLD</AppText> : null}</View>
          <View className="mt-4 flex-row items-center gap-2 rounded-[13px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><View className="h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#34433E]"><Check size={16} color="#397052" /></View><View className="flex-1"><AppText className="text-[12px] font-bold text-[#397052] dark:text-[#A8D5B8]">{listing.priceNote} <AppText className="text-[11px] font-medium text-[#53685B] dark:text-[#C1D0C4]">· {listing.comparablePrice}</AppText></AppText><AppText className="mt-0.5 text-[10px] text-[#53685B] dark:text-[#C1D0C4]">Based on similar listings around you</AppText></View><ChevronRight size={15} color="#397052" /></View>
          <View className="mt-4 rounded-[13px] border border-[#E4E1D8] p-3.5 dark:border-[#384640]"><View className="mb-3 flex-row items-center justify-between"><AppText className="text-[12px] font-bold">Nearby price comparison</AppText><AppText className="text-[9px] text-muted dark:text-nightMuted">Updated today</AppText></View><View className="h-2 overflow-hidden rounded-full bg-[#EAE7DE]"><View className="h-2 w-[42%] rounded-full bg-[#86A98D]" /></View><View className="mt-2 flex-row justify-between"><AppText className="text-[9px] text-muted dark:text-nightMuted">Rs. 80</AppText><AppText className="text-[9px] font-bold text-[#397052]">This item {formatPrice(listing.price)}</AppText><AppText className="text-[9px] text-muted dark:text-nightMuted">Rs. 260</AppText></View></View>
          <AppText className="mb-1.5 mt-5 text-[15px] font-bold">Item details</AppText><AppText className="text-[12px] leading-[19px] text-muted dark:text-nightMuted">{listing.description}</AppText>
          <View className="mt-3 flex-row items-center gap-1"><MapPin size={13} color="#788079" /><AppText className="text-[10px] text-muted dark:text-nightMuted">{listing.area} · local pickup</AppText></View>
          <View className="my-5 h-px bg-[#E8E5DC] dark:bg-[#34433E]" />
          <Pressable onPress={() => router.push({ pathname: "/seller/[id]", params: { id: listing.sellerId } })} className="flex-row items-center gap-3">
            <View className="h-[48px] w-[48px] overflow-hidden rounded-full bg-[#E9E4DB]"><Image source={{ uri: listing.avatar }} className="h-[48px] w-[48px]" /></View>
            <View className="flex-1"><View className="flex-row items-center gap-1"><AppText className="text-[13px] font-bold">{listing.seller}</AppText><BadgeCheck size={14} color="#397052" /></View><View className="mt-1 flex-row items-center gap-1"><Star size={11} color="#D89536" fill="#D89536" /><AppText className="text-[10px] font-bold">{listing.rating.toFixed(1)}</AppText><AppText className="text-[10px] text-muted dark:text-nightMuted">· {listing.reviews} reviews · {listing.soldCount} sold</AppText></View></View>
            <ChevronRight size={17} color="#788079" />
          </Pressable>
          {phoneVisible ? <View className="mt-3 flex-row items-center gap-2 rounded-[11px] bg-white p-3 dark:bg-nightCard"><Phone size={14} color="#397052" /><AppText className="text-[11px] font-semibold">{listing.phone}</AppText><AppText className="ml-auto text-[9px] text-muted dark:text-nightMuted">Shared by seller</AppText></View> : null}
          <View className="mt-3 flex-row gap-2"><View className="flex-1 rounded-[11px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Usually replies</AppText><AppText className="mt-1 text-[11px] font-bold">Within an hour</AppText></View><View className="flex-1 rounded-[11px] bg-white p-3 dark:bg-nightCard"><AppText className="text-[9px] text-muted dark:text-nightMuted">Meetup area</AppText><AppText className="mt-1 text-[11px] font-bold">{listing.area.split(",")[0]}</AppText></View></View>
          <View className="mt-5"><PriceTrustNote compact /></View>
          <View className="my-5 h-px bg-[#E8E5DC] dark:bg-[#34433E]" />
          <AppText className="mb-2 text-[15px] font-bold">Recommended for you</AppText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5">{listings.filter((item) => item.id !== listing.id && item.category === listing.category && item.status === "available").concat(listings.filter((item) => item.id !== listing.id && item.category !== listing.category && item.status === "available")).slice(0, 4).map((item) => <Pressable key={item.id} onPress={() => router.replace({ pathname: "/listing/[id]", params: { id: item.id } })} className="mr-3 w-[132px] overflow-hidden rounded-[12px] bg-white dark:bg-nightCard"><Image source={{ uri: item.images[0] }} className="h-[100px] w-full" resizeMode="cover" /><AppText numberOfLines={1} className="px-2 pt-2 text-[10px] font-semibold">{item.title}</AppText><AppText className="px-2 pb-2 text-[12px] font-extrabold">{formatPrice(item.price)}</AppText></Pressable>)}</ScrollView>
        </View>
      </ScrollView>
      <View className="flex-row gap-2 border-t border-[#E8E5DC] bg-canvas px-4 py-3 dark:border-[#34433E] dark:bg-night">
        <Pressable onPress={() => setPhoneVisible((visible) => !visible)} disabled={listing.status === "sold"} className="h-11 w-11 items-center justify-center rounded-[12px] border border-[#DCD9D0] dark:border-[#46534C]" accessibilityRole="button" accessibilityLabel={phoneVisible ? "Hide seller phone number" : "Reveal seller phone number"}><Phone size={17} color="#397052" /></Pressable>
        <Pressable onPress={() => router.push({ pathname: "/chat/[seller]", params: { seller: listing.sellerId, item: listing.id } })} disabled={listing.status === "sold"} className={`flex-1 flex-row items-center justify-center gap-2 rounded-[12px] ${listing.status === "sold" ? "bg-[#8D958F]" : "bg-papaya"}`}><MessageCircle size={16} color="#FFFFFF" /><AppText className="text-[12px] font-bold text-white">{listing.status === "sold" ? "Item sold" : "Message seller"}</AppText></Pressable>
        {listing.sellerId === "jordan" && listing.status !== "sold" ? <Pressable onPress={() => markSold(listing.id)} className="h-11 items-center justify-center rounded-[12px] bg-ink px-3 dark:bg-nightCard" accessibilityRole="button"><AppText className="text-[10px] font-bold text-white">Mark sold</AppText></Pressable> : null}
      </View>
    </View>
  );
}
