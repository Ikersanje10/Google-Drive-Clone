package com.iker.google_drive_demo.driveItem;

import java.util.UUID;

public record CreateFolderRequestDTO(String folderName, UUID parentFolderId) {

}
