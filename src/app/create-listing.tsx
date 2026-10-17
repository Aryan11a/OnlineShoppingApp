import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeft, Camera, Check, ImagePlus, ShieldCheck, X } from "lucide-react-native";
import AppText from "@/components/AppText";
import { categories, currentSeller, type Listing } from "@/lib/data";
import { useMarketplace } from "@/lib/store";

const conditions = ["New", "Like new", "Very good", "Good", "Fair"];

export default function CreateListingScreen() {
  const router = useRouter();
  const { listings, addListing } = useMarketplace();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Home");
  const [condition, setCondition] = useState("Very good");
  const [brand, setBrand] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  const pickPhotos = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsMultipleSelection: true, selectionLimit: 0, quality: 0.82, orderedSelection: true });
    if (!result.canceled) setImages((current) => [...current, ...result.assets.map((asset) => asset.uri).filter((uri) => !current.includes(uri))]);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Camera permission needed", "Allow Sewa to access your camera to take a listing photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ["images"], quality: 0.82 });
    if (!result.canceled) setImages((current) => [...current, ...result.assets.map((asset) => asset.uri)]);
  };

  const comparable = listings.filter((item) => item.category === category).map((item) => item.price);
  const average = comparable.length ? Math.round(comparable.reduce((total, item) => total + item, 0) / comparable.length) : 0;
  const numericPrice = Number(price);
  const priceHint = !numericPrice || !average ? "Add a price to see a local comparison" : numericPrice < average * 0.8 ? "Below similar items nearby" : numericPrice > average * 1.2 ? "Above similar items nearby" : "In line with similar items nearby";

  const publish = () => {
    if (!title.trim() || !price.trim()) {
      setFormError("Add an item name and price to preview your listing.");
      return;
    }
    if (!images.length) {
      setFormError("Add at least one photo before previewing your listing.");
      return;
    }
    setFormError("");
    const listing: Listing = {
      id: `sewa-${Date.now()}`,
      title: title.trim(),
      price: numericPrice,
      category: category === "For you" ? "Home" : category,
      condition,
      images,
      description: [brand && `Brand: ${brand}`, specs, description].filter(Boolean).join("\n\n"),
      sellerId: currentSeller.id,
      seller: currentSeller.name,
      avatar: currentSeller.avatar,
      phone: currentSeller.phone,
      rating: 4.9,
      reviews: 12,
      soldCount: 6,
      area: "Brooklyn, nearby",
      status: "available",
      priceNote: priceHint.split(" nearby")[0],
      comparablePrice: average ? `Similar items average Rs. ${average}` : "No local price data yet",
    };
    addListing(listing);
    router.replace({ pathname: "/listing/[id]", params: { id: listing.id } });
  };

  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <View className="flex-row items-center border-b border-[#E8E5DC] px-4 pb-3 pt-2 dark:border-[#34433E]"><Pressable onPress={() => router.back()} className="mr-2 h-9 w-9 items-center justify-center"><ArrowLeft size={18} color="#24332D" /></Pressable><View className="flex-1"><AppText className="text-[17px] font-bold">List an item</AppText><AppText className="text-[10px] text-muted dark:text-nightMuted">A good post finds the right next home.</AppText></View></View>
      <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Pressable onPress={pickPhotos} accessibilityRole="button" accessibilityLabel="Choose multiple item photos" className="mt-4 min-h-[158px] items-center justify-center rounded-[15px] border border-dashed border-[#C7C4BA] bg-[#F0EDE6] px-4 py-4 dark:border-[#59645D] dark:bg-nightCard"><View className="h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-[#34433E]"><ImagePlus size={20} color="#397052" /></View><AppText className="mt-2 text-[12px] font-bold">Add as many photos as you need</AppText><AppText className="mt-1 text-[10px] text-muted dark:text-nightMuted">Select multiple photos or add them one at a time</AppText><View className="mt-3 flex-row gap-2"><View className="flex-row items-center gap-1 rounded-full bg-white px-3 py-1.5 dark:bg-[#34433E]"><ImagePlus size={12} color="#397052" /><AppText className="text-[10px] font-semibold">Choose photos</AppText></View><Pressable onPress={(event) => { event.stopPropagation(); void takePhoto(); }} accessibilityRole="button" className="flex-row items-center gap-1 rounded-full bg-white px-3 py-1.5 dark:bg-[#34433E]"><Camera size={12} color="#397052" /><AppText className="text-[10px] font-semibold">Take photo</AppText></Pressable></View></Pressable>
        {images.length ? <ScrollView horizontal className="mt-2" showsHorizontalScrollIndicator={false}>{images.map((uri, index) => <View key={`${uri}-${index}`} className="relative mr-2"><Image source={{ uri }} className="h-[74px] w-[74px] rounded-[10px]" /><Pressable onPress={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 h-5 w-5 items-center justify-center rounded-full bg-ink/80"><X size={12} color="#fff" /></Pressable>{index === 0 ? <View className="absolute bottom-1 left-1 rounded-full bg-white/95 px-1.5 py-0.5"><AppText className="text-[8px] font-bold">Cover</AppText></View> : null}</View>)}</ScrollView> : null}
        <AppText className="mb-1.5 mt-5 text-[11px] font-bold">Item name</AppText><TextInput value={title} onChangeText={setTitle} placeholder="e.g. Walnut bedside table" placeholderTextColor="#8D958F" maxLength={70} className="h-11 rounded-[11px] border border-[#E4E1D8] bg-white px-3 text-[12px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" />
        <AppText className="mb-2 mt-4 text-[11px] font-bold">Category</AppText><ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 pl-5"><View className="flex-row gap-2 pr-5">{categories.slice(1).map((item) => <Pressable key={item} onPress={() => setCategory(item)} className={`rounded-full px-3.5 py-2 ${category === item ? "bg-ink dark:bg-papaya" : "bg-white dark:bg-nightCard"}`}><AppText className={`text-[10px] font-semibold ${category === item ? "text-white dark:text-ink" : ""}`}>{item}</AppText></Pressable>)}</View></ScrollView>
        <View className="mt-4 flex-row gap-3"><View className="flex-1"><AppText className="mb-1.5 text-[11px] font-bold">Your price (Rs.)</AppText><TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder="Rs. 0" placeholderTextColor="#8D958F" className="h-11 rounded-[11px] border border-[#E4E1D8] bg-white px-3 text-[12px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" /></View><View className="flex-1"><AppText className="mb-1.5 text-[11px] font-bold">Condition</AppText><View className="h-11 flex-row items-center rounded-[11px] border border-[#E4E1D8] bg-white px-2 dark:border-[#384640] dark:bg-nightCard"><ScrollView horizontal showsHorizontalScrollIndicator={false}>{conditions.map((item) => <Pressable key={item} onPress={() => setCondition(item)} className={`mr-1.5 rounded-full px-2 py-1.5 ${condition === item ? "bg-[#E8EEE5] dark:bg-[#34433E]" : ""}`}><AppText className={`text-[9px] font-semibold ${condition === item ? "text-[#397052] dark:text-[#A8D5B8]" : "text-muted dark:text-nightMuted"}`}>{item}</AppText></Pressable>)}</ScrollView></View></View></View>
        <View className="mt-3 flex-row items-center gap-2 rounded-[12px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><Check size={14} color="#397052" /><View className="flex-1"><AppText className="text-[10px] font-bold text-[#397052] dark:text-[#A8D5B8]">{priceHint}</AppText><AppText className="mt-0.5 text-[9px] text-[#53685B] dark:text-[#C1D0C4]">{average ? `Similar ${category.toLowerCase()} items average Rs. ${average}.` : "More comparable items will improve this estimate."}</AppText></View></View>
        <AppText className="mb-1.5 mt-4 text-[11px] font-bold">Brand (optional)</AppText><TextInput value={brand} onChangeText={setBrand} placeholder="e.g. IKEA, Canon, handmade" placeholderTextColor="#8D958F" className="h-11 rounded-[11px] border border-[#E4E1D8] bg-white px-3 text-[12px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" />
        <AppText className="mb-1.5 mt-4 text-[11px] font-bold">Specs or dimensions</AppText><TextInput value={specs} onChangeText={setSpecs} placeholder="Size, material, model, color, compatibility..." placeholderTextColor="#8D958F" className="h-11 rounded-[11px] border border-[#E4E1D8] bg-white px-3 text-[12px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" />
        <AppText className="mb-1.5 mt-4 text-[11px] font-bold">Description</AppText><TextInput value={description} onChangeText={setDescription} multiline textAlignVertical="top" placeholder="Tell buyers what makes it useful, what works well, and any signs of wear." placeholderTextColor="#8D958F" className="min-h-[92px] rounded-[11px] border border-[#E4E1D8] bg-white p-3 text-[12px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" />
        <View className="mb-4 mt-4 flex-row gap-2"><ShieldCheck size={16} color="#397052" /><AppText className="flex-1 text-[10px] leading-[15px] text-[#53685B] dark:text-[#C1D0C4]">Your phone number stays private. Buyers can message you through Sewa and you choose whether to share it.</AppText></View>
        {formError ? <AppText className="mb-2 text-[10px] font-semibold text-papaya">{formError}</AppText> : null}
        <Pressable onPress={publish} accessibilityRole="button" className="mb-8 items-center rounded-[12px] bg-papaya py-3.5"><AppText className="text-[12px] font-bold text-white">Preview listing</AppText></Pressable>
      </ScrollView>
    </View>
  );
}
