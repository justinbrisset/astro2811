import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: string
  title: string
  status: string
  created_at: string
}

interface RecentPostsProps {
  posts: Post[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
        No posts yet
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant={post.status === "published" ? "default" : "secondary"}>
              {post.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
} 