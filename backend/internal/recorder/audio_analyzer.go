package recorder

import (
	"fmt"
	"log"
	"os/exec"
	"regexp"
	"strconv"
)

// AudioAnalysisResult は音声解析の結果を保持する
type AudioAnalysisResult struct {
	TotalFrames   int     // 総フレーム数
	ActiveFrames  int     // アクティブフレーム数
	ChangeRate    float64 // 閾値 (dB)
	ActivityRatio float64 // 音声アクティビティ率 (%)
}

// AudioAnalyzer は動画の音声を解析する
type AudioAnalyzer struct{}

// NewAudioAnalyzer は新しいAudioAnalyzerを作成する
func NewAudioAnalyzer() *AudioAnalyzer {
	return &AudioAnalyzer{}
}

// Analyze は動画ファイルの音声を解析する
// フレームごとのRMS音量を取得し、絶対的な閾値より大きい音量のフレームをカウントする
func (a *AudioAnalyzer) Analyze(videoPath string) (*AudioAnalysisResult, error) {
	// フレームごとのRMS音量を取得する
	rmsLevels, err := a.getRMSLevels(videoPath)
	if err != nil {
		return nil, fmt.Errorf("failed to get RMS levels: %w", err)
	}

	if len(rmsLevels) == 0 {
		return nil, fmt.Errorf("no RMS levels found")
	}

	// 絶対的な閾値を設定する（-50dB: 静かな音声レベル）
	const threshold = -50.0

	// 閾値より大きい音量のフレームをカウントする
	activeFrames := 0
	for _, rms := range rmsLevels {
		if rms > threshold {
			activeFrames++
		}
	}

	// 音声アクティビティ率を計算する
	totalFrames := len(rmsLevels)
	activityRatio := 0.0
	if totalFrames > 0 {
		activityRatio = float64(activeFrames) / float64(totalFrames) * 100.0
	}

	result := &AudioAnalysisResult{
		TotalFrames:   totalFrames,
		ActiveFrames:  activeFrames,
		ChangeRate:    threshold,
		ActivityRatio: activityRatio,
	}

	log.Printf("Audio analysis result for %s: frames=%d, active=%d, threshold=%.2fdB, activity_ratio=%.2f%%",
		videoPath, totalFrames, activeFrames, threshold, activityRatio)

	return result, nil
}

// getRMSLevels はFFmpegのastatsフィルターで0.5秒ごとのRMS音量を取得する
// 人の声の周波数帯域（300Hz-3400Hz）にフィルタリングしてから測定する
func (a *AudioAnalyzer) getRMSLevels(videoPath string) ([]float64, error) {
	// 0.1秒ごとにリセットしてRMS音量を測定する
	cmd := exec.Command("ffmpeg",
		"-i", videoPath,
		"-af", "highpass=f=300,lowpass=f=3400,astats=metadata=1:reset=0.1,ametadata=mode=print:file=-",
		"-f", "null",
		"-")

	output, err := cmd.CombinedOutput()
	if err != nil {
		// ffmpegは正常終了でもerrを返すことがあるので、出力を確認する
		if len(output) == 0 {
			return nil, fmt.Errorf("ffmpeg astats failed: %w", err)
		}
	}

	// lavfi.astats.1.RMS_level=-59.999166 のような行を探す（チャンネル1のみ）
	re := regexp.MustCompile(`lavfi\.astats\.1\.RMS_level=([-\d.]+)`)
	matches := re.FindAllStringSubmatch(string(output), -1)
	if len(matches) == 0 {
		return nil, fmt.Errorf("RMS_level not found in output")
	}

	// すべてのRMSレベルを収集する
	var rmsLevels []float64
	for _, match := range matches {
		if len(match) >= 2 {
			rms, err := strconv.ParseFloat(match[1], 64)
			if err != nil {
				log.Printf("Failed to parse RMS level: %v", err)
				continue
			}
			rmsLevels = append(rmsLevels, rms)
		}
	}

	if len(rmsLevels) == 0 {
		return nil, fmt.Errorf("no valid RMS levels found")
	}

	return rmsLevels, nil
}
