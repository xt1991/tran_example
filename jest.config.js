module.exports = {
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/__jest__/setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)(spec|test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFiles: ['dotenv/config'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.(interface|constant|type|validator|redisClient|index|mock|controller).{ts,js}',
    '!src/**/(interface|constant|type|validator|redisClient|index|mock|controller).{ts,js}',
    '!**/__mocks__/**',
    '!**/node_modules/**',
    '!**/internalAdapter/**',
    '!src/common/**',
    '!src/socket.ts',
    '!src/config.ts',
  ]
};
