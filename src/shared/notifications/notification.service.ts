import { ToastController } from "@ionic/angular";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public toastCtrl: ToastController) { }

  info(message: string): void {
    this.notification(message, 'primary');
  }

  error(message: string): void {
    this.notification(message, 'danger');
  }

  warning(message: string): void {
    this.notification(message, 'tertiary');
  }

  private async notification(message: string, color: string) {
    
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      message: message,
      duration: 5000,
      position: 'top',
      color: color,
      closeButtonText:'FECHAR'
    });

    toast.present();
  }
}
