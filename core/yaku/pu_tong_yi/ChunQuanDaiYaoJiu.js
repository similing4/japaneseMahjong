/*
 *  役种类：纯全带幺九
 *	役种类型：普通役
 *  役种番数：3（鸣牌2）
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型的雀头和所有面子中都包含老头牌
 *  冲突役种：混全带幺九
 */
import Yi from "../../../bean/Yi.js";
import HunQuanDaiYaoJiu from "./HunQuanDaiYaoJiu.js";
export default class ChunQuanDaiYaoJiu extends Yi {
	constructor(hePaiPaixing) {
		super("ChunQuanDaiYaoJiu","纯全带幺九",hePaiPaixing.isMenQianQing()?3:2,[
			HunQuanDaiYaoJiu
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
			return []; //只有面子手有纯全带幺九
		if(!hePaiPaixing.header.isLaotouPai())
			return []; //雀头必须是老头牌
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		for(var i in mianziList)
			if(mianziList[i].getPaiList().filter((pai)=>{
				return pai.isLaotouPai();
			}).length == 0)
				return [];
		return [new ChunQuanDaiYaoJiu(hePaiPaixing)];
	}
};