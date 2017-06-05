import {App} from '../../src/app';

describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('Wallaby aurelia-cli ES6 Babel example project');
  });
});
