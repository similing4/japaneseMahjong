/*
 *  役种类：断幺九
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：不限
 *  役种条件：和牌牌型中所有牌中不包含幺九牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class DuanYaoJiu extends Yi {
	constructor() {
		super("DuanYaoJiu","断幺九",1,[]);
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
		var paiList = hePaiPaixing.getPaiList(); //拿到所有面子
		for(var i in paiList)
			if(paiList[i].isYaojiuPai())
				return [];
		return [new DuanYaoJiu()];
	}
};