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

type LessonTokenBase = {
  inputText: string[];
  outputText: string[];
  familiarity: Familiarity;
  isPressable: boolean;
  isPersisted: boolean;
};

export type Word = LessonTokenBase & {
  inputText: [string];
};

export type Phrase = LessonTokenBase & {
  inputText: [string, string, ...string[]];
};

export type LessonToken = Word | Phrase;

export type Paragraph = {
  tokens: LessonToken[];
  newLineHeight: number;
};

export type LessonContent = {
  paragraphs: Paragraph[];
};

export type Lesson = {
  id: string;
  photoUrl?: string;
  title: string;
  description: string;
  content: LessonContent;
};
