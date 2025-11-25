# Globens Frontend 



## 🚀 Xususiyatlar

### Turnir Detail Page
- **Hero Section**: Turnir haqida asosiy ma'lumotlar, status, mukofot, qoidalar
- **Tab System**: 4 ta asosiy tab orqali ma'lumotlarni ko'rsatish
  - **Participants Tab**: Ishtirokchilar ro'yxati, saralash va filtrlash
  - **Bracket Tab**: Turnir braketi va o'yinlar
  - **Matches Tab**: Barcha o'yinlar, status bo'yicha filtrlash
  - **Prize Tab**: Mukofot taqsimoti va ma'lumotlar

### Responsive Design
- Mobile va desktop uchun moslashgan
- Modern UI/UX dizayn
- Hover effektlari va animatsiyalar

### Internationalization
- O'zbek, Rus va Ingliz tillarini qo'llab-quvvatlaydi
- Har bir til uchun alohida translation fayllar

## 🛠️ Texnologiyalar

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **SCSS/Sass** - Styling
- **React Icons** - Icon library
- **next-intl** - Internationalization

## 📁 Loyiha strukturası

```
src/
├── app/
│   └── [locale]/
│       └── tournaments/
│           ├── [id]/
│           │   ├── page.tsx
│           │   └── tournamentDetail.module.scss
│           ├── page.tsx
│           └── tournaments.module.scss
├── components/
│   └── Tournaments/
│       ├── TournamentDetailHero.tsx
│       ├── TournamentDetailHero.module.scss
│       ├── TournamentTabs.tsx
│       ├── TournamentTabs.module.scss
│       ├── Tabs/
│       │   ├── ParticipantsTab.tsx
│       │   ├── ParticipantsTab.module.scss
│       │   ├── BracketTab.tsx
│       │   ├── BracketTab.module.scss
│       │   ├── MatchesTab.tsx
│       │   ├── MatchesTab.module.scss
│       │   ├── PrizeTab.tsx
│       │   └── PrizeTab.module.scss
│       └── index.ts
├── types/
│   └── tournament.d.ts
├── API/
│   └── services/
│       └── tournaments.ts
└── messages/
    ├── uz.json
    ├── en.json
    └── ru.json
```

## 🎯 Asosiy komponentlar

### TournamentDetailHero
- Turnir haqida asosiy ma'lumotlar
- Status, mukofot, statistika
- Qoidalar ko'rsatish/yashirish
- Ro'yxatdan o'tish tugmasi

### TournamentTabs
- Tab navigation
- Har bir tab uchun content render qilish
- Tab count ko'rsatish

### ParticipantsTab
- Ishtirokchilar ro'yxati
- Saralash va filtrlash
- Jamoa ma'lumotlari va statistika

### BracketTab
- Turnir braketi
- O'yin statuslari
- G'olib ko'rsatish

### MatchesTab
- Barcha o'yinlar
- Status bo'yicha filtrlash
- Sana yoki bosqich bo'yicha saralash

### PrizeTab
- Mukofot taqsimoti
- O'rin bo'yicha ko'rsatish
- Mukofot haqida ma'lumot

## 🔧 O'rnatish va ishga tushirish

```bash
# Dependencies o'rnatish
npm install

# Development server ishga tushirish
npm run dev

# Build qilish
npm run build
```

## 📱 Responsive breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Styling

- **SCSS/Sass** ishlatilgan
- **CSS Variables** orqali theming
- **Flexbox** va **Grid** layout
- **Hover effects** va **transitions**

## 🌐 API Integration

- **Mock data** development uchun
- **Real API** production uchun
- **Error handling** va **loading states**

## 📝 Keyingi qadamlar

- [ ] Real API integration
- [ ] Authentication
- [ ] Tournament registration
- [ ] Live match updates
- [ ] Admin panel
- [ ] Tournament creation

## 🤝 Hissa qo'shish

1. Repository ni fork qiling
2. Feature branch yarating
3. O'zgarishlarni commit qiling
4. Pull request yuboring

## 📄 License

MIT License

