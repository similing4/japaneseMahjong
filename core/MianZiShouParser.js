/*
 *	解析类
 *	用于面子手和牌向听数及和牌拆解的解析
 *	使用方法：
 *	var parser = new MianZiShouParser([
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",1),
 		new Pai("Wanzi",2),
 		new Pai("Wanzi",3),
 		new Pai("Wanzi",4),
 		new Pai("Wanzi",5),
 		new Pai("Wanzi",6),
 		new Pai("Wanzi",7),
 		new Pai("Wanzi",8),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 		new Pai("Wanzi",9),
 	]);
 *	对象方法详见注释
 */
import calcMain from "./parser.work.js";
const PaiState = {
	Discard: "DISCARD", //待出牌状态或自摸/荣和状态
	Deal: "DEAL" //待摸牌状态
};
class MianZiShouParser {
	paiList; //传入的手牌
	paiState = PaiState.Discard; //当前手牌状态
	xiangTingCount = -1; //向听数
	divideResult = []; //手牌拆分结果
	/*
	 *	构造方法
	 *	参数：
	 *	paiList：手牌数组，应传入Pai对象的数组
	 *	错误：
	 *	当输入牌不合法时会throw错误，请注意catch
	*/
	constructor(paiList) {
		this.paiList = paiList;
		var hand = [
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0
		];
		var rest = [
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4
		];
		this.paiList.map((pai) => {
			hand[pai.pai_real_ascii]++;
			rest[pai.pai_real_ascii]--;
			if (rest[pai.pai_real_ascii] < 0)
				throw "输入的牌数不正确";
		});
		var calcResult = calcMain(hand, rest);
		this.xiangTingCount = calcResult.xiangTingCount;
		this.paiState = calcResult.type;
		this.divideResult = calcResult.data;
	}

	/*
	* 使用查表法计算手牌对应的所有面子可能
	* 参数：
	* 无
	* 返回值：非面子手和牌牌型返回false，否则返回面子、雀头对象对应的数组
	* 示例：（测试值为22334455667788万）
	    [
	      { header: Pai("Wanzi",1), mianzi: [ Pai("Wanzi",2), Pai("Wanzi",2), Pai("Wanzi",5), Pai("Wanzi",5) ] },
	      { header: Pai("Wanzi",4), mianzi: [ Pai("Wanzi",1), Pai("Wanzi",1), Pai("Wanzi",5), Pai("Wanzi",5) ] },
	      { header: Pai("Wanzi",7), mianzi: [ Pai("Wanzi",1), Pai("Wanzi",1), Pai("Wanzi",4), Pai("Wanzi",4) ] }
	    ]
	   说明：本方法采用查表法计算结果，表的构成结构为：{牌型:[拆分可能]}，其意义如下：
	   牌型：表中的牌型以二进制存储。牌型由牌的数组转换而成。转换方式如下：
	   【表键计算方法】逆向生成二进制数，按照数牌、字牌（一般以Pai的Ascii）顺序逐一遍历。
	   当前牌有1张不计，有2张牌计2个1，3张计4个1，四张计6个1，花色间断或数字间断计01，连续则计0。字牌全部计为数字不连续的不同花色。最终计不连续。
	   例：求手牌22445566m88899s11z的表键：
			22计11：11
			44与22不连续计01：0111
			44计11:110111
			55与44连续计0:0110111
			55计11:110110111
			66与55连续计0：0110110111
			66计11:110110110111
			切换花色为索子计不连续为01：01110110110111
			888计1111:111101110110110111
			99与888连续计0：0111101110110110111
			99计11:110111101110110110111
			切换花色为字牌计不连续为01：01110111101110110110111
			11计11：1101110111101110110110111
			最终计不连续即01：011101110111101110110110111
			转换为十六进制为：0x3BBDDB7
			该牌型在表中不存在故而不能和牌。
		【表值使用方法】表的值为一个数组，其中每一项都是一种可以和牌的牌型。每一项的chunk结构如下（小端模式存储，因此要反过来）：
			struct DevideType {
				byte[3] 刻子数;
				byte[3] 顺字数;
				byte[4] 雀头;
				List<byte[4]> 刻子列表;
				List<byte[4]> 顺子列表;
			}
			其中刻子顺子及雀头给出的都是牌型中对应的下标，应在计算前确定你的每个牌型下标对应的牌是哪一张。
		例：求手牌22334455667788m的所有可能手牌拆分：
			根据【表键计算方法】计算得到该牌型的键为
	*/
	divideMianzi() {
		var hai = this.paiList.map((pai)=>{
			return pai.pai_real_ascii;
		})
		var hand = [
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0, 0, 0,
			0, 0, 0, 0, 0, 0, 0
		];
		this.paiList.map((pai) => {
			hand[pai.pai_real_ascii]++;
		});
		const calc_key = function(n, pos) { //计算得到表中的键 n是34种牌每个个数数组，pos是待返回的14张牌 22334455667788      11111100000001111
			var p = -1;
			var x = 0;
			var pos_p = 0;
			var hasBefore = false; // 是否有上一张牌
			// 数牌
			//逆向，有1张牌计，有2张牌计11，3张计1111，四张计111111，断开计01连续计0。比如22445566778899：，其22为2张2计11，
			for (var i = 0; i < 3; i++) { //遍历万子、筒子、索子
				for (var j = 0; j < 9; j++) { //遍历牌的数字
					if (n[i * 9 + j] == 0) { // 没有这个数牌
						if (hasBefore) { //有上一张牌时
							hasBefore = false; //切换上张牌存在开关
							x |= (0x1 << p); //1
							p++;
						}
					} else {
						p++;
						hasBefore = true;
						pos[pos_p++] = i * 9 + j;
						switch (n[i * 9 + j]) {
							case 2:
								x |= (0x3 << p); //11
								p += 2;
								break;
							case 3:
								x |= (0xF << p); //1111
								p += 4;
								break;
							case 4:
								x |= (0x3F << p); //111111
								p += 6;
								break;
						}
					}
				}
				if (hasBefore) {
					hasBefore = false;
					x |= (0x1 << p);
					p++;
				}
			}
			// 字牌
			for (var i = TON; i <= CHU; i++) {
				if (n[i] > 0) {
					p++;
					pos[pos_p++] = i;
					switch (n[i]) {
						case 2:
							x |= (0x3 << p);
							p += 2;
							break;
						case 3:
							x |= (0xF << p);
							p += 4;
							break;
						case 4:
							x |= (0x3F << p);
							p += 6;
							break;
					}
					x |= (0x1 << p);
					p++;
				}
			}
			return x;
		}
		var pos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		var key = calc_key(hand, pos);
		var ret = tbl[key];
		if (!ret)
			return false;
		var result = [];
		for (var ri in ret) {
			var r = ret[ri];
			var item = {
				header: 0,
				kezi: [],
				shunzi: []
			};
			item.header = (pos[(r >> 6) & 0xF]); //右数第7-10位存储着牌型中的雀头（6789）
			var num_kotsu = r & 0x7; //右数第1-3位存储着刻子数（012）
			var num_shuntsu = (r >> 3) & 0x7; //右数第4-6位存着顺子数（345）
			for (var i = 0; i < num_kotsu; i++) //每个刻子占4位
				item.kezi.push(pos[(r >> (10 + i * 4)) & 0xF]);
			for (var i = 0; i < num_shuntsu; i++) //每个顺子占4位
				item.shunzi.push(pos[(r >> (10 + num_kotsu * 4 + i * 4)) & 0xF]);
			result.push(item);
		}
		return result;
	}
}
export default Parser;