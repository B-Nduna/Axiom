# AXIOM 2.0 — Personal Guidance

A ground-up UX rework of AXIOM v1.4. Three destinations: **Today**, **Guide**, **You**. Built in React JSX + Vite, with Firebase profile sync and Capacitor configuration.

## What changed

- **Today**: an editorial daily briefing, personal-day interpretation, four real-world focus areas, and one concrete next move. Date browsing stays on the briefing.
- **Guide**: only three intentional routes: a private personal check-in, a guest consultation, or a guided relationship discussion. The personal check-in turns concerns into a short action plan without making unsupported psychological claims.
- **Connections**: a new three-step guided workflow: relationship type and birth details → specific relationship concern → symbolic context, a question and one real-world action. No fabricated match scores.
- **You**: personal numerology/Chinese lunar-year blueprint, Firebase account, privacy and export. Account details are in expandable sections rather than another set of tabs.
- New dark forest/stone/brass editorial visual language; persistent three-button mobile navigation; flat surfaces and deliberate typography.

## Run

```bash
npm install
npm run dev
npm run build
```

The Firebase client config from the preceding project is in `.env` (public Firebase Web config). `.env` is excluded from Git. Authentication and Firestore security rules must be enabled in the Firebase console.

## Android

```bash
npx cap add android
npm run android:sync
npm run android:open
```

## Important limits

- Profile sync continues to use the inherited v1.4 implementation. It still needs robust account-switching isolation, offline conflict policy, and deletion flow before production deployment.
- Guest consultation and comparison values are ephemeral React component state, not written to Firestore by this app.
- The new personal check-in text is in memory only. It is not synced.
- Full BaZi Four Pillars are **not** implemented. The app uses the existing numerology and lunar-year Chinese zodiac calculation.
- Numerology and astrology are reflective traditions and do not predict a person's future, diagnose health issues or prove relationship compatibility.
- JSX syntax checked. Production npm/Vite build and physical Android tests require dependency installation and have not been verified here.


## v2.1 Relationship Clarity
The Connections screen is now a three-stage, situation-based reflection (situation, pattern, direction). The outcome adapts to issue, recurrence, the other person’s response, and the desired outcome, and includes an action/observation plan plus safety-sensitive alternatives. Birth details are optional and only used for a clearly separated symbolic lens. Guest responses live in temporary component state and are discarded upon exiting or leaving the screen. No relationship data is sent to Firebase.
