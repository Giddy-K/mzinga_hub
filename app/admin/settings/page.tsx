"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import AdminNavbar from "@/app/components/AdminNavbar";
import type { PlatformSettings } from "@/types/platform-settings";

export default function SettingsPage() {
  const [platform, setPlatform] = useState<PlatformSettings>({
    name: "",
    description: "",
    contactEmail: "",
    themeColor: "",
    logoUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, "settings", "platform");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setPlatform(snap.data() as PlatformSettings);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform({ ...platform, [e.target.name]: e.target.value });
  };

const handleSave = async () => {
  try {
    const docRef = doc(db, "settings", "platform");
    await setDoc(docRef, platform, { merge: true }); // ✅ FIXED
    toast.success("Settings updated!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to update settings.");
  }
};

  if (loading) return <p className="p-6">Loading settings...</p>;

  return (
    <>
      <AdminNavbar />
      <section className="p-6 max-w-3xl mt-24 mx-auto bg-white shadow rounded-xl">
        <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>

        {["name", "description", "contactEmail", "themeColor", "logoUrl"].map((key) => (
          <div className="mb-4" key={key}>
            <Label htmlFor={key}>{key}</Label>
            <Input
              id={key}
              name={key}
              value={platform[key as keyof PlatformSettings]}
              onChange={handleChange}
            />
          </div>
        ))}

        <Button onClick={handleSave} className="mt-4">
          Save Changes
        </Button>
      </section>
    </>
  );
}
