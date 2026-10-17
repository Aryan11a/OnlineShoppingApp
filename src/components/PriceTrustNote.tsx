import { Check, ShieldCheck } from "lucide-react-native";
import { View } from "react-native";
import AppText from "@/components/AppText";

export default function PriceTrustNote({ compact = false }: { compact?: boolean }) {
  return (
    <View className={`flex-row gap-2.5 rounded-[15px] bg-[#E8EEE5] dark:bg-[#263B36] ${compact ? "p-3" : "p-4"}`}>
      <View className="h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#34433E]">
        {compact ? <Check size={16} color="#397052" /> : <ShieldCheck size={17} color="#397052" />}
      </View>
      <View className="flex-1">
        <AppText className="text-[12px] font-bold text-[#397052] dark:text-[#A8D5B8]">{compact ? "Price context, not guesswork" : "More confidence, built in"}</AppText>
        <AppText className="mt-1 text-[11px] leading-[16px] text-[#53685B] dark:text-[#C1D0C4]">
          {compact ? "Compare nearby prices, check seller history, and see if it is still available." : "Sewa checks similar local items, seller history, and availability so you can decide with your eyes open."}
        </AppText>
      </View>
    </View>
  );
}
