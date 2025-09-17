#!/usr/bin/env node

/**
 * Build script for AqlBot CDN Widget
 * Minifies and optimizes the widget for production use
 */

const fs = require('fs');
const path = require('path');

// Simple minification function (basic implementation)
function minifyJS(code) {
  return code
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:])\s*/g, '$1')
    .replace(/;\s*}/g, '}')
    // Remove trailing semicolons before }
    .replace(/;\s*}/g, '}')
    .trim();
}

function minifyCSS(code) {
  return code
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove unnecessary whitespace
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:])\s*/g, '$1')
    .replace(/;\s*}/g, '}')
    .replace(/}\s*/g, '}')
    .replace(/{\s*/g, '{')
    .trim();
}

function build() {
  console.log('🚀 Building AqlBot CDN Widget...');
  
  const srcPath = path.join(__dirname, 'src', 'chatbot-widget.js');
  const distPath = path.join(__dirname, 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  try {
    // Read source file
    const sourceCode = fs.readFileSync(srcPath, 'utf8');
    
    // Create development version (with comments and formatting)
    const devPath = path.join(distPath, 'aqlbot-widget.js');
    fs.writeFileSync(devPath, sourceCode);
    console.log('✅ Created development version: aqlbot-widget.js');
    
    // Create minified version
    const minifiedCode = minifyJS(sourceCode);
    const minPath = path.join(distPath, 'aqlbot-widget.min.js');
    fs.writeFileSync(minPath, minifiedCode);
    console.log('✅ Created minified version: aqlbot-widget.min.js');
    
    // Create version with integrity hash
    const crypto = require('crypto');
    const hash = crypto.createHash('sha384').update(minifiedCode).digest('base64');
    const integrity = `sha384-${hash}`;
    
    // Create integration guide
    const integrationGuide = `
/**
 * AqlBot CDN Widget Integration Guide
 * 
 * File sizes:
 * - Development: ${Math.round(sourceCode.length / 1024)}KB
 * - Minified: ${Math.round(minifiedCode.length / 1024)}KB
 * 
 * Integrity Hash: ${integrity}
 * 
 * Basic Integration:
 * <script src="https://your-cdn.com/aqlbot-widget.min.js"></script>
 * <script>
 *   AqlBot.init({
 *     apiEndpoint: 'https://your-api.com/chat',
 *     botName: 'Your Bot Name',
 *     primaryColor: '#e5ff66'
 *   });
 * </script>
 * 
 * With Integrity Check:
 * <script src="https://your-cdn.com/aqlbot-widget.min.js" 
 *         integrity="${integrity}" 
 *         crossorigin="anonymous"></script>
 */
`;
    
    const guidePath = path.join(distPath, 'integration-guide.txt');
    fs.writeFileSync(guidePath, integrationGuide.trim());
    console.log('✅ Created integration guide: integration-guide.txt');
    
    // Create package info
    const packageInfo = {
      name: "aqlbot-widget",
      version: "1.0.0",
      description: "Embeddable chatbot widget for any website",
      main: "aqlbot-widget.min.js",
      files: {
        development: "aqlbot-widget.js",
        production: "aqlbot-widget.min.js"
      },
      sizes: {
        development: `${Math.round(sourceCode.length / 1024)}KB`,
        production: `${Math.round(minifiedCode.length / 1024)}KB`,
        gzipped: `~${Math.round(minifiedCode.length / 1024 * 0.3)}KB (estimated)`
      },
      integrity: integrity,
      features: [
        "Zero dependencies",
        "Responsive design",
        "Dark/Light theme",
        "Customizable colors",
        "Multiple positioning options",
        "API integration ready",
        "Typing indicators",
        "Message history",
        "Mobile optimized"
      ],
      compatibility: [
        "Modern browsers (ES6+)",
        "Internet Explorer 11+",
        "Mobile browsers",
        "All major frameworks (React, Vue, Angular, etc.)"
      ]
    };
    
    const infoPath = path.join(distPath, 'package-info.json');
    fs.writeFileSync(infoPath, JSON.stringify(packageInfo, null, 2));
    console.log('✅ Created package info: package-info.json');
    
    console.log('');
    console.log('📦 Build Summary:');
    console.log(`   Development: ${Math.round(sourceCode.length / 1024)}KB`);
    console.log(`   Minified: ${Math.round(minifiedCode.length / 1024)}KB`);
    console.log(`   Compression: ${Math.round((1 - minifiedCode.length / sourceCode.length) * 100)}%`);
    console.log('');
    console.log('🎉 Build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  build();
}

module.exports = { build, minifyJS, minifyCSS };
