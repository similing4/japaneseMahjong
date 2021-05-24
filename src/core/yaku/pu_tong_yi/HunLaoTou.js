/*
 *  役种类：混老头
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：不限
 *  役种条件：和牌牌型的所有牌都是幺九牌
 *  冲突役种：混全带幺九
 */
import Yi from "../../../bean/Yi.js";
import HunQuanDaiYaoJiu from "./HunQuanDaiYaoJiu.js";
export default class HunLaoTou extends Yi {
	constructor(hePaiPaixing) {
		super("HunLaoTou","混老头",2,[
			HunQuanDaiYaoJiu
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
		var paiList = hePaiPaixing.getPaiList(); //拿到所有牌
		for(var i in paiList)
			if(!paiList[i].isYaojiuPai())
				return [];
		return [new HunLaoTou(hePaiPaixing)];
	}
};