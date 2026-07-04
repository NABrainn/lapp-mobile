import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import {
  Lesson,
  LessonResponse,
} from "../data/lesson-session/lesson-session-types";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useLocalSearchParams, ImperativeRouter } from "expo-router";
import { useSelector } from "@tanstack/react-store";
import {
  phraseModeStore,
  tokenStore,
  lessonSessionStoreApi,
} from "../data/lesson-session/lesson-session-store";
import { findLessonById } from "../data/lesson-session/lesson-session-repository";
import { mapLessonResponseToLesson } from "../data/lesson-session/lesson-session-mapper";

type LessonSessionLocalSearchParams = {
  "lesson-session-id": string;
  "lesson-section-name": string;
};

export default function useLessonSessionViewModel() {
  const router: ImperativeRouter = useRouter();
  const db: SQLiteDatabase = useSQLiteContext();

  const params = useLocalSearchParams<LessonSessionLocalSearchParams>();
  const lessonSessionId: string = params["lesson-session-id"];

  const selectedTokenId = useSelector(
    tokenStore,
    (state) => state.selectedTokenId,
  );

  const isPhraseModeEnabled = useSelector(
    phraseModeStore,
    (state) => state.isPhraseModeEnabled,
  );

  const isPaintingPhrase = useSelector(
    phraseModeStore,
    (state) => state.isPaintingPhrase,
  );

  const startId = useSelector(phraseModeStore, (state) => state.startId);
  const endId = useSelector(phraseModeStore, (state) => state.endId);
  const shouldHighlightSelected = useSelector(
    tokenStore,
    (state) => state.shouldHighlightSelectedToken,
  );

  const {
    data: lessonData,
    isPending: isLessonDataPending,
    error: lessonError,
  } = useQuery({
    queryKey: ["lesson-session-id", lessonSessionId],
    queryFn: () => findLessonById(db, lessonSessionId),
    select: (lessonResponse: LessonResponse): Lesson =>
      mapLessonResponseToLesson({
        lessonResponse,
        selectedTokenId,
        isPhraseModeEnabled,
        startId,
        endId,
      }),
  });

  const handleTokenPress = (
    tokenId: number,
    isPressable: boolean,
    isSelected: boolean,
  ) => {
    if (__DEV__) {
      console.log(`selected token id: ${tokenId}`);
    }

    if (!isPressable) {
      return;
    }

    if (!lessonData || !lessonData.content.paragraphs.length) {
      return;
    }

    if (isSelected && !isPhraseModeEnabled) {
      return;
    }

    if (!isPhraseModeEnabled) {
      lessonSessionStoreApi.selectToken(tokenId);
      return;
    }

    if (!isPaintingPhrase) {
      lessonSessionStoreApi.startPhrasePainting(tokenId);
      return;
    }

    lessonSessionStoreApi.finishPhrasePainting(tokenId);
  };

  const goBack = () => router.back();
  const togglePhraseMode = () => lessonSessionStoreApi.togglePhraseMode();

  return {
    lessonData,
    isLessonDataPending,
    lessonError,
    goBack,
    handleTokenPress,
    isPhraseModeEnabled,
    togglePhraseMode,
    shouldHighlightSelected,
  };
}
