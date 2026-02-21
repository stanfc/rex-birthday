import { useState } from 'react'
import './CloudflareVerification.css'

const SITE_NAME = 'rex-birthday.github.io'

export default function CloudflareVerification({ onVerified }) {
  const [stage, setStage] = useState('idle') // idle | verifying | verified

  const handleCheck = () => {
    if (stage !== 'idle') return
    setStage('verifying')

    setTimeout(() => {
      setStage('verified')
      setTimeout(() => {
        onVerified()
      }, 1200)
    }, 2500)
  }

  return (
    <div className="cf-page">
      <div className="cf-card">
        <div className="cf-header">
          <div className="cf-url-bar">
            <span className="cf-lock">🔒</span>
            <span className="cf-url">{SITE_NAME}</span>
          </div>
        </div>

        <div className="cf-body">
          <h1 className="cf-title">
            {stage === 'verified'
              ? '驗證成功！'
              : '請驗證您是真人'}
          </h1>
          <p className="cf-subtitle">
            {stage === 'verified'
              ? '正在前往網站...'
              : `${SITE_NAME} 需要驗證您的連線安全性。`}
          </p>

          <div className="cf-turnstile" onClick={handleCheck}>
            <div className={`cf-checkbox ${stage}`}>
              {stage === 'idle' && <div className="cf-checkbox-inner" />}
              {stage === 'verifying' && <div className="cf-spinner" />}
              {stage === 'verified' && <div className="cf-checkmark">✓</div>}
            </div>
            <span className="cf-label">我是真人</span>
            <div className="cf-turnstile-brand">
              <div className="cf-brand-logo">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#f48120" strokeWidth="2" />
                  <path d="M6 10 L9 13 L14 7" stroke="#f48120" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="cf-brand-text">
                <span className="cf-brand-name">Cloudflare</span>
                <span className="cf-brand-sub">Turnstile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cf-footer">
          <span className="cf-footer-text">Performance & security by</span>
          <span className="cf-footer-brand">Cloudflare</span>
        </div>
      </div>
    </div>
  )
}
