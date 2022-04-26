# Video Menthe - Test App

## Summary

1. [Statement](#Statement)
2. [Project Structure](#Project-Structure)
3. [Dependencies](#Dependencies)
4. [Development Dependencies](#Development-Dependencies)
5. [How To Start](#How-To-Start)
    * [Installation](#Installation)
    * [Start Application](#Start-Application)
    * [Still To Be Done](#Still-To-Be-Done)
      * [Must Be Done](#Must-Be-Done)
      * [Can Be Done](#Can-Be-Done)

## Statement
Create a Single PAge Application in React (cra or another tool) to manage a simple client app to upload, compress and view video files:

The front end Application wil use TypeScript, React and will have 3 main React components on the same page:

* An upload form component allowing a video to be uploaded to the server:
  * It must be a React Class component.
  * It must have at least a file input and a submit button.
  * It must call the 'upload' API route on the server.
  * Optionally a toast can be displayed when file is fully uploaded.

* A list component containing all uploaded and transcoded video names
  * It must be a React Hooks component.
  * It is a simple list of clickavle elements with the name of the file.
  * It must call the "files" API route on the server.
  * It must be refreshed once a file has been added (uploaded and transcoded).

* A player component that plays the video clicked in the list
  * It must be a React Hooks component.
  * It must get the stream from the "files" API route.
  * The native <video> player must be used (No external wrapper or library).
  * Player controls must be hidden.
  * A play/pause button must be added under the player.
  * And a range input to show the currentTime progress.

## Project Structure
| Name Folders         | Description                               |
|:---------------------|:------------------------------------------|
| components           | React Components                          |
| components/**class** | React Class components                    |
| components/**hoc**   | Custom High Order Components              |
| components/**hooks** | React Hooks                               |
| lib                  | Reusable utilises and library source code |
| build                | Compiled source files will be placed here |
| tests                | Test caseswill be placed here             |
## Dependencies

* React: React is a JavaScript library for building user interfaces.
* React-Bootstrap: React-Bootstrap replaces the Bootstrap JavaScript. Each component has been built from scratch as a true React component, without unneeded dependencies like jQuery.
* sass: A pure JavaScript implementation of [Sass](https://sass-lang.com/). **Sass makes CSS fun again**.
* axios: Promise based HTTP client for the browser and node.js
* bootstrap: Sleek, intuitive, and powerful front-end framework for faster and easier web development.

> All modules beginning with @types/, its just definition for typescript for the module in question. These are mainly development dependencies.

## Development Dependencies
None at these moments.

## How To Start
### Installation

##### With NPM
```bash
npm i
``` 
or
```bash
npm
```

##### With YARN
If it doesn't exist on your system or node modules
```bash
npm install --global yarn
```
and for install all your dependencies
```bash
yarn
```

#### Start Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### Still To Be Done

#### Must Be Done 
 * Replace progress bar by input range for the currentTime.
 * Create a High Order Component for fetch video from api.
 * Manage event click on list for received low resolution video from server.
 * Manage of the low resolution video from Player.

#### Can Be Done
 * Optionally add framerate to counters on Player video.
