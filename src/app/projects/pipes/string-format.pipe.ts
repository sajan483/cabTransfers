import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFormat',
  standalone: true
})
export class StringFormatPipe implements PipeTransform {

  transform(response: string): string | undefined {
    if (typeof response === 'string') {
      // Replace special characters with spaces
      response = response.replace(/[^a-zA-Z\s]/g, ' ');

      // Remove extra spaces
      response = response.replace(/\s+/g, ' ');

      // Split the response string by spaces
      const words = response.split(' ');

      // Capitalize the first letter of the first word and make the first letter of the remaining words lowercase
      const formattedWords = words.map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
        }
      });

      // Join the formatted words with spaces to create the desired string
      return formattedWords.join(' ');
    }
    return undefined;
  }
}