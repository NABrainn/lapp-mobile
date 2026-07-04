export type LessonCard = {
  id: number;
  photoUrl: string;
  title: string;
  description: string;
  sectionTitle: string;
};

export type LessonSection = {
  title: string;
  data: LessonCard[];
};

export type Familiarity =
  "none" | "pristine" | "new" | "recognized" | "familiar" | "known" | "ignored";

type DBLessonTokenBase = {
  inputText: string[];
  outputText: string[];
  familiarity: Familiarity;
  isPressable: boolean;
  isPersisted: boolean;
};

export type DBWord = DBLessonTokenBase & {
  inputText: [string];
};

export type DBPhrase = DBLessonTokenBase & {
  inputText: [string, string, ...string[]];
};

export type DBLessonToken = DBWord | DBPhrase;

export type Paragraph<T> = {
  tokens: T[];
  newLineHeight: number;
};

export type LessonContent<T> = {
  paragraphs: Paragraph<T>[];
};

export type LessonResponse = {
  id: string;
  photoUrl?: string;
  title: string;
  description: string;
  content: LessonContent<DBLessonToken>;
};

export type LessonToken = DBLessonToken & {
  kind: "word" | "phrase";
  isPaintedPhrasePart: boolean;
  isSelected: boolean;
};

export const isPhraseToken = (token: DBLessonToken): boolean =>
  token.inputText.length > 1;

export type Lesson = {
  id: string;
  photoUrl?: string;
  title: string;
  description: string;
  content: LessonContent<LessonToken>;
};
