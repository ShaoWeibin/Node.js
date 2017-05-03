/**
 * Create by weibin.shao on 2017/3/5.
 * Promise exercise
 */

 Promise.resolve(1).then((v) => {
 	console.log(v);
 })

 function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});