

|Elastic Search|Relational DB|
|---|---|
|Index|Database|
|Type|Table|
|Document|Row|
|Field|Column|
|Mapping|Schema|


curl -XGET localhost:9200/classes/class/1

curl -XPOST localhost:9200/classes/class/1 -d'{xxx}

curl -XPUT localhost:9200/classes/class/1 -d'{xxx}

curl -XDELETE localhost:9200/classes/class/1

https://ci.apache.org/projects/flink/flink-docs-stable/dev/connectors/elasticsearch.html

https://www.elastic.co/kr/blog/building-real-time-dashboard-applications-with-apache-flink-elasticsearch-and-kibana

https://ci.apache.org/projects/flink/flink-docs-stable/monitoring/logging.html



# Error

$ curl -XPUT -H 'Content-Type: application/json' 'http://localhost:9200/viper-test/_mapping/viper-log' -d '{
          "properties": {
                    "ip": {
                      "type": "string",
                      "index": "not_analyzed"
                    },
                    "info": {
                        "type": "string"
                    }
          }
 }'

 에러 발생!

 curl -XPUT -H 'Content-Type: application/json' 'http://localhost:9200/viper-test/_mapping/viper-log' -d '{
          "properties": {
                    "ip": {
                      "type": "keyword"
                    },
                    "info": {
                        "type": "text"
                    }
          }
 }'

 결론 : ES 5이상부터 바뀜 (text는 analyzed고, keyword는 not_analyzed다)


https://github.com/elastic/elasticsearch-rails/issues/761