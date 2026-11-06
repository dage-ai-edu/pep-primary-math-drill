// Skill tree data integrity (id019).
import test from 'node:test';
import assert from 'node:assert/strict';
import { SKILLS, SKILL, DEPTH, LANES } from '../app/js/skills.js';

test('ids are unique and prerequisites exist', () => {
  assert.equal(new Set(SKILLS.map((s) => s.id)).size, SKILLS.length);
  for (const s of SKILLS) for (const r of s.req) assert.ok(SKILL[r], `${s.id} needs ${r}`);
});

test('prerequisites never come from a later grade and the graph is acyclic', () => {
  for (const s of SKILLS) for (const r of s.req) assert.ok(SKILL[r].grade <= s.grade, `${s.id} <- ${r}`);
  for (const s of SKILLS) assert.ok(Number.isFinite(DEPTH[s.id]));
});

test('every grade and lane is populated', () => {
  for (let g = 1; g <= 6; g++) assert.ok(SKILLS.some((s) => s.grade === g), `grade ${g}`);
  LANES.forEach((_, i) => assert.ok(SKILLS.some((s) => s.lane === i), `lane ${i}`));
  assert.ok(SKILLS.length >= 50);
});

test('PEP grade placement keeps fractions out of grade 2', () => {
  const grade2 = SKILLS.filter((s) => s.grade === 2);
  assert.ok(grade2.every((s) => !/分数/.test(s.name) && !['frac', 'fracOf'].includes(s.gen[0])));
  assert.ok(SKILLS.some((s) => s.grade === 3 && s.id === 'g3-fracof'));
  assert.ok(SKILLS.some((s) => s.grade === 5 && s.id === 'g5-letter'));
  assert.ok(SKILLS.some((s) => s.grade === 6 && s.id === 'g6-percentapp'));
});
