import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cryptocloud',
  templateUrl: 'cryptocloud.component.html',
  styleUrls: ['cryptocloud.component.sass']
})
export class CryptoCloudComponent {
  apiKey: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiTVRRMU1qWT0iLCJ0eXBlIjoicHJvamVjdCIsInYiOiJhZjFjZTZhMWZjMzY2YWY2YzFkNTE4ZmRiNTEwYmU4ODllMjljMWQ2N2E5MDVmY2Q0NTI5MDU2MzUzMzMyODViIiwiZXhwIjo4ODA5MDExOTc0MH0.qEBtrTCDoF03Q4kw59t8HIVhKM10JnFyDXvqGDX5O1Q"
  shopId: string = "rg9UAeQpOfDrco7j"

  @ViewChild('payBtn') payBtn!: ElementRef

  cryptoCloudForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    amount: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),
  })

  pay() {
    let a = <HTMLLinkElement>this.payBtn.nativeElement.querySelector('.btn-crypto')

    let b = ''

    a.click()
    this.cryptoCloudForm.reset()
  }
}
