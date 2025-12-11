# Mario Game

A simple Mario-style platformer game built with HTML, CSS, and JavaScript.

## Features

- Platform jumping mechanics
- Enemy AI
- Coin collection
- Surprise blocks with power-ups
- Multiple levels
- Score tracking

## Controls

- **Arrow Keys** or **WASD**: Move left/right
- **Space** or **W**: Jump
- **Down Arrow**: Enter pipe (when on top of a pipe)

## Deployment on Render

This is a static site and can be deployed on Render as a **Static Site**.

### Steps to Deploy:

1. **Push to GitHub** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

3. **Configure Settings**
   - **Name**: mario-game (or any name you prefer)
   - **Build Command**: Leave empty (no build needed)
   - **Publish Directory**: Leave empty or use `.`
   - **Root Directory**: Leave empty (if files are in root)

4. **Deploy**
   - Click "Create Static Site"
   - Render will automatically deploy your site
   - Your game will be live at `https://your-app-name.onrender.com`

### Alternative: Manual Upload

You can also manually upload the files through Render's dashboard if you prefer not to use GitHub.

## Local Development

Simply open `index.html` in a web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.
