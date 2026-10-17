import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, TextInput, View } from "react-native";
import { Bell, ChevronDown, Search, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react-native";
import AppText from "@/components/AppText";
import ListingCard from "@/components/ListingCard";
import PriceTrustNote from "@/components/PriceTrustNote";
import TopBar from "@/components/TopBar";
import { categories } from "@/lib/data";
import { useMarketplace } from "@/lib/store";

export default function ExploreScreen() {
  const { listings } = useMarketplace();
  const [category, setCategory] = useState("For you");
  const [query, setQuery] = useState("");
  const [priceFirst, setPriceFirst] = useState(false);

  const matches = useMemo(() => listings.filter((item) => {
    const categoryMatch = category === "For you" || item.category === category;
    const queryMatch = `${item.title} ${item.category} ${item.seller}`.toLowerCase().includes(query.trim().toLowerCase());
    return categoryMatch && queryMatch;
  }).sort((a, b) => priceFirst ? a.price - b.price : 0), [category, listings, priceFirst, query]);

  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <TopBar />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View className="px-5">
          <View className="mb-4 flex-row items-end justify-between">
            <View className="flex-1 pr-3">
              <AppText className="text-[10px] font-bold uppercase tracking-[1.3px] text-papaya">Good finds, nearby</AppText>
              <AppText className="mt-1 font-display text-[28px] font-bold leading-[33px]">Find good things.{"\n"}Give them a next life.</AppText>
            </View>
            <View className="mb-1 h-11 w-11 items-center justify-center rounded-2xl bg-leaf dark:bg-[#263B36]"><Sparkles size={22} color="#397052" /></View>
          </View>
          <View className="mb-4 flex-row items-center rounded-[13px] border border-[#E4E1D8] bg-white px-3 dark:border-[#384640] dark:bg-nightCard">
            <Search size={17} color="#788079" />
            <TextInput value={query} onChangeText={setQuery} placeholder="Search items, brands, sellers" placeholderTextColor="#8D958F" className="h-12 flex-1 px-2 text-[13px] text-ink dark:text-nightText" accessibilityLabel="Search items, brands, sellers" returnKeyType="search" />
            <Pressable onPress={() => setPriceFirst((value) => !value)} className={`h-9 w-9 items-center justify-center rounded-[10px] ${priceFirst ? "bg-papaya" : "bg-[#F2F0E9] dark:bg-[#303D37]"}`} accessibilityRole="button" accessibilityLabel="Sort by lowest price">
              <SlidersHorizontal size={16} color={priceFirst ? "#FFFFFF" : "#53615A"} />
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 mb-5 pl-5">
            <View className="flex-row gap-2 pr-5">
              {categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} className={`rounded-full px-4 py-2.5 ${category === item ? "bg-ink dark:bg-papaya" : "bg-white dark:bg-nightCard"}`}><AppText className={`text-[11px] font-bold ${category === item ? "text-white dark:text-ink" : ""}`}>{item}</AppText></Pressable>)}
            </View>
          </ScrollView>
          <View className="mb-3 flex-row items-center justify-between">
            <View><AppText className="text-[18px] font-extrabold">Picked for you</AppText><AppText className="mt-0.5 text-[11px] text-muted dark:text-nightMuted">{matches.length} nearby · checked today</AppText></View>
            <Pressable onPress={() => setPriceFirst((value) => !value)} className="flex-row items-center gap-1"><AppText className="text-[11px] font-semibold">{priceFirst ? "Lowest price" : "Best match"}</AppText><ChevronDown size={13} color="#788079" /></Pressable>
          </View>
          {matches.length ? <View className="flex-row flex-wrap justify-between">{matches.map((item) => <ListingCard key={item.id} listing={item} />)}</View> : <View className="items-center py-12"><Search size={24} color="#788079" /><AppText className="mt-3 text-[14px] font-bold">No matches nearby</AppText><AppText className="mt-1 text-[11px] text-muted dark:text-nightMuted">Try another search or category.</AppText></View>}
          <View className="mb-6"><PriceTrustNote /></View>
          <View className="mb-7 flex-row items-center gap-3 rounded-[16px] bg-[#F2E7DC] p-3.5 dark:bg-[#403530]">
            <Image source={{ uri: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=220&q=80" }} className="h-[62px] w-[62px] rounded-[12px]" />
            <View className="flex-1"><AppText className="text-[12px] font-bold">Selling something good?</AppText><AppText className="mt-1 text-[10px] leading-[15px] text-muted dark:text-nightMuted">Reach neighbors who will give it a second life.</AppText></View>
            <ShieldCheck size={18} color="#397052" />
          </View>
        </View>
      </ScrollView>
      <Pressable className="absolute bottom-4 right-5 h-[50px] flex-row items-center gap-2 rounded-full bg-papaya px-5 shadow-lg" onPress={() => import("expo-router").then(({ router }) => router.push("/create-listing"))} accessibilityRole="button" accessibilityLabel="Sell an item">
        <Bell size={16} color="#FFFFFF" /><AppText className="text-[13px] font-extrabold text-white">Sell</AppText>
      </Pressable>
    </View>
  );
}
