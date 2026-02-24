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

  // ── Updated with your actual EmailJS credentials from screenshots ──
  private SERVICE_ID  = 'service_6iyb12z';        // From your screenshot
  private TEMPLATE_ID = 'template_y45bo4c';       // From your screenshot
  private PUBLIC_KEY  = 'D8msF66txiCIUbVJx';      // From your screenshot

  constructor(private fb: FormBuilder, public themeService: ThemeService) {
    // Initialize EmailJS with your public key
    emailjs.init(this.PUBLIC_KEY);
    
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
    // From your screenshots, your template uses: {{fullName}}, {{email}}, {{message}}
    const templateParams = {
      fullName: fullName,    // Changed from from_name to match your template
      email: email,          // Changed from from_email to match your template
      message: message       // This matches your template
      // to_email is not needed as it's set in the EmailJS template
    };

    emailjs
      .send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
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