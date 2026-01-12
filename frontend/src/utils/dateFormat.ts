// UTC時刻をクライアントのロケールでフォーマットする
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// 期間の開始日と終了日を計算する
export function calculatePeriodRange(
  currentDate: Date,
  period: "day" | "week" | "month",
): { from: Date; to: Date } {
  // UTC基準で日付範囲を計算する
  const from = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
      0,
    ),
  );

  const to = new Date(from);

  if (period === "day") {
    to.setUTCDate(to.getUTCDate() + 1);
  } else if (period === "week") {
    // 週の開始日（月曜日）を計算する
    const weekday = from.getUTCDay();
    const daysToMonday = weekday === 0 ? -6 : 1 - weekday;
    from.setUTCDate(from.getUTCDate() + daysToMonday);
    to.setUTCDate(from.getUTCDate() + 7);
  } else if (period === "month") {
    from.setUTCDate(1);
    to.setUTCMonth(to.getUTCMonth() + 1);
    to.setUTCDate(1);
  }

  return { from, to };
}
