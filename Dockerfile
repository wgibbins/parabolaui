# Ubuntu base nginx
FROM ubuntu:14.10
MAINTAINER PostModernLuddite@gmail.com
RUN \  
  apt-get update && \
  apt-get install -y nginx && \
  rm -rf /var/lib/apt/lists/* && \
  echo "daemon off;" >> /etc/nginx/nginx.conf 

COPY *.html /usr/share/nginx/html/
EXPOSE 80

CMD ["nginx"]

