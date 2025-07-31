import React from "react";
import { createRoot } from "react-dom/client";
import FaviconLogo from "../components/ui/FaviconLogo";

// This utility can be used to generate favicon from the FaviconLogo component
export const generateFaviconDataURL = (): Promise<string> => {
  return new Promise((resolve) => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 32; // Standard favicon size

    canvas.width = size;
    canvas.height = size;

    if (!ctx) {
      resolve("");
      return;
    }

    // Create SVG data URL for the favicon
    const svgData = `
      <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Outer hexagon -->
        <path d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z" 
              stroke="#10b981" stroke-width="6" fill="none"/>
        
        <!-- Inner geometric pattern -->
        <path d="M35 35 L65 35 L50 20 Z" fill="#10b981"/>
        <path d="M35 65 L65 65 L50 80 Z" fill="#3b82f6"/>
        
        <!-- Central diamond -->
        <path d="M50 35 L60 50 L50 65 L40 50 Z" fill="#ffffff"/>
        
        <!-- Code brackets -->
        <text x="22" y="58" font-family="monospace" font-size="14" font-weight="bold" fill="#10b981">&lt;</text>
        <text x="70" y="58" font-family="monospace" font-size="14" font-weight="bold" fill="#10b981">/&gt;</text>
      </svg>
    `;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  });
};

// Generate favicon and update the document
export const updateFavicon = async () => {
  try {
    const faviconDataURL = await generateFaviconDataURL();

    // Remove existing favicon
    const existingFavicon =
      document.querySelector('link[rel="icon"]') ||
      document.querySelector('link[rel="shortcut icon"]');
    if (existingFavicon) {
      existingFavicon.remove();
    }

    // Add new favicon
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.href = faviconDataURL;
    document.head.appendChild(favicon);

    console.log("Favicon updated successfully!");
  } catch (error) {
    console.error("Error updating favicon:", error);
  }
};
