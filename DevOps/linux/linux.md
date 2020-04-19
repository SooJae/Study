
# [CentOS]Determining fastest mirrors 가 떴을때
Determining fastest mirrors
 * base: mirror.navercorp.com
 * extras: mirror.navercorp.com
 * updates: mirror.navercorp.com
No package nginx available.



`$ /etc/yum/pluginconf.d/fastestmirror.conf`
[main]
enabled=0 <= 1에서 0으로 변경
verbose=0
always_print_best_host = true
socket_timeout=3
#  Relative paths are relative to the cachedir (and so works for users as well
# as root).
hostfilepath=timedhosts.txt
maxhostfileage=10
maxthreads=15
#exclude=.gov, facebook
#include_only=.nl,.de,.uk,.ie
~

nginx는 CentOS 레파지토리에 존재하지 않는다. EPEL레파지토리를 설치한 후에 사용가능
yum install epel-release


`$sudo  vi /etc/nginx/nginx.conf`


cat /etc/resolv.conf
search openstacklocal novalocalcat
nameserver ~~
nameserver
