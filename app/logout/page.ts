import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server"; // atau client sesuai setup kamu

export default async function LogoutPage() {
  const supabase = await  createClient();

  // sign out
  await supabase.auth.signOut();

  // setelah logout langsung redirect
  redirect("/"); 
}
