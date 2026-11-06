// Every skill generator yields consistent, well-formed problems (id020).
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeRng, makeProblem, signature } from '../app/js/problems.js';
import { SKILLS } from '../app/js/skills.js';

const num = (s) => Number(String(s).replace(/,/g, ''));
// Evaluate "a op b" texts produced by the generators.
function evalText(t) {
  const m = String(t).match(/^([\d.]+) ([+−×÷]) ([\d.]+)$/);
  if (!m) return null;
  const a = num(m[1]); const b = num(m[3]);
  return { '+': a + b, '−': a - b, '×': a * b, '÷': a / b }[m[2]];
}

function checkLayout(p) {
  const occ = new Map();
  for (const c of p.cells) {
    if (c.kind === 'dot' || (c.kind === 'auto' && c.text === '.')) continue;
    for (let dr = 0; dr < (c.rs || 1); dr++) for (let dc = 0; dc < (c.cs || 1); dc++) {
      const k = `${c.r + dr},${c.c + dc}`;
      // Empty borrow-mark placeholders may share nothing either.
      assert.ok(!occ.has(k), `${p.skill} ${p.text}: overlap at ${k} (${occ.get(k)} / ${c.id})`);
      occ.set(k, c.id);
    }
    assert.ok(c.r >= 0 && c.r < p.rows && c.c >= 0 && c.c + (c.cs || 1) <= p.cols, `${p.skill} ${p.text}: ${c.id} out of grid`);
  }
  assert.ok(p.cols <= 13 && p.rows <= 12, `${p.skill} ${p.text}: grid ${p.cols}x${p.rows}`);
  const ids = new Set(p.cells.map((c) => c.id));
  for (const st of p.steps) {
    assert.ok(ids.has(st.cell), `${p.skill}: step cell ${st.cell}`);
    assert.match(st.digit, /^\d$/);
    for (const a of st.after) assert.ok(ids.has(a) || (p.lines || []).some((l) => l.id === a), `${p.skill}: after ${a}`);
  }
  assert.ok(p.steps.length >= 1);
}

function checkAnswer(p) {
  const typed = p.steps.map((s) => s.digit).join('');
  if (p.kind === 'add' || p.kind === 'sub' || p.kind === 'mul') {
    const row = Math.max(...p.steps.map((s) => p.cells.find((c) => c.id === s.cell).r));
    const res = p.cells.filter((c) => c.r === row && c.kind === 'input').sort((a, b) => a.c - b.c).map((c) => c.text).join('');
    assert.equal(res, p.answer.replace('.', ''), `${p.skill} ${p.text}`);
    const v = evalText(p.text);
    assert.ok(Math.abs(v - num(p.answer)) < 1e-9, `${p.skill} ${p.text} = ${p.answer} (expected ${v})`);
  } else if (p.kind === 'div') {
    const q = p.cells.filter((c) => c.r === 0 && c.kind === 'input').sort((a, b) => a.c - b.c).map((c) => c.text).join('');
    assert.equal(Number(q), Math.floor(p.a / p.b), p.text);
    assert.equal(p.rem, p.a % p.b, p.text);
  } else {
    const expect = p.answer.replace(/ 余数 /, '').replace(/又/, '').replace('.', '');
    // Fractions are typed denominator first.
    const fr = p.answer.match(/^(?:(\d+)又)?(\d+)\/(\d+)$/);
    const want = fr ? `${fr[1] || ''}${fr[3]}${fr[2]}` : expect;
    assert.equal(typed, want, `${p.skill} ${p.text} -> ${p.answer}`);
    const v = evalText(p.text);
    if (v !== null && !p.answer.includes('余数')) assert.ok(Math.abs(v - num(p.answer)) < 1e-9, `${p.skill} ${p.text} = ${p.answer}`);
  }
}

test('all skills generate valid problems', () => {
  const rng = makeRng(2026);
  for (const s of SKILLS) {
    for (let i = 0; i < 250; i++) {
      const p = makeProblem(s.id, rng);
      checkLayout(p);
      checkAnswer(p);
    }
  }
});

test('recent signatures are avoided', () => {
  // Even the smallest skill (10 = a + b, 9 combinations) must not repeat
  // before 8 problems; larger skills must go 15 without a repeat.
  const rng = makeRng(99);
  for (const s of SKILLS) {
    const recent = new Set();
    let firstRepeat = Infinity;
    for (let i = 0; i < 15; i++) {
      const p = makeProblem(s.id, rng, recent);
      if (recent.has(signature(p)) && firstRepeat === Infinity) firstRepeat = i;
      recent.add(signature(p));
    }
    const need = { 'g1-compose5': 4, 'g1-add5': 8, 'g1-sub5': 8, 'g1-compose10': 8 }[s.id] || 15;
    assert.ok(firstRepeat >= need, `${s.id} repeated at ${firstRepeat}`);
  }
});

test('visible math wording follows mainland PEP textbook usage', () => {
  const rng = makeRng(20261106);
  const round = makeProblem('g4-round', rng);
  assert.equal(round.title, '求近似数');
  assert.match(round.text, /精确到(十|百|千)位/);
  assert.match(round.steps[0].help.text, /四舍五入/);

  const gcd = makeProblem('g5-gcd', rng);
  assert.equal(gcd.title, '最大公因数');

  const percent = makeProblem('g6-percent', rng);
  assert.equal(percent.title, '百分数');

  const proportion = makeProblem('g6-proportion', rng);
  assert.equal(proportion.title, '解比例');
  assert.match(proportion.steps[0].help.text, /内项之积等于外项之积/);

  const forbidden = /概数|最大公约数|百分率|计算规则|几个和几个/;
  for (const skill of SKILLS) {
    for (let i = 0; i < 20; i++) {
      const problem = makeProblem(skill.id, rng);
      assert.doesNotMatch(JSON.stringify(problem), forbidden, `${skill.id} contains non-PEP wording`);
    }
  }
});
