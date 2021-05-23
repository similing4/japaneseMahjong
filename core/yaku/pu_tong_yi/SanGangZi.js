/*
 *  役种类：三杠子
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中有三个面子为杠子。
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SanGangZi extends Yi {
	constructor() {
		super("SanGangZi","三杠子",2,[]);
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
			return []; //面子手和牌牌型才有可能三杠子
		var gangzi = 0;
		var all = hePaiPaixing.getAllMianzi();
		for(var i in all)
			if(all[i].isGangzi())
				gangzi ++; //要求有三个暗刻
		if(gangzi != 3)
			return [];
		return [new SanGangZi()];
	}
};