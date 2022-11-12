[![CI/CD](https://github.com/agruezo/Authentication-Flask-React-Docker/actions/workflows/main.yml/badge.svg)](https://github.com/agruezo/Authentication-Flask-React-Docker/actions/workflows/main.yml)

<h1 align="center" >Authentication with Flask, React, and Docker</h1>

<h2>Objectives</h2>

<h3>Part 1</h3>

-- Spin up a reproducible development environment with Docker to manage a RESTful API powered by Python, the Flask, Flask-RESTX, and Postgres. Then add React along with Jest and React Testing Library to the client-side. Finally, introduce type checking, on the client-side, with React PropTypes and continuous integration (CI).


- Use Test-Driven Development to develop a React application
- Work with React running inside a Docker Container
- Test a React application with Jest and React Testing Library
- Enable type checking with React PropTypes

<h3>Part 2</h3>

-- Add password hashing in order to implement token-based authentication to the Flask app with JSON Web Tokens (JWTs). Then on the client-side, add React Router to the React app to enable client-side routing along with Formik and Yup for managing and validating forms.

- Manage form state with Formik and Yup
- Implement user authentication with JSON Web Tokens (JWTs)
- Configure silent login via JWT refresh tokens
- Develop RESTful auth endpoints with Python, Flask, and Flask-RESTX
- Use React Router to manage client-side routes in React

<h3>Part 3</h3>

-- On the client-side, add an authentication flow via JSON Web Tokens (JWTs) and spend time refactoring and writing tests with React Testing Library. And finally, deploy the application to Heroku using the GitHub Actions CI/CD pipeline.

- Test a Flask app with pytest
- Configure Flask Bcrypt for password hashing
- Containerize Flask and React with a single Dockerfile using a multi-stage build
- Configure GitLab CI to deploy Docker images to Heroku
- Document a RESTful API with Swagger/OpenAPI

---

<h3>ISSUES WITH MAC M1:</h3>

- Requirements.txt file:
   - can't include `psycopg2-binary == 2.9.3` due to libpq version 10 issue
   - instead include this as part of your dependencies in your Dockerfile:

      ```
      RUN apt update -y \
      && apt install -y build-essential libpq-dev

      RUN pip3 install psycopg2-binary --no-binary psycopg2-binary

- When building Dockerfile.prod to test on Heroku locally:
   - run the following in the command line:

      ```
      docker build -f Dockerfile.prod  --platform linux/amd64 -t registry.heroku.com/APP_NAME/web .

<h3>ALTERNATIVE WAYS TO DEPLOY WITH GITHUB ACTIONS USING A RELEASE.SH FILE:</h3>

- Add the following to a release.sh file in the root directory of your repo:
   - `HEROKU_REGISTRY_IMAGE`, `APP_NAME`, and `HEROKU_API_KEY` are environment variables

      ```
      #!/bin/sh

      set -e

      IMAGE_ID=$(docker inspect ${HEROKU_REGISTRY_IMAGE} --format={{.Id}})
      PAYLOAD='{"updates": [{"type": "web", "docker_image": "'"$IMAGE_ID"'"}]}'

      curl -n -X PATCH https://api.heroku.com/apps/$APP_NAME/formation \
         -d "${PAYLOAD}" \
         -H "Content-Type: application/json" \
         -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
         -H "Authorization: Bearer ${HEROKU_API_KEY}"

- Add the following to your yml file:

   ```
   run: | 
      chmod +x ./release.sh
      docker build -f ./Dockerfile.prod -t $HEROKU_REGISTRY_IMAGE .
      docker login -u _ -p $HEROKU_API_KEY registry.heroku.com
      docker push $HEROKU_REGISTRY_IMAGE
      ./release.sh