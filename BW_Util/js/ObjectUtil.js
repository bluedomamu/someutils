/*
author:landbluewater  lbw
date:2020-01-02
*/
//对象判空
isEmpty = function(obj) {
	if (obj == undefined || obj == null) {
		return true;
	}
	/*
	Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
	*/
	var keys = Object.keys(obj);
	if (0 == keys.length) {
		return true
	} else {
		return false
	}
}
//判断对象
isObject = function(obj) {
	try {
		return obj.constructor.name == 'Object'
	} catch (e) {
		//TODO handle the exception
		return false
	}
}
//判断字符串类型
isString = function(obj) {
	try {
		return obj.constructor.name == 'String'
	} catch (e) {
		//TODO handle the exception
		return false
	}
}
//判断数字类型
isNumber = function(obj) {
	try {
		return obj.constructor.name == 'Number'
	} catch (e) {
		//TODO handle the exception
		return false
	}
}
//判断数组类型
isArray = function(obj) {
	try {
		return obj.constructor.name == 'Array'
	} catch (e) {
		//TODO handle the exception
		return false
	}

}
//获取类型
getConstructName = function(obj) {
	try {
		return obj.constructor.name
	} catch (e) {
		return undefined
	}
}
//判断是否是NAN;利用了NaN自身永不相等于自身这一特征
checkNaN = function(obj) {
	var r = Number(obj);
	return r != r;
}

//判断是否可以转成数字
isRealNumber = function(obj) {
	if (!isEmpty(obj)) {
		if (isString(obj)) {
			//移除空格
			obj = obj.replace(/\s+/g, '');
			if (!isNaN(obj)) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
}
//转数字
tobeRealNumber=function(obj) {
	if(isRealNumber(obj)) {
		obj = obj.replace(/\s+/g, '');
		return new Number(obj);
	}else {
		return null;
	}
}
/**
 * 对象深拷贝,这个是完全完整式参考(just copy⊙﹏⊙)借鉴其他地方的,原创是哪个?不知道
 */
deepClone = function(data) {
	var type = getObjType(data);
	var obj;
	if (type === 'array') {
		obj = [];
	} else if (type === 'object') {
		obj = {};
	} else {
		//不再具有下一层次
		return data;
	}
	if (type === 'array') {
		for (var i = 0, len = data.length; i < len; i++) {
			obj.push(deepClone(data[i]));
		}
	} else if (type === 'object') {
		for (var key in data) {
			obj[key] = deepClone(data[key]);
		}
	}
	return obj;
}
//自带进制转换,origin待转换的值  oldStep原来的进制  targetStep目标进制
//(⊙﹏⊙),由于letter的个数原因,目标进制请保持在2~36闭区间
changeBinary = function(origin, oldStep, targetStep) {
	var ostep = parseInt(oldStep);
	var tstep = parseInt(targetStep);
	//先转10进制
	var dec = 0;
	if (ostep > 10) {
		for (var i = 0, len = origin.length; i < len; i++) {
			if (isRealNumber(origin[i])) {
				dec += parseInt(origin[i]) * Math.pow(ostep, len - i - 1);
			} else {
				dec += (origin[i].charCodeAt(0) - 54) * Math.pow(ostep, len - i - 1);
			}
		}
	} else {
		for (var i = 0, len = origin.length; i < len; i++) {
			dec += parseInt(origin[i]) * Math.pow(ostep, len - i - 1);
		}
	}
	//自带的Number.toString转换
	return dec.toString(tstep).toUpperCase();
}

