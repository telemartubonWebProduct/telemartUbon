"use client"; // This makes the component a Client Component

import Script from 'next/script';

export default function TawkScript() {
  return (
    <Script
      strategy="afterInteractive"
      src="https://embed.tawk.to/67c0738b25eb41190eae9189/1il3s6mmf"
      charSet="UTF-8"
      onLoad={() => console.log('Tawk.to script loaded')}
    />
  );
}