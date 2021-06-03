"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _GuoShiWuShuang = require("../yi_man/GuoShiWuShuang.js");

var _GuoShiWuShuang2 = _interopRequireDefault(_GuoShiWuShuang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：国士无双十三面
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：两倍役满
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：26
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：国士无双牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：国士无双牌型和牌，且和了牌是对子
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：国士无双
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var GuoShiWuShuangShiSanMian = function (_Yi) {
	_inherits(GuoShiWuShuangShiSanMian, _Yi);

	function GuoShiWuShuangShiSanMian() {
		_classCallCheck(this, GuoShiWuShuangShiSanMian);

		return _possibleConstructorReturn(this, (GuoShiWuShuangShiSanMian.__proto__ || Object.getPrototypeOf(GuoShiWuShuangShiSanMian)).call(this, "GuoShiWuShuangShiSanMian", "国士无双十三面", -2, [_GuoShiWuShuang2.default]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(GuoShiWuShuangShiSanMian, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (hePaiPaixing.isGuoShiWuShuang()) {
				if (state.isTianHe) return [new GuoShiWuShuangShiSanMian()];
				if (hePaiPaixing.paiList.filter(function (pai) {
					return pai.pai_real_ascii == hePaiPaixing.helepai.pai_real_ascii;
				}).length == 2) return [new GuoShiWuShuangShiSanMian()];
				return [];
			}
			return [];
		}
	}]);

	return GuoShiWuShuangShiSanMian;
}(_Yi3.default);

exports.default = GuoShiWuShuangShiSanMian;
;