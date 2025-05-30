"use client";
import { useEffect } from "react";

export default function AndroidLinkRedirect() {
  useEffect(() => {
    if (/android/i.test(navigator.userAgent)) {
      document.querySelectorAll("a[href]").forEach(link => {
        const anchor = link as HTMLAnchorElement;  // tell TS this is an anchor element
        if (anchor.href.includes("https://play.google.com/store/apps/")) {
          anchor.href = anchor.href.replace(
            "https://play.google.com/store/apps/",
            "market://"
          );
        }
      });
    }
  }, []);

  return null;
}
