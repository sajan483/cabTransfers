import { Injectable} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PricingStateService {
    private paxForm: FormGroup;
    private contactInfoForm: FormGroup;
    private childForm: FormGroup;
    private paxItineraryValidation = new BehaviorSubject<boolean>(false);
    private childValidation = new BehaviorSubject<boolean>(false);
    private contactInfoValidation = new BehaviorSubject<boolean>(false);

    constructor() {}

    public get PaxDetailsFormGroup(): FormGroup {
        return this.paxForm;
    }
    
    public set PaxDetailsFormGroup(value: FormGroup) {
        this.paxForm = value;
    }

    public get ChildDetailsFormGroup(): FormGroup {
        return this.childForm;
    }

    public set ChildDetailsFormGroup(value: FormGroup) {
        this.childForm = value;
    }

    public get ContactDetailsFormGroup(): FormGroup {
        return this.contactInfoForm;
    }

    public set ContactDetailsFormGroup(value: FormGroup) {
        this.contactInfoForm = value;
    }

    setPaxValidationData(value: boolean) {
        this.paxItineraryValidation.next(value);
    }

    getPaxValidationData() {
        return this.paxItineraryValidation.asObservable();
    }

    setChildValidationData(value: boolean) {
        this.childValidation.next(value);
    }

    getChildValidataData() {
        return this.childValidation.asObservable();
    }

    setContactInfoValidationData(value: boolean) {
        this.contactInfoValidation.next(value);
    }

    getContactInfoValidationData() {
        return this.contactInfoValidation.asObservable();
    }
}