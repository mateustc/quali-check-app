import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessages } from './error.messages';
import { CFG } from '../../config/cfg';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
    return error.message ?
      this.formatClientErrorMessage(error.message) :
      error.toString();
  }

  formatClientErrorMessage(errorMessage: string): string {
    if (CFG.production) {
      const messages = errorMessage.split('\n');
      return messages[0];
    }else{
      return errorMessage;
    }

  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
      error.message :
      ErrorMessages.Browser.OffLine;
  }

  isUserError(error: object): boolean {
    return error['appError'];
  }

  selectErrorMessage(message: string, error?: object): any {
    let errorMessage: string;
    if (error) {
      if (this.isUserError(error)) {
        errorMessage = error['message'];
      } else {
        errorMessage = message;
      }
    } else {
      errorMessage = message;
    }
    return errorMessage;
  }

  selectHttpErrorMessage(error: HttpErrorResponse): string {
    const message = ErrorMessages.Http[error.status];
    if (!message) {
      const payload = error.error;
      if (payload) {
        return payload.message;
      } else {
        return ErrorMessages.Default;
      }
    }
    return message;
  }
}
