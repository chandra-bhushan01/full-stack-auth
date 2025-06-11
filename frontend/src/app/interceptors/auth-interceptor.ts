import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
     if (typeof window === 'undefined') {
      return next.handle(req);
    }



    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No token found");
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Modified request with token:", authReq);

    return next.handle(authReq);
  }
}
