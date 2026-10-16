<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3a7f40f8-cf58-4fa2-bd5d-148e2710ffe1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## Background music

Place your MP3 file at `public/music.mp3` (rename your file to `music.mp3`).
The website starts it after the correct password is entered, fades it in gently,
loops it, and lets the floating music button pause or resume playback. Browsers
may require a user interaction before audio can play, so playback is initiated
from the password-entry action.
