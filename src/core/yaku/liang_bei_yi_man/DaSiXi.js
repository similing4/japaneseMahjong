/*
 *  役种类：大四喜
 *	役种类型：两倍役满
 *  役种番数：26
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型中有东、南、西、北四种牌的刻子
 *  冲突役种：小四喜
 */
import Yi from "../../../bean/Yi.js";
import XiaoSiXi from "../yi_man/XiaoSiXi.js";
export default class DaSiXi extends Yi {
	constructor() {
		super("DaSiXi","大四喜",-2,[
			XiaoSiXi
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
			return []; //面子手和牌牌型才有可能大四喜
		if(hePaiPaixing.getAllMianzi().filter((mianzi)=>{
			 return mianzi.basePai.isFengPai() && mianzi.isKezi();
		}).length == 4) //风牌刻子有四个
			return [new DaSiXi()];
		return [];
	}
};