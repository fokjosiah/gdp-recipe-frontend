FROM registry.access.redhat.com/ubi9/ubi:latest AS base

ARG USER_ID=1001
ARG GROUP_ID=1001
ENV USER_NAME=default
ENV FRONTEND_PORT=4200

ENV HOME="/home/${USER_NAME}"
ENV PATH="${HOME}/.local/bin:${PATH}"
# Production App will be stored in /app
ENV APP="/app"

USER root

# Check for package update
RUN dnf -y update-minimal --security --sec-severity=Important --sec-severity=Critical && \
# Install git, nano, nodejs and npm
dnf module enable nodejs:22 -y && \
dnf install git nano nodejs npm -y; \
# clear cache
dnf clean all

# Create user and set permissions
RUN groupadd -g ${GROUP_ID} ${USER_NAME} && \
    useradd -u ${USER_ID} -r -g ${USER_NAME} -m -d ${HOME} -s /bin/bash ${USER_NAME} 

#-----------------------------

# Dev target
FROM base AS dev
COPY .devcontainer/devtools.sh /tmp/devtools.sh
# Install extra dev tools as root, then run as default user
RUN chmod +x /tmp/devtools.sh && /tmp/devtools.sh
# Open dev port
EXPOSE 8000
USER ${USER_NAME}
WORKDIR ${HOME}

# DEPLOYMENT EXAMPLE:
#-----------------------------

# Prod target
FROM base

## Move to app folder, copy project into container
WORKDIR ${APP}
## REPLACE: replace this COPY statement with project specific files/folders
COPY . . 

# Check App permissions
RUN chown -R ${USER_NAME}:${USER_NAME} ${APP} && \
    chmod -R 0750 ${APP}

#install angular cli by default everytime container is rebuilt
RUN npm install -g @angular/cli

## Install project requirements, build project
RUN npm install -g http-server ; \
ng build --configuration production

# Run App as User
# USER ${USER_NAME}

#expose default angular dev server port
EXPOSE ${FRONTEND_PORT}

# CMD ["tail", "-f", "/dev/null"]
CMD http-server ./dist/browser -p ${FRONTEND_PORT}

# EXPOSE 3000
#CMD ["/usr/local/nvm/nvm.sh;", "nvm install;", "npm", "install", "--global", "serve;", 'serve']