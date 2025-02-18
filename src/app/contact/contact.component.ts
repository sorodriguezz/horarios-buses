import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { CommonConstant } from '../constants/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private formBuilder = inject(FormBuilder);

  public form = this.formBuilder.group({
    fromName: ['', [Validators.required, Validators.maxLength(100)]],
    toName: [CommonConstant.TO_NAME_DEFAULT],
    message: ['', [Validators.required, Validators.maxLength(200)]],
    email: ['', [Validators.required, Validators.maxLength(100)]]
  });


  async sendEmail(): Promise<void> {
    const formContact = this.form.controls;

    const templateParams = {
      from_name: formContact.fromName.value,
      to_name: formContact.toName.value,
      message: formContact.message.value,
      reply_to: formContact.email.value
    };

    const respEmail = await emailjs.send(
      CommonConstant.SERVICE_KEY,
      CommonConstant.TEMPLATE_KEY,
      templateParams,
      CommonConstant.API_PUBLIC_KEY
    );

    console.log(respEmail);
  }

}
