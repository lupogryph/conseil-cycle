/**
 * Conseil de Cycle
 * API
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Auth } from '../model/models';
import { TokenDto } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface AuthServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param auth 
     */
    authControllerConnecter(auth: Auth, extraHttpRequestParams?: any): Observable<TokenDto>;

    /**
     * 
     * 
     */
    authControllerGetProfile(extraHttpRequestParams?: any): Observable<{}>;

}
