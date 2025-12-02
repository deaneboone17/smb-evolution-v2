import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL:", url);
console.log("Key set?:", !!key);

if (!url || !key) {
  console.error("Missing SUPABASE env vars. Did you run the export command?");
  process.exit(1);
}

const supabase = createClient(url, key);

const { data, error } = await supabase
  .from("auth.users") // you can later swap this for another table
  .select("*")
  .limit(1);

console.log("Result:", { data, error });
