/*
 *  役种类：混一色
 *	役种类型：普通役
 *  役种番数：3（鸣牌2）
 *  和牌牌型：不限
 *  役种条件：和牌牌型所有牌都为一种色牌或字牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class HunYiSe extends Yi {
	constructor(hePaiPaixing) {
		super("HunYiSe","混一色",hePaiPaixing.isMenQianQing()?3:2,[]);
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
				continue;
			if(type == "")
				type = paiList[i].getType();
			else if(type != paiList[i].getType())
				return [];
		}
		return [new HunYiSe(hePaiPaixing)];
	}
};