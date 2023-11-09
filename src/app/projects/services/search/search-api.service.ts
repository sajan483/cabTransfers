import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GeneralStateService } from "../general/general-state-service";
import { TransferLocationsRequest } from "../../model/TransferGetFromLocations/transferLocations-request";

@Injectable({
    providedIn: 'root'
  })
  export class SearchAPiService {

    constructor(private http: HttpClient, public generalState: GeneralStateService){}

    getTransferGetCountries(): Observable<any>{
        return this.http.get("Transfers/TransferGetCountries");
    }  
    
    getTransferLocations(request: TransferLocationsRequest): Observable<any>{
      return this.http.post("Transfers/TransferGetLocations", request);
    }

    getRecentSearch(request): Observable<any>{
      return this.http.post("Core/GetRecentSearch", request);
    }

    setRecentSearch(request): Observable<any>{
      return this.http.post("Core/SaveRecentSearch", request);
    }
  }