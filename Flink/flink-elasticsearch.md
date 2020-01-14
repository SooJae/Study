

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