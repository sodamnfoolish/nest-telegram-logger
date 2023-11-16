import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Telegram } from 'telegraf';

export class TelegramLoggerOptions {
  verbose?: boolean;
  log?: boolean;
  warn?: boolean;
  error?: boolean;
}

@Injectable()
export class TelegramLogger extends ConsoleLogger {
  private readonly telegram: Telegram;
  private readonly logLevels: TelegramLoggerOptions;

  constructor(
    token: string,
    private readonly chatId: string,
    context: string,
    logLevels?: TelegramLoggerOptions,
  ) {
    super(context);
    this.telegram = new Telegram(token);
    this.logLevels = {
      verbose: logLevels?.verbose ?? true,
      log: logLevels?.log ?? true,
      warn: logLevels?.warn ?? true,
      error: logLevels?.error ?? true,
    };
  }

  private sendMessage(message: string) {
    this.telegram.sendMessage(this.chatId, message).catch(super.error);
  }

  public verbose(message: any) {
    if (this.logLevels.verbose)
      this.sendMessage(`🟦 ${this.context}\n${message}`);
    super.verbose(message);
  }

  public log(message: any) {
    if (this.logLevels.log) this.sendMessage(`🟩 ${this.context}\n${message}`);
    super.log(message);
  }

  public warn(message: any) {
    if (this.logLevels.warn) this.sendMessage(`🟧 ${this.context}\n${message}`);
    super.warn(message);
  }

  public error(message: any) {
    if (this.logLevels.error)
      this.sendMessage(`🟥 ${this.context}\n${message}`);
    super.error(message);
  }
}
