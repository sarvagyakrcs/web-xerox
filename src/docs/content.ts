/**
 * Documentation content for the Web Xerox
 */

export const documentation = {
  title: 'Web Xerox',
  version: '2.0.0',
  description: 'A TypeScript application built with Bun that fetches a webpage\'s source code and exports a rendered version as a JPEG image.',
  
  sections: [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `
        <p>
          Web Xerox is a versatile tool that allows you to fetch a webpage's source code and render it as a JPEG image.
          It provides multiple interfaces for different use cases:
        </p>
        <ul>
          <li><strong>Legacy CLI</strong>: Simple command-line interface for basic usage</li>
          <li><strong>Modern CLI</strong>: Enhanced command-line interface with multiple commands</li>
          <li><strong>REST API</strong>: HTTP API for web applications</li>
          <li><strong>SDK</strong>: Programmatic interface for integration with other applications</li>
          <li><strong>Browser Demo</strong>: Interactive HTML page to test the API directly in a browser</li>
          <li><strong>Streaming Demo</strong>: Real-time visualization of the rendering process</li>
          <li><strong>Export Options</strong>: Download rendered JPEG images and source code</li>
        </ul>
        <p>
          Built with Bun and TypeScript, it leverages Puppeteer for headless browser automation and Hono for the API server.
        </p>
      `
    },
    {
      id: 'installation',
      title: 'Installation',
      content: `
        <h3>Prerequisites</h3>
        <p>Before installing, make sure you have <a href="https://bun.sh/" target="_blank">Bun</a> installed on your system.</p>
        
        <h3>Installation Steps</h3>
        <pre><code>git clone &lt;repository-url&gt;
cd web-xerox
bun install</code></pre>
      `
    },
    {
      id: 'legacy-cli',
      title: 'Legacy CLI (v1.0)',
      content: `
        <p>The original simple CLI version provides a straightforward way to fetch and render webpages.</p>
        
        <h3>Usage</h3>
        <pre><code># Run the legacy version
bun run legacy --url="https://example.com" --output="output" --sourceFile="source.html" --imageFile="screenshot.jpg"

# Run with example URL
bun run legacy:example</code></pre>
        
        <h3>Options</h3>
        <ul>
          <li><code>--url</code>: (Required) URL of the webpage to process</li>
          <li><code>--output</code> or <code>-o</code>: (Optional) Output directory (default: "output")</li>
          <li><code>--sourceFile</code>: (Optional) Filename for the HTML source (default: "source.html")</li>
          <li><code>--imageFile</code>: (Optional) Filename for the screenshot (default: "screenshot.jpg")</li>
        </ul>
      `
    },
    {
      id: 'modern-cli',
      title: 'Modern CLI (v2.0)',
      content: `
        <p>The enhanced CLI provides multiple commands for different operations.</p>
        
        <h3>Usage</h3>
        <pre><code># Show help
bun run cli

# Fetch webpage source
bun run cli:source --url="https://example.com" --output="output" --filename="source.html"

# Render webpage as JPEG
bun run cli:image --url="https://example.com" --output="output" --filename="screenshot.jpg"

# Process webpage (both source and image)
bun run cli:process --url="https://example.com" --output="output" --source="source.html" --image="screenshot.jpg"</code></pre>
        
        <h3>Commands</h3>
        
        <h4>Source Command</h4>
        <p>Fetches the HTML source of a webpage and saves it to a file.</p>
        <ul>
          <li><code>-u, --url &lt;url&gt;</code>: (Required) URL of the webpage to fetch</li>
          <li><code>-o, --output &lt;dir&gt;</code>: (Optional) Output directory (default: "output")</li>
          <li><code>-f, --filename &lt;filename&gt;</code>: (Optional) Output filename (default: "source.html")</li>
        </ul>
        
        <h4>Image Command</h4>
        <p>Renders a webpage as a JPEG image and saves it to a file.</p>
        <ul>
          <li><code>-u, --url &lt;url&gt;</code>: (Required) URL of the webpage to render</li>
          <li><code>-o, --output &lt;dir&gt;</code>: (Optional) Output directory (default: "output")</li>
          <li><code>-f, --filename &lt;filename&gt;</code>: (Optional) Output filename (default: "screenshot.jpg")</li>
        </ul>
        
        <h4>Process Command</h4>
        <p>Fetches the HTML source and renders a webpage as a JPEG image.</p>
        <ul>
          <li><code>-u, --url &lt;url&gt;</code>: (Required) URL of the webpage to process</li>
          <li><code>-o, --output &lt;dir&gt;</code>: (Optional) Output directory (default: "output")</li>
          <li><code>-s, --source &lt;filename&gt;</code>: (Optional) Source filename (default: "source.html")</li>
          <li><code>-i, --image &lt;filename&gt;</code>: (Optional) Image filename (default: "screenshot.jpg")</li>
        </ul>
        
        <h4>Server Command</h4>
        <p>Starts the API server.</p>
        <ul>
          <li><code>-p, --port &lt;port&gt;</code>: (Optional) Port to listen on (default: 3000)</li>
        </ul>
      `
    },
    {
      id: 'api',
      title: 'REST API',
      content: `
        <p>The REST API provides HTTP endpoints for web applications.</p>
        
        <h3>Starting the API Server</h3>
        <pre><code># Start the API server
bun run api

# Start the API server with hot reloading
bun run api:dev

# Or specify a custom port
bun run src/index.ts server --port=8080</code></pre>
        
        <h3>Endpoints</h3>
        
        <h4>GET /</h4>
        <p>Returns API information and available endpoints.</p>
        <pre><code>curl "http://localhost:3000/"</code></pre>
        
        <h4>GET /source</h4>
        <p>Returns the HTML source of a webpage.</p>
        <pre><code>curl "http://localhost:3000/source?url=https://example.com"</code></pre>
        
        <h4>GET /image</h4>
        <p>Returns a JPEG screenshot of a webpage.</p>
        <pre><code>curl "http://localhost:3000/image?url=https://example.com" --output screenshot.jpg</code></pre>
        
        <h4>POST /render</h4>
        <p>Processes a webpage and returns the paths of the saved files.</p>
        <pre><code>curl -X POST "http://localhost:3000/render" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com","outputDir":"output","sourceFilename":"source.html","imageFilename":"screenshot.jpg"}'</code></pre>
        
        <h4>GET /stream</h4>
        <p>Streams the rendering process events using Server-Sent Events (SSE).</p>
        <pre><code>curl "http://localhost:3000/stream?url=https://example.com"</code></pre>
        
        <h4>GET /download/source</h4>
        <p>Downloads the HTML source of a webpage as a file.</p>
        <pre><code>curl "http://localhost:3000/download/source?url=https://example.com" --output webpage.html</code></pre>
        
        <h4>GET /download/image</h4>
        <p>Downloads a JPEG screenshot of a webpage as a file.</p>
        <pre><code>curl "http://localhost:3000/download/image?url=https://example.com" --output webpage.jpg</code></pre>
      `
    },
    {
      id: 'sdk',
      title: 'SDK',
      content: `
        <p>The SDK provides a programmatic interface for integration with other applications.</p>
        
        <h3>Installation</h3>
        <p>The SDK is included in the package and can be imported directly.</p>
        
        <h3>Usage</h3>
        <pre><code>import WebXeroxSDK from './src/sdk';

// Create a new SDK instance
const xerox = new WebXeroxSDK();

// Fetch source
const sourcePath = await xerox.fetchSource('https://example.com', 'output', 'source.html');

// Render image
const imagePath = await xerox.renderImage('https://example.com', 'output', 'screenshot.jpg');

// Get source as string
const source = await xerox.getSourceAsString('https://example.com');

// Get image as buffer
const imageBuffer = await xerox.getImageAsBuffer('https://example.com');

// Process webpage
const result = await xerox.processWebpage({
  url: 'https://example.com',
  outputDir: 'output',
  sourceFilename: 'source.html',
  imageFilename: 'screenshot.jpg'
});</code></pre>
        
        <h3>API Reference</h3>
        
        <h4>WebXeroxSDK</h4>
        <p>The main SDK class.</p>
        
        <h5>constructor()</h5>
        <p>Creates a new WebXeroxSDK instance.</p>
        
        <h5>fetchSource(url, outputDir, filename)</h5>
        <p>Fetches the HTML source of a webpage and saves it to a file.</p>
        <ul>
          <li><code>url</code>: URL of the webpage to fetch</li>
          <li><code>outputDir</code>: Output directory (default: "output")</li>
          <li><code>filename</code>: Output filename (default: "source.html")</li>
          <li>Returns: Promise resolving to the path of the saved file</li>
        </ul>
        
        <h5>renderImage(url, outputDir, filename)</h5>
        <p>Renders a webpage as a JPEG image and saves it to a file.</p>
        <ul>
          <li><code>url</code>: URL of the webpage to render</li>
          <li><code>outputDir</code>: Output directory (default: "output")</li>
          <li><code>filename</code>: Output filename (default: "screenshot.jpg")</li>
          <li>Returns: Promise resolving to the path of the saved image</li>
        </ul>
        
        <h5>getSourceAsString(url)</h5>
        <p>Gets the HTML source of a webpage as a string.</p>
        <ul>
          <li><code>url</code>: URL of the webpage to fetch</li>
          <li>Returns: Promise resolving to the HTML source as a string</li>
        </ul>
        
        <h5>getImageAsBuffer(url)</h5>
        <p>Gets a screenshot of a webpage as a buffer.</p>
        <ul>
          <li><code>url</code>: URL of the webpage to render</li>
          <li>Returns: Promise resolving to the image buffer</li>
        </ul>
        
        <h5>processWebpage(options)</h5>
        <p>Processes a webpage - fetches the HTML source and renders a JPEG image.</p>
        <ul>
          <li><code>options</code>: Render options</li>
          <li>Returns: Promise resolving to the paths of the saved files</li>
        </ul>
        
        <h4>RenderOptions</h4>
        <p>Options for the processWebpage method.</p>
        <ul>
          <li><code>url</code>: URL of the webpage to process</li>
          <li><code>outputDir</code>: Output directory (optional, default: "output")</li>
          <li><code>sourceFilename</code>: Source filename (optional, default: "source.html")</li>
          <li><code>imageFilename</code>: Image filename (optional, default: "screenshot.jpg")</li>
        </ul>
      `
    },
    {
      id: 'examples',
      title: 'Examples',
      content: `
        <p>The package includes several example scripts to demonstrate usage.</p>
        
        <h3>CLI Example</h3>
        <pre><code># Run the CLI example
bun run example</code></pre>
        
        <h3>API Example</h3>
        <pre><code># Run the API example
bun run example:api</code></pre>
        
        <h3>SDK Example</h3>
        <pre><code># Run the SDK example
bun run examples/sdk-example.ts</code></pre>
        
        <h3>Browser Demo</h3>
        <p>The project includes an interactive HTML page to test the API directly in a browser:</p>
        <pre><code># Open the browser demo directly
bun run example:browser

# Or access it through the API server
bun run api
# Then open http://localhost:3000/examples/browser-demo.html in your browser</code></pre>
        <p>The browser demo provides a user-friendly interface to:</p>
        <ul>
          <li>Fetch webpage source code</li>
          <li>Render webpage as JPEG image</li>
          <li>Stream the rendering process with real-time updates</li>
          <li>Download source code and images directly to your device</li>
        </ul>
        <p>Note: The API server must be running for the browser demo to work. Start it with <code>bun run api</code> before opening the demo.</p>
        
        <h3>Streaming Demo</h3>
        <p>The project includes a dedicated streaming demo that visualizes the rendering process in real-time:</p>
        <pre><code># Open the streaming demo directly
bun run example:streaming

# Or access it through the API server
bun run api
# Then open http://localhost:3000/examples/streaming-demo.html in your browser</code></pre>
        <p>The streaming demo provides:</p>
        <ul>
          <li>Visual progress tracking with a progress bar</li>
          <li>Animated event timeline</li>
          <li>Real-time source code preview</li>
          <li>Automatic image display when rendering completes</li>
          <li>Export options for downloading source code and images</li>
        </ul>
        <p>Note: The API server must be running for the streaming demo to work. Start it with <code>bun run api</code> before opening the demo.</p>
      `
    },
    {
      id: 'project-structure',
      title: 'Project Structure',
      content: `
        <pre><code>web-xerox/
├── src/
│   ├── core/           # Core functionality
│   │   └── renderer.service.ts
│   ├── api/            # API implementation
│   │   └── app.ts
│   ├── cli/            # CLI implementation
│   │   └── index.ts
│   ├── legacy/         # Original v1.0 implementation
│   │   ├── app.ts
│   │   └── index.ts
│   ├── sdk/            # SDK implementation
│   │   └── index.ts
│   ├── docs/           # Documentation
│   │   ├── content.ts
│   │   └── template.ts
│   └── index.ts        # Main entry point
├── examples/           # Example scripts
│   ├── api-example.ts
│   ├── sdk-example.ts
│   ├── browser-demo.html
│   ├── streaming-demo.html
│   └── fetch-bun-website.sh
└── package.json</code></pre>
      `
    },
    {
      id: 'changelog',
      title: 'Changelog',
      content: `
        <h3>v2.0.0 (Current)</h3>
        <ul>
          <li><strong>Added</strong>: Hono-powered REST API with multiple endpoints</li>
          <li><strong>Added</strong>: Enhanced CLI with multiple commands using Commander</li>
          <li><strong>Added</strong>: Server-Sent Events (SSE) for streaming progress updates</li>
          <li><strong>Added</strong>: Modular architecture with core renderer service</li>
          <li><strong>Added</strong>: Support for both legacy and modern modes</li>
          <li><strong>Added</strong>: SDK for programmatic usage</li>
          <li><strong>Added</strong>: Interactive browser demo for testing API functionality</li>
          <li><strong>Added</strong>: Real-time streaming demo with visual progress tracking</li>
          <li><strong>Added</strong>: Export options for downloading source code and images</li>
          <li><strong>Added</strong>: Extensive documentation</li>
          <li><strong>Improved</strong>: Better error handling and validation</li>
          <li><strong>Restructured</strong>: Project files for better organization</li>
        </ul>
        
        <h3>v1.0.0 (Legacy)</h3>
        <ul>
          <li><strong>Initial release</strong>: Basic CLI for fetching webpage source and rendering as JPEG</li>
          <li><strong>Features</strong>: Command-line arguments for URL, output directory, and filenames</li>
          <li><strong>Dependencies</strong>: Puppeteer for headless browser automation</li>
        </ul>
      `
    },
    {
      id: 'author',
      title: 'Author',
      content: `
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 bg-gray-50 rounded-lg">
          <div class="flex-shrink-0">
            <div class="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl font-bold">SK</div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Sarvagya Kumar</h3>
            <p class="mb-4">Creator of Web Xerox</p>
            <div class="flex flex-col gap-2">
              <a href="https://thesarvagyakumar.site" target="_blank" class="flex items-center text-blue-600 hover:underline">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Website: thesarvagyakumar.site
              </a>
              <a href="https://github.com/sarvagyakrcs" target="_blank" class="flex items-center text-gray-700 hover:underline">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub: @sarvagyakrcs
              </a>
            </div>
          </div>
        </div>
      `
    }
  ]
}; 