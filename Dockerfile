# Pull the base image
FROM node:16-alpine

# Set your working directory
WORKDIR /app

# Copy package.json, package-lock.json (if available) and yarn.lock (if available)
COPY package*.json yarn.lock ./

# Install git (only if it's necessary)
RUN apk add --no-cache git

# Set HUSKY to 0 to ignore husky during build
ENV HUSKY 0

# Remove the prepare script temporarily
RUN sed -i 's/"prepare":.*,//g' package.json

# Install dependencies
RUN yarn install --frozen-lockfile

# Add the prepare script back
RUN sed -i '/"scripts": {/a \ \ "prepare": "husky install && chmod ug+x .husky/*",' package.json

# Copy all other files
COPY . .

# Expose the listening port
EXPOSE 3000

# Run yarn dev script
CMD ["yarn", "dev"]
