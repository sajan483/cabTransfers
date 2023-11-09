import { Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaxDetailsStateService {
    public pricingresponse = new BehaviorSubject<any>(null);

    public pricingResponse(value: any){
        this.pricingresponse.next(value);
    }
}
