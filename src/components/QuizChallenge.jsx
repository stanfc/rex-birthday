import { useState } from 'react'
import { quizQuestions } from '../data/quizQuestions'
import './QuizChallenge.css'

export default function QuizChallenge({ onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [score, setScore] = useState(0)
  const [shaking, setShaking] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const question = quizQuestions[current]
  const total = quizQuestions.length

  const checkAnswer = () => {
    if (feedback) return

    let isCorrect = false
    if (question.type === 'choice') {
      if (selectedOption === null) return
      isCorrect = selectedOption === question.answer
    } else {
      if (!textAnswer.trim()) return
      isCorrect = textAnswer.trim() === question.answer
    }

    if (isCorrect) {
      setFeedback('correct')
      setScore((s) => s + 1)
      setTimeout(() => goNext(), 1200)
    } else {
      setFeedback('wrong')
      setShaking(true)
      setTimeout(() => {
        setShaking(false)
        setFeedback(null)
        setShowHint(true)
      }, 1500)
    }
  }

  const goNext = () => {
    if (current < total - 1) {
      setFadeOut(true)
      setTimeout(() => {
        setCurrent((c) => c + 1)
        setSelectedOption(null)
        setTextAnswer('')
        setFeedback(null)
        setShowHint(false)
        setFadeOut(false)
      }, 400)
    } else {
      setFadeOut(true)
      setTimeout(() => setShowResult(true), 500)
    }
  }

  const handleEnter = () => {
    const finalScore = score
    setFadeOut(true)
    setTimeout(() => onComplete(finalScore), 600)
  }

  if (showResult) {
    return (
      <div className="quiz-overlay">
        <div className="quiz-card quiz-result-card">
          <div className="quiz-result-emoji">
            {score === total ? '🏆' : score >= total / 2 ? '🎉' : '😅'}
          </div>
          <h2 className="quiz-result-title">問答結束！</h2>
          <p className="quiz-result-score">
            你答對了 <span className="quiz-score-num">{score}</span> / {total} 題
          </p>
          <p className="quiz-result-msg">
            {score === total
              ? '滿分！你是真正的 雷克斯鐵粉！'
              : score >= total / 2
                ? '不錯喔～對雷克斯有一定了解！'
                : '看來你需要更關注雷克斯了！'}
          </p>
          <button className="quiz-enter-btn" onClick={handleEnter}>
            進入雷克斯官方網站 →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-overlay">
      <div className={`quiz-card ${shaking ? 'shake' : ''} ${fadeOut ? 'fade-out' : ''}`}>
        <div className="quiz-header">
          <span className="quiz-label">粉絲認證問答</span>
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
          <span className="quiz-progress-text">{current + 1} / {total}</span>
        </div>

        <div className="quiz-body">
          <h3 className="quiz-question">{question.question}</h3>

          {question.image && (
            <div className="quiz-image-wrap">
              <img src={question.image} alt="" className="quiz-image" />
            </div>
          )}

          {question.type === 'choice' ? (
            <div className="quiz-options">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`quiz-option ${selectedOption === i ? 'selected' : ''} ${
                    feedback === 'correct' && selectedOption === i ? 'correct' : ''
                  } ${feedback === 'wrong' && selectedOption === i ? 'wrong' : ''}`}
                  onClick={() => !feedback && setSelectedOption(i)}
                >
                  <span className="quiz-option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="quiz-text-input-wrap">
              <input
                type="text"
                className={`quiz-text-input ${
                  feedback === 'correct' ? 'correct' : ''
                } ${feedback === 'wrong' ? 'wrong' : ''}`}
                value={textAnswer}
                onChange={(e) => !feedback && setTextAnswer(e.target.value)}
                placeholder="輸入你的答案..."
              />
            </div>
          )}

          {showHint && (
            <p className="quiz-hint">{question.hint}</p>
          )}

          {feedback === 'correct' && (
            <div className="quiz-feedback correct">答對了！太厲害了～</div>
          )}
          {feedback === 'wrong' && (
            <div className="quiz-feedback wrong">答錯了！再想想看～</div>
          )}
        </div>

        <div className="quiz-footer">
          <button
            className="quiz-submit-btn"
            onClick={checkAnswer}
            disabled={
              !!feedback ||
              (question.type === 'choice' && selectedOption === null) ||
              (question.type === 'text' && !textAnswer.trim())
            }
          >
            確認答案
          </button>
          {feedback === 'wrong' && !shaking && (
            <button
              className="quiz-skip-btn"
              onClick={goNext}
            >
              跳過此題
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
