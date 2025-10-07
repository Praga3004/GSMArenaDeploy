"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, MessageCircle, Heart, Star, Trophy, Edit } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    avatar?: string
    verified: boolean
    joinDate: string
    bio?: string
    location?: string
    website?: string
    stats: {
      comments: number
      likes: number
      reviews: number
      reputation: number
    }
    badges: string[]
    favoritePhones: Array<{
      id: string
      name: string
      image: string
      rating: number
    }>
    recentActivity: Array<{
      id: string
      type: "comment" | "review" | "like"
      content: string
      timestamp: string
      target?: string
    }>
  }
  isOwnProfile?: boolean
}

const mockUser = {
  id: "user-123",
  name: "Alex Chen",
  username: "techreviewer_alex",
  avatar: "/user-avatar-alex.jpg",
  verified: true,
  joinDate: "2020-03-15",
  bio: "Mobile technology enthusiast and reviewer. Always on the lookout for the latest innovations in smartphone tech.",
  location: "San Francisco, CA",
  website: "techreviews.blog",
  stats: {
    comments: 1247,
    likes: 3892,
    reviews: 45,
    reputation: 8750,
  },
  badges: ["Top Reviewer", "Community Helper", "Early Adopter", "Photography Expert"],
  favoritePhones: [
    {
      id: "samsung-galaxy-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      image: "/samsung-galaxy-s24-ultra.png",
      rating: 4.8,
    },
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      image: "/iphone-15-pro-max.png",
      rating: 4.9,
    },
    {
      id: "google-pixel-8-pro",
      name: "Google Pixel 8 Pro",
      image: "/google-pixel-8-pro.png",
      rating: 4.7,
    },
  ],
  recentActivity: [
    {
      id: "activity-1",
      type: "review" as const,
      content: "Posted a detailed review of the Samsung Galaxy S24 Ultra",
      timestamp: "2 hours ago",
      target: "Samsung Galaxy S24 Ultra",
    },
    {
      id: "activity-2",
      type: "comment" as const,
      content: "Commented on iPhone 15 Pro Max camera comparison",
      timestamp: "5 hours ago",
      target: "iPhone 15 Pro Max vs Galaxy S24 Ultra",
    },
    {
      id: "activity-3",
      type: "like" as const,
      content: "Liked a review about Google Pixel 8 Pro photography",
      timestamp: "1 day ago",
      target: "Google Pixel 8 Pro Review",
    },
  ],
}

export function UserProfile({ user = mockUser, isOwnProfile = false }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review":
        return <Star className="h-4 w-4" />
      case "comment":
        return <MessageCircle className="h-4 w-4" />
      case "like":
        return <Heart className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.verified && (
                  <Badge variant="secondary">
                    <Trophy className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground mb-1">@{user.username}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joinDate}
                </div>
                {user.location && (
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    {user.location}
                  </div>
                )}
              </div>

              {user.bio && <p className="text-foreground mb-4">{user.bio}</p>}

              {user.website && (
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  {user.website}
                </a>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.comments.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.likes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.reviews}</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.reputation.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Reputation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.content}</p>
                        {activity.target && <p className="text-xs text-muted-foreground">{activity.target}</p>}
                        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Favorite Phones */}
            <Card>
              <CardHeader>
                <CardTitle>Favorite Phones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.favoritePhones.slice(0, 3).map((phone) => (
                    <div key={phone.id} className="flex gap-3">
                      <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={phone.image || "/placeholder.svg"}
                          alt={phone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{phone.name}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">{phone.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Phones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.favoritePhones.map((phone) => (
                  <div key={phone.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
                      <img
                        src={phone.image || "/placeholder.svg"}
                        alt={phone.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-2">{phone.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{phone.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{activity.content}</p>
                      {activity.target && <p className="text-xs text-muted-foreground">{activity.target}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-4 text-center">
                    <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <h3 className="font-medium text-sm">{badge}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
