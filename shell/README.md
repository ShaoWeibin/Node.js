# Shell 入门 #

## Shell 变量 ##
``` shell 
name="weibin.shao"
age=30
echo $name

#字符串中使用变量
echo "my name is ${name}, my age is ${age}"

#打印字符串长度
echo ${#name}

#打印name中从第0个开始的6个字符
echo ${name:0:6}

#打印name中.的索引(7)
echo `expr index ${name} .`
```

## Shell 数组 ##
``` shell
#数组
arr=(1 2 3 4 5 6)

#打印数组中所有元素
echo ${arr[@]}

#打印数组长度
echo ${#arr[@]}
echo ${#arr[*]}
```

## Shell 传递参数 ##
向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……其中 $0 为执行的文件名。
``` shell
#传递参数
echo "--------------------------------------------"
echo "file name: $0";
echo "@param 1: $1";
echo "@param 2: $2";
echo "@param 3: $3";
echo "$# $* $$ $! $@ $- $?"
echo "--------------------------------------------"
```
运行方式
``` shell
bash ./shell.sh 1 2 3

#输出结果
--------------------------------------------
file name: .\shell.sh
@param 1: 1
@param 2: 2
@param 3: 3
3 1 2 3 11876  1 2 3 hB 0
--------------------------------------------
```
另外，还有几个特殊字符用来处理参数：
``` 
$#  传递到脚本的参数个数
$*  以一个单字符串显示所有向脚本传递的参数。
如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
$$  脚本运行的当前进程ID号
$!  后台运行的最后一个进程的ID号
$@  与$*相同，但是使用时加引号，并在引号中返回每个参数。
如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。
$-  显示Shell使用的当前选项，与set命令功能相同。
$?  显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。
```
$* 与 $@ 区别：

* 相同点：都是引用所有参数。
* 不同点：只有在双引号中体现出来。假设在脚本运行时写了三个参数 1、2、3，，则 " * " 等价于 "1 2 3"（传递了一个参数），而 "@" 等价于 "1" "2" "3"（传递了三个参数）。

## Shell 基本运算符 ##
Shell 和其他编程语言一样，支持多种运算符，包括：

