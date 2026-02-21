import { useState, useEffect, useRef, useCallback } from 'react'
import { useSwipe } from '../hooks/useSwipe'
import './SnakeGame.css'

const BASE = import.meta.env.BASE_URL

const GRID = 20
const CELL = 20 // px per cell
const CANVAS_SIZE = GRID * CELL

// 用 Rex 的去背圖作為蛇頭和食物
const HEAD_SRC = `${BASE}game_asset/1771671190596.png`       // thumbs up
const FOOD_SRCS = [
  `${BASE}game_asset/1771671190166(1).png`,  // 畢業照
  `${BASE}game_asset/1771671190658.png`,     // 萬聖節
  `${BASE}game_asset/1771671190777.png`,     // 呆頭二
  `${BASE}game_asset/1771671190838.png`,     // 偷感蛋糕
  `${BASE}game_asset/1771671190890.png`,     // 高中
  `${BASE}game_asset/1771671193988.png`,     // 米奇耳朵
  `${BASE}game_asset/1771671196395.png`,     // 認真咖啡廳
  `${BASE}game_asset/1771671198521.png`,     // 背包
  `${BASE}game_asset/1771671201807.png`,     // 睡覺
]

const DIR = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
}

const OPPOSITE = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }

function randomPos(exclude = []) {
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    }
  } while (exclude.some((p) => p.x === pos.x && p.y === pos.y))
  return pos
}

