# PCA Bundles Website

Professional website for PCA Bundles - Auto Detailing, Tinting & Car Sales

## Features

- **Responsive Design**: Works perfectly on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean design with black, white, and orange color scheme
- **Services Section**: Showcase detailing, tinting, and paint protection services
- **Bundle Packages**: Three-tier pricing packages (Basic, Premium, Ultimate)
- **Cars for Sale**: Dynamic car listings with details and inquiry options
- **Contact Form**: Easy-to-use contact form for customer inquiries
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices

## Structure

```
Pcabundles/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md           # This file
```

## Customization

### Update Business Information

Edit the contact details in `index.html`:
- Phone number (search for `(555) 123-4567`)
- Email address (search for `info@pcabundles.com`)
- Physical address (search for `123 Auto Street`)
- Business hours (in the contact section)

### Update Car Listings

In `script.js`, modify the `carsData` array:
```javascript
const carsData = [
    {
        id: 1,
        name: 'Car Name',
        price: 24999,
        year: 2020,
        mileage: '35,000',
        transmission: 'Automatic',
        description: 'Description here',
        image: 'path/to/image.jpg'
    },
    // Add more cars...
];
```

### Update Service Pricing

In `index.html`, find the bundles section and update prices:
- Basic Bundle: Starting at $299
- Premium Bundle: Starting at $599
- Ultimate Bundle: Starting at $999

### Change Colors

In `styles.css`, modify the CSS variables:
```css
:root {
    --primary-color: #ff6600;    /* Orange */
    --dark-bg: #000000;          /* Black */
    --white: #ffffff;            /* White */
}
```

### Add Real Images

Replace placeholder images with actual photos:
1. Create an `images` folder
2. Add your photos
3. Update image sources in HTML and JavaScript

Example:
```html
<img src="images/car1.jpg" alt="Car Name">
```

## Setup

1. **Local Development**:
   - Open `index.html` in a web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit `http://localhost:8000`

2. **Deploy to Web**:
   - Upload all files to your web hosting
   - Point your domain (pcabundles.com) to the hosting
   - Ensure all files are in the root directory

## Adding More Features

### Email Integration

To make the contact form functional, you can:
1. Use a service like FormSpree, EmailJS, or Netlify Forms
2. Set up a backend with PHP, Node.js, or Python
3. Use a third-party form handler

### Social Media Links

Update the social media links in the footer:
```html
<a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
<a href="https://instagram.com/yourpage"><i class="fab fa-instagram"></i></a>
```

### Google Maps

Add a map to the contact section:
```html
<iframe src="https://maps.google.com/maps?q=YOUR_ADDRESS&output=embed"></iframe>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. Optimize images (compress, use WebP format)
2. Minify CSS and JavaScript for production
3. Enable caching on your server
4. Use a CDN for Font Awesome and other libraries

## SEO Recommendations

1. Add meta descriptions to `<head>`
2. Use descriptive alt text for images
3. Create a sitemap.xml
4. Add structured data (schema.org)
5. Optimize page titles

## License

© 2025 PCA Bundles. All rights reserved.

## Support

For questions or issues, contact: info@pcabundles.com
