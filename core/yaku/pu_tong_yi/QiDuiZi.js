/*
 *  役种类：七对子
 *	役种类型：普通役
 *  役种番数：2
 *  和牌牌型：七对子牌型
 *  役种条件：七对子牌型和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class QiDuiZi extends Yi {
	constructor() {
		super("QiDuiZi","七对子",2,[]);
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
		if(hePaiPaixing.isQiDuiZi())
			return [new QiDuiZi()];
		return [];
	}
};