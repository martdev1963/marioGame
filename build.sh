#!/bin/bash
# Build script for static site deployment on Render
# Creates build directory and copies all necessary files

# Create build directory
mkdir -p build

# Copy all HTML, CSS, and JS files to build directory
cp index.html build/
cp style.css build/
cp app.js build/

# Copy assets folder if it exists
if [ -d "Super Mango Platformer Assets by JuhoSprite" ]; then
    cp -r "Super Mango Platformer Assets by JuhoSprite" build/
    echo "Assets folder copied to build directory"
fi

# Verify files were copied
echo "Build complete! Files copied to build directory:"
ls -la build/

