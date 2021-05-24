"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _XiaoSiXi = require("../yi_man/XiaoSiXi.js");

var _XiaoSiXi2 = _interopRequireDefault(_XiaoSiXi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：大四喜
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：两倍役满
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：和牌牌型中有东、南、西、北四种牌的刻子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：小四喜
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var DaSiXi = function (_Yi) {
	_inherits(DaSiXi, _Yi);

	function DaSiXi() {
		_classCallCheck(this, DaSiXi);

		return _possibleConstructorReturn(this, (DaSiXi.__proto__ || Object.getPrototypeOf(DaSiXi)).call(this, "DaSiXi", "大四喜", -2, [_XiaoSiXi2.default]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(DaSiXi, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMianZiShou()) return []; //面子手和牌牌型才有可能大四喜
			if (hePaiPaixing.getAllMianzi().filter(function (mianzi) {
				return mianzi.basePai.isFengPai() && mianzi.isKezi();
			}).length == 4) //风牌刻子有四个
				return [new DaSiXi()];
			return [];
		}
	}]);

	return DaSiXi;
}(_Yi3.default);

exports.default = DaSiXi;
;