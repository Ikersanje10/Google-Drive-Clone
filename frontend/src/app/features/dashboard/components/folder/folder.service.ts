import { inject, Service } from '@angular/core';
import { DriveItem } from '../../../../core/dashboard/dashboard.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class FolderService {

    private httpClient = inject(HttpClient);
    private url = "http://localhost:8080/";

    getFolderContent(folder: DriveItem): Observable<DriveItem[]> {
        return this.httpClient.get<DriveItem[]>(this.url + `api/v1/folder/${folder.id}`, { withCredentials: true });
    }

    getFolderFiles(folder: DriveItem): Observable<DriveItem[]> {
        let params = new HttpParams().set("folderName", folder.name);
        return this.httpClient.get<DriveItem[]>(this.url + "api/v1/folder/files", { params: params, withCredentials: true });
    }

}
