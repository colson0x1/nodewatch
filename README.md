# NodeWatch

**NodeWatch** is a command-line tool that watches for changes in a Node.js application and automatically restarts it whenever a file is added, modified, or removed. It aims to improve the development workflow by eliminating the need to manually restart the application after every code change.

## Features

- Monitors the specified file or the default file (`app.js`) for changes
- Restarts the Node.js application automatically on file changes
- Provides real-time feedback in the terminal about the application status
- Supports custom file names and paths
- Uses debouncing to prevent excessive restarts during rapid file changes

# Installation

## Installation

1. Clone the repository or download the source code.

```bash
$ git clone https://github.com/colson0x1/nodewatch.git
```

2. Open a terminal and navigate to the project directory.

```bash
$ cd nodewatch
```

3. Give the app executable permission by running the following command:

```bash
$ chmod +x app.js
```

4. Install the required dependencies using npm:

```bash
$ npm install
```

5. Run the following command with sudo:

```bash
$ sudo npm link
```

This will create a symbolic link for the app.js file, allowing you to run the app from any directory (globally) by typing `nodewatch` in the terminal.

## Usage

1. Install NodeWatch globally using npm:

```bash
$ npm install -g nodewatch
```

2. Navigate to the directory of your Node.js application.

3. Run NodeWatch with the desired file to execute:

```bash
$ nodewatch [filename]
```

- If no filename is provided, `app.js` will be used as the default file.

4. NodeWatch will start monitoring the current directory for file changes.

5. Whenever a file is added, modified, or removed, NodeWatch will automatically restart the Node.js application and display the updated status in the terminal.

**NOTE**: Either of the commands `nodewatch` or `watchbro` works the same!

## Example

In the project directory, there are two files: `server.js` and `test.js`. To run the application using NodeWatch with `test.js` as the entry file, execute the following command:

```bash
nodewatch test.js
```

You will see the terminal logs indicating the startup process. While the application is running, try changing the text within a `console.log` statement in the `test.js` file. NodeWatch will detect the change and automatically restart the application, reflecting the updated log message in the terminal.

## Acknowledgements

- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce) - For implementing debouncing functionality.
- [chokidar](https://www.npmjs.com/package/chokidar) - For monitoring file changes in the directory.
- [caporal](https://www.npmjs.com/package/caporal) - For building the command-line interface.
- [chalk](https://www.npmjs.com/package/chalk) - For styling and coloring the terminal output.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue on the [GitHub repository](https://github.com/your-username/nodewatch).

## License

This project is licensed under the [MIT License](LICENSE).

## Screenshots 

![nodewatch help command](https://i.imgur.com/RmdKWN0.png)

![nodewatch starting a process](https://i.imgur.com/a2zljI5.png)

![nodewatch starting a new process while running current process](https://i.imgur.com/QUeJo3g.png)

![nodewatch starting express server process](https://i.imgur.com/1kNizWG.png)

![nodewatch starting new process detecting change in express server](https://i.imgur.com/wZfUcIr.png)
