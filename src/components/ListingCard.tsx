import { useRouter } from "expo-router";
import { BadgeCheck, Heart, Star } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import AppText from "@/components/AppText";
import { formatPrice, type Listing } from "@/lib/data";
import { useMarketplace } from "@/lib/store";

export default function ListingCard({ listing }: { listing: Listing }) {
  const router = useRouter();
  const { savedIds, toggleSaved } = useMarketplace();
  const saved = savedIds.includes(listing.id);

  return (
    <View className="mb-4 w-[48.5%] overflow-hidden rounded-[16px] bg-white dark:bg-nightCard">
      <View className="relative">
        <Pressable onPress={() => router.push({ pathname: "/listing/[id]", params: { id: listing.id } })} accessibilityRole="button" accessibilityLabel={`View ${listing.title}`}>
          <Image source={{ uri: listing.images[0] }} className="aspect-square w-full bg-[#E8E6DF]" resizeMode="cover" />
        </Pressable>
        <View className="absolute left-2 top-2 rounded-full bg-white/95 px-2.5 py-1">
          <AppText className="text-[10px] font-bold">{listing.condition}</AppText>
        </View>
        {listing.status === "sold" ? (
          <View className="absolute bottom-2 left-2 rounded-full bg-ink px-2.5 py-1"><AppText className="text-[10px] font-bold text-white">SOLD</AppText></View>
        ) : null}
        <Pressable
          onPress={() => toggleSaved(listing.id)}
          className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/95"
          accessibilityRole="button"
          accessibilityLabel={saved ? "Remove from saved" : "Save item"}
        >
          <Heart size={16} color={saved ? "#E65B46" : "#24332D"} fill={saved ? "#E65B46" : "transparent"} />
        </Pressable>
      </View>
      <Pressable onPress={() => router.push({ pathname: "/listing/[id]", params: { id: listing.id } })} className="px-2.5 pb-2.5 pt-2">
        <View className="mb-0.5 flex-row items-baseline justify-between gap-1">
          <AppText className="text-[17px] font-extrabold">{formatPrice(listing.price)}</AppText>
          <AppText className="text-[9px] font-bold text-[#397052] dark:text-[#A8D5B8]">{listing.priceNote}</AppText>
        </View>
        <AppText numberOfLines={1} className="text-[12px] font-semibold">{listing.title}</AppText>
        <AppText numberOfLines={1} className="mt-1 text-[10px] text-muted dark:text-nightMuted">{listing.area}</AppText>
        <View className="mt-2 flex-row items-center gap-1">
          <View className="h-[18px] w-[18px] overflow-hidden rounded-full bg-[#E9E4DB]"><Image source={{ uri: listing.avatar }} className="h-[18px] w-[18px]" /></View>
          <AppText numberOfLines={1} className="max-w-[70px] text-[10px] font-medium">{listing.seller.split(" ")[0]}</AppText>
          <BadgeCheck size={11} color="#397052" />
          <Star size={10} color="#D89536" fill="#D89536" />
          <AppText className="text-[10px]">{listing.rating.toFixed(1)}</AppText>
        </View>
      </Pressable>
    </View>
  );
}
