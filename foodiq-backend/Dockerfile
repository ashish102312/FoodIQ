FROM eclipse-temurin:17-jdk-focal as build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
ENV MAVEN_OPTS="-Xmx256m"
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre-focal
WORKDIR /app
RUN apt-get update && apt-get install -y tesseract-ocr libtesseract-dev && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xmx256m -Xss512k"
ENTRYPOINT sh -c 'java $JAVA_OPTS -jar app.jar'
