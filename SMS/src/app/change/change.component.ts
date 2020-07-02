import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import { change } from '../models/form-model';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
changepassForm:FormGroup;
change:change
submitted = false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.changepassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmpassword: ['', Validators.required]
    },
    {
      validator:MustMatch('password', 'confirmpassword')
    })
  }
  get f() { return this.changepassForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.changepassForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.changepassForm.value))
}
}
