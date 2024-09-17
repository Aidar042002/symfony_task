FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo pdo_mysql zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN pecl install xdebug && docker-php-ext-enable xdebug

WORKDIR /var/www/symfony
RUN chown -R www-data:www-data /var/www/symfony
