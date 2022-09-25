import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'app/shared/Document.service';
import { Document, DocumentList } from 'app/shared/models/Document.model';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

interface company {
  value: any;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  Yes: Boolean | undefined;


  formModel: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private DocumentService: DocumentService) { }

  ngOnInit() {
    this.formModel = this.fb.group({
      FirstName: ['', Validators.required],
      Surname: ['', Validators.required],
      Email: ['', Validators.required],
      IdNumber: ['', Validators.required],
      Passwords: this.fb.group({
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      }, { validator: this.comparePasswords })

    });
  }
  onSubmit() {

    console.log(this.formModel.valid)
    console.log(this.formModel.value)
    if (this.formModel.valid) {
        this.auth.register(this.formModel.value).subscribe(
          (res: any) => {
            this.formModel.reset();
            this.router.navigate(['/login']);
            alert(res.innerData.message);
          },
          error => {
            alert(error);
          }
        );



    }

  }




  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }




}
