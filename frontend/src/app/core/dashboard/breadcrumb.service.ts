import { Service, signal } from '@angular/core';

@Service()
export class BreadcrumbService {
    readonly items = signal<{ label: string, url?: string, folderId?: string }[]>([
        { label: "MyDrive", url: '/dashboard/myDrive' }
    ])

    addFolder(folderId: string, folderName: string): void {
        this.items.update((list) => [
            ...list,
            { label: folderName, url: `/dashboard/myDrive/folder/${folderId}`, folderId },
        ])
    }

    reset(): void {
        this.items.set([{ label: "MyDrive", url: '/dashboard/myDrive' }])
    }

    getCurrentFolderId(): string | null {
        return this.items().at(-1)?.folderId ?? null;
    }
}
