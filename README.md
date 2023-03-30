# Gallop

Repo related to Project 2. The main goal of the app is to connect horse farms/breeders with potential horses.

## IMPORTANT:

For a better outcome, please make sure you did all the environment setup before working on the project. This document will be updated from time to time, so please check it before start working.

All of the following commands have to be executed inside the folder where you want your project to be located.

## BEFORE CLONING THE REPO

**Note:** Marina had some problems in creating a separate folder and copying the node_modules folder, so you can clone the repo and create the project, after this you’ll need to drag the folders node_modules, public, and both packages.json - this will probably be the easiest way to do it.

### 1 - To CREATE React app

**Note:** substitute app_name with the name of your preference.

```
npx create-react-app app_name
```

### 2 - To RUN the project

**Note:** as you probably create your project inside a folder, to run the command below and others, you’ll need to open the project folder in VS Code, open the terminal, and find the project folder using the command:

```
cd app_name
```

(Cont.) after inside the project’s folder (terminal), you will be able to run the project in a local host using the below - if you execute the command, for proceeding with the rest of the instructions don’t forget to stop the server with Ctrl+C or Cmmd+C:

```
npm start
```

### 3 - Install Axios

```
npm i axios
```

### 4 - Install Router

```
npm install react-router-dom@6
```

### 5 - CLONING THE REPO

Before cloning the repo, please delete the following files from the React app that you created:

- src folder
- .gitignore (if existing)
- README.md
  Those files will be replaced by the ones you’ll clone from the repo.
  **IMPORTANT!!!** If you decide to clone the repo after, you’ll need to do it in another folder, as GH doesn’t allow you to clone in a folder with preexisting files. Please note that for this to work out, the React project created will be moved to the folder you cloned the repo, and NOT the way around.

## GO TO THE SERVER DIRECTORY AND INSTALL THE FOLLOWING (in my case - Marina - this didn’t work, so I had to download a .zip file with all the project from GH and make the installation in those files, then I simply copied and pasted the node_modules and packages.json):

### 6 - Install EXPRESS

```
npm install express
```

### 7 - Install MYSQL

```
npm install mysql
```

### 8 - Install BODY-PARSER

```
npm install body-parser
```

### 9 - Install CORS

```
npm install cors
```

### 10 - TO RUN SERVER

```
node index.js
```

For the app to work you’ll need to run the server and run the project (steps 10 and 2).

## UPDATES

### 11 - Install SASS

```
npm i node-sass --save-dev
```

### 12 - Install Google Geocode

```
npm install --save react-geocode
```

### 13 - Install Firebase

```
npm install firebase
```

### 14 - Install Swiper (carousel)

```
npm i swiper
```

### 15 - Install bcryptjs

```
npm i bcryptjs
```

### 16 - Install Google Auth

```
npm install @react-oauth/google@latest
```

### 17 - Install Recharts

```
npm install recharts
```

### 18 - Install IN THE SERVER FOLDER Nodemailer

```
npm install nodemailer
```

### 19 - Install IN THE SERVER FOLDER GoogleAPI

```
npm install googleapis
```

### 20 - Install Lodash

```
npm i --save lodash
```

### 21 - Install IN THE SERVER FOLDER uid-generator

```
npm install uid-generator --save
```

### 22 - Install React Paginate

```
npm install react-paginate --save
```