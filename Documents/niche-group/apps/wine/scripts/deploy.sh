#!/bin/bash

# Script to deploy the Wine app to Vercel

# Make sure we're in the right directory
cd "$(dirname "$0")/.."

# Check if we have changes we need to stash
if [[ $(git status --porcelain) ]]; then
  echo "Stashing local changes..."
  git stash push -m "Pre-deployment stash $(date)"
  STASHED=true
fi

# Temporarily modify package.json to remove workspace dependencies
echo "Preparing package.json for deployment..."
cp package.json package.json.bak
sed -i '' 's/"@repo\/ui": "workspace:\*",//g' package.json
sed -i '' 's/"@repo\/eslint-config": "workspace:\*",//g' package.json
sed -i '' 's/"@repo\/typescript-config": "workspace:\*",//g' package.json

# Update tsconfig.json to remove workspace dependencies
echo "Preparing tsconfig.json for deployment..."
cp tsconfig.json tsconfig.json.bak
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
EOF

# Update next.config.js to remove workspace dependencies
echo "Preparing next.config.js for deployment..."
cp next.config.js next.config.js.bak
cat > next.config.js << 'EOF'
export default {
  reactStrictMode: true,
};
EOF

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel --prod

# Restore original files
echo "Restoring original files..."
mv package.json.bak package.json
mv tsconfig.json.bak tsconfig.json
mv next.config.js.bak next.config.js

# Restore changes if we stashed them
if [[ "$STASHED" == true ]]; then
  echo "Restoring stashed changes..."
  git stash pop
fi

echo "Deployment process complete!" 