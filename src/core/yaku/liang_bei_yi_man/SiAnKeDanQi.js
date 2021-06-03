/*
 *  役种类：四暗刻单骑
 *	役种类型：两倍役满
 *  役种番数：26
 *  和牌牌型：面子手牌型
 *  役种条件：门前清和牌，和牌中所有面子均为刻子且和了牌为雀头。
 *  冲突役种：四暗刻
 */
import Yi from "../../../bean/Yi.js";
import SiAnKe from "../yi_man/SiAnKe.js";
export default class SiAnKeDanQi extends Yi {
	constructor() {
		super("SiAnKeDanQi","四暗刻单骑",-2,[
			SiAnKe
		]);
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
			return []; //面子手和牌牌型才有可能四暗刻
		if(!hePaiPaixing.isMenQianQing())
			return []; //四暗刻需门前清
		var all = hePaiPaixing.getAllMianzi();
		for(var i in all)
			if(!all[i].isKezi())
				return []; //要求全是刻子
		if(state.isTianHe)
			return [new SiAnKeDanQi()];
		if(hePaiPaixing.hepaiMianziIndex == -1) //雀头和牌四暗刻单骑
			return [new SiAnKeDanQi()];
		return [];
	}
};