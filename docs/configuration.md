# Configuration

The following environment variables are supported for configuring the server:

| Name                 | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| PORT                 | Port to listen to                                                                                                      |
| CLOSE_GRACE_DELAY    | Time in ms to give server to shutdown gracefuly                                                                        |
| MAX_EVENT_LOOP_DELAY | Allowed time between events until blocking incoming requests                                                           |
| MAX_HEAP_USED_BYTES  | Allowed usage of heap memory until blocking incoming requests                                                          |
| MAX_RSS_BYTES        | Allowed total memory usage until blocking incoming requests                                                            |
| MAX_REQUEST          | Maximum number of request to make before rate limiting kicks in.                                                       |
| TIME_WINDOW          | Time window to look at when counting the number of requests of a user. Accepted values as described in the ms package. |