export default function SnakeGame() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const dirRef = useRef('RIGHT')
  const nextDirRef = useRef('RIGHT')
  const gameLoopRef = useRef(null)

  // Preloaded images
  const headImgRef = useRef(null)
  const foodImgsRef = useRef([])
  const currentFoodIdxRef = useRef(0)

  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('rex-snake-high') || '0', 10)
  })
  const [gameState, setGameState] = useState('idle') // idle | playing | over
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Game state refs
  const snakeRef = useRef([{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }])
  const foodRef = useRef(randomPos(snakeRef.current))
  const scoreRef = useRef(0)

  // Preload images
  useEffect(() => {
    let loaded = 0
    const total = 1 + FOOD_SRCS.length

    const onLoad = () => {
      loaded++
      if (loaded >= total) setImagesLoaded(true)
    }

    const head = new Image()
    head.onload = onLoad
    head.onerror = onLoad
    head.src = HEAD_SRC
    headImgRef.current = head

    foodImgsRef.current = FOOD_SRCS.map((src) => {
      const img = new Image()
      img.onload = onLoad
      img.onerror = onLoad
      img.src = src
      return img
    })
  }, [])

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    // Background
    ctx.fillStyle = '#fdf2f8'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Grid lines
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.08)'
    ctx.lineWidth = 0.5
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL, 0)
      ctx.lineTo(i * CELL, CANVAS_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL)
      ctx.lineTo(CANVAS_SIZE, i * CELL)
      ctx.stroke()
    }

    // Snake body — 恐龍 emoji 🦖
    const snake = snakeRef.current
    ctx.font = `${CELL - 2}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    snake.forEach((seg, i) => {
      if (i === 0) return // draw head as image below
      ctx.fillText('🦖', seg.x * CELL + CELL / 2, seg.y * CELL + CELL / 2 + 1)
    })

    // Snake head — Rex image
    const head = snake[0]
    const headImg = headImgRef.current
    if (headImg && headImg.complete && headImg.naturalWidth > 0) {
      const size = CELL + 8 // slightly larger than a cell
      ctx.drawImage(
        headImg,
        head.x * CELL + CELL / 2 - size / 2,
        head.y * CELL + CELL / 2 - size / 2,
        size,
        size,
      )
    } else {
      ctx.fillStyle = '#f9a8d4'
      ctx.beginPath()
      ctx.roundRect(head.x * CELL + 1, head.y * CELL + 1, CELL - 2, CELL - 2, 4)
      ctx.fill()
    }

    // Food — Rex image
    const food = foodRef.current
    const foodImg = foodImgsRef.current[currentFoodIdxRef.current]
    if (foodImg && foodImg.complete && foodImg.naturalWidth > 0) {
      const size = CELL + 6
      ctx.drawImage(
        foodImg,
        food.x * CELL + CELL / 2 - size / 2,
        food.y * CELL + CELL / 2 - size / 2,
        size,
        size,
      )
    } else {
      ctx.fillStyle = '#f59e0b'
      ctx.beginPath()
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const tick = useCallback(() => {
    const dir = nextDirRef.current
    dirRef.current = dir
    const d = DIR[dir]
    const snake = [...snakeRef.current]
    const head = { x: snake[0].x + d.x, y: snake[0].y + d.y }

    // Wall wrap
    if (head.x < 0) head.x = GRID - 1
    if (head.x >= GRID) head.x = 0
    if (head.y < 0) head.y = GRID - 1
    if (head.y >= GRID) head.y = 0

    // Self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameState('over')
      clearInterval(gameLoopRef.current)
      if (scoreRef.current > parseInt(localStorage.getItem('rex-snake-high') || '0', 10)) {
        localStorage.setItem('rex-snake-high', String(scoreRef.current))
        setHighScore(scoreRef.current)
      }
      return
    }

    snake.unshift(head)

    // Eat food
    const food = foodRef.current
    if (head.x === food.x && head.y === food.y) {
      scoreRef.current += 1
      setScore(scoreRef.current)
      foodRef.current = randomPos(snake)
      currentFoodIdxRef.current = Math.floor(Math.random() * FOOD_SRCS.length)
    } else {
      snake.pop()
    }

    snakeRef.current = snake
    draw()
  }, [draw])

  const getSpeed = () => Math.max(80, 150 - scoreRef.current * 3)

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }]
    foodRef.current = randomPos(snakeRef.current)
    dirRef.current = 'RIGHT'
    nextDirRef.current = 'RIGHT'
    scoreRef.current = 0
    currentFoodIdxRef.current = 0
    setScore(0)
    setGameState('playing')
    draw()

    clearInterval(gameLoopRef.current)
    gameLoopRef.current = setInterval(tick, getSpeed())
  }, [draw, tick])

  // Dynamic speed
  useEffect(() => {
    if (gameState !== 'playing') return
    clearInterval(gameLoopRef.current)
    gameLoopRef.current = setInterval(tick, getSpeed())
    return () => clearInterval(gameLoopRef.current)
  }, [score, gameState, tick])

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      const keyMap = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
        W: 'UP', S: 'DOWN', A: 'LEFT', D: 'RIGHT',
      }
      const dir = keyMap[e.key]
      if (!dir) return
      e.preventDefault()
      if (dir !== OPPOSITE[dirRef.current]) {
        nextDirRef.current = dir
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Swipe
  const handleSwipe = useCallback((dir) => {
    if (dir !== OPPOSITE[dirRef.current]) {
      nextDirRef.current = dir
    }
  }, [])
  useSwipe(handleSwipe, wrapRef)

  // Initial draw
  useEffect(() => {
    if (imagesLoaded) draw()
  }, [draw, imagesLoaded])

  // Cleanup
  useEffect(() => {
    return () => clearInterval(gameLoopRef.current)
  }, [])

  const handleDPad = (dir) => {
    if (gameState !== 'playing') return
    if (dir !== OPPOSITE[dirRef.current]) {
      nextDirRef.current = dir
    }
  }

  return (
    <div className="snake-wrap" ref={wrapRef}>
      <div className="snake-score-bar">
        <span>分數：{score}</span>
        <span>最高：{highScore}</span>
      </div>

      <div className="snake-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          className="snake-canvas"
        />

        {gameState === 'idle' && (
          <div className="snake-overlay">
            <img
              src={`${BASE}game_asset/1771671190596.png`}
              alt="Rex"
              className="snake-overlay-img"
            />
            <button className="snake-start-btn" onClick={startGame}>
              開始遊戲
            </button>
          </div>
        )}

        {gameState === 'over' && (
          <div className="snake-overlay">
            <p className="snake-over-text">Game Over</p>
            <p className="snake-over-score">分數：{score}</p>
            <button className="snake-start-btn" onClick={startGame}>
              再玩一次
            </button>
          </div>
        )}
      </div>

      {/* 螢幕方向鈕 */}
      <div className="snake-dpad">
        <button className="dpad-btn dpad-up" onClick={() => handleDPad('UP')}>▲</button>
        <div className="dpad-mid-row">
          <button className="dpad-btn dpad-left" onClick={() => handleDPad('LEFT')}>◀</button>
          <button className="dpad-btn dpad-down" onClick={() => handleDPad('DOWN')}>▼</button>
          <button className="dpad-btn dpad-right" onClick={() => handleDPad('RIGHT')}>▶</button>
        </div>
      </div>
    </div>
  )
}
