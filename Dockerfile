FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install -g gulp
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3003

# Run in production
CMD ["gulp", "prod"]
