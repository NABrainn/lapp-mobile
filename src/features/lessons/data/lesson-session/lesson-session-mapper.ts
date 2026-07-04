import {
  Lesson,
  LessonResponse,
  LessonToken,
  isPhraseToken,
} from "./lesson-session-types";
import { isPaintedPhrasePart, isTokenSelected } from "./lesson-session-helpers";

type MapLessonResponseToLessonParams = {
  lessonResponse: LessonResponse;
  selectedTokenId: number | undefined;
  isPhraseModeEnabled: boolean;
  startId: number | undefined;
  endId: number | undefined;
};

export const mapLessonResponseToLesson = ({
  lessonResponse,
  selectedTokenId,
  isPhraseModeEnabled,
  startId,
  endId,
}: MapLessonResponseToLessonParams): Lesson => {
  const mappedParagraphs = lessonResponse.content.paragraphs.map(
    (paragraph) => ({
      ...paragraph,
      tokens: paragraph.tokens.map((token, tokenIndex): LessonToken => ({
        ...token,
        kind: isPhraseToken(token) ? "phrase" : "word",
        isSelected: isTokenSelected(selectedTokenId, tokenIndex),
        isPaintedPhrasePart: isPaintedPhrasePart(
          isPhraseModeEnabled,
          startId,
          endId,
          tokenIndex,
        ),
      })),
    }),
  );

  return {
    id: lessonResponse.id,
    photoUrl: lessonResponse.photoUrl,
    title: lessonResponse.title,
    description: lessonResponse.description,
    content: {
      paragraphs: mappedParagraphs,
    },
  };
};
