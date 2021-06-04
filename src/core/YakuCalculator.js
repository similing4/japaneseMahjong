/*
 *	役计算器
 *	用于获取对应手牌的役与和牌点数、番符数等，该类实例可由Parser实例的getYakuCalculator方法实例化返回
 *  使用方法：
 *  var yakuCalc = new YakuCalculator([
 		new HePaiPaixing({
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
		})
 	],new State());
 *	对象方法详见注释
 */
import Pai from "../bean/Pai.js"
import Mianzi from "../bean/Mianzi.js";
import State from "../bean/State.js";
import HePaiPaixing from "../bean/HePaiPaixing.js";
import yakuCalc from "./yaku/calc.js";
export default class YakuCalculator {
	hePaiPaixingList; // List<HePaiPaixing>类型，所有的和牌牌型可能
	state; // State类型，全局状态
	/*
		构造方法
		参数：
			hePaiPaixingList：HePaiPaixing对象的数组，需要使用Parser获取或自定义。
			state：State类型，全局配置
		错误：
			当传入数据不合法时报错。
	*/
	constructor(hePaiPaixingList, state) {
		if (!(state instanceof State))
			throw "参数state应为State类型：" + state;
		this.state = state;
		this.hePaiPaixingList = hePaiPaixingList.map((hePaiPaixing) => {
			if (!(hePaiPaixing instanceof HePaiPaixing))
				throw "参数hePaiPaixingList应为HePaiPaixing类型的数组，但存在非该类型项：" + hePaiPaixing;
			return hePaiPaixing;
		});
	}
	/*
		计算牌型中包含的宝牌
		参数：
			hePaiPaixing：HePaiPaixing对象。
			state：State类型，全局配置
		返回值：宝牌及其数量数组：
			[{
				count:1,
				pai:new Pai("Wanzi",1),
				type:"Dora"
			},{
				count:1,
				pai:new Pai("Wanzi",1),
				type:"LiDora"
			}]
	*/
	getDora(hePaiPaixing, state) {
		var ret = [];
		hePaiPaixing.getPaiList().map((pai) => {
			var c = pai.getDoraCountNormal(state);
			if (c > 0)
				ret.push({
					count: c,
					pai: pai,
					type: "Dora"
				});
			c = pai.getDoraCountLi(state);
			if (c > 0)
				ret.push({
					count: c,
					pai: pai,
					type: "LiDora"
				});
		})
		return ret;
	}
	/*
		计算役的番符点数
		参数：
			hePaiPaixingList：HePaiPaixing对象的数组，需要使用Parser获取或自定义。
			state：State类型，全局配置
		返回值示例：
			[{
				yaku: [Yi{
					chongTu: [],
					isYiMan: false,
					isLiangBeiYiMan: false,
					key: 'YiPai',
					name: '役牌发',
					fan: 1
				}], //如果无役此数组为空
				dora: [{
					count:1,
					pai:new Pai("Wanzi",1),
					type:"Dora"
				},{
					count:1,
					pai:new Pai("Wanzi",1),
					type:"LiDora"
				}],
				paixing: HePaiPaixing{},
				fan: 3,
				fu: 110,
				point: 8000
			}]
		错误：
			当传入数据不合法时报错。
	*/
	calcYaku(state) {
		var test = [];
		for (var i in this.hePaiPaixingList) {
			var yaku = yakuCalc(this.hePaiPaixingList[i], this.state);
			var dora = this.getDora(this.hePaiPaixingList[i], state);

			var fan = 0;
			if (yaku.length > 0)
				fan = yaku.map((yaku) => {
					return yaku.fan;
				}).reduce((c, d) => {
					return c + d;
				});
			var fu = this.hePaiPaixingList[i].getFu(state);
			var doraFan = 0;
			for(var j in dora)
				doraFan += dora[j].count;
			var point = YakuCalculator.calcPoint((fan == 0) ? 0 : doraFan, fu.fu, state);
			test.push({
				yaku: yaku,
				dora: dora,
				paixing: this.hePaiPaixingList[i],
				fan: (fan == 0) ? 0 : (fan + doraFan),
				fu: fu,
				point: point
			});
		}
		return test.sort((a, b) => {
			return b.point - a.point;
		})[0];
	}
	/*
		计算番、符对应的点数
		参数：
			fan：Number类型，番数
			fu：Number类型，符数
			state：State类型，全局配置
		返回值：和牌点数
	*/
	static calcPoint(fan, fu, state) {
		if(fan == 0)
			return 0;
		var fp = (state.ziFeng == 1 ? 6 : 4); //亲家是a*6，闲家是a*4
		if (fan < 5) {
			var a = fu * Math.pow(2, fan + 2);
			if (a >= 2000)
				return Math.ceil(2000 * fp / 100) * 100;
			return Math.ceil(a * fp / 100) * 100;
		}
		switch (parseInt(fan)) {
			case 5:
				return 2000 * fp;
			case 6:
			case 7:
				return 3000 * fp;
			case 8:
			case 9:
			case 10:
				return 4000 * fp;
			case 11:
			case 12:
				return 6000 * fp;
			default:
				return 8000 * fp;
		}
	}
}