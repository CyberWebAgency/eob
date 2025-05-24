# East Ocyon Bio Website Admin Dashboard

This is the admin dashboard for the East Ocyon Bio website (eastocyonbio.com). It provides a complete content management system that allows administrators to manage website content.

## Features

- User authentication (login/logout)
- CRUD operations for:
  - News/Blog posts
  - Team members (with categories: Leadership, Scientific Advisory Board, Team Members)
  - Collaborators/Investors
  - Products (with categories and key features)
  - Technologies
- Image upload functionality
- Responsive design with Bootstrap
- CSRF protection
- Form resubmission prevention

## Setup Instructions

### Prerequisites

- XAMPP, WAMP, MAMP, or another PHP/MySQL environment
- PHP 7.2 or higher
- MySQL 5.7 or higher

### Installation

1. Clone or download this repository to your web server directory (e.g., htdocs for XAMPP)
2. Open your browser and navigate to:
   ```
   http://localhost/EOB/admin/setup_database.php
   ```
3. This will create the necessary database and tables
4. After setup is complete, you can access the admin dashboard at:
   ```
   http://localhost/EOB/admin/login.php
   ```
5. Login with the default credentials:
   - Username: admin
   - Password: admin123

### Upload Directories

If you encounter file upload issues, ensure these directories exist with proper permissions:

```bash
mkdir -p uploads/news uploads/team uploads/products uploads/collaborators uploads/technology
chmod -R 777 uploads
```

## Database Structure

The database includes the following tables:

- `news` - For blog posts and news items
- `team_members` - For team members with type categorization 
- `collaborators` - For partners and investors
- `products` - For product listings with categories and key features
- `technologies` - For technology descriptions
- `admin_users` - For authentication

## Security Features

- Password hashing
- CSRF token protection on all forms
- Session security with regeneration
- POST/Redirect/GET pattern to prevent form resubmission

## User Interface

The admin dashboard uses Bootstrap 4 for responsive design and includes:

- Sidebar navigation
- Mobile-friendly layout
- Image preview functionality
- Flash message system for user feedback
- Form validation

## Directory Structure

```
EOB/
├── admin/              # Admin dashboard files
│   ├── assets/         # CSS, JS, and images for the dashboard
│   ├── includes/       # Reusable PHP components
│   └── pages/          # Admin dashboard pages
├── config/             # Configuration files
├── uploads/            # Uploaded files (images)
└── README.md           # This documentation
```

## Security Considerations

1. **Change Default Password**: Make sure to change the default admin password after the first login.
2. **Secure File Uploads**: The system restricts uploads to image files only (jpg, jpeg, png, gif).
3. **Input Validation**: All user inputs are validated and sanitized to prevent SQL injection.

## Maintenance

- **Database Backup**: Regularly back up your database to prevent data loss.
- **Image Cleanup**: Periodically review and remove unused images from the uploads directory.

## Troubleshooting

- **Permission Issues**: Ensure that the web server has write permissions to the uploads directory.
- **Database Connection**: Check your MySQL credentials in `config/database.php` if you experience connection issues.
- **Image Upload Problems**: Make sure your PHP configuration allows file uploads and has appropriate limits set (upload_max_filesize, post_max_size). 