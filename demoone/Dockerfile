FROM openjdk:8-jdk-alpine
EXPOSE 3000
ARG JAR_FILE=target/my-application.jar
ADD ./src/main/java/com/tienpham/lab5/DemooneApplication.java src/main/java/com/tienpham/lab5/DemooneApplication.java
ADD ./src/main/java/com/tienpham/lab5/controller/BlogController.java
ADD ./src/main/java/com/tienpham/lab5/model/VoiceText.java
ADD ./src/main/java/com/tienpham/lab5/repository/VoiceTextRepo.java

ENTRYPOINT ["java","-jar","/app.jar"]