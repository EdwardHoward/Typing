FROM cypress/base:10.15.3

# Supress progressive status output from Cypress.
ENV CI=1

RUN npm config -g set user $(whoami) && \
    npm install -g "cypress@latest" && \
    cypress verify

ENTRYPOINT ["cypress", "run"]