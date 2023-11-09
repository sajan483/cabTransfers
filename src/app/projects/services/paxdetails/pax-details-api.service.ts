import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class paxAPIService {

    constructor(private http: HttpClient) {}

    getTransferPricing(request): Observable<any>{
        return this.http.post("Transfers/TransferPricing", request);
    }
}