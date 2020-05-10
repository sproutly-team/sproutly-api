# Introduction

This is the API for [Sproutly](https://sproutly.com). 

- [Installation Guide](#installation-guide) - How to get started with the api

# <a name='installation-guide'>Installation Guide</a>

This project requires the following tools:

- Docker - Uses OS-level virtualization to deliver software in packages called containers.

To get started, install Docker on your local computer if you don't have it already. [here](https://docker.com/)

## Getting Started

**Step 1. Clone the code into a fresh folder**

```
$ git clone https://github.com/sproutly/sproutly-api.git
$ cd sproutly-api
```

**Step 2. Run Docker Compose**

Next, we need to run docker compose to create our image specified in `docker-compose.yaml` and run it .

```
$ docker-compose up
```

**Step 3. Run Migrations**

Next we need to run the db migrations 

```
$ npx sequelize-cli db:migrate
```

Open http://localhost:4000 to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.

