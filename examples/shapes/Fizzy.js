(function (lib) {

var Graphics = PIXI.Graphics;
var Container = PIXI.Container;
var MovieClip = PIXI.Container; //TODO Replace
var graphics = PIXI.animate.ShapesCache;

lib.FIZ34_Skate1_PupilR = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1074)
		.tr(2.9,4);

	this.ac(this.shape);
});

lib.FIZ34_Skate1_PupilL = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1073)
		.tr(3.5,4.6);

	this.ac(this.shape);
});

lib.FIZ34_Skate1_Nose = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1171)
		.tr(15.5,18.3);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1172)
		.tr(15.3,35.4);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_Mouth = MovieClip.extend(function(mode,startPosition,loop)
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 5
	this.shape = new Graphics()
		.d(graphics.Graphic_1173)
		.tr(31.2,13.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1174)
		.tr(30.7,14.3);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1175)
		.tr(30.2,13.4);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1176)
		.tr(27.9,18.5);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1177)
		.tr(26.9,23.1);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1178)
		.tr(22.4,20);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_1179)
		.tr(19.7,13.4);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_1180)
		.tr(16.4,8);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_1181)
		.tr(32.6,12.4);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_1182)
		.tr(29.4,9.1);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_1183)
		.tr(30.9,15.4);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_1184)
		.tr(30.2,14.5);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_1185)
		.tr(30.4,14.5);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_1186)
		.tr(31.1,14.7);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_1187)
		.tr(53.5,11.6);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_1188)
		.tr(28.5,9);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_1189)
		.tr(30.9,13.2);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_1190)
		.tr(33,11.2);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_1191)
		.tr(31.3,8.2);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_1192)
		.tr(32,9.2);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_1193)
		.tr(29.3,16.9);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_1194)
		.tr(31.7,22.1);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_1195)
		.tr(27.9,26.6);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_1196)
		.tr(26.9,23.1);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_1197)
		.tr(15.8,8);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_1198)
		.tr(28.3,15.8);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_1199)
		.tr(30,19.3);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_1200)
		.tr(30.1,21.1);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_1201)
		.tr(40.4,40.3);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_1202)
		.tr(27.8,26.6);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_1203)
		.tr(40.4,42.3);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_1204)
		.tr(27.9,27.2);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_1205)
		.tr(31.1,12.8);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_1206)
		.tr(31,15.6);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_1207)
		.tr(31.7,15.5);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_1208)
		.tr(30.1,21.4);

	this.shape_36 = new Graphics()
		.d(graphics.Graphic_1209)
		.tr(36.9,44.6);

	this.shape_37 = new Graphics()
		.d(graphics.Graphic_1210)
		.tr(36.6,44.7);

	this.shape_38 = new Graphics()
		.d(graphics.Graphic_1211)
		.tr(40.6,39.4);

	this.shape_39 = new Graphics()
		.d(graphics.Graphic_1212)
		.tr(27.2,20);

	this.shape_40 = new Graphics()
		.d(graphics.Graphic_1213)
		.tr(36.9,6.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},2).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},2).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},2).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_29},{t:this.shape_28}]},1).to({state:[{t:this.shape_31},{t:this.shape_30}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[]},1).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},2).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).wait(1));

	// Teeth
	this.shape_41 = new Graphics()
		.d(graphics.Graphic_1214)
		.tr(30.8,14.3);

	this.shape_42 = new Graphics()
		.d(graphics.Graphic_1215)
		.tr(30.3,14.3);

	this.shape_43 = new Graphics()
		.d(graphics.Graphic_1216)
		.tr(30.8,10.6);

	this.shape_44 = new Graphics()
		.d(graphics.Graphic_1217)
		.tr(32,9.5);

	this.shape_45 = new Graphics()
		.d(graphics.Graphic_1218)
		.tr(31.9,10.8);

	this.shape_46 = new Graphics()
		.d(graphics.Graphic_1219)
		.tr(32.6,7.7);

	this.shape_47 = new Graphics()
		.d(graphics.Graphic_1220)
		.tr(32.2,7.1);

	this.shape_48 = new Graphics()
		.d(graphics.Graphic_1221)
		.tr(32.7,4.6);

	this.shape_49 = new Graphics()
		.d(graphics.Graphic_1222)
		.tr(32.5,3.9);

	this.shape_50 = new Graphics()
		.d(graphics.Graphic_1223)
		.tr(32.4,5.2);

	this.shape_51 = new Graphics()
		.d(graphics.Graphic_1224)
		.tr(32.6,5.8);

	this.shape_52 = new Graphics()
		.d(graphics.Graphic_1225)
		.tr(25,9);

	this.shape_53 = new Graphics()
		.d(graphics.Graphic_1226)
		.tr(25.8,15.2);

	this.shape_54 = new Graphics()
		.d(graphics.Graphic_1227)
		.tr(23.1,16.4);

	this.shape_55 = new Graphics()
		.d(graphics.Graphic_1228)
		.tr(21.7,10.7);

	this.shape_56 = new Graphics()
		.d(graphics.Graphic_1229)
		.tr(31.9,9);

	this.shape_57 = new Graphics()
		.d(graphics.Graphic_1230)
		.tr(31.8,9.4);

	this.shape_58 = new Graphics()
		.d(graphics.Graphic_1231)
		.tr(32.1,7.6);

	this.shape_59 = new Graphics()
		.d(graphics.Graphic_1232)
		.tr(32.5,8.4);

	this.shape_60 = new Graphics()
		.d(graphics.Graphic_1233)
		.tr(32.4,7);

	this.shape_61 = new Graphics()
		.d(graphics.Graphic_1234)
		.tr(32.7,7.8);

	this.shape_62 = new Graphics()
		.d(graphics.Graphic_1235)
		.tr(32.9,3.3);

	this.shape_63 = new Graphics()
		.d(graphics.Graphic_1236)
		.tr(32.7,2.4);

	this.shape_64 = new Graphics()
		.d(graphics.Graphic_1237)
		.tr(31.9,10.6);

	this.shape_65 = new Graphics()
		.d(graphics.Graphic_1238)
		.tr(31.8,11.8);

	this.shape_66 = new Graphics()
		.d(graphics.Graphic_1239)
		.tr(32.1,7.9);

	this.shape_67 = new Graphics()
		.d(graphics.Graphic_1240)
		.tr(32.2,9);

	this.shape_68 = new Graphics()
		.d(graphics.Graphic_1241)
		.tr(32,9.1);

	this.shape_69 = new Graphics()
		.d(graphics.Graphic_1242)
		.tr(32.2,10);

	this.shape_70 = new Graphics()
		.d(graphics.Graphic_1243)
		.tr(32.3,8.6);

	this.shape_71 = new Graphics()
		.d(graphics.Graphic_1244)
		.tr(32.1,8);

	this.shape_72 = new Graphics()
		.d(graphics.Graphic_1245)
		.tr(30.9,12.2);

	this.shape_73 = new Graphics()
		.d(graphics.Graphic_1246)
		.tr(27.5,9.8);

	this.shape_74 = new Graphics()
		.d(graphics.Graphic_1247)
		.tr(54.9,6.2);

	this.shape_75 = new Graphics()
		.d(graphics.Graphic_1248)
		.tr(27.4,11.9);

	this.shape_76 = new Graphics()
		.d(graphics.Graphic_1249)
		.tr(30.1,14.3);

	this.shape_77 = new Graphics()
		.d(graphics.Graphic_1250)
		.tr(27.5,14);

	this.shape_78 = new Graphics()
		.d(graphics.Graphic_1251)
		.tr(27.9,17.6);

	this.shape_79 = new Graphics()
		.d(graphics.Graphic_1252)
		.tr(26.5,13.8);

	this.shape_80 = new Graphics()
		.d(graphics.Graphic_1253)
		.tr(26.1,19);

	this.shape_81 = new Graphics()
		.d(graphics.Graphic_1254)
		.tr(24.7,8.5);

	this.shape_82 = new Graphics()
		.d(graphics.Graphic_1255)
		.tr(24.8,13.7);

	this.shape_83 = new Graphics()
		.d(graphics.Graphic_1256)
		.tr(21.5,12.9);

	this.shape_84 = new Graphics()
		.d(graphics.Graphic_1257)
		.tr(21.1,8.2);

	this.shape_85 = new Graphics()
		.d(graphics.Graphic_1258)
		.tr(29.5,11);

	this.shape_86 = new Graphics()
		.d(graphics.Graphic_1259)
		.tr(28.9,16.2);

	this.shape_87 = new Graphics()
		.d(graphics.Graphic_1260)
		.tr(28.6,12.5);

	this.shape_88 = new Graphics()
		.d(graphics.Graphic_1261)
		.tr(28.7,11.4);

	this.shape_89 = new Graphics()
		.d(graphics.Graphic_1262)
		.tr(28.9,15.2);

	this.shape_90 = new Graphics()
		.d(graphics.Graphic_1263)
		.tr(26.1,19);

	this.shape_91 = new Graphics()
		.d(graphics.Graphic_1264)
		.tr(26.5,13.8);

	this.shape_92 = new Graphics()
		.d(graphics.Graphic_1265)
		.tr(26.2,19.2);

	this.shape_93 = new Graphics()
		.d(graphics.Graphic_1266)
		.tr(26.6,13.6);

	this.shape_94 = new Graphics()
		.d(graphics.Graphic_1267)
		.tr(36.6,22);

	this.shape_95 = new Graphics()
		.d(graphics.Graphic_1268)
		.tr(30.1,18);

	this.shape_96 = new Graphics()
		.d(graphics.Graphic_1269)
		.tr(31.3,16.9);

	this.shape_97 = new Graphics()
		.d(graphics.Graphic_1270)
		.tr(27.6,14.7);

	this.shape_98 = new Graphics()
		.d(graphics.Graphic_1271)
		.tr(32,11.5);

	this.shape_99 = new Graphics()
		.d(graphics.Graphic_1272)
		.tr(31.8,13.9);

	this.shape_100 = new Graphics()
		.d(graphics.Graphic_1273)
		.tr(32.5,11);

	this.shape_101 = new Graphics()
		.d(graphics.Graphic_1274)
		.tr(32.3,13.5);

	this.shape_102 = new Graphics()
		.d(graphics.Graphic_1275)
		.tr(29.5,23.2);

	this.shape_103 = new Graphics()
		.d(graphics.Graphic_1276)
		.tr(29.2,13.3);

	this.shape_104 = new Graphics()
		.d(graphics.Graphic_1277)
		.tr(18.7,13.7,0.59,0.59);

	this.shape_105 = new Graphics()
		.d(graphics.Graphic_1278)
		.tr(18.9,13.6,0.59,0.59);

	this.shape_106 = new Graphics()
		.d(graphics.Graphic_1279)
		.tr(18.9,16.3,0.59,0.59);

	this.shape_107 = new Graphics()
		.d(graphics.Graphic_1280)
		.tr(27.9,18.5);

	this.shape_108 = new Graphics()
		.d(graphics.Graphic_1281)
		.tr(26.5,21.8);

	this.shape_109 = new Graphics()
		.d(graphics.Graphic_1282)
		.tr(26.2,14.1);

	this.shape_110 = new Graphics()
		.d(graphics.Graphic_1283)
		.tr(36.5,10.8);

	this.shape_111 = new Graphics()
		.d(graphics.Graphic_1284)
		.tr(33.7,8.3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_42},{t:this.shape_41}]}).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},1).to({state:[{t:this.shape_55},{t:this.shape_54}]},1).to({state:[]},1).to({state:[{t:this.shape_57},{t:this.shape_56}]},3).to({state:[{t:this.shape_59},{t:this.shape_58}]},1).to({state:[{t:this.shape_61},{t:this.shape_60}]},1).to({state:[{t:this.shape_49},{t:this.shape_48}]},1).to({state:[{t:this.shape_63},{t:this.shape_62}]},1).to({state:[{t:this.shape_65},{t:this.shape_64}]},1).to({state:[{t:this.shape_67},{t:this.shape_66}]},1).to({state:[{t:this.shape_69},{t:this.shape_68}]},1).to({state:[{t:this.shape_71},{t:this.shape_70}]},1).to({state:[{t:this.shape_73},{t:this.shape_72}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_78},{t:this.shape_77}]},1).to({state:[{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_82},{t:this.shape_81}]},2).to({state:[{t:this.shape_84},{t:this.shape_83}]},1).to({state:[]},1).to({state:[{t:this.shape_85}]},3).to({state:[{t:this.shape_87},{t:this.shape_86}]},1).to({state:[{t:this.shape_89},{t:this.shape_88}]},1).to({state:[{t:this.shape_91},{t:this.shape_90}]},1).to({state:[{t:this.shape_93},{t:this.shape_92}]},1).to({state:[{t:this.shape_95},{t:this.shape_75},{t:this.shape_94}]},1).to({state:[{t:this.shape_97},{t:this.shape_96}]},1).to({state:[{t:this.shape_99},{t:this.shape_98}]},1).to({state:[{t:this.shape_101},{t:this.shape_100}]},1).to({state:[{t:this.shape_103},{t:this.shape_102}]},1).to({state:[]},1).to({state:[{t:this.shape_106},{t:this.shape_105},{t:this.shape_104}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_109},{t:this.shape_108}]},1).to({state:[{t:this.shape_111},{t:this.shape_110}]},1).wait(1));

	// Layer 7
	this.shape_112 = new Graphics()
		.d(graphics.Graphic_1285)
		.tr(26.3,22.4);

	this.shape_113 = new Graphics()
		.d(graphics.Graphic_1286)
		.tr(23.5,18);

	this.shape_114 = new Graphics()
		.d(graphics.Graphic_1287)
		.tr(46.1,17.3);

	this.shape_115 = new Graphics()
		.d(graphics.Graphic_1288)
		.tr(29.7,22.9);

	this.shape_116 = new Graphics()
		.d(graphics.Graphic_1289)
		.tr(26.4,19.2);

	this.shape_117 = new Graphics()
		.d(graphics.Graphic_1290)
		.tr(49.9,14.1);

	this.shape_118 = new Graphics()
		.d(graphics.Graphic_1291)
		.tr(33.4,19.2);

	this.shape_119 = new Graphics()
		.d(graphics.Graphic_1292)
		.tr(35.7,21.5);

	this.shape_120 = new Graphics()
		.d(graphics.Graphic_1293)
		.tr(54.2,12.5);

	this.shape_121 = new Graphics()
		.d(graphics.Graphic_1294)
		.tr(43.7,19);

	this.shape_122 = new Graphics()
		.d(graphics.Graphic_1295)
		.tr(27.5,28.5);

	this.shape_123 = new Graphics()
		.d(graphics.Graphic_1296)
		.tr(23.9,26);

	this.shape_124 = new Graphics()
		.d(graphics.Graphic_1297)
		.tr(19.2,13.4);

	this.shape_125 = new Graphics()
		.d(graphics.Graphic_1298)
		.tr(16.1,7.9);

	this.shape_126 = new Graphics()
		.d(graphics.Graphic_1299)
		.tr(15.3,7.9);

	this.shape_127 = new Graphics()
		.d(graphics.Graphic_1300)
		.tr(35.6,25);

	this.shape_128 = new Graphics()
		.d(graphics.Graphic_1301)
		.tr(35.7,24);

	this.shape_129 = new Graphics()
		.d(graphics.Graphic_1302)
		.tr(53,13.7);

	this.shape_130 = new Graphics()
		.d(graphics.Graphic_1303)
		.tr(32.2,26.2);

	this.shape_131 = new Graphics()
		.d(graphics.Graphic_1304)
		.tr(33.3,25);

	this.shape_132 = new Graphics()
		.d(graphics.Graphic_1305)
		.tr(51,15.1);

	this.shape_133 = new Graphics()
		.d(graphics.Graphic_1306)
		.tr(44.4,31.4);

	this.shape_134 = new Graphics()
		.d(graphics.Graphic_1307)
		.tr(41.6,20.7);

	this.shape_135 = new Graphics()
		.d(graphics.Graphic_1308)
		.tr(35.6,19);

	this.shape_136 = new Graphics()
		.d(graphics.Graphic_1309)
		.tr(54.2,10.8);

	this.shape_137 = new Graphics()
		.d(graphics.Graphic_1310)
		.tr(44.5,33.4);

	this.shape_138 = new Graphics()
		.d(graphics.Graphic_1311)
		.tr(41.5,20.8);

	this.shape_139 = new Graphics()
		.d(graphics.Graphic_1312)
		.tr(36,20.2);

	this.shape_140 = new Graphics()
		.d(graphics.Graphic_1313)
		.tr(54.3,11.3);

	this.shape_141 = new Graphics()
		.d(graphics.Graphic_1314)
		.tr(31.9,23.7);

	this.shape_142 = new Graphics()
		.d(graphics.Graphic_1315)
		.tr(32.3,19.5);

	this.shape_143 = new Graphics()
		.d(graphics.Graphic_1316)
		.tr(25.9,19.1);

	this.shape_144 = new Graphics()
		.d(graphics.Graphic_1317)
		.tr(46,16.1);

	this.shape_145 = new Graphics()
		.d(graphics.Graphic_1318)
		.tr(25,21.7);

	this.shape_146 = new Graphics()
		.d(graphics.Graphic_1319)
		.tr(24.8,23.6);

	this.shape_147 = new Graphics()
		.d(graphics.Graphic_1320)
		.tr(41.1,18.2);

	this.shape_148 = new Graphics()
		.d(graphics.Graphic_1321)
		.tr(35.4,18.4);

	this.shape_149 = new Graphics()
		.d(graphics.Graphic_1322)
		.tr(36.2,18.9);

	this.shape_150 = new Graphics()
		.d(graphics.Graphic_1323)
		.tr(62.9,4.8);

	this.shape_151 = new Graphics()
		.d(graphics.Graphic_1324)
		.tr(36.5,18.4);

	this.shape_152 = new Graphics()
		.d(graphics.Graphic_1325)
		.tr(36.4,17.7);

	this.shape_153 = new Graphics()
		.d(graphics.Graphic_1326)
		.tr(65,3.8);

	this.shape_154 = new Graphics()
		.d(graphics.Graphic_1327)
		.tr(27,22.7);

	this.shape_155 = new Graphics()
		.d(graphics.Graphic_1328)
		.tr(26.3,23.6);

	this.shape_156 = new Graphics()
		.d(graphics.Graphic_1329)
		.tr(43.3,18.4);

	this.shape_157 = new Graphics()
		.d(graphics.Graphic_1330)
		.tr(28,26.6);

	this.shape_158 = new Graphics()
		.d(graphics.Graphic_1331)
		.tr(28.4,27.8);

	this.shape_159 = new Graphics()
		.d(graphics.Graphic_1332)
		.tr(44.2,24.8);

	this.shape_160 = new Graphics()
		.d(graphics.Graphic_1333)
		.tr(32,32.9);

	this.shape_161 = new Graphics()
		.d(graphics.Graphic_1334)
		.tr(38.9,30);

	this.shape_162 = new Graphics()
		.d(graphics.Graphic_1335)
		.tr(27.4,27.4);

	this.shape_163 = new Graphics()
		.d(graphics.Graphic_1336)
		.tr(22.6,22);

	this.shape_164 = new Graphics()
		.d(graphics.Graphic_1337)
		.tr(20.2,13.5);

	this.shape_165 = new Graphics()
		.d(graphics.Graphic_1338)
		.tr(16.5,7.6);

	this.shape_166 = new Graphics()
		.d(graphics.Graphic_1339)
		.tr(16.2,8.1);

	this.shape_167 = new Graphics()
		.d(graphics.Graphic_1340)
		.tr(31.9,23.8);

	this.shape_168 = new Graphics()
		.d(graphics.Graphic_1341)
		.tr(31.9,22.3);

	this.shape_169 = new Graphics()
		.d(graphics.Graphic_1342)
		.tr(44.7,22);

	this.shape_170 = new Graphics()
		.d(graphics.Graphic_1343)
		.tr(32.3,25.7);

	this.shape_171 = new Graphics()
		.d(graphics.Graphic_1344)
		.tr(33.3,24.5);

	this.shape_172 = new Graphics()
		.d(graphics.Graphic_1345)
		.tr(46.5,22.7);

	this.shape_173 = new Graphics()
		.d(graphics.Graphic_1346)
		.tr(32,32.9);

	this.shape_174 = new Graphics()
		.d(graphics.Graphic_1347)
		.tr(38.9,30);

	this.shape_175 = new Graphics()
		.d(graphics.Graphic_1348)
		.tr(31.3,32.7);

	this.shape_176 = new Graphics()
		.d(graphics.Graphic_1349)
		.tr(40.5,29.3);

	this.shape_177 = new Graphics()
		.d(graphics.Graphic_1350)
		.tr(24.6,21.7);

	this.shape_178 = new Graphics()
		.d(graphics.Graphic_1351)
		.tr(25,24.8);

	this.shape_179 = new Graphics()
		.d(graphics.Graphic_1352)
		.tr(36.2,18);

	this.shape_180 = new Graphics()
		.d(graphics.Graphic_1353)
		.tr(35.4,18.4);

	this.shape_181 = new Graphics()
		.d(graphics.Graphic_1354)
		.tr(62.6,8.6);

	this.shape_182 = new Graphics()
		.d(graphics.Graphic_1355)
		.tr(36.5,18.7);

	this.shape_183 = new Graphics()
		.d(graphics.Graphic_1356)
		.tr(36,18.8);

	this.shape_184 = new Graphics()
		.d(graphics.Graphic_1357)
		.tr(63.2,7.8);

	this.shape_185 = new Graphics()
		.d(graphics.Graphic_1358)
		.tr(30.8,23.6);

	this.shape_186 = new Graphics()
		.d(graphics.Graphic_1359)
		.tr(10,24.8);

	this.shape_187 = new Graphics()
		.d(graphics.Graphic_1360)
		.tr(38.2,9.2);

	this.shape_188 = new Graphics()
		.d(graphics.Graphic_1361)
		.tr(34.8,9.4);

	this.shape_189 = new Graphics()
		.d(graphics.Graphic_1362)
		.tr(44,21.2);

	this.shape_190 = new Graphics()
		.d(graphics.Graphic_1363)
		.tr(32.4,5.2);

	this.shape_191 = new Graphics()
		.d(graphics.Graphic_1364)
		.tr(32.6,5.8);

	this.shape_192 = new Graphics()
		.d(graphics.Graphic_1365)
		.tr(27.7,21.5);

	this.shape_193 = new Graphics()
		.d(graphics.Graphic_1366)
		.tr(10.7,23.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_114},{t:this.shape_113},{t:this.shape_112}]},2).to({state:[{t:this.shape_117},{t:this.shape_116},{t:this.shape_115}]},1).to({state:[{t:this.shape_120},{t:this.shape_119},{t:this.shape_118}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[]},1).to({state:[{t:this.shape_129},{t:this.shape_128},{t:this.shape_127}]},1).to({state:[{t:this.shape_132},{t:this.shape_131},{t:this.shape_130}]},1).to({state:[{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133}]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137}]},1).to({state:[{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141}]},1).to({state:[{t:this.shape_147},{t:this.shape_146},{t:this.shape_145}]},1).to({state:[{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_153},{t:this.shape_152},{t:this.shape_151}]},1).to({state:[]},1).to({state:[{t:this.shape_156},{t:this.shape_155},{t:this.shape_154}]},2).to({state:[{t:this.shape_159},{t:this.shape_158},{t:this.shape_157}]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_162}]},2).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[]},1).to({state:[{t:this.shape_169},{t:this.shape_168},{t:this.shape_167}]},1).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170}]},1).to({state:[{t:this.shape_174},{t:this.shape_173}]},1).to({state:[{t:this.shape_176},{t:this.shape_175}]},1).to({state:[{t:this.shape_156},{t:this.shape_155},{t:this.shape_154}]},1).to({state:[{t:this.shape_178},{t:this.shape_177}]},1).to({state:[{t:this.shape_181},{t:this.shape_180},{t:this.shape_179}]},1).to({state:[{t:this.shape_184},{t:this.shape_183},{t:this.shape_182}]},1).to({state:[{t:this.shape_186},{t:this.shape_185}]},1).to({state:[{t:this.shape_188},{t:this.shape_187}]},1).to({state:[]},1).to({state:[{t:this.shape_191},{t:this.shape_190},{t:this.shape_189}]},1).to({state:[{t:this.shape_193},{t:this.shape_192}]},1).to({state:[]},1).wait(1));

});

