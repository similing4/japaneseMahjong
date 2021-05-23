import ChunQuanDaiYaoJiu from "./core/yaku/pu_tong_yi/ChunQuanDaiYaoJiu.js"; //大三元
import Paixing from "./bean/Paixing.js";
import JapaneseMaj from "./JapaneseMaj.js";
import Pai from "./bean/Pai.js";

var m = new JapaneseMaj({
	changFeng: 1,
	ziFeng: 1,
	dora: [new Pai("Wanzi", 1)],
	lidora: [new Pai("Wanzi", 1)],
	isLiZhi: false,
	isYiFa: false,
	isLingShang: false,
	isZimo: false,
	isLast: false,
	isQiangGang: false,
	isTianHe: false,
	isDiHe: false
});
var paixing = m.isHele(Paixing.parseFromString("111999s99p123s123m"));
var hePaiPaixingList = paixing.hePaiPaixingList;
hePaiPaixingList.map((hePaiPaixing)=>{
	console.log(ChunQuanDaiYaoJiu.getCurrentYi(hePaiPaixing, m.state));
});