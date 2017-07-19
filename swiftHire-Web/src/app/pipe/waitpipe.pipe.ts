import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waitpipe', pure: false
})
export class WaitPipe implements PipeTransform {

  transform(items: any, field?: any): any {
    if (!items) return [];

    // get userId from localStorage
    // todo
    //let userId = 3;
    return items.filter(i => !i.candidate);
  }

}
