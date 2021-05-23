/*
 *  役种类：绿一色
 *	役种类型：役满
 *  役种番数：13
 *  和牌牌型：面子手牌型
 *  役种条件：和牌中所有牌均为绿牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
const LvPai = [19,20,21,23,25,32]; //绿牌23468索与发
export default class LvYiSe extends Yi {
	constructor() {
		super("LvYiSe","绿一色",-1,[]);
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
			return []; //面子手和牌牌型才有可能绿一色
		var list = hePaiPaixing.getPaiList();
		for(var i in list)
			if(!LvPai.includes(list[i].pai_real_ascii))
				return []; //有不是绿牌的牌
		return [new LvYiSe()];
	}
};