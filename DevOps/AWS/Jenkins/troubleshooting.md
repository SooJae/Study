```
Started by user 이수재
Building in workspace /var/lib/jenkins/workspace/sootudy
using credential sooJae
 > git rev-parse --is-inside-work-tree # timeout=10
Fetching changes from the remote Git repository
 > git config remote.origin.url https://github.com/SooJae/Sootudy.git # timeout=10
Fetching upstream changes from https://github.com/SooJae/Sootudy.git
 > git --version # timeout=10
using GIT_ASKPASS to set credentials 
 > git fetch --tags --progress https://github.com/SooJae/Sootudy.git +refs/heads/*:refs/remotes/origin/*
 > git rev-parse refs/remotes/origin/master^{commit} # timeout=10
 > git rev-parse refs/remotes/origin/origin/master^{commit} # timeout=10
Checking out Revision 4c5c1ab705283ab669a2fc55b13bc719d13e542d (refs/remotes/origin/master)
 > git config core.sparsecheckout # timeout=10
 > git checkout -f 4c5c1ab705283ab669a2fc55b13bc719d13e542d
Commit message: "make joinForm"
 > git rev-list --no-walk 4c5c1ab705283ab669a2fc55b13bc719d13e542d # timeout=10
[sootudy] $ mvn -f /var/lib/jenkins/workspace/sootudy/pom.xml clean package
[[1;34mINFO[m] Scanning for projects...
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--------------------------< [0;36mcom.soo:sootudy[0;1m >---------------------------[m
[[1;34mINFO[m] [1mBuilding sootudy 1.0.0-BUILD-SNAPSHOT[m
[[1;34mINFO[m] [1m--------------------------------[ war ]---------------------------------[m
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-clean-plugin:2.5:clean[m [1m(default-clean)[m @ [36msootudy[0;1m ---[m
[[1;34mINFO[m] Deleting /var/lib/jenkins/workspace/sootudy/target
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-resources-plugin:2.6:resources[m [1m(default-resources)[m @ [36msootudy[0;1m ---[m
[[1;33mWARNING[m] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[[1;34mINFO[m] Copying 6 resources
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-compiler-plugin:2.5.1:compile[m [1m(default-compile)[m @ [36msootudy[0;1m ---[m
[[1;33mWARNING[m] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[[1;34mINFO[m] Compiling 40 source files to /var/lib/jenkins/workspace/sootudy/target/classes
[[1;33mWARNING[m] bad path element "/var/lib/jenkins/.m2/repository/com/mchange/c3p0/0.9.5.2/mchange-commons-java-0.2.11.jar": no such file or directory
warning: No processor claimed any of these annotations: org.springframework.web.bind.annotation.PathVariable,org.springframework.web.bind.annotation.RequestParam,org.springframework.context.annotation.EnableAspectJAutoProxy,org.springframework.security.access.prepost.PreAuthorize,org.springframework.beans.factory.annotation.Autowired,org.springframework.web.bind.annotation.RequestMapping,org.springframework.scheduling.annotation.Scheduled,org.springframework.stereotype.Controller,org.springframework.transaction.annotation.EnableTransactionManagement,org.mybatis.spring.annotation.MapperScan,org.springframework.security.access.annotation.Secured,org.springframework.web.bind.annotation.RequestBody,org.springframework.web.bind.annotation.ModelAttribute,org.springframework.stereotype.Service,org.springframework.web.bind.annotation.GetMapping,org.springframework.scheduling.annotation.EnableScheduling,org.springframework.web.bind.annotation.DeleteMapping,org.springframework.web.bind.annotation.PostMapping,org.apache.ibatis.annotations.Param,org.springframework.web.servlet.config.annotation.EnableWebMvc,org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity,org.springframework.web.bind.annotation.ResponseBody,org.springframework.web.bind.annotation.RestController,org.springframework.context.annotation.ComponentScan,org.springframework.context.annotation.Configuration,org.springframework.stereotype.Component,org.springframework.security.config.annotation.web.configuration.EnableWebSecurity,org.springframework.web.bind.annotation.RequestHeader,org.springframework.context.annotation.Bean,org.springframework.transaction.annotation.Transactional
/var/lib/jenkins/workspace/sootudy/src/main/java/com/soo/sootudy/config/WebConfig.java:[14,13] [rawtypes] found raw type: Class
[[1;33mWARNING[m]   missing type arguments for generic class Class<T>
  where T is a type-variable:
    T extends Object declared in class Class
/var/lib/jenkins/workspace/sootudy/src/main/java/com/soo/sootudy/config/WebConfig.java:[20,13] [rawtypes] found raw type: Class
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-resources-plugin:2.6:testResources[m [1m(default-testResources)[m @ [36msootudy[0;1m ---[m
[[1;33mWARNING[m] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[[1;34mINFO[m] skip non existing resourceDirectory /var/lib/jenkins/workspace/sootudy/src/test/resources
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-compiler-plugin:2.5.1:testCompile[m [1m(default-testCompile)[m @ [36msootudy[0;1m ---[m
[[1;34mINFO[m] No sources to compile
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-surefire-plugin:2.12.4:test[m [1m(default-test)[m @ [36msootudy[0;1m ---[m
[[1;34mINFO[m] No tests to run.
[[1;34mINFO[m] 
[[1;34mINFO[m] [1m--- [0;32mmaven-war-plugin:3.2.2:war[m [1m(default-war)[m @ [36msootudy[0;1m ---[m
[[1;34mINFO[m] Packaging webapp
[[1;34mINFO[m] Assembling webapp [sootudy] in [/var/lib/jenkins/workspace/sootudy/target/sootudy-1.0.0-BUILD-SNAPSHOT]
[[1;34mINFO[m] Processing war project
[[1;34mINFO[m] Copying webapp resources [/var/lib/jenkins/workspace/sootudy/src/main/webapp]
[[1;34mINFO[m] Webapp assembled in [325 msecs]
[[1;34mINFO[m] Building war: /var/lib/jenkins/workspace/sootudy/target/sootudy-1.0.0-BUILD-SNAPSHOT.war
[[1;34mINFO[m] [1m------------------------------------------------------------------------[m
[[1;34mINFO[m] [1;32mBUILD SUCCESS[m
[[1;34mINFO[m] [1m------------------------------------------------------------------------[m
[[1;34mINFO[m] Total time:  10.304 s
[[1;34mINFO[m] Finished at: 2019-05-06T01:31:23Z
[[1;34mINFO[m] [1m------------------------------------------------------------------------[m
Deploying /var/lib/jenkins/workspace/sootudy/target/sootudy-1.0.0-BUILD-SNAPSHOT.war to container Tomcat 8.x Remote with context 
ERROR: Build step failed with exception
org.codehaus.cargo.container.ContainerException: Failed to redeploy [/var/lib/jenkins/workspace/sootudy/target/sootudy-1.0.0-BUILD-SNAPSHOT.war]
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:192)
	at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:77)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:147)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:117)
	at hudson.FilePath.act(FilePath.java:1075)
	at hudson.FilePath.act(FilePath.java:1058)
	at hudson.plugins.deploy.CargoContainerAdapter.redeploy(CargoContainerAdapter.java:114)
	at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeploy(PasswordProtectedAdapterCargo.java:93)
	at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:64)
	at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:45)
	at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:744)
	at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:690)
	at hudson.model.Build$BuildExecution.post2(Build.java:186)
	at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:635)
	at hudson.model.Run.execute(Run.java:1841)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:97)
	at hudson.model.Executor.run(Executor.java:429)
Caused by: java.io.FileNotFoundException: http://ec2-15-164-34-236.ap-northeast-2.compute.amazonaws.com:8080/manager/text/list
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1890)
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1492)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:571)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.list(TomcatManager.java:876)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.getStatus(TomcatManager.java:889)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:173)
	... 17 more
java.io.FileNotFoundException: http://ec2-15-164-34-236.ap-northeast-2.compute.amazonaws.com:8080/manager/text/list
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream0(HttpURLConnection.java:1890)
	at sun.net.www.protocol.http.HttpURLConnection.getInputStream(HttpURLConnection.java:1492)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:571)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.list(TomcatManager.java:876)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.getStatus(TomcatManager.java:889)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:173)
	at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:77)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:147)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:117)
	at hudson.FilePath.act(FilePath.java:1075)
	at hudson.FilePath.act(FilePath.java:1058)
	at hudson.plugins.deploy.CargoContainerAdapter.redeploy(CargoContainerAdapter.java:114)
	at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeploy(PasswordProtectedAdapterCargo.java:93)
	at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:64)
	at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:45)
	at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:744)
	at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:690)
	at hudson.model.Build$BuildExecution.post2(Build.java:186)
	at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:635)
	at hudson.model.Run.execute(Run.java:1841)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:97)
	at hudson.model.Executor.run(Executor.java:429)
Build step 'Deploy war/ear to a container' marked build as failure
Finished: FAILURE
```

