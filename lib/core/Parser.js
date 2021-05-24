"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	牌型解析类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	用于和牌向听数及和牌拆解的解析
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	var parser = new Parser(new Paixing(...));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	对象方法详见注释
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Pai = require("../bean/Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

var _Paixing = require("../bean/Paixing.js");

var _Paixing2 = _interopRequireDefault(_Paixing);

var _HePaiPaixing = require("../bean/HePaiPaixing.js");

var _HePaiPaixing2 = _interopRequireDefault(_HePaiPaixing);

var _GuoShiWuShuangParser = require("./GuoShiWuShuangParser.js");

var _GuoShiWuShuangParser2 = _interopRequireDefault(_GuoShiWuShuangParser);

var _QiDuiZiParser = require("./QiDuiZiParser.js");

var _QiDuiZiParser2 = _interopRequireDefault(_QiDuiZiParser);

var _MianZiShouParser = require("./MianZiShouParser.js");

var _MianZiShouParser2 = _interopRequireDefault(_MianZiShouParser);

var _YakuCalculator = require("./YakuCalculator.js");

var _YakuCalculator2 = _interopRequireDefault(_YakuCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
	//传入的手牌
	/*
  *	构造方法
  *	参数：
  *	paixing：牌型类型，应传入待判断的牌型
  */
	function Parser(paixing) {
		_classCallCheck(this, Parser);

		if (!(paixing instanceof _Paixing2.default)) throw "paixing参数应为Paixing类型：" + paixing;
		this.paixing = paixing;
	}
	/*
  *	计算向听数及推荐切牌
  *	参数：
  *  无
  *  返回值如下：
  *  {
  		mianZiShou: { //面子手计算
 	 		xiangTingCount: 1, //向听数，和牌与听牌均为0
 	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
 	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
 	 	},
 	 	qiDuiZi: { //七对子计算
 	 		xiangTingCount: 1, //向听数，和牌与听牌均为0，鸣牌后该字段值为null
 	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
 	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
 	 	},
 	 	guoShiWuShuang: { //国士无双计算，鸣牌后该字段值为null
 	 		xiangTingCount: 1, //向听数，和牌与听牌均为0
 	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
 	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
 	 	},
 	 	best: { //最佳
 	 		xiangTingCount: 1, //向听数，和牌与听牌均为0
 	 		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
 	 		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
 	 	},
 		bestType: "MianZiShou" //最佳和牌类型
 	}
  *	错误：
  *	当输入牌不合法时会throw错误，请注意catch
  */


	_createClass(Parser, [{
		key: "calcXiangting",
		value: function calcXiangting() {
			var ret = {
				mianZiShou: null,
				qiDuiZi: null,
				guoShiWuShuang: null,
				best: null,
				bestType: "MianZiShou"
			};
			ret.mianZiShou = new _MianZiShouParser2.default(this.paixing.hand).calcXiangting();
			if (this.paixing.hand.length >= 13) {
				ret.guoShiWuShuang = new _GuoShiWuShuangParser2.default(this.paixing.hand).calcXiangting();
				ret.qiDuiZi = new _QiDuiZiParser2.default(this.paixing.hand).calcXiangting();
				var best = [{ type: "GuoShiWuShuang", obj: ret.guoShiWuShuang }, { type: "QiDuiZi", obj: ret.qiDuiZi }, { type: "MianZiShou", obj: ret.mianZiShou }].sort(function (a, b) {
					return a.obj.xiangTingCount - b.obj.xiangTingCount;
				})[0];
				ret.best = best.obj;
				ret.bestType = best.type;
			} else {
				ret.best = ret.mianZiShou;
			}
			return ret;
		}

		/*
   *	获取YakuCalculator，当牌型不能和牌时返回false
   *	参数：
   *  无
   *  返回值：
   *  当牌型不能和牌时返回false，否则返回YakuCalculator对象用于计算役种及番符点数。
   *	错误：
   *	当输入牌不合法时会throw错误，请注意catch
   */

	}, {
		key: "getYakuCalculator",
		value: function getYakuCalculator(state) {
			var _this = this;

			var mianZiShouParser = new _MianZiShouParser2.default(this.paixing.hand);
			var qiDuiZiParser = new _QiDuiZiParser2.default(this.paixing.hand);
			var guoShiWuShuangParser = new _GuoShiWuShuangParser2.default(this.paixing.hand);
			var mianZiShou = mianZiShouParser.calcMianzi();
			var hePaiPaixingList = [];
			if (mianZiShou) {
				mianZiShou.map(function (item) {
					if (item.header.pai_real_ascii == _this.paixing.hand[_this.paixing.hand.length - 1].pai_real_ascii) {
						//和了牌是雀头的情况
						hePaiPaixingList.push(new _HePaiPaixing2.default({
							type: "MianZiShou",
							helepai: _this.paixing.hand[_this.paixing.hand.length - 1],
							paiList: _this.paixing.hand,
							header: item.header,
							hand: item.mianzi,
							fulu: _this.paixing.fulu,
							hepaiMianziIndex: -1
						}));
					}
					item.mianzi.map(function (mianzi, mianziIndex) {
						if (mianzi.getPaiList().map(function (pai) {
							return pai.pai_real_ascii;
						}).includes(_this.paixing.hand[_this.paixing.hand.length - 1].pai_real_ascii))
							//和了牌是面子的情况
							hePaiPaixingList.push(new _HePaiPaixing2.default({
								type: "MianZiShou",
								helepai: _this.paixing.hand[_this.paixing.hand.length - 1],
								paiList: _this.paixing.hand,
								header: item.header,
								hand: item.mianzi,
								fulu: _this.paixing.fulu,
								hepaiMianziIndex: mianziIndex
							}));
					});
				});
			}
			if (this.paixing.fulu.length > 0) {
				if (hePaiPaixingList.length == 0) return false;
				return new _YakuCalculator2.default(hePaiPaixingList, state);
			}
			if (qiDuiZiParser.isHepai()) hePaiPaixingList.push(new _HePaiPaixing2.default({
				type: "QiDuiZi",
				helepai: this.paixing.hand[this.paixing.hand.length - 1],
				paiList: this.paixing.hand,
				duiziList: qiDuiZiParser.getDuiZiList()
			}));
			if (guoShiWuShuangParser.isHepai()) hePaiPaixingList.push(new _HePaiPaixing2.default({
				type: "GuoShiWuShuang",
				helepai: this.paixing.hand[this.paixing.hand.length - 1],
				paiList: this.paixing.hand
			}));
			if (hePaiPaixingList.length == 0) return false;
			return new _YakuCalculator2.default(hePaiPaixingList, state);
		}
	}]);

	return Parser;
}();

exports.default = Parser;