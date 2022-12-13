import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailToLink'
})
export class EmailToLinkPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const pattern = /(<a.*?>)?([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+)/g;
    value = value || '';
    return value.replace(pattern, function (match, p1) {
      if (p1) {
        return match;
      }
      return '<a href="mailto:' + match + '">' + match + '</a>';
    });
  };
}
