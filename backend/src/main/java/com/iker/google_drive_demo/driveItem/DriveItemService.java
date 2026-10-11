package com.iker.google_drive_demo.driveItem;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.iker.google_drive_demo.user.User;

@Service
public class DriveItemService {

    @Autowired
    private DriveItemRepository driveItemRepository;

    public DriveItem createDriveItem(MultipartFile file, User currentUser) {

        String storageKey = "users/" + currentUser.getId() + "/files/" + UUID.randomUUID();

        DriveItem newDriveItem = new DriveItem();
        newDriveItem.setName(file.getOriginalFilename());
        newDriveItem.setType(DrivenItemType.FILE);
        newDriveItem.setOwnerId(currentUser.getId());
        newDriveItem.setStorageKey(storageKey);
        newDriveItem.setSizeBytes(file.getSize());

        Date currentDate = new Date();
        newDriveItem.setCreatedAt(currentDate);
        newDriveItem.setUpdatedAt(currentDate);

        driveItemRepository.save(newDriveItem);

        return newDriveItem;
    }

    public DriveItem createFolder(CreateFolderRequestDTO payload, User currentUser) {
        DriveItem parentFolder = payload.parentFolderId() == null
                ? null
                : driveItemRepository.findByIdAndOwnerIdAndType(
                        payload.parentFolderId(), currentUser.getId(), DrivenItemType.FOLDER)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Parent folder not found"));

        String storageKey = parentFolder == null
                ? "users/" + currentUser.getId() + "/" + payload.folderName() + "/"
                : parentFolder.getStorageKey() + payload.folderName() + "/";

        DriveItem newDriveItem = new DriveItem();
        newDriveItem.setName(payload.folderName());
        newDriveItem.setType(DrivenItemType.FOLDER);
        newDriveItem.setOwnerId(currentUser.getId());
        newDriveItem.setStorageKey(storageKey);
        newDriveItem.setSizeBytes(0L);
        newDriveItem.setParentId(parentFolder == null ? null : parentFolder.getId());

        Date currentDate = new Date();
        newDriveItem.setCreatedAt(currentDate);
        newDriveItem.setUpdatedAt(currentDate);

        driveItemRepository.save(newDriveItem);

        return newDriveItem;
    }

}
