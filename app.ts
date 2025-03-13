import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { parseArgs } from 'util';

interface AppOptions {
  url: string;
  outputDir: string;
  sourceFilename?: string;
  imageFilename?: string;
}

async function fetchAndRenderWebpage(options: AppOptions): Promise<void> {
  const { url, outputDir, sourceFilename = 'source.html', imageFilename = 'screenshot.jpg' } = options;
  
  console.log(`Fetching and rendering webpage: ${url}`);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    
    console.log('Navigating to URL...');
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    console.log('Fetching HTML source...');
    const htmlContent = await page.content();
    
    const sourcePath = path.join(outputDir, sourceFilename);
    fs.writeFileSync(sourcePath, htmlContent);
    console.log(`HTML source saved to: ${sourcePath}`);
    
    console.log('Taking screenshot...');
    const screenshotPath = path.join(outputDir, imageFilename);
    await page.screenshot({ 
      path: screenshotPath,
      type: 'jpeg',
      quality: 90,
      fullPage: true
    });
    console.log(`Screenshot saved to: ${screenshotPath}`);
    
  } finally {
    await browser.close();
  }
  
  console.log('Process completed successfully!');
}

async function main() {
  try {
    const { values } = parseArgs({
      options: {
        url: { type: 'string' },
        output: { type: 'string', short: 'o', default: 'output' },
        sourceFile: { type: 'string', default: 'source.html' },
        imageFile: { type: 'string', default: 'screenshot.jpg' },
      },
    });

    if (!values.url) {
      console.error('Error: URL is required. Use --url="https://example.com"');
      process.exit(1);
    }

    await fetchAndRenderWebpage({
      url: values.url,
      outputDir: values.output as string,
      sourceFilename: values.sourceFile as string,
      imageFilename: values.imageFile as string,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main(); 