# 🔗 URL Shortener

A full-stack URL shortener built with React, Node.js, MongoDB Atlas, and deployed on Vercel.

## Features

- ✅ Shorten long URLs with 6-character codes
- ✅ Redirect short URLs to original URLs
- ✅ Check for existing URLs to avoid duplicates
- ✅ Clean, responsive user interface
- ✅ Copy to clipboard functionality
- ✅ Serverless deployment ready

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js serverless functions
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Local Development Setup

### 1. Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Git

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string from "Connect" → "Connect your application"
5. Whitelist your IP or use 0.0.0.0/0 for development

### 3. Environment Variables

Update `.env.local` with your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/urlshortener?retryWrites=true&w=majority
BASE_URL=http://localhost:5173
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

For full development with both frontend and API:
```bash
npm run dev:full
```

Or run them separately:
```bash
# Terminal 1 - API server
npm run dev:api

# Terminal 2 - Frontend
npm run dev
```

Visit `http://localhost:5173` to use the app.

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy

```bash
vercel
```

Follow the prompts to deploy. Vercel will automatically detect this as a React project.

### 3. Set Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `BASE_URL`: Your Vercel deployment URL (e.g., `https://your-project.vercel.app`)

### 4. Redeploy

After setting environment variables, trigger a new deployment:

```bash
vercel --prod
```

## API Endpoints

- `POST /api/shorten` - Create a short URL
- `GET /api/[shortCode]` - Redirect to original URL
- `GET /[shortCode]` - Direct redirect (handled by Vercel routing)

## File Structure

```
url-shortener/
├── api/
│   ├── db.js              # MongoDB connection
│   ├── Url.js             # Mongoose schema
│   ├── shorten.js         # Shorten URL endpoint
│   └── [shortCode].js     # Redirect endpoint
├── src/
│   ├── App.jsx            # Main React component
│   └── ...
├── vercel.json            # Vercel configuration
├── dev-server.js          # Local development API server
└── .env.local             # Environment variables
```

## How It Works

1. User enters a long URL in the frontend
2. Frontend sends POST request to `/api/shorten`
3. Backend generates a 6-character code using nanoid
4. URL mapping is saved to MongoDB
5. User gets a short URL back
6. When someone visits the short URL, they're redirected to the original

## Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check that your connection string is correct
- Verify database user has proper permissions

### Vercel Deployment Issues
- Make sure environment variables are set in Vercel dashboard
- Check build logs for any errors
- Ensure `vercel.json` is properly configured

### Local Development Issues
- Make sure both frontend and API servers are running
- Check that ports 3001 (API) and 5173 (frontend) are available
- Verify `.env.local` file exists and has correct values

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

MIT License+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
