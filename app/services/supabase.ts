import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fhgjrxsqrmojcnffporw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZ2pyeHNxcm1vamNuZmZwb3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjM5NDksImV4cCI6MjA4OTgzOTk0OX0.1Tlfz0satLDz6gk50WWH6N-sX4gJe695xm2UNG8ZtkA";

export const supabase = createClient(supabaseUrl, supabaseKey);