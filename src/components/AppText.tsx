import type { ComponentProps } from "react";
import { Text } from "react-native";

type Props = ComponentProps<typeof Text> & { className?: string };

export default function AppText({ className = "", ...props }: Props) {
  return <Text className={`text-ink dark:text-nightText ${className}`} {...props} />;
}
