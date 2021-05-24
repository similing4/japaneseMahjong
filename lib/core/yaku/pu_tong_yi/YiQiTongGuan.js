"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：一气通贯
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：普通役
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：2（鸣牌1）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：和牌牌型中存在一色的数字为123、456、789的三个顺子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var YiQiTongGuan = function (_Yi) {
	_inherits(YiQiTongGuan, _Yi);

	function YiQiTongGuan(hePaiPaixing) {
		_classCallCheck(this, YiQiTongGuan);

		return _possibleConstructorReturn(this, (YiQiTongGuan.__proto__ || Object.getPrototypeOf(YiQiTongGuan)).call(this, "YiQiTongGuan", "一气通贯", hePaiPaixing.isMenQianQing() ? 2 : 1, []));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(YiQiTongGuan, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMianZiShou()) return []; //面子手和牌牌型才有可能有一气通贯
			var mianziList = hePaiPaixing.getAllMianzi();
			var mianziBasePai = {}; //对花色进行数字计数
			for (var i in mianziList) {
				if (!mianziList[i].isShunzi()) //只要顺子
					continue;
				var num = mianziList[i].basePai.getPaiAscii();
				if (![1, 4, 7].includes(num)) continue;
				if (!mianziBasePai[mianziList[i].basePai.getType()]) mianziBasePai[mianziList[i].basePai.getType()] = [];
				if (!mianziBasePai[mianziList[i].basePai.getType()].includes(num)) mianziBasePai[mianziList[i].basePai.getType()].push(num); //没有就往里放
			}
			var val = Object.values(mianziBasePai); //取计数数值
			for (var i in val) {
				if (val[i].length == 3) return [new YiQiTongGuan(hePaiPaixing)];
			}return [];
		}
	}]);

	return YiQiTongGuan;
}(_Yi3.default);

exports.default = YiQiTongGuan;
;