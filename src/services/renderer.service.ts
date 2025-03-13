import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export interface RenderOptions {
  url: string;
  outputDir?: string;
  sourceFilename?: string;
  imageFilename?: string;
}

export class RendererService {
  /**
   * Fetch webpage source and save it to a file
   */
  async fetchSource(url: string, outputDir: string = 'output', filename: string = 'source.html'): Promise<string> {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const htmlContent = await page.content();
      
      const sourcePath = path.join(outputDir, filename);
      fs.writeFileSync(sourcePath, htmlContent);
      
      return sourcePath;
    } finally {
      await browser.close();
    }
  }

  /**
   * Render webpage as JPEG image and save it to a file
   */
  async renderImage(url: string, outputDir: string = 'output', filename: string = 'screenshot.jpg'): Promise<string> {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      const screenshotPath = path.join(outputDir, filename);
      await page.screenshot({ 
        path: screenshotPath,
        type: 'jpeg',
        quality: 90,
        fullPage: true
      });
      
      return screenshotPath;
    } finally {
      await browser.close();
    }
  }

  async getSourceAsString(url: string): Promise<string> {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      return await page.content();
    } finally {
      await browser.close();
    }
  }

  /**
   * Get webpage screenshot as a buffer
   */
  async getImageAsBuffer(url: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });
      return await page.screenshot({ 
        type: 'jpeg',
        quality: 90,
        fullPage: true
      }) as Buffer;
    } finally {
      await browser.close();
    }
  }

  /**
   * Get webpage screenshot as a readable stream
   */
  async getImageAsStream(url: string): Promise<Readable> {
    const buffer = await this.getImageAsBuffer(url);
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  /**
   * Process a webpage - fetch source and render image
   */
  async processWebpage(options: RenderOptions): Promise<{ sourcePath: string; imagePath: string }> {
    const { 
      url, 
      outputDir = 'output', 
      sourceFilename = 'source.html', 
      imageFilename = 'screenshot.jpg' 
    } = options;
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Launch browser
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      
      // Fetch the webpage
      await page.goto(url, { waitUntil: 'networkidle0' });
      
      // Get the HTML source
      const htmlContent = await page.content();
      
      // Save the HTML source
      const sourcePath = path.join(outputDir, sourceFilename);
      fs.writeFileSync(sourcePath, htmlContent);
      
      // Take a screenshot
      const screenshotPath = path.join(outputDir, imageFilename);
      await page.screenshot({ 
        path: screenshotPath,
        type: 'jpeg',
        quality: 90,
        fullPage: true
      });
      
      return { sourcePath, imagePath: screenshotPath };
    } finally {
      await browser.close();
    }
  }
} 