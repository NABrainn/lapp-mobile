import { MaterialIcons } from "@expo/vector-icons";
import { SPACING, RADIUS, LINE_WIDTH, VARIANT } from "@/core/constants/tokens";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useImportLessonFormViewModel from "../view-model/import-lesson-form-viewmodel";

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
  },
});

const formStyles = StyleSheet.create({
  base: {
    gap: SPACING.MD,
  },
  title: {
    fontSize: VARIANT.TITLE.fontSize,
    fontWeight: VARIANT.TITLE.weight,
    marginBottom: SPACING.MD,
  },
  field: {
    gap: SPACING.XS,
  },
  label: {
    fontSize: VARIANT.LABEL.fontSize,
    fontWeight: VARIANT.LABEL.weight,
  },
  input: {
    borderWidth: LINE_WIDTH.SM,
    borderColor: "black",
    borderRadius: RADIUS.MD,
    padding: SPACING.MD,
    fontSize: VARIANT.BODY.fontSize,
    fontWeight: VARIANT.BODY.weight,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  button: {
    marginTop: SPACING.MD,
    backgroundColor: "black",
    borderRadius: RADIUS.MD,
    padding: SPACING.MD,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: VARIANT.SUBTITLE.fontSize,
    fontWeight: VARIANT.SUBTITLE.weight,
  },
});

export default function ImportLessonForm() {
  const vm = useImportLessonFormViewModel();

  const dynamicButtonStyles = {
    opacity: vm.canImport ? 1 : 0.6,
  };

  return (
    <SafeAreaView style={wrapperStyles.base}>
      <Pressable
        style={backButtonStyles.base}
        onPress={vm.goBack}
        hitSlop={SPACING.MD}
      >
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </Pressable>

      <View style={formStyles.base}>
        <Text style={formStyles.title}>Import lesson</Text>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Title</Text>
          <TextInput
            style={formStyles.input}
            value={vm.title}
            onChangeText={vm.setTitle}
            placeholder="Enter lesson title"
          />
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Description</Text>
          <TextInput
            style={[formStyles.input, formStyles.textarea]}
            value={vm.description}
            onChangeText={vm.setDescription}
            placeholder="Enter lesson description"
            multiline
          />
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.label}>Link</Text>
          <TextInput
            style={formStyles.input}
            value={vm.link}
            onChangeText={vm.setLink}
            placeholder="Paste lesson link"
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        <Pressable
          style={[formStyles.button, dynamicButtonStyles]}
          onPress={() => vm.importLesson()}
        >
          <Text style={formStyles.buttonText}>Import</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
