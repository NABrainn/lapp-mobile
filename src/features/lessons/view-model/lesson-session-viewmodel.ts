import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { Lesson, LessonContent } from "../data/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useLocalSearchParams, ImperativeRouter } from "expo-router";
import { createStore, useSelector } from "@tanstack/react-store";

type LessonSessionLocalSearchParams = {
  "lesson-session-id": string;
  "lesson-section-name": string;
};

type TokenStore = {
  selectedTokenId: number | undefined;
};

type PhraseModeStore = {
  isPhraseModeEnabled: boolean;
  isPaintingPhrase: boolean;
  startId: number | undefined;
  endId: number | undefined;
};

const tokenStore = createStore<TokenStore>({
  selectedTokenId: undefined,
});

const phraseModeStore = createStore<PhraseModeStore>({
  isPhraseModeEnabled: false,
  isPaintingPhrase: false,
  startId: undefined,
  endId: undefined,
});

export default function useLessonSessionViewModel() {
  const router: ImperativeRouter = useRouter();
  const db: SQLiteDatabase = useSQLiteContext();
  const params: LessonSessionLocalSearchParams =
    useLocalSearchParams<LessonSessionLocalSearchParams>();
  const lessonSessionId: string = params["lesson-session-id"];

  const findLessonById = async (id: string): Promise<Lesson> => {
    const SQL = `
      SELECT
        lessons.id AS id,
        lessons.photo_url AS photoUrl,
        lessons.title AS title,
        lessons.description AS description,
        lessons.content AS content
      FROM lessons
      WHERE lessons.id = ?
    `;

    const lesson = await db.getFirstAsync<{
      id: string;
      photoUrl?: string;
      title: string;
      description: string;
      content: string;
    }>(SQL, [id]);

    if (!lesson) {
      throw new Error(`Lesson not found: ${id}`);
    }

    return {
      id: lesson.id,
      photoUrl: lesson.photoUrl,
      title: lesson.title,
      description: lesson.description,
      content: JSON.parse(lesson.content) as LessonContent,
    };
  };

  const {
    data: lessonData,
    isPending: isLessonDataPending,
    error: lessonError,
    refetch,
  } = useQuery<Lesson>({
    queryKey: ["lesson-session-id", lessonSessionId],
    queryFn: () => findLessonById(lessonSessionId),
  });

  const selectedTokenId = useSelector(
    tokenStore,
    (state) => state["selectedTokenId"],
  );

  const selectToken = (id: number) =>
    tokenStore.setState((state) => ({ ...state, ["selectedTokenId"]: id }));

  const isTokenSelected = (id: number) => selectedTokenId === id;

  const isPhraseModeEnabled = useSelector(
    phraseModeStore,
    (state) => state["isPhraseModeEnabled"],
  );

  const togglePhraseMode = () =>
    phraseModeStore.setState((state) => ({
      ...state,
      ["isPaintingPhrase"]: false,
      ["startId"]: undefined,
      ["endId"]: undefined,
      ["isPhraseModeEnabled"]: !state.isPhraseModeEnabled,
    }));

  const isPaintingPhrase = useSelector(
    phraseModeStore,
    (state) => state["isPaintingPhrase"],
  );

  const setIsPaintingPhrase = (value: boolean) =>
    phraseModeStore.setState((state) => ({
      ...state,
      ["isPaintingPhrase"]: value,
    }));

  const startId = useSelector(phraseModeStore, (state) => state["startId"]);
  const setStartId = (id: number) =>
    phraseModeStore.setState((state) => ({ ...state, ["startId"]: id }));

  const endId = useSelector(phraseModeStore, (state) => state["endId"]);
  const setEndId = (id: number) =>
    phraseModeStore.setState((state) => ({ ...state, ["endId"]: id }));

  const goBack = () => router.back();

  const isPaintedPhrasePart = (id: number) => {
    if (!isPhraseModeEnabled) {
      return false;
    }
    if (startId === id) {
      return true;
    }
    if (startId && endId) {
      return id >= startId && id <= endId;
    }
    return false;
  };

  const handleTokenPress = async (
    id: number,
    isPressable: boolean,
    isSelected: boolean,
  ) => {
    if (__DEV__) {
      console.log(`selected token id: ${id}`);
    }

    if (isSelected) {
      return;
    }

    if (!isPressable) {
      return;
    }

    if (!lessonData || !lessonData.content.paragraphs.length) {
      return;
    }

    if (!isPhraseModeEnabled) {
      selectToken(id);
      return;
    }

    if (!isPaintingPhrase && !startId) {
      setIsPaintingPhrase(true);
      setStartId(id);
      return;
    }

    setIsPaintingPhrase(false);
    setEndId(id);
  };

  return {
    lessonData,
    isLessonDataPending,
    lessonError,
    goBack,
    handleTokenPress,
    isPhraseModeEnabled,
    togglePhraseMode,
    isPaintedPhrasePart,
    isTokenSelected,
  };
}
