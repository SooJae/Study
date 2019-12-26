# GET

## /config
설장 정보를 뿌려준다.
```json
{
    "refresh-interval": 3000,
    "timezone-name": "대한민국 표준시",
    "timezone-offset": 32400000,
    "flink-version": "1.9.1",
    "flink-revision": "4d56de8 @ 30.09.2019 @ 11:32:19 CST"
}
```

## /jobs/overview
플링크의 전반적인 내용을 뿌려준다.

```json
{
    "jobs": [
        {
            "jid": "122dfbfd21e43297c7bb66500f164935",
            "name": "Flink Java Job at Thu Dec 26 12:59:55 KST 2019",
            "state": "FINISHED",
            "start-time": 1577332795733,
            "end-time": 1577332796506,
            "duration": 773,
            "last-modification": 1577332796506,
            "tasks": {
                "total": 3,
                "created": 0,
                "scheduled": 0,
                "deploying": 0,
                "running": 0,
                "finished": 3,
                "canceling": 0,
                "canceled": 0,
                "failed": 0,
                "reconciling": 0
            }
        }
    ]
}
```

## /jobmanager/config
잡 매니저의 설정 정보를 보여준다.

```json

[
    {
        "key": "parallelism.default",
        "value": "1"
    },
    {
        "key": "jobmanager.execution.failover-strategy",
        "value": "region"
    },
    {
        "key": "jobmanager.rpc.address",
        "value": "localhost"
    },
    {
        "key": "taskmanager.numberOfTaskSlots",
        "value": "1"
    },
    {
        "key": "FLINK_PLUGINS_DIR",
        "value": "/usr/local/Cellar/apache-flink/1.9.1/libexec/plugins"
    },
    {
        "key": "web.tmpdir",
        "value": "/var/folders/1z/x09m11t11815g5vq4djrsrj00000gn/T/flink-web-10832a41-68a4-442b-8aac-e25f2d2fa32a"
    },
    {
        "key": "jobmanager.rpc.port",
        "value": "6123"
    },
    {
        "key": "taskmanager.heap.size",
        "value": "1024m"
    },
    {
        "key": "jobmanager.heap.size",
        "value": "1024m"
    }
]
```

# /jobs

job들의 현재 상태를 보여준다.

```json
{
    "jobs": [
        {
            "id": "122dfbfd21e43297c7bb66500f164935",
            "status": "FINISHED"
        }
    ]
}
```

# /jobs/:jobid

