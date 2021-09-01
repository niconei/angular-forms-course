import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // Using FormControl

    //email: FormControl = new FormControl(
    //   '',
    //   {validators: [Validators.required, Validators.email], updateOn: 'blur'},
    // );
    // password: FormControl =  new FormControl(
    //   '',
    //   {validators: [Validators.required, Validators.minLength(8)]}
    // );

  // Using FormBuilder

    form: FormGroup = this.fb.group({
      email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

  constructor(private fb: FormBuilder) {


  }

  ngOnInit() {

  }

  get email() {
    return this.form?.controls['email'];
  }

  get password() {
    return this.form?.controls['password'];
  }

}