lib.FIZ34_Skate1_HelmetStrapR_skatenormal = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 2
	this.shape = new Graphics()
		.d(graphics.Graphic_1381)
		.tr(-0.9,-21);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1382)
		.tr(-0.6,-24.8);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(2));

});

lib.FIZ34_Skate1_HelmetStrapL_skatenormal = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 2
	this.shape = new Graphics()
		.d(graphics.Graphic_1084)
		.tr(0.1,55.1);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1085)
		.tr(-1.8,-9);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1086)
		.tr(-0.1,-2);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(6));

});

lib.FIZ34_Skate1_Helmet = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1075)
		.tr(66.8,19.4);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1076)
		.tr(-43.9,-3.2);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1077)
		.tr(-43.5,-1.8);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1078)
		.tr(6.4,6.2);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1079)
		.tr(-13.6,-13.6);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1080)
		.tr(-15.6,-13.6);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_1081)
		.tr(-21.2,-27.2);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_1082)
		.tr(-23,-30.4);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_1083);

	this.ac(this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
});

lib.FIZ34_Skate1_Head = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1374)
		.tr(70.6,139.1);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1375)
		.tr(77.2,121.6);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1376)
		.tr(98.1,220.5);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1377)
		.tr(75.2,122);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1378)
		.tr(72.7,143.4);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1379)
		.tr(79.6,121.4);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_1380)
		.tr(78.6,120.3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

});

lib.FIZ34_Skate1_Hair = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1370)
		.tr(152.1,163.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1371)
		.tr(156,165);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1372)
		.tr(153.7,151.7);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1373)
		.tr(152.3,162.6);

	this.ac(this.shape_3,this.shape_2,this.shape_1,this.shape);
});

lib.FIZ34_Skate1_GlassesMid = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1169)
		.tr(33.5,5.7);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1170)
		.tr(32.1,7.1);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_GlassesArmL = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1166)
		.tr(24.7,7.7,1.007,1,0,0,6.7);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1167)
		.tr(13.3,4.8);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1168)
		.tr(14.3,5.7);

	this.ac(this.shape_2,this.shape_1,this.shape);
});

lib.FIZ34_Skate1_EyeR = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// white
	this.shape = new Graphics()
		.d(graphics.Graphic_1133)
		.tr(19.9,27.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1134)
		.tr(11.5,27.7);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1135)
		.tr(25.6,27.8);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1136)
		.tr(16.2,27.7);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1137)
		.tr(11.5,29.2);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1138)
		.tr(11.8,27.8);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_1139)
		.tr(19.4,27.8);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_1140)
		.tr(22.3,29);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_1141)
		.tr(25.6,27.8);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_1142)
		.tr(16.2,27.7);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_1143)
		.tr(19.9,27.8);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_1144)
		.tr(11.5,27.8);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_1145)
		.tr(25.6,27.8);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_1146)
		.tr(16.2,27.7);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_1147)
		.tr(19.4,36);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_1148)
		.tr(19.9,27.8);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_1149)
		.tr(11.5,27.8);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_1150)
		.tr(25.6,27.8);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_1151)
		.tr(16.2,27.7);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_1152)
		.tr(20.7,35);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_1115)
		.tr(12.8,34.6);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_1154)
		.tr(18.5,47.6);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_1155)
		.tr(12.4,47.6);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_1156)
		.tr(20.2,22.2);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_1157)
		.tr(11.5,23.1);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_1158)
		.tr(25.6,27.8);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_1159)
		.tr(16.2,27.7);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_1160)
		.tr(15.9,52);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_1161)
		.tr(18.1,49.5);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_1162)
		.tr(12.9,49.6);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_1163)
		.tr(20.2,23.8);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_1164)
		.tr(11.5,24.8);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_1165)
		.tr(25.7,27.8);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21}]},1).to({state:[]},1).to({state:[{t:this.shape_3},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},3).wait(1));

});

lib.FIZ34_Skate1_EyeL = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// white
	this.shape = new Graphics()
		.d(graphics.Graphic_1097)
		.tr(20.6,28.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1098)
		.tr(12.4,28.6);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1099)
		.tr(27.2,29.1);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1100)
		.tr(18,28.6);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1101)
		.tr(17.6,28.6);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1102)
		.tr(12.9,28.6);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_1103)
		.tr(12.4,29.6);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_1104)
		.tr(23.6,29.8);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_1105)
		.tr(20.2,28.8);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_1106)
		.tr(18,28.6);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_1107)
		.tr(17.6,28.6);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_1108)
		.tr(20.6,28.8);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_1109)
		.tr(12.4,28.6);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_1110)
		.tr(18,28.6);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_1111)
		.tr(17.6,28.6);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_1112)
		.tr(20.6,28.8);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_1113)
		.tr(12.4,28.6);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_1114)
		.tr(18,28.6);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_1153)
		.tr(14.7,35);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_1116)
		.tr(17.6,28.6);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_1117)
		.tr(19.5,47.5);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_1118)
		.tr(12.3,47.2);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_1119)
		.tr(22.2,21.6);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_1120)
		.tr(12.4,20.9);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_1121)
		.tr(18,28.6);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_1122)
		.tr(16.7,57);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_1123)
		.tr(14.6,54.1);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_1124)
		.tr(17.6,28.6);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_1125)
		.tr(18.9,49.7);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_1126)
		.tr(12.5,49.6);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_1127)
		.tr(22.2,23.7);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_1128)
		.tr(12.4,23.2);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_1129)
		.tr(27.2,29.1);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_1130)
		.tr(18,28.6);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_1131)
		.tr(23.2,51.1);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_1132)
		.tr(17.6,28.6);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_2},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_2},{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_2},{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_2},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28}]},5).wait(1));

});

lib.FIZ34_Skate1_EarL = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1367)
		.tr(18.5,23.7);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1368)
		.tr(19,20.5);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1369)
		.tr(17.6,20.3);

	this.ac(this.shape_2,this.shape_1,this.shape);
});

lib.FIZ34_Skate1_CollarFR = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1071)
		.tr(16.4,18.4);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1072)
		.tr(15.6,20.2);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_CollarBK = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1383)
		.tr(41,27.1);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1384)
		.tr(68.5,7.4);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1385)
		.tr(40.5,26.7);

	this.ac(this.shape_2,this.shape_1,this.shape);
});

lib.FIZ34_Skate1_BrowR = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1093)
		.tr(11,8.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1094)
		.tr(11.4,8.8);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1095)
		.tr(9.9,7.4);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1096)
		.tr(10.2,7.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

});

lib.FIZ34_Skate1_BrowL = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_1087)
		.tr(17,9.3);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1088)
		.tr(16.6,9.4);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_1089)
		.tr(12.3,8.2);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_1090)
		.tr(12.3,8.6);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_1091)
		.tr(18.1,28.7);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_1092)
		.tr(17.8,28.6);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(1));

});

lib.FIZ34_Skate1_Body = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 4
	this.shape = new Graphics()
		.d(graphics.Graphic_341)
		.tr(33.6,95.9);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_342)
		.tr(33.4,57.4);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_343)
		.tr(45.7,57.8);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_344)
		.tr(45.6,96.4);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_345)
		.tr(29.8,19.6);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_346)
		.tr(30.5,20);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_347)
		.tr(79.2,96.4);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_348)
		.tr(79.2,96.1);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_349)
		.tr(24.1,107.6);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_350)
		.tr(24.6,63.7);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_351)
		.tr(46.7,109.8);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_352)
		.tr(47.3,109.4);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_353)
		.tr(23.3,18.2);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_354)
		.tr(79.2,96.1);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_355)
		.tr(30.5,107.8);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_356)
		.tr(30.7,106.6);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_357)
		.tr(39.7,106.9);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_358)
		.tr(40,64.7);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_359)
		.tr(31.5,27.8);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_360)
		.tr(31.3,23.3);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_361)
		.tr(29.8,23.1);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_362)
		.tr(30,27.2);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_363)
		.tr(30.2,104.9);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_364)
		.tr(31,125.3);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_365)
		.tr(30.7,120.1);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_366)
		.tr(9.4,82.1);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_367)
		.tr(14.1,63.7);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_368)
		.tr(16.9,107.6);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_369)
		.tr(17.9,61.5);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_370)
		.tr(25.4,108.9);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_371)
		.tr(26.1,62.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape},{t:this.shape_1}]},1).to({state:[]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).to({state:[{t:this.shape_4}]},4).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},4).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},5).to({state:[]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},3).to({state:[]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13},{t:this.shape_6}]},1).to({state:[]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_15},{t:this.shape_14}]},1).to({state:[]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},1).to({state:[]},1).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]},1).to({state:[]},1).to({state:[{t:this.shape_26},{t:this.shape_25}]},2).to({state:[]},1).to({state:[{t:this.shape_28},{t:this.shape_27}]},1).to({state:[]},1).to({state:[{t:this.shape_30},{t:this.shape_29}]},1).to({state:[]},1).wait(27));

	// Layer 3
	this.shape_31 = new Graphics()
		.d(graphics.Graphic_372)
		.tr(51.4,11.7);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_373)
		.tr(48.5,77.6);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_374)
		.tr(28.4,29.5);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_375)
		.tr(31.1,78.6);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_376)
		.tr(37.8,12.1);

	this.shape_36 = new Graphics()
		.d(graphics.Graphic_377)
		.tr(37.4,28.4);

	this.shape_37 = new Graphics()
		.d(graphics.Graphic_378)
		.tr(37.6,28.4);

	this.shape_38 = new Graphics()
		.d(graphics.Graphic_379)
		.tr(44.6,26.8);

	this.shape_39 = new Graphics()
		.d(graphics.Graphic_380)
		.tr(44.7,26.9);

	this.shape_40 = new Graphics()
		.d(graphics.Graphic_381)
		.tr(71.9,100.2);

	this.shape_41 = new Graphics()
		.d(graphics.Graphic_382)
		.tr(72.4,99.5);

	this.shape_42 = new Graphics()
		.d(graphics.Graphic_383)
		.tr(39.7,33.6);

	this.shape_43 = new Graphics()
		.d(graphics.Graphic_384)
		.tr(40,33.7);

	this.shape_44 = new Graphics()
		.d(graphics.Graphic_385)
		.tr(59.5,60.9);

	this.shape_45 = new Graphics()
		.d(graphics.Graphic_386)
		.tr(45.8,128.8);

	this.shape_46 = new Graphics()
		.d(graphics.Graphic_387)
		.tr(25.8,32.3);

	this.shape_47 = new Graphics()
		.d(graphics.Graphic_388)
		.tr(27.8,12.9);

	this.shape_48 = new Graphics()
		.d(graphics.Graphic_389)
		.tr(37.3,63.6);

	this.shape_49 = new Graphics()
		.d(graphics.Graphic_390)
		.tr(45.4,80.7);

	this.shape_50 = new Graphics()
		.d(graphics.Graphic_391)
		.tr(33.8,50.2);

	this.shape_51 = new Graphics()
		.d(graphics.Graphic_392)
		.tr(56.2,108);

	this.shape_52 = new Graphics()
		.d(graphics.Graphic_393)
		.tr(56.6,81.6);

	this.shape_53 = new Graphics()
		.d(graphics.Graphic_394)
		.tr(55.9,80.1);

	this.shape_54 = new Graphics()
		.d(graphics.Graphic_395)
		.tr(30.5,124.1);

	this.shape_55 = new Graphics()
		.d(graphics.Graphic_396)
		.tr(31.3,122.5);

	this.shape_56 = new Graphics()
		.d(graphics.Graphic_397)
		.tr(30.7,121.5);

	this.shape_57 = new Graphics()
		.d(graphics.Graphic_398)
		.tr(31.2,120.4);

	this.shape_58 = new Graphics()
		.d(graphics.Graphic_399)
		.tr(26.5,79.8);

	this.shape_59 = new Graphics()
		.d(graphics.Graphic_400)
		.tr(48.4,90.2);

	this.shape_60 = new Graphics()
		.d(graphics.Graphic_401)
		.tr(48.5,89.2);

	this.shape_61 = new Graphics()
		.d(graphics.Graphic_402)
		.tr(41.9,89.7);

	this.shape_62 = new Graphics()
		.d(graphics.Graphic_403)
		.tr(42,88.7);

	this.shape_63 = new Graphics()
		.d(graphics.Graphic_404)
		.tr(27.6,32.3);

	this.shape_64 = new Graphics()
		.d(graphics.Graphic_405)
		.tr(27.6,32.1);

	this.shape_65 = new Graphics()
		.d(graphics.Graphic_406)
		.tr(45,62.1);

	this.shape_66 = new Graphics()
		.d(graphics.Graphic_407)
		.tr(31,109.9);

	this.shape_67 = new Graphics()
		.d(graphics.Graphic_408)
		.tr(18.1,127);

	this.shape_68 = new Graphics()
		.d(graphics.Graphic_409)
		.tr(23,27.3);

	this.shape_69 = new Graphics()
		.d(graphics.Graphic_410)
		.tr(23.1,60.5);

	this.shape_70 = new Graphics()
		.d(graphics.Graphic_411)
		.tr(41.4,9.1);

	this.shape_71 = new Graphics()
		.d(graphics.Graphic_412)
		.tr(23.5,76.5);

	this.shape_72 = new Graphics()
		.d(graphics.Graphic_413)
		.tr(39.8,111.1);

	this.shape_73 = new Graphics()
		.d(graphics.Graphic_414)
		.tr(27.4,128.2);

	this.shape_74 = new Graphics()
		.d(graphics.Graphic_415)
		.tr(27.9,28.7);

	this.shape_75 = new Graphics()
		.d(graphics.Graphic_416)
		.tr(43.3,10.4);

	this.shape_76 = new Graphics()
		.d(graphics.Graphic_417)
		.tr(28.9,60.8);

	this.shape_77 = new Graphics()
		.d(graphics.Graphic_418)
		.tr(29.3,77.5);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31}]}).to({state:[]},1).to({state:[{t:this.shape_37},{t:this.shape_36}]},5).to({state:[{t:this.shape_37},{t:this.shape_36}]},1).to({state:[]},1).to({state:[{t:this.shape_39},{t:this.shape_38}]},1).to({state:[]},1).to({state:[{t:this.shape_41},{t:this.shape_40}]},4).to({state:[]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},1).to({state:[]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},4).to({state:[]},1).to({state:[{t:this.shape_43},{t:this.shape_42}]},5).to({state:[]},1).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]},5).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_53}]},1).to({state:[]},1).to({state:[{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_57},{t:this.shape_56}]},1).to({state:[]},1).to({state:[{t:this.shape_58}]},1).to({state:[]},1).to({state:[{t:this.shape_60},{t:this.shape_59}]},1).to({state:[{t:this.shape_62},{t:this.shape_61}]},1).to({state:[]},1).to({state:[{t:this.shape_64},{t:this.shape_63}]},3).to({state:[]},1).to({state:[{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65}]},1).to({state:[]},1).to({state:[{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72}]},1).to({state:[]},1).wait(27));

	// Layer 2
	this.shape_78 = new Graphics()
		.d(graphics.Graphic_419)
		.tr(31.3,75.7);

	this.shape_79 = new Graphics()
		.d(graphics.Graphic_420)
		.tr(39,54.9);

	this.shape_80 = new Graphics()
		.d(graphics.Graphic_421)
		.tr(54.8,55.3);

	this.shape_81 = new Graphics()
		.d(graphics.Graphic_422)
		.tr(33.2,120.2);

	this.shape_82 = new Graphics()
		.d(graphics.Graphic_423)
		.tr(34.2,12.2);

	this.shape_83 = new Graphics()
		.d(graphics.Graphic_424)
		.tr(29,56.2);

	this.shape_84 = new Graphics()
		.d(graphics.Graphic_425)
		.tr(33.2,77.5);

	this.shape_85 = new Graphics()
		.d(graphics.Graphic_426)
		.tr(33.3,117);

	this.shape_86 = new Graphics()
		.d(graphics.Graphic_427)
		.tr(34.2,12.2);

	this.shape_87 = new Graphics()
		.d(graphics.Graphic_428)
		.tr(33.2,74.1);

	this.shape_88 = new Graphics()
		.d(graphics.Graphic_429)
		.tr(48.9,54.3);

	this.shape_89 = new Graphics()
		.d(graphics.Graphic_430)
		.tr(60.7,55.7);

	this.shape_90 = new Graphics()
		.d(graphics.Graphic_431)
		.tr(44.2,116.8);

	this.shape_91 = new Graphics()
		.d(graphics.Graphic_432)
		.tr(34,12.1);

	this.shape_92 = new Graphics()
		.d(graphics.Graphic_433)
		.tr(41.4,54.7);

	this.shape_93 = new Graphics()
		.d(graphics.Graphic_434)
		.tr(44.5,74.6);

	this.shape_94 = new Graphics()
		.d(graphics.Graphic_435)
		.tr(74.8,54.4);

	this.shape_95 = new Graphics()
		.d(graphics.Graphic_436)
		.tr(38.1,33.5);

	this.shape_96 = new Graphics()
		.d(graphics.Graphic_437)
		.tr(35.5,13.5);

	this.shape_97 = new Graphics()
		.d(graphics.Graphic_438)
		.tr(72.9,116.7);

	this.shape_98 = new Graphics()
		.d(graphics.Graphic_439)
		.tr(55.8,59.5);

	this.shape_99 = new Graphics()
		.d(graphics.Graphic_440)
		.tr(61.4,73.7);

	this.shape_100 = new Graphics()
		.d(graphics.Graphic_441)
		.tr(48.1,63);

	this.shape_101 = new Graphics()
		.d(graphics.Graphic_442)
		.tr(44,60);

	this.shape_102 = new Graphics()
		.d(graphics.Graphic_443)
		.tr(38.3,108.9);

	this.shape_103 = new Graphics()
		.d(graphics.Graphic_444)
		.tr(26.2,123.1);

	this.shape_104 = new Graphics()
		.d(graphics.Graphic_445)
		.tr(13.5,29.7);

	this.shape_105 = new Graphics()
		.d(graphics.Graphic_446)
		.tr(24.3,10.2);

	this.shape_106 = new Graphics()
		.d(graphics.Graphic_447)
		.tr(17.7,61.4);

	this.shape_107 = new Graphics()
		.d(graphics.Graphic_448)
		.tr(25.2,75.4);

	this.shape_108 = new Graphics()
		.d(graphics.Graphic_449)
		.tr(64,60.9);

	this.shape_109 = new Graphics()
		.d(graphics.Graphic_450)
		.tr(56.4,127.3);

	this.shape_110 = new Graphics()
		.d(graphics.Graphic_451)
		.tr(30.3,34.1);

	this.shape_111 = new Graphics()
		.d(graphics.Graphic_452)
		.tr(30.3,13.9);

	this.shape_112 = new Graphics()
		.d(graphics.Graphic_453)
		.tr(44.8,64.3);

	this.shape_113 = new Graphics()
		.d(graphics.Graphic_454)
		.tr(50.6,78.6);

	this.shape_114 = new Graphics()
		.d(graphics.Graphic_455)
		.tr(35.5,13.7);

	this.shape_115 = new Graphics()
		.d(graphics.Graphic_456)
		.tr(79.9,113.1);

	this.shape_116 = new Graphics()
		.d(graphics.Graphic_457)
		.tr(77.3,51.8);

	this.shape_117 = new Graphics()
		.d(graphics.Graphic_458)
		.tr(59.6,58.8);

	this.shape_118 = new Graphics()
		.d(graphics.Graphic_459)
		.tr(39.7,33.6);

	this.shape_119 = new Graphics()
		.d(graphics.Graphic_460)
		.tr(54.6,102.4);

	this.shape_120 = new Graphics()
		.d(graphics.Graphic_461)
		.tr(64.8,72.2);

	this.shape_121 = new Graphics()
		.d(graphics.Graphic_462)
		.tr(51.4,11.7);

	this.shape_122 = new Graphics()
		.d(graphics.Graphic_463)
		.tr(31.3,75.7);

	this.shape_123 = new Graphics()
		.d(graphics.Graphic_464)
		.tr(48.5,77.6);

	this.shape_124 = new Graphics()
		.d(graphics.Graphic_465)
		.tr(31.3,75.7);

	this.shape_125 = new Graphics()
		.d(graphics.Graphic_466)
		.tr(48.5,77.6);

	this.shape_126 = new Graphics()
		.d(graphics.Graphic_467)
		.tr(57.2,63.3);

	this.shape_127 = new Graphics()
		.d(graphics.Graphic_468)
		.tr(38.1,124.6);

	this.shape_128 = new Graphics()
		.d(graphics.Graphic_469)
		.tr(28.9,33.5);

	this.shape_129 = new Graphics()
		.d(graphics.Graphic_470)
		.tr(33.7,65.1);

	this.shape_130 = new Graphics()
		.d(graphics.Graphic_471)
		.tr(33.3,14.7);

	this.shape_131 = new Graphics()
		.d(graphics.Graphic_472)
		.tr(38.3,78);

	this.shape_132 = new Graphics()
		.d(graphics.Graphic_473)
		.tr(31.2,51.7);

	this.shape_133 = new Graphics()
		.d(graphics.Graphic_474)
		.tr(63.9,52.4);

	this.shape_134 = new Graphics()
		.d(graphics.Graphic_475)
		.tr(36.5,11.7);

	this.shape_135 = new Graphics()
		.d(graphics.Graphic_476)
		.tr(43.2,54.6);

	this.shape_136 = new Graphics()
		.d(graphics.Graphic_477)
		.tr(47.5,110.8);

	this.shape_137 = new Graphics()
		.d(graphics.Graphic_478)
		.tr(47.6,73.6);

	this.shape_138 = new Graphics()
		.d(graphics.Graphic_479)
		.tr(26.3,50.7);

	this.shape_139 = new Graphics()
		.d(graphics.Graphic_480)
		.tr(60.9,54.1);

	this.shape_140 = new Graphics()
		.d(graphics.Graphic_481)
		.tr(38.8,109.3);

	this.shape_141 = new Graphics()
		.d(graphics.Graphic_482)
		.tr(36.4,54.3);

	this.shape_142 = new Graphics()
		.d(graphics.Graphic_483)
		.tr(36.7,11.6);

	this.shape_143 = new Graphics()
		.d(graphics.Graphic_484)
		.tr(39.9,72.7);

	this.shape_144 = new Graphics()
		.d(graphics.Graphic_485)
		.tr(31.3,75.7);

	this.shape_145 = new Graphics()
		.d(graphics.Graphic_486)
		.tr(48.5,77.6);

	this.shape_146 = new Graphics()
		.d(graphics.Graphic_487)
		.tr(33.5,59.6);

	this.shape_147 = new Graphics()
		.d(graphics.Graphic_488)
		.tr(-16.9,80.7);

	this.shape_148 = new Graphics()
		.d(graphics.Graphic_489)
		.tr(37.8,12.4);

	this.shape_149 = new Graphics()
		.d(graphics.Graphic_490)
		.tr(26.1,56.4);

	this.shape_150 = new Graphics()
		.d(graphics.Graphic_491)
		.tr(6.6,55.9);

	this.shape_151 = new Graphics()
		.d(graphics.Graphic_492)
		.tr(33.5,62.1);

	this.shape_152 = new Graphics()
		.d(graphics.Graphic_493)
		.tr(51.7,63.3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_78}]}).to({state:[]},2).to({state:[{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]},4).to({state:[{t:this.shape_87},{t:this.shape_83},{t:this.shape_86},{t:this.shape_85},{t:this.shape_80},{t:this.shape_79}]},1).to({state:[]},1).to({state:[{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88}]},1).to({state:[]},1).to({state:[{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94}]},4).to({state:[]},1).to({state:[{t:this.shape_100}]},1).to({state:[]},1).to({state:[{t:this.shape_100}]},4).to({state:[]},1).to({state:[{t:this.shape_100}]},5).to({state:[]},1).to({state:[{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101}]},3).to({state:[]},1).to({state:[{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108}]},2).to({state:[{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114}]},1).to({state:[]},1).to({state:[{t:this.shape_123},{t:this.shape_122},{t:this.shape_121}]},1).to({state:[{t:this.shape_125},{t:this.shape_124},{t:this.shape_121}]},1).to({state:[]},1).to({state:[{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126}]},1).to({state:[]},1).to({state:[{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132}]},1).to({state:[{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138}]},1).to({state:[{t:this.shape_145},{t:this.shape_144},{t:this.shape_121}]},1).to({state:[]},1).to({state:[{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146}]},2).to({state:[]},1).to({state:[{t:this.shape_152},{t:this.shape_151}]},3).to({state:[]},1).wait(27));

	// Layer 1
	this.shape_153 = new Graphics()
		.d(graphics.Graphic_494)
		.tr(27.9,63.7);

	this.shape_154 = new Graphics()
		.d(graphics.Graphic_495)
		.tr(27.4,35);

	this.shape_155 = new Graphics()
		.d(graphics.Graphic_496)
		.tr(28.4,29.5);

	this.shape_156 = new Graphics()
		.d(graphics.Graphic_497)
		.tr(37.8,12.1);

	this.shape_157 = new Graphics()
		.d(graphics.Graphic_498)
		.tr(31.3,73.8);

	this.shape_158 = new Graphics()
		.d(graphics.Graphic_499)
		.tr(31.1,73.1);

	this.shape_159 = new Graphics()
		.d(graphics.Graphic_500)
		.tr(76.6,52.2);

	this.shape_160 = new Graphics()
		.d(graphics.Graphic_501)
		.tr(39.7,33.6);

	this.shape_161 = new Graphics()
		.d(graphics.Graphic_502)
		.tr(35.5,13.7);

	this.shape_162 = new Graphics()
		.d(graphics.Graphic_503)
		.tr(79.9,113.1);

	this.shape_163 = new Graphics()
		.d(graphics.Graphic_504)
		.tr(58.9,59.3);

	this.shape_164 = new Graphics()
		.d(graphics.Graphic_505)
		.tr(64.8,72.2);

	this.shape_165 = new Graphics()
		.d(graphics.Graphic_506)
		.tr(28.4,29.5);

	this.shape_166 = new Graphics()
		.d(graphics.Graphic_507)
		.tr(27.9,63.7);

	this.shape_167 = new Graphics()
		.d(graphics.Graphic_508)
		.tr(31.1,78.6);

	this.shape_168 = new Graphics()
		.d(graphics.Graphic_509)
		.tr(37.8,12.1);

	this.shape_169 = new Graphics()
		.d(graphics.Graphic_510)
		.tr(31.1,78.6);

	this.shape_170 = new Graphics()
		.d(graphics.Graphic_511)
		.tr(31.1,78.6);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_154},{t:this.shape_153}]}).to({state:[{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155}]},1).to({state:[]},1).to({state:[{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159}]},14).to({state:[]},1).to({state:[{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159}]},4).to({state:[]},1).to({state:[{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159}]},5).to({state:[]},1).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165}]},9).to({state:[{t:this.shape_168},{t:this.shape_169},{t:this.shape_166},{t:this.shape_165}]},1).to({state:[]},1).to({state:[{t:this.shape_168},{t:this.shape_170},{t:this.shape_166},{t:this.shape_165}]},5).to({state:[]},1).wait(34));

});

