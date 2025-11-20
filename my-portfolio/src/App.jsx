import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, Terminal, Cpu, Globe, Zap, Moon, Sun, 
  Github, Twitter, Linkedin, Mail, ExternalLink, 
  ChevronRight, Hash, Layout, Server, Database,
  Smartphone, Layers, Command, ArrowUpRight, Menu, X
} from 'lucide-react';

// --- 数据源 ---
const PORTFOLIO_DATA = {
  name: "ENTROPY Chen",
  title: "全栈开发工程师",
  bio: "致力于构建高性能、优雅且具有前瞻性的数字体验。专注于 React 生态与 WebGL 交互。",
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Built", value: "40+" },
    { label: "Articles Written", value: "25+" }
  ],
  skills: [
    { name: "Java", icon: <Layout className="w-6 h-6" />, level: 90, color: "text-orange-500" },
    { name: "Python", icon: <Code className="w-6 h-6" />, level: 90, color: "text-yellow-500" },
    { name: "JavaScript", icon: <Code className="w-6 h-6" />, level: 60, color: "text-amber-200" },
    { name: "React / Next.js", icon: <Layout className="w-6 h-6" />, level: 75, color: "text-cyan-400" },
    { name: "TypeScript", icon: <Code className="w-6 h-6" />, level: 70, color: "text-blue-500" },
    { name: "Node.js / GraphQL", icon: <Server className="w-6 h-6" />, level: 70, color: "text-green-400" },
    { name: "Database Design", icon: <Database className="w-6 h-6" />, level: 80, color: "text-orange-400" },
    { name: "Mobile (React Native)", icon: <Smartphone className="w-6 h-6" />, level: 70, color: "text-pink-400" },
  ],
  projects: [
    {
      id: 1,
      title: "Nebula Dashboard",
      category: "SaaS Platform",
      description: "一个基于 AI 的数据分析仪表盘，提供实时洞察和预测模型。",
      tech: ["Next.js", "Tailwind", "OpenAI API", "Recharts"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      id: 2,
      title: "Cyber Commerce",
      category: "E-commerce",
      description: "具有 3D 产品预览功能的无头电商解决方案。",
      tech: ["Shopify Headless", "Three.js", "React"],
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      id: 3,
      title: "Zen Notes",
      category: "Productivity",
      description: "专注于极简主义和本地优先的 Markdown 笔记应用。",
      tech: ["Electron", "React", "SQLite"],
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
      link: "#"
    }
  ],
  posts: [
    {
      id: 1,
      title: "React Server Components 的未来",
      date: "2025-10-24",
      readTime: "5 min read",
      tags: ["React", "Architecture"],
      summary: "深入探讨 RSC 如何改变我们构建 Web 应用的方式，以及它对 SEO 和性能的影响。"
    },
    {
      id: 2,
      title: "掌握 Tailwind CSS 的高级模式",
      date: "2025-11-02",
      readTime: "8 min read",
      tags: ["CSS", "Design System"],
      summary: "不仅仅是实用类——如何利用 Tailwind 构建可维护的大型设计系统。"
    },
    {
      id: 3,
      title: "构建高性能 WebGL 动画",
      date: "2025-11-15",
      readTime: "6 min read",
      tags: ["Three.js", "Performance"],
      summary: "在浏览器中实现 60fps 3D 体验的优化技巧与最佳实践。"
    }
  ]
};

// --- 组件: 动态背景 ---
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] animate-pulse delay-1000" />
    <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] rounded-full bg-blue-600/10 blur-[100px] animate-bounce duration-[10000ms]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
  </div>
);

