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
  <style>
    .sidebar {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
    .content {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }
    pre {
      background-color: #f7fafc;
      border-radius: 0.375rem;
      padding: 1rem;
      overflow-x: auto;
    }
    code {
      font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      font-size: 0.875rem;
    }
  </style>
</head>
<body class="bg-gray-100 font-sans">
  <!-- Header -->
  <header class="bg-blue-600 text-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">${title}</h1>
        <p class="text-sm">v${version} by <a href="https://thesarvagyakumar.site" target="_blank" class="underline">Sarvagya Kumar</a></p>
      </div>
      <div class="flex space-x-4">
        <a href="/examples/streaming-demo.html" class="hover:underline flex items-center">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
          </svg>
          Streaming Demo
        </a>
        <a href="/examples/browser-demo.html" class="hover:underline flex items-center">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
          </svg>
          Browser Demo
        </a>
        <a href="https://github.com/sarvagyakrcs" target="_blank" class="hover:underline flex items-center">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        <a href="https://thesarvagyakumar.site" target="_blank" class="hover:underline flex items-center">
          <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          Website
        </a>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row">
    <!-- Sidebar -->
    <div class="w-full md:w-1/4 mb-6 md:mb-0">
      <div class="sidebar bg-white rounded-lg shadow-md p-4">
        <h2 class="text-lg font-semibold mb-4">Contents</h2>
        <nav>
          <ul class="space-y-2">
            ${sections.map(section => `
              <li>
                <a href="#${section.id}" class="block px-2 py-1 rounded hover:bg-blue-100 transition-colors">
                  ${section.title}
                </a>
              </li>
            `).join('')}
            <li class="mt-4 pt-4 border-t border-gray-200">
              <a href="/examples/streaming-demo.html" class="block px-2 py-1 rounded bg-purple-100 hover:bg-purple-200 transition-colors text-purple-700">
                Try Streaming Demo
              </a>
            </li>
            <li>
              <a href="/examples/browser-demo.html" class="block px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition-colors text-blue-700">
                Try Browser Demo
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="w-full md:w-3/4 md:pl-6">
      <div class="content bg-white rounded-lg shadow-md p-6">
        <div class="mb-8">
          <h2 class="text-3xl font-bold mb-4">${title}</h2>
          <p class="text-gray-600">${description}</p>
          <p class="text-sm text-gray-500 mt-2">Created by <a href="https://thesarvagyakumar.site" target="_blank" class="text-blue-600 hover:underline">Sarvagya Kumar</a> | <a href="https://github.com/sarvagyakrcs" target="_blank" class="text-blue-600 hover:underline">@sarvagyakrcs</a></p>
          
          <div class="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="/examples/streaming-demo.html" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-8">
              Try Streaming Demo
            </a>
            <a href="/examples/browser-demo.html" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-8">
              Try Browser Demo
            </a>
          </div>
        </div>

        ${sections.map(section => `
          <section id="${section.id}" class="mb-12">
            <h2 class="text-2xl font-bold mb-4 pb-2 border-b">${section.title}</h2>
            <div class="prose max-w-none">
              ${section.content}
            </div>
          </section>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <p>&copy; ${new Date().getFullYear()} ${title} by <a href="https://thesarvagyakumar.site" target="_blank" class="text-blue-300 hover:underline">Sarvagya Kumar</a>. All rights reserved.</p>
        </div>
        <div class="flex space-x-4">
          <a href="/examples/streaming-demo.html" class="hover:text-purple-300">Streaming Demo</a>
          <a href="/examples/browser-demo.html" class="hover:text-blue-300">Browser Demo</a>
          <a href="https://github.com/sarvagyakrcs" target="_blank" class="hover:text-gray-300">GitHub</a>
          <a href="https://thesarvagyakumar.site" target="_blank" class="hover:text-gray-300">Website</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
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
  </script>
</body>
</html>
  `;
} 