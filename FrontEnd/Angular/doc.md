### 라우터 생성
$ ng g class app.router.module


To start with lazy loading by asynchronously loading the feature module for routing whenever required, we go to the route configuration and use the property loadChildren. Let us see what this property does.
필요할 때마다 라우팅을 위해 기능 모듈을 비동기식으로로드하여 지연로드를 시작하려면 경로 구성으로 이동하여 loadChildren 속성을 사용하십시오. 이 속성이 무엇을하는지 보자.
    {path: ‘user’, loadChildren: ‘./users/user.module#UserModule’}

This property loadChildren is used for lazily loading the routes and is not related to child routes or such.
이 속성 loadChildren은 경로를 느리게로드하는 데 사용되며 자식 경로 등과 관련이 없습니다.
Let us break down what the property’s value means. The loadChildren property accepts a string value which contains the route to the feature module followed by a hash symbol and then the name of the feature module.
재산 가치의 의미를 세분화하십시오. loadChildren 속성은 기능 모듈에 대한 경로와 해시 기호 및 기능 모듈의 이름이 포함 된 문자열 값을 허용합니다.


Now when the route gets activated, this loadChildren property will get activated and load the requested module. It will then load the requested component and display that component’s template.
이제 경로가 활성화되면이 loadChildren 속성이 활성화되고 요청 된 모듈이로드됩니다. 그런 다음 요청 된 구성 요소를로드하고 해당 구성 요소의 템플릿을 표시합니다.



We will see an extra bundle file generated.
Now if you go to the network tab in the console to see the files generated on routing to the UserModule, you will see one extra file created with some numeric value which might look something like this:
추가 번들 파일이 생성됩니다.
이제 콘솔의 네트워크 탭으로 이동하여 UserModule로 라우팅 할 때 생성 된 파일을 확인하면 다음과 같은 숫자 값으로 생성 된 추가 파일이 하나 표시됩니다.




This is how lazy loading gets implemented using the loadChildren feature in the route configuration for the specific feature module. And this creates another bundle file only when that route is navigated to and the data is requested.

This is how we have been working with lazy loading till now, right?

B
특정 기능 모듈에 대한 경로 구성에서 loadChildren 기능을 사용하여 지연 로딩을 구현하는 방법입니다. 그리고 경로가 탐색되고 데이터가 요청 된 경우에만 다른 번들 파일이 작성됩니다.

이것이 지금까지 게으른 로딩 작업을 수행 한 방식입니다.


ut…
If we look at the route config again,
하지만 ...
루트 설정을 다시 보면


```
 {path: ‘user’, loadChildren: ‘./users/user.module#UserModule’}
 ```

 the loadChildren property accepts a string which means that even if there is a wrong module name or a typo while writing the code, Angular would not know there is something wrong and accept whatever is there as a string until we try building it.
loadChildren 속성은 문자열을 허용합니다. 즉, 코드를 작성하는 동안 잘못된 모듈 이름이나 오타가 있어도 Angular는 무언가 잘못되었음을 알지 못하고 빌드하려고 할 때까지 문자열로 무엇이든지 받아들입니다.
So, let us say we write the config as :
구성을 다음과 같이 작성한다고 가정하겠습니다.


```
   {path: ‘user’, loadChildren: ‘./users/user.module#UserModulee’},
```

with an extra ‘e’, it will not throw any error considering it a part of the string.

Therefore,
Angular 8 comes up with support for dynamic imports in our router configuration. This means that we use the import statement for lazy loading the module and this will be understood by the IDEs, webpack, etc.

So when you update to Angular 8, this will automatically accommodate the changes in your application.

Now if you look at how lazy loading is done in this new route config, you will see:
따라서
Angular 8은 라우터 구성에서 동적 가져 오기를 지원합니다. 이것은 우리가 모듈의 지연 로딩을 위해 import 문을 사용한다는 것을 의미하며 이것은 IDE, 웹팩 등에서 이해 될 것입니다.

따라서 Angular 8로 업데이트하면 응용 프로그램의 변경 사항이 자동으로 수용됩니다.

이제이 새로운 경로 설정에서 지연 로딩이 어떻게 수행되는지 살펴보면 다음을 볼 수 있습니다.

```
 {path: ‘user’, loadChildren: () => import(‘./users/user.module’).then(m => m.UserModule)};
```


Now your editor, let’s say VSCode understands what is this syntax and will recognize if there is some mistake and we won't have to wait till build time to realize about an error.
이제 편집기는 VSCode 가이 구문이 무엇인지 이해하고 실수가 있는지 인식하고 오류를 깨닫기 위해 빌드 시간까지 기다릴 필요가 없다고 가정 해 봅시다.

This new syntax now means that loadChildren is a function which will execute when it tries to access the user module. This will asynchronously load the import statement and implement the module.
이 새로운 구문은 이제 loadChildren이 사용자 모듈에 액세스하려고 할 때 실행되는 함수임을 의미합니다. 그러면 import 문이 비동기 적으로로드되고 모듈이 구현됩니다.
This new lazy loading is explained by Stephen Fluin in this video:
이 새로운 게으른 로딩은이 비디오에서 Stephen Fluin이 설명합니다 :

https://www.youtube.com/watch?v=jPXl7sCPCOA