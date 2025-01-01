import { createClient } from '@supabase/supabase-js';
import { format, parseISO } from 'date-fns';

const supabaseUrl =  'https://ocnuehyxzpozrefzwmai.supabase.co'; //import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbnVlaHl4enBvenJlZnp3bWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTk1ODksImV4cCI6MjA1MTA3NTU4OX0.bXDofJudLHuHCEvZH8CSPEtEbZkMB3sxQHOLmekW-7w';//import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. Please check your .env file and ensure both VITE_SUPABASE_URL and VITE_SUPABASE_API_KEY are set.'
  );
}

try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid Supabase URL format. Please ensure VITE_SUPABASE_URL is a valid URL.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type DayStatusRecord = {
  id: string;
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export const formatDateForDB = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX");
};

export const parseDateFromDB = (dateStr: string): Date => {
  return parseISO(dateStr);
};