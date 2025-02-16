export const fetchProgress = async (
  month: string,
  userId: string | null,
  setProgress: React.Dispatch<
    React.SetStateAction<{ month: number; progress: number }[]>
  >
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
    setProgress((prevProgress) => {
      const updatedProgress = prevProgress.map((p) =>
        p.month === Number(month)
          ? { ...p, progress: Number(result[0].per) }
          : p
      );

      if (!updatedProgress.some((p) => p.month === Number(month))) {
        updatedProgress.push({
          month: Number(month),
          progress: Number(result[0].per),
        });
      }

      return updatedProgress;
    });
  } catch (error) {
    console.error(error);
  }
};
