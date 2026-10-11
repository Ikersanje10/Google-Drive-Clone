export interface DriveItem {
    id: string,
    name: string;
    sizeBytes: number;
    updatedAt: string;
    type: 'FILE' | 'FOLDER';
}

export interface DriveContents {
    folders: DriveItem[];
    files: DriveItem[];
}