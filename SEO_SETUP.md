# SEO Configuration Guide for UNI AI

## SEO Components Configured:

### 1. Meta Tags (index.html)
✓ **Primary Keywords**: UNI AI, University AI, Sierra Leone University AI, Academic AI.
✓ **Contextual Keywords**: Sierra Leone AI Education, University Student Portal.
✓ **Open Graph Tags**: Configured for social media (WhatsApp, FB) with correct URLs.
✓ **Twitter Cards**: Optimized for rich previews on X.
✓ **Branding**: Added `application-name` and mobile app titles.

### 2. Robots.txt (public/robots.txt)
✓ Updated Host to: `https://uniai-playground.web.app/`
✓ Added specific crawling rules for Google and Bing.
✓ Linked correct sitemap path.

### 3. Sitemap (public/sitemap.xml)
✓ Updated all page locations to use your Firebase domain: `https://uniai-playground.web.app/`
✓ Configured priority levels for Course and Faculty pages.

### 4. Structured Data (JSON-LD)
✓ **EducationalOrganization**: Defined as a platform for all Sierra Leone Universities.
✓ **WebApplication**: Configured as an educational app based in Sierra Leone.

---

## 🛠️ How to Set This Up on Firebase Domain

Since you are using Firebase Hosting (`https://uniai-playground.web.app/`), follow these exact steps to activate your SEO:

### 1. Verify Ownership in Google Search Console
Search engines won't index your site fully until you prove you own it.
1. Visit: [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**.
3. Choose **"URL Prefix"** and enter: `https://uniai-playground.web.app/`
4. **Verification Method**: 
   - **HTML Tag**: Copy the `<meta name="google-site-verification" content="..." />` tag.
   - **Action**: Tell me the code, and I will add it to your `index.html`.
   - **Alternative**: You can also verify via DNS if you have a custom domain.

### 2. Submit Your Sitemap
Once verified, you must tell Google where your pages are.
1. Open the **"Sitemaps"** menu in Search Console.
2. Under "Add a new sitemap", type: `sitemap.xml`
3. Click **Submit**.

### 3. Test on Social Media
Verify that your links look professional:
- **WhatsApp/Facebook**: Paste your URL `https://uniai-playground.web.app/` in a chat. It should show the UNI AI logo and description.
- **Twitter**: Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator).

### 4. Update the OG Image
Right now, the SEO points to `og-image.png`.
- **Action**: Upload an image (1200x630px) named `og-image.png` to your `public/` folder to show a nice preview.

---

## Technical Performance Notes
✓ GZIP compression is handled automatically by Firebase Hosting.
✓ HTTPS is forced by default on .web.app domains (Critical for SEO).
✓ `firebase.json` is configured to handle clean URLs (Rewrites).

**Your site is now fully optimized for UNI AI and University AI searches across Sierra Leone!**
