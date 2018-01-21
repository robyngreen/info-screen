# About

This is a project using Node.js + React for an info-screen display via a Raspberry-PI. We travel 80 miles every day taking the kids to school and back along I-40, so I thought it would be good to have a large information screen in our kitchen show the time, weather, traffic, radar and our family calendar.

# Build info

`npm run dev`
`npm stop`

## TODO
- Set environment variables for prod vs local dev.
- Use JSON for API data on local dev.
- Refresh only on prod.
- Global google API key.
- Boot inot kiosk on pi.
- Set wake/sleep schedule on pi.
- Color code time.
- NPM run on boot
- Automatic git deployment -- no

Start pi on boot

```5. Make it run on boot
This is the hardest part if you don't really know what you're doing.

You can define things to run on boot in /etc/rc.local. In that shell script, you don't have the same path as when you log in, so just running node app.js won't do the trick.

I tried a lot of different things that all gave errors like Illegal instruction or Permission denied or File not found.

What does work, is running one command as the default pi user. Because that user does have node in his path, the command is known.

su pi -c 'node /home/pi/server.js < /dev/null &'
I suggest using an absolute path to your Node.js-file just to make sure.

```


```Warning: setState(...): Can only update a mounting component. This usually means you called setState() outside componentWillMount() on the server. This is a no-op.

Please check the code for the Weather component.
Warning: setState(...): Can only update a mounting component. This usually means you called setState() outside componentWillMount() on the server. This is a no-op.

Please check the code for the Calendar component.```


# Environment setup

## Package.json configuration

- Don't invoke with "webpack-dev-server --content-base docroot/ --hot --inline --devtool", just use node and setup environment variables in the config:

  Don't do this in package.json:
    "scripts": {
      "development": "webpack-dev-server --content-base docroot/ --hot --inline --devtool",
      "start": "node app.js info-screen"
    }
  Do this in package.json:
    "scripts": {
      "development": "NODE_ENV=dev node app.js info-screen",
      "start": "NODE_ENV=prod node app.js info-screen"
    }

  Why? Because webpack-dev-server does not pick up wepack.config.js by default. By setting NODE_ENV variables, we can control the entire process in webpack.config.js instead of multiple configurations.

  'info-screen' here is simply the title we give to the node server for easy killing. It is optional. See below 'Stopping node server'

## Stopping Node Server

- Don't use ctrl+x, ctrl+r cmd+x, or whatever is appropriate for your environment, to stop node at the command line. This will stop the process _in the window_ but leave it running on your ports, and will throw a fatal error next time you try to spin up the server.

  Invoke node with a param: `node server.js this-is-my-title`

  Then add this to server.js: `process.title = process.argv[2];`

  To stop, simply add a command in package.json to call from the command line. Here "..." line means append the 'stop' below whatever you have existing. Don't literally write '...' in scripts:

  "scripts": {
    ...
    "stop": "killall -SIGINT this-is-my-title"
  }

  And simply run `npm stop` to kill your server.

##Webpack.config.js configuration

Most recent versions of webpack will read webpack.config.js as default when in the same app directory as `node server.js`.

For DEV environment, the following must be configured - note these aren’t the *only* configurations that should appear in their objects/arrays, simply ones that must be there. For instance, you might have `entry: ‘server.js’` there. Keep that and simply append these new values to the keys: `entry: [ ‘server.js’, webpack …’ ]`

plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack-hot-middleware/client',
  ],
 output: {
     publicPath: 'http://localhost:8081/scripts'
  },

publicPath on the output is what will literally be written in the webpack’d files as the route to the asset. Think of it as the ‘src’ attribute for a script tag.

That is ‘publicPath: ‘/some/dir’` will output “src=”/some/dir/file.js”” in the webpack output. Whereas ‘publicPath: ‘http://google.com’` will output “src=”http://google.com/file.js” in the webpack’d output.

Output will likely already contain the standard values for webpack output -- these do not change for component-hot-reloading:

path: path.resolve(__dirname, 'docroot/scripts'), // the machine path to where the webpack’d file will be saved.
filename: 'bundle.js', // the name of the file to save, literally will save bundle.js in the path directory above.

NOTE: if you see a tutorial that uses “devServer” in webpack.config.js, RUN AWAY. This param is ignored in node.js and will only cause you headaches and heartaches.

## Server.js setup


# URLs used

- https://www.sitepoint.com/building-a-react-universal-blog-app-a-step-by-step-guide/
- http://stackoverflow.com/questions/26203725/how-to-allow-for-webpack-dev-server-to-allow-entry-points-from-react-router
- https://webpack.github.io/docs/tutorials/getting-started/
- https://webpack.github.io/docs/webpack-dev-server.html
- https://scotch.io/tutorials/create-a-simple-to-do-app-with-react
- https://robots.thoughtbot.com/setting-up-webpack-for-react-and-hot-module-replacement
- https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9#.v8nylayok
- http://matthewlehner.net/react-hot-module-replacement-with-webpack/
- https://www.ctheu.com/2015/05/14/using-react-hot-loader-with-a-webpack-dev-server-and-a-node-server/
- https://facebook.github.io/react/tutorial/tutorial.html
