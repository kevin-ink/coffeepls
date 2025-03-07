import Profile from "@/components/profile";

type Params = Promise<{ username: string }>;

export default async function ProfilePage({ params }: { params: Params }) {
  const { username } = await params;

  return <Profile username={username} />;
}
