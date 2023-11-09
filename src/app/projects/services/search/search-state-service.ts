import { Injectable} from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

    private searchrequest: FormGroup;
    private FlightForm: FormGroup;

    public get searchRequest(): FormGroup{
        return this.searchrequest;
    }

    public set searchRequest(value: FormGroup){
        this.searchrequest = value;
    }

    public get FlightCodeTransferRequest(): FormGroup {
        return this.FlightForm;
    }

    public set FlightCodeTransferRequest(value: FormGroup) {
        this.FlightForm = value;    
    }
}