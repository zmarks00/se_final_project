# News Explorer App

A modern news search application built with React and Vite, powered by the NewsAPI.

Live demo: https://zmarks00.github.io/se_final_project/

## Features

- 🔍 **Search News Articles**: Search for articles on any topic
- 📰 **Real-time Results**: Fetches latest articles from NewsAPI
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vite for optimal performance
- 🔐 **Secure API Key**: Environment variables for sensitive configuration
- 📄 **Pagination**: Shows 3 articles at a time with "Show More" functionality
- ✨ **Error Handling**: User-friendly error messages and validation

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- NewsAPI key (register at [newsapi.org](https://newsapi.org))

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd news-explorer-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your NewsAPI key:

```
VITE_NEWS_API_KEY=your_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3001`

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## API Integration

### NewsAPI Configuration

The app fetches articles from NewsAPI with the following parameters:

- **Endpoint**: `https://newsapi.org/v2/everything` (development)
- **Date Range**: Last 7 days to today
- **Page Size**: Up to 100 articles per request
- **Sort**: By published date (newest first)

### Production Proxy

In production, the app automatically switches to a proxy URL to bypass request limitations:

```
https://nomoreparties.co/news/v2/everything
```

This allows the free tier of NewsAPI to work properly in production environments.

## Deployment

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Deploy to Hosting Services

#### Option 1: Vercel

```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages

```bash
npm run build
# Deploy the dist folder to your hosting service
```

### Environment Variables in Production

Make sure to set the `VITE_NEWS_API_KEY` environment variable in your hosting platform's configuration panel.

**Important**: In production, the app will automatically use the proxy URL (`https://nomoreparties.co/news/v2/everything`) to bypass NewsAPI's free tier limitations.

## Project Structure

```
src/
├── components/
│   ├── App/              # Main app component with state management
│   ├── Header/           # App header
│   ├── Main/             # Hero section and search
│   ├── SearchForm/       # Search input with validation
│   ├── NewsCard/         # Individual article card
│   ├── Navigation/       # Navigation menu
│   ├── LoginModal/       # Login modal
│   ├── RegisterModal/    # Registration modal
│   ├── SavedNews/        # Saved articles page
│   ├── Footer/           # App footer
│   └── About/            # About section
├── utils/
│   └── newsApi.js        # NewsAPI integration
├── assets/               # Images and static files
├── vendor/              # Third-party styles
└── index.css            # Global styles
```

## Features Implemented

### Search & Validation

- ✅ Input validation with error message "Please enter a keyword"
- ✅ API request with search query

### Response Handling

- ✅ Preloader animation during API calls
- ✅ "Nothing Found" message when no results
- ✅ Error handling with user-friendly messages
- ✅ Article display with proper formatting

### Article Display

- ✅ Source name, title, date, description, and image
- ✅ Formatted dates (e.g., "May 6, 2026")
- ✅ Responsive grid layout
- ✅ Save/bookmark button on each card

### Pagination

- ✅ Shows 3 articles initially
- ✅ "Show More" button loads 3 additional articles
- ✅ Button disappears when all articles are displayed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### "Please enter a keyword" error appears on valid input

- Clear your browser cache and reload the page

### No articles appearing

- Verify your NewsAPI key is correct in the `.env` file
- Check that you're on localhost during development
- Ensure the API key has not exceeded its rate limit

### Build fails during `npm run build`

- Delete `node_modules` and `dist` folders
- Run `npm install` again
- Run `npm run build`

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:

1. Check the [NewsAPI documentation](https://newsapi.org/docs)
2. Review the [Vite documentation](https://vitejs.dev/)
3. Create an issue in the repository
