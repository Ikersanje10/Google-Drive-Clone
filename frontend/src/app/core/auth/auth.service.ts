import { inject, Service } from '@angular/core';
import { LoginRequest, OtpRequest, SignupRequest } from './auth.types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class AuthService {
    private http = inject(HttpClient)
    private authUrl: String;

    constructor() {
        this.authUrl = 'http://localhost:8080/'
    }

    login(payload: LoginRequest): Observable<any> {
        return this.http.post(this.authUrl + "api/v1/login", payload, { withCredentials: true });
    }

    verifyOtpCode(payload: OtpRequest): Observable<any> {
        return this.http.post(this.authUrl + "api/v1/login/otp", payload, { withCredentials: true });
    }

    createAccount(payload: SignupRequest): Observable<any> {
        return this.http.post(this.authUrl + "api/v1/signup", payload, { withCredentials: true });
    }

    resendOtpCode(email: string): Observable<any> {
        return this.http.post(this.authUrl + "api/v1/login/resendOtp", email, { withCredentials: true });
    }

    logout(): Observable<void> {
        return this.http.post<void>(this.authUrl + "api/v1/logout", {}, { withCredentials: true });
    }
}