lib.FIZ34_Skate1_ArmStrapR = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_179)
		.tr(9.4,9.1);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_180)
		.tr(9.5,9.3);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_ArmPadL = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_284)
		.tr(0,-0.4);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_285);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_ApronTieBK = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_687)
		.tr(10,15.1);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_688)
		.tr(11.1,15.2);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_ApronTie = Container.extend(function()
{
	Container.call(this);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_337)
		.tr(32.1,6.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_338)
		.tr(32.1,6.6);

	this.ac(this.shape_1,this.shape);
});

lib.FIZ34_Skate1_Apron_flap = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// rocket
	this.shape = new Graphics()
		.d(graphics.Graphic_170)
		.tr(64,86.7);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_171)
		.tr(66.7,85.5);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_172)
		.tr(66.7,86);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},11).wait(1));

	// line
	this.shape_3 = new Graphics()
		.d(graphics.Graphic_156)
		.tr(58,78.7);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_157)
		.tr(58.2,78.1);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},11).wait(1));

	// Layer 7
	this.shape_5 = new Graphics()
		.d(graphics.Graphic_175)
		.tr(74,150);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_176)
		.tr(74.3,150.1);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_6},{t:this.shape_5}]},11).wait(1));

});

lib.FIZ34_Skate1_Apron = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_0)
		.tr(-6.7,4.7)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.shape).wait(17).to({_off:false},0).to({_off:true},1).wait(83));

	// rocket
	this.shape_1 = new Graphics()
		.d(graphics.Graphic_1)
		.tr(31.7,84.9);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_2)
		.tr(31.5,83.4);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_3)
		.tr(31.4,83.3);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_4)
		.tr(-59,66.1);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_5)
		.tr(-59.5,64.8);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_6)
		.tr(-59.5,64.7);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_7)
		.tr(-37.3,66.3);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_8)
		.tr(-38.1,64.8);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_9)
		.tr(-38.7,64.5);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_10)
		.tr(-71,67.8);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_11)
		.tr(-71.1,66.3);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_12)
		.tr(-71.2,66.2);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_13)
		.tr(-108.8,81.8);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_14)
		.tr(-107.1,80.1);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_15)
		.tr(-106.5,79.8);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_16)
		.tr(-31.7,15.3);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_17)
		.tr(-32.3,6.5);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_18)
		.tr(-28.2,14.2);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_19)
		.tr(-28,14);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_20)
		.tr(12.9,80.2);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_21)
		.tr(13.3,78.5);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_22)
		.tr(13.3,78.3);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_23)
		.tr(8,81,1,1,3.8);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_24)
		.tr(8,79.5,1,1,3.8);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_25)
		.tr(8,79.4,1,1,3.8);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_26)
		.tr(5.4,80.8);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_27)
		.tr(4.8,79.5);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_28)
		.tr(4.8,79.5);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_29)
		.tr(11,84.2);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_30)
		.tr(10.9,82.7);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_31)
		.tr(10.9,82.6);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_32)
		.tr(15.9,84.9);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_33)
		.tr(16.4,83.4);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_34)
		.tr(16.3,83.2);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_35)
		.tr(16.4,85);

	this.shape_36 = new Graphics()
		.d(graphics.Graphic_36)
		.tr(16.9,83.5);

	this.shape_37 = new Graphics()
		.d(graphics.Graphic_37)
		.tr(16.9,83.3);

	this.shape_38 = new Graphics()
		.d(graphics.Graphic_38)
		.tr(12.8,84.6);

	this.shape_39 = new Graphics()
		.d(graphics.Graphic_39)
		.tr(13.1,83);

	this.shape_40 = new Graphics()
		.d(graphics.Graphic_40)
		.tr(13,82.8);

	this.shape_41 = new Graphics()
		.d(graphics.Graphic_41)
		.tr(9.6,84.2);

	this.shape_42 = new Graphics()
		.d(graphics.Graphic_42)
		.tr(9.4,82.7);

	this.shape_43 = new Graphics()
		.d(graphics.Graphic_43)
		.tr(9.4,82.7);

	this.shape_44 = new Graphics()
		.d(graphics.Graphic_44)
		.tr(-93.8,64.9);

	this.shape_45 = new Graphics()
		.d(graphics.Graphic_45)
		.tr(-92.9,63.2);

	this.shape_46 = new Graphics()
		.d(graphics.Graphic_46)
		.tr(-93,63.1);

	this.shape_47 = new Graphics()
		.d(graphics.Graphic_47)
		.tr(-92.9,71.9);

	this.shape_48 = new Graphics()
		.d(graphics.Graphic_48)
		.tr(-90.3,70.9);

	this.shape_49 = new Graphics()
		.d(graphics.Graphic_49)
		.tr(-90.3,70.5);

	this.shape_50 = new Graphics()
		.d(graphics.Graphic_50)
		.tr(64.8,85.6,1,1,2.3);

	this.shape_51 = new Graphics()
		.d(graphics.Graphic_51)
		.tr(67.4,84.7,1,1,2.3);

	this.shape_52 = new Graphics()
		.d(graphics.Graphic_52)
		.tr(67.4,85.1,1,1,2.3);

	this.shape_53 = new Graphics()
		.d(graphics.Graphic_53)
		.tr(34.3,84.3);

	this.shape_54 = new Graphics()
		.d(graphics.Graphic_54)
		.tr(34.2,82.7);

	this.shape_55 = new Graphics()
		.d(graphics.Graphic_55)
		.tr(34.3,82.6);

	this.shape_56 = new Graphics()
		.d(graphics.Graphic_56)
		.tr(20.2,83.7);

	this.shape_57 = new Graphics()
		.d(graphics.Graphic_57)
		.tr(19.2,82.6);

	this.shape_58 = new Graphics()
		.d(graphics.Graphic_58)
		.tr(19.3,82.7);

	this.shape_59 = new Graphics()
		.d(graphics.Graphic_59)
		.tr(19,89);

	this.shape_60 = new Graphics()
		.d(graphics.Graphic_60)
		.tr(18.4,87.5);

	this.shape_61 = new Graphics()
		.d(graphics.Graphic_61)
		.tr(18.5,87.7);

	this.shape_62 = new Graphics()
		.d(graphics.Graphic_62)
		.tr(45.3,82);

	this.shape_63 = new Graphics()
		.d(graphics.Graphic_63)
		.tr(44.9,80.4);

	this.shape_64 = new Graphics()
		.d(graphics.Graphic_64)
		.tr(44.9,80.6);

	this.shape_65 = new Graphics()
		.d(graphics.Graphic_65)
		.tr(9.8,61.1);

	this.shape_66 = new Graphics()
		.d(graphics.Graphic_66)
		.tr(11.5,58.2);

	this.shape_67 = new Graphics()
		.d(graphics.Graphic_67)
		.tr(11.7,58.7);

	this.shape_68 = new Graphics()
		.d(graphics.Graphic_68)
		.tr(24.5,87);

	this.shape_69 = new Graphics()
		.d(graphics.Graphic_69)
		.tr(23.3,85.9);

	this.shape_70 = new Graphics()
		.d(graphics.Graphic_70)
		.tr(23.4,86);

	this.shape_71 = new Graphics()
		.d(graphics.Graphic_71)
		.tr(62.9,83.4);

	this.shape_72 = new Graphics()
		.d(graphics.Graphic_72)
		.tr(65.5,82.3);

	this.shape_73 = new Graphics()
		.d(graphics.Graphic_73)
		.tr(65.5,81.9);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},2).to({state:[]},1).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},2).to({state:[]},1).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},3).to({state:[]},1).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},3).to({state:[]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},1).to({state:[]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},1).to({state:[]},1).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[]},1).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23}]},1).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).to({state:[]},1).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},2).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32}]},1).to({state:[]},1).to({state:[{t:this.shape_37,p:{rotation:0,x:16.9,y:83.3}},{t:this.shape_36,p:{rotation:0,x:16.9,y:83.5}},{t:this.shape_35,p:{rotation:0,x:16.4,y:85}}]},1).to({state:[{t:this.shape_37,p:{rotation:0,x:16.9,y:83.3}},{t:this.shape_36,p:{rotation:0,x:16.9,y:83.5}},{t:this.shape_35,p:{rotation:0,x:16.4,y:85}}]},1).to({state:[{t:this.shape_37,p:{rotation:2,x:15,y:83}},{t:this.shape_36,p:{rotation:2,x:15.1,y:83.2}},{t:this.shape_35,p:{rotation:2,x:14.5,y:84.8}}]},1).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38}]},1).to({state:[]},1).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]},1).to({state:[]},1).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]},1).to({state:[]},1).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]},1).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:1,scaleY:1,rotation:0,x:-90.3,y:70.5}},{t:this.shape_48,p:{scaleX:1,scaleY:1,rotation:0,x:-90.3,y:70.9}},{t:this.shape_47,p:{scaleX:1,scaleY:1,rotation:0,x:-92.9,y:71.9}}]},1).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:69.1,y:82.9}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:69.2,y:83.3}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:66.7,y:84.7}}]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:69.1,y:82.9}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:69.2,y:83.3}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-7,x:66.7,y:84.7}}]},1).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},1).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},2).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},2).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},1).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},1).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.7,y:83}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:68.8,y:83.4}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:-5,x:66.3,y:84.7}}]},2).to({state:[]},1).to({state:[{t:this.shape_49,p:{scaleX:0.999,scaleY:0.999,rotation:2.5,x:61.9,y:85.2}},{t:this.shape_48,p:{scaleX:0.999,scaleY:0.999,rotation:2.5,x:61.9,y:85.6}},{t:this.shape_47,p:{scaleX:0.999,scaleY:0.999,rotation:2.5,x:59.3,y:86.6}}]},1).to({state:[{t:this.shape_49,p:{scaleX:0.998,scaleY:0.998,rotation:21.4,x:27.8,y:84.5}},{t:this.shape_48,p:{scaleX:0.998,scaleY:0.998,rotation:21.4,x:27.6,y:84.9}},{t:this.shape_47,p:{scaleX:0.998,scaleY:0.998,rotation:21.4,x:24.9,y:84.9}}]},1).to({state:[{t:this.shape_49,p:{scaleX:0.998,scaleY:0.998,rotation:23.2,x:28.2,y:84.5}},{t:this.shape_48,p:{scaleX:0.998,scaleY:0.998,rotation:23.2,x:28.1,y:84.9}},{t:this.shape_47,p:{scaleX:0.998,scaleY:0.998,rotation:23.2,x:25.3,y:84.8}}]},1).to({state:[{t:this.shape_55},{t:this.shape_54},{t:this.shape_53}]},1).to({state:[]},1).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56}]},1).to({state:[]},1).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59}]},2).to({state:[]},1).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62}]},7).to({state:[]},1).to({state:[{t:this.shape_67},{t:this.shape_66},{t:this.shape_65}]},7).to({state:[]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68}]},9).to({state:[]},1).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},1).to({state:[]},1).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},1).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},1).to({state:[]},1).wait(2));

	// line
	this.shape_74 = new Graphics()
		.d(graphics.Graphic_74)
		.tr(-64.5,70);

	this.shape_75 = new Graphics()
		.d(graphics.Graphic_75)
		.tr(-64.6,70);

	this.shape_76 = new Graphics()
		.d(graphics.Graphic_76)
		.tr(-52.8,68.8);

	this.shape_77 = new Graphics()
		.d(graphics.Graphic_77)
		.tr(-52.8,68.7);

	this.shape_78 = new Graphics()
		.d(graphics.Graphic_78)
		.tr(-58.7,72.6);

	this.shape_79 = new Graphics()
		.d(graphics.Graphic_79)
		.tr(-58.9,73.7);

	this.shape_80 = new Graphics()
		.d(graphics.Graphic_80)
		.tr(-82,77.8);

	this.shape_81 = new Graphics()
		.d(graphics.Graphic_81)
		.tr(-80.8,77.9);

	this.shape_82 = new Graphics()
		.d(graphics.Graphic_82)
		.tr(-7.5,4.3);

	this.shape_83 = new Graphics()
		.d(graphics.Graphic_83)
		.tr(-6.7,4.7);

	this.shape_84 = new Graphics()
		.d(graphics.Graphic_84)
		.tr(40.5,89.9);

	this.shape_85 = new Graphics()
		.d(graphics.Graphic_85)
		.tr(40.2,89.3);

	this.shape_86 = new Graphics()
		.d(graphics.Graphic_86)
		.tr(18.2,92.1);

	this.shape_87 = new Graphics()
		.d(graphics.Graphic_87)
		.tr(18.6,89.4);

	this.shape_88 = new Graphics()
		.d(graphics.Graphic_88)
		.tr(-0.2,88.4);

	this.shape_89 = new Graphics()
		.d(graphics.Graphic_89)
		.tr(-0.5,89.3);

	this.shape_90 = new Graphics()
		.d(graphics.Graphic_90)
		.tr(10.6,91.3);

	this.shape_91 = new Graphics()
		.d(graphics.Graphic_91)
		.tr(11.8,91.5);

	this.shape_92 = new Graphics()
		.d(graphics.Graphic_92)
		.tr(30.2,93.2);

	this.shape_93 = new Graphics()
		.d(graphics.Graphic_93)
		.tr(30.3,92.5);

	this.shape_94 = new Graphics()
		.d(graphics.Graphic_94)
		.tr(42.9,92.1);

	this.shape_95 = new Graphics()
		.d(graphics.Graphic_95)
		.tr(36.1,91.4);

	this.shape_96 = new Graphics()
		.d(graphics.Graphic_96)
		.tr(32.5,91.9);

	this.shape_97 = new Graphics()
		.d(graphics.Graphic_97)
		.tr(32.7,92.1);

	this.shape_98 = new Graphics()
		.d(graphics.Graphic_98)
		.tr(21.1,92.1);

	this.shape_99 = new Graphics()
		.d(graphics.Graphic_99)
		.tr(21.5,91.9);

	this.shape_100 = new Graphics()
		.d(graphics.Graphic_100)
		.tr(11.7,94.6);

	this.shape_101 = new Graphics()
		.d(graphics.Graphic_101)
		.tr(11,95);

	this.shape_102 = new Graphics()
		.d(graphics.Graphic_102)
		.tr(10.8,91.8);

	this.shape_103 = new Graphics()
		.d(graphics.Graphic_103)
		.tr(10.5,92.3);

	this.shape_104 = new Graphics()
		.d(graphics.Graphic_104)
		.tr(-92.2,68.1);

	this.shape_105 = new Graphics()
		.d(graphics.Graphic_105)
		.tr(-90.6,68.7);

	this.shape_106 = new Graphics()
		.d(graphics.Graphic_106)
		.tr(-82.5,68.1);

	this.shape_107 = new Graphics()
		.d(graphics.Graphic_107)
		.tr(-81.8,69.7);

	this.shape_108 = new Graphics()
		.d(graphics.Graphic_108)
		.tr(-81.1,70.8);

	this.shape_109 = new Graphics()
		.d(graphics.Graphic_109)
		.tr(-79.5,73.1);

	this.shape_110 = new Graphics()
		.d(graphics.Graphic_110)
		.tr(77.2,80.5);

	this.shape_111 = new Graphics()
		.d(graphics.Graphic_111)
		.tr(76.5,80.9);

	this.shape_112 = new Graphics()
		.d(graphics.Graphic_112)
		.tr(70.7,82.9);

	this.shape_113 = new Graphics()
		.d(graphics.Graphic_113)
		.tr(70.8,83.3);

	this.shape_114 = new Graphics()
		.d(graphics.Graphic_114)
		.tr(65.1,83);

	this.shape_115 = new Graphics()
		.d(graphics.Graphic_115)
		.tr(65.3,83.5);

	this.shape_116 = new Graphics()
		.d(graphics.Graphic_116)
		.tr(58.2,83.4);

	this.shape_117 = new Graphics()
		.d(graphics.Graphic_117)
		.tr(58,83.1);

	this.shape_118 = new Graphics()
		.d(graphics.Graphic_118)
		.tr(62.4,83.6);

	this.shape_119 = new Graphics()
		.d(graphics.Graphic_119)
		.tr(62.7,83.6);

	this.shape_120 = new Graphics()
		.d(graphics.Graphic_120)
		.tr(67.6,85);

	this.shape_121 = new Graphics()
		.d(graphics.Graphic_121)
		.tr(66.5,84.5);

	this.shape_122 = new Graphics()
		.d(graphics.Graphic_122)
		.tr(62.1,83.6);

	this.shape_123 = new Graphics()
		.d(graphics.Graphic_123)
		.tr(62.9,83.6);

	this.shape_124 = new Graphics()
		.d(graphics.Graphic_124)
		.tr(20.4,25.9);

	this.shape_125 = new Graphics()
		.d(graphics.Graphic_125)
		.tr(50.7,83.5);

	this.shape_126 = new Graphics()
		.d(graphics.Graphic_126)
		.tr(50.7,83.4);

	this.shape_127 = new Graphics()
		.d(graphics.Graphic_127)
		.tr(20.2,88.3);

	this.shape_128 = new Graphics()
		.d(graphics.Graphic_128)
		.tr(19.3,88.7);

	this.shape_129 = new Graphics()
		.d(graphics.Graphic_129)
		.tr(17.8,88);

	this.shape_130 = new Graphics()
		.d(graphics.Graphic_130)
		.tr(17.7,88.1);

	this.shape_131 = new Graphics()
		.d(graphics.Graphic_131)
		.tr(19.4,83.4);

	this.shape_132 = new Graphics()
		.d(graphics.Graphic_132)
		.tr(18.8,84.4);

	this.shape_133 = new Graphics()
		.d(graphics.Graphic_133)
		.tr(18.8,92.4);

	this.shape_134 = new Graphics()
		.d(graphics.Graphic_134)
		.tr(18.6,92.8);

	this.shape_135 = new Graphics()
		.d(graphics.Graphic_135)
		.tr(22.1,87.9);

	this.shape_136 = new Graphics()
		.d(graphics.Graphic_136)
		.tr(21.9,86.4);

	this.shape_137 = new Graphics()
		.d(graphics.Graphic_137)
		.tr(21.9,86.4);

	this.shape_138 = new Graphics()
		.d(graphics.Graphic_138)
		.tr(26.8,88.1);

	this.shape_139 = new Graphics()
		.d(graphics.Graphic_139)
		.tr(53,88.6);

	this.shape_140 = new Graphics()
		.d(graphics.Graphic_140)
		.tr(27.3,88.5);

	this.shape_141 = new Graphics()
		.d(graphics.Graphic_141)
		.tr(43.7,76.7);

	this.shape_142 = new Graphics()
		.d(graphics.Graphic_142)
		.tr(43.6,77.3);

	this.shape_143 = new Graphics()
		.d(graphics.Graphic_143)
		.tr(31.7,84.9);

	this.shape_144 = new Graphics()
		.d(graphics.Graphic_144)
		.tr(31.5,83.4);

	this.shape_145 = new Graphics()
		.d(graphics.Graphic_145)
		.tr(59.2,91.4);

	this.shape_146 = new Graphics()
		.d(graphics.Graphic_146)
		.tr(34.3,85.9);

	this.shape_147 = new Graphics()
		.d(graphics.Graphic_147)
		.tr(34.1,85.6);

	this.shape_148 = new Graphics()
		.d(graphics.Graphic_148)
		.tr(-2.8,46.2);

	this.shape_149 = new Graphics()
		.d(graphics.Graphic_149)
		.tr(-4.4,46.4);

	this.shape_150 = new Graphics()
		.d(graphics.Graphic_150)
		.tr(25.3,31.5);

	this.shape_151 = new Graphics()
		.d(graphics.Graphic_151)
		.tr(25,29.6);

	this.shape_152 = new Graphics()
		.d(graphics.Graphic_152)
		.tr(8,-15.1);

	this.shape_153 = new Graphics()
		.d(graphics.Graphic_153)
		.tr(8.1,-15);

	this.shape_154 = new Graphics()
		.d(graphics.Graphic_154)
		.tr(14.7,84.5);

	this.shape_155 = new Graphics()
		.d(graphics.Graphic_155)
		.tr(14.8,85.1);

	this.shape_156 = new Graphics()
		.d(graphics.Graphic_173)
		.tr(58,78.7);

	this.shape_157 = new Graphics()
		.d(graphics.Graphic_174)
		.tr(58.2,78.1);

	this.shape_158 = new Graphics()
		.d(graphics.Graphic_158)
		.tr(53.9,83.2);

	this.shape_159 = new Graphics()
		.d(graphics.Graphic_159)
		.tr(53.9,83.7);

	this.shape_160 = new Graphics()
		.d(graphics.Graphic_160)
		.tr(53.3,82.5);

	this.shape_161 = new Graphics()
		.d(graphics.Graphic_161)
		.tr(53.4,83.1);

	this.shape_162 = new Graphics()
		.d(graphics.Graphic_162)
		.tr(52.7,81.3);

	this.shape_163 = new Graphics()
		.d(graphics.Graphic_163)
		.tr(52.8,81.9);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_75},{t:this.shape_74}]},5).to({state:[]},1).to({state:[{t:this.shape_77},{t:this.shape_76}]},3).to({state:[]},1).to({state:[{t:this.shape_79},{t:this.shape_78}]},3).to({state:[]},1).to({state:[{t:this.shape_81},{t:this.shape_80}]},1).to({state:[]},1).to({state:[{t:this.shape_83},{t:this.shape_82}]},1).to({state:[]},1).to({state:[{t:this.shape_85},{t:this.shape_84}]},1).to({state:[]},1).to({state:[{t:this.shape_87},{t:this.shape_86}]},1).to({state:[{t:this.shape_89},{t:this.shape_88}]},1).to({state:[]},1).to({state:[{t:this.shape_91},{t:this.shape_90}]},2).to({state:[{t:this.shape_93},{t:this.shape_92}]},1).to({state:[]},1).to({state:[{t:this.shape_95},{t:this.shape_94}]},1).to({state:[{t:this.shape_97},{t:this.shape_96}]},1).to({state:[{t:this.shape_99},{t:this.shape_98}]},1).to({state:[{t:this.shape_101},{t:this.shape_100}]},1).to({state:[]},1).to({state:[{t:this.shape_103},{t:this.shape_102}]},1).to({state:[]},1).to({state:[{t:this.shape_105},{t:this.shape_104}]},1).to({state:[]},1).to({state:[{t:this.shape_107},{t:this.shape_106}]},1).to({state:[]},1).to({state:[{t:this.shape_109},{t:this.shape_108}]},1).to({state:[]},1).to({state:[{t:this.shape_111},{t:this.shape_110}]},1).to({state:[{t:this.shape_113},{t:this.shape_112}]},1).to({state:[{t:this.shape_115},{t:this.shape_114}]},1).to({state:[{t:this.shape_117},{t:this.shape_116}]},1).to({state:[]},1).to({state:[{t:this.shape_119},{t:this.shape_118}]},2).to({state:[]},1).to({state:[{t:this.shape_121},{t:this.shape_120}]},2).to({state:[]},1).to({state:[{t:this.shape_123},{t:this.shape_122}]},1).to({state:[]},1).to({state:[{t:this.shape_117},{t:this.shape_116}]},1).to({state:[]},1).to({state:[{t:this.shape_111},{t:this.shape_110}]},2).to({state:[]},1).to({state:[{t:this.shape_126},{t:this.shape_125},{t:this.shape_124}]},1).to({state:[{t:this.shape_128},{t:this.shape_127}]},1).to({state:[{t:this.shape_130},{t:this.shape_129}]},1).to({state:[{t:this.shape_132},{t:this.shape_131}]},1).to({state:[]},1).to({state:[{t:this.shape_130},{t:this.shape_129}]},1).to({state:[]},1).to({state:[{t:this.shape_134},{t:this.shape_133}]},2).to({state:[]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135}]},3).to({state:[]},1).to({state:[{t:this.shape_142},{t:this.shape_141}]},3).to({state:[]},1).to({state:[{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143}]},3).to({state:[]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},3).to({state:[]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},2).to({state:[]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},2).to({state:[]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},3).to({state:[{t:this.shape_157},{t:this.shape_156}]},1).to({state:[{t:this.shape_159},{t:this.shape_158}]},1).to({state:[]},1).to({state:[{t:this.shape_161},{t:this.shape_160}]},1).to({state:[{t:this.shape_163},{t:this.shape_162}]},1).to({state:[]},1).wait(2));

	// rough
	this.shape_164 = new Graphics()
		.d(graphics.Graphic_164)
		.tr(31.7,84.9);

	this.shape_165 = new Graphics()
		.d(graphics.Graphic_165)
		.tr(31.5,83.4);

	this.shape_166 = new Graphics()
		.d(graphics.Graphic_166)
		.tr(31.4,83.3);

	this.shape_167 = new Graphics()
		.d(graphics.Graphic_167)
		.tr(62.5,85.6);

	this.shape_168 = new Graphics()
		.d(graphics.Graphic_168)
		.tr(36.4,85.1);

	this.shape_169 = new Graphics()
		.d(graphics.Graphic_169)
		.tr(36.8,85.5);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164}]}).to({state:[]},1).wait(100));

});

