# Deployment Configuration Guide

## 🚀 Best Deployment Configurations for Combined App

### Option 1: Single Application (Recommended) ✅

#### Server Setup

**Requirements:**
- Ubuntu 22.04 LTS or similar
- Node.js 20.x
- Nginx
- PM2 (for process management)
- SSL certificate (Let's Encrypt)

#### Step 1: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm globally
npm install -g pnpm

# Install Nginx
sudo apt install -y nginx

# Install PM2
npm install -g pm2
```

#### Step 2: Build Application

```bash
cd /var/www/kuwait-english-hub
git pull origin main
cd english-learning-platform
pnpm install
pnpm run build:prod
```

#### Step 3: Nginx Configuration

Create `/etc/nginx/sites-available/kuwait-english-hub`:

```nginx
# Upstream for Flask API (if needed)
upstream flask_api {
    server 127.0.0.1:5000;
    keepalive 32;
}

# Rate limiting
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=general_limit:10m rate=30r/s;

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline' 'unsafe-eval'" always;
    
    # Root directory
    root /var/www/kuwait-english-hub/english-learning-platform/dist;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json 
               image/svg+xml;
    
    # Logging
    access_log /var/log/nginx/kuwait-hub-access.log;
    error_log /var/log/nginx/kuwait-hub-error.log;
    
    # Main location - SPA routing
    location / {
        limit_req zone=general_limit burst=20 nodelay;
        try_files $uri $uri/ /index.html;
        
        # Cache control for HTML
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # API proxy (if using Flask backend)
    location /api/ {
        limit_req zone=api_limit burst=10 nodelay;
        proxy_pass http://flask_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Static assets - aggressive caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Service worker
    location /service-worker.js {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Content-Type "application/javascript";
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/kuwait-english-hub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Step 4: PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'kuwait-english-hub-api',
    script: 'kuwait-backend-api.py',
    interpreter: 'python3',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      FLASK_DEBUG: 'False',
      PORT: 5000,
      HOST: '127.0.0.1',
      ALLOWED_ORIGINS: 'https://your-domain.com'
    },
    error_file: './logs/api-error.log',
    out_file: './logs/api-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    max_memory_restart: '500M'
  }]
};
```

Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Step 5: Environment Variables

Create `.env.production`:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Gemini API (for Expert Companion)
VITE_GEMINI_API_KEY=your-gemini-api-key

# Build mode
BUILD_MODE=prod

# Flask API
FLASK_DEBUG=False
PORT=5000
HOST=127.0.0.1
ALLOWED_ORIGINS=https://your-domain.com
```

### Option 2: Docker Deployment

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY english-learning-platform/package.json english-learning-platform/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY english-learning-platform/ ./

# Build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GEMINI_API_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ENV BUILD_MODE=prod

RUN pnpm run build:prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VITE_SUPABASE_URL: ${VITE_SUPABASE_URL}
        VITE_SUPABASE_ANON_KEY: ${VITE_SUPABASE_ANON_KEY}
        VITE_GEMINI_API_KEY: ${VITE_GEMINI_API_KEY}
    ports:
      - "80:80"
    restart: unless-stopped
    networks:
      - app-network

  api:
    build:
      context: .
      dockerfile: Dockerfile.api
    ports:
      - "5000:5000"
    environment:
      - FLASK_DEBUG=False
      - PORT=5000
      - ALLOWED_ORIGINS=https://your-domain.com
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Option 3: Cloud Deployment (Vercel/Netlify)

#### Vercel Configuration

`vercel.json`:
```json
{
  "buildCommand": "cd english-learning-platform && pnpm install && pnpm run build:prod",
  "outputDirectory": "english-learning-platform/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-key",
    "VITE_GEMINI_API_KEY": "@gemini-key"
  }
}
```

#### Netlify Configuration

`netlify.toml`:
```toml
[build]
  command = "cd english-learning-platform && pnpm install && pnpm run build:prod"
  publish = "english-learning-platform/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

### Performance Optimizations

1. **CDN Configuration**
   - Use Cloudflare or similar CDN
   - Enable caching for static assets
   - Enable Brotli compression

2. **Database Optimization**
   - Use connection pooling
   - Enable query caching
   - Optimize indexes

3. **Monitoring**
   - Set up Sentry for error tracking
   - Use Google Analytics
   - Monitor server resources

### Security Checklist

- [ ] SSL/TLS enabled
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] API keys in environment variables
- [ ] CORS properly configured
- [ ] Input validation enabled
- [ ] SQL injection protection
- [ ] XSS protection enabled
- [ ] Regular security updates

### Backup Strategy

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf /backups/kuwait-hub-$DATE.tar.gz /var/www/kuwait-english-hub
# Keep last 30 days
find /backups -name "kuwait-hub-*.tar.gz" -mtime +30 -delete
```

### Monitoring Script

```bash
#!/bin/bash
# Health check script
curl -f http://localhost/api/health || echo "API is down" | mail -s "Alert" admin@example.com
```
