# KenyaMatch - Location-Based Dating for Kenya

A simple location-based matchmaking website for people in Kenya.

## Features (Current Demo)
- Mock user profiles with Kenyan counties
- GPS location request to show nearby matches
- Distance calculation
- Filters by county and age
- Profile modal with like/pass
- Mobile-friendly UI

## Planned Features
1. User registration/login (Firebase Auth or Netlify Identity)
2. Real profile setup and photo uploads (Cloudinary or Netlify Blobs)
3. Real GPS matching algorithm
4. Real-time chat (Socket.io or Supabase)
5. Notifications
6. Safety/report system
7. M-Pesa premium subscriptions
8. Student / Professional / Church modes
9. Sheng language support

## Tech Stack
- Frontend: Vanilla HTML/CSS/JS (easy to upgrade to React/Next.js)
- Hosting: Netlify
- Backend (future): Netlify Functions + Database (Postgres/Mongo/Supabase)
- Maps: Browser Geolocation API (Google Maps later)

## Local Development
Just open `index.html` in a browser or use a simple server:
```
npx serve .
```

## Deploy to Netlify
1. Connect this GitHub repo to Netlify
2. Build command: leave empty or `echo ok`
3. Publish directory: `.`
4. Deploy!

Or use the Netlify button / CLI.

## Next Steps
- Add authentication
- Persist profiles
- Implement real matching
- Add chat

Built with love for Kenya 🇰🇪