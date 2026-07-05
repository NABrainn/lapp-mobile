import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Familiarity } from "../data/lesson-session/lesson-session-types";
import For from "@/core/components/for/for";

const computeTokenWrapperStyle = (
  isPaintedPhrasePart: boolean,
  isSelected: boolean,
  shouldHighlightSelected: boolean,
  kind: "word" | "phrase",
  familiarity: Familiarity,
): ViewStyle => {
  const computeBorderWidth = () => {
    if (kind === "phrase" || isPaintedPhrasePart) {
      return 1;
    }
    return 0;
  };
  const computeBackgroundColor = () => {
    if (isSelected && shouldHighlightSelected) {
      return "hsl(120, 60%, 50%)";
    }

    if (isPaintedPhrasePart) {
      return "hsl(20, 60%, 50%)";
    }

    switch (familiarity) {
      case "none":
        return "white";
      case "pristine":
        return "hsl(180, 60%, 50%)";
      case "new":
        return "hsl(180, 60%, 65%)";
      case "recognized":
        return "hsl(180, 60%, 80%)";
      case "familiar":
        return "hsl(180, 60%, 95%)";
      case "known":
        return "hsl(180, 60%, 100%)";
      case "ignored":
        return "hsl(0, 0%, 100%)";
      default:
        return "white";
    }
  };
  const computeBorderColor = (isSelected: boolean, kind: "word" | "phrase") => {
    if (isSelected && shouldHighlightSelected) {
      return "darkgreen";
    }
    if (isPaintedPhrasePart) {
      return "hsl(20, 60%, 50%)";
    }
    return "white";
  };

  const borderWidth = computeBorderWidth();
  const backgroundColor = computeBackgroundColor();
  const borderColor = computeBorderColor(isSelected, kind);
  return {
    borderWidth,
    backgroundColor,
    borderColor,
  };
};

const computeTokenWordStyle = (
  isSelected: boolean,
  kind: "word" | "phrase",
  isPaintedPhrasePart: boolean,
) => {
  const computeBorderWidth = (
    kind: "word" | "phrase",
    isPaintedPhrasePart: boolean,
  ) => {
    if (isPaintedPhrasePart) {
      return 0;
    }
    if (kind === "phrase") {
      return 0;
    }
    return 1;
  };

  const computeBorderColor = (isSelected: boolean) => {
    if (isSelected) {
      return "darkgreen";
    }
    return "white";
  };
  const borderWidth = computeBorderWidth(kind, isPaintedPhrasePart);
  const borderColor = computeBorderColor(isSelected);

  return {
    borderWidth: borderWidth,
    borderColor: borderColor,
  };
};

type TokenProps = {
  id: number;
  kind: "word" | "phrase";
  length?: number;
  inputText: string[];
  outputText: string[];
  familiarity: Familiarity;
  isPaintedPhrasePart: boolean;
  isPressable: boolean;
  isPersisted: boolean;
  isSelected: boolean;
  shouldHighlightSelected: boolean;
  onPress: (id: number, isPressable: boolean) => void;
};

export default function Token({
  id,
  onPress,
  inputText,
  outputText,
  familiarity,
  isPaintedPhrasePart,
  isPressable,
  isPersisted,
  isSelected,
  shouldHighlightSelected,
  length,
  kind,
}: TokenProps) {
  const tokenWrapperStyle: ViewStyle = computeTokenWrapperStyle(
    isPaintedPhrasePart,
    isSelected,
    shouldHighlightSelected,
    kind,
    familiarity,
  );

  const wordWrapperStyle = computeTokenWordStyle(
    isSelected,
    kind,
    isPaintedPhrasePart,
  );

  const textStyle: TextStyle = {
    color: isSelected ? "white" : "black",
  };

  return (
    <Pressable
      onPress={() => onPress(id, isPressable)}
      style={[styles.tokenWrapper, tokenWrapperStyle]}
    >
      <For
        items={inputText}
        renderItem={(item, itemId) => (
          <View key={itemId} style={[styles.wordWrapper, wordWrapperStyle]}>
            <Text style={[textStyle]}>{item}</Text>
          </View>
        )}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tokenWrapper: {
    borderColor: "white",
    flexDirection: "row",
    marginBottom: 2,
    gap: 2,
  },

  wordWrapper: {
    borderColor: "white",
  },
});
