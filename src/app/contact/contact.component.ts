import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from 'emailjs-com';
import { CommonConstant } from '../constants/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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

    try {
      const respEmail = await emailjs.send(
        CommonConstant.SERVICE_KEY,
        CommonConstant.TEMPLATE_KEY,
        templateParams,
        CommonConstant.API_PUBLIC_KEY
      );

      if (respEmail.status === 200) {
        console.log(respEmail);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "¡Email enviado!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error al enviar",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(error);
    } finally {
      this.form.reset();
    }
  }

}
