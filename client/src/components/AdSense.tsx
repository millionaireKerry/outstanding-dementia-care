import { useEffect } from "react";

/**
 * Google AdSense Component
 * Displays Google AdSense ads throughout the site
 */

type AdSenseProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdSense({ slot = "auto", format = "auto", className = "" }: AdSenseProps) {
  useEffect(() => {
    try {
      // Push ad to AdSense
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);
  
  return (
    <div className={`adsense-container my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3819753512414775"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
