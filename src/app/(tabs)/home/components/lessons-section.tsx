import { SPACING, VARIANT } from "@/core/constants/tokens";
import { Link } from "expo-router";
import { View, Text, FlatList } from "react-native";
import LessonCard from "./lesson-card";
import { LessonSection } from "@/features/lessons/data/types";

type LessonsSectionProps = {
  section: LessonSection;
};

const staticStyles = {
  sectionWrapper: {
    gap: SPACING.SM,
  },
  sectionHeader: {
    fontSize: VARIANT.TITLE.fontSize,
    fontWeight: VARIANT.TITLE.weight,
  },
  horizontalListItemSeparator: {
    width: SPACING.XS,
  },
};

export default function LessonsSection({ section }: LessonsSectionProps) {
  return (
    <View style={[staticStyles.sectionWrapper]}>
      <Text style={[staticStyles.sectionHeader]}>{section.title}</Text>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={[staticStyles.horizontalListItemSeparator]} />
        )}
        horizontal
        data={section.data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/lessons/[lesson-section-name]/[lesson-session-id]",
              params: {
                "lesson-section-name": section.title,
                "lesson-session-id": item.id,
              },
            }}
          >
            <LessonCard title={item.title} />
          </Link>
        )}
      />
    </View>
  );
}
