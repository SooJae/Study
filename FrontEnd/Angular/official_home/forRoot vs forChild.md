When to use forRoot in Angular?
 

ForRoot is used when a module is "eager," that is, it is not lazy-loaded (loads when the application starts). Angular creates a factory for all the modules, except for the lazy modules, which when loaded on demand, have their own factory. When we use forRoot(), we’re loading a provider that is going to be injected into the "root" of the modules because it uses the same factory as our main module.

In simple terms, the use of forRoot allows us to access our providers from any point in the application that is not lazy loaded. So, for example, if we’d implement something like this:

exportclassExampleModule{

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

We’d say that this module, and the providers, will be loaded "globally" for the app. In this case, "MyService" will be the "MyEagerService" class for any module that is not lazy-loaded in our app.