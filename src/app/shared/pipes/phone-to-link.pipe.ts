import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneToLink'
})
export class PhoneToLinkPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const numberPattern = /(<a.*?>)?(\+\d{2}[ \-]{0,1}){0,1}(((\({0,1}[ \-]{0,1})0{0,1}\){0,1}[2|3|7|8]{1}\){0,1}[ \-]*(\d{4}[ \-]{0,1}\d{4}))|(1[ \-]{0,1}(300|800|900|902)[ \-]{0,1}((\d{6})|(\d{3}[ \-]{0,1}\d{3})))|(13[ \-]{0,1}([\d \-]{5})|((\({0,1}[ \-]{0,1})0{0,1}\){0,1}4{1}[\d \-]{8,10})))/g;
    value = value || '';
    return value.replace(numberPattern, function (match, p1) {
      if (p1) {
        return match;
      }
      return '<a href="tel:' + match + '">' + match + '</a>';
    });
  }

}
