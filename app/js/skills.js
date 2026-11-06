// 人教版小学数学计算专项（依据用户提供的 2022 年版课标修订教材）。
// 这里只收录适合数字输入练习的内容；图形、测量、统计和综合实践不在本游戏中出题。

export const LANES = ['加法与减法', '乘法与除法', '小数与分数', '综合运算'];
export const MASTERY = { window: 6, need: 5 };

export const SKILLS = [
  // 一年级上、下册
  { id: 'g1-compose5', name: '5以内数的分与合', grade: 1, lane: 0, req: [], gen: ['compose', { total: 5 }] },
  { id: 'g1-add5', name: '5以内的加法', grade: 1, lane: 0, req: ['g1-compose5'], gen: ['hadd', { a: [1, 4], b: [1, 4], carry: 'none', sumMax: 5 }] },
  { id: 'g1-sub5', name: '5以内的减法', grade: 1, lane: 0, req: ['g1-add5'], gen: ['hsub', { a: [2, 5], b: [1, 4], borrow: 'none' }] },
  { id: 'g1-compose10', name: '10以内数的分与合', grade: 1, lane: 0, req: ['g1-compose5'], gen: ['compose', { total: 10 }] },
  { id: 'g1-add10', name: '10以内的加法', grade: 1, lane: 0, req: ['g1-add5', 'g1-compose10'], gen: ['hadd', { a: [1, 9], b: [1, 9], carry: 'none', sumMax: 10 }] },
  { id: 'g1-sub10', name: '10以内的减法', grade: 1, lane: 0, req: ['g1-sub5', 'g1-add10'], gen: ['hsub', { a: [2, 10], b: [1, 9], borrow: 'none' }] },
  { id: 'g1-add3', name: '连加、连减与加减混合', grade: 1, lane: 3, req: ['g1-add10', 'g1-sub10'], gen: ['add3', {}] },
  { id: 'g1-add20', name: '20以内的进位加法', grade: 1, lane: 0, req: ['g1-compose10', 'g1-add10'], gen: ['hadd', { a: [2, 9], b: [2, 9], carry: 'yes' }] },
  { id: 'g1-sub20', name: '20以内的退位减法', grade: 1, lane: 0, req: ['g1-add20', 'g1-sub10'], gen: ['hsub', { a: [11, 18], b: [2, 9], borrow: 'yes' }] },
  { id: 'g1-add100', name: '100以内两位数加一位数', grade: 1, lane: 0, req: ['g1-add20'], gen: ['hadd', { a: [11, 89], b: [1, 9], carry: 'none', tensToo: true }] },
  { id: 'g1-sub100', name: '100以内两位数减一位数', grade: 1, lane: 0, req: ['g1-sub20', 'g1-add100'], gen: ['hsub', { a: [11, 99], b: [1, 9], borrow: 'none', tensToo: true }] },

  // 二年级上、下册：本年级没有分数计算。
  { id: 'g2-mul16', name: '1—6的表内乘法', grade: 2, lane: 1, req: ['g1-add20'], gen: ['kuku', { dans: [1, 2, 3, 4, 5, 6] }] },
  { id: 'g2-div16', name: '1—6的表内除法', grade: 2, lane: 1, req: ['g2-mul16'], gen: ['div', { exact: true, divisors: [2, 3, 4, 5, 6] }] },
  { id: 'g2-mul79', name: '7—9的表内乘法', grade: 2, lane: 1, req: ['g2-mul16'], gen: ['kuku', { dans: [7, 8, 9] }] },
  { id: 'g2-mulmix', name: '表内乘法综合', grade: 2, lane: 1, req: ['g2-mul79'], gen: ['kuku', { dans: [1, 2, 3, 4, 5, 6, 7, 8, 9] }] },
  { id: 'g2-divmix', name: '表内除法综合', grade: 2, lane: 1, req: ['g2-div16', 'g2-mulmix'], gen: ['div', { exact: true }] },
  { id: 'g2-divrem', name: '有余数的除法', grade: 2, lane: 1, req: ['g2-divmix'], gen: ['divRem', {}] },
  { id: 'g2-vadd3', name: '万以内的加法', grade: 2, lane: 0, req: ['g1-add100'], gen: ['vadd', { da: 3, db: [2, 3], carry: 'some', maxDigits: 4 }] },
  { id: 'g2-vsub3', name: '万以内的减法', grade: 2, lane: 0, req: ['g1-sub100', 'g2-vadd3'], gen: ['vsub', { da: 3, db: [2, 3], borrow: 'some' }] },
  { id: 'g2-vadd4', name: '四位数加法', grade: 2, lane: 0, req: ['g2-vadd3'], gen: ['vadd', { da: 4, db: [3, 4], carry: 'some', maxDigits: 4 }] },
  { id: 'g2-vsub4', name: '四位数减法', grade: 2, lane: 0, req: ['g2-vsub3'], gen: ['vsub', { da: 4, db: [3, 4], borrow: 'zero' }] },

  // 三年级上、下册
  { id: 'g3-order', name: '混合运算', grade: 3, lane: 3, req: ['g2-divmix', 'g1-add3'], gen: ['order', {}] },
  { id: 'g3-multens', name: '整十、整百数乘一位数', grade: 3, lane: 1, req: ['g2-mulmix'], gen: ['mulTens', {}] },
  { id: 'g3-vmul2x1', name: '两位数乘一位数', grade: 3, lane: 1, req: ['g3-multens'], gen: ['vmul', { da: 2, db: 1 }] },
  { id: 'g3-vmul3x1', name: '三位数乘一位数', grade: 3, lane: 1, req: ['g3-vmul2x1'], gen: ['vmul', { da: 3, db: 1 }] },
  { id: 'g3-fracof', name: '分数的初步认识', grade: 3, lane: 2, req: [], gen: ['fracOf', { dens: [2, 3, 4, 5, 6, 8] }] },
  { id: 'g3-fracsame', name: '同分母分数加减法', grade: 3, lane: 2, req: ['g3-fracof'], gen: ['frac', { op: 'addsub', same: true, maxOne: true }] },
  { id: 'g3-divtens', name: '整十数除以一位数', grade: 3, lane: 1, req: ['g2-divmix'], gen: ['divTens', {}] },
  { id: 'g3-vdiv2x1', name: '两位数除以一位数', grade: 3, lane: 1, req: ['g2-divrem', 'g3-divtens'], gen: ['vdiv', { dd: 2, ds: 1 }] },
  { id: 'g3-vdiv3x1', name: '三位数除以一位数', grade: 3, lane: 1, req: ['g3-vdiv2x1'], gen: ['vdiv', { dd: 3, ds: 1 }] },
  { id: 'g3-vmul2x2', name: '两位数乘两位数', grade: 3, lane: 1, req: ['g3-vmul2x1'], gen: ['vmul', { da: 2, db: 2 }] },
  { id: 'g3-decadd', name: '一位小数的加法', grade: 3, lane: 2, req: ['g2-vadd3'], gen: ['vdec', { op: 'add', places: 1 }] },
  { id: 'g3-decsub', name: '一位小数的减法', grade: 3, lane: 2, req: ['g3-decadd', 'g2-vsub3'], gen: ['vdec', { op: 'sub', places: 1 }] },

  // 四年级上、下册
  { id: 'g4-vmul3x2', name: '三位数乘两位数', grade: 4, lane: 1, req: ['g3-vmul2x2', 'g3-vmul3x1'], gen: ['vmul', { da: 3, db: 2 }] },
  { id: 'g4-vdiv2x2', name: '两位数除以两位数', grade: 4, lane: 1, req: ['g3-vdiv2x1'], gen: ['vdiv', { dd: 2, ds: 2 }] },
  { id: 'g4-vdiv3x2', name: '三位数除以两位数', grade: 4, lane: 1, req: ['g4-vdiv2x2', 'g3-vdiv3x1'], gen: ['vdiv', { dd: 3, ds: 2 }] },
  { id: 'g4-round', name: '用四舍五入求近似数', grade: 4, lane: 3, req: ['g2-vadd4'], gen: ['round', {}] },
  { id: 'g4-order', name: '四则混合运算', grade: 4, lane: 3, req: ['g3-order'], gen: ['order', {}] },
  { id: 'g4-decadd2', name: '小数加法', grade: 4, lane: 2, req: ['g3-decadd'], gen: ['vdec', { op: 'add', places: 2 }] },
  { id: 'g4-decsub2', name: '小数减法', grade: 4, lane: 2, req: ['g3-decsub', 'g4-decadd2'], gen: ['vdec', { op: 'sub', places: 2 }] },

  // 五年级上、下册
  { id: 'g5-decmulint', name: '小数乘整数', grade: 5, lane: 2, req: ['g4-decadd2', 'g3-vmul2x1'], gen: ['vmul', { da: 2, db: 1, pa: 1 }] },
  { id: 'g5-decmul', name: '小数乘小数', grade: 5, lane: 2, req: ['g5-decmulint'], gen: ['vmul', { da: 2, db: 2, pa: 1, pb: 1 }] },
  { id: 'g5-decdivint', name: '小数除以整数', grade: 5, lane: 2, req: ['g3-vdiv2x1', 'g5-decmulint'], gen: ['decDivInt', {}] },
  { id: 'g5-decdiv', name: '小数除以小数', grade: 5, lane: 2, req: ['g5-decdivint', 'g5-decmul'], gen: ['decDivDec', {}] },
  { id: 'g5-letter', name: '解简易方程', grade: 5, lane: 3, req: ['g4-order'], gen: ['letter', {}] },
  { id: 'g5-gcd', name: '最大公因数', grade: 5, lane: 3, req: ['g3-vdiv3x1'], gen: ['gcdlcm', { kind: 'gcd' }] },
  { id: 'g5-lcm', name: '最小公倍数', grade: 5, lane: 3, req: ['g5-gcd'], gen: ['gcdlcm', { kind: 'lcm' }] },
  { id: 'g5-fracreduce', name: '约分', grade: 5, lane: 2, req: ['g5-gcd', 'g3-fracsame'], gen: ['frac', { op: 'reduce' }] },
  { id: 'g5-fracsame', name: '同分母分数加减法', grade: 5, lane: 2, req: ['g5-fracreduce'], gen: ['frac', { op: 'addsub', same: true, mixed: true }] },
  { id: 'g5-fracdiff', name: '异分母分数加减法', grade: 5, lane: 2, req: ['g5-fracreduce', 'g5-lcm'], gen: ['frac', { op: 'addsub', same: false }] },

  // 六年级上、下册
  { id: 'g6-fracmulint', name: '分数乘整数', grade: 6, lane: 2, req: ['g5-fracreduce'], gen: ['frac', { op: 'muldivInt' }] },
  { id: 'g6-fracmul', name: '分数乘分数', grade: 6, lane: 2, req: ['g6-fracmulint'], gen: ['frac', { op: 'mul' }] },
  { id: 'g6-fracdiv', name: '分数除法', grade: 6, lane: 2, req: ['g6-fracmul'], gen: ['frac', { op: 'div' }] },
  { id: 'g6-fracdec', name: '小数与分数混合计算', grade: 6, lane: 2, req: ['g6-fracdiv', 'g5-decdiv'], gen: ['frac', { op: 'decimal' }] },
  { id: 'g6-percent', name: '百分数计算', grade: 6, lane: 3, req: ['g5-decdiv'], gen: ['percent', {}] },
  { id: 'g6-percentapp', name: '百分数应用', grade: 6, lane: 3, req: ['g6-percent'], gen: ['percentApp', {}] },
  { id: 'g6-ratio', name: '比的化简与等值比', grade: 6, lane: 3, req: ['g5-gcd'], gen: ['ratio', {}] },
  { id: 'g6-proportion', name: '解比例', grade: 6, lane: 3, req: ['g6-ratio', 'g5-letter'], gen: ['proportion', {}] },
];

export const SKILL = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

export const DEPTH = (() => {
  const memo = {};
  const d = (id) => memo[id] ?? (memo[id] = SKILL[id].req.length ? 1 + Math.max(...SKILL[id].req.map(d)) : 0);
  for (const s of SKILLS) d(s.id);
  return memo;
})();

export const skillsOfGrade = (g) => SKILLS.filter((s) => s.grade === g);
