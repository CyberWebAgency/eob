#!/bin/bash

# East Ocyon Bio - Deployment Script
# Designed and developed by Cyberweb Opera (https://cyberwebopera.com/)

echo "🧬 East Ocyon Bio - SEO Optimized Deployment Script"
echo "===================================================\n"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not in PATH"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "\n🔧 Building the SEO-optimized application..."
npm run build

if [ $? -eq 0 ]; then
    echo "\n✅ Build completed successfully!"
    echo "\n📁 Built files are located in the 'dist' directory"
    echo "\n🚀 Deployment Instructions:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "For hosting at https://eastocyonbio.com/:"
    echo ""
    echo "1. Upload all files from the 'dist' directory to your web server"
    echo "2. Upload the '.htaccess' file to handle React Router routing & SEO"
    echo "3. Upload the 'admin', 'api', 'uploads', and 'config' directories for PHP backend"
    echo "4. Ensure your web server has PHP and MySQL configured"
    echo "5. Configure database settings in config/database.php if needed"
    echo ""
    echo "🔍 SEO FILES INCLUDED:"
    echo "• robots.txt - Search engine crawler instructions"
    echo "• sitemap.xml - Complete site structure for search engines"
    echo "• manifest.json - Progressive Web App configuration"
    echo "• Comprehensive meta tags, Open Graph, Twitter Cards"
    echo "• Structured data (JSON-LD) for rich snippets"
    echo "• Dynamic SEO with React Router integration"
    echo ""
    echo "🎯 PRIMARY KEYWORDS OPTIMIZED:"
    echo "• East Ocyon Bio, EastOcyon Bio"
    echo "• Cell therapy, Gene therapy, CAR-NK, NK cells"
    echo "• CRISPR, mRNA therapy, Gamma Delta T cells"
    echo "• Cancer treatment India, Biotechnology Gurugram"
    echo "• Make-in-India biotech, Allogenic cell therapy"
    echo ""
    echo "📱 Social Media Links (already configured):"
    echo "• Instagram: https://www.instagram.com/eastocyonbio/"
    echo "• Twitter: https://twitter.com/eastocyonbio"  
    echo "• LinkedIn: https://www.linkedin.com/company/east-ocyon-bio-private-limited/"
    echo ""
    echo "🏢 Contact Information (already configured):"
    echo "• Email: dinesh.kundu@eastocyonbio.com"
    echo "• Phone: +91 9718420441"
    echo "• Address: DCG2-1014, DLF Corporate Greens, Sec-74A, Gurugram - 122004, Haryana"
    echo ""
    echo "📊 SEO PERFORMANCE FEATURES:"
    echo "• Page-specific meta tags and descriptions"
    echo "• Local SEO optimization for India/Haryana/Gurugram"
    echo "• Mobile-first responsive design"
    echo "• Fast loading with optimized assets"
    echo "• Core Web Vitals optimization"
    echo "• Security headers for better rankings"
    echo ""
    echo "📈 NEXT STEPS FOR BETTER SEO:"
    echo "1. Set up Google Analytics and Search Console"
    echo "2. Submit sitemap to search engines"
    echo "3. Create Google My Business listing"
    echo "4. Regular content updates and blog posts"
    echo "5. Monitor keyword rankings and performance"
    echo ""
    echo "💻 Developed by Cyberweb Opera"
    echo "   Website: https://cyberwebopera.com/"
    echo "   Contact: +91 7900742464"
    echo "   Specialized in SEO-optimized biotech websites"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
    echo "\n❌ Build failed! Please check the errors above."
    exit 1
fi 