module.exports = {
  apps: [
    {
      name: 'backend-sign',
      script: './dist/src/main.js',
    },
    {
      name: 'worker-sign-bsc',
      interpreter: 'ts-node',
      interpreter_args: '-r tsconfig-paths/register',
      script: './src/manage.ts',
      args: 'workerL0 56',
    },
    {
      name: 'worker-sign-poly',
      interpreter: 'ts-node',
      interpreter_args: '-r tsconfig-paths/register',
      script: './src/manage.ts',
      args: 'workerL0 42161',
    },
  ],
};
