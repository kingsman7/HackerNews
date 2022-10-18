import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diff'
})
export class DiffPipe implements PipeTransform {

  transform(value: string | Date): string {

    const today:Date = new Date();
    const created:Date = new Date(value);
    const diffMs = Math.abs(today.getTime() - created.getTime()); // 
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //
    return diffDays > 0 ? `${diffDays} days ago`: diffHrs > 0 ? `${diffHrs} hours ago`: diffMins > 0 ? `${diffMins} mins ago` : 'Just Now' ;
  }

}
