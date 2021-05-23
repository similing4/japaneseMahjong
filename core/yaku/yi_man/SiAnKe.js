/*
 *  役种类：四暗刻
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：门前清和牌，和牌中所有面子均为刻子，自摸时无附加条件，荣和时荣和牌需为雀头。
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class SiAnKe extends Yi {
	constructor() {
		super("SiAnKe","四暗刻",-1,[]);
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
			return []; //面子手和牌牌型才有可能四暗刻
		if(!hePaiPaixing.isMenQianQing())
			return []; //四暗刻需门前清
		if(hePaiPaixing.hepaiMianziIndex == -1) //雀头和牌四暗刻单骑
			return [new SiAnKe()];
		if(state.isZimo) //自摸四暗刻
			return [new SiAnKe()];
		return [];
	}
};