lib.FIZ_34_tieloop = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// Layer 2
	this.shape = new Graphics()
		.d(graphics.Graphic_860)
		.tr(10.6,15.2);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_861)
		.tr(10.7,15.3);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_862)
		.tr(10.6,15.5,1,1,-3);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_863)
		.tr(10.7,15.5,1,1,-3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{rotation:0,x:10.7,y:15.3}},{t:this.shape,p:{rotation:0,y:15.2}}]}).to({state:[{t:this.shape,p:{rotation:3.5,y:15.9}},{t:this.shape_1,p:{rotation:3.5,x:10.6,y:16}}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(1));

	// Layer 1
	this.shape_4 = new Graphics()
		.d(graphics.Graphic_864)
		.tr(11.3,20.4);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_865)
		.tr(11.7,20.3);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_866)
		.tr(11.2,20.1,1,1,3.3);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_867)
		.tr(11.5,20,1,1,3.3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5,p:{rotation:0,x:11.7,y:20.3}},{t:this.shape_4,p:{rotation:0,x:11.3,y:20.4}}]}).to({state:[{t:this.shape_5,p:{rotation:-4,x:11.8,y:19.4}},{t:this.shape_4,p:{rotation:-4,x:11.4,y:19.6}}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).wait(1));

});

lib.FIZ34_Skate1_Torso = Container.extend(function()
{
	Container.call(this);

	// Layer 3
	this.instance = new lib.FIZ34_Skate1_ApronTie("single",0)
		.tr(63,4.9,0.965,0.986,0,2,-178,-0.7,5.1);

	// Layer 1
	this.shape = new Graphics()
		.d(graphics.Graphic_339)
		.tr(31.7,26.2);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_340)
		.tr(31.3,26.1);

	this.ac(this.shape_1,this.shape,this.instance);
});

lib.FIZ34_Skate1_HeadNestks = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// pupils
	this.instance = new lib.FIZ34_Skate1_PupilL("single",0)
		.tr(121.6,186.4,1,1,0,0,0,3.5,4.6);

	this.instance_1 = new lib.FIZ34_Skate1_PupilR("single",0)
		.tr(39.6,185.4,1,1,0,0,0,2.9,4);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},92).to({state:[]},182).wait(741));

	// helmet
	this.instance_2 = new lib.FIZ34_Skate1_Helmet("single",0)
		.tr(106.8,111.2)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(92).to({_off:false},0).to({_off:true},182).wait(741));

	// helmetstrapR
	this.instance_3 = new lib.FIZ34_Skate1_HelmetStrapL_skatenormal("single",0)
		.tr(160.1,137,0.999,0.999,3.7,0,0,-4,-63.3)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(92).to({_off:false},0).wait(32).to({rotation:-0.6},0).wait(2).to({regY:-63.4,rotation:-5.9,y:136.9},0).wait(2).to({regY:-63.5,rotation:-7},0).wait(2).to({rotation:-5.9},0).wait(2).to({rotation:-4.8},0).wait(25).to({regY:-63.3,rotation:2.2,y:137},0).wait(2).to({regX:-4.1,rotation:6},0).wait(2).to({rotation:7.6},0).wait(2).to({regY:-63.2,rotation:8},0).wait(2).to({regY:-63.3,rotation:6.7,y:136.9},0).wait(2).to({regY:-63.2,rotation:6.6,y:137.1},0).wait(14).to({regX:-4,regY:-63.3,rotation:-0.6,y:137},0).wait(2).to({regY:-63.4,rotation:-5.9,y:136.9},0).wait(2).to({regY:-63.5,rotation:-7},0).wait(2).to({rotation:-5.9},0).wait(2).to({rotation:-4.8},0).wait(16).to({regY:-63.3,rotation:2.2,y:137},0).wait(2).to({regX:-4.1,rotation:6},0).wait(2).to({rotation:7.6},0).wait(2).to({regY:-63.2,rotation:8},0).wait(2).to({regY:-63.3,rotation:6.7,y:136.9},0).wait(2).to({regY:-63.2,rotation:6.6,y:137.1},0).wait(37).to({rotation:1.6,y:137},0).wait(2).to({regY:-63.3,scaleX:1,scaleY:1,rotation:-1.2},0).wait(2).to({regX:-4.2,regY:-63.4,rotation:-1.9,x:160},0).wait(2).to({rotation:-1.3},0).wait(2).to({regY:-63.5,rotation:-1,y:136.9},0).to({_off:true},14).wait(741));

	// browL
	this.instance_4 = new lib.FIZ34_Skate1_BrowL("single",1)
		.tr(127.9,135.4,0.999,0.999,-12.8,0,0,15.5,9.5);

	this.instance_5 = new lib.FIZ34_Skate1_BrowR("single",1)
		.tr(37.6,137.7,0.999,0.999,3.5,0,0,11.3,8.8);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5,p:{x:37.6,y:137.7,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:127.9,y:135.4,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},92).to({state:[{t:this.instance_5,p:{x:37.7,y:135.7,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128,y:133.4,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.9,y:133.5,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.2,y:131.2,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.9,y:134.1,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.2,y:131.8,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.9,y:134.3,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.2,y:132,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:37.8,y:133.7,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.1,y:131.4,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},53).to({state:[{t:this.instance_5,p:{x:37.7,y:133.1,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128,y:130.8,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:37.2,y:139.1,regX:11.6,regY:9.2,scaleX:0.995,scaleY:0.995,rotation:9.5,startPosition:0}},{t:this.instance_4,p:{x:122,y:137.6,scaleX:0.995,scaleY:0.995,rotation:-10.7,startPosition:0,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:37.6,y:147.7,regX:11.6,regY:9.2,scaleX:0.996,scaleY:0.996,rotation:31.4,startPosition:0}},{t:this.instance_4,p:{x:121.4,y:146.2,scaleX:0.996,scaleY:0.996,rotation:-26.8,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.1,y:158.7,regX:11.6,regY:9.2,scaleX:0.997,scaleY:0.997,rotation:43.2,startPosition:0}},{t:this.instance_4,p:{x:122.3,y:157.5,scaleX:0.997,scaleY:0.997,rotation:-40.8,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.1,y:158.4,regX:11.6,regY:9.2,scaleX:0.997,scaleY:0.997,rotation:43.2,startPosition:0}},{t:this.instance_4,p:{x:122.3,y:157.2,scaleX:0.997,scaleY:0.997,rotation:-40.8,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.1,y:157.8,regX:11.6,regY:9.2,scaleX:0.997,scaleY:0.997,rotation:43.2,startPosition:0}},{t:this.instance_4,p:{x:122.3,y:156.6,scaleX:0.997,scaleY:0.997,rotation:-40.8,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.1,y:158.3,regX:11.6,regY:9.2,scaleX:0.997,scaleY:0.997,rotation:43.2,startPosition:0}},{t:this.instance_4,p:{x:122.3,y:157,scaleX:0.997,scaleY:0.997,rotation:-40.8,startPosition:0,regY:9.5}}]},19).to({state:[{t:this.instance_5,p:{x:37.1,y:158.7,regX:11.6,regY:9.2,scaleX:0.997,scaleY:0.997,rotation:43.2,startPosition:0}},{t:this.instance_4,p:{x:122.3,y:157.5,scaleX:0.997,scaleY:0.997,rotation:-40.8,startPosition:0,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:36.2,y:149.8,regX:11.6,regY:9.2,scaleX:0.995,scaleY:0.995,rotation:19.6,startPosition:0}},{t:this.instance_4,p:{x:121.1,y:147.9,scaleX:0.996,scaleY:0.996,rotation:-23.1,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.2,y:141.9,regX:12.1,regY:9.4,scaleX:0.995,scaleY:0.995,rotation:5.3,startPosition:0}},{t:this.instance_4,p:{x:122.2,y:139.5,scaleX:0.995,scaleY:0.995,rotation:-5.2,startPosition:0,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.9,y:134.3,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.2,y:132,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:37.6,y:133,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:127.9,y:130.7,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:37.7,y:133.6,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128,y:131.3,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},2).to({state:[{t:this.instance_5,p:{x:36.7,y:136,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.4,y:133.8,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},16).to({state:[{t:this.instance_5,p:{x:35.9,y:139.1,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:129,y:136.9,scaleX:0.999,scaleY:0.999,rotation:-12.8,startPosition:1,regY:9.5}}]},1).to({state:[{t:this.instance_5,p:{x:36.7,y:144.6,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.8,y:141.3,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:36.7,y:144.6,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:128.8,y:141.3,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:37.3,y:141.4,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:129.4,y:138.1,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},13).to({state:[{t:this.instance_5,p:{x:37.6,y:138.8,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:129.7,y:135.5,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:38.3,y:135,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.4,y:131.7,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:38.2,y:135.7,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.4,y:132.4,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},2).to({state:[{t:this.instance_5,p:{x:38,y:136.2,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.1,y:132.9,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},2).to({state:[{t:this.instance_5,p:{x:38,y:136.6,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.1,y:133.3,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},2).to({state:[{t:this.instance_5,p:{x:38.6,y:139,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.7,y:135.7,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},25).to({state:[{t:this.instance_5,p:{x:38.8,y:141.5,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:130.9,y:138.2,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:39.1,y:145,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:131.3,y:141.7,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},1).to({state:[{t:this.instance_5,p:{x:38.9,y:144.1,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:131,y:140.8,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},2).to({state:[{t:this.instance_5,p:{x:38.9,y:143.5,regX:11.3,regY:8.8,scaleX:0.999,scaleY:0.999,rotation:3.5,startPosition:1}},{t:this.instance_4,p:{x:131,y:140.2,scaleX:0.997,scaleY:0.997,rotation:-15.1,startPosition:1,regY:9.4}}]},2).to({state:[]},17).wait(741));

	// glasses
	this.instance_6 = new lib.FIZ34_Skate1_EyeL("single",0)
		.tr(124.9,184.4,1,1,0,0,0,18,28.6);

	this.instance_7 = new lib.FIZ34_Skate1_EyeR("single",0)
		.tr(37,184.3,1,1,0,0,0,16.3,27.7);

	this.instance_8 = new lib.FIZ34_Skate1_GlassesArmL("single",0)
		.tr(152.2,187.2,1,1,0,0,0,13.7,5.7);

	this.instance_9 = new lib.FIZ34_Skate1_GlassesMid("single",0)
		.tr(79.3,179.4,1,1,0,0,0,32.1,6);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{startPosition:0}},{t:this.instance_6,p:{startPosition:0}}]},92).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{startPosition:8}},{t:this.instance_6,p:{startPosition:10}}]},62).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{startPosition:4}},{t:this.instance_6,p:{startPosition:4}}]},1).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{startPosition:8}},{t:this.instance_6,p:{startPosition:10}}]},49).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7,p:{startPosition:0}},{t:this.instance_6,p:{startPosition:0}}]},1).to({state:[]},69).wait(741));

	// nose
	this.instance_10 = new lib.FIZ34_Skate1_Nose("single",0)
		.tr(59.9,184.5,1,1,0,0,0,17,1.6)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(92).to({_off:false},0).to({_off:true},182).wait(741));

	// mouth
	this.instance_11 = new lib.FIZ34_Skate1_Mouth("single",0)
		.tr(94.6,237.9,1,1,0,0,0,32.4,12)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(92).to({_off:false},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(8).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:11},0).wait(2).to({startPosition:18},0).wait(3).to({startPosition:19},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:6},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:18},0).wait(2).to({startPosition:19},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(2).to({startPosition:11},0).wait(2).to({startPosition:8},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:17},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:19},0).wait(3).to({startPosition:18},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:1},0).wait(3).to({startPosition:8},0).wait(2).to({startPosition:7},0).wait(1).to({startPosition:6},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:13},0).wait(2).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:2},0).wait(1).to({startPosition:19},0).wait(2).to({startPosition:18},0).wait(1).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:18},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:7},0).wait(2).to({startPosition:8},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:3},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:13},0).wait(2).to({startPosition:12},0).wait(2).to({startPosition:16},0).wait(2).to({scaleX:1.01,scaleY:1.01,y:238.1,startPosition:1},0).wait(2).to({scaleX:1,scaleY:1,y:237.9},0).wait(9).to({startPosition:7},0).wait(2).to({startPosition:8},0).wait(1).to({startPosition:3},0).wait(1).to({startPosition:4},0).wait(1).to({startPosition:12},0).wait(2).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(3).to({startPosition:7},0).wait(1).to({startPosition:8},0).wait(2).to({startPosition:2},0).wait(1).to({startPosition:4},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:2},0).wait(2).to({startPosition:3},0).wait(2).to({startPosition:19},0).wait(1).to({startPosition:18},0).wait(1).to({startPosition:3},0).to({_off:true},1).wait(741));

	// head
	this.instance_12 = new lib.FIZ34_Skate1_EarL("single",0)
		.tr(156,195.5,1,1,0,0,0,3.1,23.4);

	this.instance_13 = new lib.FIZ34_Skate1_Hair("single",0)
		.tr(107.6,145.7,1,1,0,0,0,90.4,145.8);

	this.instance_14 = new lib.FIZ34_Skate1_Head("single",0)
		.tr(102.7,310.2,1,1,0,0,0,81.5,228.2);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]},92).to({state:[]},182).wait(741));

	// helmetstrapL
	this.instance_15 = new lib.FIZ34_Skate1_HelmetStrapR_skatenormal("single",0)
		.tr(34.2,156,1,1,0.5,0,0,-2.1,-68.9)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(92).to({_off:false},0).wait(32).to({regY:-68.8,rotation:-2.3,x:34.1,y:156.1},0).wait(2).to({regY:-68.9,scaleX:1,scaleY:1,rotation:-6.6,y:156},0).wait(2).to({regY:-68.8,rotation:-7.4},0).wait(2).to({rotation:-6},0).wait(2).to({regX:-2,rotation:-5.5,x:34.2,y:156.1},0).wait(25).to({regX:-2.1,regY:-68.9,scaleX:1,scaleY:1,rotation:-0.3,y:156},0).wait(2).to({scaleX:1,scaleY:1,rotation:2,y:156.1},0).wait(2).to({regX:-2.2,scaleX:1,scaleY:1,rotation:3.1,x:34.1},0).wait(2).to({regX:-2.1,scaleX:1,scaleY:1,rotation:3.6,y:156},0).wait(2).to({regY:-68.8,rotation:2.3},0).wait(2).to({rotation:1.7,y:156.1},0).wait(14).to({scaleX:1,scaleY:1,rotation:-2.3},0).wait(2).to({regY:-68.9,scaleX:1,scaleY:1,rotation:-6.6,y:156},0).wait(2).to({regY:-68.8,rotation:-7.4},0).wait(2).to({rotation:-6},0).wait(2).to({regX:-2,rotation:-5.5,x:34.2,y:156.1},0).wait(16).to({regX:-2.1,regY:-68.9,scaleX:1,scaleY:1,rotation:-0.3,y:156},0).wait(2).to({scaleX:1,scaleY:1,rotation:2,y:156.1},0).wait(2).to({regX:-2.2,scaleX:1,scaleY:1,rotation:3.1,x:34.1},0).wait(2).to({regX:-2.1,scaleX:1,scaleY:1,rotation:3.6,y:156},0).wait(2).to({regY:-68.8,rotation:2.3},0).wait(2).to({rotation:1.7,y:156.1},0).wait(37).to({rotation:-1.6,x:34.2,y:156},0).wait(2).to({rotation:-3.1,x:34.1,y:156.1},0).wait(2).to({rotation:-4},0).wait(2).to({regY:-68.7,rotation:-3.2},0).wait(2).to({rotation:-2.6,x:34.2},0).to({_off:true},14).wait(741));

});

