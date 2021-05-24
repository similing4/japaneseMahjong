/*
 *  役种类：役牌
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：面子手牌型
 *  役种条件：自风、场风、三元牌的刻子为役牌
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class YiPai extends Yi {
	constructor(name) {
		super("YiPai","役牌" + name,1,[]);
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
			return []; //面子手和牌牌型才有可能有役牌
		var mianziList = hePaiPaixing.getAllMianzi();
		var ret = [];
		mianziList.map((mianzi)=>{
			if(mianzi.isKezi() && mianzi.basePai.isYiPai(state))
				ret.push(new YiPai(mianzi.basePai.getNatureName()));
		});
		return ret;
	}
};