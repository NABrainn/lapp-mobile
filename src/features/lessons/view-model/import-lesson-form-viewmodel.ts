import { useRouter } from "expo-router";
import { createStore, useSelector } from "@tanstack/react-store";
import { useQuery } from "@tanstack/react-query";

type ImportLessonFormFields = {
  title: string;
  description?: string;
  link: string;
};

type ImportLessonFormStore = ImportLessonFormFields & {
  invalidFields: (keyof ImportLessonFormFields)[];
};

type ImportLessonFormField = keyof ImportLessonFormFields;

type ImportedLesson = {
  content: string;
};

const store = createStore<ImportLessonFormStore>({
  title: "",
  description: "",
  link: "",
  invalidFields: ["title", "link"],
});

export default function useImportLessonFormViewModel() {
  const router = useRouter();

  const title = useSelector(store, (store) => store["title"]);
  const setTitle = (title: string) => {
    const updateTitle = () => title;
    const updateInvalidFields = (state: ImportLessonFormStore) =>
      title.trim() !== ""
        ? state.invalidFields.filter((field) => field !== "title")
        : [
            ...new Set<ImportLessonFormField>([
              ...state.invalidFields,
              "title",
            ]),
          ];

    store.setState((state) => ({
      ...state,
      ["title"]: updateTitle(),
      ["invalidFields"]: updateInvalidFields(state),
    }));
  };

  const description = useSelector(store, (store) => store["description"]);
  const setDescription = (description: string) =>
    store.setState((state) => ({
      ...state,
      ["description"]: description,
      ["invalidFields"]: state.invalidFields.filter(
        (field) => field !== "description",
      ),
    }));

  const link = useSelector(store, (store) => store["link"]);
  const setLink = (link: string) => {
    const updateLink = () => link;
    const updateInvalidFields = (state: ImportLessonFormStore) =>
      link.trim() !== ""
        ? state.invalidFields.filter((field) => field !== "link")
        : [...new Set<ImportLessonFormField>([...state.invalidFields, "link"])];

    store.setState((state) => ({
      ...state,
      ["link"]: updateLink(),
      ["invalidFields"]: updateInvalidFields(state),
    }));
  };

  const invalidFields = useSelector(store, (state) => state["invalidFields"]);
  const canImport = !invalidFields.length;

  const goBack = () => {
    router.back();
  };

  const fetchLesson = async () => {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const rawText = await response.text();
    const cleanText = rawText
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .trim();
    if (__DEV__) {
      console.log(
        `Content for resource ${link} successfully imported: ${cleanText.split("").slice(0, 100)}`,
      );
    }
    const importedLesson: ImportedLesson = {
      content: rawText,
    };
    return importedLesson;
  };

  const {
    data: importedLesson,
    error: importLessonError,
    isFetching: isImportingLesson,
    refetch: importLesson,
  } = useQuery<ImportedLesson>({
    enabled: false,
    retry: true,
    queryKey: ["lesson-import-id"],
    queryFn: fetchLesson,
  });

  return {
    importedLesson,
    isImportingLesson,
    importLessonError,
    title,
    setTitle,

    description,
    setDescription,

    link,
    setLink,

    goBack,
    importLesson,
    canImport,
  };
}
