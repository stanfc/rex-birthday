import SnakeGame from './SnakeGame'
import './GamePage.css'

export default function GamePage() {
  return (
    <div className="game-page">
      <div className="game-header">
        <h1 className="game-title">🎮 貪吃蛇</h1>
        <p className="game-subtitle">雷克斯 Snake Challenge</p>
        <p className="game-instructions">
          方向鍵 / WASD 控制方向，手機可滑動或用螢幕按鈕
        </p>
      </div>
      <SnakeGame />
    </div>
  )
}
