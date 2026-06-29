import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { LessonCard, LessonSection } from "../data/types";
import { useQuery } from "@tanstack/react-query";

export default function useLessonListViewModel() {
  const db: SQLiteDatabase = useSQLiteContext();

  const findAllLessons: () => Promise<LessonSection[]> = async () => {
    const SQL: string = `
      SELECT
        lessons.id AS id,
        lessons.photo_url AS photoUrl,
        lessons.title AS title,
        lessons.description AS description,
        sections.title AS sectionTitle
      FROM lessons
      LEFT JOIN sections
        ON lessons.section_id = sections.id;
    `;
    const result: LessonCard[] = await db.getAllAsync<LessonCard>(SQL);
    const grouped = result.reduce<Record<string, LessonCard[]>>(
      (accumulator, item) => {
        const title = item.sectionTitle ?? "Untitled";
        accumulator[title] ??= [];
        accumulator[title].push(item);
        return accumulator;
      },
      {},
    );

    return Object.entries(grouped).map(([title, data]) => ({
      title,
      data,
    }));
  };

  const {
    data: lessonsData,
    isPending: isLessonsPending,
    error: lessonsError,
  } = useQuery({
    queryKey: ["lessons"],
    queryFn: findAllLessons,
  });

  if (lessonsError) {
    console.error("lessonsError", lessonsError);
  }

  return {
    lessonsData,
    isLessonsPending,
    lessonsError,
  };
}
