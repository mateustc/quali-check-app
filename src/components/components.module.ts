import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { CardCounterComponent } from './card-counter/card-counter.component';
import { CardMetaComponent } from './card-meta/card-meta.component';
import { NotificationModalPageModule } from './notification-modal/notification-modal.module';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ImageUploadPreviewComponent } from './image-upload-preview/image-upload-preview.component';
import { FormEnderecoComponent } from './form-endereco/form-endereco.component';
import { FormEnderecoModalComponent } from './form-endereco/form-endereco-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormContatoModalComponent } from './form-contato/form-contato-modal.component';
import { FormContatoComponent } from './form-contato/form-contato.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NotificationModalPageModule
  ],
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    PreloadImageComponent,
    CardCounterComponent,
    CardMetaComponent,
    ShowHidePasswordComponent,
    ImageUploadPreviewComponent,
    FormEnderecoComponent,
    FormEnderecoModalComponent,
    FormContatoComponent,
    FormContatoModalComponent
  ],
  exports: [
    AuthLayoutComponent,
    MainLayoutComponent,
    PreloadImageComponent,
    CardCounterComponent,
    CardMetaComponent,
    ShowHidePasswordComponent,
    FormEnderecoComponent,
    FormEnderecoModalComponent,
    FormContatoComponent,
    FormContatoModalComponent
  ],
  entryComponents: [FormEnderecoModalComponent, FormContatoModalComponent],
})
export class ComponentsModule { }
