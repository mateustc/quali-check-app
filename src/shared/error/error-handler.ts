import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { NotificationService } from '../../shared/notifications/notification.service';
import { LoggingService } from '../../shared/logging/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      message = errorService.getServerErrorMessage(error);
      notifier.error(message);
    } else {
      message = errorService.getClientErrorMessage(error);
      notifier.error(message);
    }
    logger.logError(message, stackTrace);
  }
}
