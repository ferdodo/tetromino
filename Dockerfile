FROM node
WORKDIR /tetromino
COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm config set maxsockets 1
RUN npm install
RUN npm audit --audit-level=critical
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /tetromino/public /usr/share/nginx/html
COPY --from=0 /tetromino/dist /usr/share/nginx/html
