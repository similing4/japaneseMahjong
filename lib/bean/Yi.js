"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 *	役种
 *	用于存储牌型对应的役种信息，此类为抽象类，不应实例化。
 *	对象方法详见注释
 */
var Yi = function () {
	// Boolean类型，是否是两倍役满
	/*
 	构造方法
 	参数：
 	key：役的唯一标识
 	name：役的中文名
 	fan：役的番数，传入-1为役满，传入-2为两倍役满。
 	chongTu：List<YiClass>类型，冲突的役种的类。默认为空数组，即没有任何冲突。包含在该数组中的役可以被认为被本役覆盖
 	错误：
 	当传入错误值时会throw对应的错误提示字符串。
 */
	// Number类型，役的番数，此数值是否减一番由构造方法传入参数决定。
	// String类型，役的唯一标识
	function Yi(key, name, fan) {
		var chongTu = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

		_classCallCheck(this, Yi);

		this.chongTu = [];
		this.isYiMan = false;
		this.isLiangBeiYiMan = false;

		this.key = key;
		this.name = name;
		this.chongTu = chongTu;
		if (fan == 0) throw "役的番数不能为0";else if (fan == -1) {
			this.fan = 13;
			this.isYiMan = true;
		} else if (fan == -2) {
			this.fan = 26;
			this.isLiangBeiYiMan = true;
		} else if (fan > 13) throw "役的番数不能大于13";else this.fan = fan;
	}
	/*
 	判断和牌牌型是否有当前役，本方法应由所有子类实现
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */
	// Boolean类型，是否是役满
	// String类型，役的中文名
	// List<YiClass>类型，冲突的役种。默认为空数组，即没有任何冲突。包含在该数组中的役可以被认为被本役覆盖


	_createClass(Yi, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {}
	}]);

	return Yi;
}();

exports.default = Yi;
;