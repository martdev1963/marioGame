#!/bin/bash
# Simple build script for static site
# Just ensures the publish directory exists
mkdir -p build
cp -r *.html *.css *.js build/ 2>/dev/null || true
echo "Build complete - files ready in current directory"

