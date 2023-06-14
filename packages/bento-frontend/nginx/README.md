## NGINX Installation for Mac.

1. brew install nginx 
2. rm /usr/local/etc/nginx/nginx.conf.default
3. rm /usr/local/etc/nginx/nginx.conf
4. cp nginx.conf /usr/local/etc/nginx/
5. brew services restart nginx
6. brew services info nginx
7. cd bento-frontend
8. Replace or Add given variables in "public/injectEnv.js"
```bash
    REACT_APP_BACKEND_API=http://localhost:3000/v1/graphql/
    REACT_APP_FILE_SERVICE_API=http://localhost:3000/api/files/
    REACT_APP_AUTH_SERVICE_API=http://localhost:3000/api/auth/
    REACT_APP_USER_SERVICE_API=http://localhost:3000/api/users/
```
9. PORT=3010 npm start
10. Access Frontend with __http://localhost:3000/__




