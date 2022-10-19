import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'diff'
})
export class DiffPipe implements PipeTransform {

  /**
   * It takes a date and returns a string in the format of "X days ago" or "X hours ago" or "X mins
   * ago" or "Just Now"
   * @param {string | Date} value - string | Date - The value to be transformed.
   * @returns A string.
   */
  transform(value: string | Date): string {
    const today:Date = new Date();
    const created:Date = new Date(value);
    const diffMs = Math.abs(today.getTime() - created.getTime());
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); 
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
    return diffDays > 0 ? `${diffDays} days ago`: diffHrs > 0 ? `${diffHrs} hours ago`: diffMins > 0 ? `${diffMins} mins ago` : 'Just Now' ;
  }

}
