import { Heart } from "lucide-react-native";
import { ScrollView, View } from "react-native";
import AppText from "@/components/AppText";
import ListingCard from "@/components/ListingCard";
import TopBar from "@/components/TopBar";
import { useMarketplace } from "@/lib/store";

export default function SavedScreen() {
  const { listings, savedIds } = useMarketplace();
  const saved = listings.filter((listing) => savedIds.includes(listing.id));
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <TopBar />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <AppText className="text-[24px] font-bold">Your saved finds</AppText>
        <AppText className="mb-4 mt-1 text-[12px] text-muted dark:text-nightMuted">Keep the good ones close.</AppText>
        {saved.length ? <View className="flex-row flex-wrap justify-between">{saved.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</View> : <View className="items-center py-16"><Heart size={27} color="#788079" /><AppText className="mt-3 text-[14px] font-bold">No saved items yet</AppText><AppText className="mt-1 text-center text-[11px] text-muted dark:text-nightMuted">Tap the heart on anything you would like to come back to.</AppText></View>}
      </ScrollView>
    </View>
  );
}
