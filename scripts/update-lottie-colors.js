const fs = require('fs');
const path = require('path');

// App main color: #6BBE4A converted to normalized RGB (0-1)
const GREEN = [107/255, 190/255, 74/255]; // [0.42, 0.745, 0.29]
const DARK_GREEN = [61/255, 138/255, 46/255]; // #3D8A2E - darker shade

// Colors to detect and replace (common blues, oranges, etc.)
function shouldReplaceColor(r, g, b) {
  // Skip whites, blacks, grays, and skin tones
  if (r > 0.9 && g > 0.9 && b > 0.9) return false; // white
  if (r < 0.15 && g < 0.15 && b < 0.15) return false; // black
  if (Math.abs(r - g) < 0.1 && Math.abs(g - b) < 0.1) return false; // gray

  // Skip skin tones (peachy/beige colors)
  if (r > 0.8 && g > 0.6 && b > 0.5 && r > g && g > b) return false;

  // Replace blues
  if (b > r && b > g && b > 0.4) return 'primary';

  // Replace oranges/yellows
  if (r > 0.6 && g > 0.3 && b < 0.5 && r > b) return 'primary';

  // Replace purples
  if (r > 0.3 && b > 0.4 && b > g) return 'primary';

  // Replace teals/cyans
  if (g > 0.4 && b > 0.4 && r < 0.5) return 'primary';

  // Replace reds
  if (r > 0.6 && g < 0.4 && b < 0.4) return 'primary';

  return false;
}

function processColorValue(colorArray) {
  if (!Array.isArray(colorArray) || colorArray.length < 3) return colorArray;

  const [r, g, b] = colorArray;
  const replacement = shouldReplaceColor(r, g, b);

  if (replacement === 'primary') {
    // Use main green, preserve alpha if exists
    return colorArray.length === 4
      ? [...GREEN, colorArray[3]]
      : [...GREEN];
  }

  return colorArray;
}

function traverseAndReplace(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => traverseAndReplace(item));
  }

  const newObj = {};
  for (const key in obj) {
    if (key === 'c' && obj[key] && typeof obj[key] === 'object') {
      // Color property found
      const colorObj = obj[key];
      if (colorObj.k) {
        if (Array.isArray(colorObj.k) && typeof colorObj.k[0] === 'number') {
          // Static color: k is [r, g, b] or [r, g, b, a]
          newObj[key] = {
            ...colorObj,
            k: processColorValue(colorObj.k)
          };
        } else if (Array.isArray(colorObj.k)) {
          // Animated color: k is array of keyframes
          newObj[key] = {
            ...colorObj,
            k: colorObj.k.map(keyframe => {
              if (keyframe && keyframe.s) {
                return { ...keyframe, s: processColorValue(keyframe.s) };
              }
              if (keyframe && keyframe.e) {
                return { ...keyframe, e: processColorValue(keyframe.e) };
              }
              return keyframe;
            })
          };
        } else {
          newObj[key] = colorObj;
        }
      } else {
        newObj[key] = traverseAndReplace(colorObj);
      }
    } else {
      newObj[key] = traverseAndReplace(obj[key]);
    }
  }

  return newObj;
}

// Process files
const files = [
  'public/animations/businessmen-table.json',
  'public/animations/document.json'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);

  try {
    console.log(`Processing ${file}...`);
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    const updated = traverseAndReplace(json);
    fs.writeFileSync(filePath, JSON.stringify(updated));
    console.log(`✓ Updated ${file}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err.message);
  }
});

console.log('\nDone! Colors updated to app green (#6BBE4A)');
