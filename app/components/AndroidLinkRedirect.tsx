"use client";
import { useEffect } from "react";

export default function AndroidLinkRedirect() {
  useEffect(() => {
    if (/android/i.test(navigator.userAgent)) {
      document.querySelectorAll("a[href]").forEach(link => {
        if (link.href.includes("https://play.google.com/store/apps/")) {
          link.href = link.href.replace(
            "https://play.google.com/store/apps/",
            "market://"
          );
        }
      });
    }
  }, []);

  return null;
}
