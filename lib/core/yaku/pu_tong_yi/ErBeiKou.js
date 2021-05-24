"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _YiBeiKou = require("./YiBeiKou.js");

var _YiBeiKou2 = _interopRequireDefault(_YiBeiKou);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：二盃口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：普通役
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：3
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：门前清状态下，和牌牌型中所有面子都是顺子，且四组顺子其中两组是相同的，另外两组也是相同的
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：一盃口
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ErBeiKou = function (_Yi) {
	_inherits(ErBeiKou, _Yi);

	function ErBeiKou() {
		_classCallCheck(this, ErBeiKou);

		return _possibleConstructorReturn(this, (ErBeiKou.__proto__ || Object.getPrototypeOf(ErBeiKou)).call(this, "ErBeiKou", "二盃口", 3, [_YiBeiKou2.default]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(ErBeiKou, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMenQianQing()) return []; //只有门前清有二盃口
			if (!hePaiPaixing.isMianZiShou()) return []; //只有面子手有二盃口
			var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
			var mianziBasePai = {};
			for (var i in mianziList) {
				//所有面子都是顺子，对顺子进行计数
				if (!mianziList[i].isShunzi()) return [];
				if (!mianziBasePai[mianziList[i].basePai.pai_real_ascii]) mianziBasePai[mianziList[i].basePai.pai_real_ascii] = 0;
				mianziBasePai[mianziList[i].basePai.pai_real_ascii]++;
			}
			var val = Object.values(mianziBasePai); //取计数数值，为2组顺子且每组有两个
			if (val.length != 2) return [];
			for (var i in val) {
				if (val[i] != 2) return [];
			}return [new ErBeiKou()];
		}
	}]);

	return ErBeiKou;
}(_Yi3.default);

exports.default = ErBeiKou;
;