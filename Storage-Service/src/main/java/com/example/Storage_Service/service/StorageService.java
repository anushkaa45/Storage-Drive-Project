package com.example.Storage_Service.service;

import com.example.Storage_Service.repo.DataStore;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class StorageService {

    private final DataStore store;

    public StorageService(DataStore store) {
        this.store = store;
    }

    // Upload file
    public void put(UUID id, MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST,
                    "File cannot be empty"
            );
        }

        try (var input = file.getInputStream()) {
            store.put(id, input);
        }
    }

    // Download file
    public Resource get(UUID id) {
        return store.get(id);
    }

    // Delete file
    public void delete(UUID id) throws IOException {
        store.delete(id);
    }
}