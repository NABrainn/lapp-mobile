import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Familiarity } from "../data/types";
import For from "@/core/components/for/for";

const computeTokenWrapperStyle = (
  isPaintedPhrasePart: boolean,
  isSelected: boolean,
  kind: "word" | "phrase",
  familiarity: Familiarity,
): ViewStyle => {
  const borderWidth = kind === "phrase" ? 1 : 0;
  const backgroundColor = isSelected
    ? "hsl(120, 60%, 50%)"
    : isPaintedPhrasePart
      ? "hsl(20, 60%, 50%)"
      : familiarity === "none"
        ? "white"
        : familiarity === "pristine"
          ? "hsl(180, 60%, 50%)"
          : familiarity === "new"
            ? "hsl(180, 60%, 65%)"
            : familiarity === "recognized"
              ? "hsl(180, 60%, 80%)"
              : familiarity === "familiar"
                ? "hsl(180, 60%, 95%)"
                : familiarity === "known"
                  ? "hsl(180, 60%, 100%)"
                  : familiarity === "ignored"
                    ? "hsl(0, 0%, 100%)"
                    : "white";

  const borderColor = isSelected ? "darkgreen" : "white";
  return {
    borderWidth,
    backgroundColor,
    borderColor,
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
  length,
  kind,
}: TokenProps) {
  const tokenWrapperStyle: ViewStyle = computeTokenWrapperStyle(
    isPaintedPhrasePart,
    isSelected,
    kind,
    familiarity,
  );

  const wordWrapperStyle: ViewStyle = {
    borderWidth: kind === "phrase" ? 0 : 1,
    borderColor: isSelected ? "darkgreen" : "white",
  };

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
    marginRight: 1,
    gap: 2,
  },

  wordWrapper: {
    borderColor: "white",
  },
});
