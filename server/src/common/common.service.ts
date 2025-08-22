import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

  get presets() {
    return [
      {
        name: 'preset1',
        description: 'preset1 description',
      },
    ];
  }
}
