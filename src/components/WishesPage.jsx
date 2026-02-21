import { birthdayWishes } from '../data/birthdayWishes'
import './WishesPage.css'

const BASE = import.meta.env.BASE_URL

export default function WishesPage() {
  return (
    <div className="wishes-page">
      <div className="wishes-header">
        <div className="wishes-hero-img-wrap">
          <img
            src={`${BASE}images/生日蛋糕.jpg`}
            alt="Rex with birthday cake"
            className="wishes-hero-img"
          />
        </div>
        <h1 className="wishes-title">生日祝福</h1>
        <p className="wishes-subtitle">來自各方的溫暖心意</p>
      </div>

      <div className="wishes-grid">
        {birthdayWishes.map((wish, i) => (
          <div
            key={wish.id}
            className="wish-card"
            style={{ '--delay': `${i * 0.1}s` }}
          >
            <div className="wish-emoji">{wish.emoji}</div>
            <p className="wish-message">{wish.message}</p>
            <span className="wish-from">— {wish.from}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
