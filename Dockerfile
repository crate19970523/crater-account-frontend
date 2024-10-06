FROM nginx
COPY dist/ /opt/crater-account-frontend/
VOLUME ../conf /etc/nginx/conf.d