$ apt-get install tomcat8-admin			

$ apt-get install tomcat8-docs

$ apt-get install tomcat8-examples	

```
ERROR: Build step failed with exception
org.codehaus.cargo.container.ContainerException: Failed to undeploy [/var/lib/jenkins/workspace/sootudy/target/sootudy-1.0.0.war]
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.undeploy(AbstractTomcatManagerDeployer.java:139)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:177)
	at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:77)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:147)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:117)
	at hudson.FilePath.act(FilePath.java:1075)
	at hudson.FilePath.act(FilePath.java:1058)
	at hudson.plugins.deploy.CargoContainerAdapter.redeploy(CargoContainerAdapter.java:114)
	at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeploy(PasswordProtectedAdapterCargo.java:93)
	at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:64)
	at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:45)
	at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:744)
	at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:690)
	at hudson.model.Build$BuildExecution.post2(Build.java:186)
	at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:635)
	at hudson.model.Run.execute(Run.java:1841)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:97)
	at hudson.model.Executor.run(Executor.java:429)
Caused by: org.codehaus.cargo.container.tomcat.internal.TomcatManagerException: The Tomcat Manager responded "FAIL - Unable to delete [/var/lib/tomcat8/webapps/ROOT]. The continued presence of this file may cause problems.
" instead of the expected "OK" message
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:715)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:501)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.undeploy(TomcatManager.java:441)
	at org.codehaus.cargo.container.tomcat.Tomcat7xRemoteDeployer.performUndeploy(Tomcat7xRemoteDeployer.java:61)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.undeploy(AbstractTomcatManagerDeployer.java:129)
	... 18 more
org.codehaus.cargo.container.tomcat.internal.TomcatManagerException: The Tomcat Manager responded "FAIL - Unable to delete [/var/lib/tomcat8/webapps/ROOT]. The continued presence of this file may cause problems.
" instead of the expected "OK" message
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:715)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.invoke(TomcatManager.java:501)
	at org.codehaus.cargo.container.tomcat.internal.TomcatManager.undeploy(TomcatManager.java:441)
	at org.codehaus.cargo.container.tomcat.Tomcat7xRemoteDeployer.performUndeploy(Tomcat7xRemoteDeployer.java:61)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.undeploy(AbstractTomcatManagerDeployer.java:129)
	at org.codehaus.cargo.container.tomcat.internal.AbstractTomcatManagerDeployer.redeploy(AbstractTomcatManagerDeployer.java:177)
	at hudson.plugins.deploy.CargoContainerAdapter.deploy(CargoContainerAdapter.java:77)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:147)
	at hudson.plugins.deploy.CargoContainerAdapter$DeployCallable.invoke(CargoContainerAdapter.java:117)
	at hudson.FilePath.act(FilePath.java:1075)
	at hudson.FilePath.act(FilePath.java:1058)
	at hudson.plugins.deploy.CargoContainerAdapter.redeploy(CargoContainerAdapter.java:114)
	at hudson.plugins.deploy.PasswordProtectedAdapterCargo.redeploy(PasswordProtectedAdapterCargo.java:93)
	at hudson.plugins.deploy.DeployPublisher.perform(DeployPublisher.java:64)
	at hudson.tasks.BuildStepMonitor$3.perform(BuildStepMonitor.java:45)
	at hudson.model.AbstractBuild$AbstractBuildExecution.perform(AbstractBuild.java:744)
	at hudson.model.AbstractBuild$AbstractBuildExecution.performAllBuildSteps(AbstractBuild.java:690)
	at hudson.model.Build$BuildExecution.post2(Build.java:186)
	at hudson.model.AbstractBuild$AbstractBuildExecution.post(AbstractBuild.java:635)
	at hudson.model.Run.execute(Run.java:1841)
	at hudson.model.FreeStyleBuild.run(FreeStyleBuild.java:43)
	at hudson.model.ResourceController.execute(ResourceController.java:97)
	at hudson.model.Executor.run(Executor.java:429)
```
	


기존에 있던 파일들에 대한 권한이 ROOT로 되어있어서 마음대로 삭제하지 못해 일어난 에러 우선 **webapps폴더** 로 들어가자
$ chown tomcat8:tomcat8 . -R (현재 위치에서 하위 파일들까지)