/*
 *  役种类：三色同刻
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中有三个花色而数值相同的刻子。
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SanSeTongKe extends Yi {
	constructor() {
		super("SanSeTongKe","三色同刻",2,[]);
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
			return []; //面子手和牌牌型才有可能三色同刻
		var all = hePaiPaixing.getAllMianzi();
		var keziBasePai = {}; //对所有刻子数值进行花色计数
		for(var i in all){
			if(all[i].isShunzi() || all[i].basePai.isZiPai())
				continue;
			if(!keziBasePai[all[i].basePai.getPaiAscii()])
				keziBasePai[all[i].basePai.getPaiAscii()] = [];
			if(!keziBasePai[all[i].basePai.getPaiAscii()].includes(all[i].basePai.getType())) //没有计入花色就计入
				keziBasePai[all[i].basePai.getPaiAscii()].push(all[i].basePai.getType());
		}
		var val = Object.values(keziBasePai);
		for(var i in val)
			if(val[i].length == 3)
				return [new SanSeTongKe()];
		return [];
	}
};