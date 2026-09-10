package com.yourorg.appname.service.impl;

import com.yourorg.appname.dto.request.ContactMessageRequest;
import com.yourorg.appname.dto.response.ContactMessageResponse;
import com.yourorg.appname.entity.ContactMessage;
import com.yourorg.appname.repository.ContactMessageRepository;
import com.yourorg.appname.service.ContactMessageService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageServiceImpl(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Override
    public ContactMessageResponse submitMessage(ContactMessageRequest request) {
        ContactMessage msg = new ContactMessage();
        msg.setFullName(request.getFullName());
        msg.setEmail(request.getEmail());
        msg.setPhone(request.getPhone());
        msg.setSubject(request.getSubject());
        msg.setMessage(request.getMessage());
        msg.setStatus("NEW");

        ContactMessage saved = contactMessageRepository.save(msg);
        return new ContactMessageResponse(
                saved.getId(),
                saved.getFullName(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getSubject(),
                saved.getMessage(),
                saved.getStatus(),
                saved.getCreatedAt()
        );
    }

    @Override
    public List<ContactMessageResponse> getAllMessages() {
        return contactMessageRepository.findAll().stream()
                .map(saved -> new ContactMessageResponse(
                        saved.getId(),
                        saved.getFullName(),
                        saved.getEmail(),
                        saved.getPhone(),
                        saved.getSubject(),
                        saved.getMessage(),
                        saved.getStatus(),
                        saved.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}
