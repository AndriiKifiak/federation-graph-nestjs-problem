import { workerData } from "worker_threads";
import { NestFactory } from "@nestjs/core";
import { resolve } from 'path'


const generate = async (pathe: string) => {
  const module = await import(resolve(process.cwd(), pathe));    
      
  try {
      await NestFactory.create(module.AppModule)
      console.log('CREATED');
  } catch (error) {
    console.log(error);
  }
}

generate(workerData.path);