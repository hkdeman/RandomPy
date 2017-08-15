import { Pipe, PipeTransform } from '@angular/core';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the YouTubePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'youTube',
})
export class YouTubePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

   constructor(private dom:DomSanitizer)
   {

   }
  transform(value: string, ...args) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }
}
