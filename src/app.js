import moment from 'moment';
import { exampleUtil } from 'resources/utilities/example-utility';

export class App {
  constructor() {
    this.message = 'Wallaby aurelia-cli ES6 Babel example project';
    console.info(moment, exampleUtil);
  }
}
