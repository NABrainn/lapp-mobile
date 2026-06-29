import useLessonListViewModel from "@/features/lessons/view-model/lesson-list-viewmodel";

export default function useHomeViewModel() {
  const lessonsViewModel = useLessonListViewModel();

  const lessons = lessonsViewModel.lessonsData ?? [];
  const isLessonsPending = lessonsViewModel.isLessonsPending;
  const lessonsError = lessonsViewModel.lessonsError;

  return {
    lessons,
    isLessonsPending,
    lessonsError,
  };
}
