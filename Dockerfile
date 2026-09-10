# ============================================================
# Multi-Stage Dockerfile for Spring Boot Backend (Root Context)
# ============================================================

# Stage 1: Build Stage using Maven with Eclipse Temurin JDK 17
FROM maven:3.9-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy pom.xml to cache dependency downloads
COPY backend/pom.xml .
RUN mvn dependency:go-offline -B || true

# Copy source code and package executable JAR skipping tests
COPY backend/src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Runtime Stage using Eclipse Temurin JRE 17 Alpine
FROM eclipse-temurin:17-jre-alpine AS runner
WORKDIR /app

# Create a non-root system group and user for container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the built JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change file ownership to non-root user
RUN chown -R appuser:appgroup /app

# Run as non-root user
USER appuser:appgroup

# Render injects the PORT environment variable dynamically
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=postgres

EXPOSE 8080

# Launch application with dynamic port binding
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]
