"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	和牌牌型类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	用于整副牌的属性的计算与存储。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	面子手和牌牌型使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	var paixing = new HePaiPaixing({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		type: "MianZiShou",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		helepai: new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	paiList: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",6),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",6),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",7),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",7),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",8),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",8),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		header: new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		hand: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 		new Mianzi("Shunzi",false,new Pai("Wanzi",2)),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 		new Mianzi("Shunzi",false,new Pai("Wanzi",2))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	fulu: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 		new Mianzi("Shunzi",false,new Pai("Wanzi",6)),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 		new Mianzi("Shunzi",false,new Pai("Wanzi",6))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	hepaiMianziIndex: -1
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  七对子和牌牌型使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  var paixing = new HePaiPaixing({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		type: "QiDuiZi",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		helepai: new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	paiList: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",6),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",6),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",7),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",7),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",8),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",8),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	],
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		duiziList: [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",2),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",3),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",4),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",5),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",6),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",7),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",8),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  国士和牌牌型使用方法：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  var paixing = new HePaiPaixing({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		type: "GuoShiWuShuang",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      		helepai: new Pai("Wanzi",9),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	paiList: [
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      			new Pai("Wanzi",9),
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	 	]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     	});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *	对象方法详见注释
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Pai = require("./Pai.js");

var _Pai2 = _interopRequireDefault(_Pai);

var _Mianzi = require("./Mianzi.js");

