export const fetchProgress = async (
  month: string,
  userId: string | null,
  setProgress: (value: number) => void
) => {
  if (!userId) return;

  const query = new URLSearchParams({ month, userId }).toString();

  try {
    const res = await fetch(`/api/todos/progress?${query}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("進捗率の取得に失敗しました。");
    }

    const result = await res.json();
    setProgress(result[0].per);
  } catch (error) {
    console.error(error);
  }
};
