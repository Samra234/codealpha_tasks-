
# Photography Gallery Collection

A responsive photo gallery created using HTML, CSS, and JavaScript.

## Project Files

- index.html - Main webpage
- style.css - Website styling
- script.js - Gallery functionality
- gallery-data.js - Image paths and captions
- favicon.svg - Browser tab icon
- 404.html - Custom error page
- image/ - Folder containing gallery images

## Image Categories

- Nature
- Fruit
- Landscape
- Cars
- Animals

## How to Add Images

1. Put your image inside the correct category folder.
2. Open gallery-data.js.
3. Add the image path and caption to its category.
4. Save the file and redeploy your website.

Example:

{ src: "image/nature/forest.jpg", caption: "Beautiful Forest" }

## Deploy on Netlify

1. Keep all project files in the main folder.
2. Sign in to Netlify.
3. Deploy the project using Netlify's manual deployment option.
4. For this static website, leave the build command blank.
5. Use the project root as the publish directory.

## Important

Image filenames, folder names, and extensions must match exactly.
Static Netlify hosting does not automatically discover new images
inside folders, so add each image path to gallery-data.js.
