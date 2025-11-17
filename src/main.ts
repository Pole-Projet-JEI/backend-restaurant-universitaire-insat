import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("restaurant insat admin backend")
    .setDescription("API documentation restaurant insat")
    .setVersion("1.0")
    .addBearerAuth()
    .addTag("RESTAU")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  const configService = app.get(ConfigService);
  console.log(configService.get("PORT"));
  await app.listen(configService.get("PORT"));
}
bootstrap();
