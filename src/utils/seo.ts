// SEO utilities for dynamic meta tag management
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  jsonLd?: object;
}

// Update page title and meta tags dynamically
export const updateSEO = (seoData: SEOData) => {
  // Update title
  if (seoData.title) {
    document.title = seoData.title;
  }

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, isProperty = false) => {
    const attribute = isProperty ? 'property' : 'name';
    let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  // Update canonical link
  const updateCanonical = (url: string) => {
    let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      document.head.appendChild(element);
    }
    
    element.setAttribute('href', url);
  };

  // Update basic meta tags
  if (seoData.description) {
    updateMetaTag('description', seoData.description);
  }

  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords);
  }

  // Update Open Graph tags
  if (seoData.ogTitle) {
    updateMetaTag('og:title', seoData.ogTitle, true);
  }

  if (seoData.ogDescription) {
    updateMetaTag('og:description', seoData.ogDescription, true);
  }

  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, true);
  }

  if (seoData.ogUrl) {
    updateMetaTag('og:url', seoData.ogUrl, true);
  }

  // Update Twitter tags
  if (seoData.twitterTitle) {
    updateMetaTag('twitter:title', seoData.twitterTitle);
  }

  if (seoData.twitterDescription) {
    updateMetaTag('twitter:description', seoData.twitterDescription);
  }

  if (seoData.twitterImage) {
    updateMetaTag('twitter:image', seoData.twitterImage);
  }

  // Update canonical URL
  if (seoData.canonical) {
    updateCanonical(seoData.canonical);
  }

  // Add structured data (JSON-LD)
  if (seoData.jsonLd) {
    // Remove existing JSON-LD script if any
    const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(seoData.jsonLd);
    document.head.appendChild(script);
  }
};

