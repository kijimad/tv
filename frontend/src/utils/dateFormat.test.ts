import { describe, expect, test } from "vitest";
import { formatDate } from "./dateFormat";

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
