/*
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
	 	]
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
import Pai from "./Pai.js"
import Mianzi from "./Mianzi.js";
const HePaiType = { //和牌种类
	MianZiShou: "MianZiShou", //面子手类型和牌
	QiDuiZi: "QiDuiZi", //七对子类型和牌
	GuoShiWuShuang: "GuoShiWuShuang", //国士无双类型和牌
};
export default class HePaiPaixing {
	helepai; // Pai类型，标识和了牌
	type; //HePaiType类型，详见HePaiType
	paiList; //List<Pai>类型，和牌的手牌
	header; // Pai类型，标识雀头，当且仅当type为HePaiType.MianZiShou时有效
	hand; // List<Mianzi>类型，存储手牌的数据，当且仅当type为HePaiType.MianZiShou时有效
	fulu; // List<Mianzi>类型，存储副露区的数据，当且仅当type为HePaiType.MianZiShou时有效
	duiziList; //List<Pai>类型，对子的列表，当且仅当type为HePaiType.QiDuiZi时有效

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
			七对子和牌时需额外传入如下参数：
	 			duiziList：List<Pai>类型，对子的列表
	 		国士和牌牌型无需传入更多参数。
		错误：
			当传入数据不合法时报错。
	*/
	constructor(obj) {
		if (!Object.values(HePaiType).includes(obj.type))
			throw "牌种类传入不正确，应传入" + JSON.stringify(Object.values(PaiTypeHash)) + "之一";
		if (!(obj.helepai instanceof Pai))
			throw "helepai应为Pai类型的参数：" + obj.helepai;
		if (obj.type != HePaiType.MianZiShou && obj.paiList.length != 14)
			throw "非面子手和牌应为14张牌";
		this.type = obj.type;
		this.helepai = obj.helepai;
		this.paiList = obj.paiList;
		if (obj.type == HePaiType.MianZiShou) { //面子手和牌情况
			if (!(obj.header instanceof Pai))
				throw "雀头header应为Pai类型的参数：" + obj.header;
			obj.hand.map((handMianzi) => {
				if (!(handMianzi instanceof Mianzi))
					throw "手牌hand应为Mianzi类型的数组，但存在非该类型项：" + handMianzi;
			});
			obj.fulu.map((fuluMianzi) => {
				if (!(fuluMianzi instanceof Mianzi))
					throw "副露fulu应为Mianzi类型的数组，但存在非该类型项：" + fuluMianzi;
			});
			if (obj.hand.length * 3 + obj.fulu.length * 3 + 2 != 14)
				throw "手牌面子数*3+副露面子数*3+雀头2张应为14张，请检查传入参数是否正确";
			if (obj.paiList.length + obj.fulu.length * 3 != 14)
				throw "手牌数+副露面子数*3张应为14张，请检查传入参数是否正确";
			this.header = obj.header;
			this.hand = obj.hand;
			this.fulu = obj.fulu;
		}else if(obj.type == HePaiType.QiDuiZi){
			if(obj.duiziList.length != 7)
				throw "七对子的duiziList长度（对子数）应为7张，请检查传入参数是否正确";
			obj.duiziList.map((pai) => {
				if(!(pai instanceof Pai))
					throw "对子数组duiziList应为Pai类型的数组，但存在非该类型项：" + pai;
			});
			this.duiziList = obj.duiziList;
		}
	}
}