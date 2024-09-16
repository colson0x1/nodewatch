# NodeWatch (browatch npm)

**NodeWatch (browatch)** is a command-line tool that monitors changes in a Node.js application and automatically restarts it whenever a file is added, modified, or removed. It aims to improve the development workflow by eliminating the need to manually restart the application after every code change.

![NodeWatch starting new process detecting change in express server](https://i.imgur.com/wZfUcIr.png)

## Run as NPM Module

```
$ sudo npm install -g nodewatch
// Execute on the node project you're working!
$ nodewatch [server-file]
i.e
$ nodewatch index.js
OR
$ browatch index.js
```

## Features

- Monitors the specified file or the default file (`app.js`) for changes
- Restarts the Node.js application automatically on file changes
- Provides real-time feedback in the terminal about the application status
- Supports custom file names and paths
- Uses debouncing to prevent excessive restarts during rapid file changes

## Technology Behind Node Processes

Node.js child processes are used to create new processes and communicate with them. When a program is started from the terminal, a process is created, and it has three communication channels: `stdin`, `stdout`, and `stderr`.

- `stdin`: Used to receive information directly from the terminal.
- `stdout` and `stderr`: Whenever the program throws an error or console logs something, the process emits the information over these channels. `stdout` is responsible for passing the console log information to the terminal, and `stderr` is used for errors and constructing error messages.

Now, let's examine how each of the methods for creating child processes handles the shell and stream:

| Method     | Shell | Stream |
| ---------- | ----- | ------ |
| `exec`     | Yes   | No     |
| `execFile` | No    | No     |
| `spawn`    | No    | Yes    |
| `fork`     | No    | Yes    |

- `exec`: The `exec` method uses the shell to execute a command. When using `exec`, you can use shell-specific syntax and execute complex commands, making it suitable for running shell scripts. As a result, `shell: yes`.

  However, when using `exec`, it returns the output in a bundle once the process is completed, meaning it waits for the child process to finish and then returns all the output at once. There is no real-time stream of data during execution, so `stream: no`.

- `execFile`: The `execFile` method does not use the shell to execute a file directly. Unlike `exec`, you can't use shell-specific syntax, making it more secure for running external files. As a result, `shell: no`.

  Like `exec`, `execFile` returns the output in a bundle once the process is completed, so there is no real-time stream of data during execution, so `stream: no`.

- `spawn`: The `spawn` method does not use the shell to execute a file or command directly. Unlike `exec` and `execFile`, you can't use shell-specific syntax. This makes it more secure but means you can't execute shell built-ins directly. As a result, `shell: no`.

  The `spawn` method provides real-time output in the form of streams, allowing continuous interaction during execution. This means that you can receive data from the child process as it is generated and send data to it during execution, making it suitable for long-running processes or processes that require interactive communication, so `stream: yes`.

- `fork`: The `fork` method is a variation of the `spawn` method specifically designed for running Node.js modules as separate processes. Like `spawn`, it does not use the shell (shell: no). It provides real-time output streams during execution, similar to `spawn`, so `stream: yes`.

NodeWatch utilizes the `spawn` method to start the Node.js application as a child process. By setting `stdio: 'inherit'`, the child process uses the `stdin`, `stdout`, and `stderr` of the parent process, allowing real-time communication between the parent and child processes. This ensures that the logs and errors from the Node.js application are displayed directly in the terminal as they occur.

Here's an example of how `spawn` is used in NodeWatch:

```js
const { spawn } = require('node:child_process');
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const fs = require('fs');

// ... other code ...

const start = debounce(() => {
  spawn('node', [name], { stdio: 'inherit' });
}, 100);

chokidar.watch('.').on('add', start).on('change', start).on('unlink', start);
```

The `chokidar` package is used to watch for file changes in the current directory. When a change is detected (add, modify, or remove), the `start` function is called using `lodash.debounce` to prevent excessive restarts during rapid file changes. The `start` function kills the previous child process (if it exists) and starts a new one by spawning the Node.js application with the specified file name.

Overall, nodeWatch provides an efficient and user-friendly way to streamline the development process by automatically monitoring and restarting the Node.js application on file changes, enhancing productivity, and reducing manual effort.

## Installation from git repository

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

This will create a symbolic link for the app.js file, allowing you to run the app from any directory (globally) by typing `nodewatch` or `browatch` in the terminal.

## Usage

1. Install NodeWatch by cloning the repository.

2. Navigate to the directory of your Node.js application.

3. Run NodeWatch with the desired file to execute:

```bash
$ nodewatch [filename]
```

- If no filename is provided, `app.js` will be used as the default file.

4. NodeWatch will start monitoring the current directory for file changes.

5. Whenever a file is added, modified, or removed, NodeWatch will automatically restart the Node.js application and display the updated status in the terminal.

**NOTE**: Either of the commands `nodewatch` or `browatch` works the same!

## Example

In the project directory, there are two files: `server.js` and `test.js`. To run the application using NodeWatch with `test.js` as the entry file, execute the following command:

```bash
nodewatch test.js
OR
browatch test.js
```

You will see the terminal logs indicating the startup process. While the application is running, try changing the text within a `console.log` statement in the `test.js` file. NodeWatch will detect the change and automatically restart the application, reflecting the updated log message in the terminal.

## Acknowledgements

- [lodash.debounce](https://www.npmjs.com/package/lodash.debounce) - For implementing debouncing functionality.
- [chokidar](https://www.npmjs.com/package/chokidar) - For monitoring file changes in the directory.
- [caporal](https://www.npmjs.com/package/caporal) - For building the command-line interface.
- [chalk](https://www.npmjs.com/package/chalk) - For styling and coloring the

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Screenshots

![nodewatch help command](https://i.imgur.com/RmdKWN0.png)

![nodewatch starting a process](https://i.imgur.com/a2zljI5.png)

![nodewatch starting a new process while running current process](https://i.imgur.com/QUeJo3g.png)

![nodewatch starting express server process](https://i.imgur.com/1kNizWG.png)

![nodewatch starting new process detecting change in express server](https://i.imgur.com/wZfUcIr.png)
