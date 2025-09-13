// import type {Config} from 'jest';

// const config: Config={
//     preset:'ts-jest',
//     testEnvironment:'node',
//     testMatch:['<rootDir>/src/tests/**/*.spec.ts'],
//     collectCoverage:true,
//     collectCoverageFrom:['src/domain/**/*.*'],
//     coverageThreshold:{
//         global:{
//             branches:100,
//             functions:100,
//             lines:100,
//             statements:100
//         }
//     }
// }

// export default config;


// /** @type {import('jest').Config} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
//   collectCoverage: true,
//   collectCoverageFrom: ['src/domain/**/*.*'],
//   coverageThreshold: {
//     global: { branches: 100, functions: 100, lines: 100, statements: 100 }
//   },
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', { tsconfig: { module: 'commonjs' } }]
//   }
// };

// /** @type {import('jest').Config} */
// module.exports = {
//   preset: 'ts-jest/presets/default-esm',
//   testEnvironment: 'node',
//   extensionsToTreatAsEsm: ['.ts'],
//   testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
//   collectCoverage: true,
//   collectCoverageFrom: ['src/domain/**/*.*'],
//   coverageThreshold: {
//     global: { branches: 100, functions: 100, lines: 100, statements: 100 }
//   },
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: './tsconfig.json' }]
//   }
// };


/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/domain/**/*.*'],
  coverageThreshold: {
    global: { branches: 100, functions: 100, lines: 100, statements: 100 }
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: './tsconfig.json' }]
  }
};
