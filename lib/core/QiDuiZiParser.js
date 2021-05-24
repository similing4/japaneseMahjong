"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	七对子牌型解析类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	用于七对子和牌向听数及和牌拆解的解析
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	var parser = new QiDuiZiParser([
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Wanzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Wanzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Tongzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Tongzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Suozi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Suozi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Sanyuan",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Sanyuan",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Sanyuan",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Sanyuan",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      	]);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	对象方法详见注释
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _Pai = require("../bean/Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaiState = {
	Discard: "DISCARD", //待出牌状态或自摸/荣和状态
	Deal: "DEAL" //待摸牌状态
};

var QiDuiZiParser = function () {
	//传入的手牌
	/*
  *	构造方法
  *	参数：
  *	paiList：手牌数组，应传入Pai对象的数组
  */
	function QiDuiZiParser(paiList) {
		_classCallCheck(this, QiDuiZiParser);

		this.paiList = paiList;
	}
	/*
  *	计算向听数
  *	参数：
  *  无
  *  返回值如下：
  *  {
  		xiangTingCount: 1, //向听数，和牌与听牌均为0
  		paiState: "DISCARD", //PaiState类型，标识待摸牌状态还是待出牌状态
  		divideResult: [], //List<Pai>类型，待出牌状态或自摸/荣和状态时意为推荐打的牌，待摸牌状态为推荐摸的牌。
  	}
  *	错误：
  *	当输入牌不合法时会throw错误，请注意catch
  */


	_createClass(QiDuiZiParser, [{
		key: "calcXiangting",
		value: function calcXiangting() {
			if (this.paiList.length < 13) throw "七对子在鸣牌后不能计算向听数与牌效";
			var hand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.paiList.map(function (pai) {
				hand[pai.pai_real_ascii]++;
				if (hand[pai.pai_real_ascii] > 4) throw "输入的牌数不正确";
			});
			var kind = 0;
			var pair = 0;
			var single = []; //单张
			var multi = []; //多张
			var nohave = []; //没有的牌
			hand.map(function (count, pai_real_ascii) {
				if (count > 0) kind++;else nohave.push(_Pai2.default.fromRealAscii(pai_real_ascii));
				if (count > 1) pair++;
				if (count > 2) multi.push(_Pai2.default.fromRealAscii(pai_real_ascii));
				if (count == 1) single.push(_Pai2.default.fromRealAscii(pai_real_ascii));
			});
			var ret = {};
			var youxiaopai = [];
			var wuxiaopai = [];
			ret.xiangTingCount = Math.max(7 - pair + Math.max(7 - kind, 0) - 1, 0);
			if (kind <= 7) {
				//不足7种牌
				wuxiaopai = multi; //多的刻子肯定是无效牌
				if (single.length == 0 && kind != 7) //没有落单的牌且没和牌
					youxiaopai = nohave;else youxiaopai = single;
			} else if (kind > 7) {
				youxiaopai = single; //有效牌肯定是单张牌
				wuxiaopai = single.concat(multi); //多的刻子和单张都是无效牌
			}
			if (this.paiList.length == 13) {
				ret.paiState = PaiState.Deal;
				ret.divideResult = youxiaopai;
			} else {
				ret.paiState = PaiState.Discard;
				ret.divideResult = wuxiaopai;
			}
			return ret;
		}
		/*
   * 判断是否和牌
   * 参数：
   * 无
   * 返回值：
   * 和牌了返回true，否则返回false
   */

	}, {
		key: "isHepai",
		value: function isHepai() {
			if (this.paiList.length < 14) return false;
			var hand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.paiList.map(function (pai) {
				hand[pai.pai_real_ascii]++;
			});
			return hand.filter(function (count) {
				//数字只有2或者0就是七对子和牌
				return count != 2 && count != 0;
			}).length == 0;
		}
		/*
   * 获取七对子和牌的七个对子
   * 参数：
   * 无
   * 返回值
   * 和牌了返回List<Pai>类型的长度为7的对子牌，否则返回false
   */

	}, {
		key: "getDuiZiList",
		value: function getDuiZiList() {
			if (!this.isHepai()) return false;
			var hand = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			this.paiList.map(function (pai) {
				hand[pai.pai_real_ascii]++;
			});
			return hand.map(function (count, pai_real_ascii) {
				return [count == 2, _Pai2.default.fromRealAscii(pai_real_ascii)];
			}).filter(function (item) {
				return item[0];
			}).map(function (item) {
				return item[1];
			});
		}
	}]);

	return QiDuiZiParser;
}();

exports.default = QiDuiZiParser;