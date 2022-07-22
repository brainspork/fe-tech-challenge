import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appSsnMask]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class SsnMaskDirective {

  constructor(public model: NgControl) { }

  // modified from: https://stackoverflow.com/questions/37800841/mask-for-an-input-to-allow-phone-numbers
  onInputChange(event: string, backspace: boolean) {
    // remove all mask characters (keep only numeric)
    console.log(event)
    var newVal = event.replace(/\D/g, '');

    // don't show braces for empty value
    if (newVal.length == 0) {
      newVal = '';
    } 
    // don't show braces for empty groups at the end
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 5) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})/, '$1-$2');
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,2})(.*)/, '$1-$2-$3');
    }
    // set the new value
    this.model.valueAccessor?.writeValue(newVal);       
  }
}
