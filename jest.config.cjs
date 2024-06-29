module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // тест веб-приложения
  transform: {
    // Трансформация файлов TypeScript с использованием ts-jest
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', // Если есть  JavaScript файлы
    '\\.(webp|png|jpg|jpeg|svg)$': '<rootDir>/imageTransform.cjs',
  },
  moduleNameMapper: {
    '^@baseStyle/(.*)$': '<rootDir>/src/styles/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@utils/(.*)$': '<rootDir>/src/app/utils/$1',
    '^@views/(.*)$': '<rootDir>/src/app/views/$1',
    '^@controllers/(.*)$': '<rootDir>/src/app/controllers/$1',
    '^@models/(.*)$': '<rootDir>/src/app/models/$1',
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@components/(.*)$': '<rootDir>/src/app/components/$1',
    '\\.(webp|png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
