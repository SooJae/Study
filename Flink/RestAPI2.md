
파일 업로드

예: curl -L -X POST 'http://examples.jar/jars/upload'  -F 'jarFile=@/Users/abc/Documents/examples-java.jar' -0



Response

{
   "filename": "/tmp/flink-web-4dfd0caf-1203-4e8930c/flink-web-upload/a",
   "status": "success"
}




job 실행

filename(jarId)을 이용하여 jar파일 run

POST: /jars/:jarid/run


옵션 :

allowNonRestoredState (optional): Boolean value that specifies whether the job submission should be rejected if the savepoint contains state that cannot be mapped back to the job.
savepointPath (optional): String value that specifies the path of the savepoint to restore the job from.
program-args (optional): Deprecated, please use 'programArg' instead. String value that specifies the arguments for the program or plan
programArg (optional): Comma-separated list of program arguments.
entry-class (optional): String value that specifies the fully qualified name of the entry point class. Overrides the class defined in the jar file manifest.
parallelism (optional): Positive integer value that specifies the desired parallelism for the job.


예 : savepoint를 적용하여 실행하고 싶을 때

Request

{
	"savepointPath": "file:/tmp/flink/savepoints/savepoint-7fdae7-e7a74ec40f82"
}


Response

{
	"jobid": "18e30a52f6e507287a717b2d5067d4fd"
}




세이브 포인트를 얻는 두가지 방법

1.Canceled (Schedule로 관리할때 필요)

Savepoint를 만들고, cancel-job으로 cancel할지, 계속 실행되게 할지 결정 할 수 있다. Response값으로 savepoint에 대한 정보를 갖고 있는 triggerid를 반환한다.

POST: /jars/:jobId/savepoints




Request

{
	"target-directory":"file:///tmp/flink/savepoints/tmp",
	"cancel-job":false 
}


Response

{
    "request-id": "a7ad2bf5203b32e2c62ceeb3081796a5"
}




2.Finished (Configuration를 Update하고, Restart할 시 필요)

해당 job을 중지시킨다.  Response값으로 savepoint에 대한 정보를 갖고 있는 triggerid를 반환한다.



POST : /jobs/:jobid/stop


Request

{
	 "targetDirectory":"file:///tmp/flink/savepoints/tmp",
	 "drain": false
}


Response

{
    "request-id": "49ac1dd5321321d9d07cfa3ee10e0add"
}




TriggerId(응답받은 request-id)를 이용하여 savepoint의 상태와, 저장 위치를 확인 할 수 있다. (Run할때 savepointPath 옵션 값을 넣기위해 필요)

GET : /jobs/:jobid/savepoints/:triggerId


Response

{
    "status": {
        "id": "COMPLETED"
    },
    "operation": {
        "location": "file:/tmp/flink/savepoints/tmp/savepoint-7bf83c-a3c8c5190b01"
    }
}




job의 상태, job의 아이디 값을 갖고온다.

GET: /jobs


Response

jobs" : {
      "type" : "array",
      "items" : {
        "type" : "object",
        "id" : "urn:jsonschema:org:apache:flink:runtime:messages:webmonitor:JobIdsWithStatusOverview:JobIdWithStatus",
        "properties" : {
          "id" : {
            "type" : "any"
          },
          "status" : {
            "type" : "string",
            "enum" : [ "CREATED", "RUNNING", "FAILING", "FAILED", "CANCELLING", "CANCELED", "FINISHED", "RESTARTING", "SUSPENDED", "RECONCILING" ]
          }
        }
      }
    }





해당 savepoint의 file을 삭제하고 triggerId를 리턴한다.

POST : /savepoint-disposal


Request

{
	"savepoint-path": "file:///tmp/flink/savepoints/tmp/savepoint-64ed5a-42c146e93458"
}


Response

{
    "request-id": "f5cc716a3bdaccd3898436250341ff83"
}




해당 savepoint를 삭제하고 받은 triggerId를 조회하여 savepoint의 삭제 진행 상태를 확인 할 수 있다.



GET : /savepoint-disposal/:triggerId


Response

{
	"status": {
        "id": "COMPLETED"
    },
    "operation": {}
}


