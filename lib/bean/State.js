"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pai = require("./Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
	function State() {
		_classCallCheck(this, State);

		this.changFeng = 1;
		this.ziFeng = 1;
		this.dora = [];
		this.lidora = [];
		this.isLiangLiZhi = false;
		this.isLiZhi = false;
		this.isYiFa = false;
		this.isLingShang = false;
		this.isZimo = false;
		this.isLast = false;
		this.isQiangGang = false;
		this.isTianHe = false;
		this.isDiHe = false;
	} // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	// Number类型，自风，东1南2西3北4
	//Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
	//Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
	//是否两立直
	//是否立直
	//是否一发
	//是否领上
	//是否自摸 
	//是否是河底/海底
	//是否是抢杠
	//是否是天和


	_createClass(State, [{
		key: "serialize",
		//是否是地和
		/*
  	序列化对象
  	参数：无
  	返回值：序列化后的字符串
  */
		value: function serialize() {
			var json = {};
			json.changFeng = this.changFeng;
			json.ziFeng = this.ziFeng;
			json.dora = this.dora.map(function (pai) {
				return pai.pai_real_ascii;
			}).join(",");
			json.lidora = this.lidora.map(function (pai) {
				return pai.pai_real_ascii;
			}).join(",");
			json.isLiangLiZhi = this.isLiangLiZhi;
			json.isLiZhi = this.isLiZhi;
			json.isYiFa = this.isYiFa;
			json.isLingShang = this.isLingShang;
			json.isZimo = this.isZimo;
			json.isLast = this.isLast;
			json.isQiangGang = this.isQiangGang;
			json.isTianHe = this.isTianHe;
			json.isDiHe = this.isDiHe;
			return json;
		}
		/*
  	序列化对象
  	参数：序列化后的字符串
  	返回值：State对象
  */

	}], [{
		key: "deserialize",
		value: function deserialize(str) {
			var obj = JSON.parse(str);
			var state = new State();
			state.changFeng = obj.changFeng;
			state.ziFeng = obj.ziFeng;
			state.dora = JSON.parse("[" + obj.dora + "]").map(function (pai_real_ascii) {
				return _Pai2.default.fromRealAscii(pai_real_ascii);
			});
			state.lidora = JSON.parse("[" + obj.lidora + "]").map(function (pai_real_ascii) {
				return _Pai2.default.fromRealAscii(pai_real_ascii);
			});
			state.isLiangLiZhi = obj.isLiangLiZhi;
			state.isLiZhi = obj.isLiZhi;
			state.isYiFa = obj.isYiFa;
			state.isLingShang = obj.isLingShang;
			state.isZimo = obj.isZimo;
			state.isLast = obj.isLast;
			state.isQiangGang = obj.isQiangGang;
			state.isTianHe = obj.isTianHe;
			state.isDiHe = obj.isDiHe;
			return state;
		}
	}]);

	return State;
}();

exports.default = State;