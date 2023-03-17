//测试用例
const JapaneseMaj = require("./dist/japanesemaj.min.js");
var maj = new JapaneseMaj({
	changFeng: 2, // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	ziFeng: 2, // Number类型，自风，东1南2西3北4
	isZimo: false,
	isLiangLiZhi: false,
	isLiZhi: false,
	dora: [JapaneseMaj.getPai("Wanzi", 2)],
	beidora: 0,
	isLast: false,
	isRenHe: false,
	isYanFan: false,
	isGangZhen: false,
	isGuYi: true
});
var paixing = JapaneseMaj.getPaixingFromString("11223344556677z");
var res = maj.getYakuCalculator(paixing);
if(res)
	console.log(res.calcYaku3(maj.state));
console.log(maj.calcXiangting(paixing));