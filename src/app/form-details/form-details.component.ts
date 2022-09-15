import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css']
})
export class FormDetailsComponent implements OnInit {
  alert_delete : boolean = false;

  constructor(public service : PaymentDetailService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  close_alert(){
    this.alert_delete = false;
  }
  populateForm(selectedRecord:PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }
  onDelete(id:number) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deletePaymentDetail(id)
        .subscribe(res => {
          this.service.refreshList();
          this.alert_delete = true;
        },
        err => { console.log(err); })
    }
  }
}
