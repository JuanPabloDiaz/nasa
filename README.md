# 🚀 NASA Space Archive

> Explore the cosmos through NASA's Image and Video Library

A modern, responsive React application that showcases NASA's incredible collection of space imagery and videos. Built with cutting-edge technologies and designed with a space-inspired aesthetic, this app provides an immersive experience for discovering the wonders of the universe.

## ✨ Features

- **🔍 Advanced Search**: Search through NASA's vast collection of images, videos, and audio files
- **🎯 Smart Filtering**: Filter results by media type, year, and NASA center
- **📱 Responsive Design**: Optimized for all devices with a mobile-first approach
- **🌌 Space-Themed UI**: Beautiful cosmic design with glassmorphism effects and animations
- **⚡ High Performance**: Optimized for speed with lazy loading and efficient state management
- **♿ Accessible**: Built with accessibility in mind following WCAG guidelines
- **🔗 Deep Linking**: Shareable URLs for search results and individual media items
- **💾 Local Caching**: Smart caching to reduce API calls and improve performance

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom space theme
- **Routing**: React Router DOM
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier
- **API**: NASA Image and Video Library API

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nasa-space-archive.git
   cd nasa-space-archive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── MediaCard.tsx
│   ├── MediaGrid.tsx
│   ├── FeaturedGrid.tsx
│   ├── SearchFilters.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── SearchResultsPage.tsx
│   ├── MediaDetailPage.tsx
│   └── NotFoundPage.tsx
├── hooks/              # Custom React hooks
│   └── useNASA.ts
├── services/           # API services
│   └── nasa.service.ts
├── types/              # TypeScript type definitions
│   └── nasa.types.ts
├── utils/              # Utility functions
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main

### Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Add `_redirects` file for SPA routing

## 🌟 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Lazy loading and responsive images
- **Bundle Size**: Tree shaking and module optimization
- **Caching Strategy**: Intelligent API response caching
- **SEO Optimization**: Meta tags and OpenGraph support

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color schemes
- **Focus Management**: Visible focus indicators
- **Alt Text**: Descriptive alt text for all images

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **NASA** for providing the incredible Image and Video Library API
- **Hubble Space Telescope** for the stunning imagery
- **Mars Rover missions** for groundbreaking photography
- **International Space Station** for Earth observation data

---

<div align="center">
  <p>Made with ❤️ and ☕ for space enthusiasts everywhere</p>
  <p>🌌 <em>"The cosmos is within us. We are made of star-stuff."</em> - Carl Sagan</p>
</div>
