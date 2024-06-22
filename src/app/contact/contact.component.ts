import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog:MatDialog) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Process the form data here
      console.log('Form submitted:', this.contactForm.value);
      this.dialog.open(contactModalComponent)
      // alert('Thank you for wanting to contact us! \n For now use email below to contact');
      this.contactForm.reset();
    }
  }

}


@Component({
  selector: 'app-contact-modal',
  templateUrl: './contactModal.html',
  styleUrl: './contact.component.scss'
})

export class contactModalComponent{
  constructor(private dialogRef:MatDialogRef<contactModalComponent>){

  }
  CloseDialog(){
    this.dialogRef.close()
  }
}
