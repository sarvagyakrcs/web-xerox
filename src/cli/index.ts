#!/usr/bin/env bun

import { Command } from 'commander';
import { RendererService } from '../core/renderer.service';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const program = new Command();
const renderer = new RendererService();

program
  .name('webpage-renderer')
  .description('Fetch webpage source and render it as JPEG')
  .version('1.0.0');

program
  .command('source')
  .description('Fetch webpage source code')
  .requiredOption('-u, --url <url>', 'URL of the webpage to fetch')
  .option('-o, --output <dir>', 'Output directory', 'output')
  .option('-f, --filename <filename>', 'Output filename', 'source.html')
  .action(async (options) => {
    try {
      console.log(chalk.blue(`Fetching source from ${options.url}...`));
      const sourcePath = await renderer.fetchSource(options.url, options.output, options.filename);
      console.log(chalk.green(`Source saved to: ${sourcePath}`));
    } catch (error) {
      console.error(chalk.red('Error fetching source:'), error);
      process.exit(1);
    }
  });

program
  .command('image')
  .description('Render webpage as JPEG image')
  .requiredOption('-u, --url <url>', 'URL of the webpage to render')
  .option('-o, --output <dir>', 'Output directory', 'output')
  .option('-f, --filename <filename>', 'Output filename', 'screenshot.jpg')
  .action(async (options) => {
    try {
      console.log(chalk.blue(`Rendering image from ${options.url}...`));
      const imagePath = await renderer.renderImage(options.url, options.output, options.filename);
      console.log(chalk.green(`Image saved to: ${imagePath}`));
    } catch (error) {
      console.error(chalk.red('Error rendering image:'), error);
      process.exit(1);
    }
  });

program
  .command('process')
  .description('Fetch source and render image')
  .requiredOption('-u, --url <url>', 'URL of the webpage to process')
  .option('-o, --output <dir>', 'Output directory', 'output')
  .option('-s, --source <filename>', 'Source filename', 'source.html')
  .option('-i, --image <filename>', 'Image filename', 'screenshot.jpg')
  .action(async (options) => {
    try {
      console.log(chalk.blue(`Processing ${options.url}...`));
      
      const result = await renderer.processWebpage({
        url: options.url,
        outputDir: options.output,
        sourceFilename: options.source,
        imageFilename: options.image
      });
      
      console.log(chalk.green(`Source saved to: ${result.sourcePath}`));
      console.log(chalk.green(`Image saved to: ${result.imagePath}`));
    } catch (error) {
      console.error(chalk.red('Error processing webpage:'), error);
      process.exit(1);
    }
  });

program.parse();

if (process.argv.length <= 2) {
  program.help();
} 