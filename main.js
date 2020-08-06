const maj = require('./majhong.js');
const yaojiu = [maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9,maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.CHU];
const ziMaj = [maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.CHU];
const laotouMaj = [maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9];
const sanYuanMaj = [maj.HAK,maj.HAT,maj.CHU];
const siXiMaj = [maj.TON,maj.NAN,maj.SHA,maj.PEI];
const greenMaj = [maj.SOU2,maj.SOU3,maj.SOU4,maj.SOU6,maj.SOU8,maj.HAT];
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
	isTianHe: false, //是否是天和
	isDiHe: false, //是否是地和
}
* 返回值：{
	fan: 5, //番数
	fu: 20, //符数
	yakuList:[
		{
			yaku: "断幺九",
			fan: 1
		}
	]
}
*/
function calcYaku(handMajList,fuluMajList,config){
	var hasYaku = [];
	var s = maj.calc(handMajList);
	var rongMaj = handMajList[handMajList.length-1];
	var ret = {fan: 0,fu: 0,yakuList:[]};
	if(s){ //面子手和牌牌型
		;
	}else if(isQiDuiZi(handMajList,fuluMajList)){ //七对子和牌牌型
		;
	}else if(isGuoShi(handMajList,fuluMajList)){ //国士无双和牌牌型
		if(isGuoShiShiSanMian(handMajList,fuluMajList)){
			ret.fan = 26;
			ret.fu = 25;
			ret.yakuList.push({
				yaku: "国士无双十三面",
				fan: 26
			});
			return ret;
		}else{
			ret.fan = 13;
			ret.fu = 25;
			ret.yakuList.push({
				yaku: "国士无双",
				fan: 13
			});
			return ret;
		}
	}

	/*
	for(var i in s){
		console.log(s[i]);
		var t = isQingLaoTou(s[i],fuluMajList);
		console.log(t);
	}*/
	return false;
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
* rongMaj：荣和或者自摸的牌
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合三暗刻返回true，否则返回false
*/
function isSanAnKe(rongMaj,mianzi,fuluMajList,config){
	var keziList = []; //取所有符合条件的刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="angang")
			keziList = keziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	if(!config.isZimo){ //非自摸要考虑是不是暗刻
		if(keziList.indexOf(rongMaj)!=-1)
			keziList.pop(); //不是自摸的去掉这个暗刻
	}
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



//下列役满可以复合，且会清除所有非役满役。

/*
* 获取当前和牌是否是四暗刻
* 参数：
* rongMaj：荣和或者自摸的牌
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合四暗刻返回true，否则返回false
*/
function isSiAnKe(rongMaj,mianzi,fuluMajList,config){
	var keziList = []; //取所有符合条件的刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="angang")
			keziList = keziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	if(!config.isZimo){ //非自摸要考虑是不是暗刻
		if(keziList.indexOf(rongMaj)!=-1)
			keziList.pop(); //不是自摸的去掉这个暗刻
	}
	return keziList.length == 4;
}
/*
* 获取当前和牌是否是四暗刻单骑
* 参数：
* rongMaj：荣和或者自摸的牌
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* config: 配置，详见calcYaku
* 返回值：符合四暗刻单骑返回true，否则返回false
*/
function isSiAnKeDanQi(rongMaj,mianzi,fuluMajList,config){
	return rongMaj == mianzi.header && isSiAnKe(rongMaj,mianzi,fuluMajList,config); //和牌是雀头就行了
}

/*
* 获取当前和牌是否是大三元
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合大三元返回true，否则返回false
*/
function isDaSanYuan(mianzi,fuluMajList){
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var sanyuanList = [];
	for(var i in keziList)
		if(sanYuanMaj.indexOf(keziList[i])!=-1) //三元牌的刻子
			sanyuanList.push(keziList[i]);
	return sanyuanList.length == 3; //三元牌的刻子为3个
}
/*
* 获取当前和牌是否是小四喜
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合大三元返回true，否则返回false
*/
function isXiaoSiXi(mianzi,fuluMajList){
	if(siXiMaj.indexOf(mianzi.header)==-1)
		return false;//雀头必须是四喜牌
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var siXiList = [];
	for(var i in keziList)
		if(siXiMaj.indexOf(keziList[i])!=-1) //四喜牌的刻子
			siXiList.push(keziList[i]);
	return siXiList.length == 3; //四喜牌的刻子为3个
}
/*
* 获取当前和牌是否是大四喜
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合大三元返回true，否则返回false
*/
function isDaSiXi(mianzi,fuluMajList){
	var keziList = []; //取所有刻子
	keziList = keziList.concat(mianzi.kezi);
	for(var i in fuluMajList){
		if(fuluMajList[i].type!="shunzi"){
			keziList = keziList.concat(fuluMajList[i].maj);
		}
	}
	var siXiList = [];
	for(var i in keziList)
		if(siXiMaj.indexOf(keziList[i])!=-1) //四喜牌的刻子
			siXiList.push(keziList[i]);
	return siXiList.length == 4; //四喜牌的刻子为3个
}

/*
* 获取当前和牌是否是字一色
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合字一色返回true，否则返回false
*/
function isZiYiSe(handMajList,fuluMajList){
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for(var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	for(var i in hands)
		if(ziMaj.indexOf(hands[i])==-1)
			return false; //数牌不是字一色
	return true;
}
/*
* 获取当前和牌是否是绿一色
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合绿一色返回true，否则返回false
*/
function isLvYiSe(handMajList,fuluMajList){
	var hands = [];
	hands = hands.concat(handMajList); //所有牌
	for(var i in fuluMajList)
		hands = hands.concat(fuluMajList[i].maj);
	for(var i in hands)
		if(greenMaj.indexOf(hands[i])==-1)
			return false; //不是绿牌
	return true;
}

/*
* 获取当前和牌是否是清老头
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合清老头返回true，否则返回false
*/
function isQingLaoTou(mianzi,fuluMajList){
	if(!isDuiDuiHe(mianzi,fuluMajList))
		return false; //混老头一定对对和
	return isChunQuanDaiYaoJiu(mianzi,fuluMajList);// 对对和 + 纯全带幺九 = 清老头
}
/*
* 获取当前和牌是否是九莲宝灯
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合九莲宝灯返回true，否则返回false
*/
function isJiuLianBaoDeng(handMajList,fuluMajList){
	if(fuluMajList.length > 0)
		return false; //门前清限定，不允许有暗杠
	var jiuLian = [
		[maj.MAN1,maj.MAN1,maj.MAN1,maj.MAN2,maj.MAN3,maj.MAN4,maj.MAN5,maj.MAN6,maj.MAN7,maj.MAN8,maj.MAN9,maj.MAN9,maj.MAN9],
		[maj.PIN1,maj.PIN1,maj.PIN1,maj.PIN2,maj.PIN3,maj.PIN4,maj.PIN5,maj.PIN6,maj.PIN7,maj.PIN8,maj.PIN9,maj.PIN9,maj.PIN9],
		[maj.SOU1,maj.SOU1,maj.SOU1,maj.SOU2,maj.SOU3,maj.SOU4,maj.SOU5,maj.SOU6,maj.SOU7,maj.SOU8,maj.SOU9,maj.SOU9,maj.SOU9]];
	var canWin = []; //列出所有可能
	for(var t in jiuLian)
		for(var i=0;i<9;i++){
			var arr = jiuLian[t].slice();
			arr.push(jiuLian[t][0]+i);
			arr.sort()
			canWin.push(arr.join("-"));
		}
	return canWin.indexOf(handMajList.slice().sort().join("-"))!=-1
}
/*
* 获取当前和牌是否是纯正九莲宝灯
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合纯正九莲宝灯返回true，否则返回false
*/
function isChunZhengJiuLianBaoDeng(handMajList,fuluMajList){
	if(fuluMajList.length > 0)
		return false; //门前清限定，不允许有暗杠
	var jiuLian = [
		[maj.MAN1,maj.MAN1,maj.MAN1,maj.MAN2,maj.MAN3,maj.MAN4,maj.MAN5,maj.MAN6,maj.MAN7,maj.MAN8,maj.MAN9,maj.MAN9,maj.MAN9].sort().join("-"),
		[maj.PIN1,maj.PIN1,maj.PIN1,maj.PIN2,maj.PIN3,maj.PIN4,maj.PIN5,maj.PIN6,maj.PIN7,maj.PIN8,maj.PIN9,maj.PIN9,maj.PIN9].sort().join("-"),
		[maj.SOU1,maj.SOU1,maj.SOU1,maj.SOU2,maj.SOU3,maj.SOU4,maj.SOU5,maj.SOU6,maj.SOU7,maj.SOU8,maj.SOU9,maj.SOU9,maj.SOU9].sort().join("-")];
	var hand = handMajList.slice();
	hand.pop();
	return jiuLian.indexOf(hand.sort().join("-"))!=-1
}

/*
* 获取当前和牌是否是四杠子
* 参数：
* mianzi：面子，maj.calc的单个牌型返回值
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合四杠子返回true，否则返回false
*/
function isSanGangzi(mianzi,fuluMajList){
	var gangziList = []; //取所有杠子
	for(var i in fuluMajList)
		if(fuluMajList[i].type=="angang"||fuluMajList[i].type=="gangzi")
			gangziList = gangziList.concat(fuluMajList[i].maj); //暗杠也是暗刻
	return gangziList.length == 4;
}
/*
* 判断是否是天和
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合天和返回true，否则返回false
*/
function isTianHe(config){
	return config.isTianHe;
}
/*
* 判断是否是地和
* 参数：
* config: 配置，详见calcYaku
* 返回值：符合地和返回true，否则返回false
*/
function isDiHe(config){
	return config.isDiHe;
}
/*
* 判断是否是国士无双
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合国士无双返回true，否则返回false
*/
function isGuoShi(handMajList,fuluMajList){
	if(fuluMajList.length>0)
		return false; //国士不可能副露
	var canWin = []; //列出所有可能
	for(var i in yaojiu){
		var arr = yaojiu.slice();
		arr.push(yaojiu[i]);
		arr.sort()
		canWin.push(arr.join("-"));
	}
	return canWin.indexOf(handMajList.slice().sort().join("-"))!=-1;
}
/*
* 判断是否是国士无双十三面
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合国士无双十三面返回true，否则返回false
*/
function isGuoShiShiSanMian(handMajList,fuluMajList){
	if(fuluMajList.length>0)
		return false; //国士不可能副露
	var m = yaojiu.slice().sort().join("-");
	var hand = handMajList.slice();
	hand.pop();
	return hand.slice().sort().join("-") == m;
}
/*
* 判断是否是七对子
* 参数：
* handMajList：手牌，详见calcYaku
* fuluMajList: 副露牌，详见calcYaku
* 返回值：符合七对子返回true，否则返回false
*/
function isQiDuiZi(handMajList,fuluMajList){
	if(fuluMajList.length>0)
		return false; //七对子不可能副露
	var map = handMajList.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map()) //对手牌计数
	ret = true;
	map.forEach(function(count,key){
		if(count!=2)
			ret = false; // 手牌出现次数不等于2即非七对子
	})
	return ret;
}

var res = calcYaku(
	[maj.MAN1,maj.MAN9,maj.PIN1,maj.PIN9,maj.SOU1,maj.SOU9,maj.TON,maj.NAN,maj.SHA,maj.PEI,maj.HAK,maj.HAT,maj.HAT,maj.CHU],[],{
		isDoubleLiZhi: false, //是否两立直
		isLiZhi: false, //是否立直
		isYiFa: false, //是否一发
		isLingShang: false, //是否领上
		ziFeng: maj.TON, //自风
		changFeng: maj.TON, //场风
		isZimo: false, //是否自摸 
		isLast: false, //是否是河底/海底
		isQiangGang: false, //是否是抢杠
		isTianHe: false, //是否是天和
		isDiHe: false, //是否是地和
	}
);
console.log(res);
