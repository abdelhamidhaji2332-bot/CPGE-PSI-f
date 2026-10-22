// Subsequence match with bonuses for consecutive hits and word starts. Returns 0 for no match.
export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase().replace(/\s+/g, ""), t = text.toLowerCase();
  if (!q) return 1;
  let qi = 0, score = 0, run = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) { run++; score += 1 + run * 2 + (i === 0 || " -_/".includes(t[i - 1]) ? 4 : 0); qi++; }
    else run = 0;
  }
  return qi === q.length ? score : 0;
}
