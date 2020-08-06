const maj = require('./majhong.js');
const yaojiu = [maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9,maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.CHU];
const ziMaj = [maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.CHU];
const laotouMaj = [maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9];
const sanYuanMaj = [maj.HAK,maj.HAT,maj.CHU];
/*
* 计算役种
* 参数：
* handMajList：手牌，长度应为2,5,8,11,14，最后一张牌应当是自摸或荣和的牌
* fuluMajList: 副露牌，格式范例：
*
[
	{
		type: "shunzi",
		maj: [maj.MAN2, maj.MAN3,maj.MAN4]
	},
	{
		type: "kezi",
		maj: [maj.MAN2]
	},
	{
		type: "gangzi",
		maj: [maj.MAN2]
	},
	{
		type: "angang",
		maj: [maj.MAN2]
	},
]
* config：JSON，配置各种条件，如立直。范例：
{
	isLiZhi: false, //是否立直
	isYiFa: false, //是否一发
	isLingShang: false, //是否领上
	ziFeng: maj.TON, //自风
	changFeng: maj.TON, //场风
	isZimo: false, //是否自摸 
	isLast: false, //是否是河底/海底
	isQiangGang: false, //是否是抢杠
}
* 返回值：
*/
function calcYaku(handMajList,fuluMajList,config){
	var hasYaku = [];
	var s = maj.calc(handMajList);
	var rongMaj = handMajList[handMajList.length-1];
	var f = isHunYiSe(handMajList,fuluMajList);
	console.log(f);
	for(var i in s){
		var t = isErBeiKou(s[i],fuluMajList);
		console.log(t);
	}

}
/*
* 判断是否门前清
* 参数：
* fuluMajList: 副露牌，详见calcYaku
* 返回值：门前清返回true，否则返回false
*/
function isMenQianQing(fuluMajList){
	for(var i in fuluMajList)
		if(fuluMajList[i].type != "angang")
			return false;
	return true;
}
/*
* 判断某张牌是否是役牌
* 参数：
* maj：待判断的牌
* config：配置，详见calcYaku
*/
function isYakuHai(maj,config){
	if(maj == config.ziFeng)
		return true;
	if(maj == config.changFeng)
		return true;
	if(maj == maj.HAK)
		return true;
	if(maj == maj.HAT)
		return true;
	if(maj == maj.CHU)
		return true;
}
/*
* 判断是否是断幺九
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合断幺九返回true，否则返回false
*/
function isDuanYao(handMajList,fuluMajList){
	for(var i in handMajList)
		if(yaojiu.indexOf(handMajList[i])!=-1)
			return false;
	for(var i in fuluMajList)
		for(var j in fuluMajList[i].maj)
			if(yaojiu.indexOf(fuluMajList[i].maj[j])!=-1)
				return false;
	return true;
}
/*
* 判断是否是平和
* 参数：
* rongMaj：荣和或者自摸的牌
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合平和返回true，否则返回false
*/
function isPinghe(rongMaj,mianzi,fuluMajList,config){
	if(fuluMajList.length > 0)
		return false; //门前清限定，暗杠不是顺子不考虑
	if(isYakuHai(mianzi.header,config))
		return false; //雀头不能是役牌
	if(mianzi.kezi.length>0)
		return false; //必须全是顺子
	var doubleTing = [];//两面听可能的牌
	for(var i in mianzi.shunzi){
		doubleTing.push(mianzi.shunzi[i]);
		doubleTing.push(mianzi.shunzi[i]+2);
	}
	if(doubleTing.indexOf(rongMaj) == -1)
		return false;//必须是顺子的两面听
	return true;
}
/*
* 判断是否是立直
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合立直返回true，否则返回false
*/
function isLiZhi(config){
	return config.isLiZhi;
}
/*
* 判断是否是一发
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合一发返回true，否则返回false
*/
function isYiFa(config){
	return config.isYiFa;
}
/*
* 判断是否是门前清自摸
* 参数：
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合门前清自摸返回true，否则返回false
*/
function isZimo(fuluMajList,config){
	if(!isMenQianQing(fuluMajList))
		return false; //门前清限定
	return config.isZimo;
}
/*
* 判断是否是一杯口
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合一杯口返回true，否则返回false
*/
function isYiBeiKou(mianzi,fuluMajList,config){
	if(!isMenQianQing(fuluMajList))
		return false; //门前清限定
	var map = mianzi.shunzi.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对顺子头计数
	ret = false;
	map.forEach(function(count,key){
		if(count>=2)
			ret = true; // 顺子重复次数大于等于2即为一杯口
	})
	return ret;
}

