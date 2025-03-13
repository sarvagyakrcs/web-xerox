import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { RendererService } from '../core/renderer.service';
import { streamSSE } from 'hono/streaming';
import puppeteer from 'puppeteer';
import { generateDocumentationHTML } from '../docs/template';
import fs from 'fs';
import path from 'path';

// Create Hono app
const app = new Hono();
const rendererService = new RendererService();

// Define validation schema
const urlSchema = z.object({
  url: z.string().url()
});

// Root route - serve documentation
app.get('/', (c) => {
  const html = generateDocumentationHTML();
  return c.html(html);
});

// Serve example files
app.get('/examples/browser-demo.html', (c) => {
  try {
    const filePath = path.resolve(process.cwd(), 'examples/browser-demo.html');
    const content = fs.readFileSync(filePath, 'utf-8');
    return c.html(content);
  } catch (error) {
    return c.text('Example file not found', 404);
  }
});

app.get('/examples/streaming-demo.html', (c) => {
  try {
    const filePath = path.resolve(process.cwd(), 'examples/streaming-demo.html');
    const content = fs.readFileSync(filePath, 'utf-8');
    return c.html(content);
  } catch (error) {
    return c.text('Example file not found', 404);
  }
});

// API info route
app.get('/api', (c) => {
  return c.json({
    message: 'Web Xerox API',
    version: '2.0.0',
    author: 'Sarvagya Kumar',
    website: 'https://thesarvagyakumar.site',
    github: 'https://github.com/sarvagyakrcs',
    endpoints: {
      '/': 'Documentation',
      '/api': 'API information',
      '/source': 'Get webpage source code',
      '/image': 'Get webpage screenshot as JPEG',
      '/render': 'Process webpage and return paths',
      '/stream': 'Stream the rendering process events',
      '/examples/browser-demo.html': 'Browser demo',
      '/examples/streaming-demo.html': 'Streaming demo',
      '/download/source': 'Download webpage source code as HTML file',
      '/download/image': 'Download webpage screenshot as JPEG file'
    }
  });
});

// Get webpage source
app.get('/source', zValidator('query', urlSchema), async (c) => {
  const { url } = c.req.valid('query');
  try {
    const source = await rendererService.getSourceAsString(url);
    return c.text(source, 200, {
      'Content-Type': 'text/html'
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch source' }, 500);
  }
});

// Get webpage screenshot
app.get('/image', zValidator('query', urlSchema), async (c) => {
  const { url } = c.req.valid('query');
  try {
    const buffer = await rendererService.getImageAsBuffer(url);
    return c.body(buffer, 200, {
      'Content-Type': 'image/jpeg'
    });
  } catch (error) {
    return c.json({ error: 'Failed to render image' }, 500);
  }
});

// Download webpage source code
app.get('/download/source', zValidator('query', urlSchema), async (c) => {
  const { url } = c.req.valid('query');
  try {
    const source = await rendererService.getSourceAsString(url);
    const hostname = new URL(url).hostname;
    const filename = `${hostname}-source.html`;
    
    return c.text(source, 200, {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="${filename}"`
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch source for download' }, 500);
  }
});

// Download webpage screenshot
app.get('/download/image', zValidator('query', urlSchema), async (c) => {
  const { url } = c.req.valid('query');
  try {
    const buffer = await rendererService.getImageAsBuffer(url);
    const hostname = new URL(url).hostname;
    const filename = `${hostname}-screenshot.jpg`;
    
    return c.body(buffer, 200, {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${filename}"`
    });
  } catch (error) {
    return c.json({ error: 'Failed to render image for download' }, 500);
  }
});

// Process webpage and return paths
app.post('/render', zValidator('json', urlSchema.extend({
  outputDir: z.string().optional(),
  sourceFilename: z.string().optional(),
  imageFilename: z.string().optional()
})), async (c) => {
  const options = c.req.valid('json');
  try {
    const result = await rendererService.processWebpage(options);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to process webpage' }, 500);
  }
});

// Stream the rendering process
app.get('/stream', zValidator('query', urlSchema), async (c) => {
  const { url } = c.req.valid('query');
  
  return streamSSE(c, async (stream) => {
    try {
      // Start the process
      stream.writeSSE({ event: 'start', data: JSON.stringify({ message: `Processing ${url}` }) });
      
      // Launch browser
      stream.writeSSE({ event: 'progress', data: JSON.stringify({ message: 'Launching browser' }) });
      const browser = await puppeteer.launch();
      
      try {
        const page = await browser.newPage();
        
        // Navigate to URL
        stream.writeSSE({ event: 'progress', data: JSON.stringify({ message: 'Navigating to URL' }) });
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        // Get HTML source
        stream.writeSSE({ event: 'progress', data: JSON.stringify({ message: 'Fetching HTML source' }) });
        const htmlContent = await page.content();
        stream.writeSSE({ 
          event: 'source', 
          data: JSON.stringify({ 
            message: 'HTML source fetched',
            data: htmlContent.substring(0, 200) + '...' // Send preview
          }) 
        });
        
        // Take screenshot
        stream.writeSSE({ event: 'progress', data: JSON.stringify({ message: 'Taking screenshot' }) });
        const imageBuffer = await page.screenshot({ 
          type: 'jpeg',
          quality: 90,
          fullPage: true
        }) as Buffer;
        
        // Send completion event
        stream.writeSSE({ 
          event: 'complete', 
          data: JSON.stringify({ 
            message: 'Process completed',
            sourceSize: htmlContent.length,
            imageSize: imageBuffer.length
          }) 
        });
      } finally {
        await browser.close();
      }
    } catch (error) {
      stream.writeSSE({ event: 'error', data: JSON.stringify({ message: 'An error occurred' }) });
    }
    
    // Close the stream
    stream.close();
  });
});

// Start the server if this file is run directly
if (import.meta.main) {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  console.log(`Web Xerox server is running at http://localhost:${port}`);
  console.log(`Created by Sarvagya Kumar - https://thesarvagyakumar.site`);
  serve({
    fetch: app.fetch,
    port
  });
}

// Export the app
export default app; 