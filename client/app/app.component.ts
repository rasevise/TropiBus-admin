import { Component } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { RoutesService } from './components/routepaths/routes.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  providers:[ RoutesService ],
})

export class AppComponent {
}
