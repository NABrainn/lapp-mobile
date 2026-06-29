import { SPACING, VARIANT } from "@/core/constants/tokens";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Show from "../show/show";
import { Href, Link } from "expo-router";

type FabProps = {
  text: string;
  href?: Href;
  onPress?: () => void;
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    backgroundColor: "black",
    bottom: SPACING.MD,
    right: SPACING.MD,
    borderRadius: SPACING.MD,
    width: SPACING.MD * 3,
    height: SPACING.MD * 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: VARIANT.DISPLAY.fontSize,
    fontWeight: VARIANT.DISPLAY.weight,
  },
});

export default function Fab({ text, onPress, href }: FabProps) {
  const content = <Text style={styles.text}>{text}</Text>;

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable style={styles.wrapper}>{content}</Pressable>
      </Link>
    );
  }

  return (
    <Pressable onPress={onPress} style={styles.wrapper}>
      {content}
    </Pressable>
  );
}
