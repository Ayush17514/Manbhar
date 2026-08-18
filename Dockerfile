FROM php:8.2-apache

# Enable Apache rewrite engine for .htaccess
RUN a2enmod rewrite

# Install MySQL extensions for PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql pdo_pgsql

# Copy project files into Apache web directory
COPY . /var/www/html/

# Set proper directory permissions
RUN chown -R www-data:www-data /var/www/html/ \
    && chmod -R 755 /var/www/html/

EXPOSE 80