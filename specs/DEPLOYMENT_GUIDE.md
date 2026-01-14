# Deployment & Setup Guide

## Overview

Complete guide for setting up and deploying the Aasim AI Judge Agent platform.

---

## Prerequisites

### Development Environment

- **PHP:** 8.2 or higher
- **Node.js:** 18.x or higher
- **Composer:** 2.x
- **npm/yarn:** Latest version
- **MariaDB:** 10.11 or higher
- **Git:** Latest version
- **Docker & Docker Compose:** (Optional but recommended)

---

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/aasim.git
cd aasim
```

### 2. Backend Setup

#### Install PHP Dependencies

```bash
cd backend
composer install
```

#### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
APP_NAME=Aasim
APP_ENV=development
APP_DEBUG=true
APP_URL=https://api.obsolio.com/

DB_HOST=localhost
DB_PORT=3306
DB_NAME=aasim_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=generate-a-random-secret-key
JWT_EXPIRATION=3600

OPENAI_API_KEY=your-openai-api-key

MAX_FILE_SIZE=524288000
UPLOAD_PATH=../storage/uploads

CORS_ORIGIN=http://localhost:5173
```

#### Create Database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE aasim_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

#### Run Migrations

```bash
php migrations/migrate.php
```

#### Set Permissions

```bash
chmod -R 755 storage/
chmod -R 755 public/
```

#### Start PHP Development Server

```bash
cd public
php -S localhost:8000
```

Or using Composer script:

```bash
composer run serve
```

### 3. Frontend Setup

#### Install Node Dependencies

```bash
cd frontend
npm install
# or
yarn install
```

#### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_BASE_URL=https://api.obsolio.com//api/v1
VITE_APP_NAME=Aasim
VITE_MAX_FILE_SIZE=524288000
```

#### Start Development Server

```bash
npm run dev
# or
yarn dev
```

Frontend will be available at: `http://localhost:5173`

---

## Docker Setup (Recommended)

### 1. Docker Compose Configuration

Create `docker-compose.yml` in project root:

```yaml
version: '3.8'

services:
  # MariaDB Database
  mariadb:
    image: mariadb:10.11
    container_name: aasim-db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
      MYSQL_USER: ${DB_USER}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mariadb_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/schema.sql
    ports:
      - "3306:3306"
    networks:
      - aasim-network

  # PHP Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: aasim-backend
    restart: unless-stopped
    volumes:
      - ./backend:/var/www/html
      - ./storage:/var/www/storage
    ports:
      - "8000:80"
    environment:
      - DB_HOST=mariadb
      - DB_PORT=3306
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      - mariadb
    networks:
      - aasim-network

  # React Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: aasim-frontend
    restart: unless-stopped
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    environment:
      - VITE_API_BASE_URL=https://api.obsolio.com//api/v1
    depends_on:
      - backend
    networks:
      - aasim-network

  # Redis (for queue and cache)
  redis:
    image: redis:7-alpine
    container_name: aasim-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    networks:
      - aasim-network

volumes:
  mariadb_data:

networks:
  aasim-network:
    driver: bridge
```

### 2. Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    ffmpeg

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application
COPY . /var/www/html

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy Apache configuration
COPY docker/apache/000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80

CMD ["apache2-foreground"]
```

### 3. Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

### 4. Start Docker Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env with your values

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## Production Deployment

### Option 1: Traditional VPS (Ubuntu/Debian)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx mariadb-server php8.2-fpm php8.2-mysql \
    php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-gd \
    composer nodejs npm git certbot python3-certbot-nginx

# Install FFmpeg
sudo apt install -y ffmpeg
```

#### 2. Configure MariaDB

```bash
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
```

```sql
CREATE DATABASE aasim_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'aasim_user'@'localhost' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON aasim_db.* TO 'aasim_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Deploy Backend

```bash
# Create directory
sudo mkdir -p /var/www/aasim
cd /var/www/aasim

# Clone repository
git clone https://github.com/yourusername/aasim.git .

# Install backend dependencies
cd backend
composer install --no-dev --optimize-autoloader

# Setup environment
cp .env.example .env
nano .env  # Edit with production values

# Run migrations
php migrations/migrate.php

# Set permissions
sudo chown -R www-data:www-data /var/www/aasim
sudo chmod -R 755 storage/
```

#### 4. Configure Nginx (Backend)

Create `/etc/nginx/sites-available/aasim-api`:

```nginx
server {
    listen 80;
    server_name api.aasim.app;
    root /var/www/aasim/backend/public;

    index index.php;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }

    client_max_body_size 500M;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/aasim-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. Deploy Frontend

```bash
cd /var/www/aasim/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Move build to web root
sudo mkdir -p /var/www/aasim-frontend
sudo cp -r dist/* /var/www/aasim-frontend/
```

#### 6. Configure Nginx (Frontend)

Create `/etc/nginx/sites-available/aasim-frontend`:

