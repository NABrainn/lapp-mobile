import { MaterialIcons } from "@expo/vector-icons";
import Match from "@/core/components/match/match";
import Switch from "@/core/components/switch/switch";
import { SPACING, TEXT, WEIGHT } from "@/core/constants/tokens";
import { responsiveFontSize } from "@/core/helpers/font-size";
import {
  Pressable,
  StyleSheet,
  Switch as SwitchButton,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLessonSessionViewModel from "../view-model/lesson-session-viewmodel";
import For from "@/core/components/for/for";
import Token from "../components/token";

const wrapperStyles = StyleSheet.create({
  base: {
    flex: 1,
    padding: SPACING.MD,
    backgroundColor: "white",
  },
});

const backButtonStyles = StyleSheet.create({
  base: {
    marginBottom: SPACING.MD,
    alignSelf: "flex-start",
  },
});

const switchButtonStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});

const lessonComponentStyles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(TEXT.LG),
    fontWeight: WEIGHT.LG,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default function LessonSessionScreen() {
  const vm = useLessonSessionViewModel();

  const Placeholder = () => (
    <View>
      <Text>Loading...</Text>
    </View>
  );
  const Error = () => (
    <View>
      <Text>An error occurred while loading the lesson.</Text>
    </View>
  );

  const NotFound = () => (
    <View>
      <Text>Lesson not found</Text>
    </View>
  );

  const Content = () => (
    <View>
      <Text style={lessonComponentStyles.title}>{vm.lessonData?.title}</Text>

      <View>
        <For
          items={vm.lessonData?.content.paragraphs ?? []}
          renderItem={(paragraph, paragraphIndex) => (
            <View key={paragraphIndex} style={lessonComponentStyles.content}>
              <For
                items={paragraph.tokens}
                renderItem={(token, tokenIndex) => (
                  <Token
                    id={tokenIndex}
                    onPress={() =>
                      vm.handleTokenPress(
                        tokenIndex,
                        token.isPressable,
                        token.isSelected,
                      )
                    }
                    key={tokenIndex}
                    kind={token.inputText.length <= 1 ? "word" : "phrase"}
                    inputText={token.inputText}
                    outputText={token.outputText}
                    familiarity={token.familiarity}
                    isPaintedPhrasePart={vm.isPaintedPhrasePart(tokenIndex)}
                    isPressable={token.isPressable}
                    isPersisted={token.isPersisted}
                    isSelected={token.isSelected}
                  />
                )}
              />
            </View>
          )}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView collapsable={false} style={wrapperStyles.base}>
      <View>
        <Pressable
          style={backButtonStyles.base}
          onPress={vm.goBack}
          hitSlop={SPACING.MD}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <View style={[switchButtonStyles.base]}>
        <Text>Phrase Mode</Text>
        <SwitchButton
          value={vm.isPhraseModeEnabled}
          onValueChange={vm.togglePhraseMode}
        />
      </View>
      <View>
        <Switch>
          <Match when={vm.isLessonDataPending}>
            <Placeholder />
          </Match>

          <Match when={vm.lessonError}>
            <Error />
          </Match>

          <Match when={!vm.lessonData}>
            <NotFound />
          </Match>

          <Match when={vm.lessonData}>
            <Content />
          </Match>
        </Switch>
      </View>
    </SafeAreaView>
  );
}
