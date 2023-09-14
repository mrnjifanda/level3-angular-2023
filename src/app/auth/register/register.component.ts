import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regex_password: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;
  registerForm: FormGroup = new FormGroup({});
  saveError: string = '';

  constructor (
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  private confirmPassword(password: string, confirm_password: string) {
    return (formGroup: FormGroup) => {

      const old_password = formGroup.controls[password];
      const new_password = formGroup.controls[confirm_password];
      if (old_password.errors && !new_password.errors?.['confirmed_validator']) {
        return ;
      }

      if (old_password.value !== new_password.value) {

        new_password.setErrors({ confirmed_validator: true })
      } else {

        new_password.setErrors(null)
      }
    }
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name:['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.pattern(this.regex_password)
      ]],

      confirm_password: ['', [
        Validators.required,
        Validators.pattern(this.regex_password)
      ]]
    },
    {
      validator: this.confirmPassword('password', 'confirm_password')
    })
  }

  onSubmit(): void {

    const save = this.authService.register(this.registerForm.value);
    if (!save.error) {

      this.router.navigate(['dashboard'], {

        queryParams: {id: save.data.id}
      })
    } else {

      this.saveError = save.message
    }
  }

}
