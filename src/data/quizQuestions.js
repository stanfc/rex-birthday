/**
 * 粉絲問答題目
 * type: 'choice' (選擇題) 或 'text' (填空題)
 * image: 可選，題目附圖
 */

const BASE = import.meta.env.BASE_URL

export const quizQuestions = [
  {
    type: 'choice',
    question: '雷克斯的生日是哪一天？',
    options: ['1月14日', '2月21日', '3月5日', '12月25日'],
    answer: 1, // 2月21日
    hint: '提示：還在冬天的尾巴～水瓶座的某天',
  },
  {
    type: 'text',
    question: '雷克斯的本名是什麼？（三個字）',
    answer: '王榆睿',
    hint: '提示：不是雷克斯...',
    image: `${BASE}images/無奈可愛照.jpg`,
  },
  {
    type: 'choice',
    question: '這張照片裡的雷克斯在做什麼？',
    image: `${BASE}images/睡覺可愛照.jpg`,
    options: ['在練舞', '在睡覺', '在演戲', '在偷看手機'],
    answer: 1, // 在睡覺
    hint: '提示：看看那個姿勢...很舒服的樣子',
  },
  {
    type: 'choice',
    question: '雷克斯國中時擔任什麼幹部？',
    options: ['班長', '風紀股長', '公關', '學藝股長'],
    answer: 2, // 公關
    hint: '提示：負責對外交際的那個職位～',
    image: `${BASE}images/國中可愛幹部介紹.jpg`,
  },
  {
    type: 'choice',
    question: '看這張照片，雷克斯旁邊的圖片是哪位中時粉絲畫的？',
    image: `${BASE}images/萬聖節.jpg`,
    options: ['修咪', '奕霆', '來一陳', '王與瑞'],
    answer: 0, // SF 49ers
    hint: '提示：是最愛他的那位喔',
  },
  {
    type: 'choice',
    question: '身為 雷克斯的粉絲，最重要的事是？',
    options: ['每天說 雷克斯最帥', '無條件支持雷克斯', '幫雷克斯慶生', '以上皆是'],
    answer: 3, // 以上皆是
    hint: '提示：真愛粉什麼都要做！',
  },
]
