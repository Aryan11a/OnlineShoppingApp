/// <reference types="nativewind/types" />

import "react-native";

declare module "react-native" {
	interface ViewProps { className?: string }
	interface TextProps { className?: string }
	interface ImagePropsBase { className?: string }
	interface PressableProps { className?: string }
	interface TextInputProps { className?: string }
	interface ScrollViewProps {
		className?: string;
		contentContainerClassName?: string;
		indicatorClassName?: string;
	}
	interface KeyboardAvoidingViewProps { className?: string }
}
