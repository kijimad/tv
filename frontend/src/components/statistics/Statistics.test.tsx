import { describe, expect, test, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "../../test/render";
import Statistics from "./Statistics";

// useStatisticsをモックする
const mockUseStatistics = vi.fn();
vi.mock("../../hooks/useStatistics", () => ({
  useStatistics: (startedAtFrom: Date, startedAtTo: Date, limit?: number) =>
    mockUseStatistics(startedAtFrom, startedAtTo, limit),
}));

describe("Statistics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("正常にレンダリングできる", () => {
    mockUseStatistics.mockImplementation(() => ({
      data: {
        items: [{ title: "テストタスク", duration: 1800, percentage: 100.0 }],
        total: 1800,
      },
      isLoading: false,
      error: null,
    }));

    render(<Statistics />);

    expect(screen.getByText("統計")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "日" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "週" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "月" })).toBeInTheDocument();
  });

  test("ローディング状態を表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { container } = render(<Statistics />);

    // Spinnerが3つ表示される（日・週・月）
    const spinners = container.querySelectorAll(".chakra-spinner");
    expect(spinners.length).toBe(3);
  });

  test("エラー状態を表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("API Error"),
    });

    render(<Statistics />);

    const errorMessages = screen.getAllByText("統計の取得に失敗しました");
    // 3つのパネル全てでエラーが表示される
    expect(errorMessages).toHaveLength(3);
  });

  test("データが空の場合のメッセージを表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: { items: [], total: 0 },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    const emptyMessages = screen.getAllByText("データがありません");
    // 3つのパネル全てで空メッセージが表示される
    expect(emptyMessages).toHaveLength(3);
  });

  test("統計データを正しく表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: {
        items: [
          { title: "コーディング", duration: 3600, percentage: 60.0 },
          { title: "ミーティング", duration: 2400, percentage: 40.0 },
        ],
        total: 6000,
      },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    // 3つのパネルがあるので、getAllByTextを使う
    const codingTexts = screen.getAllByText("コーディング");
    expect(codingTexts.length).toBeGreaterThan(0);
    const meetingTexts = screen.getAllByText("ミーティング");
    expect(meetingTexts.length).toBeGreaterThan(0);
    const percentage60 = screen.getAllByText("60.0%");
    expect(percentage60.length).toBeGreaterThan(0);
    const percentage40 = screen.getAllByText("40.0%");
    expect(percentage40.length).toBeGreaterThan(0);
  });

  test("時間のフォーマットが正しい（時間と分）", () => {
    mockUseStatistics.mockReturnValue({
      data: {
        items: [
          { title: "タスクA", duration: 3660, percentage: 100.0 }, // 1時間1分
        ],
        total: 3660,
      },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    // 合計時間とアイテムの時間両方で"1時間1分"が表示される
    const timeTexts = screen.getAllByText("1時間1分");
    expect(timeTexts.length).toBeGreaterThan(0);
  });

  test("時間のフォーマットが正しい（分のみ）", () => {
    mockUseStatistics.mockReturnValue({
      data: {
        items: [{ title: "タスクB", duration: 600, percentage: 100.0 }], // 10分
        total: 600,
      },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    // 合計時間とアイテムの時間両方で"10分"が表示される
    const timeTexts = screen.getAllByText("10分");
    expect(timeTexts.length).toBeGreaterThan(0);
  });

  test("3つの期間のパネルを表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: {
        items: [{ title: "テストタスク", duration: 1800, percentage: 100.0 }],
        total: 1800,
      },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    // 3つのパネルがあるので、getAllByTextを使う
    const taskTexts = screen.getAllByText("テストタスク");
    expect(taskTexts.length).toBe(3);
  });

  test("複数のアイテムを正しく表示できる", () => {
    mockUseStatistics.mockReturnValue({
      data: {
        items: [
          { title: "タスク1", duration: 1800, percentage: 33.3 },
          { title: "タスク2", duration: 1800, percentage: 33.3 },
          { title: "タスク3", duration: 1800, percentage: 33.4 },
        ],
        total: 5400,
      },
      isLoading: false,
      error: null,
    });

    render(<Statistics />);

    // 3つのパネルがあるので、getAllByTextを使う
    const task1Texts = screen.getAllByText("タスク1");
    expect(task1Texts.length).toBe(3);
    const task2Texts = screen.getAllByText("タスク2");
    expect(task2Texts.length).toBe(3);
    const task3Texts = screen.getAllByText("タスク3");
    expect(task3Texts.length).toBe(3);
    // 33.3%が各パネルに2つずつあるので合計6つ
    const percentages33 = screen.getAllByText("33.3%");
    expect(percentages33.length).toBe(6);
    // 33.4%が各パネルに1つずつあるので合計3つ
    const percentages34 = screen.getAllByText("33.4%");
    expect(percentages34.length).toBe(3);
  });
});
