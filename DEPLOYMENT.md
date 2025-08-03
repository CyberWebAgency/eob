# 🧬 East Ocyon Bio - Deployment Guide

## 🎯 Production Deployment

This guide will help you deploy the East Ocyon Bio website to **https://eob.cyberwebopera.com/**

### 📋 Prerequisites

- Web hosting with PHP 7.2+ and MySQL 5.7+
- cPanel or FTP access to your hosting server
- Domain configured to point to your hosting

### 🚀 Quick Deployment

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Upload files to your web server:**
   - Upload all contents of `dist/` directory to your web root
   - Upload `.htaccess` file to handle React Router
   - Upload `admin/`, `api/`, `uploads/`, and `config/` directories

### 📁 File Structure on Server

```
your-domain.com/
├── index.html                 # From dist/
├── assets/                    # From dist/assets/
├── *.mp4, *.glb, *.png       # From dist/ (media files)
├── .htaccess                  # React Router handling
├── admin/                     # PHP admin dashboard
├── api/                       # PHP API endpoints
├── uploads/                   # File uploads directory
└── config/                    # Database configuration
```

### 🔧 Server Configuration

#### Apache (.htaccess is already configured)
The `.htaccess` file handles:
- React Router routing for SPA
- Static file caching
- Security headers
- Gzip compression

#### PHP Configuration
Ensure these PHP settings:
```ini
upload_max_filesize = 10M
post_max_size = 10M
max_execution_time = 300
```

#### Database Setup
1. Create a MySQL database
2. Import the database schema using: `admin/setup_database.php`
3. Update `config/database.php` with your credentials

### 📱 Configured Contact Information

- **Email:** dinesh.kundu@eastocyonbio.com
- **Phone:** +91 9718420441  
- **Address:** DCG2-1014, DLF Corporate Greens, Sec-74A, Gurugram - 122004, Haryana

### 🌐 Social Media Links

- **Instagram:** [@eastocyonbio](https://www.instagram.com/eastocyonbio/)
- **Twitter:** [@eastocyonbio](https://twitter.com/eastocyonbio)
- **LinkedIn:** [East Ocyon Bio Private Limited](https://www.linkedin.com/company/east-ocyon-bio-private-limited/)

### 🔐 Admin Dashboard

Access the admin panel at: `https://eob.cyberwebopera.com/admin/`

Default credentials:
- Username: `admin`
- Password: `admin123`

**⚠️ Important:** Change the default password after first login!

### 📊 Features Included

- ✅ Modern React frontend with TypeScript
- ✅ 3D animations and interactive elements
- ✅ Responsive design for all devices
- ✅ PHP admin dashboard for content management
- ✅ Secure file upload system
- ✅ Contact form functionality
- ✅ SEO optimized
- ✅ Fast loading with optimized assets

### 🔄 Updates & Maintenance

To deploy updates:
1. Make your changes to the source code
2. Run `./deploy.sh` to build
3. Upload the new `dist/` contents to your server

### 🏢 Development Credits

**Designed and Developed by [Cyberweb Opera](https://cyberwebopera.com/)**

- **Website:** https://cyberwebopera.com/
- **Phone:** +91 7900742464
- **Email:** info@cyberwebopera.com

---

*This deployment guide ensures your East Ocyon Bio website is properly configured for production hosting with optimal performance and security.* 