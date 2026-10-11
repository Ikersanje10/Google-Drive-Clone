package com.iker.google_drive_demo.security;

import java.io.IOException;
import java.time.Duration;
import java.util.Comparator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private final RateLimitingProperties props;
    private final AntPathMatcher matcher = new AntPathMatcher();
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    public RateLimitingFilter(RateLimitingProperties props) {
        this.props = props;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        RateLimitingProperties.Rule rule = resolveRule(path);

        String key = clientKey(request) + ":" + rule.getPath();
        Bucket bucket = buckets.computeIfAbsent(key, k -> newBucket(rule));

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Too many requests");
        }
    }

    private RateLimitingProperties.Rule resolveRule(String path) {
        return props.getRules().stream()
                .filter(r -> matcher.match(r.getPath(), path))
                .max(Comparator.comparing(r -> r.getPath().length()))
                .orElseGet(() -> defaultRule());
    }

    private RateLimitingProperties.Rule defaultRule() {
        RateLimitingProperties.Rule r = new RateLimitingProperties.Rule();

        r.setPath("/api/**");
        r.setLimit(props.getDefaultLimit());
        r.setDurationSeconds(props.getDefaultDurationSeconds());

        return r;
    }

    private String clientKey(HttpServletRequest request) {
        return request.getRemoteAddr();
    }

    private Bucket newBucket(RateLimitingProperties.Rule rule) {
        Bandwidth limit = Bandwidth.builder().capacity(rule.getLimit()).refillGreedy(rule.getLimit(),
                Duration.ofSeconds(rule.getDurationSeconds())).build();

        return Bucket.builder().addLimit(limit).build();
    }

}
