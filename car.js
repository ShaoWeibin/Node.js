var cars = [ 
	{ value: 31, label: '全部车辆', default: true },
  	{ value: 30, label: '小轿车' },
  	{ value: 29, label: '微型车' },
  	{ value: 28, label: '小型卡/货车' },
  	{ value: 27, label: '大卡/货车' },
  	{ value: 26, label: '拖/挂车' },
  	{ value: 25, label: '小型客车' },
  	{ value: 24, label: '大型客车' },
  	{ value: 23, label: '公交车' },
  	{ value: 22, label: '出租车' },
  	{ value: 21, label: '自行车/人力车' },
  	{ value: 20, label: '摩托车（4轮以下）' },
  	{ value: 19, label: '危险品运输车辆' },
  	{ value: 0, label: '行人' },
  	{ value: 24, label: '大型客车' },
  	{ value: 23, label: '公交车' },
  	{ value: 22, label: '出租车' },
  	{ value: 21, label: '自行车/人力车' },
  	{ value: 20, label: '摩托车（4轮以下）' },
  	{ value: 19, label: '危险品运输车辆' } 
];

var getCars = function(v) {
	var array = [],
        v = (v && _16To2(v)) || '';

    for (var i = 0, l = v.length; i < l; i++) {
        if (parseInt(v[i], 10) === 1) {
            var obj = searchCar(l - 1 - i);
            if (obj) {
                array.push(obj);
            }
        }
    }

    function searchCar(i) {
        var obj;
        cars.map(function (item) {
            if (item.value === i) {
                obj = item;
                return false;
            }
        });
        return obj;
    }

    function _16To2(v) {
    	return parseInt(v, 16).toString(2);
    }

    return array;
}