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


# 시그니처 (함수)
함수 시그니처(타입 시그니처, 메소드 시그니처)는 functions 그리고 methods의 입력과 출력을 정의합니다.

시그니처는 다음을 포함합니다:

parameters와 그들의 types
반환값과 타입
던져지거나 콜백으로 반환되는 exceptions
object-oriented 프로그램에서 메소드의 접근 권한에 대한 정보 (public, static, 혹은 prototype와 같은 키워드들).