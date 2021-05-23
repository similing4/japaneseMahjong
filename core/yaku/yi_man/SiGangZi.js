/*
 *  役种类：四杠子
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中所有面子均为杠子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SiGangZi extends Yi {
	constructor() {
		super("SiGangZi","四杠子",-1,[]);
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
			return []; //面子手和牌牌型才有可能四杠子
		if(hePaiPaixing.getAllMianzi().filter((mianzi)=>{
			return mianzi.isGangzi();
		}).length == 4) //杠子有四个
			return [new SiGangZi()];
		return [];
	}
};