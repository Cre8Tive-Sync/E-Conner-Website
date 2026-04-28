#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const args = process.argv.slice(2);
const shouldDeploy = !args.includes('--no-deploy');
const shouldBuild = !args.includes('--skip-build');
const forwardedArgs = args.filter((arg) => arg !== '--no-deploy' && arg !== '--skip-build');

function run(command) {
  console.log(`\n$ ${command}`);
  execSync(command, {
    cwd: projectRoot,
    stdio: 'inherit',
    env: process.env,
  });
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required before running the Vercel deployment helper.');
  process.exit(1);
}

if (!existsSync(path.join(projectRoot, '.vercel', 'project.json'))) {
  console.warn('This project is not linked to Vercel yet. Run "npx vercel link" first if deployment fails.');
}

run('npx prisma validate');
run('npx prisma generate');

if (shouldBuild) {
  run('npm run build');
}

if (!shouldDeploy) {
  console.log('\nPreflight completed. No deployment was triggered because --no-deploy was provided.');
  process.exit(0);
}

const deployCommand = ['npx', 'vercel', 'deploy', '--prod', ...forwardedArgs].join(' ');
run(deployCommand);