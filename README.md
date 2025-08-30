# Red Barn Rideau Website

A modern, rustic website for a family sheep ranch specializing in Rideau breed sheep and premium stud rams for breeding.

## 🌐 Live Website

Visit the website at: **[Add your GitHub Pages URL here]**

## Features

- **Modern Rustic Design** - Clean, professional design with warm, earthy colors
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile devices
- **Interactive Gallery** - Filterable gallery of stud rams with detailed information
- **Contact Form** - Functional contact form with local data storage
- **Visitor Tracking** - Built-in analytics to track website visitors
- **Social Media Integration** - Links to Facebook and Instagram
- **Performance Optimized** - Fast loading with lazy image loading

## Pages

1. **Home (`index.html`)** - Welcome page showcasing the ranch
2. **About (`about.html`)** - Ranch history, heritage, team, and values
3. **Gallery (`gallery.html`)** - Stud ram showcase with filtering options
4. **Contact (`contact.html`)** - Contact form and ranch information

## File Structure

```
redbarnrideau/
├── index.html              # Home page
├── about.html               # About page
├── gallery.html             # Gallery page
├── contact.html             # Contact page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── script.js           # JavaScript functionality
├── images/                 # Image assets
│   └── README.md           # Image requirements guide
└── README.md               # This file
```

## Adding Images

To add your ranch photos:

1. Upload images to the `images/` folder on GitHub
2. Use these exact filenames for automatic integration:
   - `hero-sheep.jpg` - Main hero image on home page
   - `ranch-family.jpg` - Family photo on about page
   - `robert-thompson.jpg`, `sarah-williams.jpg`, `mike-johnson.jpg` - Team photos
   - Ram photos: `ram-thunderbolt.jpg`, `ram-atlas.jpg`, `ram-summit.jpg`, etc.

See `images/README.md` for complete image specifications.

## Contact Form Data

Contact form submissions are stored locally in the visitor's browser. For production use, consider integrating with:
- **Netlify Forms** (if you switch to Netlify)
- **Formspree** - External form handling service
- **EmailJS** - Client-side email sending

## Visitor Analytics

The website includes built-in visitor tracking. View analytics by opening browser developer tools (F12) and running:
- `getVisitorStats()` - View visitor statistics
- `getContactSubmissions()` - View contact form submissions
- `exportVisitorData()` - Export data to JSON file

## Customization

### Colors
The color scheme is defined in CSS variables at the top of `css/style.css`:
- `--barn-red` - Primary red color
- `--primary-color` - Brown color
- `--secondary-color` - Orange accent
- `--natural-green` - Green accent

### Content
All content can be easily modified by editing the HTML files.

### Social Media
Update the social media links in the footer sections of each HTML file to point to your actual social media accounts.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Internet Explorer 11+ (with some limitations)

## Updating the Website

1. Make changes to files locally or directly on GitHub
2. Commit changes to the repository
3. Changes appear live automatically within minutes

---

Built with ❤️ for Red Barn Rideau - Premium Rideau Sheep Ranch