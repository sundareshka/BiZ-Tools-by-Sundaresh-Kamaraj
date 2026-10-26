import { useEffect } from 'react';
import { ToolDefinition } from '../data/toolsData.ts';

interface SEOHeadManagerProps {
  activeMainTab: 'home' | 'tools' | 'simulators' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance' | 'author';
  selectedTool?: ToolDefinition;
}

export function SEOHeadManager({ activeMainTab, selectedTool }: SEOHeadManagerProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Helper to update or create meta tags
    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Helper to update or create canonical link
    const setCanonical = (href: string) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // Helper to set JSON-LD schema
    const setJsonLd = (id: string, schemaObj: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schemaObj, null, 2);
    };

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://sundaresh.blog';
    const defaultAuthor = 'Sundaresh Kamaraj';
    const defaultPublisher = 'Elysium Group of Companies';
    const defaultLogoUrl = `${origin}/assets/aistudio/Sundaresh_Kamaraj_Logo-01_840f0755.jpg`;
    const authorImageUrl = `${origin}/assets/aistudio/25_a1d1119e.jpeg`;

    let pageTitle = 'BizTools - 57 Executive Strategy Simulators & MBA Frameworks by Sundaresh Kamaraj';
    let metaDescription = 'BizTools v1.21 by Sundaresh Kamaraj — An interactive simulation platform with 57 executive business frameworks across 10 strategic pillars, 44 crisis missions, 285 quizzes, and 350+ MBA terms.';
    let metaKeywords = 'BizTools, Sundaresh Kamaraj, executive strategy, business simulators, SWOT analysis, Porter Five Forces, Blue Ocean, BCG Matrix, DuPont analysis, Agile Scrum, Six Sigma, MBA frameworks, C-suite tools, Elysium Group';
    let ogImage = defaultLogoUrl;
    let pageUrl = origin;
    let schemaGraph: object[] = [];

    if (activeMainTab === 'author') {
      pageTitle = 'Sundaresh Kamaraj · Author, Serial Entrepreneur, Technologist & Business Mentor | BizTools';
      metaDescription = 'Biography, publications, and professional dossier of Sundaresh Kamaraj, Founder & Chairman of Elysium Group of Companies (est. 1999), author of 30+ books, and creator of the 57 BizTools frameworks.';
      metaKeywords = 'Sundaresh Kamaraj, Elysium Group, tech author, serial entrepreneur Madurai, IT leadership, 30 books, business mentor, keynote speaker, AI cybersecurity, sundaresh.blog, @KaSundaresh';
      ogImage = authorImageUrl;
      pageUrl = `${origin}/?tab=author`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          '@id': `${origin}/?tab=author#profile`,
          name: 'Sundaresh Kamaraj Profile',
          url: `${origin}/?tab=author`,
          mainEntity: {
            '@type': 'Person',
            '@id': 'https://sundaresh.blog/#person',
            name: 'Sundaresh Kamaraj',
            givenName: 'Sundaresh',
            familyName: 'Kamaraj',
            jobTitle: 'Founder & Chairman, Author, Serial Entrepreneur',
            worksFor: {
              '@type': 'Organization',
              name: 'Elysium Group of Companies',
              url: 'https://elysiumgroups.com',
              foundingDate: '1999',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Madurai',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'India'
              }
            },
            alumniOf: [
              {
                '@type': 'EducationalOrganization',
                name: 'Master of Science in Information Technology (M.S.)'
              },
              {
                '@type': 'EducationalOrganization',
                name: 'Bachelor of Engineering in Electronics & Communication (B.E. ECE)'
              }
            ],
            knowsAbout: [
              'Artificial Intelligence',
              'Cybersecurity Architecture',
              'Strategic Management',
              'Digital Transformation',
              'Software Engineering',
              'Venture Incubation'
            ],
            image: authorImageUrl,
            url: 'https://sundaresh.blog',
            sameAs: [
              'https://sundaresh.blog',
              'https://x.com/KaSundaresh',
              'https://www.linkedin.com/in/sundaresh-kamaraj/',
              'https://www.facebook.com/ksundaresh/',
              'https://elysiumgroups.com'
            ],
            description: 'Indian author, serial entrepreneur, technologist, and mentor with 26+ years of IT experience, author of 30+ books, speaker at 200+ seminars, and creator of the 57 BizTools frameworks.'
          }
        }
      ];
    } else if (activeMainTab === 'simulators' && selectedTool) {
      pageTitle = `${selectedTool.name} Interactive Simulator (${selectedTool.category}) | BizTools`;
      metaDescription = `Run real-time simulations for ${selectedTool.name}. ${selectedTool.tagline} ${selectedTool.corePurpose} Benchmarked against ${selectedTool.caseStudy.company}.`;
      metaKeywords = `${selectedTool.name}, ${selectedTool.shortName}, ${selectedTool.category}, business simulator, strategic tool, ${selectedTool.caseStudy.company} case study, Sundaresh Kamaraj, BizTools`;
      pageUrl = `${origin}/?tab=simulators&tool=${selectedTool.id}`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: `${selectedTool.name} Simulator`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'All Web Browsers',
          description: selectedTool.corePurpose,
          creator: {
            '@type': 'Person',
            name: defaultAuthor,
            url: 'https://sundaresh.blog'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: `How to apply ${selectedTool.name} in Strategic Planning`,
          description: selectedTool.howItWorks,
          totalTime: selectedTool.timeToResult || 'PT15M',
          step: [
            {
              '@type': 'HowToStep',
              name: 'Audit Core Baseline Metrics',
              text: `Calibrate input parameters according to ${selectedTool.shortName} analytical mechanics.`
            },
            {
              '@type': 'HowToStep',
              name: 'Stress-Test Strategic Scenarios',
              text: `Model external market shifts and review trade-offs across a ${selectedTool.horizon} horizon.`
            },
            {
              '@type': 'HowToStep',
              name: 'Synthesize Executive Deliverable',
              text: `Generate ${selectedTool.keyOutput} for board alignment and execution.`
            }
          ]
        }
      ];
    } else if (activeMainTab === 'tools' && selectedTool) {
      pageTitle = `${selectedTool.name} C-Suite Implementation Guide & Case Study | BizTools`;
      metaDescription = `Comprehensive methodology guide and C-suite playbook for ${selectedTool.name}. Case study: ${selectedTool.caseStudy.company}. Key deliverable: ${selectedTool.keyOutput}.`;
      metaKeywords = `${selectedTool.name} guide, ${selectedTool.name} methodology, ${selectedTool.caseStudy.company} case study, implementation pitfalls, pro tips, BizTools, Sundaresh Kamaraj`;
      pageUrl = `${origin}/?tab=tools&tool=${selectedTool.id}`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${selectedTool.name} Implementation Guide for C-Suite Executives`,
          description: selectedTool.corePurpose,
          author: {
            '@type': 'Person',
            name: defaultAuthor,
            url: 'https://sundaresh.blog'
          },
          publisher: {
            '@type': 'Organization',
            name: defaultPublisher,
            logo: {
              '@type': 'ImageObject',
              url: defaultLogoUrl
            }
          }
        }
      ];
    } else if (activeMainTab === 'scenarios') {
      pageTitle = '44 Executive Crisis Missions & Strategic Dilemma Wargames | BizTools';
      metaDescription = 'Stress-test boardroom leadership with 44 crisis missions covering hostile takeovers, cybersecurity breaches, liquidity crunches, supply disruptions, and brand fallout.';
      metaKeywords = 'crisis management, strategic wargaming, business scenario planning, executive decision making, crisis dilemmas, MBA simulations, BizTools';
      pageUrl = `${origin}/?tab=scenarios`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'LearningResource',
          name: '44 Executive Crisis Missions & Strategic Wargames',
          description: 'Interactive crisis simulation modules for executive leadership training.',
          author: {
            '@type': 'Person',
            name: defaultAuthor,
            url: 'https://sundaresh.blog'
          }
        }
      ];
    } else if (activeMainTab === 'quizzes') {
      pageTitle = '285 MBA Certification Quizzes & Flashcard Examination Keys | BizTools';
      metaDescription = 'Test and validate strategic mastery across 57 frameworks with 285 deep-dive quiz questions, detailed rationale solutions, and official Pillar Mastery Certificates.';
      metaKeywords = 'MBA certification quizzes, strategic management flashcards, business framework exam, C-suite credential, Sundaresh Kamaraj, BizTools';
      pageUrl = `${origin}/?tab=quizzes`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'Quiz',
          name: 'BizTools 285 Executive Framework Examination',
          description: '285 diagnostic and certification multiple-choice questions assessing business strategy mastery.',
          about: {
            '@type': 'Thing',
            name: 'Strategic Management & Business Operations'
          }
        }
      ];
    } else if (activeMainTab === 'stacks') {
      pageTitle = 'Master 57 Framework Comparison Matrix & Strategy Stacks | BizTools';
      metaDescription = 'Side-by-side benchmark matrix comparing 57 business frameworks across planning horizon, analytical mechanics, decision scope, and strategic synergy.';
      metaKeywords = 'framework comparison matrix, strategy stack, business tools benchmark, SWOT vs Five Forces, DuPont vs Break Even, BizTools';
      pageUrl = `${origin}/?tab=stacks`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'Table',
          name: '57 Executive Framework Comparison Matrix',
          description: 'Analytical benchmark table cross-referencing all 57 frameworks across 10 strategic pillars.'
        }
      ];
    } else if (activeMainTab === 'glossary') {
      pageTitle = '350+ Strategic Management & MBA Terminology Glossary | BizTools';
      metaDescription = 'Searchable reference lexicon of 350+ MBA terms, mathematical formulas, and business concepts with precise definitions, formulas, and real-world examples.';
      metaKeywords = 'MBA glossary, strategic management terms, business dictionary, financial formulas, EBITDA, WACC, DMAIC, TAM SAM SOM, BizTools';
      pageUrl = `${origin}/?tab=glossary`;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          name: 'BizTools Executive Lexicon',
          description: 'Comprehensive 350+ strategic management and business glossary.',
          inDefinedTermSet: `${origin}/?tab=glossary`
        }
      ];
    } else if (activeMainTab === 'performance') {
      pageTitle = 'Executive Learning Performance & Diagnostic Scorecard | BizTools';
      metaDescription = 'Real-time telemetry tracking curriculum completion, simulator dwell time, and diagnostic radar scores across all 10 strategic knowledge pillars.';
      metaKeywords = 'executive scorecard, learning telemetry, strategy audit radar, pillar mastery analytics, BizTools';
      pageUrl = `${origin}/?tab=performance`;
    } else {
      // Home page
      pageTitle = 'BizTools - 57 Executive Strategy Simulators & MBA Frameworks by Sundaresh Kamaraj';
      metaDescription = 'BizTools by Sundaresh Kamaraj — 57 interactive C-Suite strategy simulators across 10 knowledge pillars, 44 crisis dilemmas, 285 certification quizzes, and 350+ MBA terms. 100% private and offline-ready.';
      metaKeywords = 'BizTools, Sundaresh Kamaraj, business simulators, strategy tools, SWOT analysis, Porter Five Forces, Blue Ocean Strategy, DuPont analysis, Agile Scrum, Six Sigma DMAIC, Elysium Group';
      pageUrl = origin;

      schemaGraph = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'BizTools',
          alternateName: 'BizTools by Sundaresh Kamaraj',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'All',
          browserRequirements: 'Requires JavaScript. Requires HTML5.',
          url: origin,
          description: metaDescription,
          creator: {
            '@type': 'Person',
            name: defaultAuthor,
            jobTitle: 'Founder & Chairman, Elysium Group',
            url: 'https://sundaresh.blog',
            sameAs: [
              'https://sundaresh.blog',
              'https://x.com/KaSundaresh',
              'https://www.linkedin.com/in/sundaresh-kamaraj/',
              'https://www.facebook.com/ksundaresh/',
              'https://elysiumgroups.com'
            ]
          },
          publisher: {
            '@type': 'Organization',
            name: defaultPublisher,
            url: 'https://elysiumgroups.com'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is BizTools and who is it designed for?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'BizTools is an interactive executive strategy and simulation platform created by Sundaresh Kamaraj. It converts 57 classical and modern business frameworks across 10 pillars into live interactive laboratories for founders, C-suite executives, management consultants, and MBA candidates.'
              }
            },
            {
              '@type': 'Question',
              name: 'Who created BizTools?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'BizTools was architected and authored by Sundaresh Kamaraj, serial entrepreneur, technologist, and Founder & Chairman of Elysium Group of Companies (founded in 1999 in Madurai, India). He is the author of over 30 technology and business books and has delivered over 200 international motivational seminars.'
              }
            },
            {
              '@type': 'Question',
              name: 'What are the 10 Knowledge Pillars in BizTools?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The 10 Knowledge Pillars comprise: 1. Strategy & Market Positioning, 2. Business Model & Innovation, 3. Marketing & Customer Growth, 4. Operations & Process Excellence, 5. Financial Performance & Valuation, 6. Project & Portfolio Execution, 7. HR & Organizational Design, 8. Risk & Decision Science, 9. Product & Startup Scaling, and 10. Data & Analytics Architecture.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does BizTools store company or executive data on external servers?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. BizTools operates with 100% client-side privacy. All simulation datasets, scenario snapshots, board deck slides, and learning progress are stored strictly in local browser storage (localStorage / IndexedDB), ensuring boardroom-level privacy and offline readiness.'
              }
            }
          ]
        }
      ];
    }

    // Apply document title
    document.title = pageTitle;

    // Apply primary meta tags
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', metaKeywords);
    setMetaTag('name', 'author', defaultAuthor);
    setMetaTag('name', 'publisher', defaultPublisher);
    setMetaTag('name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Geo & AEO Grounding Tags (Elysium Group Headquarters)
    setMetaTag('name', 'geo.region', 'IN-TN');
    setMetaTag('name', 'geo.placename', 'Madurai');
    setMetaTag('name', 'geo.position', '9.9252;78.1198');
    setMetaTag('name', 'ICBM', '9.9252, 78.1198');

    // OpenGraph meta tags
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', activeMainTab === 'author' ? 'profile' : 'website');
    setMetaTag('property', 'og:url', pageUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', 'BizTools by Sundaresh Kamaraj');
    setMetaTag('property', 'og:locale', 'en_US');

    // Twitter / X meta tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@KaSundaresh');
    setMetaTag('name', 'twitter:creator', '@KaSundaresh');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical link
    setCanonical(pageUrl);

    // Apply JSON-LD structured data
    if (schemaGraph.length > 0) {
      setJsonLd('dynamic-seo-ld-json', {
        '@context': 'https://schema.org',
        '@graph': schemaGraph
      });
    }
  }, [activeMainTab, selectedTool]);

  return null;
}
