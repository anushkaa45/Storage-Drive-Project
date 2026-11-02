package com.example.Drive_Service.repo;


import com.example.Drive_Service.model.DriveItem;
import feign.Param;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ItemRepository extends JpaRepository<DriveItem, UUID> {
    List<DriveItem> findByParentIdAndStatusOrderByNameAsc(UUID parentId, DriveItem.Status status);
    boolean existsByParentId(UUID parentId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select i from DriveItem i where i.id=:id")
    java.util.Optional<DriveItem> lookById(@Param("id") UUID id);
}