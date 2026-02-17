/**
 * AdSense Placeholder Component
 * Replace with actual AdSense code when ready to monetize
 */

type AdSenseProps = {
  slot?: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal";
  className?: string;
};

export default function AdSense({ slot = "placeholder", format = "auto", className = "" }: AdSenseProps) {
  // For now, show a placeholder
  // When ready to use AdSense, replace this with actual Google AdSense code
  
  const isDevelopment = import.meta.env.DEV;
  
  if (!isDevelopment) {
    // In production, this is where you'd insert the actual AdSense script
    // Example:
    // useEffect(() => {
    //   try {
    //     (window.adsbygoogle = window.adsbygoogle || []).push({});
    //   } catch (err) {
    //     console.error('AdSense error:', err);
    //   }
    // }, []);
    
    return (
      <div className={`adsense-container ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense ID
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
  
  // Development placeholder
  return (
    <div className={`border-2 border-dashed border-muted rounded-lg p-4 text-center bg-muted/10 ${className}`}>
      <p className="text-xs text-muted-foreground">AdSense Placeholder</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Slot: {slot}</p>
    </div>
  );
}
