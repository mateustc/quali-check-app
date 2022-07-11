import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Autenticacao } from '@quali-check/domains';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  auth: Autenticacao;

  constructor(
    public menuCtrl: MenuController,
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.auth = this.activatedRoute.snapshot.data['auth'];
  }
}