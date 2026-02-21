import { useState } from 'react'
import { challenges } from '../data/challenges'
import './CaptchaChallenge.css'

export default function CaptchaChallenge({ onComplete }) {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [selected, setSelected] = useState(new Set())
  const [feedback, setFeedback] = useState(null)
  const [shaking, setShaking] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const challenge = challenges[currentChallenge]

  const toggleSelect = (index) => {
    if (feedback) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const handleVerify = () => {
    if (feedback) return

    const correct = challenge.correctIndices
    const selectedArr = [...selected].sort()
    const correctArr = [...correct].sort()

    // 什麼都沒選的情況
    if (selectedArr.length === 0 && correctArr.length > 0) {
      setFeedback(challenge.emptyMessage || challenge.wrongMessage)
      triggerShake()
      return
    }

    // 什麼都沒選但正確答案也是空的（第二題陷阱）
    if (selectedArr.length === 0 && correctArr.length === 0) {
      goNext()
      return
    }

    // 比對答案
    const isCorrect =
      selectedArr.length === correctArr.length &&
      selectedArr.every((v, i) => v === correctArr[i])

    if (isCorrect) {
      goNext()
    } else {
      setFeedback(challenge.wrongMessage)
      triggerShake()
    }
  }

  const triggerShake = () => {
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      setFeedback(null)
      setSelected(new Set())
    }, 2000)
  }

  const goNext = () => {
    if (currentChallenge < challenges.length - 1) {
      setFadeOut(true)
      setTimeout(() => {
        setCurrentChallenge((prev) => prev + 1)
        setSelected(new Set())
        setFeedback(null)
        setFadeOut(false)
      }, 400)
    } else {
      setFadeOut(true)
      setTimeout(() => onComplete(), 600)
    }
  }

  return (
    <div className="captcha-overlay">
      <div className={`captcha-container ${shaking ? 'shake' : ''} ${fadeOut ? 'fade-out' : ''}`}>
        <div className="captcha-header">
          <span className="captcha-question">{challenge.question}</span>
          <span className="captcha-progress">
            {currentChallenge + 1} / {challenges.length}
          </span>
        </div>

        <div className="captcha-grid">
          {challenge.images.map((img, index) => (
            <div
              key={`${currentChallenge}-${index}`}
              className={`captcha-cell ${selected.has(index) ? 'selected' : ''}`}
              onClick={() => toggleSelect(index)}
            >
              {img.src ? (
                <img src={img.src} alt="" className="captcha-img" />
              ) : (
                <div
                  className="captcha-placeholder"
                  style={{ background: img.color }}
                >
                  <span className="captcha-placeholder-text">
                    {img.label}
                  </span>
                </div>
              )}
              {selected.has(index) && (
                <div className="captcha-check">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {feedback && (
          <div className="captcha-feedback">{feedback}</div>
        )}

        <div className="captcha-footer">
          <div className="captcha-footer-left">
            <button className="captcha-icon-btn" title="重新載入">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 4v6h6M23 20v-6h-6" />
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
              </svg>
            </button>
            <button className="captcha-icon-btn" title="音訊驗證">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" />
              </svg>
            </button>
          </div>
          <button className="captcha-verify-btn" onClick={handleVerify}>
            驗證
          </button>
        </div>

        <div className="captcha-branding">
          <div className="captcha-brand-left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#4285f4" />
              <path d="M12 2C6.48 2 2 6.48 2 12h10V2z" fill="#0d47a1" />
              <path d="M12 12H2c0 5.52 4.48 10 10 10V12z" fill="#1565c0" />
              <path d="M12 12v10c5.52 0 10-4.48 10-10H12z" fill="#42a5f5" />
            </svg>
            <span className="captcha-brand-name">reCAPTCHA</span>
          </div>
          <div className="captcha-brand-right">
            <a href="#" className="captcha-brand-link">隱私權</a>
            <span className="captcha-brand-sep">-</span>
            <a href="#" className="captcha-brand-link">條款</a>
          </div>
        </div>
      </div>
    </div>
  )
}
