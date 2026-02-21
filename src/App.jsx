import { useState } from 'react'
import CloudflareVerification from './components/CloudflareVerification'
import CaptchaChallenge from './components/CaptchaChallenge'
import QuizChallenge from './components/QuizChallenge'
import MainSite from './components/MainSite'

/**
 * 流程：
 * 1. cloudflare — 假的 Cloudflare 驗證頁面
 * 2. captcha    — 假的 reCAPTCHA 九宮格挑戰
 * 3. quiz       — 粉絲問答關卡
 * 4. main       — 正式偶像官方網站
 */
export default function App() {
  const [stage, setStage] = useState('cloudflare')
  const [quizScore, setQuizScore] = useState(null)

  return (
    <>
      {stage === 'cloudflare' && (
        <CloudflareVerification onVerified={() => setStage('captcha')} />
      )}
      {stage === 'captcha' && (
        <CaptchaChallenge onComplete={() => setStage('quiz')} />
      )}
      {stage === 'quiz' && (
        <QuizChallenge
          onComplete={(score) => {
            setQuizScore(score)
            setStage('main')
          }}
        />
      )}
      {stage === 'main' && (
        <MainSite quizScore={quizScore} />
      )}
    </>
  )
}
