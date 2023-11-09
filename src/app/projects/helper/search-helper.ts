import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SearchStateService } from "../services/search/search-state-service";
import { SearchRequrest } from "../model/searchRequest/searchRequest";
import moment from "moment";
import { TimeConvert } from '../pipes/time.pipe';

@Injectable({
    providedIn: 'root'
})
export class SearchHelper {
    public timeConverter = new TimeConvert();
    constructor(public fb: FormBuilder, public stateSearch: SearchStateService) { }

    createsearchformgroup(searchRequest: SearchRequrest) {
        const formGroup = this.fb.group({
            type: [searchRequest.type, [Validators.required]],
            tripType: [searchRequest.tripType, [Validators.required]],
            country: [searchRequest.country, [Validators.required]],
            country_code: [searchRequest.country_code, [Validators.required]],
            pickUp: [searchRequest.pickUp, [Validators.required]],
            dropOff: [searchRequest.dropOff, [Validators.required]],
            ArrDate: [moment(searchRequest.ArrDate).format(), [Validators.required]],
            ArrTime: [moment().format('HH:mm'), [Validators.required]],
            RetDate: [searchRequest.RetDate],
            RetTime: [searchRequest.RetTime],
            adult: [searchRequest.adult, [Validators.required]],
            child: [searchRequest.child, [Validators.required]]
        });
        this.stateSearch.searchRequest = formGroup;
    }
    updatesearchformgroup(recentSearch) {
        this.stateSearch.searchRequest.patchValue({
            tripType: recentSearch.Timings.RetDate ? 'Round': 'OneWay',
            country: "Uae",
            country_code: recentSearch.Location.CountryCodeFrom,
            pickUp: recentSearch.Location.PlaceFrom,
            dropOff: recentSearch.Location.PlaceTo,
            ArrDate: moment(recentSearch.Timings.ArrDate).format(),
            ArrTime: this.timeConverter.transform(recentSearch.Timings.ArrTime),
            RetDate: recentSearch.Timings.RetDate && recentSearch.Timings.RetDate !== "Invalid date" ? moment(recentSearch.Timings.RetDate).format(): '',
            RetTime: recentSearch.Timings.RetTime ? this.timeConverter.transform(recentSearch.Timings.RetTime): '',
            adult: Number(recentSearch.Adults),
            child: Number(recentSearch.Children)
        })
    }
}
