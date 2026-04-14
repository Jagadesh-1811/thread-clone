"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/lib/actions/user.actions";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [formValues, setFormValues] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    image: user.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser({
        name: formValues.name,
        path: pathname,
        username: formValues.username,
        userId: user.id,
        bio: formValues.bio,
        image: formValues.image,
      });

      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col justify-start gap-10">
      <div className="flex flex-col gap-3 w-full">
        <Label className="text-base-semibold text-neutral-200">Name</Label>
        <Input
          type="text"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          className="bg-neutral-800 border-neutral-700 text-white"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Label className="text-base-semibold text-neutral-200">Username</Label>
        <Input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          className="bg-neutral-800 border-neutral-700 text-white"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Label className="text-base-semibold text-neutral-200">Bio</Label>
        <Textarea
          rows={10}
          name="bio"
          value={formValues.bio}
          onChange={handleInputChange}
          className="bg-neutral-800 border-neutral-700 text-white"
        />
      </div>

      <Button type="submit" className="bg-white text-black hover:bg-neutral-200 font-bold" disabled={loading}>
        {loading ? "Saving..." : btnTitle}
      </Button>
    </form>
  );
};

export default AccountProfile;