jobId에 해당하는 job의 상세정보를 가져온다.
```json
{
    "jid": "122dfbfd21e43297c7bb66500f164935",
    "name": "Flink Java Job at Thu Dec 26 12:59:55 KST 2019",
    "isStoppable": false,
    "state": "FINISHED",
    "start-time": 1577332795733,
    "end-time": 1577332796506,
    "duration": 773,
    "now": 1577333570730,
    "timestamps": {
        "RESTARTING": 0,
        "FAILED": 0,
        "CANCELLING": 0,
        "RUNNING": 1577332795794,
        "CANCELED": 0,
        "RECONCILING": 0,
        "CREATED": 1577332795733,
        "FAILING": 0,
        "FINISHED": 1577332796506,
        "SUSPENDED": 0
    },
    "vertices": [
        {
            "id": "01166e36d4474e8780439a8cfdcd4418",
            "name": "CHAIN DataSource (at getDefaultTextLineDataSet(WordCountData.java:70) (org.apache.flink.api.java.io.CollectionInputFormat)) -> FlatMap (FlatMap at main(WordCount.java:76)) -> Combine (SUM(1), at main(WordCount.java:79)",
            "parallelism": 1,
            "status": "FINISHED",
            "start-time": 1577332795889,
            "end-time": 1577332796278,
            "duration": 389,
            "tasks": {
                "FINISHED": 1,
                "CREATED": 0,
                "RECONCILING": 0,
                "SCHEDULED": 0,
                "DEPLOYING": 0,
                "CANCELING": 0,
                "CANCELED": 0,
                "RUNNING": 0,
                "FAILED": 0
            },
            "metrics": {
                "read-bytes": 0,
                "read-bytes-complete": true,
                "write-bytes": 0,
                "write-bytes-complete": true,
                "read-records": 0,
                "read-records-complete": true,
                "write-records": 170,
                "write-records-complete": true
            }
        },
        {
            "id": "ff1c659e69b3d78308edee2ab3938216",
            "name": "Reduce (SUM(1), at main(WordCount.java:79)",
            "parallelism": 1,
            "status": "FINISHED",
            "start-time": 1577332796249,
            "end-time": 1577332796489,
            "duration": 240,
            "tasks": {
                "FINISHED": 1,
                "CREATED": 0,
                "RECONCILING": 0,
                "SCHEDULED": 0,
                "DEPLOYING": 0,
                "CANCELING": 0,
                "CANCELED": 0,
                "RUNNING": 0,
                "FAILED": 0
            },
            "metrics": {
                "read-bytes": 2380,
                "read-bytes-complete": true,
                "write-bytes": 0,
                "write-bytes-complete": true,
                "read-records": 170,
                "read-records-complete": true,
                "write-records": 170,
                "write-records-complete": true
            }
        },
        {
            "id": "17d2df51e7b6a30312fd798798a11b86",
            "name": "DataSink (collect())",
            "parallelism": 1,
            "status": "FINISHED",
            "start-time": 1577332796480,
            "end-time": 1577332796503,
            "duration": 23,
            "tasks": {
                "FINISHED": 1,
                "CREATED": 0,
                "RECONCILING": 0,
                "SCHEDULED": 0,
                "DEPLOYING": 0,
                "CANCELING": 0,
                "CANCELED": 0,
                "RUNNING": 0,
                "FAILED": 0
            },
            "metrics": {
                "read-bytes": 2380,
                "read-bytes-complete": true,
                "write-bytes": 0,
                "write-bytes-complete": true,
                "read-records": 170,
                "read-records-complete": true,
                "write-records": 0,
                "write-records-complete": true
            }
        }
    ],
    "status-counts": {
        "FINISHED": 3,
        "CREATED": 0,
        "RECONCILING": 0,
        "SCHEDULED": 0,
        "DEPLOYING": 0,
        "CANCELING": 0,
        "CANCELED": 0,
        "RUNNING": 0,
        "FAILED": 0
    },
    "plan": {
        "jid": "122dfbfd21e43297c7bb66500f164935",
        "name": "Flink Java Job at Thu Dec 26 12:59:55 KST 2019",
        "nodes": [
            {
                "id": "ff1c659e69b3d78308edee2ab3938216",
                "parallelism": 1,
                "operator": "GroupReduce",
                "operator_strategy": "Sorted Group Reduce",
                "description": "Reduce (SUM(1), at main(WordCount.java:79)",
                "inputs": [
                    {
                        "num": 0,
                        "id": "01166e36d4474e8780439a8cfdcd4418",
                        "ship_strategy": "Hash Partition on [0]",
                        "local_strategy": "Sort (combining) on [0:ASC]",
                        "exchange": "pipelined"
                    }
                ],
                "optimizer_properties": {
                    "global_properties": [
                        {
                            "name": "Partitioning",
                            "value": "HASH_PARTITIONED"
                        },
                        {
                            "name": "Partitioned on",
                            "value": "[0]"
                        },
                        {
                            "name": "Partitioning Order",
                            "value": "(none)"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "local_properties": [
                        {
                            "name": "Order",
                            "value": "[0:ASC]"
                        },
                        {
                            "name": "Grouped on",
                            "value": "[0]"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "estimates": [
                        {
                            "name": "Est. Output Size",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Est. Cardinality",
                            "value": "(unknown)"
                        }
                    ],
                    "costs": [
                        {
                            "name": "Network",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Disk I/O",
                            "value": "(unknown)"
                        },
                        {
                            "name": "CPU",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Cumulative Network",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Cumulative Disk I/O",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Cumulative CPU",
                            "value": "(unknown)"
                        }
                    ],
                    "compiler_hints": [
                        {
                            "name": "Output Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Output Cardinality",
                            "value": "(none)"
                        },
                        {
                            "name": "Avg. Output Record Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Filter Factor",
                            "value": "(none)"
                        }
                    ]
                }
            },
            {
                "id": "01166e36d4474e8780439a8cfdcd4418",
                "parallelism": 1,
                "operator": "Data Source -> FlatMap -> GroupCombine",
                "operator_strategy": "(none)<br/> -&gt; FlatMap<br/> -&gt; Sorted Combine",
                "description": "DataSource (at getDefaultTextLineDataSet(WordCountData.java:70) (org.apache.flink.api.java.io.CollectionInputFormat))<br/> -&gt; FlatMap (FlatMap at main(WordCount.java:76))<br/> -&gt; Combine (SUM(1), at main(WordCount.java:79)",
                "optimizer_properties": {
                    "global_properties": [
                        {
                            "name": "Partitioning",
                            "value": "RANDOM_PARTITIONED"
                        },
                        {
                            "name": "Partitioning Order",
                            "value": "(none)"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "local_properties": [
                        {
                            "name": "Order",
                            "value": "(none)"
                        },
                        {
                            "name": "Grouping",
                            "value": "not grouped"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "estimates": [
                        {
                            "name": "Est. Output Size",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Est. Cardinality",
                            "value": "(unknown)"
                        }
                    ],
                    "costs": [
                        {
                            "name": "Network",
                            "value": "0.0"
                        },
                        {
                            "name": "Disk I/O",
                            "value": "0.0"
                        },
                        {
                            "name": "CPU",
                            "value": "0.0"
                        },
                        {
                            "name": "Cumulative Network",
                            "value": "0.0"
                        },
                        {
                            "name": "Cumulative Disk I/O",
                            "value": "0.0"
                        },
                        {
                            "name": "Cumulative CPU",
                            "value": "0.0"
                        }
                    ],
                    "compiler_hints": [
                        {
                            "name": "Output Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Output Cardinality",
                            "value": "(none)"
                        },
                        {
                            "name": "Avg. Output Record Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Filter Factor",
                            "value": "(none)"
                        }
                    ]
                }
            },
            {
                "id": "17d2df51e7b6a30312fd798798a11b86",
                "parallelism": 1,
                "operator": "Data Sink",
                "operator_strategy": "(none)",
                "description": "DataSink (collect())",
                "inputs": [
                    {
                        "num": 0,
                        "id": "ff1c659e69b3d78308edee2ab3938216",
                        "ship_strategy": "Forward",
                        "exchange": "pipelined"
                    }
                ],
                "optimizer_properties": {
                    "global_properties": [
                        {
                            "name": "Partitioning",
                            "value": "HASH_PARTITIONED"
                        },
                        {
                            "name": "Partitioned on",
                            "value": "[0]"
                        },
                        {
                            "name": "Partitioning Order",
                            "value": "(none)"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "local_properties": [
                        {
                            "name": "Order",
                            "value": "[0:ASC]"
                        },
                        {
                            "name": "Grouped on",
                            "value": "[0]"
                        },
                        {
                            "name": "Uniqueness",
                            "value": "not unique"
                        }
                    ],
                    "estimates": [
                        {
                            "name": "Est. Output Size",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Est. Cardinality",
                            "value": "(unknown)"
                        }
                    ],
                    "costs": [
                        {
                            "name": "Network",
                            "value": "0.0"
                        },
                        {
                            "name": "Disk I/O",
                            "value": "0.0"
                        },
                        {
                            "name": "CPU",
                            "value": "0.0"
                        },
                        {
                            "name": "Cumulative Network",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Cumulative Disk I/O",
                            "value": "(unknown)"
                        },
                        {
                            "name": "Cumulative CPU",
                            "value": "(unknown)"
                        }
                    ],
                    "compiler_hints": [
                        {
                            "name": "Output Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Output Cardinality",
                            "value": "(none)"
                        },
                        {
                            "name": "Avg. Output Record Size (bytes)",
                            "value": "(none)"
                        },
                        {
                            "name": "Filter Factor",
                            "value": "(none)"
                        }
                    ]
                }
            }
        ]
    }
}
```

