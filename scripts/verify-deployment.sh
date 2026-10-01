#!/usr/bin/env bash
# FoodIQ Deployment Verification Script
set -e

TARGET_URL="${1:-http://localhost:8080}"
echo "Verifying FoodIQ Backend Deployment at: $TARGET_URL"

echo -n "1. Checking Actuator Health (/actuator/health)... "
HEALTH_RES=$(curl -s "$TARGET_URL/actuator/health" || true)
if echo "$HEALTH_RES" | grep -q "UP"; then
    echo "OK (Service and Database UP)"
else
    echo "FAILED: $HEALTH_RES"
    exit 1
fi

echo -n "2. Checking Test Endpoint (/api/test)... "
TEST_RES=$(curl -s "$TARGET_URL/api/test" || true)
if echo "$TEST_RES" | grep -q "Backend + DB working"; then
    echo "OK ($TEST_RES)"
else
    echo "FAILED: $TEST_RES"
    exit 1
fi

echo ""
echo "All deployment verification checks passed successfully!"
