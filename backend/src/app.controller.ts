import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @see https://docs.nestjs.com/controllers#request-payloads
    @Post('/')
    getMatrixNeighborhoods(@Body() matrixBodyInput: { matrix: string }) {
        // TODO: After you implement the `parseAndRotateMatrix` method in the `AppService` replace `parseMatrix` with it
        const matrix = this.appService.parseMatrix(matrixBodyInput.matrix);
        return this.appService.matrixToNeighborhoods(matrix);
    }
}
