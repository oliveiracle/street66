# 🚀 Street 66 Bar - Deployment Guide

## 📋 Pre-Deployment Checklist

- ✅ All images optimized (WebP format, 97-98% reduction)
- ✅ Google Analytics tracking code active (G-E0K0ZMD9E3)
- ✅ All carousel navigation working (37 gallery photos, 26 dogs, 20 cocktails)
- ✅ Responsive design tested on all devices
- ✅ Contact information verified
- ✅ Social media links active
- ✅ Opening hours accurate
- ✅ Clean codebase (no temporary files)

---

## 🌐 Deployment Options

### Option 1: Custom Domain with cPanel Hosting

**Step 1: Prepare Domain**

- Purchase domain: `street66bar.com` or similar
- Point DNS to your hosting provider
- Wait 24-48h for DNS propagation

**Step 2: Upload Files via FTP/cPanel**

```bash
# Files to upload to public_html/:
- index.html
- gallery.html
- contact.html
- robots.txt
- sitemap.xml
- .htaccess
- css/
- js/
- assets/
```

**Step 3: Configure .htaccess**

- Uncomment HTTPS redirect lines when SSL is active
- Test 404 error page redirects

**Step 4: Enable SSL Certificate**

- Request free SSL certificate from hosting provider (Let's Encrypt)
- Force HTTPS in .htaccess
- Update sitemap.xml with https:// URLs

**Step 5: Submit to Search Engines**

- Google Search Console: Submit sitemap.xml
- Bing Webmaster Tools: Submit sitemap.xml
- Verify Google Analytics tracking

---

### Option 2: Netlify (Easy & Free)

1. **Create Netlify Account**: https://www.netlify.com
2. **Deploy via Git**:
   ```bash
   # Connect your GitHub repository
   # Netlify auto-deploys on every push to main
   ```
3. **Custom Domain**:
   - Add custom domain in Netlify settings
   - Update DNS records (Netlify provides instructions)
4. **Enable HTTPS**: Automatic with Netlify

---

### Option 3: Vercel (Free & Fast)

1. **Create Vercel Account**: https://vercel.com
2. **Import Git Repository**:
   - Connect GitHub repo
   - Auto-deploy on push
3. **Add Custom Domain**: Follow Vercel's DNS instructions
4. **HTTPS**: Automatic

---

## 🔧 Post-Deployment Tasks

### 1. Test All Pages

- [ ] Home page loads correctly
- [ ] Gallery carousel works (all 37 photos)
- [ ] Pet gallery displays all 26 dogs
- [ ] Cocktail carousel shows all 20 drinks
- [ ] Contact page map loads
- [ ] Mobile menu functions properly
- [ ] All social media links work

### 2. Performance Testing

- Google PageSpeed Insights: https://pagespeed.web.dev/
- Target: 90+ score on mobile and desktop

### 3. SEO Verification

- Google Search Console: Verify ownership
- Submit sitemap: `https://www.street66bar.com/sitemap.xml`
- Check indexed pages after 1-2 weeks

### 4. Analytics Setup

- Verify Google Analytics is tracking visits
- Set up conversion goals (contact form submissions)
- Monitor visitor behavior weekly

### 5. Social Media Integration

- Add website link to Instagram bio
- Share website on Facebook page
- Post announcement on TikTok
- Update Google Business Profile with website URL

---

## 📱 Social Media Sharing

**Instagram Post Caption:**

```
🎉 Our new website is LIVE! 🎉

🌐 Visit us at [YOUR-DOMAIN.com]
📸 Check out our gallery
🍸 Browse our cocktail menu
📍 Find us easily with integrated maps

#Street66Bar #Dublin #TempleBar #DublinNightlife #WebsiteLaunch
```

**Facebook Post:**

```
🚀 BIG NEWS! Our brand new website is now live!

Visit [YOUR-DOMAIN.com] to:
✨ View our stunning photo gallery
🍸 Explore our signature cocktails
🎵 Check DJ Pixie-Woo's schedule
🐕 See our pet-friendly atmosphere
📍 Get directions and opening hours

Come visit us at 33-34 Parliament St, Temple Bar!

#Street66Bar #DublinBar #TempleBar
```

---

## 🔐 Security Recommendations

1. **Keep Backups**: Download full site backup monthly
2. **Monitor Analytics**: Check for unusual traffic patterns
3. **Update Content**: Keep gallery photos and events current
4. **SSL Certificate**: Always use HTTPS
5. **Regular Updates**: Test site functionality quarterly

---

## 📞 Support

For website updates or technical issues:

- Developer: @oliveiraacle
- WhatsApp: +353 086 272 71 81

---

## 📊 Expected Performance Metrics

- **Page Load Time**: < 2 seconds
- **Mobile Score**: 90+
- **Desktop Score**: 95+
- **Image Size**: 6.3MB total (optimized)
- **Total Pages**: 3 (Home, Gallery, Contact)

---

## 🎯 Marketing Strategy Post-Launch

1. **Week 1**:

   - Announce on all social media
   - Email customers with website link
   - Update Google Business listing

2. **Week 2-4**:

   - Share gallery photos weekly
   - Promote cocktail carousel
   - Encourage customer reviews

3. **Month 2+**:
   - Add new gallery photos monthly
   - Update events section regularly
   - Monitor and respond to feedback

---

**🍾 Congratulations on your professional website launch! 🍾**
