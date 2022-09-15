import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})

export class SubmitFormComponent implements OnInit {
  alertupdate:boolean = false;
  altersubmit:boolean = false;
ngForm: any;

  constructor(public service: PaymentDetailService) { }

  ngOnInit():void {
    this.service.refreshList();
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0){
      this.insertRecord(form);}
    else{
      this.updateRecord(form);}
  }
  
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.alertupdate = true;
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
  
  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.altersubmit = true;
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }

  close_alert(){
    this.alertupdate = false;
    this.altersubmit = false;
  }
}