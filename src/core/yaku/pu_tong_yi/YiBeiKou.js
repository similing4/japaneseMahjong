/*
 *  役种类：一盃口
 *	役种类型：普通役
 *  役种番数：1
 *  和牌牌型：面子手牌型
 *  役种条件：门前清状态下，和牌牌型中存在两组面子是顺子，且这两组顺子是相同的顺子
 *  冲突役种：无
 */
import Yi from "../../../bean/Yi.js";
export default class YiBeiKou extends Yi {
	constructor() {
		super("YiBeiKou","一盃口",1,[]);
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
		if(!hePaiPaixing.isMenQianQing())
			return []; //只有门前清有一盃口
		if(!hePaiPaixing.isMianZiShou())
			return []; //只有面子手有一盃口
		var mianziList = hePaiPaixing.getAllMianzi(); //拿到所有面子
		var mianziBasePai = {};
		for(var i in mianziList){ //所有面子都是顺子，对顺子进行计数
			if(!mianziList[i].isShunzi())
				continue;
			if(!mianziBasePai[mianziList[i].basePai.pai_real_ascii])
				mianziBasePai[mianziList[i].basePai.pai_real_ascii] = 0;
			mianziBasePai[mianziList[i].basePai.pai_real_ascii] ++;
		}
		var val = Object.values(mianziBasePai); //取计数数值，存在2个证明有该役
		for(var i in val)
			if(val[i] >= 2)
				return [new YiBeiKou()];
		return [];
	}
};