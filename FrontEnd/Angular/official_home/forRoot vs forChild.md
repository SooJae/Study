When to use forRoot in Angular?
 

ForRoot is used when a module is "eager," that is, it is not lazy-loaded (loads when the application starts). Angular creates a factory for all the modules, except for the lazy modules, which when loaded on demand, have their own factory. When we use forRoot(), we’re loading a provider that is going to be injected into the "root" of the modules because it uses the same factory as our main module.

In simple terms, the use of forRoot allows us to access our providers from any point in the application that is not lazy loaded. So, for example, if we’d implement something like this:
```ts
export class ExampleModule{

 staticforRoot(): ModuleWithProviders{

 return{

   ngModule:ExampleModule,

   providers:[

     {

       provide:MyService,

       useClass:MyEagerService

     }

   ]

 };

} }
```
We’d say that this module, and the providers, will be loaded "globally" for the app. In this case, "MyService" will be the "MyEagerService" class for any module that is not lazy-loaded in our app.


ForChild is used the other way around: specifically when we want to deliver a provider that is visible only to the "children" modules of our module, in case they are **lazy loaded**. As each lazy module is loaded on demand, it has its own injector.

Following the example above: 

exportclassExampleModule{

 staticforChild(): ModuleWithProviders{

 return{

   ngModule:ExampleModule,

   providers:[

     {

       provide:MyService,

       useClass:MyLazyService

     }

   ]

 };

} }

With the example, we are saying that when the module is lazy-loaded, our provider "MyService" will be the class MyLazyService.

We can even define not only different classes for the same provider using forRoot() and forChild(), but also different providers depending on how we instantiate it.

exportclassExampleModule{

 staticforRoot(): ModuleWithProviders{

 return{

   ngModule:AModule,

   providers:[MyService]

 };

staticforChild(): ModuleWithProviders{

 return{

   ngModule:AModule,

   providers:[MyLazyService]

 };

} }

In the example above, we have one module that will load two different providers depending on how it’s loaded “forRoot” or “forChild”. 

forRoot and forChild to inject configurations to modules
 

Beyond the usage of control what we instantiate when importing our modules, forRoot and forChild offer us something much more useful. It allows us to inject configurations to our modules. 

exportinterfaceCoreModuleConfig{

 environment: string;

}

 

exportclassExampleModule{

 staticforRoot(conf: ModuleConfig): ModuleWithProviders{

 return{

   ngModule:AModule,

   providers:[{provide:CONFIG, useClass: conf}]

 };

} }

On the example above, I have defined an interface called ModuleConfig with a parameter for my module (environment). This interface is delivered as a parameter to the forRoot() method, which takes that incoming object, defining it as the CONFIG provider 

What does this mean? When using forRoot, the value of the CONFIG provider will be the one that we will deliver as a parameter to forRoot when we call it.

In simple terms, when importing ExampleModule by delivering the object to forRoot, as in this example below:

@NgModule({

 declarations:[

   AppComponent,

      ...

 ],

 imports:[

   ExampleModule.forRoot({

     environment:“testing”

  }),

…

We are telling ExampleModule to use the values defined as parameters as their provider named CONFIG. If we call CONFIG.environment, its value will be "testing."

We can use forChild in the same way, however; we will use it when we want to configure a lazy loaded module. This is especially useful for configuring modules that will later be exported independently.


A warning about using logic in the forRoot and forChild methods
 

For the forRoot and forChild methods, although they are functions, it is highly recommended that they only have "return", without implementing more logic. This is so, because when we create our app using the production flag, Angular automatically uses AoT (Ahead of Time) compilation.

Unfortunately, although the logic that we implemented within forRoot before the return will work in a JiT compilation it will throw the following error in AoT:

Error: Error encountered resolving symbol values statically. Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function

The following code will NOT work in AoT:

function init(){

 console.log(“hola!”);

}

 

exportclassExampleModule{

 staticforRoot(): ModuleWithProviders{

      init();

 return{

   ngModule:AModule,

   providers:[MyService]

 };

But we can fix it using an initializer hooked to the Angular initializer. We can define a provider with the default token APP_INITIALIZER, that allows us to hook a function to the app initialization. The function that we deliver will start when our app starts provided that our function is an exported function.

export function init(){

 console.log(“hola!”);

}

 

exportclassExampleModule{

 staticforRoot(): ModuleWithProviders{

      init();

 return{

   ngModule:AModule,

   providers:[MyService, {provide:APP_INITIALIZER,useClass:init]

 };
 

This code will be able to compile in AoT, and the init() method will be executed when loading our application.

Those are some interesting uses for the forRoot and forChil methods in Angular modules. Well used, they can be a great asset in creating simple, scalable apps.

 


https://www.freelancermap.com/freelancer-tips/12255-using-forroot-and-forchild-to-configure-modules-in-angular