module.exports = {
  apps: [
    {
      name: 'backend-sign',
      script: './dist/src/main.js',
    },
    {
      name: 'worker-sign-bsc',
      interpreter: './node_modules/.bin/ts-node',
      interpreter_args: '-r tsconfig-paths/register',
      script: './src/manage.ts',
      args: 'workerL0 56',
    },
    {
      name: 'worker-sign-poly',
      interpreter: './node_modules/.bin/ts-node',
      interpreter_args: '-r tsconfig-paths/register',
      script: './src/manage.ts',
      args: 'workerL0 42161',
    },
  ],
};
