import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const BASE = import.meta.env.BASE_URL

const galleryPhotos = [
  { src: `${BASE}images/畢業證件照.jpg`, caption: '畢業證件照' },
  { src: `${BASE}images/表演後台帥哥2.jpg`, caption: '表演後台' },
  { src: `${BASE}images/認真的雷克思.jpg`, caption: '認真工作中' },
  { src: `${BASE}images/出道形象照.jpg`, caption: '出道形象照' },
  { src: `${BASE}images/萬聖節.jpg`, caption: '萬聖節裝扮' },
  { src: `${BASE}images/睡覺可愛照.jpg`, caption: '睡著的雷克斯' },
  { src: `${BASE}images/國中可愛幹部介紹.jpg`, caption: '國中時期' },
  { src: `${BASE}images/無奈可愛照.jpg`, caption: '日常可愛' },
  { src: `${BASE}images/表演後台帥哥.jpg`, caption: '後台準備中' },
  { src: `${BASE}images/高中照片.jpg`, caption: '高中時期' },
  { src: `${BASE}images/呆頭.jpg`, caption: '呆萌雷克斯' },
  { src: `${BASE}images/生日蛋糕.jpg`, caption: '生日快樂' },
]

export default function HomePage({ quizScore }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
  }, [])

  return (
    <div className={`home-page ${show ? 'visible' : ''}`}>
      {/* 紙花動畫 */}
      <div className="confetti-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              '--x': `${Math.random() * 100}vw`,
              '--delay': `${Math.random() * 3}s`,
              '--duration': `${2 + Math.random() * 3}s`,
              '--color': ['#a855f7', '#f59e0b', '#ec4899', '#6366f1', '#8b5cf6', '#f472b6'][i % 6],
              '--rotation': `${Math.random() * 360}deg`,
            }}
          />
        ))}
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-image-bg">
          <img src={`${BASE}images/畢業證件照.jpg`} alt="Rex" />
        </div>
        <div className="hero-content">
          <span className="hero-crown">👑</span>
          <h1 className="hero-name">REX</h1>
          <p className="hero-tagline">Happy Birthday!</p>
          <p className="hero-date">2025.02.21</p>
          {quizScore !== null && quizScore !== undefined && (
            <div className="hero-badge">
              粉絲認證分數：{quizScore} 分
            </div>
          )}
        </div>
      </section>

      {/* 個人檔案 */}
      <section className="profile-section">
        <h2 className="section-title">個人檔案</h2>
        <div className="profile-card glass">
          <div className="profile-avatar">
            <img
              src={`${BASE}images/出道形象照.jpg`}
              alt="Rex"
              className="profile-avatar-img"
            />
          </div>
          <div className="profile-info">
            <div className="profile-row">
              <span className="profile-label">藝名</span>
              <span className="profile-value">雷克斯 / Rex</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">本名</span>
              <span className="profile-value">王榆睿</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">生日</span>
              <span className="profile-value">2 月 21 日</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">代表色</span>
              <span className="profile-value">
                <span className="profile-color" style={{ background: '#a855f7' }} />
                皇家紫
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">特長</span>
              <span className="profile-value">唱歌、跳舞、耍帥、讓人心動</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">座右銘</span>
              <span className="profile-value">「每天都是成為更帥的一天」</span>
            </div>
          </div>
        </div>
      </section>

      {/* 照片牆 */}
      <section className="gallery-section">
        <h2 className="section-title">照片牆</h2>
        <div className="gallery-grid">
          {galleryPhotos.map((photo, i) => (
            <div key={i} className="gallery-item">
              <img src={photo.src} alt={photo.caption} className="gallery-img" />
              <div className="gallery-caption">{photo.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 快速連結 */}
      <section className="quicklinks-section">
        <h2 className="section-title">更多內容</h2>
        <div className="quicklinks-grid">
          <Link to="/game" className="quicklink-card glass">
            <span className="quicklink-emoji">🎮</span>
            <h3 className="quicklink-title">小遊戲</h3>
            <p className="quicklink-desc">來場貪吃蛇挑戰吧！</p>
          </Link>
          <Link to="/wishes" className="quicklink-card glass">
            <span className="quicklink-emoji">💌</span>
            <h3 className="quicklink-title">生日祝福</h3>
            <p className="quicklink-desc">來自各方的溫暖祝福</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
