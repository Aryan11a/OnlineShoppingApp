# Sewa

Sewa is an Expo React Native marketplace prototype for buying and selling second-hand items. It uses Expo Router for navigation and NativeWind for Tailwind styling.

## Run locally

```bash
npm install
npm run web
```

For native development, run `npx expo start` and open the project in Expo Go. The listing photo picker supports multiple image selection and camera capture on supported devices.

## Included flows

- Explore listings with category filters, search, and lowest-price sorting
- Save listings and compare local price context
- View item condition, seller rating, reviews, other items, availability, and contact options
- Message sellers, block or report a member, and contact Sewa support
- Create local listings with photos, category, condition, price, brand, specs, and description
- Switch between system, light, and dark appearance in Profile

## Prototype boundaries

Marketplace data is sample content. New listings, saved items, and messages are held in app memory and reset when the app reloads. Photo selection is local to the device; uploads, authentication, live chat delivery, phone verification, seller reviews, price comparisons, sold-state synchronization, report handling, and manager support require a backend integration before production use. Sample photos are remote Unsplash URLs.
