import { Directive, ElementRef, HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appStringValidator]',
  standalone: true
})

export class StringValidatorDirective {
  // @Input() myValue: string;
  constructor(private el: ElementRef) {
    console.log(el.nativeElement.value);
  }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Remove numeric characters from the input
    inputElement.value = inputValue.replace(/[^a-zA-Z ]/g, '');
    
  }
  
}
