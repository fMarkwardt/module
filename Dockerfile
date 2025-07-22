# Einfacher Nginx-Webserver
FROM nginx:alpine

# Kopiere den Inhalt ins Standard-Nginx-Verzeichnis
COPY . /usr/share/nginx/html
