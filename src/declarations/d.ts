// src/declarations.d.ts (or src/custom.d.ts)
declare module '*.png'; // Likely already implicitly handled, but good to include for clarity
declare module '*.jpg';
 // <--- This is what you need for DSCN9743.JPG
declare module '*.jpeg'; // <--- Also good to include for consistency
declare module '*.gif';
declare module '*.bmp';
declare module '*.webp';
declare module '*.svg';