## /jobs/:jobId/accumulators
JobId에 해당하는 job의 모든 task들을 리턴한다.
각각의 subtask 들을 합친다.
includeSerializedValue (optional): Boolean value that specifies whether serialized user task accumulators should be included in the response.
```json
{
    "job-accumulators": [],
    "user-task-accumulators": [
        {
            "name": "3475470b600876b50293e6b363830922",
            "type": "SerializedListAccumulator",
            "value": "[[B@30d78305, [B@6b0f942a, [B@1865aa79, [B@202adc8c, [B@2ce9bc27, [B@3b50d354, [B@e538025, [B@78ebf3df, [B@19827061, [B@24f5ca76, [B@36352465, [B@11675c77, [B@1b6c2742, [B@11c0f823, [B@e49e072, [B@25e69128, [B@5fcae4e1, [B@49dd1edb, [B@8563de2, [B@19a88211, [B@11cd9029, [B@30c77f0d, [B@9c7edda, [B@54a24ef9, [B@2993d09c, [B@22a7fdb4, [B@14b86d07, [B@522b2cef, [B@658b1106, [B@78dc0a5e, [B@2f5b8017, [B@249c9d47, [B@19a2abf3, [B@1b4cc63, [B@721caf7a, [B@322a62db, [B@3e5bba5e, [B@192bbe22, [B@e5bb502, [B@6f8622a8, [B@cecec4c, [B@48f2895d, [B@1b52d6e4, [B@459f2444, [B@2efa2e37, [B@729ee2d4, [B@7ff6ff95, [B@43f7592b, [B@3c034cf4, [B@390e81e2, [B@714ccb01, [B@88bea02, [B@2ec9630b, [B@6305f6a1, [B@74863d03, [B@230a126b, [B@46befc3a, [B@ac2bab2, [B@4fe9e0cc, [B@3c032a10, [B@ded4e86, [B@126572a3, [B@120a0fa3, [B@37fcf458, [B@5002055f, [B@694b8596, [B@2b7ee80b, [B@7b708708, [B@3b985dc4, [B@eca1814, [B@52288776, [B@2d9f02fc, [B@54901cf6, [B@a44b4c8, [B@1c4191c1, [B@499cf857, [B@1dbf2a3e, [B@32723fb5, [B@22ad6fa3, [B@c5d75e1, [B@6857508e, [B@4b7b45a6, [B@2e2fb1d, [B@657764dd, [B@37768bdd, [B@2631aee0, [B@339e8328, [B@6d91480a, [B@6e3a1e06, [B@45d7fb8f, [B@217a7de, [B@65a17e8e, [B@5bd58612, [B@21a40564, [B@1eb27fd9, [B@7009278f, [B@71bca8a, [B@6956028, [B@b549b94, [B@32d8e02e, [B@6b4e3365, [B@46779a04, [B@69d02165, [B@1cfc65e1, [B@6b3b800, [B@7ceea568, [B@14dd6899, [B@6b71d48e, [B@70991258, [B@79d52cc6, [B@6b31ac5, [B@63837b39, [B@5bb0aec3, [B@bd30a6f, [B@15a84ce2, [B@6d8ab7dd, [B@3392da19, [B@20012e76, [B@7719b9c8, [B@4f95cca9, [B@6a729550, [B@432964f6, [B@79c452a2, [B@18d539b7, [B@6673f7e8, [B@6ef52104, [B@357f2f3a, [B@4d6b0a3, [B@7de3db66, [B@3a5928df, [B@7693d651, [B@47f13388, [B@24aaf8fb, [B@57462361, [B@3f0f5686, [B@712c4f9c, [B@2b20c62, [B@64896a7e, [B@2177ab0f, [B@32344012, [B@20f79b2a, [B@f82cfd0, [B@13b132fc, [B@395d448, [B@1fa731db, [B@64281b0, [B@1cfe7556, [B@3164c515, [B@176b030b, [B@5364f57, [B@6a0dde62, [B@7d56f25b, [B@326ad5a1, [B@591684c, [B@16b4852, [B@4b65b60e, [B@2fc6a51e, [B@211b7ba2, [B@7ae98e0b, [B@1c5a829e, [B@6ae2a5e, [B@7c929742, [B@4abdd70d, [B@2bbf2b6, [B@75b0c465, [B@1d706516, [B@3951cc0a, [B@6422b7d4, [B@1742d4d9, [B@9045bf2]"
        }
    ],
    "serialized-user-task-accumulators": {}
}
```


# PATCH

## /jobs/:jobid

job을 종료시킨다.
query parameters
mode( 선택사항 ) : 종료 모드를 설정한다. (cancel, stop)