// src/utils/leaderboard.ts
import { supabase } from '../lib/supabaseClient';

export async function saveScore(name: string, score: number) {
  const { error } = await supabase.from('leaderboard').insert([{ name, score }]);
  return error;
}

export async function fetchTopScores(limit = 10) {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);

  return { data, error };
}
