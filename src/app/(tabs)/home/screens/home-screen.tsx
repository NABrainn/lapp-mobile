import { StyleSheet } from "react-native";
import useHomeViewModel from "../view-model/home-view-model";
import { SPACING } from "@/core/constants/tokens";
import { SafeAreaView } from "react-native-safe-area-context";
import Switch from "@/core/components/switch/switch";
import Match from "@/core/components/match/match";
import Show from "@/core/components/show/show";
import LessonListPlaceholder from "../components/lesson-list-placeholder";
import LessonListEmpty from "../components/lesson-list-empty";
import LessonSectionList from "../components/lesson-section-list";
import Fab from "@/core/components/fab/fab";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    paddingHorizontal: SPACING.MD,
    flexDirection: "column",
  },
});

export default function HomeScreen() {
  const vm = useHomeViewModel();

  return (
    <SafeAreaView style={[styles.wrapper]}>
      <Switch fallback={<LessonSectionList lessons={vm.lessons} />}>
        <Match when={vm.isLessonsPending}>
          <LessonListPlaceholder />
        </Match>
        <Match when={!vm.lessons?.length}>
          <LessonListEmpty />
        </Match>
      </Switch>
      <Show when={!vm.isLessonsPending}>
        <Fab href={"/import-lesson-form"} text="+" />
      </Show>
    </SafeAreaView>
  );
}
