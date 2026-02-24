# AapakaNai | Retro Men's Barber Marketplace

AapakaNai is a location-priority barber marketplace designed for the modern Indian man. It features a retro Bollywood aesthetic and prioritizes shops based on real-time availability, ratings, and proximity.

## Key Features

- **Location-Priority Search**: Discover barbers ranked by availability first, ensuring you never have to wait in a long line.
- **AI-Powered Queue Predictor**: Uses Genkit to predict waiting times based on historical patterns (especially busy Sundays).
- **AI Customer Assistant**: A friendly bot to answer questions about services, pricing, and Bollywood styles.
- **Dual Dashboard System**:
  - **Barbers**: Manage shop status (Open/Closed), track earnings, and view subsidized payouts.
  - **Customers**: Secure login via Phone/OTP and easy booking discovery.
- **Transparent Pricing**: Clear breakdown of service costs and subsidized discounts for new users.

## How to Run Locally

1. **Extract the ZIP**: Unzip the downloaded file into a folder on your computer.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root and add your Firebase and Gemini API keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Backend**: Firebase (Auth, Firestore)
- **AI**: Genkit with Google Gemini 2.5 Flash
- **Icons**: Lucide React + Custom Barber SVGs

## Marketplace Strategy

The platform includes a built-in logic for customer acquisition where initial discounts are tracked transparently, allowing the business owner to subsidize early transactions to build the user base.
