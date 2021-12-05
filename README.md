# Block.

A community for writers to release creativity and also find inspiration.

## Live Demo
[https://block.joecoxdev.com/](https://block.joecoxdev.com/)

## Tech Stack

- React JS (create-react-app)
- Firebase Auth / Firestore / Storage
- Jest

## Project Setup
```yarn install```

## Run Project Locally
```yarn start```

## Edit
I switched to bootstrapping the project with create-react-app due to issues deploying to Vercel

---

So I was looking to pick up Firebase using their JavaScript SDK while I was also learning React's Context functionality as this has been something I have put off for some time.

When approaching this project I thought I'd start with a blank canvas, no use of create-react-app, just completely from scratch.

I really wasn't sure how this would go.

## Initial Setup

So first I checked the [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) section on the [React website](https://www.reactjs.org).

### [Requirements](#Requirements)

One thing it states that I will need is the following:

- Node version of 14.0.0+
- npm version of 5.6+

I already have these installed so I will move on to the next piece of the puzzle.

The main requirements area to have a package manager, a bundler and compiler. For this I have chosen to use:

- [npm](https://www.npmjs.com/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)

#### Package Manager

The React documentation states that the npm version must be 5.6 or above. I chose npm since I already have the latest stable version installed.

#### Bundler

I chose Webpack as the bundler since it is the most popular and seems to be used with `create-react-app`, so I feel a bit more comfortable using it. I feel like there will be a lot more support out there for this, rather than something such as Parcel.

#### Compiler

I opted to use Babel as the compiler as this is the only one that I have ever used and am aware of.

The React documentation stops here and recommends an article on Medium for [setting up a toolchain from scratch](https://medium.com/@JedaiSaboteur/creating-a-react-app-from-scratch-f3c693b84658)

### [The Medium Article](#The-Medium-Article)

So to start off, once initialising npm and git, the article recommended creating a `public` and `src` folder, as we all know, the staples of the React folder structure.

It mentions that we should think ahead regarding git so we will set up a `.gitignore` file which excludes the following folders:

- node_modules
- dist

#### Folder Structure

The `public` folder will be used to handle the static assets (favicon, index.html etc). On top of this, I will also be creating folders within the src directory for `components`, `context` and `lib`. The `context` folder will of course hold context such as the user authentication state andThe `lib` folder will hold any libraries or development kits in use such as `Firebase`.

### [Configuring the compiler, Babel](#configuring-the-compiler-babel)

First I have installed Babel using `npm install --save-dev @babel/core@7.16.0 @babel/cli@7.16.0 @babel/preset-env@7.9.0 @babel/preset-react@7.9.0` after looking up the latest versions.

The article gives some information on the packages, explaining babel-core is the main Babel package, allowing it to make transformations to the code for optimal browser compatibility. The CLI will allow compiling from the command line which will be handy when we set up the scripts to run the build or the development server. The presets will transform the code from ES6+ and JSX in to ES5.

Once done, I will add a `.babelrc` file which will hold an object that will tell babel which presets we'd like to use. A full list of Babel's plugins can be found [here](https://babeljs.io/docs/en/plugins/) - I may take a look at these at a later date, but for now I just want the core fundamentals in place.

### [Setting up Webpack](#Setting-up-Webpack)

Webpack's website states that you do not need to use a configuration file when using Webpack however it looks like we will need configuration to set some rules in the development mode, the entry point (which will be the `index.js` we will create in the src folder) and the location of the dist folder to build in to.

I have installed Webpack using `npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader`. I've removed the version's given in the Medium article but I'm not sure if this will cause any issues further down the line. Webpack is now in version 5 wheras the article is recommending version 4. Hopefully there will be no issues with any other configuration to come, but we'll see. This article was last edited in 2018 but I'm hopeful.

#### Loaders

The article states that 'Webpack uses the loaders to process different types of files for bundling.' It will also serve our React project in development and allow any saved changes to be reflected immediately in the browser with an automatic reload. A `webpack.config.js` file was created with some code to make this possible.

The article has not mentioned installing post-css for CSS prefixers to be added in the output so I have taken it upon myself to do this. First I have installed the required packages using `npm install --save-dev postcss-loader postcss` as instructed on the [Webpack postcss loader page](https://webpack.js.org/loaders/postcss-loader/)

It turns out I also need `npm install postcss-preset-env` which is then added as a plugin in the `postcssOptions` array within the `webpack.config.js` file. This can also be done in its own file as a module but I think I will keep everything in one place.

## React

Now everything is (hopefully) in place, I will install `react` and `react-dom`.

Once this is complete I'll need to set up my index.js within the src directory since we have set this as the entry point within Webpack's configuration.

I will use `ReactDOM.render` as this is the main function that tells React what to render and where (in this case we will use the element with the ID "root" which you can find in the `public/index.html` file on line 10)

After this, we just need to create the `App.js` file to hold the `App component` which is rendered in the `index.js` file and we should be set to install any extra libraries we may want to use.

### [Some other dependencies I would like to use](#Some-other-dependencies-I-would-like-to-use)

So I would like to think about any CSS Frameworks, libraries I'd like to use etc. I will install the following:

- [React Icons](https://react-icons.github.io/react-icons/)
- [Bulma](https://bulma.io/)
- [React Helmet Async](https://github.com/staylor/react-helmet-async)
- [React Router Dom](https://v5.reactrouter.com/web/guides/quick-start)

#### React Icons

This will provide me with SVG icons in the form of pre-made components. There are so many to choose from and I just love this library. It's so easy to use

#### Bulma

This is an excellent CSS Framework to get some sort of skeleton/base in place. I would like to use `TailwindCSS` but I am not too familiar with it so I will pass for now. For this project I want to focus on learning to use `Firebase` and `Context`.

#### React Helmet Async

This is a necessary library which allows me to place titles on each page. All that we need to do is wrap the project in the Helmet.Provider context and then we can begin to use the Helmet component to add dynamic titles to our app.

#### React Router Dom

I will be using React Router Dom to set up dynamic routes in my app. It will allow me to re-direct to the correct places depending on the user authentication response from `Firebase`. I will also need it to route the user to pages such as the sign up and register pages.

## The Project

I don't really have an idea set in stone. I'm going to go in to this first getting `Firebase` implemented. Then I will set down a base within the `App.js` file. Once this is done I will look in to implementing `Context` to store the `user auth` data.

### [Things that cross my mind on set up](#Things-that-cross-my-mind-on-set-up)

Folder structure is one thing I like to think about but I never know what would be best. I am going to go with the usual:

```
- assets (for images, videos, any data such as JSON files I may want to include)
-- videos
-- images
-- data
- components (this will hold all of the stateless components such as Nav, Header etc)
-- Header
-- Nav
- containers (this will hold our stateful components such as the pages like Home, SignUp etc)
-- Home
-- SignUp
-- Register
- context
-- AuthContext
- lib
-- firebase
```

I used to name the files after its parent folder within the `components` file, for example: `components/Header/Header.js` but lately I prefer to use the following structure: `components/Header/index.js`. This will allow me to import quicker i.e. `import Header from ./components/Header` instead of `./components/Header/Header`

This brings another thing to my attention - the base path for importing files. As I get deeper in to folders, it is easy to get confused with how many levels are required to go back to reach the correct contents, even if the code editor displays the list of files as you type. For this I am going to use the following within Webpack's configuration file.

I always forget how to do this so I've taken a look around and found another article on medium titled [Getting rid of relative paths in imports using webpack alisa](https://medium.com/@etherealm/getting-rid-of-relative-paths-in-imports-using-webpack-alias-78d4bf15bb42)

This seems really useful. I will update the webpack config with the following:

```
resolve: {
  alias: {
     components: path.resolve(__dirname, ‘src/components/’),
     containers: path.resolve(__dirname, ‘src/containers/’),
     assets: path.resolve(__dirname, ‘src/assets/’),
     context: path.resolve(__dirname, ‘src/context/’),
     lib: path.resolve(__direname, 'src/lib'),
  }
}

```

This will now allow me, for example, to import a component using `import Header from "components/Header"` instead of `import Header from "../../../components/Header"` etc

## Finishing set up

That should be everything in place for now, hopefully!

_Edit:_ It looks like I forgot some vital steps.

I will need to use something called `react-hot-loader` in order for changes to reflect in the client. Apparently this is called "Hot Module Replacement". This was provided by the React team [here](https://github.com/gaearon/react-hot-loader).

I will also need to add some scripts to the `package.json` in order to run the development server and create builds. To do this I will add the following:

```
"scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js",
    "build": "webpack --mode production",
    "test": "echo \"Error: no test specified\" && exit 1",
  },
```

## Issues

### [Error One](#error-one)

So after completing all of the above, I'm running in to an error when running the start script - `SyntaxError: Cannot use import statement outside a module`

So it looks like I've changed the path and webpack variables in the webpack config to import statements which can not be used outside of a module, silly me! I have updated this and hopefully things will work.

### [Error Two](#Error-Two)

```
[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'hotOnly'. These properties are valid:
   object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, static?, watchFiles?, webSocketServer? }
```

Okay so upon investigation this, it seems that the latest version of Webpack (5) does not support the property `hotOnly` within the config under the `devServer` property. I have updated this to `hot: "only"` which should work according to stack overflow.

### [Error Three](#Error-Three)

```
[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'publicPath'. These properties are valid:
   object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, static?, watchFiles?, webSocketServer? }
```

I was unable to find anything, I will come back to this. I have updated the `publicPath` key to `host` as this is an accepted property. It has worked for now

### [Error Four](#Error-Four)

```
[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'contentBase'. These properties are valid:
   object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, static?, watchFiles?, webSocketServer? }
```

I'm seeing a trend. It appears the article I followed would work should I have installed the versions that were mentioned, however I have decided to install the latest Webpack which is causing issues. I may change the version but for now, I would like to see what I can do.

Upon searching around a bit I have found [this thread](https://github.com/webpack/webpack-dev-server/issues/2958#issuecomment-757141969) which explains that the documentation for webpack-dev-server is out of date and that `contentBase` was replaced with `static`

This error was resolved with the `static` option mentioned above.

## Final Issue

The only issue I am having now is that I can not see changes when I save files, I need to reload manually. The react-hot-loader was installed for this reason, so I believe there is something wrong here.

_Edit:_ This was fixed by changing the following `webpack.config.js` property and value: `devServer.hot: "only"` to `devServer.hot: true`

### [Importing React](#Importing-React)

So with `create-react-app` you no longer need to `import React from 'react'` when creating components. I have found [this article](https://dev.to/titungdup/you-no-longer-need-to-import-react-from-react-3pbj) explaining why. I have yet to read it all but I will update once I have. I am hoping there is a way that I will be able to implement it within this project, having not used `create-react-app`

_Edit:_ The article doesn't seem to hold anything of value but I have found the article [Introducing The New JSX Transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#how-to-upgrade-to-the-new-jsx-transform) on React's website. This holds the key to upgrading the project. It seems we just need to update the .babelrc file to provide a few further options to the `@babel/preset-react` plugin as follows:

```
{
    "plugins": ["react-hot-loader/babel"],
    "presets": [
        ["@babel/env"],
        ["@babel/preset-react", {
            "runtime": "automatic"
        }]
    ]
}
```

## Day Two Update

So I've had a lot of issues implementing Firebase. Mostly with setting the displayName of the user and rendering it on the dashboard page. I was receiving an error message each time I tried to use async/await syntax which said:

```
Uncaught ReferenceError: regeneratorRuntime is not defined in React
```

After searching around a bit, it turns out this is happening as I did not have [@babel/plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime) installed.
So the reason this plugin is required is because `Async functions` are abstraction on top of generators. While they're supported in the latest versions of Node (10+), when using Babel we need to add an extra layer that transforms generators to change ES6 in to ES5 at runtime. This is because their syntax is not backwards compatible.

I also had some issues with `react-router-dom` - I hadn't realised that a [new major version was out](https://reactrouter.com/docs/en/v6/api#routing). It no longer uses things like `<Redirect />` or `<Switch />` but instead uses `useNavigation`, `<Navigation />`, and `<Routes />` instead. I have used the docs to find all the current exports.
