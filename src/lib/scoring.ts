export type AnswerVal = string | string[] | number;
export type Answers = Record<string, AnswerVal>;

export interface ScoringResult {
  total: number;
  dims: Record<string, number>;
  segment: string;
  topGap: string;
}

export function computeScore(answers: Answers, questionBank: any[]): ScoringResult {
  let total = 0;
  const dims: Record<string, number> = { beginner: 0, intermediate: 0, expert: 0 };
  
  for (const q of questionBank) {
    const val = answers[q.key];
    if (val == null) continue;
    
    if (q.type === 'single' || q.type === 'scale') {
      const opt = q.options?.find((o: any) => String(o.value) === String(val));
      if (opt) {
        total += opt.score ?? 0;
        for (const [k, v] of Object.entries(opt.weights ?? {})) {
          dims[k] = (dims[k] ?? 0) + (v as number);
        }
      }
    } else if (q.type === 'multi' && Array.isArray(val)) {
      for (const v of val) {
        const opt = q.options?.find((o: any) => String(o.value) === String(v));
        if (opt) {
          total += opt.score ?? 0;
          for (const [k, w] of Object.entries(opt.weights ?? {})) {
            dims[k] = (dims[k] ?? 0) + (w as number);
          }
        }
      }
    }
  }
  
  const segment = (Object.entries(dims).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'beginner');
  const topGap = (Object.entries(dims).sort((a, b) => a[1] - b[1])[0]?.[0] ?? 'beginner');
  
  return { total, dims, segment, topGap };
}

export function pickResult(results: any[], total: number, segment: string) {
  const byScore = results.find(r => total >= r.score_min && total <= r.score_max);
  return byScore ?? results.find(r => r.slug.includes(segment)) ?? results[0];
}
