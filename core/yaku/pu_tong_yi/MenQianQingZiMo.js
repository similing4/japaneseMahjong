/*
 *  役种类：门前清自摸
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：不限
 *  役种条件：门前清状态下自摸和牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class MenQianQingZiMo extends Yi {
	constructor() {
		super("MenQianQingZiMo","门前清自摸",1,[]);
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
		if(hePaiPaixing.isMenQianQing() && state.isZimo)
			return [new MenQianQingZiMo()];
		return [];
	}
};