// Unit tests only (mixins + animate) — no Electron/WebGL render snapshots.
export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['jest-extended/all'],
    transform: {
        '\\.vert$': 'jest-raw-loader',
        '\\.frag$': 'jest-raw-loader',
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
    testMatch: ['<rootDir>/test/mixins/*.test.ts', '<rootDir>/test/animate/*.test.ts'],
};
