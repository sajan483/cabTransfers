import { FormGroup } from "@angular/forms";
import { recentGetRequest, recentSaveRequest } from "../model/recentSearch/recent-search-request";
import moment from "moment";

export class SearchAdapter {
    constructor(){}

    createGetRecentRequest(): recentGetRequest {
        let getRequest = {} as recentGetRequest;
        getRequest.TUI = "";
        getRequest.GetRecentID = "";
        getRequest.ClientID = "Trans123"; 
        getRequest.TravelDate = "";

        return getRequest;
    }

    createSaveRecentRequest(searchRequest,operation): recentSaveRequest {
        let saveRequest = {} as recentSaveRequest;
        saveRequest.TUI = "";
        saveRequest.ClientID = "Trans123",
        saveRequest.SearchData = JSON.stringify({
            "Lang": "en", 
            "Request": {
                "TUI": "", 
                "AgentId": ""
            }, 
            "Location": {
                "PlaceFrom": searchRequest.pickUp, 
                "FromType": "", 
                "PlaceTo": searchRequest.dropOff, 
                "ToType": "", 
                "CountryCodeFrom": searchRequest.country_code, 
                "CountryCodeTo": searchRequest.country_code
            }, 
            "Timings": {
                "ArrDate": moment(searchRequest.ArrDate).format('yyyy-MM-DD'), 
                "ArrTime": searchRequest.ArrTime, 
                "RetDate": searchRequest.RetDate ? moment(searchRequest.RetDate).format('yyyy-MM-DD') : "",
                "RetTime": searchRequest.RetTime, 
                "CalcJ1PickupTime": 1, 
                "CalcJ2PickupTime": 1
            }, 
            "Adults": searchRequest.adult, 
            "Children": searchRequest.child, 
            "Infants": 0, 
            "IsReturn": 0, 
            "ResponseType": 0, 
            "OtherToLocations": ""
        }),
        saveRequest.TravelDate = moment(searchRequest.ArrDate).format('yyyy-MM-DD');
        saveRequest.ReturnDate = searchRequest.RetDate ? moment(searchRequest.RetDate).format('yyyy-MM-DD') : "";
        saveRequest.Operation = operation

        return saveRequest;
    }
}