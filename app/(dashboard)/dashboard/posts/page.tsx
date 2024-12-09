import { createClient } from "@/lib/supabase/server"

export default async function PostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Posts</h1>
      {/* Add your posts list here */}
    </div>
  )
} 