// --- 组件: 导航栏 ---
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center text-slate-950">
            <Terminal size={18} strokeWidth={3} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 group-hover:to-cyan-300 transition-all">
            ENTROPY.DEV
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="https://github.com/danastychen" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 text-white">
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- 组件: Hero 区域 ---
const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Available for hire
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Future</span> <br />
            Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Reality</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            {PORTFOLIO_DATA.bio}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-white text-slate-950 rounded-lg font-bold hover:bg-cyan-50 transition-colors flex items-center gap-2 group">
              View Projects
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-lg font-bold hover:bg-white/10 transition-colors backdrop-blur-sm">
              Contact Me
            </a>
          </div>

          <div className="flex gap-8 pt-8 border-t border-white/5">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual: 模拟的代码编辑器/终端 */}
        <div className="relative hidden lg:block">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-30 animate-pulse"></div>
          <div className="relative bg-slate-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-white/5 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 text-xs text-slate-500 font-mono flex-1 text-center">developer.tsx</div>
            </div>
            <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-hidden">
              <div className="text-slate-400">
                <span className="text-purple-400">const</span> <span className="text-yellow-200">Developer</span> = <span className="text-blue-400">{`{`}</span>
              </div>
              <div className="pl-6 text-slate-300">
                <span className="text-slate-500">name:</span> <span className="text-green-400">"{PORTFOLIO_DATA.name}"</span>,<br/>
                <span className="text-slate-500">role:</span> <span className="text-green-400">"{PORTFOLIO_DATA.title}"</span>,<br/>
                <span className="text-slate-500">skills:</span> <span className="text-blue-400">[</span><br/>
                <div className="pl-4">
                   <span className="text-green-400">"Java"</span>,  <span className="text-green-400">"Python"</span>, <span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"WebGL"</span>
                </div>
                <span className="text-blue-400">]</span>,<br/>
                <span className="text-slate-500">hardWorker:</span> <span className="text-orange-400">true</span>,<br/>
                <span className="text-slate-500">drinkCoffee:</span> () <span className="text-purple-400">=&gt;</span> <span className="text-yellow-200">nextFeature</span>()
              </div>
              <div className="text-slate-400"><span className="text-blue-400">{`}`}</span>;</div>
              <div className="mt-4 flex items-center gap-2 text-cyan-400 animate-pulse">
                <ChevronRight size={16} />
                <span className="border-r-2 border-cyan-400 pr-1">Compiling success...</span>
              </div>
            </div>
          </div>
          
          {/* 悬浮元素装饰 */}
          <div className="absolute -top-10 -right-10 p-4 bg-slate-800/90 backdrop-blur border border-white/10 rounded-xl shadow-xl animate-bounce duration-[3000ms]">
            <Zap className="text-yellow-400 w-8 h-8" />
          </div>
          <div className="absolute -bottom-5 -left-5 p-4 bg-slate-800/90 backdrop-blur border border-white/10 rounded-xl shadow-xl animate-bounce delay-700 duration-[4000ms]">
            <Code className="text-cyan-400 w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 组件: Bento Grid 技能区 ---
const Skills = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Tech Stack</h2>
          <p className="text-slate-400">我当前首选的技术栈，包括但不限于 React、Node.js、WebGL 等。</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.skills.map((skill, idx) => (
            <div 
              key={idx}
              className="group p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/20 transition-all hover:bg-slate-800/50 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-slate-950 border border-white/5 ${skill.color}`}>
                  {skill.icon}
                </div>
                <span className="text-2xl font-bold text-slate-700 group-hover:text-slate-500 transition-colors">0{idx + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{skill.name}</h3>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-current opacity-80 ${skill.color}`} 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 组件: 项目展示 ---
const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-slate-400 max-w-md">精选的近期项目，展示了从设计到部署的全栈能力。</p>
          </div>
          <a href="#" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium">
            View All <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-500">
              {/* Image Container */}
              <div className="aspect-video overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-white">
                  {project.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-20 -mt-12">
                <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-xl group-hover:translate-y-[-8px] transition-transform duration-300 shadow-2xl">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <ExternalLink className="text-slate-500 group-hover:text-white transition-colors" size={18} />
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium text-slate-300 bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 组件: 博客列表 ---
const Blog = () => {
  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">Latest Thoughts</h2>
        
        <div className="space-y-4">
          {PORTFOLIO_DATA.posts.map((post) => (
            <article 
              key={post.id} 
              className="group relative bg-slate-900/40 border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-slate-800/60 transition-all overflow-hidden"
            >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 max-w-2xl">
                    {post.summary}
                  </p>
                  <div className="flex gap-2 mt-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-cyan-300/80 font-mono before:content-['#']">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white group-hover:bg-cyan-500 group-hover:border-cyan-500 group-hover:rotate-45 transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 组件: 页脚与联系方式 ---
const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's work together.</h2>
            <p className="text-lg text-slate-400 max-w-md mb-8">
              对新项目和合作机会持开放态度。无论你是想讨论创意、咨询代码架构，还是仅仅想打个招呼。
            </p>
            <a 
              href="mailto:hello@ENTROPY.dev" 
              className="inline-flex items-center gap-3 text-2xl font-bold text-white border-b-2 border-cyan-500 pb-1 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
              hello@ENTROPY.dev
            </a>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex gap-4">
              {[
                { icon: <Twitter size={24} />, href: "https://x.com/Elonepoch", label: "Twitter" },
                { icon: <Github size={24} />, href: "https://github.com/DanastyChen", label: "GitHub" },
                { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/", label: "LinkedIn" },
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  aria-label={social.label}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:bg-white hover:text-slate-950 hover:scale-110 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <form className="space-y-4 mt-8">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Subscribe to newsletter" 
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 px-4 bg-white/10 hover:bg-white/20 rounded text-white text-sm font-bold transition-colors">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-500 text-sm">
          <p>&copy; 2025 ENTROPY Chen. Built with React & Tailwind.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- 主入口 ---
export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        :root { font-family: 'Inter', sans-serif; }
        code, pre, .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>
      
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Blog />
      </main>
      
      <Footer />
    </div>
  );
}