```nginx
server {
    listen 80;
    server_name aasim.app www.aasim.app;
    root /var/www/aasim-frontend;

    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass https://api.obsolio.com/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/aasim-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 7. SSL Certificate (Let's Encrypt)

```bash
sudo certbot --nginx -d aasim.app -d www.aasim.app -d api.aasim.app
```

#### 8. Setup Process Manager (PM2 for Queue Workers)

```bash
# Install PM2
sudo npm install -g pm2

# Start queue worker
cd /var/www/aasim/backend
pm2 start queue/worker.php --name aasim-worker --interpreter php

# Save PM2 config
pm2 save
pm2 startup
```

---

### Option 2: Cloud Deployment (AWS/DigitalOcean)

#### AWS Deployment

**Services Used:**
- **EC2:** Application server
- **RDS:** MariaDB database
- **S3:** File storage
- **CloudFront:** CDN for frontend
- **Route 53:** DNS management

**Steps:**

1. **Launch EC2 Instance** (t3.medium or higher)
2. **Setup RDS MariaDB Instance**
3. **Create S3 Bucket** for file uploads
4. **Deploy application** following VPS steps above
5. **Configure CloudFront** for frontend distribution
6. **Setup Route 53** for domain management

#### DigitalOcean Deployment

**Services Used:**
- **Droplet:** Application server (4GB RAM minimum)
- **Managed Database:** MariaDB
- **Spaces:** Object storage

**Steps:**

1. Create Droplet with Ubuntu 22.04
2. Setup Managed MariaDB database
3. Create Spaces bucket for uploads
4. Follow VPS deployment steps
5. Point domain to Droplet IP

---

## Database Migrations

### Create Migration

```php
<?php
// database/migrations/001_create_users_table.php

return [
    'up' => "
        CREATE TABLE users (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            uuid CHAR(36) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ",
    'down' => "DROP TABLE IF EXISTS users;"
];
```

### Run Migrations

```bash
php migrations/migrate.php
```

---

## Environment Variables (Production)

### Backend `.env`

```env
APP_NAME=Aasim
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.aasim.app

DB_HOST=localhost
DB_PORT=3306
DB_NAME=aasim_db
DB_USER=aasim_user
DB_PASSWORD=strong_secure_password

JWT_SECRET=long-random-secret-key-here
JWT_EXPIRATION=3600

OPENAI_API_KEY=sk-your-production-key

MAX_FILE_SIZE=524288000
UPLOAD_PATH=/var/www/aasim/storage/uploads

CORS_ORIGIN=https://aasim.app
```

### Frontend `.env`

```env
VITE_API_BASE_URL=https://api.aasim.app/api/v1
VITE_APP_NAME=Aasim
VITE_MAX_FILE_SIZE=524288000
```

---

## Monitoring & Logging

### Setup Logging

```bash
# Create log directory
sudo mkdir -p /var/log/aasim
sudo chown www-data:www-data /var/log/aasim

# Configure log rotation
sudo nano /etc/logrotate.d/aasim
```

```
/var/log/aasim/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

### Setup Monitoring

Consider using:
- **New Relic** for APM
- **Sentry** for error tracking
- **Datadog** for infrastructure monitoring
- **Uptime Robot** for uptime monitoring

---

## Backup Strategy

### Database Backup

```bash
# Create backup script
sudo nano /usr/local/bin/backup-aasim-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/aasim"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

mysqldump -u aasim_user -p'password' aasim_db | gzip > $BACKUP_DIR/aasim_db_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-aasim-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-aasim-db.sh
```

### File Backup

Use `rsync` or cloud storage sync:

```bash
rsync -avz /var/www/aasim/storage/ user@backup-server:/backups/aasim/
```

---

## Security Checklist

- [ ] SSL/TLS certificates installed
- [ ] Firewall configured (UFW or iptables)
- [ ] Database access restricted
- [ ] File upload validation enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Sensitive data encrypted
- [ ] Regular security updates
- [ ] Backup system operational
- [ ] Monitoring and alerts setup

---

## Troubleshooting

### Common Issues

**1. 500 Internal Server Error**
- Check PHP error logs: `/var/log/php8.2-fpm.log`
- Check Nginx error logs: `/var/log/nginx/error.log`
- Verify file permissions

**2. Database Connection Failed**
- Verify credentials in `.env`
- Check if MariaDB is running: `sudo systemctl status mariadb`
- Test connection: `mysql -u user -p`

**3. File Upload Issues**
- Check `upload_max_filesize` in `php.ini`
- Check `client_max_body_size` in Nginx config
- Verify storage directory permissions

**4. CORS Errors**
- Verify `CORS_ORIGIN` in backend `.env`
- Check Nginx proxy headers
- Test with browser dev tools

---

## Performance Optimization

### PHP-FPM Tuning

Edit `/etc/php/8.2/fpm/pool.d/www.conf`:

```ini
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
```

### MariaDB Tuning

Edit `/etc/mysql/mariadb.conf.d/50-server.cnf`:

```ini
innodb_buffer_pool_size = 1G
max_connections = 200
query_cache_size = 32M
```

### Nginx Caching

Add to Nginx config:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

---

**Document Version:** 1.0
**Last Updated:** 2024-11-05
