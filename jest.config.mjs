import base from './node_modules/@pixi/extension-scripts/lib/configs/jest.mjs';

export default {
    ...base,
    // pixi.js v8 pulls in ESM-only dependencies (e.g. earcut); transform
    // them instead of failing on `export` syntax
    transform: {
        ...base.transform,
        '\\.[jt]s$': ['ts-jest', {
            tsconfig: {
                allowJs: true,
                skipLibCheck: true,
                strictNullChecks: false,
                noImplicitAny: false,
                esModuleInterop: true,
                target: 'ES2020',
            },
            diagnostics: false,
        }],
    },
    transformIgnorePatterns: ['node_modules/(?!(earcut)/)'],
};
