# eCommerce Application

Welcome to eCommerce application🛍️! This platform replicates real-world shopping experiences in a digital environment.
The project is a part of the final task of the course [JavaScript/Front-end 2023Q4](https://rs.school/courses/javascript-mentoring-program) from the [RS School](https://rs.school/).

## Key pages in the application include:

* Login and Registration pages 🖥️
* Main page 🏠
* Catalog Product page 📋
* Detailed Product page 🔎
* User Profile page 👤
* Basket page 🛒
* About Us page 🙋‍♂️🙋‍♀️

## Technology Stack 💻📚

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E)](https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E) [![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white)](https://img.shields.io/badge/typescript-%23007ACC.svg?style=plastic&logo=typescript&logoColor=white) [![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=plastic&logo=vite&logoColor=white)](https://img.shields.io/badge/vite-%23646CFF.svg?style=plastic&logo=vite&logoColor=white) [![Jest](https://img.shields.io/badge/-jest-%23C21325?style=plastic&logo=jest&logoColor=white)](https://img.shields.io/badge/-jest-%23C21325?style=plastic&logo=jest&logoColor=white) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=plastic&logo=github&logoColor=white)](https://img.shields.io/badge/github-%23121011.svg?style=plastic&logo=github&logoColor=white) [![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=plastic&logo=eslint&logoColor=white)](https://img.shields.io/badge/ESLint-4B3263?style=plastic&logo=eslint&logoColor=white) [![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white)](https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white) 

* TypeScript [docs](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
* Vite [docs](https://main--vitejs.netlify.app/guide/)
* Jest [docs](https://jestjs.io/docs/getting-started)
* SCSS [docs](https://sass-lang.com/documentation/)
* CommerceTools API [docs](https://docs.commercetools.com/api/general-concepts)
* Teamwork tools:
    * Prettier [docs](https://prettier.io/docs/en/)
    * Husky [docs](https://typicode.github.io/husky/)
    * ESLint [docs](https://eslint.org/docs/latest/use/core-concepts)

## Setup and Running:

To clone and run this application, you need [Git](https://git-scm.com/) and [npm](https://www.npmjs.com/) installed on your computer. From your command line clone this repository:

```
$ git clone https://github.com/Friday-13/eCommerce-Application.git
```

Go into repository folder:

```
$ cd eCommerce-Application
```

Install dependencies:

```
$ npm install
```

Run the app:

```
$ npm run dev
```


## Available Scripts

<details><summary>Scripts</summary>

   * To start a local development server:
    
    npm run dev
        
   * To generate a distribution-ready version of the project in the dist directory:
    
    npm run build
    
   * To start a local web server that serves the built solution from the dist directory for previewing:
    
    npm run preview
    
   * To deploy the project at GitHub Pages:

    npm run build && npx gh-pages -d dist -b gh-pages
    
   * To run a JavaScript linter and catch potential issues early in the development process via ESLint:

    npm run lint:js
    
   * To fix linting issues in JavaScript and TypeScript files:
    
    npm run lint:js:fix
    
   * To ensure CSS and SCSS code maintains consistency across the stylesheets:

    npm run lint:css
    
   * To fix linting issues in CSS and SCSS codebase:

    npm run lint:css:fix
    
   * To ensure consistent code style and formatting across the project files via Prettier:

    npm run format
    
   * To run the test suite using Jest. Jest executes the project's test cases and provides the test results:

    npm run jest:test
    
   * To run Commitizen (cz) for creating structured and standardized commit messages:

    npm run commit
    
</details>
