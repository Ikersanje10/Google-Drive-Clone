package com.iker.google_drive_demo.driveItem;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriveItemRepository extends JpaRepository<DriveItem, UUID> {
    List<DriveItem> findAllByOwnerId(Integer ownerId);

    Optional<DriveItem> findById(UUID id);

    Optional<DriveItem> findByIdAndOwnerIdAndType(UUID id, Integer ownerId, DrivenItemType type);

    List<DriveItem> findAllByOwnerIdAndParentIdIsNull(Integer ownerId);
}
