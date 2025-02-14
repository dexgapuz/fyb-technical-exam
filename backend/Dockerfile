FROM php:8.2.27

WORKDIR /app/backend

RUN apt-get update \
    && apt-get install --quiet --yes --no-install-recommends \
    libzip-dev \
    unzip \
    libpng-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install zip pdo pdo_mysql bcmath gd

COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY . .

RUN groupadd --gid 1000 appuser \
    && useradd --uid 1000 -g appuser \
    -G www-data,root --shell /bin/bash \
    --create-home appuser

USER appuser

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
