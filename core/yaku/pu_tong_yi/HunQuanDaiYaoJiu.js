/*
 *  役种类：混全带幺九
 *	役种类型：普通役
 *  役种番数：2（鸣牌1）
 *  和牌牌型：面子手牌型
 *  役种条件：和牌牌型的雀头和所有面子中都包含幺九牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class HunQuanDaiYaoJiu extends Yi {
	constructor(hePaiPaixing) {
		super("HunQuanDaiYaoJiu","混全带幺九",hePaiPaixing.isMenQianQing()?2:1,[]);
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
			return []; //只有面子手有混全带幺九
		if(!hePaiPaixing.header.isYaojiuPai())
			return []; //雀头必须是幺九牌
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		for(var i in mianziList)
			if(mianziList[i].getPaiList().filter((pai)=>{
				return pai.isYaojiuPai();
			}).length == 0)
				return [];
		return [new HunQuanDaiYaoJiu(hePaiPaixing)];
	}
};