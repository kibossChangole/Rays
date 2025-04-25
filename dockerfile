# Use PHP 8.2-fpm as a parent image
FROM php:8.2-fpm

# Install necessary PHP extensions and git
RUN apt-get update && apt-get install -y git && docker-php-ext-install pdo pdo_mysql

# Set the working directory to the backend folder inside rays/rays-backend
WORKDIR /app/rays/rays-backend

# Copy the backend files into the container (from rays/rays-backend to /app/rays/rays-backend)
COPY rays-backend/ /app/rays/rays-backend/

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose the necessary port
EXPOSE 80

# Run the PHP built-in server to serve the Laravel app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
