package com.yourorg.appname.mapper;

import com.yourorg.appname.dto.response.UserResponse;
import com.yourorg.appname.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getPhone(),
                user.getRole().name()
        );
    }
}
