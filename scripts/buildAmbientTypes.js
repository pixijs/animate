#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleTypes = fs.readFileSync(path.resolve('./dist/pixi-animate.d.ts'), 'utf8');

// read out any PixiJS imports
const importStatement = (/import {([^}]*)} from "pixi.js";/).exec(moduleTypes);
const importedTypes = importStatement[1].trim().split(', ');

// get fix of any "declare const foo" bits - once inside a namespace, the declare is not wanted
let ambientTypes = moduleTypes.replace(/^declare /mg, '');
// set up individual imports from PIXI namespace
const imports = importedTypes.map((classImport) => `import ${classImport} = PIXI.${classImport};\n`).join('');

// replace existing imports with our declared namespace and our individual imports
// eslint-disable-next-line prefer-template
ambientTypes = ambientTypes.replace(importStatement[0], 'declare namespace PIXI.animate {\n' + imports) + '\n}';

// write out our updated version
fs.writeFileSync(path.resolve('./dist/pixi-animate-ambient.d.ts'), ambientTypes);
// remove unused .d.ts files, just to clean up
fs.unlinkSync(path.resolve('./dist/pixi-animate.d.ts'));
fs.unlinkSync(path.resolve('./lib/pixi-animate.es.d.ts'));
