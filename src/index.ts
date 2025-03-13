#!/usr/bin/env bun

import { Command } from 'commander';

const program = new Command();

program
  .name('webpage-renderer')
  .description('Fetch webpage source and render it as JPEG')
  .version('2.0.0');

program
  .command('legacy')
  .description('Run the legacy version (simple CLI)')
  .option('-u, --url <url>', 'URL of the webpage to process')
  .option('-o, --output <dir>', 'Output directory', 'output')
  .option('-s, --sourceFile <filename>', 'Source filename', 'source.html')
  .option('-i, --imageFile <filename>', 'Image filename', 'screenshot.jpg')
  .action(async (options) => {
    const args = process.argv.slice(3);
    
    process.argv = [process.argv[0], process.argv[1], ...args];
    await import('./legacy/app');
  });

program
  .command('server')
  .description('Start the API server')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .action(async (options) => {
    try {
      const { default: app } = await import('./api/app');
      const port = parseInt(options.port);
      
      console.log(`Starting server on port ${port}...`);
      
      process.env.PORT = options.port;
      
      const { serve } = await import('@hono/node-server');
      serve({
        fetch: app.fetch,
        port
      });
      
      console.log(`Server running at http://localhost:${port}`);
    } catch (error) {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  });

program
  .command('modern', { isDefault: true })
  .description('Run the modern version (CLI with API capabilities)')
  .allowUnknownOption(true)
  .action(async () => {
    const args = process.argv.filter(arg => arg !== 'modern');
    
    process.argv = args;
    await import('./cli');
  });

program.parse();

if (process.argv.length <= 2) {
  program.help();
} 