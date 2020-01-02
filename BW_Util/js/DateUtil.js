/*
author:landbluewater  lbw
date:2020-01-02
attention:
创建一个 JavaScript Date 实例，该实例呈现时间中的某个时刻。Date 对象则基于 Unix Time Stamp，即自1970年1月1日（UTC）起经过的毫秒数。
这个util的时间都没有指定哪个时区,所以默认就是运行这个脚本的计算机中设置的时区
(像new Date('2020')返回的是Wed Jan 01 2020 08:00:00 GMT+0800 (中国标准时间),注意到这个没有指定具体时间的返回值,默认是东八区的时间),
如果需要修改,可以使用时区格式Z(+/-)hh:mm指定
例如:new Date(2020 Z+8:00),返回的就是Wed Jan 01 2020 00:00:00 GMT+0800 (中国标准时间)
详情请参考:http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
*/
//时间打印出来默认格式是:Wed Jan 01 2020 08:00:00 GMT+0800 (中国标准时间)
/*
因为,Date对象覆盖了 Object 对象的 toString() 方法；它不是继承自 Object.prototype.toString()。对于  Date 对象，toString() 方法返回一个表示该对象的字符串。
该 toString 方法总是返回一个美式英语日期格式的字符串。
新建时间对象基础语法:
new Date(); 如果没有输入任何参数，则Date的构造器会依据系统设置的当前时间来创建一个Date对象。
new Date(value); 一个 Unix 时间戳（Unix Time Stamp）
new Date(dateString); 表示日期的字符串值yyyy-MM-dd hh:mm:ss:SSS
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
*/
//判断是否是闰年1,信任型判断
isLeapYear_f = function(date) {
	if (!isEmpty(date)) {
		if (date instanceof Date) {
			return isLeapYear_f_sub(date)
		} else {
			date = str2Date(date);
			return isLeapYear_f_sub(date);
		}
	}else if(date instanceof Date) {
		return isLeapYear_f_sub(date)
	} else {
		return false;
	}
}
isLeapYear_f_sub = function(realDate) {
	var february = new Date(realDate.getFullYear(), 1);
	february.setDate(29);
	if (february.getDate() == 29) {
		return true;
	} else {
		return false;
	}
}
//判断是否是闰年,老实型判断
isLeapYear_s = function(date) {
	if (!isEmpty(date)) {
		if (isString(date)) {
			date = str2Date(date);
		}
		var year = date.getFullYear();
		//400的倍数--世纪闰年,4的倍数且不是100的倍数--普通闰年
		return year % 400 == 0 || year % 4 == 0 && year % 100 != 0;
	} else if(date instanceof Date) {
		var year = date.getFullYear();
		//400的倍数--世纪闰年,4的倍数且不是100的倍数--普通闰年
		return year % 400 == 0 || year % 4 == 0 && year % 100 != 0;
	}else {
		return false;
	}
}

//字符串转日期,格式yyyy-MM-dd HH:mm:ss,(年是必须的?其实有个数字,new Date()都可以干活了,具体请全局搜索:新建时间对象基础语法)如果转换不成功,返回当前日期时间
str2Date = function(str) {
	if (!isEmpty(str)) {
		try {
			//由于浏览器差异和不一致，强烈建议不要使用Date.parse解析字符串。详情查看 IETF-compliant RFC 2822 timestamps 或 version of ISO8601
			return new Date(str);
		} catch (e) {
			return new Date();
		}
	} else {
		return new Date();
	}
}
//严格型字符串转日期,如果转换不成功返回null
str2DateStrict = function(str) {
	if (!isEmpty(str)) {
		try {
			//由于浏览器差异和不一致，强烈建议不要使用Date.parse解析字符串。详情查看 IETF-compliant RFC 2822 timestamps 或 version of ISO8601
			return new Date(str);
		} catch (e) {
			return null;
		}
	} else {
		return null;
	}
}

//获取计时用时间戳
//返回值表示为从time origin之后到当前调用时经过的时间,刷新页面会重置,这个东西可以用来监视用户停留时间,(●'◡'●)
/*
这个时间戳实际上并不是高精度的。为了降低像Spectre这样的安全威胁，各类浏览器对该类型的值做了不同程度上的四舍五入处理。（Firefox从Firefox 59开始四舍五入到2毫秒精度）一些浏览器还可能对这个值作稍微的随机化处理。这个值的精度在未来的版本中可能会再次改善；浏览器开发者还在调查这些时间测定攻击和如何更好的缓解这些攻击。
在支持 Web Performance API 的高精细度（high-resolution）时间功能的浏览器中，Performance.now() 提供的所经过的时间比 Date.now() 更加可靠、精确。
*/
getTimeRap = function() {
	return window.performance.now();
}

