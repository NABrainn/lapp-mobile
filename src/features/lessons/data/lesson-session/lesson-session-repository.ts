import { SQLiteDatabase } from "expo-sqlite";
import {
  DBLessonToken,
  LessonContent,
  LessonResponse,
} from "./lesson-session-types";

type DBLessonRow = {
  id: string;
  photoUrl?: string;
  title: string;
  description: string;
  content: string;
};

export const findLessonById = async (
  db: SQLiteDatabase,
  id: string,
): Promise<LessonResponse> => {
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

  const lesson = await db.getFirstAsync<DBLessonRow>(SQL, [id]);

  if (!lesson) {
    throw new Error(`Lesson not found: ${id}`);
  }

  return {
    id: lesson.id,
    photoUrl: lesson.photoUrl,
    title: lesson.title,
    description: lesson.description,
    content: JSON.parse(lesson.content) as LessonContent<DBLessonToken>,
  };
};
