package com.iker.google_drive_demo.driveItem;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.iker.google_drive_demo.storage.MinioService;
import com.iker.google_drive_demo.user.User;
import com.iker.google_drive_demo.user.UserRepository;

@RestController
public class DriveItemController {

    @Autowired
    private MinioService minioService;

    @Autowired
    private DriveItemService driveItemService;

    @Autowired
    private DriveItemRepository driveItemRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("api/v1/uploadfile")
    public DriveItem uploadFile(MultipartFile file, Authentication user)
            throws IOException {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        minioService.uploadFile(file, currentUser);

        return driveItemService.createDriveItem(file, currentUser);
    }

    @GetMapping("api/v1/root/driveItems")
    public List<DriveItem> getRootDriveItems(Authentication user) {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        return driveItemRepository.findAllByOwnerIdAndParentIdIsNull(currentUser.getId());
    }

    @GetMapping("api/v1/files")
    public List<DriveItem> getFiles(Authentication user) {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        return driveItemRepository.findAllByOwnerId(currentUser.getId());
    }

    @PostMapping("api/v1/createfolder")
    public DriveItem createFolder(@RequestBody CreateFolderRequestDTO payload, Authentication user) {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        DriveItem newFolder = driveItemService.createFolder(payload, currentUser);

        minioService.createFolder(newFolder);

        return newFolder;
    }

    @GetMapping("api/v1/folder/{folderId}")
    public List<DriveItem> getFolderContent(@PathVariable UUID folderId, Authentication user) {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        DriveItem selectedFolder = driveItemRepository.findById(folderId).orElse(null);

        return minioService.getFolderContent(selectedFolder, currentUser);
    }

    @GetMapping("api/v1/folder/files")
    public List<DriveItem> getFolderFiles(@RequestParam("folderName") String folderName, Authentication user) {
        String email = switch (user.getPrincipal()) {
            case OidcUser oidcUser -> oidcUser.getEmail();
            case User u -> u.getEmail();
            default -> throw new IllegalStateException();
        };

        User currentUser = userRepository.findByEmail(email).orElseThrow();

        return minioService.getFolderFiles(folderName, currentUser);
    }
}
