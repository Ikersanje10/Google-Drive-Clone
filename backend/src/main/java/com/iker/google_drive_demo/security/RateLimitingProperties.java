package com.iker.google_drive_demo.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rate-limiting")
public class RateLimitingProperties {

    private int defaultLimit = 60;
    private long defaultDurationSeconds = 60;
    private List<Rule> rules = new ArrayList<>();

    public static class Rule {
        private String path;
        private int limit;
        private long durationSeconds;

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }

        public int getLimit() {
            return limit;
        }

        public void setLimit(int limit) {
            this.limit = limit;
        }

        public long getDurationSeconds() {
            return durationSeconds;
        }

        public void setDurationSeconds(long durationSeconds) {
            this.durationSeconds = durationSeconds;
        }

    }

    public int getDefaultLimit() {
        return defaultLimit;
    }

    public void setDefaultLimit(int defaultLimit) {
        this.defaultLimit = defaultLimit;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }

    public long getDefaultDurationSeconds() {
        return defaultDurationSeconds;
    }

    public void setDefaultDurationSeconds(long defaultDurationSeconds) {
        this.defaultDurationSeconds = defaultDurationSeconds;
    }
}
