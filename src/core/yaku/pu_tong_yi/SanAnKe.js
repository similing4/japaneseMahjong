/*
 *  役种类：三暗刻
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中有三个手牌面子为刻子且不由荣和而成。
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SanAnKe extends Yi {
	constructor() {
		super("SanAnKe","三暗刻",2,[]);
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
			return []; //面子手和牌牌型才有可能三暗刻
		var kezi = 0;
		var all = hePaiPaixing.getAllMianzi();
		for(var i in all)
			if(all[i].isKezi() && (state.isZimo || i != hePaiPaixing.hepaiMianziIndex))
				kezi ++; //要求有三个暗刻
		if(kezi != 3)
			return [];
		return [new SanAnKe()];
	}
};