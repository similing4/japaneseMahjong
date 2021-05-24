/*
 *  役种类：清一色
 *	役种类型：普通役
 *  役种番数：6（鸣牌5）
 *  和牌牌型：不限
 *  役种条件：和牌牌型所有牌都为一种色牌
 *  冲突役种：混一色
 */
import Yi from "../../../bean/Yi.js";
import HunYiSe from "./HunYiSe.js";
export default class QingYiSe extends Yi {
	constructor(hePaiPaixing) {
		super("QingYiSe","清一色",hePaiPaixing.isMenQianQing()?6:5,[
			HunYiSe
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
		var type = "";
		for(var i in paiList){
			if(paiList[i].isZiPai())
				return [];
			if(type == "")
				type = paiList[i].getType();
			else if(type != paiList[i].getType())
				return [];
		}
		return [new QingYiSe(hePaiPaixing)];
	}
};