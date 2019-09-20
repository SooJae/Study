앵귤러의 동작이 비동기 방식이라는 것에 대해 알아보기


columnNamesH 에러 => tsconfig.json 에러
```json
//Before(에러)
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true
  }
}


//After

{
  "compileOnSave": false,
  "compilerOptions": {
    "allowSyntheticDefaultImports": true,
    "downlevelIteration": true,
    "importHelpers": true,
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ],
    "module": "esnext",
    "baseUrl": "./"
  },
  "angularCompilerOptions": {
    "preserveWhitespaces": true
  }
}
```
Math가 인식을 못받는다 => tsconfig.json에 들어가서 lib을 "es2018" -> "es2017"로 바꿔준다.


By Default 기본적으로 
So if 따라서