// Default SEO data for different pages
export const defaultSEOData = {
  home: {
    title: 'East Ocyon Bio | Cell & Gene Therapy | CAR-NK Cancer Treatment | India',
    description: 'East Ocyon Bio - Leading cell & gene therapy company in India developing CAR-NK, CRISPR, Gamma Delta T cells & mRNA therapies for cancer, autoimmune & viral infections. Make-in-India next generation treatments.',
    keywords: 'East Ocyon Bio, EastOcyon Bio, cell therapy, gene therapy, CAR-NK, NK cells, natural killer cells, cancer treatment, CRISPR, Gamma Delta T cells, mRNA therapy, biotechnology India',
    canonical: 'https://eastocyonbio.com/',
    ogTitle: 'East Ocyon Bio | Cell & Gene Therapy | CAR-NK Cancer Treatment',
    ogDescription: 'Leading cell & gene therapy company developing CAR-NK, CRISPR, and mRNA therapies for cancer treatment. Bringing curative allogenic cell therapies to India & ROW.',
    ogUrl: 'https://eastocyonbio.com/',
    ogImage: 'https://eastocyonbio.com/logo.png'
  },
  about: {
    title: 'About East Ocyon Bio | Vision & Mission | Cell & Gene Therapy Company',
    description: 'Learn about East Ocyon Bio\'s vision to bring curative allogenic cell therapies to India & ROW. Our mission is to ensure early, affordable and quality access to cell therapies.',
    keywords: 'East Ocyon Bio about, company vision, cell therapy mission, biotechnology company India, NK cells research',
    canonical: 'https://eastocyonbio.com/about',
    ogTitle: 'About East Ocyon Bio | Vision & Mission',
    ogDescription: 'Learn about our vision to bring curative allogenic cell therapies to India & ROW with early, affordable and quality access.',
    ogUrl: 'https://eastocyonbio.com/about'
  },
  technology: {
    title: 'Technology | CAR-NK Cells | CRISPR | mRNA | East Ocyon Bio',
    description: 'Explore East Ocyon Bio\'s cutting-edge technologies: CAR-NK cells, CRISPR gene editing, Gamma Delta T cells, mRNA therapy, and viral vector platforms for cancer treatment.',
    keywords: 'CAR-NK technology, CRISPR gene editing, mRNA therapy, Gamma Delta T cells, viral vector platform, allogenic cell therapy, NK cells enhancement',
    canonical: 'https://eastocyonbio.com/technology',
    ogTitle: 'Technology | CAR-NK Cells | CRISPR | mRNA',
    ogDescription: 'Cutting-edge technologies: CAR-NK cells, CRISPR gene editing, Gamma Delta T cells, mRNA therapy for cancer treatment.',
    ogUrl: 'https://eastocyonbio.com/technology'
  },
  products: {
    title: 'Products | CAR-NK | CRISPR | Gamma Delta T | mRNA | East Ocyon Bio',
    description: 'Discover East Ocyon Bio\'s innovative product portfolio: CAR-NK cell therapies, CRISPR-based treatments, Gamma Delta T cell products, and mRNA therapeutic solutions.',
    keywords: 'CAR-NK products, CRISPR products, Gamma Delta T cell therapy, mRNA therapeutics, cell therapy products, cancer treatment products',
    canonical: 'https://eastocyonbio.com/products',
    ogTitle: 'Products | CAR-NK | CRISPR | Gamma Delta T | mRNA',
    ogDescription: 'Innovative product portfolio: CAR-NK cell therapies, CRISPR-based treatments, Gamma Delta T cell products, and mRNA solutions.',
    ogUrl: 'https://eastocyonbio.com/products'
  },
  team: {
    title: 'Our Team | Leadership | Scientific Advisory Board | East Ocyon Bio',
    description: 'Meet the expert team at East Ocyon Bio including our leadership, scientific advisory board, and team members driving innovation in cell & gene therapy.',
    keywords: 'East Ocyon Bio team, leadership, scientific advisory board, biotech experts, cell therapy researchers, gene therapy scientists',
    canonical: 'https://eastocyonbio.com/team',
    ogTitle: 'Our Team | Leadership | Scientific Advisory Board',
    ogDescription: 'Meet our expert team driving innovation in cell & gene therapy including leadership and scientific advisory board.',
    ogUrl: 'https://eastocyonbio.com/team'
  },
  collaborators: {
    title: 'Collaborators & Investors | Partnerships | East Ocyon Bio',
    description: 'Explore East Ocyon Bio\'s strategic collaborations, partnerships, and investor relationships driving advancement in cell & gene therapy research.',
    keywords: 'East Ocyon Bio collaborators, investors, partnerships, strategic alliances, biotech collaborations, cell therapy partnerships',
    canonical: 'https://eastocyonbio.com/collaborators',
    ogTitle: 'Collaborators & Investors | Partnerships',
    ogDescription: 'Strategic collaborations, partnerships, and investor relationships driving advancement in cell & gene therapy research.',
    ogUrl: 'https://eastocyonbio.com/collaborators'
  },
  news: {
    title: 'News & Blog | Latest Updates | East Ocyon Bio',
    description: 'Stay updated with the latest news, research updates, and blog posts from East Ocyon Bio about cell & gene therapy advancements and company milestones.',
    keywords: 'East Ocyon Bio news, biotech blog, cell therapy updates, gene therapy news, research publications, company announcements',
    canonical: 'https://eastocyonbio.com/news',
    ogTitle: 'News & Blog | Latest Updates',
    ogDescription: 'Latest news, research updates, and blog posts about cell & gene therapy advancements and company milestones.',
    ogUrl: 'https://eastocyonbio.com/news'
  },
  contact: {
    title: 'Contact Us | East Ocyon Bio | Gurugram, Haryana, India',
    description: 'Get in touch with East Ocyon Bio. Contact us for partnerships, collaborations, or inquiries about our cell & gene therapy solutions. Located in Gurugram, Haryana.',
    keywords: 'East Ocyon Bio contact, Gurugram office, Haryana biotech company, cell therapy contact, gene therapy inquiries, partnerships',
    canonical: 'https://eastocyonbio.com/contact',
    ogTitle: 'Contact Us | East Ocyon Bio',
    ogDescription: 'Get in touch for partnerships, collaborations, or inquiries about our cell & gene therapy solutions.',
    ogUrl: 'https://eastocyonbio.com/contact'
  },
  privacyPolicy: {
    title: 'Privacy Policy | East Ocyon Bio | Data Protection & Privacy',
    description: 'Read East Ocyon Bio\'s privacy policy to understand how we collect, use, and protect your personal information in compliance with Indian laws including IT Act 2000.',
    keywords: 'East Ocyon Bio privacy policy, data protection, personal information, IT Act 2000, SPDI Rules 2011, privacy rights India',
    canonical: 'https://eastocyonbio.com/privacy-policy',
    ogTitle: 'Privacy Policy | East Ocyon Bio',
    ogDescription: 'Our privacy policy explains how we collect, use, and protect your personal information in compliance with Indian laws.',
    ogUrl: 'https://eastocyonbio.com/privacy-policy'
  }
};

// Generate breadcrumb JSON-LD
export const generateBreadcrumbJsonLd = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Generate article JSON-LD for news/blog posts
export const generateArticleJsonLd = (article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Organization",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "East Ocyon Bio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://eastocyonbio.com/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image || "https://eastocyonbio.com/logo.png",
    "url": article.url
  };
}; 