"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _Pai = require("../../../bean/Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

var _JiuLianBaoDeng = require("../yi_man/JiuLianBaoDeng.js");

var _JiuLianBaoDeng2 = _interopRequireDefault(_JiuLianBaoDeng);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：纯正九莲宝灯
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：两倍役满
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：九莲宝灯和牌条件下，除去和了牌的牌型为1112345678999。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：九莲宝灯
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ChunZhengJiuLianBaoDeng = function (_Yi) {
	_inherits(ChunZhengJiuLianBaoDeng, _Yi);

	function ChunZhengJiuLianBaoDeng() {
		_classCallCheck(this, ChunZhengJiuLianBaoDeng);

		return _possibleConstructorReturn(this, (ChunZhengJiuLianBaoDeng.__proto__ || Object.getPrototypeOf(ChunZhengJiuLianBaoDeng)).call(this, "ChunZhengJiuLianBaoDeng", "纯正九莲宝灯", -2, [_JiuLianBaoDeng2.default //纯正九莲宝灯不计九莲宝灯
		]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(ChunZhengJiuLianBaoDeng, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			var testHelePai = _JiuLianBaoDeng2.default.hasJiuLianBaoDeng(hePaiPaixing);
			if (!testHelePai) return [];
			if (testHelePai.pai_real_ascii == hePaiPaixing.helepai.pai_real_ascii) return [new ChunZhengJiuLianBaoDeng()];
			return [];
		}
	}]);

	return ChunZhengJiuLianBaoDeng;
}(_Yi3.default);

exports.default = ChunZhengJiuLianBaoDeng;
;