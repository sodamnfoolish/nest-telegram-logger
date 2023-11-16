import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TelegramLogger } from './telegram-logger';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const configService = app.get(ConfigService);

  app.useLogger(
    new TelegramLogger(
      configService.getOrThrow<string>('TELEGRAM_TOKEN'),
      configService.getOrThrow<string>('TELEGRAM_CHAT_ID'),
      `Nest app`,
    ),
  );

  await app.init();
}
bootstrap();
