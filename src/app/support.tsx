import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { ArrowLeft, Check, CircleHelp, ShieldCheck } from "lucide-react-native";
import AppText from "@/components/AppText";

const topics = ["Misleading price", "Item not as described", "Seller behavior", "Payment or safety", "Something else"];

export default function SupportScreen() {
  const { topic } = useLocalSearchParams<{ topic?: string }>();
  const router = useRouter();
  const [selected, setSelected] = useState(topic ? "Seller behavior" : topics[0]);
  const [details, setDetails] = useState(topic ? `I need help with ${topic}. ` : "");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const submit = () => {
    if (!details.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitted(true);
  };
  return (
    <View className="flex-1 bg-canvas dark:bg-night">
      <View className="flex-row items-center border-b border-[#E8E5DC] px-4 pb-3 pt-2 dark:border-[#34433E]"><Pressable onPress={() => router.back()} className="mr-2 h-9 w-9 items-center justify-center"><ArrowLeft size={18} color="#24332D" /></Pressable><View className="flex-1"><AppText className="text-[17px] font-bold">Contact Sewa</AppText><AppText className="text-[10px] text-muted dark:text-nightMuted">Talk to the people behind the marketplace</AppText></View><CircleHelp size={19} color="#397052" /></View>
      <ScrollView className="flex-1 px-5" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="mt-5 flex-row items-start gap-2.5 rounded-[13px] bg-[#E8EEE5] p-3.5 dark:bg-[#263B36]"><ShieldCheck size={17} color="#397052" /><AppText className="flex-1 text-[10px] leading-[16px] text-[#53685B] dark:text-[#C1D0C4]">Reports go to the Sewa team, not the seller. We review concerns about fake prices, misleading descriptions, and member safety.</AppText></View>
        <AppText className="mb-2 mt-5 text-[12px] font-bold">What can we help with?</AppText>
        <View className="gap-2">{topics.map((item) => <Pressable key={item} onPress={() => setSelected(item)} accessibilityRole="button" accessibilityState={{ selected: selected === item }} className={`flex-row items-center gap-2.5 rounded-[11px] border px-3 py-3 ${selected === item ? "border-[#397052] bg-[#E8EEE5] dark:bg-[#263B36]" : "border-[#E4E1D8] bg-white dark:border-[#384640] dark:bg-nightCard"}`}><View className={`h-4 w-4 items-center justify-center rounded-full border ${selected === item ? "border-[#397052] bg-[#397052]" : "border-[#AEB4AE]"}`}>{selected === item ? <Check size={11} color="#FFFFFF" /> : null}</View><AppText className="text-[11px] font-semibold">{item}</AppText></Pressable>)}</View>
        <AppText className="mb-1.5 mt-5 text-[12px] font-bold">What happened?</AppText><TextInput value={details} onChangeText={setDetails} multiline textAlignVertical="top" placeholder="Share any details that may help us review this..." placeholderTextColor="#8D958F" className="min-h-[130px] rounded-[12px] border border-[#E4E1D8] bg-white p-3 text-[11px] text-ink dark:border-[#384640] dark:bg-nightCard dark:text-nightText" />
        <AppText className="mb-4 mt-2 text-[9px] text-muted dark:text-nightMuted">Avoid including bank details, passwords, or verification codes.</AppText>
        {error ? <AppText className="mb-2 text-[10px] font-semibold text-papaya">Add a few details so we can review this.</AppText> : null}
        {submitted ? <View className="mb-3 rounded-[11px] bg-[#E8EEE5] p-3 dark:bg-[#263B36]"><AppText className="text-[11px] font-bold text-[#397052] dark:text-[#A8D5B8]">Report sent to Sewa support</AppText><AppText className="mt-1 text-[10px] text-[#53685B] dark:text-[#C1D0C4]">Thanks for helping keep the marketplace trustworthy.</AppText></View> : null}
        <Pressable onPress={submit} accessibilityRole="button" className="mb-4 items-center rounded-[12px] bg-papaya py-3.5"><AppText className="text-[12px] font-bold text-white">Send to Sewa support</AppText></Pressable>
      </ScrollView>
    </View>
  );
}
