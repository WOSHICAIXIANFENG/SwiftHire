import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'waitpipe', pure: false
})

// check if myId is in this job's waitList
export class WaitPipe implements PipeTransform {

  transform(items: any, field?: any): any {
    if (!items) return [];

    // get userId from localStorage
    // todo
    //let userId = 3;
    let userId = 3;
    return items.filter(i => {
      if (i.waitingList) {
        if (i.waitingList.filter(u => u._id == userId).length > 0) {
          return true;
        }
      }
      return false;
    });
  }

}
