/*
 *  役种类：字一色
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：不限
 *  役种条件：和牌所有牌为字牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class ZiYiSe extends Yi {
	constructor() {
		super("ZiYiSe","字一色",-1,[]);
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
			if(!paiList[i].isZiPai())
				return [];
		return [new ZiYiSe()];
	}
};