import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { spawn, Thread, Worker } from "threads";
import { SchemaGeneratorWorker } from './generatorWorker';

async function bootstrap() {

  const result = await Promise.all([
    {
      path: '../../posts-application/src/posts/posts.module.ts',
      name: 'posts-application'
    },  
    {
      path: '../../users-application/src/users/users.module.ts',  
      name: 'users-application'
    }
  ].map(async (item) => {
    const schemaGenerator = await spawn<SchemaGeneratorWorker>(
      new Worker("../src/generatorWorker.ts"),
      { timeout: 30000 }
    );
    Thread.events(schemaGenerator).subscribe((event) =>
      console.log("Schema generator thread event:", event)
    );
    await schemaGenerator.generate(item.name, item.path);
  }))
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();
