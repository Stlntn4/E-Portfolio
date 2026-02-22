import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  encapsulation: ViewEncapsulation.None
})
export class Contact {

  isScrolled = false;
  currentYear = new Date().getFullYear();

  contactForm: FormGroup;
  formSubmitted = false;
  isSending = false;
  sendSuccess = false;
  sendError = false;

  // ── Replace these with your actual EmailJS credentials ──
  private SERVICE_ID  = 'YOUR_SERVICE_ID';
  private TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  private PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

  constructor(private fb: FormBuilder, public themeService: ThemeService) {
    this.contactForm = this.fb.group({
      fullName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      message:  ['', Validators.required]
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.sendSuccess = false;
    this.sendError = false;

    if (this.contactForm.invalid) return;

    this.isSending = true;

    const { fullName, email, message } = this.contactForm.value;

    // These keys must match the variables in your EmailJS template
    const templateParams = {
      from_name:  fullName,
      from_email: email,
      message:    message,
      to_email:   'sherene.tolentino4@gmail.com'
    };

    emailjs
      .send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(() => {
        this.isSending = false;
        this.sendSuccess = true;
        this.contactForm.reset();
        this.formSubmitted = false;

        // Hide success message after 5 seconds
        setTimeout(() => (this.sendSuccess = false), 5000);
      })
      .catch((error: unknown) => {
        console.error('EmailJS error:', error);
        this.isSending = false;
        this.sendError = true;

        // Hide error message after 5 seconds
        setTimeout(() => (this.sendError = false), 5000);
      });
  }
}