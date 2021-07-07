"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	面子类（包含顺子、刻子、杠子等）
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	用于牌的记录与获取牌面子的各种基本属性的类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	var mianzi = new Mianzi("Shunzi",false,new Pai("Tongzi",7));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	对象方法详见注释
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Pai = require("./Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MianziTypeHash = {
	Shunzi: "Shunzi",
	Kezi: "Kezi",
	Gangzi: "Gangzi"
};

var Mianzi = function () {
	//Number类型，意为面子中包含的赤宝牌数。
	/*
 	构造方法
 	参数：
 	type：面子的种类，"Shunzi"为顺子，"Kezi"为刻子，"Gangzi"为杠子
 	isFulu：该面子是否破坏门前清。暗杠此处应传false，除暗杠外其余进入副露区的面子此处应传true。
 	pai：牌对象，当面子为刻子或杠子的时候，该牌表示刻子或杠子对应的牌，当面子为顺子的时候，该牌表示顺子的第一张牌。
 	redDoraCount： //Number类型，意为面子中包含的赤宝牌数。
 	错误：
 	当type或pai传入错误值时会throw对应的错误提示字符串。
 */
	// Boolean类型，意为该面子是否破坏门前清。
	function Mianzi(type, isFulu, pai) {
		var redDoraCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

		_classCallCheck(this, Mianzi);

		if (!(pai instanceof _Pai2.default)) throw "第三个参数应为Pai类型的参数：" + pai;
		if (!Object.values(MianziTypeHash).includes(type)) throw "面子种类传入不正确，应传入" + JSON.stringify(Object.values(MianziTypeHash)) + "之一";
		this.type = type;
		this.isFulu = !!isFulu;
		if (type == MianziTypeHash.Shunzi) {
			if (pai.isZiPai()) throw "顺子不能传入字牌，您传入的牌为" + pai.getNatureName();
			if (pai.getPaiAscii() > 7) throw "顺子不能传入大于7的数牌，您传入的牌为：" + pai.getNatureName();
		}
		this.basePai = pai;
		var fiveLen = this.getPaiList().filter(function (p) {
			return p.getPaiAscii() == 5;
		}).length;
		if (fiveLen < redDoraCount) throw "赤宝牌数不能超过面子中数字为5的牌数。您传入的5牌数为：" + fiveLen + "，需要的宝牌数为" + redDoraCount + ",对应面子的关键牌为：" + pai.getNatureName();
		this.redDoraCount = redDoraCount ? redDoraCount : 0;
	}
	/*
 	判断该面子是否是刻子
 	参数：
 	无
 	返回值：
 	是刻子时返回true，否则返回false
 */
	// String类型，为MianziTypeHash值的其中之一，标识该面子是的类型。
	// 基础牌，当面子为刻子或杠子的时候，该牌表示刻子或杠子对应的牌。当面子为顺子的时候，该牌表示顺子的第一张牌。


	_createClass(Mianzi, [{
		key: "isKezi",
		value: function isKezi() {
			return this.type == MianziTypeHash.Kezi || this.type == MianziTypeHash.Gangzi;
		}
		/*
  	判断该面子是否是杠子
  	参数：
  	无
  	返回值：
  	是杠子时返回true，否则返回false
  */

	}, {
		key: "isGangzi",
		value: function isGangzi() {
			return this.type == MianziTypeHash.Gangzi;
		}
		/*
  	判断该面子是否是顺子
  	参数：
  	无
  	返回值：
  	是顺子时返回true，否则返回false
  */

	}, {
		key: "isShunzi",
		value: function isShunzi() {
			return this.type == MianziTypeHash.Shunzi;
		}
		/*
  	获取对应的所有牌
  	参数：
  	无
  	返回值：
  	Pai对象的数组
  */

	}, {
		key: "getPaiList",
		value: function getPaiList() {
			var list = [];
			switch (this.type) {
				case MianziTypeHash.Shunzi:
					list = [_Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii + 1), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii + 2)];
					break;
				case MianziTypeHash.Kezi:
					list = [_Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii)];
					break;
				case MianziTypeHash.Gangzi:
					list = [_Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii), _Pai2.default.fromRealAscii(this.basePai.pai_real_ascii)];
					break;
			}
			var redDoraCount = this.redDoraCount;
			for (var j = 0; j < list.length; j++) {
				if (list[j].getPaiAscii() == 5) {
					list[j].isRed = true;
					redDoraCount--;
					if (redDoraCount == 0) break;
				}
			}return list;
		}
	}]);

	return Mianzi;
}();

exports.default = Mianzi;