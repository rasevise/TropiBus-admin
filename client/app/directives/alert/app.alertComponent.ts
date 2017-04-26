import { Component, OnInit, Inject } from '@angular/core';

import { AlertService } from '../../services/app.alertService';

@Component({
    selector: 'alert-temp',
    templateUrl: './app/directives/alert/alert.html'
})

export class AlertComponent {
    message: any;

    constructor(@Inject(AlertService) private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}