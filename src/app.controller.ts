import { Body, Controller, Get } from '@nestjs/common';
import { IsPassword } from './common/decorators';

class TestDto {
    @IsPassword({ message: 'Password must be a string' })
    name: string;
}

@Controller('/')
export class AppController {
    @Get('/ping')
    pingAlive() {
        return 'pong';
    }

    @Get('/test-validator')
    testValidator(@Body() body: TestDto) {
        return body;
    }
}