var _Mianzi2 = _interopRequireDefault(_Mianzi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HePaiType = { //和牌种类
	MianZiShou: "MianZiShou", //面子手类型和牌
	QiDuiZi: "QiDuiZi", //七对子类型和牌
	GuoShiWuShuang: "GuoShiWuShuang" //国士无双类型和牌
};

var HePaiPaixing = function () {
	//Number类型，标识哪个面子是和牌的面子，当且仅当type为HePaiType.MianZiShou时有效。当雀头和牌时该值为-1
	/*
 	构造方法
 	参数：
 	obj：JSON对象，和牌牌型不同时传入的参数不同。
 		公共属性：
 			type：HePaiType类型，和牌牌型，详见HePaiType
 			helepai：Pai类型，和了牌
 			paiList：List<Pai>类型，和牌的手牌
 		面子手和牌时需额外传入如下参数：
 			header：Pai类型，雀头
 			hand：List<Mianzi>类型，手牌的面子
 			fulu：List<Mianzi>类型，副露区的面子
 			hepaiMianziIndex：Number类型，和了牌所在和牌的面子的下标，雀头和牌时为-1
 		七对子和牌时需额外传入如下参数：
  			duiziList：List<Pai>类型，对子的列表
  		国士和牌牌型无需传入更多参数。
 	错误：
 		当传入数据不合法时报错。
 */
	// List<Mianzi>类型，存储副露区的数据，当且仅当type为HePaiType.MianZiShou时有效
	// Pai类型，标识雀头，当且仅当type为HePaiType.MianZiShou时有效
	//HePaiType类型，详见HePaiType
	function HePaiPaixing(obj) {
		_classCallCheck(this, HePaiPaixing);

		if (!Object.values(HePaiType).includes(obj.type)) throw "牌种类传入不正确，应传入" + JSON.stringify(Object.values(PaiTypeHash)) + "之一";
		if (!(obj.helepai instanceof _Pai2.default)) throw "helepai应为Pai类型的参数：" + obj.helepai;
		if (obj.type != HePaiType.MianZiShou && obj.paiList.length != 14) throw "非面子手和牌应为14张牌";
		this.type = obj.type;
		this.helepai = obj.helepai;
		this.paiList = obj.paiList;
		if (obj.type == HePaiType.MianZiShou) {
			//面子手和牌情况
			if (!(obj.header instanceof _Pai2.default)) throw "雀头header应为Pai类型的参数：" + obj.header;
			obj.hand.map(function (handMianzi) {
				if (!(handMianzi instanceof _Mianzi2.default)) throw "手牌hand应为Mianzi类型的数组，但存在非该类型项：" + handMianzi;
			});
			obj.fulu.map(function (fuluMianzi) {
				if (!(fuluMianzi instanceof _Mianzi2.default)) throw "副露fulu应为Mianzi类型的数组，但存在非该类型项：" + fuluMianzi;
			});
			if (obj.hand.length * 3 + obj.fulu.length * 3 + 2 != 14) throw "手牌面子数*3+副露面子数*3+雀头2张应为14张，请检查传入参数是否正确";
			if (obj.paiList.length + obj.fulu.length * 3 != 14) throw "手牌数+副露面子数*3张应为14张，请检查传入参数是否正确";
			if (obj.hepaiMianziIndex != -1) {
				if (obj.hepaiMianziIndex < 0) throw "和牌的面子下标不合法：" + obj.hepaiMianziIndex;
				if (obj.hepaiMianziIndex > obj.hand.length - 1) throw "和牌的面子下标不合法：" + obj.hepaiMianziIndex;
			}
			this.header = obj.header;
			this.hand = obj.hand;
			this.fulu = obj.fulu;
			this.hepaiMianziIndex = obj.hepaiMianziIndex;
		} else if (obj.type == HePaiType.QiDuiZi) {
			if (obj.duiziList.length != 7) throw "七对子的duiziList长度（对子数）应为7张，请检查传入参数是否正确";
			obj.duiziList.map(function (pai) {
				if (!(pai instanceof _Pai2.default)) throw "对子数组duiziList应为Pai类型的数组，但存在非该类型项：" + pai;
			});
			this.duiziList = obj.duiziList;
		}
	}

	/*
 	获取和牌牌型所有牌
 	参数：
 	无
 	返回值：
 	所有Pai对象的数组
 */
	//List<Pai>类型，对子的列表，当且仅当type为HePaiType.QiDuiZi时有效
	// List<Mianzi>类型，存储手牌的数据，当且仅当type为HePaiType.MianZiShou时有效
	//List<Pai>类型，和牌的手牌
	// Pai类型，标识和了牌


	_createClass(HePaiPaixing, [{
		key: "getPaiList",
		value: function getPaiList() {
			switch (this.type) {
				case HePaiType.MianZiShou:
					var ret = [];
					this.fulu.map(function (mianzi) {
						ret = ret.concat(mianzi.getPaiList());
					});
					ret = ret.concat(this.paiList);
					return ret;
				case HePaiType.QiDuiZi:
				case HePaiType.GuoShiWuShuang:
					return this.paiList; //国士无双与七对子都要求门前清，因此直接返回手牌即可
			}
			return [];
		}

		/*
  	是否是门前清
  	参数：
  	无
  	返回值：
  	门前清返回true，否则返回false
  */

	}, {
		key: "isMenQianQing",
		value: function isMenQianQing() {
			for (var i in this.fulu) {
				if (this.fulu[i].isFulu) return false;
			}return true;
		}

		/*
  	是否是面子手和牌
  	参数：
  	无
  	返回值：
  	面子手和牌返回true，否则返回false
  */

	}, {
		key: "isMianZiShou",
		value: function isMianZiShou() {
			return this.type == HePaiType.MianZiShou;
		}
		/*
  	是否是七对子和牌
  	参数：
  	无
  	返回值：
  	七对子和牌返回true，否则返回false
  */

	}, {
		key: "isQiDuiZi",
		value: function isQiDuiZi() {
			return this.type == HePaiType.QiDuiZi;
		}
		/*
  	是否是国士无双和牌
  	参数：
  	无
  	返回值：
  	国士无双和牌返回true，否则返回false
  */

	}, {
		key: "isGuoShiWuShuang",
		value: function isGuoShiWuShuang() {
			return this.type == HePaiType.GuoShiWuShuang;
		}
		/*
  	获取全部面子
  	参数：
  	无
  	返回值：
  	手牌中的面子与副露中的面子组成的数组
  */

	}, {
		key: "getAllMianzi",
		value: function getAllMianzi() {
			return this.hand.concat(this.fulu);
		}
		/*
  	计算和牌牌型符数
  	参数：
  	state：State类型
  	返回值：
  	牌型符数对象。
  	例：
  	{
  		fu: 30,
  		fu_real: 24,
  		fuList: ["底符20符","明刻4符{{0}}"]
  	}
  */

	}, {
		key: "getFu",
		value: function getFu(state) {
			var _this = this;

			if (this.type == HePaiType.GuoShiWuShuang) return {
				fu: 25,
				fu_real: 25,
				fuList: ["国士无双固定25符"]
			};
			if (this.type == HePaiType.QiDuiZi) return {
				fu: 25,
				fu_real: 25,
				fuList: ["七对子固定25符"]
			};
			var ret = {
				fu: 20, //底符
				fuList: []
			};
			ret.fuList.push("底符20符");
			this.getAllMianzi().map(function (mianzi, currIndex) {
				if (mianzi.type == "Kezi") {
					if (!mianzi.isFulu) {
						//手牌暗刻
						if (currIndex == _this.hepaiMianziIndex && !state.isZimo) {
							//荣和而成的暗刻
							ret.fuList.push("明刻4符{{" + mianzi.basePai.pai_real_ascii + "}}");
							ret.fu += 4; //明刻4符
						} else {
							ret.fuList.push("暗刻8符{{" + mianzi.basePai.pai_real_ascii + "}}");
							ret.fu += 8; //暗刻8符
						}
					} else {
						//明刻
						ret.fuList.push("明刻4符{{" + mianzi.basePai.pai_real_ascii + "}}");
						ret.fu += 4; //明刻4符
					}
				} else if (mianzi.type == "Gangzi") {
					if (mianzi.isFulu) {
						//大明杠或加杠
						ret.fuList.push("明杠16符{{" + mianzi.basePai.pai_real_ascii + "}}");
						ret.fu += 16; //明杠16符
					} else {
						//暗杠
						ret.fuList.push("暗杠32符{{" + mianzi.basePai.pai_real_ascii + "}}");
						ret.fu += 32; //暗杠32符
					}
				} else if (mianzi.type == "Shunzi") {
					return; //顺子不计符
				}
			});
			if (this.header.isYiPai(state)) {
				//雀头役牌2符
				if (!this.header.isLianFengPai(state)) {
					ret.fuList.push("雀头役牌2符{{" + this.header.pai_real_ascii + "}}");
					ret.fu += 2;
				} else {
					ret.fuList.push("雀头连风牌4符{{" + this.header.pai_real_ascii + "}}");
					ret.fu += 4;
				}
			}
			if (this.hepaiMianziIndex == -1) {
				//单骑和牌2符
				ret.fuList.push("单骑和牌2符{{" + this.helepai.pai_real_ascii + "}}");
				ret.fu += 2;
			} else {
				if (!this.hand[this.hepaiMianziIndex].isKezi()) {
					var paiList = this.hand[this.hepaiMianziIndex].getPaiList();
					if (paiList[1].pai_real_ascii == this.helepai.pai_real_ascii) {
						//听牌是坎张
						ret.fuList.push("坎张和牌2符{{" + this.helepai.pai_real_ascii + "}}");
						ret.fu += 2; //边张或坎张2符
					} else if (paiList[0].getPaiAscii() == 1 && this.helepai.getPaiAscii() == 3) {
						//听牌是边张
						ret.fuList.push("边张和牌2符{{" + this.helepai.pai_real_ascii + "}}");
						ret.fu += 2; //边张或坎张2符
					} else if (paiList[2].getPaiAscii() == 9 && this.helepai.getPaiAscii() == 7) {
						//听牌是边张
						ret.fuList.push("边张和牌2符{{" + this.helepai.pai_real_ascii + "}}");
						ret.fu += 2; //边张或坎张2符
					}
				}
			}
			if (!state.isZimo && this.isMenQianQing()) {
				//门前清荣和10符
				ret.fu += 10;
				ret.fuList.push("门前清荣和10符{{" + this.helepai.pai_real_ascii + "}}");
			}
			if (state.isZimo) {
				//门前清自摸2符
				ret.fu += 2;
				ret.fuList.push("门前清自摸2符{{" + this.helepai.pai_real_ascii + "}}");
			}
			ret.fu_real = ret.fu;
			ret.fu = Math.ceil(ret.fu / 10) * 10;
			return ret;
		}
	}]);

	return HePaiPaixing;
}();

exports.default = HePaiPaixing;