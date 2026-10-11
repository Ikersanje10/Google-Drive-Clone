package com.iker.google_drive_demo.storage;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.iker.google_drive_demo.driveItem.DriveItem;
import com.iker.google_drive_demo.driveItem.DrivenItemType;
import com.iker.google_drive_demo.user.User;
import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.Result;
import io.minio.PutObjectArgs;
import io.minio.messages.Item;

@Service
public class MinioService {

    private MinioClient minioClient;

    private static final String BUCKET_NAME = "google-drive-bucket";

    public MinioService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public void createFolder(DriveItem newFolder) {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(BUCKET_NAME)
                            .object(newFolder.getStorageKey())
                            .stream(new ByteArrayInputStream(new byte[] {}), 0L, -1L)
                            .build());
        } catch (Exception e) {
            System.err.println("Error creating folder in Minio");
        }
    }

    public void uploadFile(MultipartFile file, User currentUser) {
        String storageKey = "users/" + currentUser.getId() + "/files/" + UUID.randomUUID();

        try (InputStream inputStream = file.getInputStream()) {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(BUCKET_NAME)
                            .object(storageKey)
                            .stream(inputStream, file.getSize(), Long.valueOf(-1))
                            .contentType(file.getContentType())
                            .build());
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public List<DriveItem> getFolderContent(DriveItem folder, User currentUser) {
        List<DriveItem> folderContent = new ArrayList<>();

        try {
            Iterable<Result<Item>> objects = minioClient.listObjects(
                    ListObjectsArgs.builder()
                            .bucket(BUCKET_NAME)
                            .prefix(folder.getStorageKey())
                            .recursive(false)
                            .build());
            for (Result<Item> result : objects) {
                Item object = result.get();
                String objectName = object.objectName();

                if (objectName.equals(folder.getStorageKey())) {
                    continue;
                }

                DriveItem driveItem = new DriveItem();
                // MinIO represents a folder marker as an empty object ending in '/'.
                if (objectName.endsWith("/")) {
                    String folderName = objectName.substring(folder.getStorageKey().length());
                    driveItem.setName(folderName.substring(0, folderName.length() - 1));
                    driveItem.setType(DrivenItemType.FOLDER);
                } else {
                    driveItem.setName(objectName.substring(objectName.lastIndexOf('/') + 1));
                    driveItem.setType(DrivenItemType.FILE);
                }

                driveItem.setOwnerId(currentUser.getId());
                driveItem.setStorageKey(folder.getStorageKey());
                driveItem.setSizeBytes(object.size());
                folderContent.add(driveItem);
            }
        } catch (Exception e) {
            throw new IllegalStateException("Unable to list content for folder " + folder.getName(), e);
        }

        return folderContent;
    }

    public List<DriveItem> getFolderFiles(String folderName, User currentUser) {
        List<DriveItem> filesList = new ArrayList<>();
        String normalizedFolderName = folderName.replace("\\", "/").replaceAll("^/+|/+$", "");
        if (normalizedFolderName.isBlank() || normalizedFolderName.contains("../")
                || normalizedFolderName.equals("..")) {
            return filesList;
        }
        String prefix = "users/" + currentUser.getId() + "/" + normalizedFolderName + "/";
        try {
            Iterable<Result<Item>> objects = minioClient.listObjects(
                    ListObjectsArgs.builder()
                            .bucket(BUCKET_NAME)
                            .prefix(prefix)
                            .recursive(true)
                            .build());
            for (Result<Item> result : objects) {
                Item object = result.get();
                String objectName = object.objectName();
                // MinIO represents a folder marker as an empty object ending in '/'.
                if (objectName.endsWith("/")) {
                    continue;
                }

                DriveItem file = new DriveItem();
                file.setName(objectName.substring(objectName.lastIndexOf('/') + 1));
                file.setType(DrivenItemType.FILE);
                file.setOwnerId(currentUser.getId());
                file.setStorageKey(objectName);
                file.setSizeBytes(object.size());
                filesList.add(file);
            }
        } catch (Exception e) {
            throw new IllegalStateException("Unable to list files for folder " + normalizedFolderName, e);
        }
        return filesList;
    }
}
