type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

class Logger {
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private log(level: LogLevel, message: string, meta?: LogMeta): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      sessionId: this.sessionId,
      ...meta
    };

    const color = this.getColor(level);
    const emoji = this.getEmoji(level);

    console[level === 'debug' ? 'log' : level](
      `%c${emoji} [${level.toUpperCase()}] ${message}`,
      `color: ${color}; font-weight: bold`,
      meta ? meta : ''
    );

    if (level === 'error' && meta?.error) {
      console.error('Error details:', meta.error);
    }
  }

  private getColor(level: LogLevel): string {
    const colors = {
      debug: '#6c757d',
      info: '#0dcaf0',
      warn: '#ffc107',
      error: '#dc3545'
    };
    return colors[level];
  }

  private getEmoji(level: LogLevel): string {
    const emojis = {
      debug: '🔍',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌'
    };
    return emojis[level];
  }

  debug(message: string, meta?: LogMeta): void {
    this.log('debug', message, meta);
  }

  info(message: string, meta?: LogMeta): void {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: LogMeta): void {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: LogMeta): void {
    this.log('error', message, meta);
  }
}

export const logger = new Logger();
