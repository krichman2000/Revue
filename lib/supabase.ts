import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SurveyResponse = {
  id?: number;
  created_at?: string;
  ai_learning: string;
  tools_used: string;
  movie_idea: string;
  favorite_food?: string;
  favorite_city?: string;
};