//返回当前时间戳
getNow = function() {
	return new Date().getTime();
}
/*
日期格式化,format:yyyy-MM-dd w hh:mm:ss:SSS,其中横杠和冒号可以改为其他符号
这里我自己定义了标记符:
yyyy --年
MM --月
dd --日
w --星期
hh --时
mm --分
ss --秒
SSS --毫秒

*/
//星期天getDay是0,这里我设置返回7,如果需要仍然使用0代表星期天,可以使用求余%
//更多时间格式化请关注:https://tools.ietf.org/html/rfc5646
date2Str = function(date, format) {
	if (date instanceof Date) {
		var year = date.getFullYear();
		var month = parseInt(date.getMonth()) + 1;
		var day = date.getDate();
		//根据本地时间返回指定日期对象的星期中的第几天（0-6）。
		var weekday = date.getDay() == 0 ? 7 : date.getDay();
		//根据本地时间返回指定日期对象的小时（0-23）。
		var hour = date.getHours();
		//根据本地时间返回指定日期对象的分钟（0-59）。
		var minute = date.getMinutes();
		//根据本地时间返回指定日期对象的秒数（0-59）。
		var second = date.getSeconds();
		//根据本地时间返回指定日期对象的毫秒（0-999）。
		var milliseconds = date.getMilliseconds();
		//len:我定义的的标准化时间的长度,val:当前字段的值
		/*
		维基百科，自由的百科全书
		一年可以分为四个季度，每个季度历时3个月。
		第一季度：1月-3月
		第二季度：4月-6月
		第三季度：7月-9月
		第四季度：10月-12月
		部分国家或地区的“季度”分类有异于上列所述，例如加拿大、印度、香港及日本，一年的季度是4月1日开始、3月31日结束。
		
		百度百科
		人们俗称的“季度”，就是把一年平均分成四份，按照春、夏、秋、冬的顺序
		一年可以分为四个季度，每个季度历时3个月。 [1] 
		第一季度：1月－3月
		第二季度：4月－6月
		第三季度：7月－9月
		第四季度：10月－12月
		而实际上严格的划分应该为：（按照中国的纬度）
		第一季度：3－5月（春季）
		第二季度：6－8月（夏季）
		第三季度：9－11月（秋季）
		第四季度：12－2月（冬季）
		
		如果需要算季度,可以自己加,例如下面,按照第一季度为1月1日开始,每季度历史3个月算:
		var quarter = Math.floor(date.getMonth()/3)+1;
		rex中添加:
		'q+':{len: 1,val: fillByParam(quarter, 0, 1)}
		*/
		var rex = {
			'y+': {
				len: 4,
				val: fillByParam(year, 0, 4)
			},
			'M+': {
				len: 2,
				val: fillByParam(month, 0, 2)
			},
			'd+': {
				len: 2,
				val: fillByParam(day, 0, 2)
			},
			'h+': {
				len: 2,
				val: fillByParam(hour, 0, 2)
			},
			'm+': {
				len: 2,
				val: fillByParam(minute, 0, 2)
			},
			's+': {
				len: 2,
				val: fillByParam(second, 0, 2)
			},
			'S+': {
				len: 3,
				val: fillByParam(milliseconds, 0, 3)
			},
			'w+': {
				len: 1,
				val: fillByParam(weekday, 0, 1)
			},
		}
		var myBaseline = 1000;
		var flag = 0;
		for (var key in rex) {
			var reg = new RegExp('(' + key + ')');
			while (reg.test(format) && flag < myBaseline) {
				format = format.replace(RegExp.$1, rex[key].val.substring(rex[key].len - RegExp.$1.length));
				flag++;
			}
		}
		return format;
	} else {
		return null;
	}
}
fillByParam = function(source, fillParam, lenth) {
	var myBaseline = 1000;
	var flag = 0;
	source += "";
	if (lenth > 0) {
		while (source.length < lenth && flag < myBaseline) {
			source = fillParam + source;
			flag++;
		}
	} else {
		lenth = Math.abs(lenth);
		while (source.length < lenth && flag < myBaseline) {
			source += fillParam;
			flag++;
		}
	}
	return source;
}
//时间差计算
/*
resultFormat:  dd  hh:mm:ss:SSS
dd --日
hh --时
mm --分
ss --秒
SSS --毫秒
由于月和年的进制不定,不好计算
所以返回日时分秒毫秒,不会返回月年
*/
gapOfDate = function(date1, date2, resultFormat) {
	if (date1 instanceof Date && date2 instanceof Date) {
		var gap = date1.getTime() - date2.getTime();
		if (gap < 0) {
			resultFormat = '-' + resultFormat;
		}
		var rex = {
			'd+': {
				step: 24 * 3600 * 1000
			},
			'h+': {
				step: 3600 * 1000
			},
			'm+': {
				step: 60 * 1000
			},
			's+': {
				step: 1000
			},
			'S+': {
				step: 1
			},
		}
		for (var key in rex) {
			var rexg = new RegExp('(' + key + ')');
			if (rexg.test(resultFormat)) {
				resultFormat = resultFormat.replace(RegExp.$1, Math.floor(Math.abs(gap / rex[key].step)));
				gap = gap % rex[key].step;
			}
		}
		return resultFormat;
	} else {
		return null;
	}
}
/*
偏移时间
返回偏移后的时间
参数:
date --当地当前时间
value --值
type --值类型 yyyy-MM-dd hh:mm:ss:SSS
值与值类型需要对应,也就是可以对号入座
例如需要求800天后的时间
value:800
dateFormat:ddd

求100天10小时8分钟后的时间
value:100 10:8
dateFormat:ddd hh:m
如果格式是value:100 10:08 则dateFormat:ddd hh:mm
*/
calcDate = function(dat, value, dateFormat) {
	var date = new Date(dat);
	var rex = {
		'y+': {
			calc: function(val) {
				date.setFullYear(date.getFullYear() + val);
			}
		},
		'M+': {
			calc: function(val) {
				date.setMonth(date.getMonth() + val);
			}
		},
		'd+': {
			calc: function(val) {
				date.setDate(date.getDate() + val);
			}
		},
		'h+': {
			calc: function(val) {
				date.setHours(date.getHours() + val);
			}
		},
		'm+': {
			calc: function(val) {
				date.setMinutes(date.getMinutes() + val);
			}
		},
		's+': {
			calc: function(val) {
				date.setSeconds(date.getSeconds() + val);
			}
		},
		'S+': {
			calc: function(val) {
				date.setMilliSeconds(date.getMilliseconds() + val);
			}
		}
	}
	var operator = '+';
	if(value[0]=='-') {
		operator = '-';
		value = value.replace('-','');		
	}
	for (var key in rex) {
		var rexg = new RegExp('(' + key + ')');
		var firstIndex = dateFormat.search(rexg);
		if (firstIndex != -1) {
			var firstLen = dateFormat.match(rexg)[0].length;
			var val = value.substring(firstIndex, firstIndex + firstLen);
			rex[key].calc(parseInt(operator+val));
		}
	}
	return date;
}
/*
偏移时间
date  --本地时间
val  --值
type  --类型
*/
calcDateByType=function(dat,val,type) {
	var date = new Date(dat);
	var value=parseInt(val);
	var dateCalc={
		YEAR:function(val) {date.setFullYear(date.getFullYear()+value)},
		MONTH:function(val) {date.setMonth(date.getMonth()+value)},
		DAY:function(val) {date.setDate(date.getDate()+value)},
		HOUR:function(val) {date.setHours(date.getHours()+value)},
		MINUTE:function(val) {date.setMinutes(date.getMinutes()+value)},
		SECONDS:function(val) {date.setSeconds(date.getSeconds()+value)},
		MILLISECOND:function(val) {date.setMilliSeconds(date.getMilliseconds()+value)}
	}
	dateCalc[type](value);
	return date;
}
/*
获取其他时区时间,我这里的原理是获取本地时间来做偏移计算
东区使用正数
西区使用负数
*/
getOtherTimeZoneTime = function(zone) {
	zone = Math.abs(zone)>12?12*(zone/Math.abs(zone)):Math.abs(zone);
	var date = new Date();
	var gapm = date.getTimezoneOffset(); //返回与全球时区,也就是与格林威治时间相差的分钟数
	var gmt = calcDateByType(date,gapm,'MINUTE');//格林威治时间
	return calcDateByType(gmt,zone*60,'MINUTE');
}