lib.FIZ34_Skate1_ArmR = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// strap
	this.shape = new Graphics()
		.d(graphics.Graphic_868)
		.tr(35.2,43.8);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_869)
		.tr(35.1,44.1);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_870)
		.tr(47.6,-24.5);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_871)
		.tr(50.1,-15.4);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_872)
		.tr(38.6,-24.6);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_873)
		.tr(46.5,-26.3);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_874)
		.tr(35.3,-12);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_875)
		.tr(50,-15.4);

	this.instance = new lib.FIZ34_Skate1_ArmStrapR("synched",0)
		.tr(53.3,-29.1,0.996,0.996,0,89.3,-90.7,9.6,9.2);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_878)
		.tr(19.3,-75.6);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_879)
		.tr(19.3,-75.7);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_880)
		.tr(-1.8,7.3);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_881)
		.tr(-1.8,6.8);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_882)
		.tr(12.9,-24.9);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_883)
		.tr(34,-25.7);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_884)
		.tr(31,-25.6);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_885)
		.tr(50.9,-43.5);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_886)
		.tr(50.7,-43.5);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_887)
		.tr(19.6,-32.5);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_888)
		.tr(19.7,-32.4);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_889)
		.tr(54.9,-46.4);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_890)
		.tr(54.7,-46.4);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_891)
		.tr(-4.7,-21.5);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_892)
		.tr(-5,-21.1);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_893)
		.tr(-3,-10.2);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_894)
		.tr(-3.1,-10.2);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_895)
		.tr(57,11.1);

	this.shape_26 = new Graphics()
		.d(graphics.Graphic_896)
		.tr(56.5,10.9);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_897)
		.tr(41.8,22.8);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_898)
		.tr(41.6,22.9);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_899)
		.tr(40.5,-34);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_900)
		.tr(38.8,-31.3,1,1,0,0,0,-1.7,3.7);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_901)
		.tr(25.2,-86);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_902)
		.tr(40.8,-38.9);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_903)
		.tr(56.4,-25.8);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_904)
		.tr(45.9,-26);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_905)
		.tr(47,-52.9);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},2).to({state:[]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},5).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.instance,p:{regX:9.6,scaleX:0.996,scaleY:0.996,skewX:89.3,skewY:-90.7,x:53.3,y:-29.1,regY:9.2}}]},1).to({state:[]},1).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.instance,p:{regX:9.5,scaleX:0.959,scaleY:0.92,skewX:48.8,skewY:-131.2,x:48.2,y:-14.2,regY:9.2}}]},1).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.instance,p:{regX:9.5,scaleX:0.997,scaleY:0.997,skewX:51.9,skewY:-128.1,x:58.1,y:-25.4,regY:9.3}}]},1).to({state:[{t:this.shape_16},{t:this.shape_15}]},1).to({state:[{t:this.instance,p:{regX:9.3,scaleX:0.976,scaleY:0.976,skewX:88.1,skewY:-91.9,x:51.3,y:-19.7,regY:9.2}}]},1).to({state:[{t:this.instance,p:{regX:9.4,scaleX:0.976,scaleY:0.976,skewX:81,skewY:-99,x:50.1,y:4.3,regY:9.2}}]},1).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.instance,p:{regX:9.4,scaleX:0.976,scaleY:0.976,skewX:78.4,skewY:-101.6,x:49.9,y:12,regY:9.1}}]},1).to({state:[]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[]},1).to({state:[{t:this.instance,p:{regX:9.5,scaleX:0.976,scaleY:0.976,skewX:71,skewY:-109,x:49,y:7.2,regY:9.3}}]},1).to({state:[{t:this.shape_22},{t:this.shape_21}]},1).to({state:[{t:this.shape_24},{t:this.shape_23}]},1).to({state:[{t:this.shape_26},{t:this.shape_25}]},1).to({state:[{t:this.shape_28},{t:this.shape_27}]},1).to({state:[]},1).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},28).to({state:[]},1).wait(32));

	// arm
	this.shape_36 = new Graphics()
		.d(graphics.Graphic_906)
		.tr(50.1,75.7);

	this.shape_37 = new Graphics()
		.d(graphics.Graphic_907)
		.tr(50.3,75.8);

	this.shape_38 = new Graphics()
		.d(graphics.Graphic_908)
		.tr(53.2,28.4);

	this.shape_39 = new Graphics()
		.d(graphics.Graphic_909)
		.tr(52.5,28.3);

	this.shape_40 = new Graphics()
		.d(graphics.Graphic_910)
		.tr(57.9,42.6);

	this.shape_41 = new Graphics()
		.d(graphics.Graphic_911)
		.tr(60,38.8);

	this.shape_42 = new Graphics()
		.d(graphics.Graphic_912)
		.tr(51.1,-29.1);

	this.shape_43 = new Graphics()
		.d(graphics.Graphic_913)
		.tr(55.9,-29.6);

	this.shape_44 = new Graphics()
		.d(graphics.Graphic_914)
		.tr(51.2,-28.5);

	this.shape_45 = new Graphics()
		.d(graphics.Graphic_915)
		.tr(57,-28.9);

	this.shape_46 = new Graphics()
		.d(graphics.Graphic_916)
		.tr(47.7,-8.1);

	this.shape_47 = new Graphics()
		.d(graphics.Graphic_917)
		.tr(49,-13.1);

	this.shape_48 = new Graphics()
		.d(graphics.Graphic_918)
		.tr(24.6,-7.7);

	this.shape_49 = new Graphics()
		.d(graphics.Graphic_919)
		.tr(36.1,-8);

	this.shape_50 = new Graphics()
		.d(graphics.Graphic_920)
		.tr(53.2,-21.2);

	this.shape_51 = new Graphics()
		.d(graphics.Graphic_921)
		.tr(78.6,-6.7);

	this.shape_52 = new Graphics()
		.d(graphics.Graphic_922)
		.tr(59.5,-16.2);

	this.shape_53 = new Graphics()
		.d(graphics.Graphic_923)
		.tr(70.3,-10.6);

	this.shape_54 = new Graphics()
		.d(graphics.Graphic_924)
		.tr(57.4,-13.1);

	this.shape_55 = new Graphics()
		.d(graphics.Graphic_925)
		.tr(19.3,9.6);

	this.shape_56 = new Graphics()
		.d(graphics.Graphic_926)
		.tr(57.3,-23.6);

	this.shape_57 = new Graphics()
		.d(graphics.Graphic_927)
		.tr(44,-15.9);

	this.shape_58 = new Graphics()
		.d(graphics.Graphic_928)
		.tr(47.3,-4.9);

	this.shape_59 = new Graphics()
		.d(graphics.Graphic_929)
		.tr(2,-105.2);

	this.shape_60 = new Graphics()
		.d(graphics.Graphic_930)
		.tr(88.3,3.7,1,1,0,0,0,86.2,108.9);

	this.shape_61 = new Graphics()
		.d(graphics.Graphic_250)
		.tr(53.1,-17.9,0.998,0.998,0,34.4,-145.6);

	this.shape_62 = new Graphics()
		.d(graphics.Graphic_251)
		.tr(54.4,-25.8,0.998,0.998,0,34.4,-145.6);

	this.shape_63 = new Graphics()
		.d(graphics.Graphic_252)
		.tr(40.5,-39.3,0.998,0.998,0,34.4,-145.6);

	this.shape_64 = new Graphics()
		.d(graphics.Graphic_253)
		.tr(4,-76.9,0.998,0.998,0,34.4,-145.6);

	this.shape_65 = new Graphics()
		.d(graphics.Graphic_254)
		.tr(40.4,-45.7,0.998,0.998,0,34.4,-145.6);

	this.shape_66 = new Graphics()
		.d(graphics.Graphic_936)
		.tr(55.6,-12.6);

	this.shape_67 = new Graphics()
		.d(graphics.Graphic_937)
		.tr(39.9,-16.9);

	this.shape_68 = new Graphics()
		.d(graphics.Graphic_938)
		.tr(12.5,-58.1);

	this.shape_69 = new Graphics()
		.d(graphics.Graphic_939)
		.tr(47.6,3.4);

	this.shape_70 = new Graphics()
		.d(graphics.Graphic_940)
		.tr(40.8,-30.5);

	this.shape_71 = new Graphics()
		.d(graphics.Graphic_941)
		.tr(56.5,0.3);

	this.shape_72 = new Graphics()
		.d(graphics.Graphic_942)
		.tr(52.9,11.5);

	this.shape_73 = new Graphics()
		.d(graphics.Graphic_943)
		.tr(43.9,-4);

	this.shape_74 = new Graphics()
		.d(graphics.Graphic_944)
		.tr(55,-2.8);

	this.shape_75 = new Graphics()
		.d(graphics.Graphic_945)
		.tr(13.5,-113.4);

	this.shape_76 = new Graphics()
		.d(graphics.Graphic_946)
		.tr(17.3,-93.7,1,1,0,0,0,3.8,19.4);

	this.shape_77 = new Graphics()
		.d(graphics.Graphic_947)
		.tr(14,-113.5);

	this.shape_78 = new Graphics()
		.d(graphics.Graphic_948)
		.tr(14,-113.2);

	this.shape_79 = new Graphics()
		.d(graphics.Graphic_949)
		.tr(10.7,-112.4);

	this.shape_80 = new Graphics()
		.d(graphics.Graphic_950)
		.tr(10.8,-112.2);

	this.shape_81 = new Graphics()
		.d(graphics.Graphic_951)
		.tr(9.9,-111.6);

	this.shape_82 = new Graphics()
		.d(graphics.Graphic_952)
		.tr(17.3,-93.7,1,1,0,0,0,7.3,17.8);

	this.shape_83 = new Graphics()
		.d(graphics.Graphic_953)
		.tr(2.5,-29.5);

	this.shape_84 = new Graphics()
		.d(graphics.Graphic_954)
		.tr(36.3,-4.3);

	this.shape_85 = new Graphics()
		.d(graphics.Graphic_955)
		.tr(54.2,0.5);

	this.shape_86 = new Graphics()
		.d(graphics.Graphic_956)
		.tr(47.1,7.6);

	this.shape_87 = new Graphics()
		.d(graphics.Graphic_957)
		.tr(32.9,-14.7);

	this.instance_1 = new lib.FIZ34_Skate1_ArmStrapR("synched",0)
		.tr(51.8,10.6,0.953,0.998,0,60.7,-116.6,9.4,9.2);

	this.shape_88 = new Graphics()
		.d(graphics.Graphic_960)
		.tr(54.3,0.9);

	this.shape_89 = new Graphics()
		.d(graphics.Graphic_961)
		.tr(48.7,10.8);

	this.shape_90 = new Graphics()
		.d(graphics.Graphic_962)
		.tr(34.6,-5.3);

	this.shape_91 = new Graphics()
		.d(graphics.Graphic_963)
		.tr(48.4,-5);

	this.shape_92 = new Graphics()
		.d(graphics.Graphic_964)
		.tr(59.6,11.3);

	this.shape_93 = new Graphics()
		.d(graphics.Graphic_965)
		.tr(44.2,17.7);

	this.shape_94 = new Graphics()
		.d(graphics.Graphic_966)
		.tr(3.8,37.2);

	this.shape_95 = new Graphics()
		.d(graphics.Graphic_967)
		.tr(59,11.3);

	this.shape_96 = new Graphics()
		.d(graphics.Graphic_968)
		.tr(34.6,27.5);

	this.shape_97 = new Graphics()
		.d(graphics.Graphic_969)
		.tr(51.6,17.5);

	this.shape_98 = new Graphics()
		.d(graphics.Graphic_970)
		.tr(36.3,67.9);

	this.shape_99 = new Graphics()
		.d(graphics.Graphic_971)
		.tr(40.5,33.2);

	this.shape_100 = new Graphics()
		.d(graphics.Graphic_972)
		.tr(53.5,21);

	this.shape_101 = new Graphics()
		.d(graphics.Graphic_973)
		.tr(52.8,38.2);

	this.shape_102 = new Graphics()
		.d(graphics.Graphic_974)
		.tr(42.1,-61.5);

	this.shape_103 = new Graphics()
		.d(graphics.Graphic_975)
		.tr(42,-61.4);

	this.shape_104 = new Graphics()
		.d(graphics.Graphic_976)
		.tr(21.7,-17.5);

	this.shape_105 = new Graphics()
		.d(graphics.Graphic_977)
		.tr(15,-13.7,1,1,0,0,0,-6.6,4.8);

	this.shape_106 = new Graphics()
		.d(graphics.Graphic_978)
		.tr(46.8,-60.7);

	this.shape_107 = new Graphics()
		.d(graphics.Graphic_979)
		.tr(46.6,-60.7);

	this.shape_108 = new Graphics()
		.d(graphics.Graphic_980)
		.tr(23.3,-18.7);

	this.shape_109 = new Graphics()
		.d(graphics.Graphic_981)
		.tr(16.3,-15.1,1,1,0,0,0,-6.9,4.6);

	this.shape_110 = new Graphics()
		.d(graphics.Graphic_982)
		.tr(50.1,-59.8);

	this.shape_111 = new Graphics()
		.d(graphics.Graphic_983)
		.tr(49.9,-59.8);

	this.shape_112 = new Graphics()
		.d(graphics.Graphic_984)
		.tr(24.3,-19.5);

	this.shape_113 = new Graphics()
		.d(graphics.Graphic_985)
		.tr(24.3,-20.5);

	this.shape_114 = new Graphics()
		.d(graphics.Graphic_986)
		.tr(49.2,-60.2);

	this.shape_115 = new Graphics()
		.d(graphics.Graphic_987)
		.tr(48.9,-60.3);

	this.shape_116 = new Graphics()
		.d(graphics.Graphic_988)
		.tr(24,-19.5);

	this.shape_117 = new Graphics()
		.d(graphics.Graphic_989)
		.tr(23.9,-20.5);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]},2).to({state:[]},1).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42}]},6).to({state:[]},1).to({state:[{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]},1).to({state:[{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50}]},1).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54}]},1).to({state:[{t:this.shape_60},{t:this.shape_59}]},1).to({state:[{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61}]},1).to({state:[{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66}]},1).to({state:[{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71}]},1).to({state:[]},1).to({state:[{t:this.shape_76},{t:this.shape_75}]},1).to({state:[{t:this.shape_78},{t:this.shape_77}]},1).to({state:[{t:this.shape_80},{t:this.shape_79}]},1).to({state:[{t:this.shape_82},{t:this.shape_81}]},1).to({state:[]},1).to({state:[{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83}]},1).to({state:[{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.instance_1,p:{regX:9.4,scaleX:0.953,scaleY:0.998,skewX:60.7,skewY:-116.6,x:51.8,y:10.6}}]},1).to({state:[{t:this.instance_1,p:{regX:9.5,scaleX:0.975,scaleY:0.975,skewX:61,skewY:-119,x:58.7,y:7.4}}]},1).to({state:[{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92}]},1).to({state:[{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97}]},1).to({state:[]},1).to({state:[{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102}]},29).to({state:[{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106}]},1).to({state:[{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110}]},1).to({state:[{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114}]},1).to({state:[]},1).wait(28));

	// pad
	this.shape_118 = new Graphics()
		.d(graphics.Graphic_990)
		.tr(30.6,44.6);

	this.shape_119 = new Graphics()
		.d(graphics.Graphic_991)
		.tr(30.6,44.8);

	this.shape_120 = new Graphics()
		.d(graphics.Graphic_992)
		.tr(58.5,84.4);

	this.instance_2 = new lib.FIZ34_Skate1_ArmPadL("synched",0)
		.tr(44.5,-24.8,0.995,0.995,0,71.4,-108.6);

	this.shape_121 = new Graphics()
		.d(graphics.Graphic_995)
		.tr(49.3,-23.4);

	this.shape_122 = new Graphics()
		.d(graphics.Graphic_996)
		.tr(49.4,-23.2);

	this.shape_123 = new Graphics()
		.d(graphics.Graphic_997)
		.tr(48.1,-6);

	this.shape_124 = new Graphics()
		.d(graphics.Graphic_998)
		.tr(48.7,-6.7);

	this.shape_125 = new Graphics()
		.d(graphics.Graphic_999)
		.tr(58.3,-30.5);

	this.shape_126 = new Graphics()
		.d(graphics.Graphic_1000)
		.tr(57.2,-29.6);

	this.shape_127 = new Graphics()
		.d(graphics.Graphic_1001)
		.tr(50.4,-43.4);

	this.shape_128 = new Graphics()
		.d(graphics.Graphic_1002)
		.tr(54.9,-38.2);

	this.shape_129 = new Graphics()
		.d(graphics.Graphic_1003)
		.tr(32.3,-62.8);

	this.shape_130 = new Graphics()
		.d(graphics.Graphic_1004)
		.tr(43.8,-48.3);

	this.shape_131 = new Graphics()
		.d(graphics.Graphic_305)
		.tr(46,-12.8,0.998,0.998,0,34.4,-145.6);

	this.shape_132 = new Graphics()
		.d(graphics.Graphic_306)
		.tr(46.2,-13.2,0.998,0.998,0,34.4,-145.6);

	this.shape_133 = new Graphics()
		.d(graphics.Graphic_1007)
		.tr(46.4,8.6);

	this.shape_134 = new Graphics()
		.d(graphics.Graphic_1008)
		.tr(47.5,7.6);

	this.shape_135 = new Graphics()
		.d(graphics.Graphic_1009)
		.tr(46.8,17);

	this.shape_136 = new Graphics()
		.d(graphics.Graphic_1010)
		.tr(46.3,17.8);

	this.shape_137 = new Graphics()
		.d(graphics.Graphic_1011)
		.tr(54.1,-46);

	this.shape_138 = new Graphics()
		.d(graphics.Graphic_1012)
		.tr(58.5,-40.7);

	this.shape_139 = new Graphics()
		.d(graphics.Graphic_1013)
		.tr(37.7,-66.9);

	this.shape_140 = new Graphics()
		.d(graphics.Graphic_1014)
		.tr(47.8,-51.4);

	this.shape_141 = new Graphics()
		.d(graphics.Graphic_1015)
		.tr(58.3,-41.3);

	this.shape_142 = new Graphics()
		.d(graphics.Graphic_1016)
		.tr(17,-96.2);

	this.shape_143 = new Graphics()
		.d(graphics.Graphic_1017)
		.tr(47.8,-51.4);

	this.shape_144 = new Graphics()
		.d(graphics.Graphic_1018)
		.tr(45.8,14.5);

	this.shape_145 = new Graphics()
		.d(graphics.Graphic_1019)
		.tr(46.2,13.8);

	this.shape_146 = new Graphics()
		.d(graphics.Graphic_1020)
		.tr(46.4,17.4);

	this.shape_147 = new Graphics()
		.d(graphics.Graphic_1021)
		.tr(47.2,16.6);

	this.shape_148 = new Graphics()
		.d(graphics.Graphic_1022)
		.tr(58.6,7.9);

	this.shape_149 = new Graphics()
		.d(graphics.Graphic_1023)
		.tr(58.7,3.6);

	this.shape_150 = new Graphics()
		.d(graphics.Graphic_1024)
		.tr(41.4,-0.6);

	this.shape_151 = new Graphics()
		.d(graphics.Graphic_1025)
		.tr(50.5,-0.4);

	this.shape_152 = new Graphics()
		.d(graphics.Graphic_1026)
		.tr(54.7,12.5);

	this.shape_153 = new Graphics()
		.d(graphics.Graphic_1027)
		.tr(54.6,13);

	this.shape_154 = new Graphics()
		.d(graphics.Graphic_1028)
		.tr(38.1,25.2);

	this.shape_155 = new Graphics()
		.d(graphics.Graphic_1029)
		.tr(38.1,25.8);

	this.shape_156 = new Graphics()
		.d(graphics.Graphic_1030)
		.tr(30.8,-50.5);

	this.shape_157 = new Graphics()
		.d(graphics.Graphic_1031)
		.tr(30.5,-50.5);

	this.shape_158 = new Graphics()
		.d(graphics.Graphic_1032)
		.tr(53.7,-4.6);

	this.shape_159 = new Graphics()
		.d(graphics.Graphic_1033)
		.tr(53.1,-4.3);

	this.shape_160 = new Graphics()
		.d(graphics.Graphic_1034)
		.tr(47.7,-24.7);

	this.shape_161 = new Graphics()
		.d(graphics.Graphic_1035)
		.tr(47.8,-24.5);

	this.shape_162 = new Graphics()
		.d(graphics.Graphic_1036)
		.tr(34.6,-51.5);

	this.shape_163 = new Graphics()
		.d(graphics.Graphic_1037)
		.tr(34.4,-51.4);

	this.shape_164 = new Graphics()
		.d(graphics.Graphic_1038)
		.tr(25.1,-30.3);

	this.shape_165 = new Graphics()
		.d(graphics.Graphic_1039)
		.tr(78.2,-0.8);

	this.shape_166 = new Graphics()
		.d(graphics.Graphic_1040)
		.tr(53.6,-4.9);

	this.shape_167 = new Graphics()
		.d(graphics.Graphic_1041)
		.tr(54.3,-5.2);

	this.shape_168 = new Graphics()
		.d(graphics.Graphic_1042)
		.tr(49,-25.2);

	this.shape_169 = new Graphics()
		.d(graphics.Graphic_1043)
		.tr(37.2,-52.2);

	this.shape_170 = new Graphics()
		.d(graphics.Graphic_1044)
		.tr(37,-52.2);

	this.shape_171 = new Graphics()
		.d(graphics.Graphic_1045)
		.tr(54.6,-5.6);

	this.shape_172 = new Graphics()
		.d(graphics.Graphic_1046)
		.tr(54,-5.4);

	this.shape_173 = new Graphics()
		.d(graphics.Graphic_1047)
		.tr(49.7,-25.9);

	this.shape_174 = new Graphics()
		.d(graphics.Graphic_1048)
		.tr(49.8,-25.7);

	this.shape_175 = new Graphics()
		.d(graphics.Graphic_1049)
		.tr(36.4,-52.2);

	this.shape_176 = new Graphics()
		.d(graphics.Graphic_1050)
		.tr(36.2,-52.2);

	this.shape_177 = new Graphics()
		.d(graphics.Graphic_1051)
		.tr(54.4,-5.6);

	this.shape_178 = new Graphics()
		.d(graphics.Graphic_1052)
		.tr(53.8,-5.4);

	this.shape_179 = new Graphics()
		.d(graphics.Graphic_1053)
		.tr(49.5,-25.9);

	this.shape_180 = new Graphics()
		.d(graphics.Graphic_1054)
		.tr(49.5,-25.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_120},{t:this.shape_119},{t:this.shape_118}]},2).to({state:[]},1).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.shape_122},{t:this.shape_121}]},1).to({state:[]},1).to({state:[{t:this.shape_124},{t:this.shape_123}]},1).to({state:[]},1).to({state:[{t:this.shape_126},{t:this.shape_125}]},1).to({state:[{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127}]},1).to({state:[{t:this.shape_132},{t:this.shape_131}]},1).to({state:[{t:this.shape_134},{t:this.shape_133}]},1).to({state:[{t:this.shape_136},{t:this.shape_135}]},1).to({state:[]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137}]},1).to({state:[{t:this.shape_143},{t:this.shape_142},{t:this.shape_138},{t:this.shape_137},{t:this.shape_141}]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137}]},1).to({state:[{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137}]},1).to({state:[]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},1).to({state:[{t:this.shape_147},{t:this.shape_146}]},1).to({state:[{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]},1).to({state:[{t:this.shape_153},{t:this.shape_152}]},1).to({state:[{t:this.shape_155},{t:this.shape_154}]},1).to({state:[]},1).to({state:[{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156}]},29).to({state:[{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162}]},1).to({state:[{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169}]},1).to({state:[{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175}]},1).to({state:[]},1).wait(28));

	// Layer 4
	this.shape_181 = new Graphics()
		.d(graphics.Graphic_1055)
		.tr(58.8,83.2);

	this.shape_182 = new Graphics()
		.d(graphics.Graphic_1056)
		.tr(47.3,-36.7);

	this.shape_183 = new Graphics()
		.d(graphics.Graphic_1057)
		.tr(47.4,-36.4);

	this.shape_184 = new Graphics()
		.d(graphics.Graphic_1058)
		.tr(50.8,-39.9);

	this.shape_185 = new Graphics()
		.d(graphics.Graphic_1059)
		.tr(50.7,-40.1);

	this.shape_186 = new Graphics()
		.d(graphics.Graphic_1060)
		.tr(56.8,16);

	this.shape_187 = new Graphics()
		.d(graphics.Graphic_1061)
		.tr(57.3,15.2);

	this.shape_188 = new Graphics()
		.d(graphics.Graphic_1062)
		.tr(39,-30.9);

	this.shape_189 = new Graphics()
		.d(graphics.Graphic_1063)
		.tr(39.1,-30.8);

	this.shape_190 = new Graphics()
		.d(graphics.Graphic_1064)
		.tr(28.7,-73.4);

	this.shape_191 = new Graphics()
		.d(graphics.Graphic_1065)
		.tr(19.3,-19.1);

	this.shape_192 = new Graphics()
		.d(graphics.Graphic_1066)
		.tr(19.4,-18.9);

	this.shape_193 = new Graphics()
		.d(graphics.Graphic_1067)
		.tr(20.3,-19.9);

	this.shape_194 = new Graphics()
		.d(graphics.Graphic_1068)
		.tr(20.3,-19.8);

	this.shape_195 = new Graphics()
		.d(graphics.Graphic_1069)
		.tr(20,-19.9);

	this.shape_196 = new Graphics()
		.d(graphics.Graphic_1070)
		.tr(20,-19.8);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_181}]},2).to({state:[]},1).to({state:[{t:this.shape_183},{t:this.shape_182}]},11).to({state:[]},1).to({state:[{t:this.shape_185},{t:this.shape_184}]},4).to({state:[{t:this.shape_185},{t:this.shape_184}]},1).to({state:[{t:this.shape_185},{t:this.shape_184}]},1).to({state:[{t:this.shape_185},{t:this.shape_184}]},1).to({state:[]},1).to({state:[{t:this.shape_187},{t:this.shape_186}]},3).to({state:[]},1).to({state:[{t:this.shape_190},{t:this.shape_189,p:{x:39.1,y:-30.8}},{t:this.shape_188,p:{x:39,y:-30.9}}]},30).to({state:[{t:this.shape_189,p:{x:17.9,y:-17.7}},{t:this.shape_188,p:{x:17.7,y:-17.8}}]},1).to({state:[{t:this.shape_192},{t:this.shape_191}]},1).to({state:[{t:this.shape_194},{t:this.shape_193}]},1).to({state:[{t:this.shape_196},{t:this.shape_195}]},1).to({state:[]},1).wait(28));

});