* 算数运算符
* 关系运算符
* 布尔运算符
* 字符串运算符
* 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。
expr 是一款表达式计算工具，使用它能完成表达式的求值操作。
例如，两个数相加(注意使用的是反引号 ` 而不是单引号 ')：
``` shell
val=`expr 2 + 2`
echo $val
```
两点注意：

* 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
* 完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。

### Shell 算数运算符 ###
下表列出了常用的算术运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明 |             举例            |
|--------|------|-----------------------------|
| +      |      | `expr $a + $b` 结果为 30    |
| -      |      | `expr $a - $b` 结果为 -10   |
| *      |      | `expr $a \* $b` 结果为  200 |
| /      |      | `expr $b / $a` 结果为 2     |
| %      | 取余 | `expr $b % $a` 结果为 0     |
| ==     |      | [ $a == $b ] 返回 false     |
| !=     |      | [ $a != $b ] 返回 true      |

注意：条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]

### Shell 关系运算符 ##
关系运算符只支持数字，不支持字符串，除非字符串的值是数字。
下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 |                         说明                        |  举例 |
|--------|-----------------------------------------------------|-------|
| -eq    | 检测两个数是否相等，相等返回 true                   | false |
| -ne    | 检测两个数是否相等，不相等返回 true                 | true  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true     | false |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true     | true  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true | false |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true | true  |

### Shell 布尔运算符 ###
下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 |                        说明                       | 举例 |
|--------|---------------------------------------------------|------|
| ！     | 非运算，表达式为 true 则返回 false，否则返回 true |      |
| -o     | 或运算，有一个表达式为 true 则返回 true           |      |
| -a     | 与运算，两个表达式都为 true 才返回 true           |      |

### Shell 逻辑运算符 ###
下表列出了常用的逻辑运算符，假定变量 a 为 10，变量 b 为 20：

| 运算符 | 说明       | 举例                                      |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false |
| ll     | 逻辑的 OR  | [[ $a -lt 100 ll $b -gt 100 ]] 返回 true  |

### Shell 字符串运算符 ###
下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

| 运算符 |                   说明                  |          举例          |
|--------|-----------------------------------------|------------------------|
| =      | 检测两个字符串是否相等，相等返回 true   | [ $a = $b ] 返回 false |
| !=     | 检测两个字符串是否相等，不相等返回 true | [ $a != $b ] 返回 true |
| -z     | 检测字符串长度是否为0，为0返回 true     | [ -z $a ] 返回 false   |
| -n     | 检测字符串长度是否为0，不为0返回 true   | [ -n $a ] 返回 true    |
| str    | 检测字符串是否为空，不为空返回 true     | [ str $a ] 返回 true   |

### Shell 文件测试运算符 ###

操作符 说明  举例
-b file 检测文件是否是块设备文件，如果是，则返回 true。  [ -b $file ] 返回 false。
-c file 检测文件是否是字符设备文件，如果是，则返回 true。 [ -c $file ] 返回 false。
-d file 检测文件是否是目录，如果是，则返回 true。 [ -d $file ] 返回 false。
-f file 检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。    [ -f $file ] 返回 true。
-g file 检测文件是否设置了 SGID 位，如果是，则返回 true。  [ -g $file ] 返回 false。
-k file 检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。  [ -k $file ] 返回 false。
-p file 检测文件是否是有名管道，如果是，则返回 true。   [ -p $file ] 返回 false。
-u file 检测文件是否设置了 SUID 位，如果是，则返回 true。  [ -u $file ] 返回 false。
-r file 检测文件是否可读，如果是，则返回 true。  [ -r $file ] 返回 true。
-w file 检测文件是否可写，如果是，则返回 true。  [ -w $file ] 返回 true。
-x file 检测文件是否可执行，如果是，则返回 true。 [ -x $file ] 返回 true。
-s file 检测文件是否为空（文件大小是否大于0），不为空返回 true。 [ -s $file ] 返回 true。
-e file 检测文件（包括目录）是否存在，如果是，则返回 true。    [ -e $file ] 返回 true。

## Shell echo 命令 ##
Shell 的 echo 指令与 PHP 的 echo 指令类似，都是用于字符串的输出。命令格式：
``` shell
echo string
```
显示普通字符串
``` shell
echo "hello world"
#这里的双引号完全可以省略
echo hello world
#显示转义符
echo "\"hello world\""
#显示换行 
echo -e "hello world\n" # -e 开启转义
#显示不换行
echo -e "hello world\c"
```
显示结果定向到文件
``` shell
echo "hello world" > test
```
原样输出字符串，不进行转义或取变量(用单引号)
``` shell
echo '$name\"'
```
显示命令执行结果
``` shell
echo `date`
```

## Shell  printf 命令 ##
printf 命令模仿 C 程序库（library）里的 printf() 程序。
标准所定义，因此使用printf的脚本比使用echo移植性好。
printf 使用引用文本或空格分隔的参数，外面可以在printf中使用格式化字符串，还可以制定字符串的宽度、左右对齐方式等。默认printf不会像 echo 自动添加换行符，我们可以手动添加 \n。
printf 命令的语法：
``` shell 
printf  format-string  [arguments...]
```

``` shell
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876 

#结果
姓名     性别   体重kg
郭靖     男      66.12
杨过     男      48.65
郭芙     女      47.99
```
%s %c %d %f都是格式替代符
%-10s 指一个宽度为10个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在10个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。
%-4.2f 指格式化为小数，其中.2指保留2位小数。
更多实例：
``` shell
# format-string为双引号
printf "%d %s\n" 1 "abc"

# 单引号与双引号效果一样 
printf '%d %s\n' 1 "abc" 

# 没有引号也可以输出
printf %s abcdef

# 格式只指定了一个参数，但多出的参数仍然会按照该格式输出，format-string 被重用
printf %s abc def

printf "%s\n" abc def

printf "%s %s %s\n" a b c d e f g h i j

# 如果没有 arguments，那么 %s 用NULL代替，%d 用 0 代替
printf "%s and %d \n" 
```
执行脚本，输出结果如下所示：
``` shell
1 abc
1 abc
abcdefabcdefabc
def
a b c
d e f
g h i
j  
 and 0
```

### print 的转义序列 ###
\a  警告字符，通常为ASCII的BEL字符
\b  后退
\c  抑制（不显示）输出结果中任何结尾的换行字符（只在%b格式指示符控制下的参数字符串中有效），而且，任何留在参数里的字符、任何接下来的参数以及任何留在格式字符串中的字符，都被忽略
\f  换页（formfeed）
\n  换行
\r  回车（Carriage return）
\t  水平制表符
\v  垂直制表符
\\  一个字面上的反斜杠字符
\ddd    表示1到3位数八进制值的字符。仅在格式字符串中有效
\0ddd   表示1到3位的八进制值字符

## Shell test 命令 ##
Shell中的 test  命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。

### 数值测试 ###
| 参数 |      说明      |
|------|----------------|
| -eq  | 等于则为真     |
| -ne  | 不等于则为真   |
| -gt  | 大于则为真     |
| -ge  | 大于等于则为真 |
| -lt  | 小于则为真     |
| -le  | 小于等于则为真 |

实例演示：
``` shell
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo 'two number equal'
else
    echo 'two number not equal'
fi
```

### 字符串测试 ###
|    参数   |           说明           |
|-----------|--------------------------|
| =         | 等于则为真               |
| !=        | 不相等则为真             |
| -z 字符串 | 字符串的长度为零则为真   |
| -n 字符串 | 字符串的长度不为零则为真 |

实例演示：
``` shell
num1="ru1noob"
num2="runoob"
if test $num1 = $num2
then
    echo 'two string equal'
else
    echo 'two string not equal'
fi
```

### 文件测试 ###
|    参数   |                 说明                 |
|-----------|--------------------------------------|
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

实例演示：
``` shell
if test -e ./shell
then
    echo 'file exist'
else
    echo 'file not exist'
fi
```
另外，Shell还提供了与( -a )、或( -o )、非( ! )三个逻辑操作符用于将测试条件连接起来，其优先级为："!"最高，"-a"次之，"-o"最低

## Shell 流程控制 ##
### if ###
if 语句语法格式：
``` shell 
if condition
then
    command1 
    command2
    ...
    commandN 
fi
```
写成一行（适用于终端命令提示符）：
``` shell
if [ $(ps -ef | grep -c "ssh") -gt 1 ]; then echo "true"; fi
```

### if else ###
if else 语法格式：
``` shell
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```

### if else-if else ###
if else-if else 语法格式：
``` shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

### for 循环 ###
for循环一般格式为：
``` shell 
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```
写成一行：
``` shell
for var in item1 item2 ... itemN; do command1; command2… done;
```
例如，顺序输出当前列表中的数字：
``` shell
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```
顺序输出字符串中的字符：
``` shell
for str in 'This is a string'
do
    echo $str
done
```

### while 循环语句 ###
hile循环用于不断执行一系列命令，也用于从输入文件中读取数据；命令通常为测试条件。其格式为：
``` shell 
while condition
do
    command
done
```

``` shell
int=1
while(( $int<=5 ))
do
        echo $int
        let "int++"
done

```
使用中使用了 Bash let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量
while循环可用于读取键盘信息。下面的例子中，输入信息被设置为变量FILM，按<Ctrl-D>结束循环。
``` shell
echo 'press <CTRL-D> quit'
echo -n 'print your love film: '
while read FILM
do
    echo "$FILM is a good film"
done
```

### 无限循环 ###
无限循环语法格式：
``` shell
while :
do
    command
done

#另一种写法
while true
do
    command
done

#for (( ; ; ))
```

###  until 循环 ###

until循环执行一系列命令直至条件为真时停止。
until循环与while循环在处理方式上刚好相反。
一般while循环优于until循环，但在某些时候—也只是极少数情况下，until循环更加有用。
until 语法格式:
``` shell
until condition
do
    command
done
```
条件可为任意测试条件，测试发生在循环末尾，因此循环至少执行一次—请注意这一点。

### case ###
Shell case语句为多选择语句。可以用case语句匹配一个值与一个模式，如果匹配成功，执行相匹配的命令。case语句格式如下：
``` shell 
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
*)
    command1
    command2
    ...
    commandN
    ;;    
esac
```

### 调出循环 ###
在循环过程中，有时候需要在未达到循环结束条件时强制跳出循环，Shell使用两个命令来实现该功能：break和continue。

## Shell 函数 ##
shell 可以用户定义函数，然后在shell脚本中可以随便调用。
shell中函数的定义格式如下：
``` shell
[ function ] funname [()]

{

    action;

    [return int;]

}
```
说明：
* 1、可以带function fun() 定义，也可以直接fun() 定义,不带任何参数。
* 参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255)

