import React, { useState } from 'react';
import {
  ExternalLink,
  BookOpen,
  Award,
  Globe,
  Linkedin,
  Facebook,
  GraduationCap,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Cpu,
  Brain,
  TrendingUp,
  PlayCircle,
  Activity,
  CheckCircle2,
  Building,
  MapPin,
  Calendar,
  Share2,
  Mail,
  Copy,
  Check,
  MessageSquare,
  Users,
  Send,
  AtSign
} from 'lucide-react';

interface AuthorBiographyViewProps {
  onNavigateTab: (tab: 'home' | 'simulators' | 'tools' | 'scenarios' | 'quizzes' | 'stacks' | 'glossary' | 'performance') => void;
  onOpenAudit: () => void;
}

// Authentic crisp X / Twitter SVG Logo
function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom Rocket Icon for entrepreneurship
function RocketCustom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function AuthorBiographyView({ onNavigateTab, onOpenAudit }: AuthorBiographyViewProps) {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2500);
    }
  };

  const handleShareProfile = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/?tab=author` : 'https://sundaresh.blog';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sundaresh Kamaraj - Author & Entrepreneur Profile',
          text: 'Explore the biography and C-Suite frameworks created by Sundaresh Kamaraj, Founder & Chairman of Elysium Group.',
          url: url
        });
        return;
      } catch {
        // Fall back to clipboard
      }
    }
    handleCopy(url, 'Author Profile Link');
  };

  const socialLinks = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'sundaresh-kamaraj',
      url: 'https://www.linkedin.com/in/sundaresh-kamaraj/',
      badge: 'Professional Network',
      description: 'Connect for executive strategy exchange, board advisory, mentorship, and enterprise innovation partnerships.',
      metrics: '500+ Connections · Industry Thought Leader',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Linkedin,
      primaryAction: 'Connect on LinkedIn',
      copyValue: 'https://www.linkedin.com/in/sundaresh-kamaraj/'
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      handle: '@KaSundaresh',
      url: 'https://x.com/KaSundaresh',
      badge: 'Tech & AI Insights',
      description: 'Follow ongoing commentary on generative AI, cybersecurity developments, startup unit economics, and book releases.',
      metrics: 'Daily Tech Commentary & Analysis',
      color: 'bg-slate-900 hover:bg-black text-white',
      badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
      icon: TwitterXIcon,
      primaryAction: 'Follow @KaSundaresh on X',
      copyValue: 'https://x.com/KaSundaresh'
    },
    {
      id: 'blog',
      name: 'Executive Blog',
      handle: 'sundaresh.blog',
      url: 'https://sundaresh.blog',
      badge: 'Official Publications',
      description: 'Explore long-form essays, practical management models, emerging technology forecasts, and leadership reflections.',
      metrics: 'Articles on AI, Cloud, Strategy & Mentorship',
      color: 'bg-indigo-700 hover:bg-indigo-800 text-white',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Globe,
      primaryAction: 'Visit sundaresh.blog',
      copyValue: 'https://sundaresh.blog'
    },
    {
      id: 'email',
      name: 'Direct Contact & Inquiries',
      handle: 'ka.sundaresh@gmail.com',
      url: 'mailto:ka.sundaresh@gmail.com?subject=Inquiry%20from%20BizTools%20Platform',
      badge: 'Speaking & Advisory',
      description: 'Reach out directly for keynote seminar invitations, university workshop bookings, and corporate consulting.',
      metrics: 'Delivered 200+ Seminars Worldwide',
      color: 'bg-emerald-700 hover:bg-emerald-800 text-white',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: Mail,
      primaryAction: 'Send Email Inquiry',
      copyValue: 'ka.sundaresh@gmail.com'
    }
  ];

  const authorExpertise = [
    {
      title: 'Artificial Intelligence & Data Science',
      desc: 'Architecting machine learning models, predictive intelligence, and cognitive enterprise workflows.',
      icon: Brain,
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    },
    {
      title: 'Cybersecurity & Digital Trust',
      desc: 'Information security architecture, vulnerability defense, enterprise risk management, and governance.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 border-emerald-200 text-emerald-700'
    },
    {
      title: 'Digital Transformation & Software',
      desc: 'Modernizing legacy architectures, cloud-native deployments, and mission-critical software systems.',
      icon: Cpu,
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      title: 'Entrepreneurship & Startup Mentorship',
      desc: 'Guiding founders from zero-to-one, building scalable unit economics, and nurturing innovation ecosystems.',
      icon: RocketCustom,
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      title: 'Strategic Business Leadership',
      desc: 'C-Suite capital allocation, market positioning, competitive moats, and operational excellence.',
      icon: TrendingUp,
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    {
      title: 'Author & Motivational Mentorship',
      desc: 'Author of 30+ books and speaker at 200+ international workshops, universities, and leadership forums.',
      icon: BookOpen,
      color: 'bg-rose-50 border-rose-200 text-rose-700'
    }
  ];

  const milestones = [
    {
      year: '1999',
      title: 'Founded Elysium Group of Companies',
      desc: 'Established Elysium Group in Madurai, Tamil Nadu, India, scaling it into an internationally recognized IT, research, and technical education enterprise.'
    },
    {
      year: '26+ Years',
      title: 'Pioneering Information Technology & Innovation',
      desc: 'Led software development, cybersecurity, emerging tech incubation, and business development across global commercial landscapes.'
    },
    {
      year: '30+ Books',
      title: 'Prolific Author & Thought Leader',
      desc: 'Published extensively on technology architectures, emerging digital trends, entrepreneurship, and professional leadership.'
    },
    {
      year: '200+ Seminars',
      title: 'Global Motivational Speaker & Mentor',
      desc: 'Delivered keynote lectures and workshops for students, researchers, corporate teams, and aspiring startup founders worldwide.'
    },
    {
      year: '2026',
      title: 'BizTools C-Suite Platform Architect',
      desc: 'Designed and curated the comprehensive BizTools simulation ecosystem spanning 57 business frameworks across 10 strategic pillars.'
    }
  ];

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto">
      {/* 1. HERO SECTION: PORTRAIT, EXECUTIVE PROFILE & SOCIAL NETWORKING STRIP */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Author Portrait Image & Key Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-4/5 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 group">
              <img
                src="/assets/aistudio/25_a1d1119e.jpeg"
                alt="Sundaresh Kamaraj - Author, Serial Entrepreneur, Technologist & Business Mentor"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold tracking-wide text-indigo-300 uppercase">
                  Founder & Chairman
                </span>
                <span className="text-lg font-bold">Elysium Group of Companies</span>
                <span className="text-2xs text-slate-300">Madurai, Tamil Nadu, India · Est. 1999</span>
              </div>
            </div>

            {/* Quick Location & Experience Badge */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Madurai, Tamil Nadu, India
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                26+ Years Experience
              </span>
            </div>

            {/* Quick Share Button */}
            <div className="mt-3">
              <button
                onClick={handleShareProfile}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-2xs"
                title="Share this author profile"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Author Profile</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Metrics & Social Connect Bar */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 tracking-wide uppercase flex-wrap">
                <span>Author</span>
                <span>·</span>
                <span>Serial Entrepreneur</span>
                <span>·</span>
                <span>Technologist</span>
                <span>·</span>
                <span>Business Mentor</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
                Sundaresh Kamaraj
              </h1>
              <p className="text-base text-slate-600 font-medium leading-relaxed">
                Founder & Chairman of Elysium Group of Companies with over 26 years of pioneering experience in Information Technology, business innovation, and executive mentorship.
              </p>
            </div>

            {/* Key Metadata Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-2xs font-bold uppercase text-slate-400 block tracking-wider">Experience</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">26+ Years</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-2xs font-bold uppercase text-slate-400 block tracking-wider">Books Authored</span>
                <span className="text-lg font-extrabold text-indigo-700 font-mono">30+ Books</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-2xs font-bold uppercase text-slate-400 block tracking-wider">Seminars & Talks</span>
                <span className="text-lg font-extrabold text-emerald-700 font-mono">200+</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-2xs font-bold uppercase text-slate-400 block tracking-wider">Venture</span>
                <span className="text-lg font-extrabold text-slate-900 font-mono">Elysium Group</span>
              </div>
            </div>

            {/* Narrative Prose */}
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Sundaresh Kamaraj is an Indian entrepreneur, author, technologist, and business mentor whose career spans over two and a half decades of relentless technological leadership. In 1999, he established the <span className="font-semibold text-slate-900">Elysium Group of Companies</span> in Madurai, Tamil Nadu, developing it into a powerhouse across IT solutions, software research, and higher-education enablement.
              </p>
              <p>
                As a prolific author and thought leader, Sundaresh has written more than 30 books analyzing digital trends, technology commercialization, entrepreneurship, and career mastery. His deep passion for education and startup enablement has led him to conduct over 200 motivational workshops and seminars, equipping the next generation of engineers, researchers, and executive leaders with practical tools to conquer modern market challenges.
              </p>
              <p>
                A lifelong learner and global traveler, he conceptualized <span className="font-bold text-slate-900">BizTools</span> to distill 57 classical and contemporary C-Suite frameworks across 10 strategic pillars into zero-latency interactive simulators—transforming textbook models into actionable boardroom decisions.
              </p>
            </div>

            {/* Consolidated Social & Networking Quick Buttons */}
            <div className="space-y-2 pt-2">
              <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span>Professional Networking Channels</span>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                {/* LinkedIn Pill */}
                <a
                  href="https://www.linkedin.com/in/sundaresh-kamaraj/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer group/btn"
                  title="Connect with Sundaresh Kamaraj on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                {/* Twitter / X Pill */}
                <a
                  href="https://x.com/KaSundaresh"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer group/btn"
                  title="Follow @KaSundaresh on X"
                >
                  <TwitterXIcon className="w-3.5 h-3.5 text-white" />
                  <span>Twitter / X</span>
                  <span className="text-3xs font-mono font-normal opacity-80 hidden sm:inline">@KaSundaresh</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                {/* Personal Blog Pill */}
                <a
                  href="https://sundaresh.blog"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer group/btn"
                  title="Read strategy essays and books at sundaresh.blog"
                >
                  <Globe className="w-4 h-4 text-indigo-300" />
                  <span>sundaresh.blog</span>
                  <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                </a>

                {/* Direct Email Pill */}
                <a
                  href="mailto:ka.sundaresh@gmail.com?subject=Networking%20Inquiry%20via%20BizTools"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer group/btn"
                  title="Send networking inquiry or seminar request"
                >
                  <Mail className="w-4 h-4 text-emerald-100" />
                  <span>Email</span>
                  <span className="text-3xs font-mono font-normal opacity-80 hidden md:inline">ka.sundaresh@gmail.com</span>
                </a>

                {/* Elysium Group Link */}
                <a
                  href="https://elysiumgroups.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  title="Visit Elysium Group of Companies official portal"
                >
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>Elysium Group</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* Facebook Link */}
                <a
                  href="https://www.facebook.com/ksundaresh/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-white hover:bg-blue-50 text-blue-800 border border-slate-300 font-semibold text-xs rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
                  title="Sundaresh Kamaraj on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SOCIAL MEDIA & PROFESSIONAL NETWORKING HUB */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <Users className="w-4 h-4" />
              <span>Connect & Collaborate</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1 font-display">
              Social Media & Professional Networking Hub
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Connect directly with Sundaresh Kamaraj across primary networking channels for executive mentorship, research discussions, keynote seminars, and tech innovation.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xs font-mono font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              4 Primary Channels
            </span>
          </div>
        </div>

        {/* 4 Rich Networking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            const isCopied = copiedLabel === link.id;

            return (
              <div
                key={link.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-indigo-300 transition-all shadow-2xs hover:shadow-xs space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${link.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">{link.name}</h3>
                          <span className={`text-3xs font-extrabold uppercase px-2 py-0.5 rounded font-mono border ${link.badgeClass}`}>
                            {link.badge}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5 flex items-center gap-1">
                          <AtSign className="w-3 h-3 text-slate-400" />
                          <span>{link.handle}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description & Metrics */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {link.description}
                  </p>

                  <div className="text-2xs font-semibold text-slate-500 bg-white/80 p-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{link.metrics}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${link.color}`}
                  >
                    <span>{link.primaryAction}</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <button
                    onClick={() => handleCopy(link.copyValue, link.id)}
                    className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer shrink-0"
                    title={`Copy ${link.name} address/handle`}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. ACADEMIC & PROFESSIONAL CREDENTIALS */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Academic Background & Core Leadership
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Dual degrees in engineering and advanced computing paired with 26+ years of venture stewardship.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Degree 1 */}
          <div className="p-5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono">
                Graduate Degree
              </span>
              <span className="text-2xs font-medium text-slate-500">M.S. in Information Technology</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Master of Science in Information Technology (M.S.)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Specialized in distributed computational models, data engineering, software development life cycles, and strategic technology commercialization.
            </p>
          </div>

          {/* Degree 2 */}
          <div className="p-5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xs font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono">
                Undergraduate Degree
              </span>
              <span className="text-2xs font-medium text-slate-500">B.E. in Electronics & Communication</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Bachelor of Engineering (B.E. in ECE)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigorous foundational training in electronics, microprocessors, communication protocols, signal processing, and systems engineering.
            </p>
          </div>
        </div>
      </section>

      {/* 4. AREAS OF PROFESSIONAL EXPERTISE */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Domains of Expertise & Technical Mastery
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Key disciplines cultivated over 26+ years across enterprise software, venture leadership, and authoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {authorExpertise.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${exp.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{exp.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CAREER MILESTONES & JOURNEY */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            Career Milestones & Institutional Leadership
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            From the inception of Elysium Group in 1999 to curating the 57 BizTools C-Suite frameworks.
          </p>
        </div>

        <div className="space-y-4">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="p-4 bg-slate-50/80 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900">
                    {m.year}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{m.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed sm:pl-0 pl-1">
                  {m.desc}
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 hidden sm:block opacity-60" />
            </div>
          ))}
        </div>
      </section>

      {/* 6. THE BIZTOOLS CURRICULUM PHILOSOPHY */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-2xs font-extrabold uppercase tracking-widest text-indigo-300">
            Platform Vision by Sundaresh Kamaraj
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            "Bridging Emerging Technologies & Boardroom Execution"
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            "For decades, business education taught strategy through static diagrams and theoretical slides. Leaders memorized SWOT, Porter's Five Forces, or the DuPont identity without experiencing how an operational lever pulls a financial outcome. BizTools was born from the conviction that every business framework must be a dynamic, interactive laboratory. By combining mathematical models, real-world case data, crisis dilemmas, and 100% offline local privacy, we empower executives, founders, and students to simulate high-stakes bets before committing capital."
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 bg-white/10 rounded-xl border border-white/15">
            <span className="text-3xs text-indigo-200 block uppercase font-bold tracking-wider">Pillars</span>
            <span className="text-lg font-bold font-mono text-white">10 Disciplines</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/15">
            <span className="text-3xs text-indigo-200 block uppercase font-bold tracking-wider">Simulators</span>
            <span className="text-lg font-bold font-mono text-white">57 Interactive Tools</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/15">
            <span className="text-3xs text-indigo-200 block uppercase font-bold tracking-wider">Missions</span>
            <span className="text-lg font-bold font-mono text-white">44 Crisis Dilemmas</span>
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/15">
            <span className="text-3xs text-indigo-200 block uppercase font-bold tracking-wider">Knowledge Base</span>
            <span className="text-lg font-bold font-mono text-white">285 Qs & 350+ Terms</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
            <span>Author Channels:</span>
            <a
              href="https://www.linkedin.com/in/sundaresh-kamaraj/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span>·</span>
            <a
              href="https://x.com/KaSundaresh"
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 hover:text-white font-semibold flex items-center gap-1 transition-colors"
            >
              <TwitterXIcon className="w-3.5 h-3.5" />
              <span>Twitter / X (@KaSundaresh)</span>
            </a>
            <span>·</span>
            <a
              href="https://sundaresh.blog"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-300 hover:text-white font-bold underline transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>sundaresh.blog</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('simulators')}
              className="px-5 py-2.5 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <PlayCircle className="w-4 h-4 text-emerald-600" />
              <span>Explore 57 Simulators</span>
            </button>
            <button
              onClick={onOpenAudit}
              className="px-4 py-2.5 bg-indigo-800 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-indigo-300" />
              <span>Strategy Health Audit (A)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating Toast Notification when copying social link or handle */}
      {copiedLabel && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white leading-tight">Copied to Clipboard</div>
            <div className="text-3xs text-slate-300 font-normal">
              {copiedLabel === 'linkedin' && 'LinkedIn Profile URL copied!'}
              {copiedLabel === 'twitter' && 'Twitter/X Profile URL copied!'}
              {copiedLabel === 'blog' && 'Blog URL (sundaresh.blog) copied!'}
              {copiedLabel === 'email' && 'Email address copied!'}
              {copiedLabel !== 'linkedin' && copiedLabel !== 'twitter' && copiedLabel !== 'blog' && copiedLabel !== 'email' && `${copiedLabel} copied!`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
