import { LessonSection } from "@/features/lessons/data/types";
import { FlatList, StyleSheet, View } from "react-native";
import LessonsSection from "./lessons-section";
import { SPACING } from "@/core/constants/tokens";

type LessonSectionListProps = {
  lessons: LessonSection[];
};

const styles = StyleSheet.create({
  verticalListItemSeparator: {
    height: SPACING.XL,
  },
});

export default function LessonSectionList({ lessons }: LessonSectionListProps) {
  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={[styles.verticalListItemSeparator]} />
      )}
      data={lessons}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => <LessonsSection section={item} />}
    />
  );
}
