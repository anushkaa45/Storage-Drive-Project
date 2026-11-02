package com.example.Drive_Service.Client;

import feign.Response;
import jakarta.ws.rs.Path;
import org.apache.hc.client5.http.entity.mime.MultipartPart;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.UUID;

@FeignClient(name="Storage-Service",url="${drive.storage.url:}")
public interface StorageClient {

    //Databases mai file ko object bolte hai

    @PutMapping(value="/internal/objects/{id}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        //request mai file aa rhi h to hm RequestBody nhi RequestPart use krege bcz file parts mai aati hai
    void put(@PathVariable("id") UUID id, @RequestPart("file")MultipartFile file);

    @GetMapping("/internal/objects/{id}")
    Response get(@PathVariable("id") UUID id);

    @DeleteMapping("/internal/objects/{id}")
    void delete(@PathVariable("id") UUID id);

}