import { describe, expect, test } from "vitest";
import { formatDate, calculatePeriodRange } from "./dateFormat";

describe("formatDate", () => {
  test("UTC時刻文字列をクライアントのロケールとタイムゾーンでフォーマットできる", () => {
    const utcString = "2025-11-17T10:00:00Z";
    const result = formatDate(utcString);

    expect(result).toContain("2025");
    expect(result).toContain("11");
    expect(result).toContain("17");
  });

  test("UTC 10:00をJST(+9)に変換すると19:00になる", () => {
    const utcString = "2025-11-17T10:00:00Z";
    const utcDate = new Date(utcString);

    const jstFormatted = utcDate.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo",
    });

    expect(jstFormatted).toBe("2025/11/17 19:00");
  });

  test("UTC 10:00をPST(-8)に変換すると02:00になる", () => {
    const utcString = "2025-11-17T10:00:00Z";
    const utcDate = new Date(utcString);

    const pstFormatted = utcDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });

    expect(pstFormatted).toBe("11/17/2025, 02:00 AM");
  });

  test("同じタイムゾーンでもロケールによってフォーマットが異なる", () => {
    const utcString = "2025-11-17T10:00:00Z";
    const utcDate = new Date(utcString);

    const jstFormatted = utcDate.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo",
    });

    expect(jstFormatted).toBe("11/17/2025, 07:00 PM");
  });
});

describe("calculatePeriodRange", () => {
  test("dayで1日の範囲を計算できる", () => {
    const currentDate = new Date(2026, 0, 15); // 2026-01-15
    const { from, to } = calculatePeriodRange(currentDate, "day");

    expect(from.toISOString()).toBe("2026-01-15T00:00:00.000Z");
    expect(to.toISOString()).toBe("2026-01-16T00:00:00.000Z");
  });

  test("weekで週の範囲を計算できる（月曜始まり）", () => {
    // 2026-01-15は木曜日
    const currentDate = new Date(2026, 0, 15);
    const { from, to } = calculatePeriodRange(currentDate, "week");

    // 月曜日（2026-01-12）から開始する
    expect(from.toISOString()).toBe("2026-01-12T00:00:00.000Z");
    // 7日後（2026-01-19）
    expect(to.toISOString()).toBe("2026-01-19T00:00:00.000Z");
  });

  test("weekで日曜日の場合は前週の月曜日から開始する", () => {
    // 2026-01-11は日曜日
    const currentDate = new Date(2026, 0, 11);
    const { from, to } = calculatePeriodRange(currentDate, "week");

    // 前週の月曜日（2026-01-05）から開始する
    expect(from.toISOString()).toBe("2026-01-05T00:00:00.000Z");
    // 7日後（2026-01-12）
    expect(to.toISOString()).toBe("2026-01-12T00:00:00.000Z");
  });

  test("monthで月の範囲を計算できる", () => {
    const currentDate = new Date(2026, 0, 15); // 2026-01-15
    const { from, to } = calculatePeriodRange(currentDate, "month");

    // 月の最初の日（2026-01-01）
    expect(from.toISOString()).toBe("2026-01-01T00:00:00.000Z");
    // 翌月の最初の日（2026-02-01）
    expect(to.toISOString()).toBe("2026-02-01T00:00:00.000Z");
  });

  test("monthで12月の場合は翌年1月になる", () => {
    const currentDate = new Date(2026, 11, 15); // 2026-12-15
    const { from, to } = calculatePeriodRange(currentDate, "month");

    // 月の最初の日（2026-12-01）
    expect(from.toISOString()).toBe("2026-12-01T00:00:00.000Z");
    // 翌年の1月1日（2027-01-01）
    expect(to.toISOString()).toBe("2027-01-01T00:00:00.000Z");
  });
});
