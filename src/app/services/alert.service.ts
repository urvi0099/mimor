import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertModal } from '../shared/modals/alert/alert.component';


@Injectable()
export class AlertService {
  constructor(
    private modalController: ModalController) {
    }

  public async show(message, title?) {
    const modal = await this.modalController.create({
      component: AlertModal,
      cssClass: 'alert-modal',
      componentProps: {
        'message': message,
        'title': title || 'Oops'
      }
    });
    return await modal.present();
  }
}
