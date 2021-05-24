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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：三色同顺
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：普通役
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：和牌中有三个花色而数值相同的顺子。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SanSeTongShun = function (_Yi) {
	_inherits(SanSeTongShun, _Yi);

	function SanSeTongShun() {
		_classCallCheck(this, SanSeTongShun);

		return _possibleConstructorReturn(this, (SanSeTongShun.__proto__ || Object.getPrototypeOf(SanSeTongShun)).call(this, "SanSeTongShun", "三色同顺", 2, []));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(SanSeTongShun, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMianZiShou()) return []; //面子手和牌牌型才有可能三色同顺
			var all = hePaiPaixing.getAllMianzi();
			var shunziBasePai = {}; //对所有顺子数值进行花色计数
			for (var i in all) {
				if (all[i].isKezi() || all[i].basePai.isZiPai()) continue;
				if (!shunziBasePai[all[i].basePai.getPaiAscii()]) shunziBasePai[all[i].basePai.getPaiAscii()] = [];
				if (!shunziBasePai[all[i].basePai.getPaiAscii()].includes(all[i].basePai.getType())) //没有计入花色就计入
					shunziBasePai[all[i].basePai.getPaiAscii()].push(all[i].basePai.getType());
			}
			var val = Object.values(shunziBasePai);
			for (var i in val) {
				if (val[i].length == 3) return [new SanSeTongShun()];
			}return [];
		}
	}]);

	return SanSeTongShun;
}(_Yi3.default);

exports.default = SanSeTongShun;
;