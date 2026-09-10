package com.yourorg.appname.controller;

import com.yourorg.appname.dto.request.ContactMessageRequest;
import com.yourorg.appname.dto.response.ApiResponse;
import com.yourorg.appname.dto.response.ContactMessageResponse;
import com.yourorg.appname.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessageResponse>> submitMessage(
            @Valid @RequestBody ContactMessageRequest request) {
        ContactMessageResponse response = contactMessageService.submitMessage(request);
        return new ResponseEntity<>(ApiResponse.ok("Message submitted successfully", response), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactMessageResponse>>> getAllMessages() {
        List<ContactMessageResponse> messages = contactMessageService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.ok(messages));
    }
}
