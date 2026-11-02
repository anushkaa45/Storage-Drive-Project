package com.example.Storage_Service.Controller;

import com.example.Storage_Service.service.StorageService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/internal/objects")
public class StorageController {

    private final StorageService service;

    public StorageController(StorageService service) {
        this.service = service;
    }

    // Upload a file
    @PutMapping(
            value = "/{id}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<Void> put(
            @PathVariable UUID id,
            @RequestPart("file") MultipartFile file
    ) throws IOException {

        service.put(id, file);

        return ResponseEntity.noContent().build();
    }

    // Download a file
    @GetMapping("/{id}")
    public ResponseEntity<Resource> get(@PathVariable UUID id) {

        Resource resource = service.get(id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + id + "\""
                )
                .body(resource);
    }

    // Delete a file
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable UUID id
    ) throws IOException {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}