下面的例子定义了一个函数并进行调用：
``` shell 
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
```
下面定义一个带有return语句的函数：
``` shell
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}

funWithReturn
echo "输入的两个数字之和为 $? !"
```
函数返回值在调用该函数后通过 $? 来获得。

### 函数参数 ###
在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个参数...
带参数的函数示例：
``` shell
funWithParam(){
    echo "第一个参数为 $1 !"
    echo "第二个参数为 $2 !"
    echo "第十个参数为 $10 !"
    echo "第十个参数为 ${10} !"
    echo "第十一个参数为 ${11} !"
    echo "参数总数有 $# 个!"
    echo "作为一个字符串输出所有参数 $* !"
}
funWithParam 1 2 3 4 5 6 7 8 9 34 73
```
注意，$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。
另外，还有几个特殊字符用来处理参数：

## Shell 输入/输出重定向 ##
大多数 UNIX 系统命令从你的终端接受输入并将所产生的输出发送回​​到您的终端。一个命令通常从一个叫标准输入的地方读取输入，默认情况下，这恰好是你的终端。同样，一个命令通常将其输出写入到标准输出，默认情况下，这也是你的终端。
重定向命令列表如下：
|       命令      |                       说明                       |
|-----------------|--------------------------------------------------|
| command > file  | 将输出重定向到 file                              |
| command < file  | 将输入重定向到 file                              |
| command >> file | 将输出以追加的方式重定向到 file                  |
| n > file        | 将文件描述符为 n 的文件重定向到 file             |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file |
| n >& m          | 将输出文件 m 和 n 合并                           |
| n <& m          | 将输入文件 m 和 n 合并                           |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入 |

需要注意的是文件描述符 0 通常是标准输入（STDIN），1 是标准输出（STDOUT），2 是标准错误输出（STDERR）。

### 输出重定向 ###
定向一般通过在命令间插入特定的符号来实现。特别的，这些符号的语法如下所示:
``` shell
command1 > file1
```
上面这个命令执行command1然后将输出的内容存入file1。
注意任何file1内的已经存在的内容将被新内容替代。如果要将新内容添加在文件末尾，请使用>>操作符。
实例
执行下面的 who 命令，它将命令的完整的输出重定向在用户文件中(users):
``` shell
who > users
```

### 输入重定向 ###
和输出重定向一样，Unix 命令也可以从文件获取输入，语法为：
``` shell
command1 < file1
```