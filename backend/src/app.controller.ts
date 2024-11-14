import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    // @see https://docs.nestjs.com/controllers#request-payloads
    @Post('/')
    getMatrixNeighborhoods(@Body() matrixBodyInput: { matrix: string }) {
        const matrix = this.appService.parseAndRotateMatrix(matrixBodyInput.matrix);
        return this.appService.matrixToNeighborhoods(matrix);
    }
}
