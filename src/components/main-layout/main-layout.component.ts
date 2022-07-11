import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core/auth/auth.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

    authUser$: Observable<any>;

    appPages = [];

    constructor(
        private navCtrl: NavController,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.appPages = this.authService.loadMenuItens();
        this.authUser$ = this.authService.getAuthUser();
    }

    logout() {
        this.authService.logout();
        this.navCtrl.navigateRoot('/login');
    }
}
