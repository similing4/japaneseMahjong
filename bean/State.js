class State {
	changFeng = 1; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	ziFeng = 1; // Number类型，自风，东1南2西3北4
	dora = []; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
	lidora = []; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
	isLiZhi = false; //是否立直
	isYiFa = false; //是否一发
	isLingShang = false; //是否领上
	isZimo = false; //是否自摸 
	isLast = false; //是否是河底/海底
	isQiangGang = false; //是否是抢杠
	isTianHe = false; //是否是天和
	isDiHe = false; //是否是地和
}
export default State;