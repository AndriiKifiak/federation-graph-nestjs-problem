import { NestFactory } from "@nestjs/core";
import { expose } from "threads";

const schemaGeneratorWorker = {
    async generate(packageName: string, path: string) {
      const { default: definition } = await import(path);
      console.log("Generating static schema", definition);
  
    //   const composedDgmModule = 
      
    //   DomainGraphModule.compose(packageName, {
    //     // include the properties of the definition
    //     ...definition,
    //     // override the metrics with prefixed versions of the metrics
    //   });
  
      // The domain modules may expect certain modules to have been loaded as part of the Gateway module, so we'll need
      // to add those here also so the domain modules can load properly.
      try {
          const res = await NestFactory.create(definition, {
            logger: console
          })
      } catch (error) {
        console.log(error);
        
      }


    }
  };
  
  export type SchemaGeneratorWorker = typeof schemaGeneratorWorker;
  expose(schemaGeneratorWorker);