/*
* 获取当前和牌种包含的役牌役数组
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：没有役牌返回空数组[]，有役牌返回对应的役牌，如[maj.TON,maj.TON]为连风牌东
*/
function calcYakuHai(mianzi,fuluMajList,config){
	var ret = [];
	for(var i in mianzi.kezi){
		if(isYakuHai(mianzi.kezi[i],config))
			ret.push(mianzi.kezi[i]);//手牌役牌
		if(mianzi.kezi[i]==config.ziFeng&&mianzi.kezi[i]==config.changFeng)
			ret.push(mianzi.kezi[i]);//连风牌
	}
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			if(isYakuHai(fuluMajList[i].maj[0],config))
				ret.push(fuluMajList[i].maj[0]);//副露役牌
			if(fuluMajList[i].maj[0]==config.ziFeng&&fuluMajList[i].maj[0]==config.changFeng)
				ret.push(fuluMajList[i].maj[0]);//副露连风牌
		}
	}
	return ret;
}
/*
* 判断是否是海底捞月
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合海底捞月返回true，否则返回false
*/
function isHaidi(config){
	return config.isZimo&&config.isLast;
}
/*
* 判断是否是河底捞鱼
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合河底捞鱼返回true，否则返回false
*/
function isHedi(config){
	return (!config.isZimo)&&config.isLast;
}
/*
* 判断是否是抢杠
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合抢杠返回true，否则返回false
*/
function isQiangGang(config){
	return config.isQiangGang;
}
/*
* 判断是否是领上开花
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合领上开花返回true，否则返回false
*/
function isLingShang(config){
	return config.isLingShang;
}
/*
* 获取当前和牌是否是一气贯通
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合一气贯通返回true，否则返回false
*/
function isYiQi(mianzi,fuluMajList){
	var shunziList = [];
	shunziList = shunziList.concat(mianzi.shunzi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type=="shunzi"){
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	if(shunziList.indexOf(maj.MAN1)!=-1&&shunziList.indexOf(maj.MAN4)!=-1&&shunziList.indexOf(maj.MAN7)!=-1)
		return true;
	if(shunziList.indexOf(maj.PIN1)!=-1&&shunziList.indexOf(maj.PIN4)!=-1&&shunziList.indexOf(maj.PIN7)!=-1)
		return true;
	if(shunziList.indexOf(maj.SOU1)!=-1&&shunziList.indexOf(maj.SOU4)!=-1&&shunziList.indexOf(maj.SOU7)!=-1)
		return true;
	return false;
}
/*
* 获取当前和牌是否是三色同顺
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合三色同顺返回true，否则返回false
*/
function isSanSeTongShun(mianzi,fuluMajList){
	var shunziList = [];
	shunziList = shunziList.concat(mianzi.shunzi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type=="shunzi"){
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var mans = [];//万子
	var pins = [];//饼子
	var sous = [];//索子
	for(var i in shunziList){
		if(shunziList[i]>=maj.MAN1&&shunziList[i]<=maj.MAN9)
			mans.push(shunziList[i]-maj.MAN1);
		if(shunziList[i]>=maj.PIN1&&shunziList[i]<=maj.PIN9)
			pins.push(shunziList[i]-maj.PIN1);
		if(shunziList[i]>=maj.SOU1&&shunziList[i]<=maj.SOU9)
			sous.push(shunziList[i]-maj.SOU1);
	}
	var res = mans.filter(function (val) { return pins.indexOf(val) > -1 }).filter(function (val) { return sous.indexOf(val) > -1 });//取三个数组交集
	return res.length > 0;//交集大于0为三色同顺
}
/*
* 获取当前和牌是否是三色同刻
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合三色同刻返回true，否则返回false
*/
function isSanSeTongKe(mianzi,fuluMajList){
	var keziList = [];
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var mans = [];//万子
	var pins = [];//饼子
	var sous = [];//索子
	for(var i in keziList){
		if(keziList[i]>=maj.MAN1&&keziList[i]<=maj.MAN9)
			mans.push(keziList[i]-maj.MAN1);
		if(keziList[i]>=maj.PIN1&&keziList[i]<=maj.PIN9)
			pins.push(keziList[i]-maj.PIN1);
		if(keziList[i]>=maj.SOU1&&keziList[i]<=maj.SOU9)
			sous.push(keziList[i]-maj.SOU1);
	}
	var res = mans.filter(function (val) { return pins.indexOf(val) > -1 }).filter(function (val) { return sous.indexOf(val) > -1 });//取三个数组交集
	return res.length > 0;//交集大于0为三色同刻
}

/*
* 获取当前和牌是否是混全带幺九
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合混全带幺九返回true，否则返回false
*/
function isHunQuanDaiYaoJiu(mianzi,fuluMajList){
	if(yaojiu.indexOf(mianzi.header)==-1)
		return false; //雀头必须是字牌
	var shunziList = []; //取所有顺子
	shunziList = shunziList.concat(mianzi.shunzi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type=="shunzi"){
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	for(var i in keziList)
		if(yaojiu.indexOf(keziList[i])==-1)
			return false; //刻子必须是字牌
	var laoTouShunZi = [maj.MAN1,maj.MAN7,maj.SOU1,maj.SOU7,maj.PIN1,maj.PIN7];
	for(var i in shunziList)
		if(laoTouShunZi.indexOf(shunziList[i])==-1)
			return false; //顺子必须包含字牌
	return true;
}
/*
* 获取当前和牌是否是纯全带幺九(计此役时不计混全带幺九)
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合纯全带幺九返回true，否则返回false
*/
function isChunQuanDaiYaoJiu(mianzi,fuluMajList){
	if(laotouMaj.indexOf(mianzi.header)==-1)
		return false; //雀头必须是老头牌
	var shunziList = []; //取所有顺子
	shunziList = shunziList.concat(mianzi.shunzi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type=="shunzi"){
			shunziList = shunziList.concat(fuluMajList[i].maj);
		}
	}
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	for(var i in keziList)
		if(laotouMaj.indexOf(keziList[i])==-1)
			return false; //刻子必须是老头牌
	var laoTouShunZi = [maj.MAN1,maj.MAN7,maj.SOU1,maj.SOU7,maj.PIN1,maj.PIN7];
	for(var i in shunziList)
		if(laoTouShunZi.indexOf(shunziList[i])==-1)
			return false; //顺子必须包含老头牌
	return true;
}
/*
* 获取当前和牌是否是混老头(计此役时不计纯全带幺九、混全带幺九)
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合纯全带幺九返回true，否则返回false
*/
function isHunLaoTou(mianzi,fuluMajList){
	if(!isDuiDuiHe(mianzi,fuluMajList))
		return false; //混老头一定对对和
	return isHunQuanDaiYaoJiu(mianzi,fuluMajList);// 对对和 + 混全带幺九 = 混老头
}
/*
* 获取当前和牌是否是对对和
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合对对和返回true，否则返回false
*/
function isDuiDuiHe(mianzi,fuluMajList){
	if(mianzi.shunzi.length>0)
		return false; //面子里不能有顺子
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="shunzi")
			return false; //鸣牌不能有顺子
	return true;
}
/*
* 获取当前和牌是否是两立直
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合两立直返回true，否则返回false
*/
function isDoubleLiZhi(config){
	return config.isDoubleLiZhi;
}
/*
* 获取当前和牌是否是三暗刻
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合三暗刻返回true，否则返回false
*/
function isSanAnKe(mianzi,fuluMajList){
	var keziList = []; //取所有符合条件的刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="angang")
			keziList = keziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	return keziList.length == 3;
}
/*
* 获取当前和牌是否是三杠子
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合三杠子返回true，否则返回false
*/
function isSanGangzi(mianzi,fuluMajList){
	var gangziList = []; //取所有杠子
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="angang"||fuluMajList[i].type=="gangzi")
			gangziList = gangziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	return gangziList.length == 3;
}
/*
* 获取当前和牌是否是小三元
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合小三元返回true，否则返回false
*/
function isXiaoSanYuan(mianzi,fuluMajList){
	if(sanYuanMaj.indexOf(mianzi.header)==-1)
		return false;//雀头必须是三元牌
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var sanyuanList = [];
	for(var i in keziList)
		if(sanYuanMaj.indexOf(keziList[i])!=-1)
			sanyuanList.push(keziList[i]);
	return sanyuanList.length == 2;
}
/*
* 获取当前和牌是否是混一色
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合混一色返回true，否则返回false
*/
function isHunYiSe(handMajList,fuluMajList){
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for(var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	var max = 0;
	var min = 100; //清除字牌后取最大与最小值
	for(var i in hands)
		if(ziMaj.indexOf(hands[i])==-1){
			max = (hands[i] > max ? hands[i] : max);
			min = (hands[i] < min ? hands[i] : min);
		}
	if(min>=maj.MAN1&&max<=maj.MAN9)
		return true;
	if(min>=maj.PIN1&&max<=maj.PIN9)
		return true;
	if(min>=maj.SOU1&&max<=maj.SOU9)
		return true;
	return false;
}
/*
* 获取当前和牌是否是清一色
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合清一色返回true，否则返回false
*/
function isQingYiSe(handMajList,fuluMajList){
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for(var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	var max = 0;
	var min = 100; //清除字牌后取最大与最小值
	for(var i in hands)
		if(ziMaj.indexOf(hands[i])==-1){
			max = (hands[i] > max ? hands[i] : max);
			min = (hands[i] < min ? hands[i] : min);
		}else
			return false; //有字牌不是清一色
	if(min>=maj.MAN1&&max<=maj.MAN9)
		return true;
	if(min>=maj.PIN1&&max<=maj.PIN9)
		return true;
	if(min>=maj.SOU1&&max<=maj.SOU9)
		return true;
	return false;
}
/*
* 判断是否是二杯口
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合二杯口返回true，否则返回false
*/
function isErBeiKou(mianzi,fuluMajList){
	if(!isMenQianQing(fuluMajList))
		return false; //门前清限定
	var map = mianzi.shunzi.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对顺子头计数
	ret = 0;
	map.forEach(function(count,key){
		if(count==2)
			ret++; // 顺子重复次数等于记一个一杯口
		if(count==4)
			ret+=2; //四个相同的顺子记作两个一杯口
	})
	return ret >= 2;//杯口数大于等于2即二杯口
}


calcYaku(
	[maj.MAN1, maj.MAN1, maj.MAN1, maj.MAN1, maj.MAN2, maj.MAN2, maj.MAN2, maj.MAN2, maj.MAN3, maj.MAN3, maj.MAN3, maj.MAN3, maj.MAN4, maj.MAN4],[],{
		isDoubleLiZhi: false, //是否两立直
		isLiZhi: false, //是否立直
		isYiFa: false, //是否一发
		isLingShang: false, //是否领上
		ziFeng: maj.TON, //自风
		changFeng: maj.TON, //场风
		isZimo: false, //是否自摸 
		isLast: false, //是否是河底/海底
		isQiangGang: false, //是否是抢杠
	}
);






/*

已完工：
断幺九、平和、立直、一发、门前清自摸、一杯口、役牌、海底捞月、河底捞鱼、抢杠、岭上开花
一气通贯、三色同顺、三色同刻、混全带幺九、纯全带幺九、对对和、双立直、三暗刻、三杠子、混老头、小三元、混一色、清一色、二杯口

未完工
七对子

国士无双
四暗刻
大三元
小四喜
字一色
绿一色
清老头
九莲宝灯
四杠子
天和
地和


国士无双十三面
四暗刻单骑
大四喜
纯正九莲宝灯
*/
