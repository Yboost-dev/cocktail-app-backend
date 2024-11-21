import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
const cors = require('cors');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe(
        {
            whitelist: true,
            transform: true,
        }
    ));
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }));
    await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
