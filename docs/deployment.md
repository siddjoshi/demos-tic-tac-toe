# Deployment Guide

Complete guide for deploying and hosting the Tic-Tac-Toe game.

## Table of Contents

- [Deployment Overview](#deployment-overview)
- [GitHub Pages Deployment](#github-pages-deployment)
- [Alternative Hosting Options](#alternative-hosting-options)
- [Custom Domain Setup](#custom-domain-setup)
- [CDN Integration](#cdn-integration)
- [Performance Optimization](#performance-optimization)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Monitoring and Analytics](#monitoring-and-analytics)

---

## Deployment Overview

### Requirements

The game is a static web application requiring only:
- Web server capable of serving static files
- Support for HTML, CSS, and JavaScript
- No backend, database, or server-side processing needed

### Deployment Options

1. **GitHub Pages** (Recommended for simplicity)
2. **Netlify** (Easy with continuous deployment)
3. **Vercel** (Modern JAMstack platform)
4. **AWS S3 + CloudFront** (Scalable enterprise solution)
5. **Traditional Web Hosting** (cPanel, FTP)
6. **Cloud Platforms** (Google Cloud, Azure)

---

## GitHub Pages Deployment

### Method 1: Deploy from Main Branch (Simplest)

#### Step 1: Prepare Repository

```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

#### Step 3: Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/demos-tic-tac-toe/
```

Wait 1-2 minutes for initial deployment.

### Method 2: Deploy from gh-pages Branch

#### Step 1: Create Deployment Branch

```bash
# Create and checkout gh-pages branch
git checkout -b gh-pages

# Push to GitHub
git push origin gh-pages
```

#### Step 2: Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Select branch: `gh-pages`
3. Select folder: `/ (root)`
4. Click **Save**

#### Step 3: Automate Deployments

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Troubleshooting GitHub Pages

**Issue: 404 Error**
- Check branch and folder settings
- Ensure `index.html` is in root directory
- Wait a few minutes for deployment

**Issue: CSS/JS Not Loading**
- Verify file paths are relative (not absolute)
- Check browser console for errors
- Clear browser cache

**Issue: Changes Not Showing**
- Clear GitHub Pages cache (wait 10 minutes)
- Hard refresh browser (Ctrl+F5)
- Check if commit pushed successfully

---

## Alternative Hosting Options

### Netlify

#### Deploy via Drag and Drop

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up/log in
3. Drag your project folder to Netlify
4. Site is live immediately!

#### Deploy via Git

1. **Connect Repository**
   - Click "New site from Git"
   - Select GitHub
   - Choose your repository

2. **Configure Build Settings**
   ```
   Build command: (leave empty)
   Publish directory: /
   ```

3. **Deploy**
   - Click "Deploy site"
   - Site is live!

#### Custom Domain on Netlify

1. Go to **Domain settings**
2. Click **Add custom domain**
3. Follow DNS configuration instructions

#### Netlify Features
- ✅ Automatic HTTPS
- ✅ Continuous deployment
- ✅ Instant cache invalidation
- ✅ Deploy previews for PRs
- ✅ Form handling (if added)
- ✅ Serverless functions (if needed)

### Vercel

#### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd demos-tic-tac-toe
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Your account)
# - Link to existing project? No
# - Project name? demos-tic-tac-toe
# - Directory? ./
# - Override settings? No
```

#### Deploy via GitHub Integration

1. Go to [vercel.com](https://vercel.com/)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   ```
   Framework Preset: Other
   Build Command: (leave empty)
   Output Directory: (leave empty)
   ```
5. Click "Deploy"

#### Vercel Features
- ✅ Edge network (fast globally)
- ✅ Automatic HTTPS
- ✅ GitHub integration
- ✅ Preview deployments
- ✅ Analytics
- ✅ Zero config required

### AWS S3 + CloudFront

#### Step 1: Create S3 Bucket

```bash
aws s3 mb s3://tic-tac-toe-game
```

#### Step 2: Upload Files

```bash
aws s3 sync . s3://tic-tac-toe-game \
  --exclude ".git/*" \
  --exclude ".github/*" \
  --exclude "docs/*"
```

#### Step 3: Configure Bucket for Static Hosting

```bash
aws s3 website s3://tic-tac-toe-game \
  --index-document index.html \
  --error-document index.html
```

#### Step 4: Set Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::tic-tac-toe-game/*"
  }]
}
```

#### Step 5: Create CloudFront Distribution

1. Go to CloudFront console
2. Create distribution
3. Origin: Your S3 bucket
4. Enable HTTPS
5. Set default root object: `index.html`

### Traditional Web Hosting (cPanel)

#### Upload via FTP

1. **Connect to FTP**
   - Use FileZilla or similar FTP client
   - Enter your hosting credentials

2. **Upload Files**
   - Navigate to `public_html` or `www` directory
   - Upload all files (index.html, styles.css, script.js)

3. **Access Site**
   - Visit `http://yourdomain.com`

#### Upload via cPanel File Manager

1. Log into cPanel
2. Open **File Manager**
3. Navigate to `public_html`
4. Click **Upload**
5. Select all project files
6. Wait for upload to complete

---

## Custom Domain Setup

### GitHub Pages Custom Domain

#### Step 1: Configure DNS

Add these DNS records to your domain:

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     YOUR-USERNAME.github.io
```

#### Step 2: Add Custom Domain

1. Go to repository **Settings** → **Pages**
2. Enter your custom domain
3. Click **Save**
4. Wait for DNS check (can take 24 hours)

#### Step 3: Enforce HTTPS

1. Once DNS configured, check **Enforce HTTPS**
2. GitHub automatically provisions SSL certificate

### Netlify Custom Domain

1. **Add Domain**
   - Site settings → Domain management
   - Add custom domain

2. **Configure DNS**
   - Use Netlify DNS (easiest)
   - Or point to Netlify:
     ```
     A     @       75.2.60.5
     CNAME www     YOUR-SITE.netlify.app
     ```

3. **Enable HTTPS**
   - Automatic with Let's Encrypt

---

## CDN Integration

### Cloudflare

#### Setup

1. Create Cloudflare account
2. Add your domain
3. Update nameservers at registrar
4. Enable **Auto Minify** (HTML, CSS, JS)
5. Enable **Brotli** compression
6. Set caching rules

#### Cloudflare Benefits
- Global CDN
- DDoS protection
- Free SSL
- Analytics
- Page Rules

### Configuration Example

```
Page Rule: yourdomain.com/*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
- Browser Cache TTL: 1 hour
```

---

## Performance Optimization

### Pre-Deployment Optimization

#### Minify Files

**CSS Minification:**
```bash
# Using cssnano
npx cssnano styles.css styles.min.css
```

**JavaScript Minification:**
```bash
# Using terser
npx terser script.js -o script.min.js
```

**Update HTML:**
```html
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

#### Image Optimization

If you add images later:

```bash
# Optimize with imagemin
npx imagemin images/* --out-dir=images-optimized
```

### Caching Strategy

#### Add Cache Headers

**.htaccess (Apache):**
```apache
# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Cache HTML with revalidation
<FilesMatch "\.(html)$">
  Header set Cache-Control "max-age=3600, must-revalidate"
</FilesMatch>
```

**Netlify (_headers file):**
```
/styles.css
  Cache-Control: max-age=31536000
/script.js
  Cache-Control: max-age=31536000
/index.html
  Cache-Control: max-age=3600, must-revalidate
```

### Compression

#### Enable Gzip/Brotli

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript;
gzip_min_length 256;

brotli on;
brotli_types text/css application/javascript;
```

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Performance Testing

**Tools:**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

**Target Metrics:**
- First Contentful Paint: < 1.8s
- Time to Interactive: < 3.8s
- Cumulative Layout Shift: < 0.1
- Largest Contentful Paint: < 2.5s

---

## SSL/HTTPS Setup

### Automatic SSL (Recommended)

**GitHub Pages:** Automatic with custom domain  
**Netlify:** Automatic with Let's Encrypt  
**Vercel:** Automatic  
**Cloudflare:** Free Universal SSL

### Manual SSL (Traditional Hosting)

#### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-apache

# Obtain certificate
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### Force HTTPS

**.htaccess:**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Monitoring and Analytics

### Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Simple Analytics (Privacy-Friendly)

Alternative to Google Analytics:

```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
<noscript><img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" referrerpolicy="no-referrer-when-downgrade" /></noscript>
```

### Uptime Monitoring

**Free Services:**
- [UptimeRobot](https://uptimerobot.com/)
- [StatusCake](https://www.statuscake.com/)
- [Pingdom](https://www.pingdom.com/) (limited free tier)

**Setup:**
1. Create account
2. Add monitor for your URL
3. Set check interval (5 minutes recommended)
4. Configure alerts (email/SMS)

---

## Deployment Checklist

Before deploying:

- [ ] Test locally in multiple browsers
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify no console errors
- [ ] Minify CSS and JavaScript (optional)
- [ ] Add analytics code (if desired)
- [ ] Configure custom domain (if using)
- [ ] Set up SSL/HTTPS
- [ ] Test deployment in staging environment
- [ ] Configure caching headers
- [ ] Set up monitoring
- [ ] Document deployment process
- [ ] Create rollback plan

After deploying:

- [ ] Test live site thoroughly
- [ ] Check performance metrics
- [ ] Verify SSL certificate
- [ ] Test on various devices
- [ ] Check analytics working
- [ ] Monitor for errors
- [ ] Share with users!

---

## Continuous Deployment

### GitHub Actions Example

`.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## Rollback Strategy

### GitHub Pages

```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Netlify/Vercel

1. Go to deployments
2. Find previous working deployment
3. Click "Publish this deployment"

---

## Support

For deployment issues:
- Check platform documentation
- Review error logs
- Test locally first
- Search community forums

---

*For development details, see [Developer Guide](developer-guide.md)*
