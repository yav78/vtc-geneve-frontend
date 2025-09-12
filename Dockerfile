# Dockerfile pour le frontend Angular
FROM node:18-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Construire l'application Angular
RUN npm run build

# Stage de production avec nginx
FROM nginx:alpine AS production

# Copier les fichiers construits depuis le stage builder
COPY --from=builder /app/dist/vtc-app/browser /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
