import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('MyComponent', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('resources/elements/my-element')
      .inView('<my-element first-name.bind="firstName"></my-element>')
      .boundTo({ firstName: 'Bob' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.firstName');
      expect(nameElement.innerHTML).toBe('Bob');
      done();
    }).catch(e => {
      console.log(e.toString());
    });
  });

  afterEach(() => {
    component.dispose();
  });
});
