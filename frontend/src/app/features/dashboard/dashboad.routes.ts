import { Routes } from "@angular/router";
import { MyDriveComponent } from "./components/my-drive/my-drive.component";
import { SharedComponent } from "./components/shared/shared.component";
import { RecentComponent } from "./components/recent/recent.component";
import { StarredComponent } from "./components/starred/starred.component";
import { TrashComponent } from "./components/trash/trash.component";
import { StorageComponent } from "./components/storage/storage.component";
import { FolderComponent } from "./components/folder/folder.component";
import { MyDriveHomeComponent } from "./components/my-drive-home/my-drive-home.component";

export const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'myDrive',
    },
    {
        path: 'myDrive',
        component: MyDriveComponent,
        children: [
            {
                path: '',
                component: MyDriveHomeComponent,
            },
            {
                path: 'folder/:folderId',
                component: FolderComponent,
            }
        ]
    },
    {
        path: 'shared',
        component: SharedComponent,
    },
    {
        path: 'recent',
        component: RecentComponent,
    },
    {
        path: 'starred',
        component: StarredComponent,
    },
    {
        path: 'trash',
        component: TrashComponent,
    },
    {
        path: 'storage',
        component: StorageComponent,
    },
]