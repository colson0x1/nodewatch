#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const prog = require('caporal');
const fs = require('fs');
const { spawn } = require('node:child_process');
const importChalk = async () => {
  try {
    const chalk = await import('chalk');
    return chalk.default;
  } catch (error) {
    console.error('Failed to import chalk:', error);
    process.exit(1);
  }
};

prog
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'app.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file: ${name}`);
    }

    let proc;
    const chalk = await importChalk();
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      const color = chalk.hex('#FFA500');
      const message = '>>> Starting process...';
      console.log(color(message));
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 100);

    chokidar
      .watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

prog.parse(process.argv);
