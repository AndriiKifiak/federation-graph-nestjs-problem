import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Worker } from "threads";

async function bootstrap() {
  // We are launching here subgraphs
  await Promise.all([
    {
      path: '../users-application/dist/app.module.js',  
      name: 'users-application'
    },
    {
      path: '../posts-application/dist/app.module.js',
      name: 'posts-application'
    }
  ].map(async (item) => {
    await new Worker("./generatorWorker", { 
      workerData: { path: item.path },
    });
  }))
  
  // When subgraphs launched successfully we are launching our gateway
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3002);
}
bootstrap();
