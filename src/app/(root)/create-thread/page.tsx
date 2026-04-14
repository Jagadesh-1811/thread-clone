"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/lib/actions/thread.actions";

export default function CreateThreadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!text || !session?.user?.id) return;
    setLoading(true);
    
    try {
      await createThread({
        text,
        author: session.user.id,
        path: "/",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <>
      <h1 className="text-left text-heading2-bold text-white mb-10 text-3xl font-bold">Create Thread</h1>

      <div className="mt-10 flex flex-col justify-start gap-10">
        <Textarea
          rows={15}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-neutral-900 border-neutral-800 text-white min-h-[200px]"
          placeholder="What's on your mind?"
        />
        <Button onClick={onSubmit} disabled={loading} className="w-full bg-white text-black hover:bg-neutral-200">
          {loading ? "Posting..." : "Post Thread"}
        </Button>
      </div>
    </>
  );
}
