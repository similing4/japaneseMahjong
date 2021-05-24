"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _SiAnKe = require("../yi_man/SiAnKe.js");

var _SiAnKe2 = _interopRequireDefault(_SiAnKe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：四暗刻单骑
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：两倍役满
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：门前清和牌，和牌中所有面子均为刻子且和了牌为雀头。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：四暗刻
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SiAnKeDanQi = function (_Yi) {
	_inherits(SiAnKeDanQi, _Yi);

	function SiAnKeDanQi() {
		_classCallCheck(this, SiAnKeDanQi);

		return _possibleConstructorReturn(this, (SiAnKeDanQi.__proto__ || Object.getPrototypeOf(SiAnKeDanQi)).call(this, "SiAnKeDanQi", "四暗刻单骑", -2, [_SiAnKe2.default]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(SiAnKeDanQi, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMianZiShou()) return []; //面子手和牌牌型才有可能四暗刻
			if (!hePaiPaixing.isMenQianQing()) return []; //四暗刻需门前清
			if (hePaiPaixing.hepaiMianziIndex == -1) //雀头和牌四暗刻单骑
				return [new SiAnKeDanQi()];
			return [];
		}
	}]);

	return SiAnKeDanQi;
}(_Yi3.default);

exports.default = SiAnKeDanQi;
;