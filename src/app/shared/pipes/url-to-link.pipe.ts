import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlToLink'
})
export class UrlToLinkPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const urlPattern = /(<a.*?>)?(href="|href='|src="|src=')?(http:\/\/|ftp:\/\/|https:\/\/)?(www\.)?(@)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
    value = value || '';
    return value.replace(urlPattern, function (match, p1, p2, p3, p4, p5, p6) {
      if (p1) {
        return match;
      }
      if (p2) {
        return match;
      }
      if (p5) {
        return match;
      }
      if (p3) {
        return '<a target="_blank" href=' + match + '>' + match + '</a>';
      }
      if (p4) {
        return '<a target="_blank" href=https://' + match + '>' + match + '</a>';
      }
      if (p6 == '.com' || p6 == '.net' || p6 == '.com.au'
        || p6 == '.au' || p6 == '.io') {
        return '<a target="_blank" href=https://' + match + '>' + match + '</a>';
      }
      return match;
    });
  }
}
