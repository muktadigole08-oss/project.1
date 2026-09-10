package com.yourorg.appname.service;

import com.yourorg.appname.dto.request.ContactMessageRequest;
import com.yourorg.appname.dto.response.ContactMessageResponse;
import java.util.List;

public interface ContactMessageService {
    ContactMessageResponse submitMessage(ContactMessageRequest request);
    List<ContactMessageResponse> getAllMessages();
}
