# Use official PHP with Apache image
FROM php:8.2-apache

# Copy all files from current folder to web root
COPY . /var/www/html/

# Enable Apache mod_rewrite (useful for URLs and .htaccess)
RUN a2enmod rewrite

# Expose port 80 (web)
EXPOSE 80

# Start Apache when container runs
CMD ["apache2-foreground"]
