/**
 * HTML template for the documentation
 */

import { documentation } from './content';

export function generateDocumentationHTML(): string {
  const { title, version, description, sections } = documentation;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Documentation</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #4f46e5;
      --primary-hover: #4338ca;
      --secondary-color: #8b5cf6;
      --secondary-hover: #7c3aed;
      --dark-bg: #1e293b;
      --light-bg: #f8fafc;
      --card-bg: #ffffff;
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --text-light: #f8fafc;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--light-bg);
      color: var(--text-primary);
      scroll-behavior: smooth;
    }
    
    .sidebar {
      height: calc(100vh - 70px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--secondary-color) transparent;
    }
    
    .sidebar::-webkit-scrollbar {
      width: 6px;
    }
    
    .sidebar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .sidebar::-webkit-scrollbar-thumb {
      background-color: var(--secondary-color);
      border-radius: 6px;
    }
    
    .content {
      height: calc(100vh - 70px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--primary-color) transparent;
    }
    
    .content::-webkit-scrollbar {
      width: 6px;
    }
    
    .content::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .content::-webkit-scrollbar-thumb {
      background-color: var(--primary-color);
      border-radius: 6px;
    }
    
    pre {
      background-color: #f1f5f9;
      border-radius: 0.5rem;
      padding: 1.25rem;
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      margin: 1.5rem 0;
    }
    
    code {
      font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.875rem;
      color: #334155;
    }
    
    .nav-link {
      position: relative;
      transition: all 0.2s ease;
    }
    
    .nav-link:hover {
      transform: translateX(4px);
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 5px 0 5px 6px;
      border-color: transparent transparent transparent var(--primary-color);
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    .nav-link:hover::before {
      opacity: 1;
    }
    
    .gradient-heading {
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      display: inline-block;
    }
    
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .demo-button {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .demo-button::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    
    .demo-button:hover::after {
      transform: translateX(0);
    }
    
    .section-divider {
      height: 4px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 2px;
      margin: 2rem 0;
      width: 100px;
    }
    
    .prose h3 {
      color: var(--primary-color);
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }
    
    .prose p {
      margin-bottom: 1.25rem;
      line-height: 1.7;
    }
    
    .prose ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin-bottom: 1.25rem;
    }
    
    .prose li {
      margin-bottom: 0.5rem;
    }
    
    .prose a {
      color: var(--primary-color);
      text-decoration: none;
      border-bottom: 1px dotted var(--primary-color);
      transition: border-bottom 0.2s ease;
    }
    
    .prose a:hover {
      border-bottom: 1px solid var(--primary-color);
    }
    
    @media (max-width: 768px) {
      .sidebar, .content {
        height: auto;
      }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-5 flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">${title}</h1>
        <p class="text-sm mt-1 opacity-90">v${version} by <a href="https://thesarvagyakumar.site" target="_blank" class="underline hover:text-white transition-colors">Sarvagya Kumar</a></p>
      </div>
      <div class="hidden md:flex space-x-6">
        <a href="/examples/streaming-demo.html" class="hover:text-white transition-colors flex items-center group">
          <i class="fas fa-stream mr-2 group-hover:animate-pulse"></i>
          Streaming Demo
        </a>
        <a href="/examples/browser-demo.html" class="hover:text-white transition-colors flex items-center group">
          <i class="fas fa-window-maximize mr-2 group-hover:animate-pulse"></i>
          Browser Demo
        </a>
        <a href="https://github.com/sarvagyakrcs" target="_blank" class="hover:text-white transition-colors flex items-center group">
          <i class="fab fa-github mr-2 group-hover:animate-pulse"></i>
          GitHub
        </a>
        <a href="https://thesarvagyakumar.site" target="_blank" class="hover:text-white transition-colors flex items-center group">
          <i class="fas fa-globe mr-2 group-hover:animate-pulse"></i>
          Website
        </a>
      </div>
      <button class="md:hidden text-white focus:outline-none" id="mobile-menu-button">
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>
    <!-- Mobile menu -->
    <div class="md:hidden hidden bg-indigo-700 py-4 px-4" id="mobile-menu">
      <nav class="flex flex-col space-y-3">
        <a href="/examples/streaming-demo.html" class="text-white hover:text-indigo-200 flex items-center">
          <i class="fas fa-stream mr-2"></i>
          Streaming Demo
        </a>
        <a href="/examples/browser-demo.html" class="text-white hover:text-indigo-200 flex items-center">
          <i class="fas fa-window-maximize mr-2"></i>
          Browser Demo
        </a>
        <a href="https://github.com/sarvagyakrcs" target="_blank" class="text-white hover:text-indigo-200 flex items-center">
          <i class="fab fa-github mr-2"></i>
          GitHub
        </a>
        <a href="https://thesarvagyakumar.site" target="_blank" class="text-white hover:text-indigo-200 flex items-center">
          <i class="fas fa-globe mr-2"></i>
          Website
        </a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div class="w-full md:w-1/4 mb-6 md:mb-0">
      <div class="sidebar bg-white rounded-xl shadow-md p-5 sticky top-4">
        <h2 class="text-xl font-bold mb-5 text-indigo-700 flex items-center">
          <i class="fas fa-book-open mr-2"></i>
          Contents
        </h2>
        <nav>
          <ul class="space-y-2">
            ${sections.map(section => `
              <li>
                <a href="#${section.id}" class="nav-link block px-3 py-2 rounded-lg hover:bg-indigo-50 transition-all text-gray-700 hover:text-indigo-700 font-medium">
                  ${section.title}
                </a>
              </li>
            `).join('')}
            <li class="mt-6 pt-4 border-t border-gray-200">
              <a href="/examples/streaming-demo.html" class="demo-button block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all text-white font-medium text-center shadow-md">
                <i class="fas fa-stream mr-2"></i>
                Try Streaming Demo
              </a>
            </li>
            <li class="mt-3">
              <a href="/examples/browser-demo.html" class="demo-button block px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all text-white font-medium text-center shadow-md">
                <i class="fas fa-window-maximize mr-2"></i>
                Try Browser Demo
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="w-full md:w-3/4 md:pl-8">
      <div class="content bg-white rounded-xl shadow-md p-8">
        <div class="mb-10">
          <span class="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">Documentation</span>
          <h2 class="text-4xl font-bold mb-4 gradient-heading">${title}</h2>
          <div class="section-divider"></div>
          <p class="text-gray-600 text-lg mt-4">${description}</p>
          <p class="text-sm text-gray-500 mt-3">Created by <a href="https://thesarvagyakumar.site" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">Sarvagya Kumar</a> | <a href="https://github.com/sarvagyakrcs" target="_blank" class="text-indigo-600 hover:text-indigo-800 font-medium">@sarvagyakrcs</a></p>
          
          <div class="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="/examples/streaming-demo.html" class="demo-button inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 md:py-4 md:text-lg md:px-8 shadow-md">
              <i class="fas fa-stream mr-2"></i>
              Try Streaming Demo
            </a>
            <a href="/examples/browser-demo.html" class="demo-button inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 md:py-4 md:text-lg md:px-8 shadow-md">
              <i class="fas fa-window-maximize mr-2"></i>
              Try Browser Demo
            </a>
          </div>
        </div>

        ${sections.map(section => `
          <section id="${section.id}" class="mb-16 card p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <h2 class="text-2xl font-bold mb-4 text-indigo-700 flex items-center">
              <i class="fas fa-bookmark mr-3 text-indigo-500"></i>
              ${section.title}
            </h2>
            <div class="section-divider"></div>
            <div class="prose max-w-none mt-6">
              ${section.content}
            </div>
          </section>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-10">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
          <div class="flex items-center mb-3">
            <span class="text-2xl font-bold mr-2">${title}</span>
            <span class="text-xs bg-indigo-600 px-2 py-1 rounded-full">v${version}</span>
          </div>
          <p class="text-gray-300">&copy; ${new Date().getFullYear()} by <a href="https://thesarvagyakumar.site" target="_blank" class="text-indigo-300 hover:text-indigo-200 transition-colors">Sarvagya Kumar</a>. All rights reserved.</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <a href="/examples/streaming-demo.html" class="hover:text-indigo-300 transition-colors flex items-center">
            <i class="fas fa-stream mr-2"></i>
            Streaming Demo
          </a>
          <a href="/examples/browser-demo.html" class="hover:text-indigo-300 transition-colors flex items-center">
            <i class="fas fa-window-maximize mr-2"></i>
            Browser Demo
          </a>
          <a href="https://github.com/sarvagyakrcs" target="_blank" class="hover:text-indigo-300 transition-colors flex items-center">
            <i class="fab fa-github mr-2"></i>
            GitHub
          </a>
          <a href="https://thesarvagyakumar.site" target="_blank" class="hover:text-indigo-300 transition-colors flex items-center">
            <i class="fas fa-globe mr-2"></i>
            Website
          </a>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>Built with <i class="fas fa-heart text-red-500"></i> using modern web technologies</p>
      </div>
    </div>
  </footer>

  <script>
    // Mobile menu toggle
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.toggle('hidden');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const contentContainer = document.querySelector('.content');
          const targetPosition = targetElement.offsetTop;
          
          contentContainer.scrollTo({
            top: targetPosition - 20,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add active state to current section in sidebar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const contentContainer = document.querySelector('.content');
    contentContainer.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (contentContainer.scrollTop >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('bg-indigo-50', 'text-indigo-700');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
          link.classList.add('bg-indigo-50', 'text-indigo-700');
        }
      });
    });
  </script>
</body>
</html>
  `;
} 