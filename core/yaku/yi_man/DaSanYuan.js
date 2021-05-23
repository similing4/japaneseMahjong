/*
 *  役种类：大三元
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中有中、发、白三种牌的刻子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DaSanYuan extends Yi {
	constructor() {
		super("DaSanYuan","大三元",-1,[]);
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
			return []; //只有面子手有大三元
		var mianziList = hePaiPaixing.getAllMianiz(); //拿到所有面子
		var sanyuan = 0;
		for(var i in mianziList)
			if(mianziList[i].isKezi() && mianziList[i].basePai.isSanyuanPai())
				sanyuan ++;
		if(sanyuan == 3)
			return [new DaSanYuan()];
		return [];
	}
};