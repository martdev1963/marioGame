#!/bin/bash
# Build script for static site deployment on Render
# Creates build directory and copies all necessary files

# Create build directory
mkdir -p build

# Copy all HTML, CSS, and JS files to build directory
cp index.html build/
cp style.css build/
cp app.js build/

# Verify files were copied
echo "Build complete! Files copied to build directory:"
ls -la build/