lib.FIZ34_Skate1_ArmL = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// strap
	this.shape = new Graphics()
		.d(graphics.Graphic_177)
		.tr(50.5,47.5);

	this.shape_1 = new Graphics()
		.d(graphics.Graphic_178)
		.tr(50.6,47.7);

	this.instance = new lib.FIZ34_Skate1_ArmStrapR("synched",0)
		.tr(51,1.2,0.998,0.998,-29.6,0,0,9.5,9.2)
		.re(false);

	this.shape_2 = new Graphics()
		.d(graphics.Graphic_181)
		.tr(125.6,32.8);

	this.shape_3 = new Graphics()
		.d(graphics.Graphic_182)
		.tr(125.6,32.8);

	this.shape_4 = new Graphics()
		.d(graphics.Graphic_183)
		.tr(55.6,14.5);

	this.shape_5 = new Graphics()
		.d(graphics.Graphic_184)
		.tr(55.9,14.5);

	this.shape_6 = new Graphics()
		.d(graphics.Graphic_185)
		.tr(89.8,28.1);

	this.shape_7 = new Graphics()
		.d(graphics.Graphic_186)
		.tr(90,28.1);

	this.shape_8 = new Graphics()
		.d(graphics.Graphic_187)
		.tr(57.7,32.2);

	this.shape_9 = new Graphics()
		.d(graphics.Graphic_188)
		.tr(57.8,32.4);

	this.shape_10 = new Graphics()
		.d(graphics.Graphic_189)
		.tr(94.8,56.3);

	this.shape_11 = new Graphics()
		.d(graphics.Graphic_190)
		.tr(94.7,56.3);

	this.shape_12 = new Graphics()
		.d(graphics.Graphic_191)
		.tr(133.8,-20.3);

	this.shape_13 = new Graphics()
		.d(graphics.Graphic_192)
		.tr(133.8,-20.3);

	this.shape_14 = new Graphics()
		.d(graphics.Graphic_193)
		.tr(78.1,18.1);

	this.shape_15 = new Graphics()
		.d(graphics.Graphic_194)
		.tr(77.8,18.1);

	this.shape_16 = new Graphics()
		.d(graphics.Graphic_195)
		.tr(91.5,36);

	this.shape_17 = new Graphics()
		.d(graphics.Graphic_196)
		.tr(91.7,36.4);

	this.shape_18 = new Graphics()
		.d(graphics.Graphic_197)
		.tr(86.8,44.6);

	this.shape_19 = new Graphics()
		.d(graphics.Graphic_198)
		.tr(86.8,44.6);

	this.shape_20 = new Graphics()
		.d(graphics.Graphic_199)
		.tr(29.4,26.1);

	this.shape_21 = new Graphics()
		.d(graphics.Graphic_200)
		.tr(29.7,26.1);

	this.shape_22 = new Graphics()
		.d(graphics.Graphic_201)
		.tr(45.4,36.2);

	this.shape_23 = new Graphics()
		.d(graphics.Graphic_202)
		.tr(45.3,36.1);

	this.shape_24 = new Graphics()
		.d(graphics.Graphic_203)
		.tr(94,24.6);

	this.shape_25 = new Graphics()
		.d(graphics.Graphic_204)
		.tr(94,24.2);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[]},1).to({state:[{t:this.instance}]},4).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_13},{t:this.shape_12}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.instance}]},1).to({state:[]},1).to({state:[{t:this.shape_17},{t:this.shape_16}]},2).to({state:[{t:this.shape_19},{t:this.shape_18}]},1).to({state:[{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_23},{t:this.shape_22}]},1).to({state:[]},1).to({state:[{t:this.shape_25},{t:this.shape_24}]},12).to({state:[]},1).wait(45));
	//this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({_off:false},0).to({_off:true},1).wait(6).to({_off:false,rotation:-36.6,x:19.8,y:27.1},0).wait(1).to({rotation:-40.1,x:23.9,y:8.8},0).to({_off:true},1).wait(1).to({_off:false,regX:9.3,regY:9.3,scaleX:0.98,scaleY:0.98,rotation:-53.7,x:45.1,y:9.8},0).wait(1).to({regX:9.4,rotation:-46.9,x:32.2,y:33.8},0).wait(1).to({x:31,y:40.2},0).to({_off:true},1).wait(64));

	// strap
	this.shape_26 = new Graphics()
		.d(graphics.Graphic_205)
		.tr(36.4,74.8);

	this.shape_27 = new Graphics()
		.d(graphics.Graphic_206)
		.tr(36.4,75);

	this.shape_28 = new Graphics()
		.d(graphics.Graphic_207)
		.tr(24.7,87.2);

	this.shape_29 = new Graphics()
		.d(graphics.Graphic_208)
		.tr(33.9,30.8);

	this.shape_30 = new Graphics()
		.d(graphics.Graphic_209)
		.tr(34.5,30.7);

	this.shape_31 = new Graphics()
		.d(graphics.Graphic_210)
		.tr(27.1,40.3);

	this.shape_32 = new Graphics()
		.d(graphics.Graphic_211)
		.tr(44.2,51.8);

	this.shape_33 = new Graphics()
		.d(graphics.Graphic_212)
		.tr(29.3,50.7);

	this.shape_34 = new Graphics()
		.d(graphics.Graphic_213)
		.tr(50.6,3.2);

	this.shape_35 = new Graphics()
		.d(graphics.Graphic_214)
		.tr(50.5,14.6);

	this.shape_36 = new Graphics()
		.d(graphics.Graphic_215)
		.tr(36.7,12.9);

	this.shape_37 = new Graphics()
		.d(graphics.Graphic_216)
		.tr(26.6,28.6);

	this.shape_38 = new Graphics()
		.d(graphics.Graphic_217)
		.tr(38.3,18.6);

	this.shape_39 = new Graphics()
		.d(graphics.Graphic_218)
		.tr(55.2,17.5);

	this.shape_40 = new Graphics()
		.d(graphics.Graphic_219)
		.tr(55.4,17.6);

	this.instance_1 = new lib.FIZ34_Skate1_ArmStrapR("synched",0)
		.tr(58.1,3.1,0.998,0.998,-39.7,0,0,9.5,9.3);

	this.shape_41 = new Graphics()
		.d(graphics.Graphic_222)
		.tr(41.5,9);

	this.shape_42 = new Graphics()
		.d(graphics.Graphic_223)
		.tr(59.8,11.1);

	this.shape_43 = new Graphics()
		.d(graphics.Graphic_224)
		.tr(52.5,2.4);

	this.shape_44 = new Graphics()
		.d(graphics.Graphic_225)
		.tr(43.2,11);

	this.shape_45 = new Graphics()
		.d(graphics.Graphic_226)
		.tr(45.9,8.4);

	this.shape_46 = new Graphics()
		.d(graphics.Graphic_227)
		.tr(57.1,5.1);

	this.shape_47 = new Graphics()
		.d(graphics.Graphic_228)
		.tr(75.3,8.9);

	this.shape_48 = new Graphics()
		.d(graphics.Graphic_229)
		.tr(55,9.3);

	this.shape_49 = new Graphics()
		.d(graphics.Graphic_230)
		.tr(64.1,67.7);

	this.shape_50 = new Graphics()
		.d(graphics.Graphic_231)
		.tr(54.2,71.4);

	this.shape_51 = new Graphics()
		.d(graphics.Graphic_232)
		.tr(37.2,19.8);

	this.shape_52 = new Graphics()
		.d(graphics.Graphic_233)
		.tr(37.6,34.6);

	this.shape_53 = new Graphics()
		.d(graphics.Graphic_234)
		.tr(33.7,27.9);

	this.shape_54 = new Graphics()
		.d(graphics.Graphic_235)
		.tr(35.6,45.8);

	this.shape_55 = new Graphics()
		.d(graphics.Graphic_236)
		.tr(48.2,22.9);

	this.shape_56 = new Graphics()
		.d(graphics.Graphic_237)
		.tr(47.9,23);

	this.shape_57 = new Graphics()
		.d(graphics.Graphic_238)
		.tr(21.4,29);

	this.shape_58 = new Graphics()
		.d(graphics.Graphic_239)
		.tr(15.8,34.8);

	this.shape_59 = new Graphics()
		.d(graphics.Graphic_240)
		.tr(31.2,42.7);

	this.shape_60 = new Graphics()
		.d(graphics.Graphic_241)
		.tr(37,69.3);

	this.shape_61 = new Graphics()
		.d(graphics.Graphic_242)
		.tr(18,52.3);

	this.shape_62 = new Graphics()
		.d(graphics.Graphic_243)
		.tr(15.6,20.3);

	this.shape_63 = new Graphics()
		.d(graphics.Graphic_244)
		.tr(54.4,49.8);

	this.shape_64 = new Graphics()
		.d(graphics.Graphic_245)
		.tr(24.3,11.2);

	this.shape_65 = new Graphics()
		.d(graphics.Graphic_246)
		.tr(34.2,21.1);

	this.shape_66 = new Graphics()
		.d(graphics.Graphic_247)
		.tr(23.3,34);

	this.shape_67 = new Graphics()
		.d(graphics.Graphic_248)
		.tr(56.9,-6.3);

	this.shape_68 = new Graphics()
		.d(graphics.Graphic_249)
		.tr(57.1,-6);

	this.shape_69 = new Graphics()
		.d(graphics.Graphic_931)
		.tr(42.4,10.2);

	this.shape_70 = new Graphics()
		.d(graphics.Graphic_932)
		.tr(45.8,2.9);

	this.shape_71 = new Graphics()
		.d(graphics.Graphic_933)
		.tr(64.9,-0.4);

	this.shape_72 = new Graphics()
		.d(graphics.Graphic_934)
		.tr(116.4,-10.8);

	this.shape_73 = new Graphics()
		.d(graphics.Graphic_935)
		.tr(68.6,-5.6);

	this.shape_74 = new Graphics()
		.d(graphics.Graphic_255)
		.tr(38.7,19.5);

	this.shape_75 = new Graphics()
		.d(graphics.Graphic_256)
		.tr(53.2,21.3);

	this.shape_76 = new Graphics()
		.d(graphics.Graphic_257)
		.tr(97.4,0.1);

	this.shape_77 = new Graphics()
		.d(graphics.Graphic_258)
		.tr(33.2,33.6);

	this.shape_78 = new Graphics()
		.d(graphics.Graphic_259)
		.tr(59.3,12.7);

	this.shape_79 = new Graphics()
		.d(graphics.Graphic_260)
		.tr(31.5,24.8);

	this.shape_80 = new Graphics()
		.d(graphics.Graphic_261)
		.tr(27.6,38.8);

	this.shape_81 = new Graphics()
		.d(graphics.Graphic_262)
		.tr(44.9,32.7);

	this.shape_82 = new Graphics()
		.d(graphics.Graphic_263)
		.tr(35.7,25);

	this.shape_83 = new Graphics()
		.d(graphics.Graphic_264)
		.tr(30.6,21.6);

	this.shape_84 = new Graphics()
		.d(graphics.Graphic_265)
		.tr(28.1,34.3);

	this.shape_85 = new Graphics()
		.d(graphics.Graphic_266)
		.tr(47.6,31);

	this.shape_86 = new Graphics()
		.d(graphics.Graphic_267)
		.tr(37.6,21.6);

	this.shape_87 = new Graphics()
		.d(graphics.Graphic_268)
		.tr(25.7,24.5);

	this.shape_88 = new Graphics()
		.d(graphics.Graphic_269)
		.tr(40.7,35.3);

	this.shape_89 = new Graphics()
		.d(graphics.Graphic_270)
		.tr(71.2,68.9);

	this.shape_90 = new Graphics()
		.d(graphics.Graphic_271)
		.tr(27.3,25.7);

	this.shape_91 = new Graphics()
		.d(graphics.Graphic_272)
		.tr(44.4,46.4);

	this.shape_92 = new Graphics()
		.d(graphics.Graphic_273)
		.tr(36.4,29.4);

	this.shape_93 = new Graphics()
		.d(graphics.Graphic_274)
		.tr(44.5,82.1);

	this.shape_94 = new Graphics()
		.d(graphics.Graphic_275)
		.tr(45,46.9);

	this.shape_95 = new Graphics()
		.d(graphics.Graphic_276)
		.tr(32.9,32.8);

	this.shape_96 = new Graphics()
		.d(graphics.Graphic_277)
		.tr(33.9,48.7);

	this.shape_97 = new Graphics()
		.d(graphics.Graphic_278)
		.tr(32.5,15.2);

	this.shape_98 = new Graphics()
		.d(graphics.Graphic_279)
		.tr(28.5,7.5);

	this.shape_99 = new Graphics()
		.d(graphics.Graphic_280)
		.tr(59.8,10.7);

	this.shape_100 = new Graphics()
		.d(graphics.Graphic_281)
		.tr(44.5,14.9);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).to({state:[]},1).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34}]},4).to({state:[{t:this.shape_40},{t:this.shape_39}]},1).to({state:[{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.instance_1,p:{x:58.1,y:3.1,regX:9.5,scaleX:0.998,scaleY:0.998,rotation:-39.7,regY:9.3}}]},1).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.instance_1,p:{x:59.1,y:3.9,regX:9.5,scaleX:0.998,scaleY:0.998,rotation:-39.7,regY:9.3}}]},1).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49}]},1).to({state:[{t:this.shape_56},{t:this.shape_55}]},1).to({state:[]},1).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57}]},1).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62}]},1).to({state:[{t:this.shape_68},{t:this.shape_67}]},1).to({state:[{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]},1).to({state:[{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74}]},1).to({state:[{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79}]},1).to({state:[]},1).to({state:[{t:this.instance_1,p:{x:32.8,y:35.1,regX:9.4,scaleX:0.977,scaleY:0.977,rotation:-40.6,regY:9.3}}]},1).to({state:[{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.instance_1,p:{x:27.8,y:32.4,regX:9.4,scaleX:0.977,scaleY:0.977,rotation:-29.3,regY:9.3}}]},1).to({state:[{t:this.instance_1,p:{x:27.6,y:25.9,regX:9.4,scaleX:0.977,scaleY:0.977,rotation:-29.3,regY:9.3}}]},1).to({state:[{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87}]},1).to({state:[{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92}]},1).to({state:[]},1).to({state:[{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.instance_1,p:{x:29.8,y:6,regX:9.5,scaleX:0.959,scaleY:0.92,rotation:-49.8,regY:9.2}}]},12).to({state:[]},1).wait(45));

	// arm
	this.shape_101 = new Graphics()
		.d(graphics.Graphic_282)
		.tr(55.1,48.8);

	this.shape_102 = new Graphics()
		.d(graphics.Graphic_283)
		.tr(55.1,48.8);

	this.instance_2 = new lib.FIZ34_Skate1_ArmPadL("synched",0)
		.tr(52.8,3.9,0.997,0.997,-38.3);

	this.shape_103 = new Graphics()
		.d(graphics.Graphic_286)
		.tr(54.2,19.7);

	this.shape_104 = new Graphics()
		.d(graphics.Graphic_287)
		.tr(49.1,16.5);

	this.shape_105 = new Graphics()
		.d(graphics.Graphic_288)
		.tr(80.1,27.7);

	this.shape_106 = new Graphics()
		.d(graphics.Graphic_289)
		.tr(61.2,24.1);

	this.shape_107 = new Graphics()
		.d(graphics.Graphic_290)
		.tr(63.2,31.1);

	this.shape_108 = new Graphics()
		.d(graphics.Graphic_291)
		.tr(63.2,31.6);

	this.shape_109 = new Graphics()
		.d(graphics.Graphic_292)
		.tr(44.1,20.7);

	this.shape_110 = new Graphics()
		.d(graphics.Graphic_293)
		.tr(59.1,36.8);

	this.shape_111 = new Graphics()
		.d(graphics.Graphic_294)
		.tr(39.3,27.8);

	this.shape_112 = new Graphics()
		.d(graphics.Graphic_295)
		.tr(43.7,32.2);

	this.shape_113 = new Graphics()
		.d(graphics.Graphic_296)
		.tr(20.8,20.9);

	this.shape_114 = new Graphics()
		.d(graphics.Graphic_297)
		.tr(20.9,20.4);

	this.shape_115 = new Graphics()
		.d(graphics.Graphic_298)
		.tr(24.5,2.4);

	this.shape_116 = new Graphics()
		.d(graphics.Graphic_299)
		.tr(24.8,3.1);

	this.shape_117 = new Graphics()
		.d(graphics.Graphic_300)
		.tr(121,-17.3);

	this.shape_118 = new Graphics()
		.d(graphics.Graphic_301)
		.tr(55.7,-7.9);

	this.shape_119 = new Graphics()
		.d(graphics.Graphic_302)
		.tr(51.4,-4.7);

	this.shape_120 = new Graphics()
		.d(graphics.Graphic_303)
		.tr(51.5,-5.1);

	this.shape_121 = new Graphics()
		.d(graphics.Graphic_304)
		.tr(64.7,-10.2);

	this.shape_122 = new Graphics()
		.d(graphics.Graphic_1005)
		.tr(45.4,18.5);

	this.shape_123 = new Graphics()
		.d(graphics.Graphic_1006)
		.tr(45.4,18);

	this.shape_124 = new Graphics()
		.d(graphics.Graphic_307)
		.tr(33.7,40.9);

	this.shape_125 = new Graphics()
		.d(graphics.Graphic_308)
		.tr(34,40.2);

	this.shape_126 = new Graphics()
		.d(graphics.Graphic_309)
		.tr(33.2,45.1);

	this.shape_127 = new Graphics()
		.d(graphics.Graphic_310)
		.tr(32.6,46);

	this.shape_128 = new Graphics()
		.d(graphics.Graphic_311)
		.tr(89.3,26.8);

	this.shape_129 = new Graphics()
		.d(graphics.Graphic_312)
		.tr(89.1,26.9);

	this.shape_130 = new Graphics()
		.d(graphics.Graphic_313)
		.tr(48.1,33.6);

	this.shape_131 = new Graphics()
		.d(graphics.Graphic_314)
		.tr(31.9,24.8);

	this.shape_132 = new Graphics()
		.d(graphics.Graphic_315)
		.tr(32.3,37.1);

	this.shape_133 = new Graphics()
		.d(graphics.Graphic_316)
		.tr(37.4,25.1);

	this.shape_134 = new Graphics()
		.d(graphics.Graphic_317)
		.tr(30,40.8);

	this.shape_135 = new Graphics()
		.d(graphics.Graphic_318)
		.tr(30.6,40);

	this.shape_136 = new Graphics()
		.d(graphics.Graphic_319)
		.tr(27.2,27.5);

	this.shape_137 = new Graphics()
		.d(graphics.Graphic_320)
		.tr(26.6,21);

	this.shape_138 = new Graphics()
		.d(graphics.Graphic_321)
		.tr(42.2,33);

	this.shape_139 = new Graphics()
		.d(graphics.Graphic_322)
		.tr(34.3,24.3);

	this.shape_140 = new Graphics()
		.d(graphics.Graphic_323)
		.tr(30.6,28.9);

	this.shape_141 = new Graphics()
		.d(graphics.Graphic_324)
		.tr(30.6,28.4);

	this.shape_142 = new Graphics()
		.d(graphics.Graphic_325)
		.tr(48.5,39.2);

	this.shape_143 = new Graphics()
		.d(graphics.Graphic_326)
		.tr(48.6,39.6);

	this.shape_144 = new Graphics()
		.d(graphics.Graphic_327)
		.tr(30.4,14.5);

	this.shape_145 = new Graphics()
		.d(graphics.Graphic_328)
		.tr(29.9,13.7);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_102},{t:this.shape_101}]},1).to({state:[]},1).to({state:[{t:this.instance_2,p:{x:52.8,y:3.9}}]},4).to({state:[{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103}]},1).to({state:[{t:this.instance_2,p:{x:59.1,y:4.4}}]},1).to({state:[{t:this.instance_2,p:{x:62.1,y:4.4}}]},1).to({state:[{t:this.shape_108},{t:this.shape_107}]},1).to({state:[{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109}]},1).to({state:[]},1).to({state:[{t:this.shape_114},{t:this.shape_113}]},1).to({state:[{t:this.shape_116},{t:this.shape_115}]},1).to({state:[{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117}]},1).to({state:[{t:this.shape_123},{t:this.shape_122}]},1).to({state:[{t:this.shape_125},{t:this.shape_124}]},1).to({state:[{t:this.shape_127},{t:this.shape_126}]},1).to({state:[]},1).to({state:[{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128}]},1).to({state:[{t:this.shape_135},{t:this.shape_134}]},1).to({state:[{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136}]},1).to({state:[{t:this.shape_141},{t:this.shape_140}]},1).to({state:[{t:this.shape_143},{t:this.shape_142}]},1).to({state:[]},1).to({state:[{t:this.shape_145},{t:this.shape_144}]},12).to({state:[]},1).wait(45));

	// pad
	this.shape_146 = new Graphics()
		.d(graphics.Graphic_329)
		.tr(51.6,24.5);

	this.shape_147 = new Graphics()
		.d(graphics.Graphic_330)
		.tr(51.4,24.9);

	this.shape_148 = new Graphics()
		.d(graphics.Graphic_331)
		.tr(54.3,25.6);

	this.shape_149 = new Graphics()
		.d(graphics.Graphic_332)
		.tr(54.3,26);

	this.shape_150 = new Graphics()
		.d(graphics.Graphic_333)
		.tr(57.3,2.6);

	this.shape_151 = new Graphics()
		.d(graphics.Graphic_334)
		.tr(57,3.3);

	this.shape_152 = new Graphics()
		.d(graphics.Graphic_335)
		.tr(33.6,41.9);

	this.shape_153 = new Graphics()
		.d(graphics.Graphic_336)
		.tr(34.2,41);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_147},{t:this.shape_146}]},7).to({state:[]},1).to({state:[{t:this.shape_149},{t:this.shape_148}]},3).to({state:[]},1).to({state:[{t:this.shape_151},{t:this.shape_150}]},3).to({state:[]},1).to({state:[{t:this.shape_153,p:{x:34.2,y:41}},{t:this.shape_152,p:{x:33.6,y:41.9}}]},4).to({state:[]},1).to({state:[{t:this.shape_153,p:{x:27,y:32.3}},{t:this.shape_152,p:{x:26.3,y:33.2}}]},1).to({state:[]},1).wait(60));

});

// stage content:



