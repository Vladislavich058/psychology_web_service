# Используйте официальный образ Maven как родительский образ
FROM eclipse-temurin:21.0.1_12-jdk-ubi9-minimal as build

# Установите рабочую директорию в /app
WORKDIR /app

# Копируйте pom.xml и скачайте все зависимости
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

RUN ./mvnw dependency:go-offline -B

# Копируйте исходный код приложения
COPY src src
COPY images images

# Соберите приложение
RUN ./mvnw package -DskipTests

# Используйте официальный образ OpenJDK для запуска приложения
FROM eclipse-temurin:21.0.1_12-jre-ubi9-minimal

# Копируйте исполняемый jar-файл в контейнер
COPY --from=build /app/target/*.jar app.jar
COPY --from=build /app/images /images

# Укажите порт, который будет использоваться приложением
EXPOSE 8080

# Запустите приложение с переменными окружения
ENTRYPOINT ["java","-jar","/app.jar"]