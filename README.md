# Web Xerox

A TypeScript application built with Bun that fetches a webpage's source code and exports a rendered version as a JPEG image. Includes a REST API (built with Hono), a CLI tool, and an SDK for programmatic usage.

## Features

- **Legacy Mode**: Simple CLI for basic webpage rendering
- **Modern CLI**: Enhanced CLI with multiple commands and options
- **REST API**: Hono-powered API with multiple endpoints
- **SDK**: Programmatic interface for integration with other applications
- **Streaming Support**: Server-Sent Events (SSE) for real-time progress updates
- **Documentation**: Comprehensive HTML documentation with Tailwind CSS
- **Modular Architecture**: Core renderer service used by both CLI and API
- **Browser Demo**: Interactive HTML page to test the API directly in a browser
- **Streaming Demo**: Real-time visualization of the rendering process with progress tracking
- **Export Options**: Download rendered JPEG images and source code directly from the browser

## Prerequisites

- [Bun](https://bun.sh/) installed on your system

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd web-xerox
bun install
```

## Usage

### Legacy CLI (v1.0)

The original simple CLI version:

```bash
# Run the legacy version
bun run legacy --url="https://example.com" --output="output" --sourceFile="source.html" --imageFile="screenshot.jpg"

# Run with example URL
bun run legacy:example
```

### Modern CLI (v2.0)

The enhanced CLI with multiple commands:

```bash
# Show help
bun run cli

# Fetch webpage source
bun run cli:source --url="https://example.com" --output="output" --filename="source.html"

# Render webpage as JPEG
bun run cli:image --url="https://example.com" --output="output" --filename="screenshot.jpg"

# Process webpage (both source and image)
bun run cli:process --url="https://example.com" --output="output" --source="source.html" --image="screenshot.jpg"
```

#### CLI Options

Each command has its own set of options:

### API Usage (v2.0)

The application provides a REST API built with Hono:

```bash
# Start the API server
bun run api

# Start the API server with hot reloading
bun run api:dev

# Or specify a custom port
bun run src/index.ts server --port=8080
```

#### API Endpoints

- `GET /`: Documentation (HTML)
- `GET /api`: API information
- `GET /source?url=<url>`: Get webpage source code
- `GET /image?url=<url>`: Get webpage screenshot as JPEG
- `POST /render`: Process webpage and return paths
- `GET /stream?url=<url>`: Stream the rendering process events (SSE)
- `GET /examples/browser-demo.html`: Browser demo
- `GET /examples/streaming-demo.html`: Streaming demo
- `GET /download/source?url=<url>`: Download webpage source code as HTML file
- `GET /download/image?url=<url>`: Download webpage screenshot as JPEG file

#### Examples

##### Get webpage source
```bash
curl "http://localhost:3000/source?url=https://example.com"
```

##### Get webpage screenshot
```bash
curl "http://localhost:3000/image?url=https://example.com" --output screenshot.jpg"
```

##### Process webpage
```bash
curl -X POST "http://localhost:3000/render" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","outputDir":"output","sourceFilename":"source.html","imageFilename":"screenshot.jpg"}'
```

##### Stream rendering process
```bash
curl "http://localhost:3000/stream?url=https://example.com"
```

##### Download source code
```bash
curl "http://localhost:3000/download/source?url=https://example.com" --output webpage.html
```

##### Download image
```bash
curl "http://localhost:3000/download/image?url=https://example.com" --output webpage.jpg
```

### SDK Usage

The SDK provides a programmatic interface for integration with other applications:

```typescript
import WebXeroxSDK from './src/sdk';

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
});
```

### Documentation

The application includes comprehensive HTML documentation:

```bash
# Start the documentation server
bun run docs

# Start the documentation server with hot reloading
bun run docs:dev
```

Then open http://localhost:3000 in your browser to view the documentation.

### Example Scripts

```bash
# Run the CLI example
bun run example

# Run the API example
bun run example:api

# Run the SDK example
bun run example:sdk

# Open the browser demo
bun run example:browser

# Open the streaming demo
bun run example:streaming
```