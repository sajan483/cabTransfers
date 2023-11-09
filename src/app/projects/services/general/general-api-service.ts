import { HttpClient} from "@angular/common/http";
import { Injectable} from "@angular/core";
import { SignatureRequest } from "../../model/signature/signature-request";
import { Observable, catchError, from, map, of } from "rxjs";
import { SignatureResponse } from "../../model/signature/signature-response";
import { GetAgentProfileRequest } from "../../model/agentProfile/agentProfileRequest";
import { GetAgentProfileResponse } from "../../model/agentProfile/agentProfileResponse";

@Injectable({
  providedIn: 'root',
})
export class GeneralApiService {
  constructor(private http: HttpClient) {}

  getSignature(request?: SignatureRequest): Observable<SignatureResponse> {
    return this.http.post<SignatureResponse>('/Utils/Signature', request);
  }

  getAgentProfile(gplRequest: GetAgentProfileRequest): Observable<GetAgentProfileResponse> {
    return this.http.post<GetAgentProfileResponse>(`/utils/AgentProfile`, gplRequest);
  }

  getTransfersAvailability(data: any): Observable<any> {
    return this.http.post(`Transfers/TransferAvailability`, data);
  }

  checkLogin(): Observable<boolean> {
    return from(new Promise<string | null>((resolve) => {
      if (typeof localStorage !== 'undefined') {
        resolve(localStorage.getItem('TOKEN'));
      } else {
        resolve(null);
      }
    })).pipe(
      map((token: string | null) => {
        return token !== null && token !== '';
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

}