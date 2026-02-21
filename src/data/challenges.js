/**
 * CAPTCHA 驗證題目設定
 *
 * 每個 challenge 包含：
 * - question: 顯示在上方的問題
 * - images: 9 張圖片（3x3 九宮格）
 * - correctIndices: 正確答案的 index（0-8）
 * - wrongMessage: 答錯時的搞笑訊息
 * - emptyMessage: 什麼都沒選就按驗證的訊息
 */

const BASE = import.meta.env.BASE_URL

const img = (path) => ({
  src: `${BASE}images/${path}`,
  label: '',
})

export const challenges = [
  {
    question: '選出所有雷克斯的帥照',
    images: [
      img('表演後台帥哥2.jpg'),   // 0 — 帥
      img('呆頭二.jpg'),           // 1 — 搞笑
      img('畢業證件照.jpg'),       // 2 — 帥
      img('高中照片.jpg'),         // 3 — 普通
      img('出道形象照.jpg'),       // 4 — 帥
      img('睡覺可愛照.jpg'),       // 5 — 可愛
      img('表演後台帥哥.jpg'),     // 6 — 帥
      img('偷感很重生日蛋糕.jpg'), // 7 — 偷感
      img('認真的雷克思.jpg'),     // 8 — 帥
    ],
    correctIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    wrongMessage: '雷克斯每張照片都是帥照！全選啊 😤',
    emptyMessage: '你要選圖片啊！雷克斯這麼帥你看不到嗎？',
  },
  {
    question: '選出所有不是雷克斯的圖片',
    images: [
      img('無奈可愛照.jpg'),       // 0 — 雷克斯
      img('not_rex1.webp'),        // 1 — 不是雷克斯 ✓
      img('萬聖節.jpg'),           // 2 — 雷克斯
      img('not_rex3.jpg'),         // 3 — 不是雷克斯 ✓
      img('呆頭.jpg'),             // 4 — 雷克斯
      img('not_rex2.jpg'),         // 5 — 不是雷克斯 ✓
      img('出道形象照.jpg'),       // 6 — 雷克斯
      img('not_rex4.jpeg'),        // 7 — 不是雷克斯 ✓
      img('認真的雷克思.jpg'),     // 8 — 雷克斯
    ],
    correctIndices: [1, 3, 5, 7],
    wrongMessage: '看清楚！有些人長得像但不是雷克斯啊 👀',
    emptyMessage: '仔細看看，裡面混了幾個不是雷克斯的人喔！',
  },
  {
    question: '選出所有讓你心動的圖片',
    images: [
      img('表演後台帥哥.jpg'),
      img('畢業證件照.jpg'),
      img('出道形象照.jpg'),
      img('表演後台帥哥2.jpg'),
      img('呆頭.jpg'),
      img('認真的雷克思.jpg'),
      img('睡覺可愛照.jpg'),
      img('無奈可愛照.jpg'),
      img('生日蛋糕.jpg'),
    ],
    correctIndices: [0, 1, 2, 3, 4, 5, 6, 7, 8], // 全選才對
    wrongMessage: '雷克斯的每張照片都讓人心動好嗎！全部選起來 💕',
    emptyMessage: '你一張都不心動？？？你確定你有在看嗎 😱',
  },
]
