#!bin/sh
#author: weibin.shao
#date: 2017/2/7

echo "Hello World!"

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