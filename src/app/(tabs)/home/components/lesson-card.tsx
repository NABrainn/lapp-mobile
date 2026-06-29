import Show from "@/core/components/show/show";
import { LINE_WIDTH, RADIUS, SPACING, VARIANT } from "@/core/constants/tokens";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

type LessonCardProps = {
  title: string;
  photoUrl?: string;
  content?: string;
};

const CARD_SIZE = 220;

const staticStyles = StyleSheet.create({
  wrapper: {
    width: CARD_SIZE,
    borderColor: "black",
    borderRadius: RADIUS.MD,
    borderWidth: LINE_WIDTH.SM,
    overflow: "hidden",
  },
  title: {
    textAlign: "left",
    fontSize: VARIANT.SUBTITLE.fontSize,
    fontWeight: VARIANT.SUBTITLE.weight,
    padding: SPACING.SM,
  },
  image: {
    width: CARD_SIZE,
    height: CARD_SIZE,
  },
});

export default function LessonCard({
  title,
  photoUrl,
  content,
}: LessonCardProps) {
  return (
    <View style={[staticStyles.wrapper]}>
      <Text style={[staticStyles.title]}>{title}</Text>
      <Show
        fallback={
          <Image
            style={[staticStyles.image]}
            resizeMode="contain"
            source={require("@/assets/images/icon.png")}
          />
        }
        when={photoUrl}
      >
        <Image
          style={[staticStyles.image]}
          resizeMode="cover"
          source={{ uri: photoUrl }}
        />
      </Show>
      <Show when={content}>
        <Text>{content}</Text>
      </Show>
    </View>
  );
}
