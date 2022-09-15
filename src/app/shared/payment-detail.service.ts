import { PaymentDetail } from './payment-detail.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  formData: PaymentDetail= new PaymentDetail();
  url : string = 'http://localhost:3000/PaymentDetail';
  list!: PaymentDetail[];

  constructor(private http: HttpClient) { }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData);
  }
  putPaymentDetail() {
    return this.http.put(`${this.url}/${this.formData.id}`, this.formData);
  }
  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  refreshList() {
    this.http.get(this.url)
      .toPromise()
      .then(res =>this.list = res as PaymentDetail[]);
  }
}