lib.Fizzy = MovieClip.extend(function(mode,startPosition,loop) 
{
	MovieClip.call(this, mode,startPosition,loop,{});

	// FIZ34_Skate1_Apron
	this.instance = new lib.FIZ34_Skate1_Apron("single",71)
		.tr(257.4,524.3,1.274,1.274,0,0.4,-179.6,28.9,150.5);

	this.instance_1 = new lib.FIZ34_Skate1_Apron_flap("synched",11,false)
		.tr(278.3,360.1,1.27,1.271,0,-16.4,162.9,37.4,15.6)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:150.6,skewX:3,skewY:-177,x:257.5},0).wait(1).to({regY:150.5,scaleX:1.27,scaleY:1.27,skewX:4.3,skewY:-175.7,y:524.1},0).wait(1).to({regY:150.6,skewX:4.8,skewY:-175.2,y:524.2},0).wait(23).to({skewX:5.3,skewY:-174.7,x:257.4},0).wait(4).to({regX:28.8,skewX:4.4,skewY:-175.6,x:257.5},0).wait(1).to({regY:150.7,skewX:2.1,skewY:-177.9},0).wait(1).to({skewX:-1.2,skewY:-181.2},0).wait(1).to({regX:28.7,skewX:-2,skewY:-182,x:257.6},0).wait(1).to({regX:28.8,skewX:-2.5,skewY:-182.5,x:257.5},0).wait(28).to({regX:28.9,scaleX:1.27,scaleY:1.27,skewX:-0.3,skewY:-180.3},0).wait(1).to({regY:150.8,skewX:4.8,skewY:-175.2,y:524.3},0).to({_off:true},1).wait(24).to({_off:false},0).wait(1).to({regX:28.8,skewX:1.5,skewY:-178.5,x:257.6},0).wait(1).to({regX:28.9,skewX:-0.1,skewY:-180.1,x:257.5,y:524.2},0).wait(2).to({skewX:-0.6,skewY:-180.6},0).wait(2).to({scaleX:1.27,scaleY:1.27,skewX:-0.1,skewY:-180.1,x:257.6,y:524.1},0).wait(12).to({skewX:-0.8,skewY:-180.8,x:257.5},0).wait(2).to({skewX:-1.6,skewY:-181.6},0).wait(2).to({skewX:-2.2,skewY:-182.2,y:524.2},0).wait(1).to({regY:150.9,skewX:5.4,skewY:-174.6,x:257.6,y:525},0).wait(1).to({regX:29,scaleX:1.27,scaleY:1.27,skewX:13,skewY:-167,x:257.5,y:525.6},0).wait(1).to({regX:28.9,regY:151,skewX:16.2,skewY:-163.8,x:257.7,y:528.1},0).wait(4).to({regX:28.8,skewX:14.8,skewY:-165.2,x:257.5,y:528},0).wait(2).to({regX:28.9,regY:150.9,skewX:14,skewY:-166,x:257.7},0).wait(7).to({scaleX:1.28,scaleY:1.28,skewX:14.5,skewY:-165.5,x:257.4,y:530.5},0).wait(1).to({regX:28.8,regY:150.8,scaleX:1.3,scaleY:1.3,skewX:14.8,skewY:-165.2,x:257,y:534},0).wait(1).to({regX:28.9,regY:151.1,scaleX:1.35,scaleY:1.35,skewX:15.6,skewY:-164.4,x:255.6,y:543.4},0).wait(4).to({regY:151,scaleX:1.33,scaleY:1.33,x:256.1,y:539.1},0).wait(25).to({regY:150.9,scaleX:1.32,scaleY:1.32,skewX:16.9,skewY:-163.1,x:256.4,y:537.7},0).wait(2).to({regY:151.1,scaleX:1.31,scaleY:1.31,skewX:11,skewY:-169,x:256.7,y:535.4},0).wait(1).to({regY:151,scaleX:1.29,scaleY:1.29,skewX:5.7,skewY:-174.3,x:256.9,y:532.8},0).wait(1).to({regY:150.9,scaleX:1.27,scaleY:1.27,skewX:-0.5,skewY:-180.5,x:258.7,y:527.8},0).wait(2).to({regX:28.8,regY:151,skewX:0.4,skewY:-179.6,x:258.8,y:527.9},0).wait(2).to({regX:28.9,regY:150.9,skewX:1.2,skewY:-178.8,x:258.7},0).wait(17));
	//this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(64).to({_off:false},0).wait(1).to({regY:15.5,scaleY:1.27,skewX:-13.7,skewY:165.7,x:286,y:365.3},0).wait(1).to({regY:15.6,skewX:-12.1,skewY:167.2,x:290.2,y:367.4},0).wait(1).to({skewX:-11.6,skewY:167.8,x:291.9,y:370.1},0).wait(2).to({skewX:-11,skewY:168.3,x:293.3,y:372.7},0).wait(4).to({skewX:-11.3,skewY:168,x:292.5,y:370.2},0).wait(12).to({regX:37.3,skewX:-10.5,skewY:168.9,x:294.8,y:370.6},0).wait(1).to({regY:15.5,skewX:-13.5,skewY:165.8,x:286.7,y:367},0).wait(1).to({regY:15.6,scaleX:1.27,skewX:-17.1,skewY:162.3,x:276.9,y:359.9},0).to({_off:true},1).wait(94));

	// Layer 9
	this.instance_2 = new lib.FIZ34_Skate1_ArmL("single",6)
		.tr(216.9,358,1.273,1.273,0,-5.3,174.7,2.9,4);

	this.instance_3 = new lib.FIZ34_Skate1_Torso("single",0)
		.tr(250.3,480.6,1.274,1.274,0,0.5,-179.5,34.6,9.2);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},24).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},10).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},16).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},5).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},2).to({state:[{t:this.instance_2}]},2).wait(17));
	//this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:1.9,regY:4.9,scaleX:1.27,scaleY:1.27,skewX:-31.1,skewY:148.9,x:226.8,y:352.1,startPosition:8},0).wait(1).to({skewX:-29.9,skewY:150.1,x:230.6,y:351.4,startPosition:9},0).wait(1).to({scaleX:1.3,skewX:-29.3,skewY:150.7,x:231.2,y:352.3,startPosition:7},0).wait(2).to({scaleX:1.28,skewX:-29.1,skewY:150.9,x:233,y:351.1},0).wait(23).to({scaleX:1.27,skewX:-26.9,skewY:153.1,x:234.8,y:350.8},0).wait(2).to({skewX:-28.2,skewY:151.8,x:230.8,y:351.4},0).wait(1).to({regX:2,regY:4.8,scaleX:1.27,scaleY:1.27,skewX:-34.5,skewY:145.5,x:223.8,y:352.6},0).wait(1).to({regY:4.9,scaleX:1.27,scaleY:1.28,skewX:-23.7,skewY:148.7,x:214.1,y:355,startPosition:11},0).wait(1).to({scaleY:1.27,skewX:-26.8,skewY:153.2,x:213.7,y:355.8,startPosition:10},0).wait(1).to({regX:1.9,regY:4.8,scaleX:1.27,scaleY:1.27,skewX:-17.6,skewY:162.4,x:210.3,startPosition:1},0).wait(4).to({regX:2,skewX:-15.5,skewY:164.5,x:210.4},0).wait(24).to({regY:4.9,skewX:-11,skewY:169,x:217,y:354.1},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-6,skewY:174,x:232,y:351.2},0).wait(1).to({regX:-19.3,regY:27.1,scaleX:1.26,scaleY:1.26,skewX:-3.7,skewY:176.3,x:256.9,y:360.1,startPosition:13},0).wait(1).to({regX:-22.8,regY:27.5,scaleX:1.26,scaleY:1.26,skewX:4.2,skewY:184.2,x:267.9,y:366.2,startPosition:14},0).wait(1).to({regX:-21.4,regY:27,scaleX:1.26,scaleY:1.26,skewX:8.4,skewY:188.4,x:269.9,y:367.3},0).wait(1).to({regX:-21.1,regY:27.6,skewX:12.4,skewY:192.4,x:270,y:371.1},0).wait(2).to({regX:2,regY:5,skewX:13.4,skewY:193.4,x:249.2,y:339.2},0).wait(4).to({regX:-20,regY:24.4,skewX:11.1,skewY:191.1,x:270.8,y:366.4},0).wait(10).to({skewX:12.4,skewY:192.4,x:271.6},0).wait(2).to({regX:-19.9,skewX:12.9,skewY:192.9,x:272.9},0).wait(1).to({scaleX:1.26,scaleY:1.26,skewX:9.9,skewY:189.9,x:264.8,y:364.1},0).wait(1).to({regX:-19.8,regY:24.3,scaleX:1.26,scaleY:1.26,skewX:-4,skewY:176,x:254.8,y:358.1,startPosition:37},0).wait(1).to({regX:2,regY:4.9,scaleX:1.27,scaleY:1.27,skewX:-12.1,skewY:167.9,x:232,y:351.3,startPosition:15},0).wait(1).to({regX:1.9,regY:4.8,skewX:-8.5,skewY:171.5,x:222.1,y:352.9},0).wait(1).to({skewX:-5.8,skewY:174.2,x:217.5,y:353.9},0).wait(16).to({regX:1.8,scaleX:1.26,scaleY:1.26,skewX:-6,skewY:174,x:215.4,y:354.3},0).wait(2).to({regX:1.9,skewX:-5.6,skewY:174.4,x:212.9,y:355},0).wait(2).to({regY:4.9,skewX:-7.7,skewY:172.3,x:211.3,y:355.6},0).wait(1).to({regY:4.8,skewX:-0.1,skewY:179.9,x:233.9,y:351.7,startPosition:16},0).wait(1).to({scaleX:1.26,scaleY:1.26,skewX:7.5,skewY:187.5,x:257,y:350.8,startPosition:17},0).wait(1).to({regY:4.9,skewX:6.9,skewY:185.7,x:266.9,y:353.6,startPosition:18},0).wait(2).to({skewX:8.4,skewY:188.4,x:265.4,y:353.5},0).wait(2).to({regX:1.8,skewX:8.8,skewY:188.8,x:262.7,y:353.3},0).wait(2).to({regX:1.9,regY:4.8,skewX:8.5,skewY:188.5,x:260.4},0).wait(5).to({scaleX:1.25,scaleY:1.25,x:260.7,y:352.7},0).wait(2).to({regX:1.8,regY:4.9,scaleX:1.28,scaleY:1.28,skewX:9,skewY:189,x:261.7,y:354.2,startPosition:20},0).wait(1).to({regX:1.9,regY:4.8,scaleX:1.3,scaleY:1.3,skewX:9.3,skewY:189.3,x:262.1,y:355,startPosition:21},0).wait(1).to({regY:4.7,scaleX:1.37,scaleY:1.37,skewX:8,skewY:188,x:263,y:356.9,startPosition:22},0).wait(2).to({regX:1.8,scaleX:1.35,scaleY:1.35,skewX:8.8,skewY:188.8,x:263.5,y:356.1},0).wait(2).to({regX:1.9,regY:4.8,scaleX:1.33,scaleY:1.33,skewX:9.6,skewY:189.6,x:263.8,y:356.2},0).wait(23).to({scaleX:1.31,scaleY:1.31,skewX:10.8,skewY:190.8,x:264.9,y:356.3},0).wait(2).to({regY:4.9,skewX:12.7,skewY:192.7,x:268.3,y:356.6},0).wait(2).to({scaleX:1.29,scaleY:1.29,skewX:5.5,skewY:185.5,x:250.2,y:355.9,startPosition:23},0).wait(1).to({regY:4.8,scaleX:1.26,scaleY:1.26,skewX:0.2,skewY:180.2,x:234.7,y:356.6,startPosition:24},0).wait(1).to({regX:1.8,regY:4.9,scaleY:1.26,skewX:-13,skewY:167.4,x:217.7,y:358.2,startPosition:1},0).wait(2).to({regX:1.9,scaleY:1.26,skewX:-10.7,skewY:169.3,x:220.3,y:357.6},0).wait(2).to({regY:5,scaleX:1.26,scaleY:1.26,skewX:-8.9,skewY:171.1,x:222.6,y:357.2},0).wait(17));

	// FIZ34_Skate1_Torso
	this.instance_4 = new lib.FIZ34_Skate1_Body("single",0)
		.tr(252.1,485.2,1.274,1.274,0,0.4,-179.6,33.3,119.8);

	this.instance_5 = new lib.FIZ34_Skate1_Torso("single",0)
		.tr(252.4,480.2,1.274,1.274,0,3,-177,34.6,9.2)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},23).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},4).to({state:[{t:this.instance_5}]},24).to({state:[{t:this.instance_5}]},1).to({state:[]},1).to({state:[{t:this.instance_5}]},24).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},16).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},5).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},23).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_5}]},2).wait(17));
	//this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({_off:false},0).wait(1).to({regX:34.7,skewX:4.3,skewY:-175.7,x:253.3,y:480.1},0).wait(1).to({skewX:4.8,skewY:-175.2,x:253.6},0).wait(2).to({regX:34.6,regY:9.1,scaleX:1.27,scaleY:1.27,skewX:5.1,skewY:-174.9,x:254,y:479.9},0).wait(23).to({skewX:5.7,skewY:-174.3,x:254.5,y:479.8},0).wait(2).to({skewX:4.4,skewY:-175.6,x:253.5},0).wait(1).to({skewX:2.1,skewY:-177.9,x:251.7,y:480.1},0).wait(1).to({skewX:-1.2,skewY:-181.2,x:249.2,y:480.5},0).wait(1).to({skewX:-2,skewY:-182,x:248.6,y:480.7},0).wait(1).to({regY:9,skewX:-2.5,skewY:-182.5,x:248.3},0).wait(4).to({regY:9.1,y:480.8},0).wait(24).to({scaleX:1.27,scaleY:1.27,skewX:-0.2,skewY:-180.2,x:250,y:480.4},0).wait(1).to({regY:9.2,skewX:4.8,skewY:-175.2,x:253.8,y:480},0).to({_off:true},1).wait(24).to({_off:false},0).wait(1).to({regY:9.1,skewX:1.5,skewY:-178.5,x:251.3,y:480.2},0).wait(1).to({regX:34.5,skewX:0,skewY:-180,x:250.3,y:480.3},0).wait(16).to({regX:34.6,regY:8.9,scaleX:1.27,scaleY:1.27,skewX:-0.8,skewY:-180.8,x:249.7,y:480.2},0).wait(2).to({regY:9,skewX:-1.6,skewY:-181.6,x:249.1,y:480.4},0).wait(2).to({regY:9.1,skewX:-2.1,skewY:-182.1,x:248.7,y:480.7},0).wait(1).to({regY:9,skewX:5.4,skewY:-174.6,x:254.4,y:480.4},0).wait(1).to({regY:9.1,skewX:13,skewY:-167,x:260.3,y:481.2},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:16.2,skewY:-163.8,x:262.9,y:483.9},0).wait(2).to({skewX:15.7,skewY:-164.3,x:262.5},0).wait(2).to({regY:9.2,skewX:14.9,skewY:-165.1,x:261.6,y:483.8},0).wait(2).to({regY:9.1,scaleX:1.27,scaleY:1.27,skewX:14.1,skewY:-165.9,x:261.3},0).wait(5).to({regX:34.7,scaleX:1.26,scaleY:1.26,x:261.4,y:481.9},0).wait(2).to({scaleX:1.28,scaleY:1.28,skewX:14.5,skewY:-165.5,x:261.3,y:485.9},0).wait(1).to({regX:34.6,scaleX:1.3,scaleY:1.3,skewX:14.8,skewY:-165.2,x:261.2,y:488.9},0).wait(1).to({regX:34.7,scaleX:1.35,scaleY:1.35,skewX:15.6,skewY:-164.4,x:260.7,y:496.4},0).wait(2).to({regY:9.2,scaleX:1.33,scaleY:1.33,x:260.8,y:494},0).wait(2).to({regX:34.6,scaleX:1.33,scaleY:1.33,x:261.1,y:493},0).wait(23).to({regX:34.7,scaleX:1.32,scaleY:1.32,skewX:15.8,skewY:-164.2,x:261.5,y:492},0).wait(2).to({skewX:16.9,skewY:-163.1,x:262.3},0).wait(2).to({scaleX:1.31,scaleY:1.31,skewX:11,skewY:-169,x:257.9,y:489.6},0).wait(1).to({regX:34.8,scaleX:1.29,scaleY:1.29,skewX:5.8,skewY:-174.2,x:253.8,y:487.8},0).wait(1).to({regX:34.7,regY:9,scaleX:1.27,scaleY:1.27,skewX:-0.5,skewY:-180.5,x:251,y:484},0).wait(2).to({regX:34.8,regY:9.1,skewX:0.4,skewY:-179.6,x:251.6,y:484.1},0).wait(2).to({regX:34.7,skewX:1.2,skewY:-178.8,x:252.2},0).wait(17));

	// FIZ34_Skate1_LegL
	this.instance_6 = new lib.FIZ34_Skate1_Body("single",0)
		.tr(253.9,484.9,1.274,1.274,0,3,-177,33.3,119.9)
		.re(false);

	//this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({_off:false},0).wait(1).to({regX:33.4,regY:119.8,scaleX:1.27,scaleY:1.27,skewX:4.3,skewY:-175.7,x:254.7,y:484.7},0).wait(1).to({skewX:4.8,skewY:-175.2,x:255},0).wait(23).to({skewX:5.3,skewY:-174.7,x:255.4,y:484.6},0).wait(4).to({skewX:4.4,skewY:-175.6,x:254.6},0).wait(1).to({skewX:2.1,skewY:-177.9,x:253.1,y:484.7},0).wait(1).to({regY:119.9,skewX:-1.2,skewY:-181.2,x:250.8,y:485.1},0).wait(1).to({regY:119.8,skewX:-2,skewY:-182,x:250.2},0).wait(1).to({regY:119.9,skewX:-2.5,skewY:-182.5,x:249.9,y:485.3},0).wait(28).to({regX:33.5,scaleX:1.27,scaleY:1.27,skewX:-0.3,skewY:-180.3,x:251.5,y:485.1},0).wait(1).to({skewX:4.8,skewY:-175.2,x:255,y:484.7},0).to({_off:true},1).wait(24).to({_off:false},0).wait(1).to({regY:120,skewX:1.5,skewY:-178.5,x:252.6,y:485},0).wait(1).to({regX:33.4,skewX:-0.1,skewY:-180.1,x:251.7,y:485.1},0).wait(2).to({regX:33.5,skewX:-0.6,skewY:-180.6,x:251.3},0).wait(2).to({regX:33.4,scaleX:1.27,scaleY:1.27,skewX:-0.1,skewY:-180.1,x:251.8,y:484.9},0).wait(12).to({regX:33.3,skewX:-0.8,skewY:-180.8,x:251.3,y:485},0).wait(2).to({regX:33.4,skewX:-1.6,skewY:-181.6,x:250.7,y:485.2},0).wait(2).to({regX:33.3,regY:119.9,skewX:-2.2,skewY:-182.2,x:250.4,y:485.1},0).wait(1).to({regX:33.4,regY:120,skewX:5.4,skewY:-174.6,x:255.5,y:485.4},0).wait(1).to({regX:33.5,regY:120.1,scaleX:1.27,scaleY:1.27,skewX:13,skewY:-167,x:260.8,y:486.2},0).wait(1).to({regX:33.4,regY:120,skewX:16.2,skewY:-163.8,x:263.2,y:488.7},0).wait(4).to({regY:120.1,skewX:14.8,skewY:-165.2,x:261.9,y:488.6},0).wait(2).to({regY:120,skewX:14,skewY:-166,x:261.6},0).wait(7).to({scaleX:1.28,scaleY:1.28,skewX:14.5,skewY:-165.5,x:261.7,y:490.7},0).wait(1).to({scaleX:1.3,scaleY:1.3,skewX:14.8,skewY:-165.2,x:261.4,y:493.7},0).wait(1).to({scaleX:1.35,scaleY:1.35,skewX:15.6,skewY:-164.4,x:261,y:501.3},0).wait(4).to({scaleX:1.33,scaleY:1.33,x:261.4,y:497.8},0).wait(25).to({scaleX:1.32,scaleY:1.32,skewX:16.9,skewY:-163.1,x:262.6,y:497},0).wait(2).to({regY:119.9,scaleX:1.31,scaleY:1.31,skewX:11,skewY:-169,x:258.6,y:494.3},0).wait(1).to({regY:120,scaleX:1.29,scaleY:1.29,skewX:5.7,skewY:-174.3,x:255.1,y:492.3},0).wait(1).to({regX:33.5,scaleX:1.27,scaleY:1.27,skewX:-0.5,skewY:-180.5,x:252.5,y:488.7},0).wait(2).to({regX:33.4,skewX:0.4,skewY:-179.6,x:253.2,y:488.6},0).wait(2).to({skewX:1.2,skewY:-178.8,x:253.7},0).wait(17));

	// FIZ34_Skate1_Body
	this.instance_7 = new lib.FIZ34_Skate1_ApronTieBK("synched",0)
		.tr(224.5,481.6,1.27,1.29,0,9.6,-170.4,-3.1,18);

	this.instance_8 = new lib.FIZ34_Skate1_Body("single",35)
		.tr(278.2,360.3,1.27,1.27,0,-17.1,162.9,37.5,15.7);

	this.instance_9 = new lib.FIZ_34_tieloop("synched",2,false)
		.tr(224.4,477.7,1.271,1.271,0,-0.1,179.9,-3.1,18.3);

	//this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_7}]},26).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_7}]},26).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_9,p:{regX:-3.1,regY:18.3,skewX:-0.1,skewY:179.9,x:224.4,y:477.7,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.7,skewX:-17.1,skewY:162.9,x:278.2,y:360.3,regX:37.5,scaleX:1.27,scaleY:1.27}}]},1).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:2.7,skewY:-177.3,x:226.5,y:480.3,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.6,skewX:-14.3,skewY:165.7,x:285.9,y:365.4,regX:37.5,scaleX:1.27,scaleY:1.27}}]},1).to({state:[{t:this.instance_9,p:{regX:-3.1,regY:18.4,skewX:4.2,skewY:-175.8,x:227.7,y:480.6,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.6,skewX:-12.8,skewY:167.2,x:290.2,y:367.4,regX:37.4,scaleX:1.27,scaleY:1.27}}]},1).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:4.8,skewY:-175.2,x:228.2,y:482.8,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.7,skewX:-12.2,skewY:167.8,x:291.7,y:370.2,regX:37.5,scaleX:1.27,scaleY:1.27}}]},1).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:5.3,skewY:-174.7,x:228.6,y:484.8,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.7,skewX:-11.7,skewY:168.3,x:293.3,y:372.7,regX:37.4,scaleX:1.27,scaleY:1.27}}]},2).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.3,skewX:5,skewY:-175,x:228.4,y:482.4,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.7,skewX:-12,skewY:168,x:292.4,y:370.2,regX:37.5,scaleX:1.27,scaleY:1.27}}]},4).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:5.9,skewY:-174.1,x:228.9,y:482,scaleX:1.271,scaleY:1.271}},{t:this.instance_8,p:{regY:15.7,skewX:-11.1,skewY:168.9,x:294.6,y:370.6,regX:37.4,scaleX:1.27,scaleY:1.27}}]},12).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:2.8,skewY:-177.2,x:226.8,y:481.7,scaleX:1.27,scaleY:1.27}},{t:this.instance_8,p:{regY:15.6,skewX:-14.2,skewY:165.8,x:286.6,y:367,regX:37.4,scaleX:1.27,scaleY:1.27}}]},1).to({state:[{t:this.instance_9,p:{regX:-3.2,regY:18.4,skewX:-0.7,skewY:179.3,x:224.4,y:478,scaleX:1.27,scaleY:1.27}},{t:this.instance_8,p:{regY:15.8,skewX:-17.7,skewY:162.3,x:276.9,y:360,regX:37.3,scaleX:1.269,scaleY:1.269}}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},16).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},7).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},4).to({state:[{t:this.instance_7}]},23).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_7}]},2).wait(17));
	//this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1).to({regY:17.9,scaleX:1.27,skewX:12.1,skewY:-167.9,x:226.4,y:480.1},0).wait(1).to({skewX:13.4,skewY:-166.6,x:227.4,y:479.3},0).wait(3).to({skewX:14.2,skewY:-165.8,x:228,y:478.9},0).wait(26).to({scaleY:1.29,skewX:11.2,skewY:-168.8,x:225.7,y:480.5},0).wait(1).to({skewX:7.9,skewY:-172.1,x:223.3,y:482.5},0).wait(1).to({skewX:7.1,skewY:-172.9,x:222.7,y:483},0).wait(3).to({regX:-3,skewX:6.3,skewY:-173.7,x:222.1,y:483.5},0).wait(26).to({regX:-3.1,regY:18,scaleX:1.27,skewX:8.9,skewY:-171.1,x:224,y:482},0).wait(1).to({regY:17.9,scaleY:1.29,skewX:13.9,skewY:-166.1,x:227.8,y:479.2},0).to({_off:true},1).wait(24).to({_off:false},0).wait(1).to({skewX:10.6,skewY:-169.4,x:225.2,y:480.9},0).wait(1).to({skewX:9.1,skewY:-170.9,x:224.1,y:481.7},0).wait(16).to({regX:-3,regY:17.8,scaleX:1.27,skewX:8.3,skewY:-171.7,x:223.6,y:482},0).wait(2).to({regX:-3.1,skewX:7.5,skewY:-172.5,x:223.1,y:482.5},0).wait(3).to({scaleY:1.29,skewX:14.5,skewY:-165.5,x:228.3,y:479.5},0).wait(1).to({regY:17.9,scaleX:1.27,skewX:22.1,skewY:-157.8,x:234.6,y:476.9},0).wait(1).to({regX:-3,scaleY:1.29,skewX:24.8,skewY:-155.2,x:237,y:478.2},0).wait(4).to({scaleY:1.29,skewX:23.4,skewY:-156.6,x:235.7,y:478.7},0).wait(7).to({regX:-3.1,scaleX:1.25,scaleY:1.27,skewX:23.2,skewY:-156.8,x:236.1,y:476.9},0).wait(2).to({scaleX:1.28,scaleY:1.3,skewX:23.7,skewY:-156.3,x:235.6,y:480.6},0).wait(1).to({regX:-3,scaleX:1.3,scaleY:1.32,skewX:24,skewY:-156,x:234.9,y:483.4},0).wait(1).to({scaleX:1.35,scaleY:1.37,skewX:24.7,skewY:-155.3,x:233.5,y:490.3},0).wait(2).to({scaleX:1.33,scaleY:1.35,x:234.1,y:487.8},0).wait(4).to({regX:-3.1,scaleX:1.32,scaleY:1.34,x:234.8,y:485.9},0).wait(23).to({regX:-3,regY:17.8,skewX:26,skewY:-154,x:236,y:485.4},0).wait(2).to({regY:17.9,scaleX:1.3,scaleY:1.32,skewX:20.1,skewY:-159.9,x:231.3,y:485.8},0).wait(1).to({scaleX:1.29,scaleY:1.31,skewX:14.9,skewY:-165.1,x:227.4,y:486.3},0).wait(1).to({regX:-3.1,regY:17.8,scaleX:1.26,scaleY:1.29,skewX:8.7,skewY:-171.3,x:225.2,y:485.6},0).wait(2).to({regY:17.9,skewX:9.6,skewY:-170.4,x:225.8,y:485.3},0).wait(2).to({regY:17.8,scaleY:1.29,skewX:10.3,skewY:-169.7,x:226.3,y:484.8},0).wait(17));

	// FIZ34_Skate1_LegR
	this.instance_10 = new lib.FIZ34_Skate1_ArmR("single",8)
		.tr(280.1,361.2,1.273,1.273,0,13,-167,78.3,7.6);

	//this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({regX:78.4,regY:7.5,skewX:15.5,skewY:-164.5,x:287.3,y:362.1,startPosition:9},0).wait(1).to({regX:87,regY:-3.1,scaleX:1.27,scaleY:1.27,skewX:13.2,skewY:-166.8,x:284.4,y:346.7,startPosition:19},0).wait(1).to({regY:-3,scaleY:1.3,skewX:12.9,skewY:-167.1,x:285.8,y:347.1,startPosition:20},0).wait(4).to({regY:-3.1,scaleX:1.27,scaleY:1.27,skewX:21.7,skewY:-158.3,x:286.7,startPosition:21},0).wait(2).to({skewX:23.2,skewY:-156.8,startPosition:22},0).wait(3).to({skewX:15.9,skewY:-164.1,startPosition:19},0).wait(2).to({skewX:13.9,skewY:-166.1,y:347.2,startPosition:20},0).wait(2).to({skewX:14.4,skewY:-165.6,y:347.1,startPosition:19},0).wait(10).to({scaleX:1.27,scaleY:1.27,skewX:15.6,skewY:-164.4,x:287.6,y:347.3},0).wait(2).to({regY:-3.2,skewX:17,skewY:-163,x:288.6},0).wait(2).to({skewX:19.5,skewY:-160.5,x:284.6,y:346.8},0).wait(1).to({regX:87.1,skewX:17.2,skewY:-162.8,x:277.4,y:345.8},0).wait(1).to({regY:-3.4,scaleX:1.27,scaleY:1.27,skewX:22.4,skewY:-157.6,x:263.3,y:346.2,startPosition:57},0).wait(1).to({regX:87.2,skewX:13.1,skewY:-166.9,x:264.7,y:344.8,startPosition:58},0).wait(1).to({regX:87,scaleY:1.27,skewX:10.7,skewY:-167.4,x:263.2,startPosition:59},0).wait(2).to({regX:87.1,regY:-3.2,scaleY:1.27,skewX:12,skewY:-167.7,x:262.1,y:345,startPosition:60},0).wait(2).to({regY:-3.3,skewX:12.6,skewY:-167.4,x:263.2,y:344.9,startPosition:61},0).wait(20).to({regY:-3.4,skewX:12.4,skewY:-167.6,x:262.3,startPosition:60},0).wait(2).to({regX:87,skewX:11.3,skewY:-168.7,x:261.6},0).wait(2).to({regY:-3.5,skewX:14.1,skewY:-165.9,x:270.3,y:345.2},0).wait(1).to({skewX:19.1,skewY:-160.9,x:285.9,y:347},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:37.3,skewY:-142.7,x:308.3,y:361.6,startPosition:12},0).wait(1).to({regX:86.8,regY:-3.6,skewX:33.7,skewY:-146.3,x:315.9,y:368.3,startPosition:13},0).wait(1).to({regX:86.9,regY:-3.8,skewX:29.7,skewY:-150.3,x:320.1,y:371.1},0).wait(1).to({regX:86.7,regY:-3.6,skewX:27.4,skewY:-152.6,x:321.7,y:374.3},0).wait(2).to({x:323.1,y:377.1},0).wait(14).to({skewX:27.1,skewY:-152.9,y:374.7},0).wait(3).to({regX:86.8,skewX:24.7,skewY:-155.3,x:316.5,y:370.2},0).wait(1).to({regX:120.8,regY:8.4,scaleX:1.2,scaleY:1.26,skewX:-4.5,skewY:-184.5,x:262.1,y:372.4,startPosition:11},0).wait(1).to({regX:87,regY:-3.5,scaleX:1.27,scaleY:1.27,skewX:25.4,skewY:-154.6,x:285.9,y:347,startPosition:14},0).wait(1).to({regX:86.9,skewX:19.4,skewY:-160.6,x:275.6,y:345.7},0).wait(1).to({regX:87,skewX:16.8,skewY:-163.2,x:270.8,y:345.2},0).wait(2).to({skewX:15.5,skewY:-164.5,x:269.2,y:345.1},0).wait(2).to({skewX:16.8,skewY:-163.2,x:270.9,y:345.2},0).wait(12).to({regY:-3.8,scaleX:1.27,scaleY:1.27,skewX:15.8,skewY:-164.2,x:268.6,y:344.8},0).wait(2).to({regY:-3.6,skewX:14.3,skewY:-165.7,x:266.1,y:344.9},0).wait(2).to({skewX:15.1,skewY:-164.9,x:264.4,y:344.8},0).wait(1).to({skewX:22.6,skewY:-157.4,x:287.8,y:348.1,startPosition:15},0).wait(1).to({regY:-3.5,skewX:30.2,skewY:-149.8,x:311,y:354.4,startPosition:16},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:38.1,skewY:-140.8,x:320.6,y:360.2,startPosition:17},0).wait(2).to({skewX:35.6,skewY:-144.4,x:319,y:359.5},0).wait(2).to({regX:87.2,regY:-3.8,skewX:32.8,skewY:-147.2,x:316.3,y:358.2},0).wait(2).to({regX:87,regY:-3.6,skewX:31.2,skewY:-148.8,x:314.3,y:357.8},0).wait(7).to({regY:-3.4,scaleX:1.28,scaleY:1.28,skewX:31.7,skewY:-148.3,x:315.9,y:359.2,startPosition:24},0).wait(1).to({regY:-3.6,scaleX:1.3,scaleY:1.3,skewX:32,skewY:-148,x:317.2,y:360.4,startPosition:25},0).wait(1).to({scaleX:1.37,scaleY:1.37,skewX:34.8,skewY:-145.2,x:321.1,y:363.3,startPosition:26},0).wait(2).to({scaleX:1.35,scaleY:1.35,skewX:33.8,skewY:-146.2,x:320.6,y:362.7},0).wait(2).to({scaleX:1.33,scaleY:1.33,skewX:33,skewY:-147,x:320.1},0).wait(25).to({scaleX:1.32,scaleY:1.32,skewX:32.8,skewY:-147.2,x:323.8,y:364},0).wait(2).to({regX:86.9,scaleX:1.29,scaleY:1.29,skewX:28.2,skewY:-151.8,x:305.3,y:357.5,startPosition:27},0).wait(1).to({scaleX:1.26,scaleY:1.26,skewX:22.9,skewY:-157.1,x:288.6,y:353.3,startPosition:28},0).wait(1).to({regX:87.2,skewX:10.6,skewY:-169.8,x:270.4,y:346.3,startPosition:2},0).wait(2).to({regX:87,skewX:10.4,skewY:-169.6,x:273.3,y:346.6},0).wait(2).to({scaleX:1.26,scaleY:1.26,skewX:10.6,skewY:-169.4,x:275.8,y:346.9},0).wait(17));

	// FIZ34_Skate1_ArmR
	this.instance_11 = new lib.FIZ34_Skate1_CollarFR("single",0)
		.tr(227.9,338.2,1.274,1.274,0,0.9,-179.1,13.7,28.1);

	//this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1).to({regX:13.8,regY:28,scaleX:1.27,scaleY:1.27,skewX:2.7,skewY:-177.3,x:235.8,y:337.3},0).wait(1).to({regY:28.1,skewX:4.5,skewY:-175.5,x:240,y:336.6},0).wait(1).to({skewX:5.5,skewY:-174.5,x:241.7,y:336.4},0).wait(23).to({skewX:6.4,skewY:-173.6,x:243.6,y:336.1},0).wait(4).to({skewX:6.2,skewY:-173.8,x:240.4,y:336},0).wait(1).to({regY:28.2,scaleX:1.27,scaleY:1.27,skewX:-0.6,skewY:-180.6,x:232.3,y:338.6},0).wait(1).to({regY:28.1,skewX:-7.9,skewY:-187.9,x:221.7,y:341.9},0).wait(1).to({regX:14,skewX:-10.2,skewY:-190.2,x:218.8,y:342.8},0).wait(1).to({regY:28.2,scaleX:1.27,scaleY:1.27,skewX:-11.3,skewY:-191.3,x:217.2,y:343.4},0).wait(24).to({regX:14.1,skewX:-12.2,skewY:-192.2,x:216.2,y:343.9},0).wait(2).to({skewX:-13,skewY:-193,x:215.3,y:344.2},0).wait(2).to({regX:14.2,skewX:-11.7,skewY:-191.7,x:223.9,y:342.8},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-5.9,skewY:-185.9,x:240,y:340.4},0).wait(1).to({regX:14.1,skewX:2.5,skewY:-177.5,x:263.9,y:348.5},0).wait(1).to({skewX:4.7,skewY:-175.3,x:272.2,y:353.2},0).wait(1).to({regX:14,regY:28.3,scaleX:1.27,scaleY:1.27,skewX:5.4,skewY:-174.6,x:276.7,y:355.2},0).wait(1).to({regY:28.4,skewX:5.7,skewY:-174.3,x:278.3,y:358},0).wait(2).to({skewX:6.3,skewY:-173.7,x:280,y:360.4},0).wait(4).to({regX:14.1,regY:28.3,skewX:6,skewY:-174,x:279,y:357.8},0).wait(12).to({regX:14,regY:28.4,skewX:6.8,skewY:-173.2,x:281.4,y:358.2},0).wait(1).to({skewX:6.3,skewY:-173.7,x:272.9,y:354.6},0).wait(1).to({regY:28.3,scaleX:1.27,scaleY:1.27,skewX:4,skewY:-176,x:262.6,y:347.8},0).wait(1).to({regX:14.2,regY:28.2,scaleX:1.27,scaleY:1.27,skewX:-5.9,skewY:-185.9,x:240,y:340.4},0).wait(1).to({skewX:-10,skewY:-190,x:229.4,y:341.9},0).wait(1).to({regY:28.3,skewX:-11.8,skewY:-191.8,x:224.7,y:342.9},0).wait(2).to({skewX:-12.3,skewY:-192.3,x:223.1,y:343.2},0).wait(2).to({skewX:-11.8,skewY:-191.8,x:224.8,y:342.9},0).wait(12).to({regY:28.4,scaleX:1.27,scaleY:1.27,skewX:-12.3,skewY:-192.3,x:222.5,y:343.1},0).wait(2).to({regY:28.3,skewX:-14.4,skewY:-194.4,x:219.9,y:344.2},0).wait(2).to({regY:28.4,skewX:-15.7,skewY:-195.7,x:218.2,y:344.9},0).wait(1).to({regY:28.3,skewX:-6.4,skewY:-186.4,x:242,y:341.4},0).wait(1).to({regY:28.2,skewX:1.3,skewY:-178.7,x:266.5,y:341.6},0).wait(1).to({regY:28.4,scaleX:1.27,scaleY:1.27,skewX:10.7,skewY:-169.3,x:277.7,y:343.3},0).wait(2).to({skewX:9.2,skewY:-170.8,x:275.9},0).wait(2).to({regX:14.4,skewX:8.1,skewY:-171.9,x:272.8,y:343},0).wait(2).to({regX:14.2,skewX:7.1,skewY:-172.9,x:270.7,y:343.1},0).wait(7).to({regX:14.3,regY:28.3,scaleX:1.28,scaleY:1.28,skewX:7.5,skewY:-172.5,x:272,y:343.7},0).wait(1).to({regX:14.2,regY:28.4,scaleX:1.3,scaleY:1.3,skewX:8.1,skewY:-171.9,x:272.8,y:344.5},0).wait(1).to({regX:14.4,scaleX:1.35,scaleY:1.35,skewX:9.1,skewY:-170.9,x:274.6,y:346.9},0).wait(4).to({regX:14.2,scaleX:1.33,scaleY:1.33,x:274.9,y:345.9},0).wait(23).to({regY:28.3,scaleX:1.32,scaleY:1.32,skewX:10.1,skewY:-169.9,x:276.2,y:345.5},0).wait(2).to({regY:28.4,skewX:11.5,skewY:-168.5,x:279.7,y:345.9},0).wait(2).to({regY:28.3,scaleX:1.3,scaleY:1.3,skewX:4.6,skewY:-175.4,x:259.9,y:344.2},0).wait(1).to({regX:14.3,scaleX:1.29,scaleY:1.29,skewX:-0.7,skewY:-180.7,x:242.7,y:344.1},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-8,skewY:-188,x:224.7,y:345.8},0).wait(2).to({regX:14.6,regY:28.4,skewX:-7.1,skewY:-187.1,x:227.4,y:345.4},0).wait(2).to({regX:14.3,skewX:-5.8,skewY:-185.8,x:230.1,y:344.8},0).wait(2).to({skewX:-5,skewY:-185,x:231.1,y:344.5},0).wait(15));

	// FIZ34_Skate1_ApronTieBK
	this.instance_12 = new lib.FIZ34_Skate1_HeadNestks("synched",92,false)
		.tr(246.1,343.5,1.274,1.274,0,0.9,-179.1,103.1,310.4);

	//this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({regX:103.2,regY:310.3,scaleX:1.27,scaleY:1.27,skewX:2.7,skewY:-177.3,x:254,y:343.2,startPosition:93},0).wait(1).to({regY:310.2,skewX:4.5,skewY:-175.5,x:258,y:343,startPosition:94},0).wait(1).to({regY:310.4,skewX:5.5,skewY:-174.5,x:259.6,y:343.2,startPosition:95},0).wait(2).to({skewX:5.8,skewY:-174.2,x:260.4,startPosition:97},0).wait(21).to({skewX:6.4,skewY:-173.6,x:261.3,y:343.1,startPosition:118},0).wait(2).to({regY:310.5,skewX:6.7,skewY:-173.3,x:262.3,y:343.2,startPosition:120},0).wait(2).to({regY:310.4,skewX:6.2,skewY:-173.8,x:258.3,y:343,startPosition:122},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-0.6,skewY:-180.6,x:250.7,y:343.3,startPosition:123},0).wait(1).to({regX:103,skewX:-7.9,skewY:-187.9,x:240.8,y:344.3,startPosition:124},0).wait(1).to({regX:103.2,skewX:-10.2,skewY:-190.2,x:238.1,y:344.5,startPosition:125},0).wait(1).to({regY:310.6,scaleX:1.27,scaleY:1.27,skewX:-11.3,skewY:-191.3,x:236.4,y:344.8,startPosition:126},0).wait(2).to({regX:103.4,skewX:-11.9,skewY:-191.9,x:235.3,y:344.9,startPosition:128},0).wait(2).to({skewX:-11.6,skewY:-191.6,x:236.3,y:344.8,startPosition:130},0).wait(20).to({skewX:-12.2,skewY:-192.2,x:235.5,y:345,startPosition:150},0).wait(2).to({regY:310.7,skewX:-13,skewY:-193,x:234.7,y:345.2,startPosition:152},0).wait(2).to({skewX:-11.7,skewY:-191.7,x:243.4,y:344.2,startPosition:154},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-5.9,skewY:-185.9,x:259.3,y:343.7,startPosition:155},0).wait(1).to({skewX:2.5,skewY:-177.5,x:282.5,y:354.5,startPosition:156},0).wait(1).to({skewX:4.7,skewY:-175.3,x:290.5,y:359.9,startPosition:157},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:5.4,skewY:-174.6,x:294.9,y:362.2,startPosition:158},0).wait(1).to({regX:103.5,skewX:5.7,skewY:-174.3,x:296.4,y:364.8,startPosition:159},0).wait(2).to({skewX:6.3,skewY:-173.7,x:298,y:367.4,startPosition:161},0).wait(2).to({regY:310.8,skewX:6.2,skewY:-173.8,y:366.3,startPosition:163},0).wait(2).to({skewX:6,skewY:-174,x:297.2,y:364.9,startPosition:165},0).wait(10).to({skewX:6.3,skewY:-173.7,x:298,y:365.1,startPosition:175},0).wait(2).to({skewX:6.8,skewY:-173.2,x:299.4,y:365.4,startPosition:177},0).wait(1).to({regY:310.9,skewX:6.3,skewY:-173.7,x:291.1,y:361.7,startPosition:178},0).wait(1).to({regY:310.8,scaleX:1.27,scaleY:1.27,skewX:4,skewY:-176,x:281,y:354.1,startPosition:179},0).wait(1).to({regX:103.4,regY:310.7,scaleX:1.27,scaleY:1.27,skewX:-5.9,skewY:-185.9,x:259.3,y:343.7,startPosition:180},0).wait(1).to({regY:310.6,skewX:-10,skewY:-190,x:248.7,y:343.8,startPosition:181},0).wait(1).to({regX:103.5,skewX:-11.8,skewY:-191.8,x:243.9,y:344.1,startPosition:182},0).wait(2).to({regX:103.4,regY:310.5,skewX:-12.3,skewY:-192.3,x:242.4,startPosition:184},0).wait(2).to({regY:310.6,skewX:-11.8,skewY:-191.8,x:244,y:344,startPosition:186},0).wait(2).to({skewX:-11.5,skewY:-191.5,x:244.9,startPosition:188},0).wait(10).to({regY:310.7,scaleX:1.27,scaleY:1.27,skewX:-12.3,skewY:-192.3,x:241.7,y:344.1,startPosition:198},0).wait(2).to({regY:310.6,skewX:-14.4,skewY:-194.4,x:239.2,y:344.4,startPosition:200},0).wait(2).to({regX:103.3,regY:310.7,skewX:-15.7,skewY:-195.7,x:237.6,y:344.7,startPosition:202},0).wait(1).to({regY:310.6,skewX:-6.4,skewY:-186.4,x:261.3,y:344.5,startPosition:203},0).wait(1).to({regX:103.4,regY:310.7,skewX:1.3,skewY:-178.7,x:285.2,y:347.4,startPosition:204},0).wait(1).to({regX:103.3,regY:310.5,scaleX:1.27,scaleY:1.27,skewX:10.7,skewY:-169.3,x:295.1,y:351.4,startPosition:205},0).wait(2).to({regX:103.5,regY:310.6,skewX:9.2,skewY:-170.8,x:293.5,y:351.1,startPosition:207},0).wait(2).to({regY:310.8,skewX:8.1,skewY:-171.9,x:290.7,y:350.5,startPosition:209},0).wait(2).to({regX:103.4,regY:310.6,skewX:7.1,skewY:-172.9,x:288.6,y:350.3,startPosition:211},0).wait(3).to({regX:103.5,scaleX:1.26,scaleY:1.26,x:288.4,y:350,startPosition:214},0).wait(2).to({regX:103.4,scaleX:1.26,scaleY:1.26,x:288.5,y:349.6,startPosition:216},0).wait(2).to({regY:310.7,scaleX:1.28,scaleY:1.28,skewX:7.5,skewY:-172.5,x:290,y:351.3,startPosition:218},0).wait(1).to({scaleX:1.3,scaleY:1.3,skewX:8.1,skewY:-171.9,x:290.9,y:352.4,startPosition:219},0).wait(1).to({regY:310.6,scaleX:1.35,scaleY:1.35,skewX:9.1,skewY:-170.9,x:293.4,y:355.2,startPosition:220},0).wait(2).to({regX:103.3,scaleX:1.33,scaleY:1.33,y:354.3,startPosition:222},0).wait(2).to({regY:310.7,scaleX:1.33,scaleY:1.33,y:354.1,startPosition:224},0).wait(2).to({regX:103.4,scaleX:1.32,scaleY:1.32,x:293.3,y:353.8,startPosition:226},0).wait(21).to({skewX:10.1,skewY:-169.9,x:294.3,y:354,startPosition:247},0).wait(2).to({regX:103.3,regY:310.6,skewX:11.5,skewY:-168.5,x:297.8,y:354.7,startPosition:249},0).wait(2).to({regX:103.5,regY:310.8,scaleX:1.3,scaleY:1.3,skewX:4.6,skewY:-175.4,x:278.5,y:351.1,startPosition:251},0).wait(1).to({regY:310.7,scaleX:1.29,scaleY:1.29,skewX:-0.7,skewY:-180.7,x:261.7,y:349.1,startPosition:252},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-8,skewY:-188,x:243.9,y:348.2,startPosition:253},0).wait(2).to({skewX:-7.1,skewY:-187.1,x:246.7,y:347.8,startPosition:255},0).wait(2).to({skewX:-5.8,skewY:-185.8,x:249.1,y:347.9,startPosition:257},0).wait(2).to({skewX:-5,skewY:-185,x:250.1,startPosition:259},0).wait(15));

	// FIZ34_Skate1_CollarFR
	this.instance_13 = new lib.FIZ34_Skate1_CollarBK("single",0)
		.tr(249.3,349.2,1.274,1.274,0,0.9,-179.1,46.5,44.6);

	//this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1).to({regX:46.4,scaleX:1.27,scaleY:1.27,skewX:2.7,skewY:-177.3,x:257.1,y:349.1},0).wait(1).to({regX:46.5,regY:44.8,skewX:4.5,skewY:-175.5,x:260.9,y:349.2},0).wait(1).to({skewX:5.5,skewY:-174.5,x:262.3},0).wait(23).to({skewX:6.4,skewY:-173.6,x:264},0).wait(4).to({regX:46.6,skewX:6.2,skewY:-173.8,x:260.9,y:349.1},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:-0.6,skewY:-180.6,x:254.1,y:349},0).wait(1).to({regX:46.5,skewX:-7.9,skewY:-187.9,x:244.7,y:349.5},0).wait(1).to({skewX:-10.2,skewY:-190.2,x:242.4},0).wait(1).to({regX:46.4,scaleX:1.27,scaleY:1.27,skewX:-11.3,skewY:-191.3,x:240.9},0).wait(4).to({regY:44.9,skewX:-12.1,skewY:-192.1,x:241},0).wait(22).to({skewX:-13.5,skewY:-193.5,x:239.5,y:349.7},0).wait(2).to({regX:46.3,regY:44.8,skewX:-12.2,skewY:-192.2,x:248.2,y:348.7},0).wait(1).to({regX:46.2,scaleX:1.27,scaleY:1.27,skewX:-6.4,skewY:-186.4,x:263.6},0).wait(1).to({regX:46.1,regY:44.7,skewX:1.9,skewY:-178.1,x:286.1,y:360},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:4.2,skewY:-175.8,x:293.9,y:365.6},0).wait(1).to({regY:44.6,skewX:4.9,skewY:-175.1,x:298.2,y:367.8},0).wait(1).to({regY:44.7,skewX:5.2,skewY:-174.8,x:299.8,y:370.6},0).wait(2).to({skewX:5.7,skewY:-174.3,x:301.3,y:373.3},0).wait(4).to({regY:44.8,skewX:5.4,skewY:-174.6,x:300.5,y:370.8},0).wait(12).to({regY:44.7,skewX:6.3,skewY:-173.7,x:302.7,y:371.3},0).wait(1).to({regY:44.6,skewX:5.8,skewY:-174.2,x:294.4,y:367.4},0).wait(1).to({scaleX:1.27,scaleY:1.27,skewX:3.5,skewY:-176.5,x:284.5,y:359.8},0).wait(1).to({regX:46.2,regY:44.8,scaleX:1.27,scaleY:1.27,skewX:-6.4,skewY:-186.4,x:263.6,y:348.7},0).wait(1).to({regX:46.1,regY:44.6,skewX:-10.5,skewY:-190.5,x:253.5,y:348.4},0).wait(1).to({skewX:-12.3,skewY:-192.3,x:248.9,y:348.5},0).wait(2).to({regX:46.2,skewX:-12.8,skewY:-192.8,x:247.2,y:348.7},0).wait(2).to({regX:46.1,skewX:-12.3,skewY:-192.3,x:249,y:348.4},0).wait(12).to({regX:46.2,scaleX:1.27,scaleY:1.27,skewX:-12.8,skewY:-192.8,x:246.6,y:348.6},0).wait(2).to({regX:46.1,skewX:-14.9,skewY:-194.9,x:244.3},0).wait(2).to({regX:46.2,skewX:-16.3,skewY:-196.3,x:242.5,y:348.8},0).wait(1).to({regX:46.1,skewX:-6.9,skewY:-186.9,x:265.6,y:349.3},0).wait(1).to({regX:46.2,skewX:0.7,skewY:-179.3,x:288.8,y:352.6},0).wait(1).to({regX:46.1,scaleX:1.27,scaleY:1.27,skewX:10.2,skewY:-169.8,x:297.8,y:357.6},0).wait(2).to({regX:46.2,skewX:8.7,skewY:-171.3,x:296.3,y:357.1},0).wait(2).to({regY:44.5,skewX:7.5,skewY:-172.5,x:293.7,y:356.4},0).wait(2).to({regX:46.1,regY:44.6,skewX:6.5,skewY:-173.5,x:291.6,y:356.2},0).wait(7).to({regY:44.5,scaleX:1.28,scaleY:1.28,skewX:7,skewY:-173,x:293.1,y:357.1},0).wait(1).to({regY:44.6,scaleX:1.3,scaleY:1.3,skewX:7.6,skewY:-172.4,x:294,y:358.3},0).wait(1).to({regX:46.2,regY:44.5,scaleX:1.35,scaleY:1.35,skewX:8.6,skewY:-171.4,x:296.4,y:361.5},0).wait(4).to({regX:46.1,regY:44.6,scaleX:1.33,scaleY:1.33,x:296.3,y:360.3},0).wait(23).to({regX:46.2,scaleX:1.32,scaleY:1.32,skewX:9.6,skewY:-170.4,x:297.1,y:360.2},0).wait(2).to({skewX:10.9,skewY:-169.1,x:300.4,y:361},0).wait(2).to({regX:46.3,scaleX:1.3,scaleY:1.3,skewX:4,skewY:-176,x:281.9,y:356.7},0).wait(1).to({regX:46.2,scaleX:1.29,scaleY:1.29,skewX:-1.2,skewY:-181.2,x:265.7,y:354.5},0).wait(1).to({regX:46.1,regY:44.4,scaleX:1.27,scaleY:1.27,skewX:-8.5,skewY:-188.5,x:248.4,y:352.9},0).wait(2).to({regX:46.2,skewX:-7.6,skewY:-187.6,x:251.2,y:352.7},0).wait(2).to({regX:46.1,skewX:-6.3,skewY:-186.3,x:253.6,y:352.8},0).wait(2).to({skewX:-5.5,skewY:-185.5,x:254.3},0).wait(15));

});
})(lib = lib||{});
var lib;