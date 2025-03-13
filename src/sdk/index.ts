/**
 * Webpage Renderer SDK
 * 
 * This SDK provides a programmatic way to use the webpage renderer functionality.
 * It can be used in other applications to fetch webpage source and render images.
 */

import { RendererService } from '../core/renderer.service';
import type { RenderOptions } from '../core/renderer.service';

export class WebpageRendererSDK {
  private renderer: RendererService;

  /**
   * Create a new WebpageRendererSDK instance
   */
  constructor() {
    this.renderer = new RendererService();
  }

  /**
   * Fetch webpage source and save it to a file
   * 
   * @param url - URL of the webpage to fetch
   * @param outputDir - Output directory (default: 'output')
   * @param filename - Output filename (default: 'source.html')
   * @returns Promise resolving to the path of the saved file
   */
  async fetchSource(url: string, outputDir: string = 'output', filename: string = 'source.html'): Promise<string> {
    return this.renderer.fetchSource(url, outputDir, filename);
  }

  /**
   * Render webpage as JPEG image and save it to a file
   * 
   * @param url - URL of the webpage to render
   * @param outputDir - Output directory (default: 'output')
   * @param filename - Output filename (default: 'screenshot.jpg')
   * @returns Promise resolving to the path of the saved image
   */
  async renderImage(url: string, outputDir: string = 'output', filename: string = 'screenshot.jpg'): Promise<string> {
    return this.renderer.renderImage(url, outputDir, filename);
  }

  /**
   * Get webpage source as a string
   * 
   * @param url - URL of the webpage to fetch
   * @returns Promise resolving to the HTML source as a string
   */
  async getSourceAsString(url: string): Promise<string> {
    return this.renderer.getSourceAsString(url);
  }

  /**
   * Get webpage screenshot as a buffer
   * 
   * @param url - URL of the webpage to render
   * @returns Promise resolving to the image buffer
   */
  async getImageAsBuffer(url: string): Promise<Buffer> {
    return this.renderer.getImageAsBuffer(url);
  }

  /**
   * Process a webpage - fetch source and render image
   * 
   * @param options - Render options
   * @returns Promise resolving to the paths of the saved files
   */
  async processWebpage(options: RenderOptions): Promise<{ sourcePath: string; imagePath: string }> {
    return this.renderer.processWebpage(options);
  }
}

// Export the SDK class
export default WebpageRendererSDK;

// Export types from the core service
export type { RenderOptions } from '../core/renderer.service'; 