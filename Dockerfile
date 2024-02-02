
FROM node:18.9.0-alpine3.15 As build

WORKDIR /usr/src/app
RUN apk add --no-cache g++ make python3

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm install
RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18.9.0-alpine3.15 As production

# Copy the bundled code from the build stage to the production image

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# RUN npm install -g pm2 

# Start the server using the production build
CMD [ "node", "server.js" ]
# CMD ["pm2-runtime", "process.yml"]