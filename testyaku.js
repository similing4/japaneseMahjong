import YiBeiKou from "./core/yaku/pu_tong_yi/YiBeiKou.js"; //大三元
import Paixing from "./bean/Paixing.js";
import JapaneseMaj from "./JapaneseMaj.js";
import Pai from "./bean/Pai.js";

var m = new JapaneseMaj({
	changFeng: 1,
	ziFeng: 1,
	dora: [new Pai("Wanzi", 1)],
	lidora: [new Pai("Wanzi", 1)],
	isLiangLiZhi: false,
	isLiZhi: false,
	isYiFa: false,
	isLingShang: false,
	isZimo: false,
	isLast: false,
	isQiangGang: false,
	isTianHe: false,
	isDiHe: false
});
var paixing = m.isHele(Paixing.parseFromString("233445m345s45677p"));
var hePaiPaixingList = paixing.hePaiPaixingList;
hePaiPaixingList.map((hePaiPaixing)=>{
	console.log(YiBeiKou.getCurrentYi(hePaiPaixing, m.state));
});