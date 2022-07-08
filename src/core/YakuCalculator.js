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
		var doraNormal = {};
		var doraLi = {};
		var doraRed = {};
		hePaiPaixing.getPaiList().map((pai) => {
			let c = pai.getDoraCountNormal(state);
			if (c > 0){
				if(!doraNormal[pai.pai_real_ascii + ''])
					doraNormal[pai.pai_real_ascii + ''] = c;
				else
					doraNormal[pai.pai_real_ascii + ''] += c;
			}
			c = pai.getDoraCountLi(state);
			if (c > 0 && state.isLiZhi){
				if(!doraLi[pai.pai_real_ascii + ''])
					doraLi[pai.pai_real_ascii + ''] = c;
				else
					doraLi[pai.pai_real_ascii + ''] += c;
			}
			if(pai.isRed){	
				if(!doraRed[pai.pai_real_ascii + ''])
					doraRed[pai.pai_real_ascii + ''] = 1;
				else
					doraRed[pai.pai_real_ascii + ''] ++;
			}
		})
		for(let i=0;i<state.beidora;i++){
			let pei = Pai.fromRealAscii(30);
			let c = pei.getDoraCountNormal(state);
			if (c > 0){
				if(!doraNormal[pei.pai_real_ascii + ''])
					doraNormal[pei.pai_real_ascii + ''] = c;
				else
					doraNormal[pei.pai_real_ascii + ''] += c;
			}
			c = pei.getDoraCountLi(state);
			if (c > 0 && state.isLiZhi){
				if(!doraLi[pei.pai_real_ascii + ''])
					doraLi[pei.pai_real_ascii + ''] = c;
				else
					doraLi[pei.pai_real_ascii + ''] += c;
			}
		}
		Object.keys(doraNormal).map((pai_real_ascii)=>{
			ret.push({
				count: doraNormal[pai_real_ascii],
				pai: Pai.fromRealAscii(parseInt(pai_real_ascii)),
				type: "Dora"
			});
		});
		Object.keys(doraLi).map((pai_real_ascii)=>{
			ret.push({
				count: doraLi[pai_real_ascii],
				pai: Pai.fromRealAscii(parseInt(pai_real_ascii)),
				type: "LiDora"
			});
		});
		Object.keys(doraRed).map((pai_real_ascii)=>{
			ret.push({
				count: doraRed[pai_real_ascii],
				pai: Pai.fromRealAscii(parseInt(pai_real_ascii)),
				type: "RedDora"
			});
		});
		if(state.beidora > 0)
			ret.push({
				count: state.beidora,
				pai: new Pai("Feng",4),
				type: "BeiDora"
			});
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
			var isYakuman = false;
			if (yaku.length > 0)
				fan = yaku.map((yaku) => {
					if(yaku.isYiMan || yaku.isLiangBeiYiMan)
						isYakuman = true;
					return yaku.fan;
				}).reduce((c, d) => {
					return c + d;
				});
			var fu = this.hePaiPaixingList[i].getFu(state);
			var doraFan = 0;
			for(var j in dora)
				doraFan += dora[j].count;
			var finalFan = fan;
			if(finalFan != 0){
				if(isYakuman)
					finalFan = fan;
				else
					finalFan = fan + doraFan;
			}
			var point = YakuCalculator.calcPoint(finalFan, fu.fu, state);
			if(state.isZimo)
				test.push({
					yaku: yaku,
					dora: dora,
					paixing: this.hePaiPaixingList[i],
					fan: finalFan,
					fu: fu,
					point: point.all,
					point_qin: point.qin,
					point_xian: point.xian
				});
			else
				test.push({
					yaku: yaku,
					dora: dora,
					paixing: this.hePaiPaixingList[i],
					fan: finalFan,
					fu: fu,
					point: point
				});
		}
		return test.sort((a, b) => {
			if(b.point == a.point){
				if(b.fan == a.fan)
					return b.fu.fu_real - a.fu.fu_real;
				return b.fan - a.fan;
			}
			return b.point - a.point;
		})[0];
	}
	/*
		计算番、符对应的点数
		参数：
			fan：Number类型，番数
			fu：Number类型，符数
			state：State类型，全局配置
		返回值：荣和时返回和牌点数，自摸时返回亲闲家应付点数与共计点数
	*/
	static calcPoint(fan, fu, state) {
		var a = 0;
		if(fan > 0){
			if (fan < 5) {
				a = fu * Math.pow(2, fan + 2);
				if (a >= 2000) //满贯
					a = 2000;
			}else
				switch (parseInt(fan)) {
					case 5:
						a = 2000;
						break;
					case 6:
					case 7:
						a = 3000;
						break;
					case 8:
					case 9:
					case 10:
						a = 4000;
						break;
					case 11:
					case 12:
						a = 6000;
						break;
					default:
						a = 8000;
						break;
				}
		}
		var qin = Math.ceil(a * 2 / 100) * 100;
		var xian = Math.ceil(a / 100) * 100;
		if(state.isZimo){
			if(state.ziFeng == 1){ //亲家
				return {
					all: qin * 3,
					qin: 0,
					xian: qin
				};
			}else {
				return {
					all: xian * 2 + qin,
					qin: qin,
					xian: xian
				};
			}
		}else
			return Math.ceil(a * (state.ziFeng == 1 ? 6 : 4) / 100) * 100;
	}
}