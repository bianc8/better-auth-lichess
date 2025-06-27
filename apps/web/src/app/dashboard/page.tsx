"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const privateData = useQuery(trpc.privateData.queryOptions());

  useEffect(() => {
    if (!session && !isPending) {
      router.push("/login");
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <p>privateData: {privateData.data?.message}</p>
      <Button
        onClick={() =>
          authClient.oauth2.link(
            {
              providerId: "lichess",
              callbackURL: "http://localhost:3001/dashboard",
            },
            {
              onSuccess: () => {
                router.push("/dashboard");
                toast.success("Sign in successful");
              },
              onError: (error) => {
                console.error("frontend error", error);
                toast.error(error.error.message);
              },
            }
          )
        }
      >
        Connect Lichess
      </Button>
    </div>
  );
}
