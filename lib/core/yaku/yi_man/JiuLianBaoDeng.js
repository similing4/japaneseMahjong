"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _Pai = require("../../../bean/Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：九莲宝灯
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：役满
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：13
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：门前清状态下，和牌牌型中包含1112345678999的一色牌
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：无
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var jiuLianBaoDengPaiList = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9];

var JiuLianBaoDeng = function (_Yi) {
	_inherits(JiuLianBaoDeng, _Yi);

	function JiuLianBaoDeng() {
		_classCallCheck(this, JiuLianBaoDeng);

		return _possibleConstructorReturn(this, (JiuLianBaoDeng.__proto__ || Object.getPrototypeOf(JiuLianBaoDeng)).call(this, "JiuLianBaoDeng", "九莲宝灯", -1, []));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(JiuLianBaoDeng, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (JiuLianBaoDeng.hasJiuLianBaoDeng(hePaiPaixing)) return [new JiuLianBaoDeng()];
			return [];
		}
		/*
  	判断牌是否有九莲宝灯格式
  	参数：
  	hePaiPaixing：HePaiPaixing类型，和牌牌型
  	返回值：
  	有返回九莲宝灯牌型外的牌，可用于判断是否是纯正九莲宝灯，否则返回false。
  */

	}, {
		key: "hasJiuLianBaoDeng",
		value: function hasJiuLianBaoDeng(hePaiPaixing) {
			if (!hePaiPaixing.isMianZiShou()) return false; //只有面子手有九莲宝灯
			if (hePaiPaixing.fulu.length > 0) return false; //不能开杠！不能有任何副露！
			var paiType = hePaiPaixing.paiList[0].getType();
			if (paiType == "Feng" || paiType == "Sanyuan") return false; //排除字一色情况
			if (hePaiPaixing.paiList.filter(function (pai) {
				return pai.getType() == paiType;
			}).length != hePaiPaixing.paiList.length) return false; //排除非清一色的情况
			var allPaiAscii = []; //获取全部的牌的数字
			hePaiPaixing.paiList.map(function (pai) {
				allPaiAscii.push(pai.getPaiAscii());
			});
			for (var i in jiuLianBaoDengPaiList) {
				var index = allPaiAscii.indexOf(jiuLianBaoDengPaiList[i]);
				if (index == -1) return false; //不符合九莲宝灯要求
				allPaiAscii.splice(index, 1);
			}
			return new _Pai2.default(paiType, allPaiAscii[0]);
		}
	}]);

	return JiuLianBaoDeng;
}(_Yi3.default);

exports.default = JiuLianBaoDeng;
;