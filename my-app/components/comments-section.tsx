"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreHorizontal,
  Flag,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react"

interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
    verified: boolean
    joinDate: string
  }
  content: string
  timestamp: string
  likes: number
  dislikes: number
  replies: Comment[]
  isLiked?: boolean
  isDisliked?: boolean
}

interface CommentsSectionProps {
  comments: Comment[]
  onAddComment?: (content: string, parentId?: string) => void
  onLikeComment?: (commentId: string) => void
  onDislikeComment?: (commentId: string) => void
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "TechEnthusiast92",
      avatar: "/user-avatar-1.jpg",
      verified: true,
      joinDate: "2020-03-15",
    },
    content:
      "Just got the Galaxy S24 Ultra and the camera quality is absolutely incredible! The 200MP sensor really makes a difference in daylight shots. The zoom capabilities are also impressive.",
    timestamp: "2 hours ago",
    likes: 24,
    dislikes: 2,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "PhotoPro",
          verified: false,
          joinDate: "2021-07-22",
        },
        content: "Totally agree! How's the low-light performance compared to the iPhone 15 Pro Max?",
        timestamp: "1 hour ago",
        likes: 8,
        dislikes: 0,
        replies: [
          {
            id: "1-1-1",
            author: {
              name: "TechEnthusiast92",
              avatar: "/user-avatar-1.jpg",
              verified: true,
              joinDate: "2020-03-15",
            },
            content:
              "The low-light is really good, but I'd say iPhone still has a slight edge in computational photography. Samsung's night mode has improved a lot though!",
            timestamp: "45 minutes ago",
            likes: 12,
            dislikes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "MobileReviewer",
      verified: true,
      joinDate: "2019-11-08",
    },
    content:
      "Been using this for a week now. Battery life is solid - easily gets me through a full day of heavy usage. The 45W charging is fast enough for my needs.",
    timestamp: "4 hours ago",
    likes: 18,
    dislikes: 3,
    replies: [],
  },
  {
    id: "3",
    author: {
      name: "AndroidFan",
      verified: false,
      joinDate: "2022-01-12",
    },
    content:
      "The S Pen integration is what sold me on this phone. Perfect for taking notes during meetings and the handwriting recognition is spot on.",
    timestamp: "6 hours ago",
    likes: 15,
    dislikes: 1,
    replies: [],
  },
]

export function CommentsSection({
  comments = mockComments,
  onAddComment,
  onLikeComment,
  onDislikeComment,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())

  const toggleExpanded = (commentId: string) => {
    const newExpanded = new Set(expandedComments)
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId)
    } else {
      newExpanded.add(commentId)
    }
    setExpandedComments(newExpanded)
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment?.(newComment)
      setNewComment("")
    }
  }

  const handleSubmitReply = (parentId: string) => {
    if (replyContent.trim()) {
      onAddComment?.(replyContent, parentId)
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const isExpanded = expandedComments.has(comment.id)
    const hasReplies = comment.replies && comment.replies.length > 0
    const maxDepth = 3

    return (
      <div className={`${depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}`}>
        <div className="flex gap-3 mb-4">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm">{comment.author.name}</span>
              {comment.author.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-foreground mb-3 leading-relaxed">{comment.content}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 ${comment.isLiked ? "text-green-600" : ""}`}
                  onClick={() => onLikeComment?.(comment.id)}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {comment.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 ${comment.isDisliked ? "text-red-600" : ""}`}
                  onClick={() => onDislikeComment?.(comment.id)}
                >
                  <ThumbsDown className="h-3 w-3 mr-1" />
                  {comment.dislikes > 0 ? comment.dislikes : ""}
                </Button>
              </div>

              {depth < maxDepth && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}

              {hasReplies && (
                <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => toggleExpanded(comment.id)}>
                  {isExpanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                  {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-3 space-y-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px] text-sm"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                    Post Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {hasReplies && isExpanded && (
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment */}
        <div className="space-y-3">
          <Textarea
            placeholder="Share your thoughts about this phone..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
