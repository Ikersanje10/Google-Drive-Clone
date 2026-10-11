import { computed, inject, Service, Signal, signal, WritableSignal } from '@angular/core';
import { DriveItem, DriveContents } from './dashboard.types';
import { Observable, pipe, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Service()
export class DashboardSevice {

    private currectContents = signal<DriveContents>({
        folders: [],
        files: [],
    })
    folders = computed(() => this.currectContents().folders);
    files = computed(() => this.currectContents().files);
    private httpClient = inject(HttpClient);
    private url: string = "http://localhost:8080/";

    getAllFiles(): Signal<DriveItem[]> {
        return this.files;
    }

    getAllFolders(): Signal<DriveItem[]> {
        return this.folders;
    }

    public getRootDriveItems(): Observable<DriveItem[]> {
        return this.httpClient.get<DriveItem[]>(this.url + "api/v1/root/driveItems", { withCredentials: true })
            .pipe(
                tap(list => {
                    this.currectContents.set({
                        folders: list.filter(item => item.type === "FOLDER"),
                        files: list.filter(item => item.type === "FILE"),
                    })
                })
            );
    }

    getFolderContent(folder: DriveItem): Observable<DriveItem[]> {
        return this.httpClient.get<DriveItem[]>(this.url + `api/v1/folder/${folder.id}`, { withCredentials: true })
            .pipe(
                tap(list => {
                    this.currectContents.set({
                        folders: list.filter(item => item.type === "FOLDER"),
                        files: list.filter(item => item.type === "FILE"),
                    })
                })
            );
    }

    public uploadFile(file: File): Observable<DriveItem> {
        return this.httpClient
            .post<DriveItem>(this.url + "api/v1/uploadfile", file, { withCredentials: true })
            .pipe(
                tap(file => this.currectContents().files.push(file)));
    }

    public createFolder(folderName: string, parentFolderId: string | null): Observable<DriveItem> {
        return this.httpClient.post<DriveItem>(this.url + "api/v1/createfolder", { folderName, parentFolderId }, { withCredentials: true })
            .pipe(tap(folder => this.currectContents.update(current => ({
                ...current,
                folders: [...current.folders, folder],
            }))));
    };

    public getFolderById(folderId: string): DriveItem | undefined {
        return this.folders().find(folder => folder.id === folderId);
    }
}
