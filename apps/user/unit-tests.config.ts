import jestConfig from './jest.config';
export default {
  ...jestConfig,
  testRegex: 'spec.ts$',
};
