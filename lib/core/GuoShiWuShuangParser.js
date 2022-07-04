"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	国士无双牌型解析类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	用于国士无双和牌向听数及和牌拆解的解析
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	var parser = new GuoShiWuShuangParser([
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Wanzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Wanzi",9),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Tongzi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Tongzi",9),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Suozi",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Suozi",9),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",1),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Feng",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		new Pai("Sanyuan",1),
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
var guoshiNums = [0, 8, 9, 17, 18, 26, 27, 28, 29, 30, 31, 32, 33];

var GuoShiWuShuangParser = function () {
	//传入的手牌
	/*
  *	构造方法
  *	参数：
  *	paiList：手牌数组，应传入Pai对象的数组
  */
	function GuoShiWuShuangParser(paiList) {
		_classCallCheck(this, GuoShiWuShuangParser);

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


	_createClass(GuoShiWuShuangParser, [{
		key: "calcXiangting",
		value: function calcXiangting() {
			if (this.paiList.length < 13) throw "国士无双在鸣牌后不能计算向听数与牌效";
			var paiAsciiList = this.paiList.map(function (pai) {
				return pai.pai_real_ascii;
			});
			var check = guoshiNums.map(function (t) {
				return {
					pai: _Pai2.default.fromRealAscii(t),
					has: paiAsciiList.includes(t)
				};
			});
			var ret = {};
			ret.xiangTingCount = check.filter(function (t) {
				return !t.has;
			}).length - 1;
			if (ret.xiangTingCount < 0) ret.xiangTingCount = 0;
			if (this.paiList.length == 13) {
				ret.paiState = PaiState.Deal;
				ret.divideResult = check.filter(function (t) {
					return !t.has;
				}).map(function (t) {
					return t.pai;
				});
				if (ret.divideResult.length == 0) ret.divideResult = check.map(function (t) {
					return t.pai;
				});
			} else {
				var wuxiaopai = paiAsciiList.filter(function (t) {
					return !guoshiNums.includes(t);
				});
				var multi = guoshiNums.filter(function (t) {
					return paiAsciiList.filter(function (s) {
						return s == t;
					}).length > 1;
				});
				if (multi.length > 1) wuxiaopai = wuxiaopai.concat(multi);
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
			var xiangting = this.calcXiangting();
			return xiangting.xiangTingCount <= 0 && xiangting.divideResult.length == 0;
		}
	}]);

	return GuoShiWuShuangParser;
}();

exports.default = GuoShiWuShuangParser;