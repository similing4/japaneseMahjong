"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Yi2 = require("../../../bean/Yi.js");

var _Yi3 = _interopRequireDefault(_Yi2);

var _HunQuanDaiYaoJiu = require("./HunQuanDaiYaoJiu.js");

var _HunQuanDaiYaoJiu2 = _interopRequireDefault(_HunQuanDaiYaoJiu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种类：纯全带幺九
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *	役种类型：普通役
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种番数：3（鸣牌2）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  和牌牌型：面子手牌型
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  役种条件：和牌牌型的雀头和所有面子中都包含老头牌
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *  冲突役种：混全带幺九
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ChunQuanDaiYaoJiu = function (_Yi) {
	_inherits(ChunQuanDaiYaoJiu, _Yi);

	function ChunQuanDaiYaoJiu(hePaiPaixing) {
		_classCallCheck(this, ChunQuanDaiYaoJiu);

		return _possibleConstructorReturn(this, (ChunQuanDaiYaoJiu.__proto__ || Object.getPrototypeOf(ChunQuanDaiYaoJiu)).call(this, "ChunQuanDaiYaoJiu", "纯全带幺九", hePaiPaixing.isMenQianQing() ? 3 : 2, [_HunQuanDaiYaoJiu2.default]));
	}
	/*
 	判断和牌牌型是否有当前役
 	参数：
 	hePaiPaixing：HePaiPaixing类型，和牌牌型
 	state：State类型，状态对象
 	返回值：
 	有当前役返回该牌型具有的役的对象数组，否则返回空数组
 */


	_createClass(ChunQuanDaiYaoJiu, null, [{
		key: "getCurrentYi",
		value: function getCurrentYi(hePaiPaixing, state) {
			if (!hePaiPaixing.isMianZiShou()) return []; //只有面子手有纯全带幺九
			if (!hePaiPaixing.header.isLaotouPai()) return []; //雀头必须是老头牌
			var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
			for (var i in mianziList) {
				if (mianziList[i].getPaiList().filter(function (pai) {
					return pai.isLaotouPai();
				}).length == 0) return [];
			}return [new ChunQuanDaiYaoJiu(hePaiPaixing)];
		}
	}]);

	return ChunQuanDaiYaoJiu;
}(_Yi3.default);

exports.default = ChunQuanDaiYaoJiu;
;