import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn:'root'
})
export class JWTInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let updatedRequest = request.clone();
    const token = localStorage.getItem('TOKEN');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(token)}`,
    });

    if (request.url.includes('/Signature')) {
      updatedRequest = updatedRequest.clone({
        url: `${environment.utils.util}${request.url}`,
      });
    } else if (request.url.includes('/AgentProfile')) {
      updatedRequest = updatedRequest.clone({
        url: `${environment.utils.util}${request.url}`,
        headers,
      });
    } else {
      updatedRequest = updatedRequest.clone({
        url: `${environment.BASE_URL}${request.url}`,
        headers,
      });
    }

    return next.handle(updatedRequest);
  }
}