/*
 *  役种类：三色同顺
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中有三个花色而数值相同的顺子。
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SanSeTongShun extends Yi {
	constructor() {
		super("SanSeTongShun","三色同顺",2,[]);
	}
	/*
		判断和牌牌型是否有当前役
		参数：
		hePaiPaixing：HePaiPaixing类型，和牌牌型
		state：State类型，状态对象
		返回值：
		有当前役返回该牌型具有的役的对象数组，否则返回空数组
	*/
	static getCurrentYi(hePaiPaixing,state){
		if(!hePaiPaixing.isMianZiShou())
			return []; //面子手和牌牌型才有可能三色同顺
		var all = hePaiPaixing.getAllMianzi();
		var shunziBasePai = {}; //对所有顺子数值进行花色计数
		for(var i in all){
			if(all[i].isKezi() || all[i].basePai.isZiPai())
				continue;
			if(!shunziBasePai[all[i].basePai.getPaiAscii()])
				shunziBasePai[all[i].basePai.getPaiAscii()] = [];
			if(!shunziBasePai[all[i].basePai.getPaiAscii()].includes(all[i].basePai.getType())) //没有计入花色就计入
				shunziBasePai[all[i].basePai.getPaiAscii()].push(all[i].basePai.getType());
		}
		var val = Object.values(shunziBasePai);
		for(var i in val)
			if(val[i].length == 3)
				return [new SanSeTongShun()];
		return [];
	}
};