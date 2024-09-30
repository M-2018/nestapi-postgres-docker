// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
// import { validate as isUuid } from 'uuid';

// @Injectable()
// export class UuidValidationPipe implements PipeTransform {
//   transform(value: any) {
//     console.log('UUID recibido:', value);
//     if (!isUuid(value)) {
//       console.log('value: ' + JSON.stringify(value));
//       throw new BadRequestException('Invalid UUID format');
//     }
//     return value;
//   }
// }

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      if (!isUuid(value)) {
        throw new BadRequestException('Invalid UUID format');
      }
    }
    return value;
  }
}
