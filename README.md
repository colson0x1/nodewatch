# NodeWatch

**NodeWatch** is a command-line tool that watches for changes in a Node.js application and automatically restarts it whenever a file is added, modified, or removed. It aims to improve the development workflow by eliminating the need to manually restart the application after every code change.

## Features

- Monitors the specified file or the default file (`app.js`) for changes
- Restarts the Node.js application automatically on file changes
- Provides real-time feedback in the terminal about the application status
- Supports custom file names and paths
- Uses debouncing to prevent excessive restarts during rapid file changes

## Technology behind NODE PROCESSES

NODE
child processes

https://nodejs.org/api/child_process.html#child_processspawncommand-args-options

insides on **process**:
when we start a program from terminal,  a process is created and its assigned. three communication channels: `stdin`, `stdout` and `stderr`

those 3s are used to communicate with the running process. `stdin` can be used to receive information directly from the terminal. about `stdout`  and `stderr`:  whenever our program throws an error or console logs something, its (the process) is going to emit the information over the two channels: `stdout` and `stderr`. in other words, whenever you console log in node applications, `stdout` is responsible to pass that information to the terminal. in similar fashion, if program throws error or we want to construct error, than our process writes some information to the `stderr` channel and its sent to the terminal.

**child process**
when we created the child process, the `stdout`, `stdin`, `stderr` of child process , nothing is waiting to receive output in the `stdout` or `stderr` or give input to `stdin`. in order for it to communicate, we can pass argument in span like:
```js
{ stdio: 'inherit' }
```
it says, when we created child process, take the `stdin`, `stdout`, `stderr` that belong to our current process (primary process). hence now, the child process `stdout` will be sent to parent process `stdout` and it will be sent to the terminal. rest happens in similar fashion too.


```
exec - (shell: yes), (stream: no)
execFile - (shell: no), (stream: no)
spawn - (shell: no), (stream: yes)
fork - (shell: no), (stream: yes)
```

### SHELL
`exec` wil use shell hence `stdout` can be passed to other program but those three: `execFile`, `spawn` and `fork` can only run singular program at a time w arguments.

### STREAM
stream means how information from **standard IO** from that child process gets sents back to the primary process.

when `exec` and `execFile` are used, the **parent process** creates a **new process**. and its consoles.logs in order. when that each console.logs is completed i.e when the **process is completed**, its sent to the **output** which has all the logs, the process generated and that's sent to the **parent process**.

when `spawn` and `fork` are used, the **parent process** creates a new **process process** and this time, suppose there are 5 console.logs, here, each console.logs are sent to the **parent process** through the **output**: `stdout` and when the **process is completed**,  we don't get any bundle of information as its already sent to the primary process.

`spawn` is unique. it has some available options which when passed can acts like `exec`, `execFile`, and `fork`. like if we pass it a `shell` argument as described in the docs, we can make `spawn` use the **shell** which by default it does not use it.

https://nodejs.org/api/child_process.html#child_processspawncommand-args-options

use of `spawn` example

```js
const { spawn } = require('node:child_process');
...
const start = debounce(() => {
  spawn('node', [name], { stdio: 'inherit' });
}, 100);
```

docs
https://nodejs.org/api/child_process.html


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

1. Install NodeWatch by cloning through github.

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
