import { UserProfile } from "@/components/user-profile"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProfilePage({ params }: { params: { username: string } }) {
  // In a real app, you would fetch user data based on the username
  const isOwnProfile = params.username === "techreviewer_alex" // Mock check

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <UserProfile isOwnProfile={isOwnProfile} />
      </main>
      <Footer />
    </div>
  )
}
