#!/usr/bin/env node

/* eslint-disable no-console, newline-after-var, camelcase, prefer-template */
const fs = require('fs');
const path = require('path');

const files = process.argv.slice(2);

for (let file of files)
{
    if (file === '-h')
    {
        console.log(`Usage: pixi-animate-build-dts path/to/file1.js path/to/file2.js`);
    }

    if (!path.isAbsolute(file))
    {
        file = path.resolve(process.cwd(), file);
    }
    let source;
    try
    {
        source = fs.readFileSync(file, 'utf8');
    }
    catch (e)
    {
        console.log(e.message);
        continue;
    }

    // start off by importing pixi-animate
    let output = `import * as animate from \'pixi-animate\';
`;

    const classes = [];
    // get set up to find any classes that are in the library, and make a list
    const classFinder = /data\.lib\.([a-zA-Z_$0-9]+) = class extends (MovieClip|Container)/g;
    let foundClass = classFinder.exec(source);
    while (foundClass)
    {
        // need to know class name & base class (Container, MovieClip)
        const [, className, baseClass] = foundClass;
        // figure out where the constructor starts, so that we can figure out where it ends
        const constructorStartRegex = /constructor\(/g;
        constructorStartRegex.lastIndex = foundClass.index + foundClass[0].length;
        const c = constructorStartRegex.exec(source);
        const constructorStart = c.index + c[0].length;
        let constructorEnd;
        // search for the constructors closing bracket, allowing for interfering {} blocks
        let bracketDepth = 0;
        const bracketFinder = /{|}/g;
        bracketFinder.lastIndex = constructorStart;
        let bracket = bracketFinder.exec(source);
        while (bracket)
        {
            if (bracket[0] === '}' && --bracketDepth === 0)
            {
                constructorEnd = bracket.index;
                break;
            }
            if (bracket[0] === '{')
            {
                bracketDepth++;
            }
            bracket = bracketFinder.exec(source);
        }
        // grab a string of just the constructor
        const constructor = source.substring(constructorStart, constructorEnd);
        // loop through all the properties defined in the constructor (if any)
        const propFinder = /this\.([a-zA-Z0-9$_]+) = new (data\.lib\.)?([a-zA-Z0-9$_]+)/g;
        const props = [];
        let foundProp = propFinder.exec(constructor);
        while (foundProp)
        {
            const [, name, source, type] = foundProp;
            // track property name, source of property (data.lib. vs nothing), and type
            props.push({
                name,
                source,
                type,
            });
            foundProp = propFinder.exec(constructor);
        }
        // now that we have all the data, add it to the list
        classes.push({
            className,
            baseClass,
            props,
        });
        foundClass = classFinder.exec(source);
    }
    // for each class, set up a declaration for it
    for (const classData of classes)
    {
        output += `declare class ${classData.className} extends animate.${classData.baseClass} {
${classData.props.map(({ name, source, type }) => `    ${name}: ${source ? '' : 'animate.'}${type};`).join('\n')}
}
`;
    }
    // create an interface for our specific library
    output += `interface Lib {
${classes.map(({ className }) => `    ${className}: typeof ${className};`).join('\n')}
}
`;
    // declare the data object, mix in our specific library (can't override it, I think?)
    output += `declare const data: animate.AnimateAsset & {lib: Lib};
`;
    output += `${source.match(/export default data/) ? 'export default' : 'export ='} data;
`;
    if ((/export {[a-zA-Z0-9$_]+}/).test(source))
    {
        output += `export {${classes.map(({ className }) => className).join(', ')}};`;
    }

    fs.writeFileSync(file.replace('.js', '.d.ts'), output, 'utf8');
}
