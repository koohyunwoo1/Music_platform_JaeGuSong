package com.e106.reco.global.util;

import com.e106.reco.domain.artist.user.dto.CustomUserDetails;
import com.e106.reco.global.error.errorcode.CommonErrorCode;
import com.e106.reco.global.error.exception.BusinessException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import reactor.core.publisher.Mono;

public class AuthUtil {
    public static Mono<CustomUserDetails> getWebfluxCustomUserDetails() {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> {
                    Authentication authentication = securityContext.getAuthentication();
                    Object principal = authentication.getPrincipal();
                    if (principal instanceof CustomUserDetails) {
                        return (CustomUserDetails) principal;
                    }
                    throw new BusinessException(CommonErrorCode.RESOURCE_NOT_FOUND);
                });
    }
}