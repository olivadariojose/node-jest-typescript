import type {Config} from 'jest';

const config: Config={
    preset:'ts-jest',
    testEnvironment:'node',
    collectCoverage:true,
    collectCoverageFrom:['src/domain/**/*.*'],
    coverageThreshold:{
        global:{
            branches:100,
            functions:100,
            lines:100,
            statements:100
        }
    }
}

export default config;