#!bin/sh
#author: weibin.shao
#date: 2017/2/7

echo "Hello World!"
echo Hello World

name="weibin.shao"
age=30
echo $name

#for file in `ls ../excercise05`
#echo $file

#字符串中使用变量
echo "my name is ${name}, my age is ${age}"

#打印字符串长度
echo ${#name}

#打印name中从第0个开始的6个字符
echo ${name:0:6}

#打印name中.的索引(7)
echo `expr index ${name} .`

#数组
arr=(1 2 3 4 5 6)

#打印数组中所有元素
echo ${arr[@]}

#打印数组长度
echo ${#arr[@]}
echo ${#arr[*]}

#传递参数
echo "--------------------------------------------"
echo "file name: $0";
echo "@param 1: $1";
echo "@param 2: $2";
echo "@param 3: $3";
echo "$# $* $$ $! $@ $- $?"
echo "--------------------------------------------"

#$*
for i in "$*"; do
	echo $i
done

#$@
for i in "$@"; do
	echo $i
done

#基本运算符
val=`expr 2 + 2`
echo $val

#字符串运算符
if [ $name ]
then
	echo "name isn't null"
fi

#echo
#显示转义符
echo "\"hello world\""
#显示换行
echo -e "hello world \n"
#显示不换行
echo -e "hello world \c"
echo "hello world"

#原样输出字符串，不进行转义或取变量(用单引号)
echo '$name\"'

#显示结果定向到文件
echo "hello world" > test

#显示命令执行结果
echo `date`

#printf
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234 
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543 
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876 

#数值测试
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo 'two number equal'
else
    echo 'two number not equal'
fi

#文件测试
if test -e ./shell.sh
then
    echo 'file exist'
else
    echo 'file not exist'
fi

#for 循环
for str in 'This is a string'
do
    echo $str
done

#while循环
int=1
while(( $int<=5 ))
do
        echo $int
        let "int++"
done

#while用于读取键盘信息
press(){
	echo 'press <CTRL-D> quit'
	echo -n 'print your love film: '
	while read FILM
	do
	    echo "$FILM is a good film"
	done
}

#函数
funWithParam(){
    echo "@param1 $1 !"
    echo "@param2 $2 !"
    echo "@param10 $10 !"
    echo "@param10 ${10} !"
    echo "@param11 ${11} !"
    echo "@param number $# !"
    echo "all @param $* !"
}

funWithParam 1 2 3 4 5 6 7 8 9 34 73

#输出重定向
who="_mbsetupuser console  Oct 31 17:35\n 
	tianqixin    console  Oct 31 17:35\n 
	tianqixin    ttys000  Dec  1 11:33\n"
echo -e $who > users
echo "hello world" >> users
