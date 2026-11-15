import { useEffect, useRef, useState } from "react";
import { jsx as _jsxDEV, Fragment as _Fragment } from "react/jsx-runtime";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { SITE_PHOTOS } from "@/data/photos";
import { SpeakButton } from "@/components/SpeakButton";

const _jsxFileName = "/workspace/src/components/MarsGame.tsx";
var _c, _c2;

const PHOTO = {
	...SITE_PHOTOS,
	phoenix: "sites/phoenix.jpg"
};
const SITES = [
	{
		id: "vik1",
		name: "Viking 1",
		x: 18,
		z: 5,
		world: "mars",
		kind: "lander",
		fact: "1976’da Mars’a iki ev kondu. Adları Viking 1 ve Viking 2’ydi. İkisi de yumuşak indi. İş bitince kalkıp gitmediler. Tam kondukları yerde hâlâ duruyorlar."
	},
	{
		id: "pathfinder",
		name: "Sojourner",
		x: 12,
		z: 20,
		world: "mars",
		kind: "rover",
		fact: "1997’de Mars’a bir kutu indi. İçinden küçük bir araba çıktı. Adı Sojourner’dı. Mars’ta gezen ilk arabaydı. İşi bitince park etti ve bir daha yerinden ayrılmadı."
	},
	{
		id: "spirit",
		name: "Spirit",
		x: -4,
		z: 24,
		world: "mars",
		kind: "rover",
		fact: "Spirit, ikiz arabalardan biriydi. Yıllarca Mars’ta gezdi. Sonra sustu ve artık yürümez. Kardeşi Opportunity başka bir yerde aynı şeyi yaşadı. İkisinin gövdesi de Mars’ta duruyor."
	},
	{
		id: "opportunity",
		name: "Opportunity",
		x: -20,
		z: 12,
		world: "mars",
		kind: "rover",
		fact: "Opportunity, Spirit’in ikiziydi. O da yıllarca gezdi. Sonra o da sustu. Durduğu yer, uzun yolun son durağıdır. İki kardeş iki ayrı yerde uyuyor."
	},
	{
		id: "curiosity",
		name: "Curiosity",
		x: -26,
		z: -3,
		world: "mars",
		kind: "big",
		fact: "Büyük bir araba bir dağın eteğine indirildi. İniş için bir vinç kullanıldı. Dağın katmanları eski bir defter gibiydi. Araba o defteri okumaya gitti. Hâlâ o dağda gezmeye devam ediyor."
	},
	{
		id: "perseverance",
		name: "Ingenuity",
		x: -16,
		z: -22,
		world: "mars",
		kind: "heli",
		fact: "Küçük bir helikopter Mars’ta ilk kez uçtu. Adı Ingenuity’ydi. Başka bir dünyada uçan ilk uçaktı. Sonra pervanesi kırıldı. Artık uçamıyor ve olduğu yerde bir hatıra olarak duruyor."
	},
	{
		id: "phoenix",
		name: "Phoenix",
		x: 7,
		z: -26,
		world: "mars",
		kind: "arm",
		fact: "Phoenix, buz aramak için toprağı kazdı. Kolu Mars’ın toprağına girdi. Sonra gücü bitti. Kazdığı yerden ayrılmadı. Şimdi o çukurun yanında sessizce duruyor."
	},
	{
		id: "insight",
		name: "InSight",
		x: 22,
		z: -14,
		world: "mars",
		kind: "panel",
		fact: "InSight yürümedi. Bir kulak gibi düz bir ovaya kondu. Mars’ın titremesini dinledi. Bu titreye marsquake denir. Gücü bitince sustu ama dinlediği ovada duruyor."
	},
	{
		id: "tube",
		name: "Örnek tüpü",
		x: -10,
		z: -18,
		world: "mars",
		kind: "tube",
		fact: "Yerde küçük bir tüp duruyor. Onu bir robot bıraktı. İçinde Mars’tan bir taş var. Tüp hâlâ yerinde bekliyor. Dünya’ya ne zaman geleceği belli değil."
	},
	{
		id: "a11",
		name: "Apollo 11",
		x: 0,
		z: 22,
		world: "moon",
		kind: "lander",
		fact: "Bir zamanlar astronotlar Ay’a uçtu. Onları oraya götüren aracın parçaları, iş bitince tek başına kaldı. Bu dostlar yerin altını, toprağı, kayaları ve kraterleri de araştırdı. Güneşten enerji depoladılar. Görev bitince Ay’ın yüzeyinde kaldılar."
	},
	{
		id: "a12",
		name: "VIPER",
		x: -24,
		z: 5,
		world: "moon",
		kind: "lander",
		fact: "VIPER, su buzu arayacak değerli bir robottu. Görevi de kendisi kadar değerliydi. Ay’ın güney kutbunda su buzu aramak için yola çıkacaktı. Artan masraf bu dostu da durdurdu. İptal edildi ve Ay’a hiç gönderilmedi."
	},
	{
		id: "a15",
		name: "Lunar Prospector",
		x: 24,
		z: -10,
		world: "moon",
		kind: "rover",
		fact: "Lunar Prospector, Ay’ın kimyasını okuyan bir dosttu. Kimyasal yapıyı, manyetik alanı ve kutuplardaki hidrojeni araştırmak için gönderildi. Görevini başarıyla bitirdi ve emekliye ayrıldı. Son iş olarak Ay’ın güney kutbuna çarptırıldı. Orada su buzu çıkıp çıkmadığına bakıldı."
	},
	{
		id: "a17",
		name: "ALSEP",
		x: -8,
		z: -26,
		world: "moon",
		kind: "rover",
		fact: "Apollo 15, çetin bir Ay yoluna çıktı. Amacı, zor zeminde bilimsel araştırma yapmaktı. Yanında yer sarsıntısını dinleyen bir alet, manyetik alanı ölçen bir alet ve ısının nasıl aktığını ölçen aletler vardı. Bu aletler önemli işler başardı. Destek ve bütçe yetmeyince sessizce veda ettiler."
	}
];
const QUIZ = {
	a11: [
		{ ask: "Apollo 11'in Ay'a iniş yapan modülünün adı neydi?", choices: ["Columbia", "Eagle", "Challenger"], answer: 1 },
		{ ask: "Apollo 11'in iniş kademesi neden Ay'da bırakıldı?", choices: ["Görevi tamamlandığı için", "Yakıtı hiç olmadığı için", "Ay yüzeyinde arıza yaptığı için"], answer: 0 },
		{ ask: "Ay Modülünün yükseliş kademesinin görevi neydi?", choices: ["Ay yüzeyini fotoğraflamak", "Bilimsel deney yapmak", "Astronotları Ay yörüngesine taşımak"], answer: 2 }
	],
	a12: [
		{ ask: "Apollo 12 hangi eski uzay aracının yakınına indi?", choices: ["Viking 1", "Surveyor 3", "Lunar Prospector"], answer: 1 },
		{ ask: "VIPER aracının Ay'a gönderilme amacı neydi?", choices: ["Ay'da astronot taşımak", "Ay'daki su buzunu araştırmak", "Ay'ın fotoğraflarını Dünya'ya göndermek"], answer: 1 }
	],
	a15: [
		{ ask: "Apollo 15'in iniş yaptığı bölgenin adı nedir?", choices: ["Hadley-Apennine", "Huzur Denizi", "Taurus-Littrow"], answer: 0 },
		{ ask: "Apollo 15 görevinde kullanılan Ay arabasının temel amacı neydi?", choices: ["Ay'dan Dünya'ya dönmek", "Ay yüzeyinde daha uzak bölgeleri keşfetmek", "Ay'dan havalanmak"], answer: 1 },
		{ ask: "Lunar Prospector hangi gök cisminin yörüngesinde araştırma yaptı?", choices: ["Mars", "Dünya", "Ay"], answer: 2 },
		{ ask: "Lunar Prospector'ın araştırdığı önemli konulardan biri neydi?", choices: ["Ay'ın kutuplarındaki buz ihtimali", "Ay'daki bitki örtüsü", "Ay'ın atmosferindeki oksijen"], answer: 0 }
	],
	a17: [
		{ ask: "Apollo 17'nin diğer Apollo görevlerinden önemli bir farkı nedir?", choices: ["Ay'a ilk iniş yapan görev olması", "İlk robotik görevi gerçekleştirmesi", "Son insanlı Ay inişi olması"], answer: 2 },
		{ ask: "Apollo 17'de görev yapan yerbilimci kimdir?", choices: ["Harrison Schmitt", "Michael Collins", "Neil Armstrong"], answer: 0 },
		{ ask: "ALSEP istasyonları ne amaçla Ay'a yerleştirildi?", choices: ["Astronotları taşımak", "Ay hakkında bilimsel veriler toplamak", "Uzay araçlarını şarj etmek"], answer: 1 },
		{ ask: "Ay'a bırakılan lazer yansıtıcıları ne işe yarar?", choices: ["Ay'ı aydınlatmaya", "Sıcaklığı ölçmeye", "Dünya-Ay mesafesini ölçmeye"], answer: 2 },
		{ ask: "ALSEP cihazları ne kadar süre veri topladı?", choices: ["Birkaç saat", "Birkaç hafta", "Yıllarca"], answer: 2 },
		{ ask: "Ay'da bırakılan iniş kademeleri hangi görevin parçasıdır?", choices: ["Apollo görevleri", "Viking görevleri", "Pathfinder görevleri"], answer: 0 }
	],
	vik1: [
		{ ask: "Viking 1'in araştırmalarındaki önemli amaçlardan biri neydi?", choices: ["Mars toprağında yaşam belirtileri aramak", "Mars'ta yeni kraterler oluşturmak", "Mars'ın etrafında uydu yapmak"], answer: 0 }
	],
	pathfinder: [
		{ ask: "Mars Pathfinder hangi yöntemle iniş yaptı?", choices: ["Yalnızca tekerleklerini kullanarak", "Paraşüt ve hava yastıklarıyla", "Ay Modülü kullanarak"], answer: 1 },
		{ ask: "Pathfinder'ın taşıdığı küçük keşif aracının adı neydi?", choices: ["Spirit", "Opportunity", "Sojourner"], answer: 2 }
	],
	spirit: [
		{ ask: "Spirit'in bozuk tekerleği Mars toprağında neyi ortaya çıkardı?", choices: ["Silika bakımından zengin toprağı", "Büyük miktarda altını", "Donmuş denizi"], answer: 0 }
	],
	opportunity: [
		{ ask: "Opportunity'nin en önemli keşiflerinden biri neydi?", choices: ["Mars'ta ormanlar bulunması", "Geçmişte sıvı su bulunduğuna dair kanıtlar", "Mars'ta aktif yanardağlar olması"], answer: 1 },
		{ ask: "Opportunity yaklaşık kaç yıl görev yaptı?", choices: ["5 yıl", "10 yıl", "15 yıl"], answer: 2 }
	],
	curiosity: [
		{ ask: "Curiosity Mars'a inerken hangi sistemi kullandı?", choices: ["Gökyüzü vinci (Sky Crane)", "Hava yastıkları", "Ay iniş kademesi"], answer: 0 },
		{ ask: "Curiosity hangi bölgede araştırma yapıyor?", choices: ["Jezero Krateri", "Gale Krateri", "Hadley Krateri"], answer: 1 }
	],
	perseverance: [
		{ ask: "Perseverance'ın yanında Mars'a götürdüğü küçük helikopterin adı nedir?", choices: ["Sojourner", "Viking", "Ingenuity"], answer: 2 },
		{ ask: "Perseverance'ın topladığı kaya örnekleri nereye konuldu?", choices: ["Özel örnek tüplerine", "Uzay aracının tekerleklerine", "Güneş panellerinin üzerine"], answer: 0 }
	],
	phoenix: [
		{ ask: "Phoenix aracı Mars'ta neyi araştırmak için kazı yaptı?", choices: ["Kaya kristallerini", "Yer altındaki su buzunu", "Volkanik lavları"], answer: 1 },
		{ ask: "Phoenix'in ortaya çıkardığı buz, Güneş ışığına maruz kalınca ne oldu?", choices: ["Eridi ve tamamen kayboldu", "Taşa dönüştü", "Süblimleşerek doğrudan gaz hâline geçti"], answer: 2 }
	],
	insight: [
		{ ask: "InSight aracının diğer Mars robotlarından önemli farkı neydi?", choices: ["Mars yüzeyinde dolaşmak yerine sabit durarak araştırma yapması", "Mars'ın çevresinde uçması", "Mars'tan kaya örnekleri toplaması"], answer: 0 },
		{ ask: "InSight hangi olayları dinleyip ölçmek için tasarlanmıştı?", choices: ["Rüzgâr seslerini", "Mars depremlerini", "Güneş patlamalarını"], answer: 1 }
	],
	tube: [
		{ ask: "Mars'ta bırakılan örnek tüplerinin içinde ne bulunur?", choices: ["Uzay araçlarının parçaları", "Kaya ve toprak örnekleri", "Astronotların kişisel eşyaları"], answer: 1 }
	]
};
const QUEST_ORDER = [
	"vik1",
	"pathfinder",
	"spirit",
	"opportunity",
	"phoenix"
];
function sandTexture() {
	const c = document.createElement("canvas");
	c.width = 512;
	c.height = 512;
	const g = c.getContext("2d");
	if (!g) return c;
	const sky = g.createLinearGradient(0, 0, 512, 512);
	sky.addColorStop(0, "#f4a04a");
	sky.addColorStop(.5, "#e36a28");
	sky.addColorStop(1, "#c65218");
	g.fillStyle = sky;
	g.fillRect(0, 0, 512, 512);
	for (let i = 0; i < 18; i++) {
		const x = Math.random() * 512;
		const y = Math.random() * 512;
		const r = 10 + Math.random() * 28;
		g.fillStyle = "rgba(120, 52, 18, 0.28)";
		g.beginPath();
		g.ellipse(x, y, r, r * .72, Math.random(), 0, Math.PI * 2);
		g.fill();
		g.fillStyle = "rgba(236, 214, 176, 0.35)";
		g.beginPath();
		g.ellipse(x - r * .15, y - r * .12, r * .45, r * .3, 0, 0, Math.PI * 2);
		g.fill();
	}
	for (let i = 0; i < 2500; i++) {
		const n = Math.random();
		g.fillStyle = n > .75 ? "#a3441c" : n < .25 ? "#ffd09a" : "#e87830";
		g.fillRect(Math.random() * 512, Math.random() * 512, 1 + Math.random() * 2, 1 + Math.random() * 2);
	}
	return c;
}
function CraftThumb({ kind }) {
	const rover = kind === "rover" || kind === "big" || kind === "heli";
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "relative h-16 w-20 shrink-0 rounded-xl bg-black",
		children: [/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-2 left-1 right-1 h-3 rounded-full bg-[#a34732]" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 124,
			columnNumber: 7
		}, this), rover ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-4 left-3 h-4 w-12 rounded-md bg-zinc-200" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 127,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-7 left-8 h-5 w-1 bg-zinc-400" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-11 left-7 h-2 w-3 rounded-sm bg-sky-300" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 129,
				columnNumber: 11
			}, this),
			kind === "heli" ? /* @__PURE__ */ _jsxDEV("span", { className: "absolute top-2 right-2 h-1 w-8 bg-zinc-100" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 30
			}, this) : null
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 126,
			columnNumber: 9
		}, this) : kind === "tube" ? /* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-4 left-7 h-2 w-8 rotate-45 rounded-full bg-amber-100" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 133,
			columnNumber: 9
		}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-5 left-5 h-5 w-8 rounded-md bg-amber-100" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-2 left-4 h-4 w-1 rotate-12 bg-zinc-300" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 137,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-2 right-4 h-4 w-1 -rotate-12 bg-zinc-300" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 11
			}, this),
			kind === "panel" ? /* @__PURE__ */ _jsxDEV("span", { className: "absolute bottom-8 left-3 h-2 w-12 rounded-sm bg-sky-400" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 139,
				columnNumber: 31
			}, this) : null
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 135,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 123,
		columnNumber: 5
	}, this);
}
export function MarsGame() {
	const [playing, setPlaying] = useState(false);
	const [found, setFound] = useState([]);
	const [card, setCard] = useState(null);
	const [heard, setHeard] = useState(false);
	const [questId, setQuestId] = useState(null);
	const [askId, setAskId] = useState(null);
	const [atBase, setAtBase] = useState(false);
	const [picks, setPicks] = useState([]);
	const [quizNote, setQuizNote] = useState("");
	const questRef = useRef(null);
	const askRef = useRef(null);
	const lockRef = useRef(false);
	const passedRef = useRef(new Set());
	const atBaseRef = useRef(false);
	const lootCount = useRef(0);
	const oxideCount = useRef(0);
	const worldRef = useRef("mars");
	const hostRef = useRef(null);
	const wastedRef = useRef(null);
	const guideRef = useRef(null);
	const keys = useRef({
		f: 0,
		b: 0,
		l: 0,
		r: 0
	});
	const stepRef = useRef({
		x: 0,
		z: 0
	});
	const driveRef = useRef(() => {});
	const tripRef = useRef(() => {});
	const wantRef = useRef(null);
	const jumpRef = useRef(false);
	const [big, setBig] = useState(false);
	const activeRef = useRef(false);
	const actionRef = useRef(null);
	const o2BarRef = useRef(null);
	const canBarRef = useRef(null);
	const vitalRef = useRef(null);
	const solRef = useRef(null);
	const lootRef = useRef(null);
	const gemRef = useRef(null);
	const foundRef = useRef(new Set());
	const cardRef = useRef(null);
	const [nearId, setNearId] = useState(null);
	const nearIdRef = useRef(null);
	const panelRef = useRef(null);
	const heardRef = useRef(false);
	useEffect(() => {
		cardRef.current = card?.id ?? null;
	}, [card]);
	useEffect(() => {
		if (!playing) return;
		activeRef.current = true;
		panelRef.current?.focus();
		const host = hostRef.current;
		if (!host) return;
		let cleanup = () => {};
		try {
			const renderer = new THREE.WebGLRenderer({
				antialias: false,
				powerPreference: "high-performance"
			});
			renderer.setPixelRatio(1);
			renderer.setClearColor(12891272, 1);
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.toneMapping = THREE.ACESFilmicToneMapping;
			renderer.toneMappingExposure = 1.05;
			host.appendChild(renderer.domElement);
			renderer.domElement.style.width = "100%";
			renderer.domElement.style.height = "100%";
			renderer.domElement.style.display = "block";
			renderer.domElement.style.touchAction = "none";
			if (!renderer.getContext()) {
				host.textContent = "Bu ekranda 3D açılamadı. Düğmelerle yine de dene, sayfayı bir kez yenile.";
				return;
			}
			const scene = new THREE.Scene();
			scene.fog = new THREE.Fog(12891272, 120, 900);
			const camera = new THREE.PerspectiveCamera(46, 1, .15, 4000);
			const sky = new THREE.Mesh(new THREE.SphereGeometry(1800, 32, 20), new THREE.ShaderMaterial({
				side: THREE.BackSide,
				depthWrite: false,
				vertexShader: "varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
				fragmentShader: "varying vec3 vP; void main(){ float h=normalize(vP).y; vec3 c=mix(vec3(0.73,0.58,0.48), vec3(0.55,0.70,0.82), smoothstep(-0.05,0.62,h)); gl_FragColor=vec4(c,1.0); }"
			}));
			scene.add(sky);
			const hemi = new THREE.HemisphereLight(16315104, 10579984, .85);
			scene.add(hemi);
			const ambient = new THREE.AmbientLight(16314584, .42);
			scene.add(ambient);
			const sun = new THREE.DirectionalLight(16773590, .85);
			sun.position.set(18, 28, 10);
			scene.add(sun);
			const fill = new THREE.DirectionalLight(13218970, .35);
			fill.position.set(-12, 8, -6);
			scene.add(fill);
			const heightAt = (x, z) => {
				let y = Math.sin(x * .08) * .7 + Math.cos(z * .06) * .5 + Math.sin(x * .021 + z * .017) * 1.6;
				const cell = 110;
				const ix = Math.floor(x / cell);
				const iz = Math.floor(z / cell);
				for (let a = ix; a <= ix + 1; a++) {
					for (let b = iz; b <= iz + 1; b++) {
						const hx = (a + .5) * cell;
						const hz = (b + .5) * cell;
						const amp = 3 + Math.abs(Math.sin(a * 12.9898 + b * 78.233)) * 8;
						const dx = x - hx;
						const dz = z - hz;
						y += amp * Math.exp(-(dx * dx + dz * dz) / 484);
					}
				}
				const peaks = [
					[32, 22, 6, 48],
					[-40, 28, 8, 55],
					[10, -46, 5, 42],
					[-22, -34, 7, 50],
					[52, -16, 5, 40],
					[-58, 10, 4, 38],
					[20, 54, 6, 46],
					[-12, 40, 4, 36]
				];
				for (const [px0, pz0, h, r] of peaks) {
					const dx = x - px0;
					const dz = z - pz0;
					y += h * Math.exp(-(dx * dx + dz * dz) / (r * r));
				}
				return y;
			};
			const map = new THREE.CanvasTexture(sandTexture());
			map.colorSpace = THREE.SRGBColorSpace;
			map.wrapS = map.wrapT = THREE.RepeatWrapping;
			map.repeat.set(10, 10);
			const groundGeo = new THREE.PlaneGeometry(400, 400, 100, 100);
			groundGeo.rotateX(-Math.PI / 2);
			const pos = groundGeo.attributes.position;
			const baseX = new Float32Array(pos.count);
			const baseZ = new Float32Array(pos.count);
			for (let i = 0; i < pos.count; i++) {
				baseX[i] = pos.getX(i);
				baseZ[i] = pos.getZ(i);
			}
			const shade = new Float32Array(pos.count * 3);
			groundGeo.setAttribute("color", new THREE.BufferAttribute(shade, 3));
			const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({
				map,
				vertexColors: true,
				roughness: .92,
				metalness: .02
			}));
			ground.receiveShadow = false;
			let groundOx = 1e9;
			let groundOz = 1e9;
			const bakeGround = (ox, oz) => {
				for (let i = 0; i < pos.count; i++) pos.setY(i, heightAt(ox + baseX[i], oz + baseZ[i]));
				pos.needsUpdate = true;
				groundGeo.computeVertexNormals();
				const nrm = groundGeo.attributes.normal;
				for (let i = 0; i < pos.count; i++) {
					const ny = nrm.getY(i);
					const h = pos.getY(i);
					const rock = 1 - THREE.MathUtils.smoothstep(ny, .55, .96);
					const low = THREE.MathUtils.smoothstep(h, -1, 3);
					shade[i * 3] = THREE.MathUtils.lerp(.96, .78, rock) * THREE.MathUtils.lerp(.9, 1, low);
					shade[i * 3 + 1] = THREE.MathUtils.lerp(.96, .7, rock) * THREE.MathUtils.lerp(.88, 1, low);
					shade[i * 3 + 2] = THREE.MathUtils.lerp(.96, .64, rock) * THREE.MathUtils.lerp(.84, 1, low);
				}
				groundGeo.attributes.color.needsUpdate = true;
				ground.position.set(ox, 0, oz);
				groundOx = ox;
				groundOz = oz;
			};
			bakeGround(0, 0);
			scene.add(ground);
			const footRay = new THREE.Raycaster();
			const footFrom = new THREE.Vector3();
			const footDown = new THREE.Vector3(0, -1, 0);
			const peaks = [
				[150, 30],
				[-140, 80],
				[50, -160],
				[-170, -40],
				[100, 150]
			];
			const marsFloor = () => {
				const nearHill = peaks.some(([x, z]) => {
					const dx = px - x;
					const dz = pz - z;
					return dx * dx + dz * dz < 62 * 62;
				});
				ground.updateMatrixWorld(true);
				footFrom.set(px, 500, pz);
				footRay.set(footFrom, footDown);
				const hits = nearHill ? footRay.intersectObjects([ground, mountains], true) : footRay.intersectObject(ground, false);
				return hits.length ? hits[0].point.y : heightAt(px, pz);
			};
			const groundY = (x, z) => {
				ground.updateMatrixWorld(true);
				footFrom.set(x, 200, z);
				footRay.set(footFrom, footDown);
				const hit = footRay.intersectObject(ground, false)[0];
				return hit ? hit.point.y : 0;
			};
			const rockGeo = new THREE.DodecahedronGeometry(.7, 0);
			const rockMat = new THREE.MeshStandardMaterial({
				color: 8010542,
				roughness: 1
			});
			const rocks = new THREE.InstancedMesh(rockGeo, rockMat, 90);
			const dummy = new THREE.Object3D();
			for (let i = 0; i < 90; i++) {
				const a = Math.random() * Math.PI * 2;
				const r = 8 + Math.random() * 70;
				const x = Math.cos(a) * r;
				const z = Math.sin(a) * r;
				const s = .35 + Math.random() * 1.8;
				dummy.position.set(x, groundY(x, z) + s * .15, z);
				dummy.scale.set(s, s * (.45 + Math.random() * .5), s * (.8 + Math.random() * .4));
				dummy.rotation.set(Math.random(), Math.random(), Math.random());
				dummy.updateMatrix();
				rocks.setMatrixAt(i, dummy.matrix);
			}
			scene.add(rocks);
			const mountMat = new THREE.MeshStandardMaterial({
				color: 9127187,
				roughness: 1
			});
			const capMat = new THREE.MeshStandardMaterial({
				color: 6905164,
				roughness: 1
			});
			const mountains = new THREE.Group();
			const baseTall = 3.2 * 3.4;
			const mountH = baseTall * 7;
			const mountR = 2.2 * 3.4 * 7;
			peaks.forEach(([x, z], i) => {
				const hill = new THREE.Mesh(new THREE.ConeGeometry(mountR, mountH, 22), mountMat);
				const foot = groundY(x, z);
				hill.position.set(x, foot + mountH * .42, z);
				hill.rotation.y = i;
				const cap = new THREE.Mesh(new THREE.DodecahedronGeometry(mountR * .22, 0), capMat);
				cap.position.set(x + mountR * .12, foot + mountH * .78, z);
				cap.scale.y = .65;
				mountains.add(hill, cap);
			});
			scene.add(mountains);
			const foil = new THREE.MeshStandardMaterial({
				color: 14996398,
				metalness: .62,
				roughness: .32
			});
			const metal = new THREE.MeshStandardMaterial({
				color: 12963030,
				metalness: .55,
				roughness: .38
			});
			const dark = new THREE.MeshStandardMaterial({
				color: 2761759,
				roughness: .7
			});
			const blue = new THREE.MeshStandardMaterial({
				color: 1920649,
				metalness: .3,
				roughness: .4,
				emissive: 729668,
				emissiveIntensity: .35
			});
			const spinners = [];
			const beacons = [];
			const beacon = (parent) => {
				const ring = new THREE.Mesh(new THREE.RingGeometry(.7, .86, 28), new THREE.MeshBasicMaterial({
					color: 16756768,
					side: THREE.DoubleSide,
					transparent: true,
					opacity: .85
				}));
				ring.rotation.x = -Math.PI / 2;
				ring.position.y = .05;
				parent.add(ring);
				beacons.push(ring);
			};
			const wheel = (x, z) => {
				const w = new THREE.Mesh(new THREE.CylinderGeometry(.11, .11, .08, 10), dark);
				w.rotation.z = Math.PI / 2;
				w.position.set(x, .11, z);
				return w;
			};
			const makeRover = (big) => {
				const g = new THREE.Group();
				const body = new THREE.Mesh(new THREE.BoxGeometry(big ? .7 : .5, .22, big ? .9 : .7), metal);
				body.position.y = .32;
				g.add(body);
				const mast = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, big ? .55 : .35, 8), dark);
				mast.position.set(.1, big ? .7 : .52, .2);
				g.add(mast);
				const head = new THREE.Mesh(new THREE.BoxGeometry(.16, .1, .12), blue);
				head.position.set(.1, big ? .98 : .72, .2);
				g.add(head);
				[-.22, .22].forEach((x) => {
					[
						-.28,
						0,
						.28
					].forEach((z) => g.add(wheel(x * (big ? 1.3 : 1), z * (big ? 1.25 : 1))));
				});
				return g;
			};
			const landers = [];
			SITES.filter((site) => site.world === "mars").forEach((site) => {
				const g = new THREE.Group();
				if (site.kind === "rover" || site.kind === "big" || site.kind === "heli") {
					g.add(makeRover(site.kind !== "rover"));
					if (site.kind === "heli") {
						const heli = new THREE.Group();
						heli.position.set(.7, .28, -.45);
						heli.add(new THREE.Mesh(new THREE.BoxGeometry(.18, .08, .18), foil));
						const blades = new THREE.Mesh(new THREE.BoxGeometry(.7, .015, .06), dark);
						blades.position.y = .12;
						heli.add(blades);
						g.add(heli);
						spinners.push({
							mesh: blades,
							speed: 8
						});
					}
				} else if (site.kind === "tube") {
					const tube = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .28, 12), foil);
					tube.rotation.z = Math.PI / 2.5;
					tube.position.y = .12;
					g.add(tube);
				} else {
					const deck = new THREE.Mesh(new THREE.CylinderGeometry(.28, .34, .16, 10), foil);
					deck.position.y = .48;
					g.add(deck);
					for (let i = 0; i < 3; i++) {
						const a = i / 3 * Math.PI * 2;
						const leg = new THREE.Mesh(new THREE.CylinderGeometry(.025, .02, .42, 6), dark);
						leg.position.set(Math.cos(a) * .28, .22, Math.sin(a) * .28);
						leg.rotation.z = Math.cos(a) * .55;
						leg.rotation.x = -Math.sin(a) * .55;
						g.add(leg);
					}
					if (site.kind === "panel") {
						const panel = new THREE.Mesh(new THREE.BoxGeometry(.9, .02, .28), blue);
						panel.position.set(0, .58, 0);
						g.add(panel);
					}
					if (site.kind === "arm") {
						const arm = new THREE.Mesh(new THREE.BoxGeometry(.5, .04, .04), metal);
						arm.position.set(.35, .62, 0);
						arm.rotation.z = -.4;
						g.add(arm);
					}
					const dish = new THREE.Mesh(new THREE.CylinderGeometry(.1, .1, .03, 12), metal);
					dish.position.y = .66;
					g.add(dish);
				}
				beacon(g);
				g.userData.world = site.world;
				g.scale.setScalar(site.kind === "tube" ? 1.7 : 2.1);
				g.position.set(site.x, site.world === "moon" ? 0 : groundY(site.x, site.z), site.z);
				landers.push(g);
				scene.add(g);
				if (QUIZ[site.id]) {
					const post = new THREE.Group();
					const pole = new THREE.Mesh(new THREE.CylinderGeometry(.12, .16, 1.6, 8), foil);
					pole.position.y = .8;
					const sign = new THREE.Mesh(new THREE.BoxGeometry(.85, .48, .08), blue);
					sign.position.y = 1.55;
					post.add(pole, sign);
					const qx = site.x + 2.6;
					const qz = site.z + 1.6;
					post.userData.world = site.world;
					post.position.set(qx, site.world === "moon" ? 0 : groundY(qx, qz), qz);
					landers.push(post);
					scene.add(post);
				}
			});
			const white = new THREE.MeshStandardMaterial({
				color: 16251131,
				roughness: .42,
				metalness: .08
			});
			const blueBand = new THREE.MeshStandardMaterial({
				color: 9356512,
				roughness: .48
			});
			const glass = new THREE.MeshStandardMaterial({
				color: 1316896,
				metalness: .9,
				roughness: .06,
				emissive: 1054752,
				emissiveIntensity: .35
			});
			const packMat = new THREE.MeshStandardMaterial({
				color: 15199730,
				roughness: .5
			});
			const suit = new THREE.Group();
			const body = new THREE.Group();
			const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.32, .38, 6, 16), white);
			torso.position.y = 1.22;
			const chest = new THREE.Mesh(new THREE.BoxGeometry(.26, .16, .05), new THREE.MeshStandardMaterial({ color: 14147818 }));
			chest.position.set(0, 1.26, .3);
			const buttonColors = [
				9357542,
				12043217,
				16054267,
				14834506
			];
			const buttons = buttonColors.map((color, i) => {
				const button = new THREE.Mesh(new THREE.BoxGeometry(.045, .035, .02), new THREE.MeshStandardMaterial({ color }));
				button.position.set(-.07 + i % 2 * .1, 1.3 - Math.floor(i / 2) * .06, .34);
				return button;
			});
			const helmet = new THREE.Mesh(new THREE.SphereGeometry(.32, 32, 24), white);
			helmet.position.y = 1.86;
			const neck = new THREE.Mesh(new THREE.TorusGeometry(.16, .035, 8, 16), white);
			neck.rotation.x = Math.PI / 2;
			neck.position.y = 1.58;
			const visor = new THREE.Mesh(new THREE.SphereGeometry(.22, 28, 18), glass);
			visor.scale.set(1.15, .92, .46);
			visor.position.set(0, 1.88, .18);
			const pack = new THREE.Mesh(new THREE.BoxGeometry(.42, .52, .2), packMat);
			pack.position.set(0, 1.26, -.34);
			const grill = new THREE.Mesh(new THREE.BoxGeometry(.16, .14, .02), dark);
			grill.position.set(.08, 1.38, -.45);
			const hose = new THREE.Mesh(new THREE.TorusGeometry(.12, .028, 8, 18, Math.PI * 1.2), blueBand);
			hose.position.set(.26, 1.2, -.08);
			hose.rotation.y = Math.PI / 2;
			const antenna = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, .2, 6), blueBand);
			antenna.position.set(-.16, 2.12, -.1);
			const shadow = new THREE.Mesh(new THREE.CircleGeometry(.42, 20), new THREE.MeshBasicMaterial({
				color: 0,
				transparent: true,
				opacity: .28
			}));
			shadow.rotation.x = -Math.PI / 2;
			shadow.position.y = .03;
			const hipOf = (side) => {
				const hip = new THREE.Group();
				hip.position.set(side * .14, .84, 0);
				const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(.09, .2, 4, 8), white);
				thigh.position.y = -.16;
				const stripe = new THREE.Mesh(new THREE.TorusGeometry(.1, .018, 6, 12), blueBand);
				stripe.rotation.x = Math.PI / 2;
				stripe.position.y = -.06;
				const knee = new THREE.Group();
				knee.position.y = -.32;
				const shin = new THREE.Mesh(new THREE.CapsuleGeometry(.07, .16, 3, 8), white);
				shin.position.y = -.14;
				const boot = new THREE.Mesh(new THREE.BoxGeometry(.16, .1, .26), white);
				boot.position.set(0, -.3, .04);
				const bootSole = new THREE.Mesh(new THREE.BoxGeometry(.17, .035, .28), new THREE.MeshStandardMaterial({ color: 14015459 }));
				bootSole.position.set(0, -.36, .05);
				knee.add(shin, boot, bootSole);
				hip.add(thigh, stripe, knee);
				hip.userData.knee = knee;
				return hip;
			};
			const leftHip = hipOf(-1);
			const rightHip = hipOf(1);
			const leftKnee = leftHip.userData.knee;
			const rightKnee = rightHip.userData.knee;
			const armOf = (side) => {
				const shoulder = new THREE.Group();
				shoulder.position.set(side * .42, 1.42, 0);
				const upper = new THREE.Mesh(new THREE.CapsuleGeometry(.065, .16, 3, 8), white);
				upper.position.y = -.14;
				const stripe = new THREE.Mesh(new THREE.TorusGeometry(.078, .015, 6, 10), blueBand);
				stripe.rotation.x = Math.PI / 2;
				stripe.position.y = -.08;
				const elbow = new THREE.Group();
				elbow.position.y = -.28;
				const fore = new THREE.Mesh(new THREE.CapsuleGeometry(.055, .14, 3, 8), white);
				fore.position.y = -.12;
				const glove = new THREE.Mesh(new THREE.SphereGeometry(.075, 12, 10), white);
				glove.position.y = -.26;
				elbow.add(fore, glove);
				shoulder.add(upper, stripe, elbow);
				shoulder.userData.elbow = elbow;
				return shoulder;
			};
			const leftShoulder = armOf(-1);
			const rightShoulder = armOf(1);
			const leftElbow = leftShoulder.userData.elbow;
			const rightElbow = rightShoulder.userData.elbow;
			body.add(torso, chest, ...buttons, helmet, neck, visor, pack, grill, hose, antenna, leftHip, rightHip, leftShoulder, rightShoulder);
			suit.add(shadow, body);
			suit.scale.setScalar(2.4);
			suit.position.set(0, groundY(0, 6), 6);
			scene.add(suit);
			const heroBones = {};
			const restQ = {};
			const heroPivot = new THREE.Group();
			suit.add(heroPivot);
			const poseHero = (phase, walking) => {
				const set = (name, turn) => {
					const bone = heroBones[name];
					const rest = restQ[name];
					if (!bone || !rest) return;
					bone.quaternion.copy(rest);
					turn(bone);
				};
				const thigh = walking ? Math.sin(phase) * 0.78 : 0;
				const kneeL = walking ? Math.pow(Math.max(0, Math.sin(phase + 0.85)), 1.15) * 1.35 : 0.08;
				const kneeR = walking ? Math.pow(Math.max(0, Math.sin(phase + 0.85 + Math.PI)), 1.15) * 1.35 : 0.08;
				set("Hips", (bone) => {
					bone.rotateY(thigh * 0.2);
					bone.rotateZ(-thigh * 0.05);
				});
				set("Torso", (bone) => {
					bone.rotateY(-thigh * 0.16);
					bone.rotateX(walking ? 0.06 : 0);
				});
				set("Head", (bone) => bone.rotateY(thigh * 0.08));
				set("UpperArmL", (bone) => {
					bone.rotateX(-1.4);
					bone.rotateZ(thigh * 0.9);
				});
				set("UpperArmR", (bone) => {
					bone.rotateX(-1.4);
					bone.rotateZ(thigh * 0.9);
				});
				set("LowerArmL", (bone) => bone.rotateZ(-(0.42 + Math.max(0, -thigh) * 0.7)));
				set("LowerArmR", (bone) => bone.rotateZ(0.42 + Math.max(0, thigh) * 0.7));
				set("UpperLegL", (bone) => bone.rotateZ(thigh));
				set("UpperLegR", (bone) => bone.rotateZ(thigh));
				set("LowerLegL", (bone) => bone.rotateX(-kneeL));
				set("LowerLegR", (bone) => bone.rotateX(-kneeR));
				heroPivot.position.y = walking ? Math.abs(Math.cos(phase)) * 0.04 : 0;
				heroPivot.rotation.z = walking ? thigh * 0.05 : 0;
			};
			let gait = 0;
			new GLTFLoader().load("/astronaut.glb", (gltf) => {
				const model = gltf.scene;
				model.traverse((obj) => {
					const bone = obj;
					if (bone.isBone && bone.name) {
						heroBones[bone.name] = bone;
						restQ[bone.name] = bone.quaternion.clone();
					}
					const mesh = obj;
					if (mesh.isMesh) mesh.frustumCulled = false;
				});
				model.updateMatrixWorld(true);
				const fitted = new THREE.Box3().setFromObject(model);
				const height = Math.max(fitted.getSize(new THREE.Vector3()).y, 1e-4);
				model.scale.setScalar(1.35 / height);
				model.position.y = -new THREE.Box3().setFromObject(model).min.y;
				heroPivot.add(model);
				body.visible = false;
			});
			const buildOutpost = () => {
				const base = new THREE.Group();
				const steel = new THREE.MeshStandardMaterial({
					color: 2366488,
					roughness: .62,
					metalness: .55
				});
				const tankMat = new THREE.MeshStandardMaterial({
					color: 3813672,
					roughness: .4,
					metalness: .7
				});
				const pad = new THREE.Mesh(new THREE.BoxGeometry(4.4, .22, 2.8), steel);
				pad.position.y = .11;
				const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, .16, 2.2), steel);
				deck.position.y = .9;
				base.add(pad, deck);
				[
					[-1.5, -.85],
					[1.5, -.85],
					[-1.5, .85],
					[1.5, .85]
				].forEach(([x, z]) => {
					const col = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, .72, 8), steel);
					col.position.set(x, .5, z);
					base.add(col);
				});
				[-.9, .9].forEach((x) => {
					const tank = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1.55, 18), tankMat);
					tank.rotation.z = Math.PI / 2;
					tank.position.set(x, 1.42, 0);
					const cap = new THREE.Mesh(new THREE.SphereGeometry(.5, 16, 12), tankMat);
					cap.scale.x = .35;
					cap.position.set(x + .78, 1.42, 0);
					const cap2 = cap.clone();
					cap2.position.x = x - .78;
					base.add(tank, cap, cap2);
				});
				const mast = new THREE.Mesh(new THREE.BoxGeometry(.1, 1.35, .1), steel);
				mast.position.set(.05, 2.2, .2);
				const boom = new THREE.Mesh(new THREE.BoxGeometry(1.7, .07, .07), steel);
				boom.position.set(.75, 2.75, .2);
				boom.rotation.z = .5;
				const jaw = new THREE.Mesh(new THREE.BoxGeometry(.62, .38, .06), steel);
				jaw.position.set(1.4, 3.15, .2);
				jaw.rotation.z = .15;
				const rail = new THREE.Mesh(new THREE.BoxGeometry(.5, .05, .28), steel);
				rail.position.set(1.15, 2.95, .2);
				base.add(mast, boom, jaw, rail);
				const dishPole = new THREE.Mesh(new THREE.CylinderGeometry(.035, .045, .85, 8), steel);
				dishPole.position.set(1.85, .7, 1.05);
				const dish = new THREE.Mesh(new THREE.CylinderGeometry(.32, .26, .08, 14), metal);
				dish.position.set(1.85, 1.15, 1.05);
				dish.rotation.x = .9;
				dish.rotation.z = -.4;
				base.add(dishPole, dish);
				return base;
			};
			const home = buildOutpost();
			home.position.set(0, groundY(0, 0), 0);
			home.scale.setScalar(3.4);
			scene.add(home);
			const marsRoot = new THREE.Group();
			scene.add(marsRoot);
			[
				ground,
				rocks,
				mountains,
				home,
				...landers.filter((obj) => obj.userData.world !== "moon")
			].forEach((obj) => {
				scene.remove(obj);
				marsRoot.add(obj);
			});
			const moonRoot = new THREE.Group();
			moonRoot.visible = false;
			const moonGround = new THREE.Mesh(new THREE.CircleGeometry(4000, 64), new THREE.MeshStandardMaterial({
				color: 12960187,
				roughness: 1
			}));
			moonGround.rotation.x = -Math.PI / 2;
			const moonBase = buildOutpost();
			moonBase.position.set(0, 0, 0);
			moonBase.scale.setScalar(3.4);
			moonRoot.add(moonGround, moonBase);
			landers.filter((obj) => obj.userData.world === "moon").forEach((obj) => {
				scene.remove(obj);
				moonRoot.add(obj);
			});
			scene.add(moonRoot);
			const lootMat = new THREE.MeshStandardMaterial({
				color: 16765274,
				emissive: 9067024,
				emissiveIntensity: .45,
				metalness: .55,
				roughness: .25
			});
			const loots = [];
			const dropLoot = (parent, worldName, count) => {
				const kinds = worldName === "mars" ? ["water", "oxide", "mineral"] : ["water", "oxide", "mineral", "o2", "food"];
				for (let i = 0; i < count; i++) {
					const kind = kinds[i % kinds.length];
					const color = { water: 8900330, oxide: 12008462, mineral: 10179832, o2: 65484, food: 16753920 }[kind];
					let mesh;
					if (kind === "water") mesh = new THREE.Mesh(new THREE.SphereGeometry(.34, 12, 10), new THREE.MeshStandardMaterial({ color, roughness: .12, metalness: .15, emissive: 4488192, emissiveIntensity: .2 }));
					else if (kind === "oxide") mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(.38, 0), new THREE.MeshStandardMaterial({ color, roughness: .95 }));
					else if (kind === "mineral") mesh = new THREE.Mesh(new THREE.OctahedronGeometry(.36, 0), new THREE.MeshStandardMaterial({ color, emissive: 5570645, emissiveIntensity: .35, metalness: .35, roughness: .25 }));
					else if (kind === "o2") mesh = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, .42, 8), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .25 }));
					else mesh = new THREE.Mesh(new THREE.BoxGeometry(.28, .2, .28), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .15 }));
					const r = worldName === "mars" ? 12 + Math.random() * 55 : 14 + Math.random() * 50;
					const a = Math.random() * Math.PI * 2;
					const x = Math.cos(a) * r;
					const z = Math.sin(a) * r;
					mesh.position.set(x, worldName === "mars" ? groundY(x, z) + .4 : .4, z);
					parent.add(mesh);
					loots.push({ mesh, world: worldName, kind });
				}
			};
			dropLoot(marsRoot, "mars", 42);
			dropLoot(moonRoot, "moon", 12);
			const dustCount = 220;
			const dustGeo = new THREE.BufferGeometry();
			const dustArr = new Float32Array(dustCount * 3);
			for (let i = 0; i < dustCount; i++) {
				dustArr[i * 3] = (Math.random() - .5) * 80;
				dustArr[i * 3 + 1] = Math.random() * 6;
				dustArr[i * 3 + 2] = (Math.random() - .5) * 80;
			}
			dustGeo.setAttribute("position", new THREE.BufferAttribute(dustArr, 3));
			const dustMat = new THREE.PointsMaterial({
				color: 13648384,
				size: .45,
				transparent: true,
				opacity: 0,
				depthWrite: false
			});
			const dust = new THREE.Points(dustGeo, dustMat);
			scene.add(dust);
			const rocket = new THREE.Group();
			const rocketBody = new THREE.Mesh(new THREE.CylinderGeometry(.22, .28, 1.25, 12), white);
			rocketBody.position.y = .7;
			const nose = new THREE.Mesh(new THREE.ConeGeometry(.22, .42, 12), blueBand);
			nose.position.y = 1.5;
			const flame = new THREE.Mesh(new THREE.ConeGeometry(.18, .6, 10), new THREE.MeshBasicMaterial({ color: 16747038 }));
			flame.position.y = -.1;
			flame.rotation.x = Math.PI;
			flame.visible = false;
			rocket.add(rocketBody, nose, flame);
			const marsPad = new THREE.Vector3(4.2, groundY(4.2, 1.6), 1.6);
			const moonPad = new THREE.Vector3(3.2, 0, 1.4);
			rocket.position.copy(marsPad);
			scene.add(rocket);
			const room = new THREE.Group();
			room.visible = false;
			const roomFloor = new THREE.Mesh(new THREE.CircleGeometry(3.2, 24), new THREE.MeshStandardMaterial({
				color: 14015718,
				roughness: .8
			}));
			roomFloor.rotation.x = -Math.PI / 2;
			const roomWall = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 1.7, 24, 1, true), new THREE.MeshStandardMaterial({
				color: 16251131,
				side: THREE.BackSide
			}));
			roomWall.position.y = .85;
			const stations = [
				{
					name: "Oksijen doldu",
					x: -1.4,
					color: 8315135
				},
				{
					name: "Haritaya baktın",
					x: 0,
					color: 16765274
				},
				{
					name: "Eşyaları rafa koydun",
					x: 1.4,
					color: 9306010
				}
			].map((job) => {
				const box = new THREE.Mesh(new THREE.BoxGeometry(.55, .42, .32), new THREE.MeshStandardMaterial({
					color: job.color,
					emissive: job.color,
					emissiveIntensity: .25
				}));
				box.position.set(job.x, .35, -1.7);
				box.userData.job = job.name;
				box.userData.used = false;
				room.add(box);
				return box;
			});
			room.add(roomFloor, roomWall);
			scene.add(room);
			const skyMat = sky.material;
			skyMat.uniforms = { uDay: { value: 1 } };
			skyMat.fragmentShader = "uniform float uDay; varying vec3 vP; void main(){ vec3 n=normalize(vP); float h=n.y; vec3 day=mix(vec3(0.95,0.82,0.66), vec3(0.55,0.32,0.38), smoothstep(0.0,0.7,h)); vec3 night=mix(vec3(0.1,0.08,0.14), vec3(0.02,0.02,0.05), smoothstep(0.0,0.45,h)); vec3 c=mix(night,day,uDay); float sun=pow(max(dot(n,normalize(vec3(0.45,0.28,0.2))),0.0), 40.0); c+=vec3(1.0,0.9,0.7)*sun*uDay; gl_FragColor=vec4(c,1.0); }";
			skyMat.needsUpdate = true;
			let world = "mars";
			let inside = false;
			let flight = "none";
			let flightT = 0;
			let goingMoon = true;
			let loot = 0;
			let px = 0;
			let pz = 6;
			let py = groundY(0, 6);
			let vy = 0;
			let inAir = false;
			let yaw = Math.PI;
			let frame = 0;
			let onScreen = true;
			let dwell = 0;
			let o2 = 100;
			let co2 = 4;
			let hp = 100;
			let heart = 72;
			let storm = 0;
			const born = performance.now();
			let aimDist = 999;
			let o2Drain = 1;
			let pressure = 100;
			let water = 100;
			let power = 100;
			let suitTemp = 22;
			let wastedUntil = 0;
			let o2Tick = 0;
			const clock = new THREE.Clock();
			const resize = () => {
				const w = host.clientWidth;
				const h = host.clientHeight;
				if (!w || !h) return;
				renderer.setSize(w, h, false);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			};
			resize();
			const ro = new ResizeObserver(resize);
			ro.observe(host);
			const io = new IntersectionObserver(([entry]) => {
				onScreen = entry.isIntersecting;
			});
			io.observe(host);
			let sprint = false;
			const onKey = (isDown) => (e) => {
				const tag = e.target?.tagName;
				if (tag === "INPUT" || tag === "TEXTAREA") return;
				if (e.key === "Shift") {
					sprint = isDown;
					return;
				}
				const code = e.code;
				const byCode = {
					KeyW: ["f", 0, -.6],
					ArrowUp: ["f", 0, -.6],
					KeyS: ["b", 0, .6],
					ArrowDown: ["b", 0, .6],
					KeyA: ["l", -.6, 0],
					ArrowLeft: ["l", -.6, 0],
					KeyD: ["r", .6, 0],
					ArrowRight: ["r", .6, 0]
				};
				const key = e.key.toLowerCase();
				const map = {
					w: ["f", 0, -.6],
					arrowup: ["f", 0, -.6],
					s: ["b", 0, .6],
					arrowdown: ["b", 0, .6],
					a: ["l", -.6, 0],
					arrowleft: ["l", -.6, 0],
					d: ["r", .6, 0],
					arrowright: ["r", .6, 0]
				};
				const move = byCode[code] || map[key];
				if (move) {
					e.preventDefault();
					keys.current[move[0]] = isDown ? 1 : 0;
					return;
				}
				if (!isDown) return;
				if (e.code === "Space" || e.key === " ") {
					e.preventDefault();
					if (!e.repeat) jumpRef.current = true;
				}
				if (key === "r" || e.code === "KeyR") {
					if (!e.repeat) wantRef.current = "mars";
				}
			};
			const down = onKey(true);
			const up = onKey(false);
			window.addEventListener("keydown", down, true);
			window.addEventListener("keyup", up, true);
			const clearKeys = () => {
				keys.current.f = keys.current.b = keys.current.l = keys.current.r = 0;
				sprint = false;
			};
			clearKeys();
			window.addEventListener("blur", clearKeys);
			let lookPitch = 0.45;
			let overGame = false;
			const frameCamera = () => {
				const dist = 7.4;
				camera.position.set(px - Math.sin(yaw) * dist, py + 2.8 + lookPitch * 3.4, pz - Math.cos(yaw) * dist);
				camera.lookAt(px, py + 1.15, pz);
			};
			const onLook = (ev) => {
				const locked = document.pointerLockElement === renderer.domElement;
				if (!locked && !overGame) return;
				yaw -= ev.movementX * 0.003;
				lookPitch = Math.max(-0.15, Math.min(1.05, lookPitch - ev.movementY * 0.002));
			};
			const onLockClick = (ev) => {
				if (lockRef.current) return;
				if (ev.pointerType && ev.pointerType !== "mouse") return;
				if (document.pointerLockElement !== renderer.domElement) renderer.domElement.requestPointerLock();
			};
			renderer.domElement.addEventListener("mouseenter", () => {
				overGame = true;
			});
			renderer.domElement.addEventListener("mouseleave", () => {
				overGame = false;
			});
			renderer.domElement.addEventListener("click", onLockClick);
			window.addEventListener("mousemove", onLook);
			let touchId = null;
			let touchX = 0;
			let touchY = 0;
			const onTouchDown = (ev) => {
				if (ev.pointerType === "mouse") return;
				touchId = ev.pointerId;
				touchX = ev.clientX;
				touchY = ev.clientY;
			};
			const onTouchMove = (ev) => {
				if (ev.pointerId !== touchId) return;
				const dx = ev.clientX - touchX;
				const dy = ev.clientY - touchY;
				touchX = ev.clientX;
				touchY = ev.clientY;
				yaw -= dx * 0.008;
				lookPitch = Math.max(-0.15, Math.min(1.05, lookPitch - dy * 0.006));
			};
			const onTouchUp = (ev) => {
				if (ev.pointerId === touchId) touchId = null;
			};
			renderer.domElement.addEventListener("pointerdown", onTouchDown);
			renderer.domElement.addEventListener("pointermove", onTouchMove);
			window.addEventListener("pointerup", onTouchUp);
			const loop = () => {
				frame = requestAnimationFrame(loop);
				if (!onScreen) return;
				try {
					const dt = Math.min(clock.getDelta(), .033);
					const t = performance.now() / 1e3;
					if (wastedUntil && performance.now() < wastedUntil) {
						renderer.render(scene, camera);
						return;
					}
					const act = actionRef.current;
					actionRef.current = null;
					const hop = (toMoon) => {
						world = toMoon ? "moon" : "mars";
						marsRoot.visible = world === "mars";
						moonRoot.visible = world === "moon";
						const land = toMoon ? moonPad : marsPad;
						rocket.position.copy(land);
						flame.visible = false;
						suit.visible = true;
						px = land.x + 1.5;
						pz = land.z + 1.3;
						py = toMoon ? 0 : groundY(px, pz);
						vy = 0;
						inAir = false;
						sky.visible = !toMoon;
						scene.background = toMoon ? new THREE.Color(0) : null;
						scene.fog.color.set(toMoon ? 1184274 : 12891272);
						scene.fog.near = toMoon ? 18 : 120;
						scene.fog.far = toMoon ? 280 : 900;
						if (guideRef.current) guideRef.current.textContent = "Mars'tasın.";
					};
					if (wantRef.current === "mars" || act === "r") {
						wantRef.current = null;
						if (inside) {
							inside = false;
							room.visible = false;
							marsRoot.visible = world === "mars";
							moonRoot.visible = world === "moon";
							px = 0;
							pz = 2.6;
							py = world === "mars" ? groundY(px, pz) : 0;
						} else if (world === "moon") hop(false);
					}
					const k = keys.current;
					if (lockRef.current) {
						k.f = k.b = k.l = k.r = 0;
						stepRef.current.x = 0;
						stepRef.current.z = 0;
						jumpRef.current = false;
						if (document.pointerLockElement) document.exitPointerLock();
						if (guideRef.current) guideRef.current.textContent = "Sorular bitmeden oyun durur.";
						renderer.render(scene, camera);
						return;
					}
					const forward = lockRef.current ? 0 : k.f - k.b;
					const strafe = lockRef.current ? 0 : k.r - k.l;
					const moving = forward !== 0 || strafe !== 0;
					const speed = 3 * (sprint ? 2.15 : 1);
					if (jumpRef.current && !inAir && !lockRef.current) {
						vy = 8;
						inAir = true;
					}
					jumpRef.current = false;
					const air = inAir ? 2.6 : 1;
					if (!lockRef.current && (forward !== 0 || strafe !== 0)) {
						const len = Math.hypot(forward, strafe) || 1;
						const f = forward / len * speed * air * dt;
						const s = strafe / len * speed * air * dt;
						px += Math.sin(yaw) * f - Math.cos(yaw) * s;
						pz += Math.cos(yaw) * f + Math.sin(yaw) * s;
					}
					if (!lockRef.current && (stepRef.current.x || stepRef.current.z)) {
						px += stepRef.current.x;
						pz += stepRef.current.z;
						stepRef.current.x = 0;
						stepRef.current.z = 0;
					}
					if (world === "mars" && !inside) {
						const ox = Math.round(px / 70) * 70;
						const oz = Math.round(pz / 70) * 70;
						if (ox !== groundOx || oz !== groundOz) bakeGround(ox, oz);
					}
					const floorY = inside || world === "moon" ? 0 : marsFloor();
					if (inAir) {
						vy -= 7 * dt;
						py += vy * dt;
						if (py <= floorY) {
							py = floorY;
							vy = 0;
							inAir = false;
						}
					} else {
						py = floorY;
						vy = 0;
					}
					const airborne = inAir;
					if (moving && !airborne) gait += dt * (sprint ? 10.5 : 6.6);
					else gait += (Math.PI * Math.round(gait / Math.PI) - gait) * Math.min(1, dt * 8);
					if (airborne) {
						leftHip.rotation.x = .35;
						rightHip.rotation.x = .35;
						leftKnee.rotation.x = .8;
						rightKnee.rotation.x = .8;
						leftShoulder.rotation.x = -1.15;
						rightShoulder.rotation.x = -1.15;
						leftElbow.rotation.x = .2;
						rightElbow.rotation.x = .2;
						body.position.y = 0;
						poseHero(gait, false);
					} else if (moving) {
						leftHip.rotation.x = -Math.sin(gait) * .8;
						rightHip.rotation.x = Math.sin(gait) * .8;
						leftKnee.rotation.x = Math.max(0, Math.sin(gait)) * 1.15;
						rightKnee.rotation.x = Math.max(0, -Math.sin(gait)) * 1.15;
						leftShoulder.rotation.x = Math.sin(gait) * .65;
						rightShoulder.rotation.x = -Math.sin(gait) * .65;
						leftElbow.rotation.x = .25;
						rightElbow.rotation.x = .25;
						body.position.y = Math.abs(Math.cos(gait)) * .04;
						body.rotation.z = Math.sin(gait) * .04;
						poseHero(gait, true);
					} else {
						leftHip.rotation.x = .04;
						rightHip.rotation.x = .04;
						leftKnee.rotation.x = .08;
						rightKnee.rotation.x = .08;
						leftShoulder.rotation.x = .12;
						rightShoulder.rotation.x = .12;
						leftElbow.rotation.x = .2;
						rightElbow.rotation.x = .2;
						body.position.y = Math.sin(t * 1.7) * .015;
						body.rotation.z = 0;
						poseHero(0, false);
					}
					antenna.rotation.z = Math.sin(t * 1.6) * .08;
					suit.position.set(px, py, pz);
					suit.rotation.y = yaw;
					if (world === "mars") marsRoot.visible = true;
					else moonRoot.visible = true;
					marsRoot.visible = world === "mars";
					moonRoot.visible = world === "moon";
					stations.forEach((box) => {
						if (!inside || box.userData.used) return;
						if (Math.hypot(px - box.position.x, pz - box.position.z) < .85) {
							box.userData.used = true;
							if (box.userData.job === "Oksijen doldu") {
								o2 = 100;
								co2 = 4;
								hp = 100;
								pressure = 100;
								water = 100;
								power = 100;
								suitTemp = 22;
							}
							if (guideRef.current) guideRef.current.textContent = String(box.userData.job);
						}
					});
					loots.forEach((item) => {
						if (!item.mesh.visible || item.world !== world) return;
						const dx = px - item.mesh.position.x;
						const dz = pz - item.mesh.position.z;
						const nearLoot = dx * dx + dz * dz < 36 * 36;
						if (nearLoot) item.mesh.rotation.y += dt * 2;
						if (!inside && dx * dx + dz * dz < (item.kind === "big" ? 2.6 * 2.6 : 1.4 * 1.4)) {
							item.mesh.visible = false;
							const kind = item.kind;
							if (kind === "o2") o2 = Math.max(0, Math.min(100, o2 + 40));
							else if (kind === "water") water = Math.max(0, Math.min(100, water + 40));
							else if (kind === "power") power = Math.max(0, Math.min(100, power + 45));
							else if (kind === "filter") co2 = Math.max(0, co2 - 35);
							else if (kind === "patch") pressure = Math.max(0, Math.min(100, pressure + 40));
							else if (kind === "food") hp = Math.max(0, Math.min(100, hp + 30));
							if (kind === "oxide") oxideCount.current += 1;
							else if (kind === "mineral" || kind === "gem" || kind === "big" || kind === "rock") {
								lootCount.current += kind === "big" ? 3 : 1;
								loot = lootCount.current;
							}
							const names = { gem: "Mücevher", big: "Büyük mücevher", o2: "Oksijen tüpü", water: "Su", oxide: "Demir oksit", mineral: "Nadir mineral", power: "Pil", filter: "Karbon filtre", patch: "Basınç yaması", food: "Yiyecek", rock: "Kaya örneği" };
							if (lootRef.current) lootRef.current.textContent = `Demir oksit: ${oxideCount.current}`;
							if (gemRef.current) gemRef.current.textContent = `Demir oksit ${oxideCount.current}`;
						}
					});
					const atHome = (Math.hypot(px, pz) < 2.3 && world === "mars") || inside;
					const clamp = (n) => Math.max(0, Math.min(100, n));
					const phase = ((performance.now() - born) / 1000) % 40;
					const stormTarget = world === "mars" && !inside && phase > 36 ? 1 : 0;
					storm += (stormTarget - storm) * Math.min(1, dt * 2.4);
					if (storm > 0.04) {
						const dustPos = dustGeo.attributes.position;
						const darr = dustPos.array;
						for (let i = 0; i < dustCount; i++) {
							let x = darr[i * 3] + (4 + storm * 18) * dt;
							let z = darr[i * 3 + 2] + (2 + storm * 10) * dt;
							if (x > px + 46) x = px - 46;
							if (z > pz + 46) z = pz - 46;
							if (x < px - 46) x = px + 40;
							if (z < pz - 46) z = pz + 40;
							darr[i * 3] = x;
							darr[i * 3 + 1] = .3 + (i % 9) * .55 + Math.sin(t * 6 + i) * storm * .4;
							darr[i * 3 + 2] = z;
						}
						dustPos.needsUpdate = true;
					}
					dustMat.opacity = world === "mars" && storm > 0.04 ? storm * .7 : 0;
					dustMat.size = .35 + storm * .7;
					scene.fog.near = 120 - storm * 70;
					scene.fog.far = 900 - storm * 500;
					let nearestOpen = 999;
					for (const site of SITES) {
						if (site.world !== world || foundRef.current.has(site.id) || !QUIZ[site.id]) continue;
						nearestOpen = Math.min(nearestOpen, Math.hypot(site.x + 2.6 - px, site.z + 1.6 - pz));
					}
					const chasing = nearestOpen < 8 || nearestOpen < aimDist - .04;
					aimDist = nearestOpen;
					o2 = 100;
					co2 = clamp(co2 + (atHome ? -18 : 0.45 + storm * 0.35) * dt);
					pressure = clamp(pressure + (atHome ? 22 : -.2) * dt);
					water = clamp(water + (atHome ? 16 : -.15 - storm * .1) * dt);
					power = clamp(power + (atHome ? 18 : -.1) * dt);
					suitTemp += ((atHome ? 22 : 8 - storm * 6) - suitTemp) * Math.min(1, dt * .2);
					heart = Math.round(68 + (sprint ? 28 : 0) + storm * 22);
					let hurt = 0;
					if (!atHome && pressure <= 0) hurt += 6;
					if (!atHome && co2 >= 75) hurt += 5;
					hp = clamp(hp + (atHome ? 10 : -hurt) * dt);
					if (wastedUntil) {
						if (performance.now() < wastedUntil) {
							renderer.render(scene, camera);
							return;
						}
						wastedUntil = 0;
						if (wastedRef.current) wastedRef.current.style.display = "none";
						if (renderer.domElement) renderer.domElement.style.filter = "";
						o2 = 100;
						co2 = 4;
						hp = 100;
						pressure = 100;
						water = 100;
						power = 100;
						suitTemp = 22;
						px = 0;
						pz = 6;
						py = groundY(0, 6);
						vy = 0;
						yaw = Math.PI;
						world = "mars";
						inside = false;
						room.visible = false;
						marsRoot.visible = true;
						moonRoot.visible = false;
						rocket.position.copy(marsPad);
						loot = 0;
						lootCount.current = 0;
						questRef.current = null;
						setQuestId(null);
						setAskId(null);
						askRef.current = null;
						aimDist = 999;
						setPicks([]);
						setQuizNote("");
						lockRef.current = false;
						passedRef.current.clear();
						loots.forEach((item) => {
							item.mesh.visible = true;
						});
						foundRef.current.clear();
						cardRef.current = null;
						heardRef.current = false;
						setFound([]);
						setCard(null);
						setHeard(false);
						setNearId(null);
						oxideCount.current = 0;
						if (lootRef.current) lootRef.current.textContent = "Demir oksit: 0";
						if (gemRef.current) gemRef.current.textContent = "Demir oksit 0";
						if (o2BarRef.current) o2BarRef.current.style.width = "100%";
						if (guideRef.current) guideRef.current.textContent = "Baştan başladın.";
						if (solRef.current) solRef.current.textContent = "Evden yeniden çıkıyorsun.";
					}
					if (hp <= 0 && !atHome) {
						wastedUntil = performance.now() + 2200;
						o2 = 1;
						if (wastedRef.current) wastedRef.current.style.display = "flex";
						renderer.domElement.style.filter = "grayscale(1) contrast(1.15) brightness(0.7)";
						renderer.render(scene, camera);
						return;
					}
					o2Tick += dt;
					if (o2Tick > .2) {
						o2Tick = 0;
						if (o2BarRef.current) o2BarRef.current.style.width = `${o2}%`;
						if (canBarRef.current) canBarRef.current.style.width = `${hp}%`;
						if (gemRef.current) gemRef.current.textContent = `Demir oksit ${oxideCount.current}`;
						if (vitalRef.current) vitalRef.current.textContent = `Can ${Math.round(hp)} · O2 ${Math.round(o2)} · CO2 ${Math.round(co2)} · Basınç ${Math.round(pressure)} · Su ${Math.round(water)} · Güç ${Math.round(power)} · ${Math.round(suitTemp)}°C · Nabız ${heart}${storm > .45 ? " · LODOS" : ""}`;
						if (solRef.current) {
							solRef.current.textContent = atHome ? "Evdesin. Sistemler doluyor." : storm > .45 ? "Kuvvetli lodos. Kum fırtınası." : "Oksijen dolu.";
						}
					}
					sky.position.set(px, 0, pz);
					frameCamera();
					beacons.forEach((ring, i) => {
						const learned = foundRef.current.has(SITES[i].id);
						ring.material.color.set(learned ? 6021258 : 16756768);
						ring.scale.setScalar(learned ? 1 : 1 + Math.sin(t * 3 + i) * .08);
					});
					spinners.forEach((item) => {
						item.mesh.rotation.y += item.speed * dt;
					});
					let nearest = null;
					let nearestD = 99;
					let close = null;
					let closeD = 8;
					let ask = null;
					let askD = 7;
					let nearInsight = false;
					const here = SITES.filter((site) => site.world === world);
					for (const site of here) {
						const dist = Math.hypot(site.x - px, site.z - pz);
						if (site.id === "insight" && dist < 1.8) nearInsight = true;
						if (dist < closeD) {
							close = site;
							closeD = dist;
						}
						if (!foundRef.current.has(site.id) && dist < nearestD) {
							nearest = site;
							nearestD = dist;
						}
						if (passedRef.current.has(site.id)) {
							/* cevaplandı, bir daha kilitleme */
						} else if (QUIZ[site.id] && !foundRef.current.has(site.id) && Math.hypot(site.x + 2.6 - px, site.z + 1.6 - pz) < 2.4) {
							ask = site;
						}
						if (dist < 14 && cardRef.current !== site.id) {
							cardRef.current = site.id;
							setCard(site);
						}
					}
					const closeId = close?.id ?? null;
					if (closeId !== nearIdRef.current) {
						nearIdRef.current = closeId;
						setNearId(closeId);
					}
					if (askRef.current && !foundRef.current.has(askRef.current)) {
						ask = SITES.find((site) => site.id === askRef.current) ?? ask;
						lockRef.current = true;
					} else {
						lockRef.current = false;
					}
					if (ask && askRef.current !== ask.id) {
						askRef.current = ask.id;
						lockRef.current = true;
						setAskId(ask.id);
						setPicks([]);
						setQuizNote("Oyun durdu. Hepsini işaretle, sonra Kontrol et.");
						if (document.pointerLockElement) document.exitPointerLock();
					}
					const baseNow = Math.hypot(px, pz) < 7;
					if (baseNow !== atBaseRef.current) {
						atBaseRef.current = baseNow;
						setAtBase(baseNow);
					}
					worldRef.current = world;
					dwell = nearInsight ? dwell + dt : 0;
					if (dwell >= 3 && !heardRef.current) {
						heardRef.current = true;
						setHeard(true);
					}
					if (guideRef.current) {
						guideRef.current.textContent = askRef.current ? "Soruları bitirmeden ayrılamazsın." : inside ? "Üssün içindesin. R ile çık." : nearest ? `Tabela: ${nearest.name}. Yanına git.` : "Robotların yanındaki tabelalara git.";
					}
					renderer.render(scene, camera);
				} catch {
					return;
				}
			};
			loop();
			frameCamera();
			resize();
			renderer.render(scene, camera);
			const drive = (x, z) => {
				if (lockRef.current) return;
				const forward = -z;
				const strafe = x;
				px += Math.sin(yaw) * forward - Math.cos(yaw) * strafe;
				pz += Math.cos(yaw) * forward + Math.sin(yaw) * strafe;
				if (!inAir && !(inside || world === "moon")) py = marsFloor();
				suit.position.set(px, py, pz);
				suit.rotation.y = yaw;
				sky.position.set(px, 0, pz);
				frameCamera();
				renderer.render(scene, camera);
			};
			driveRef.current = drive;
			tripRef.current = (toMoon) => {
				if (toMoon) {
					if (inside || world !== "mars") return;
					world = "moon";
					marsRoot.visible = false;
					moonRoot.visible = true;
					rocket.position.copy(moonPad);
					px = moonPad.x + 1.5;
					pz = moonPad.z + 1.3;
					py = 0;
				} else if (inside) {
					inside = false;
					room.visible = false;
					px = 0;
					pz = 2.6;
					py = world === "mars" ? groundY(px, pz) : 0;
				} else if (world === "moon") {
					world = "mars";
					moonRoot.visible = false;
					marsRoot.visible = true;
					rocket.position.copy(marsPad);
					px = marsPad.x + 1.5;
					pz = marsPad.z + 1.3;
					py = groundY(px, pz);
				}
				worldRef.current = world;
				suit.visible = true;
				suit.position.set(px, py, pz);
				sky.position.set(px, 0, pz);
				frameCamera();
				renderer.render(scene, camera);
			};
			cleanup = () => {
				cancelAnimationFrame(frame);
				driveRef.current = () => {};
				tripRef.current = () => {};
				ro.disconnect();
				io.disconnect();
				window.removeEventListener("keydown", down, true);
				window.removeEventListener("keyup", up, true);
				window.removeEventListener("blur", clearKeys);
				renderer.domElement.removeEventListener("click", onLockClick);
				window.removeEventListener("mousemove", onLook);
				renderer.domElement.removeEventListener("pointerdown", onTouchDown);
				renderer.domElement.removeEventListener("pointermove", onTouchMove);
				window.removeEventListener("pointerup", onTouchUp);
				renderer.dispose();
				host.replaceChildren();
			};
		} catch {
			host.textContent = "Oyun açılamadı. Çık deyip yeniden gir.";
		}
		return () => cleanup();
	}, [playing]);
	const hold = (key, x, z) => (e) => {
		e.preventDefault();
		e.currentTarget.setPointerCapture?.(e.pointerId);
		keys.current[key] = 1;
		driveRef.current(x, z);
	};
	const release = (key) => () => {
		keys.current[key] = 0;
	};
	function giveQuest() {
		const next = QUEST_ORDER.map((id) => SITES.find((site) => site.id === id)).find((site) => site && !foundRef.current.has(site.id));
		if (!next) {
			questRef.current = null;
			setQuestId(null);
			setQuizNote("Bütün görevler bitti. Mars’ta istediğin kadar yürü.");
			return;
		}
		questRef.current = next.id;
		setQuestId(next.id);
		setPicks([]);
		setQuizNote(`Görev: ${next.name}’i bul. ${next.world === "moon" ? "Ay’a git." : "Mars’ta yürü."}`);
	}
	function learn() {
		if (!card) return;
		if (questRef.current === card.id && QUIZ[card.id]) {
			askRef.current = card.id;
			setAskId(card.id);
			setPicks([]);
			setQuizNote("Soruları işaretle, sonra Kontrol et.");
			return;
		}
		foundRef.current.add(card.id);
		setFound([...foundRef.current]);
		setCard(null);
		giveQuest();
	}
	function takeQuest() {
		const next = QUEST_ORDER.map((id) => SITES.find((site) => site.id === id)).find((site) => site && !found.includes(site.id));
		if (!next) {
			setQuizNote("Üssün bütün görevleri bitti.");
			return;
		}
		questRef.current = next.id;
		setQuestId(next.id);
		setPicks([]);
		setQuizNote(`${next.name}’i bul. ${next.world === "moon" ? "Ay’a git." : "Mars’ta yürü."}`);
	}
	function grade() {
		const id = askId ?? questId;
		if (!id || !QUIZ[id]) return;
		const questions = QUIZ[id];
		if (picks.length < questions.length || questions.some((_, i) => picks[i] === undefined)) {
			setQuizNote("Bütün soruları işaretle.");
			return;
		}
		const ok = questions.every((question, i) => picks[i] === question.answer);
		if (ok) {
			lootCount.current += 1;
			foundRef.current.add(id);
			setFound([...foundRef.current]);
			setQuizNote("Doğru. 1 mücevher eklendi. Oyun açıldı.");
		} else {
			oxideCount.current = Math.max(0, oxideCount.current - 4);
			setQuizNote("Yanlış. 4 demir oksit silindi. Oyun yine de açıldı.");
		}
		setPicks([]);
		if (lootRef.current) lootRef.current.textContent = `Demir oksit: ${oxideCount.current}`;
		if (gemRef.current) gemRef.current.textContent = `Demir oksit ${oxideCount.current}`;
		passedRef.current.add(id);
		lockRef.current = false;
		setAskId(null);
		askRef.current = null;
	}
	const places = found.filter((id) => id !== "tube").length;
	const near = SITES.find((site) => site.id === nearId) ?? null;
	const quests = [
		{
			name: "Üç robotu bul",
			done: places >= 3,
			note: `${Math.min(places, 3)}/3`
		},
		{
			name: "Buzu gör",
			done: found.includes("phoenix"),
			note: "Phoenix"
		},
		{
			name: "Tüpü al",
			done: found.includes("tube"),
			note: "Perseverance yanı"
		},
		{
			name: "Depremi dinle",
			done: heard,
			note: "InSight’ta 3 sn dur"
		}
	];
	if (!playing) {
		return /* @__PURE__ */ _jsxDEV("section", {
			className: "mt-10 rounded-2xl border border-line bg-surface p-5 text-center",
			children: [
				/* @__PURE__ */ _jsxDEV("h2", {
					className: "font-display text-3xl",
					children: "Mars’ta yürü"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1191,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("p", {
					className: "mx-auto mt-2 max-w-md text-base text-muted",
					children: "Astronot ol. Sınır yok. Robotların kaldığı yerlere yürü, dört görevi bitir."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1192,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => setPlaying(true),
					className: "mt-4 rounded-2xl bg-accent px-8 py-4 text-xl font-medium text-black",
					children: "Oyuna gir"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1195,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1190,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ _jsxDEV("section", {
		ref: panelRef,
		tabIndex: 0,
		className: "mt-10 rounded-2xl border border-line bg-surface p-4 outline-none",
		onPointerDown: () => {
			activeRef.current = true;
			panelRef.current?.focus();
		},
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ _jsxDEV("h2", {
					className: "font-display text-2xl",
					children: "Mars’ta yürü"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1213,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => {
							if (big) {
								setBig(false);
								if (document.fullscreenElement) void document.exitFullscreen();
							} else {
								setBig(true);
								void document.documentElement.requestFullscreen?.();
							}
						},
						className: "rounded-full bg-accent px-4 py-2 text-black",
						children: big ? "Küçült" : "Ekranı kapla"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1215,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => setPlaying(false),
						className: "rounded-full border border-line px-4 py-2",
						children: "Çık"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1218,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1214,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1212,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("ul", {
				className: "mt-3 grid gap-2 sm:grid-cols-2",
				children: quests.map((quest) => /* @__PURE__ */ _jsxDEV("li", {
					className: "rounded-xl border border-line px-3 py-2 text-base",
					children: [
						/* @__PURE__ */ _jsxDEV("span", {
							className: quest.done ? "text-ok" : "text-accent",
							children: quest.done ? "Bitti" : "Görev"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1226,
							columnNumber: 13
						}, this),
						" · ",
						quest.name,
						/* @__PURE__ */ _jsxDEV("span", {
							className: "block text-sm text-muted",
							children: quest.note
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1229,
							columnNumber: 13
						}, this)
					]
				}, quest.name, true, {
					fileName: _jsxFileName,
					lineNumber: 1225,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1223,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				ref: solRef,
				className: "mt-2 text-base text-muted",
				children: "Oksijen bitmez. Tüp dolu kalır."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1233,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "mt-2 h-3 overflow-hidden rounded-full bg-bg",
				children: /* @__PURE__ */ _jsxDEV("div", {
					ref: o2BarRef,
					className: "h-full w-full bg-ok"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1237,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1236,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				ref: lootRef,
				className: "mt-1 font-medium",
				children: "Demir oksit: 0"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1239,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				className: "text-sm text-muted",
				children: "Oyuna bir kez tıkla. Fare Minecraft gibi bakar. W ileri, S geri, A sol, D sağ. Shift hızlı. Boşluk zıpla. Esc fareyi bırakır."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1242,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("p", {
				ref: guideRef,
				className: "mt-2 font-medium text-accent",
				children: "Sıradaki: Viking 1"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1243,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: big ? "fixed inset-0 z-[80] h-screen w-screen overflow-hidden bg-black" : "relative mt-3 h-[58dvh] min-h-72 overflow-hidden rounded-xl bg-black touch-none md:h-[70vh]",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						ref: hostRef,
						className: "h-full w-full"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1247,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						ref: wastedRef,
						className: "pointer-events-none absolute inset-0 z-30 hidden items-center justify-center bg-black/55",
						children: /* @__PURE__ */ _jsxDEV("p", {
							className: "font-serif text-5xl tracking-[0.45em] text-white md:text-7xl",
							children: "WASTED"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1248,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1248,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						ref: gemRef,
						className: "pointer-events-none absolute right-2 top-2 z-20 rounded-full bg-black/75 px-3 py-1 text-lg font-medium text-amber-300",
						children: "Demir oksit 0"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1248,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "pointer-events-none absolute inset-x-2 top-2 rounded-xl bg-black/70 p-2 text-xs text-white",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mb-1 h-2 overflow-hidden rounded-full bg-white/20",
								children: /* @__PURE__ */ _jsxDEV("div", {
									ref: canBarRef,
									className: "h-full w-full bg-red-500"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1247,
									columnNumber: 11
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1247,
								columnNumber: 9
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "h-2 overflow-hidden rounded-full bg-white/20",
								children: /* @__PURE__ */ _jsxDEV("div", {
									ref: o2BarRef,
									className: "h-full w-full bg-ok"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1248,
									columnNumber: 11
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1248,
								columnNumber: 9
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								ref: vitalRef,
								className: "mt-1",
								children: "Can 100 · O2 100 · CO2 4 · Basınç 100 · Su 100 · Güç 100 · 22°C · Nabız 72"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1249,
								columnNumber: 9
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "mt-1 text-accent",
								children: questId ? `Görev: ${SITES.find((site) => site.id === questId)?.name}` : "Üsse git, görev al"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1250,
								columnNumber: 9
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1248,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						"aria-label": big ? "Küçült" : "Büyüt",
						onClick: () => {
							if (big) {
								setBig(false);
								if (document.fullscreenElement) void document.exitFullscreen();
							} else {
								setBig(true);
								void document.documentElement.requestFullscreen?.();
							}
						},
						className: "absolute right-2 top-16 z-20 flex h-12 w-12 items-center justify-center rounded-md bg-black/75 text-2xl text-white",
						children: big ? "🗗" : "⛶"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1251,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1246,
				columnNumber: 7
			}, this),
			atBase ? /* @__PURE__ */ _jsxDEV("p", {
				className: "mt-3 text-left text-muted",
				children: "Görev, robotun yanındaki tabeladadır. Cevaplamadan ayrılamazsın."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1250,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ _jsxDEV("div", {
				className: "relative z-10 mx-auto mt-3 grid w-[min(96vw,24rem)] grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ _jsxDEV("span", {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1265,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none rounded-2xl bg-accent py-4 text-xl font-medium text-black",
						onPointerDown: hold("f", 0, -.8),
						onPointerUp: release("f"),
						onPointerLeave: release("f"),
						onPointerCancel: release("f"),
						children: "İleri"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1266,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("span", {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1269,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none rounded-2xl border border-white/40 bg-black/70 py-4 text-xl text-white",
						onPointerDown: hold("l", -.8, 0),
						onPointerUp: release("l"),
						onPointerLeave: release("l"),
						onPointerCancel: release("l"),
						children: "Sol"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1270,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none rounded-2xl border border-white/40 bg-black/70 py-4 text-xl text-white",
						onPointerDown: hold("b", 0, .8),
						onPointerUp: release("b"),
						onPointerLeave: release("b"),
						onPointerCancel: release("b"),
						children: "Geri"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1273,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none rounded-2xl border border-white/40 bg-black/70 py-4 text-xl text-white",
						onPointerDown: hold("r", .8, 0),
						onPointerUp: release("r"),
						onPointerLeave: release("r"),
						onPointerCancel: release("r"),
						children: "Sağ"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1276,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none col-span-3 rounded-2xl border border-white/40 bg-black/70 py-3 text-xl text-white",
						onPointerDown: () => {
							jumpRef.current = true;
						},
						children: "Zıpla"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1279,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						className: "touch-none col-span-3 rounded-2xl border border-white/40 bg-black/70 py-3 text-lg text-white",
						onPointerDown: () => {
							wantRef.current = "mars";
						},
						children: "R · Geri"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1285,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1264,
				columnNumber: 7
			}, this),
			near ? /* @__PURE__ */ _jsxDEV("div", {
				className: "mt-3 flex items-center gap-3 rounded-2xl border border-line bg-bg p-3",
				children: [/* @__PURE__ */ _jsxDEV(CraftThumb, { kind: near.kind }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1291,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("p", {
					className: "font-display text-xl",
					children: near.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1293,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: found.includes(near.id) ? "text-ok" : "text-accent",
					children: found.includes(near.id) ? "Öğrenildi" : "Henüz öğrenilmedi"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1294,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1292,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1290,
				columnNumber: 9
			}, this) : null,
			/* @__PURE__ */ _jsxDEV("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: SITES.map((site) => /* @__PURE__ */ _jsxDEV("span", {
					className: found.includes(site.id) ? "rounded-full bg-ok px-3 py-1 text-sm text-black" : "rounded-full border border-line px-3 py-1 text-sm text-muted",
					children: [found.includes(site.id) ? "✓ " : "", site.name]
				}, site.id, true, {
					fileName: _jsxFileName,
					lineNumber: 1302,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1300,
				columnNumber: 7
			}, this),
			askId && QUIZ[askId] ? /* @__PURE__ */ _jsxDEV("div", {
				className: "relative z-10 mt-3 max-h-[46vh] overflow-y-auto rounded-2xl border border-accent bg-black/90 p-4 text-left text-white",
				children: [
					/* @__PURE__ */ _jsxDEV("h3", {
						className: "font-display text-2xl",
						children: `${SITES.find((site) => site.id === askId)?.name} soruları`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1310,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("p", {
						className: "mt-1 text-sm text-muted",
						children: "Doğruysa 1 mücevher eklenir. Yanlışsa 4 demir oksit silinir."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1311,
						columnNumber: 11
					}, this),
					...QUIZ[askId].map((question, qi) => /* @__PURE__ */ _jsxDEV("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ _jsxDEV("p", {
								className: "font-medium",
								children: question.ask
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1312,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: question.choices.map((choice, ci) => /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => setPicks((prev) => {
										const next = [...prev];
										next[qi] = ci;
										return next;
									}),
									className: picks[qi] === ci ? "rounded-full bg-accent px-3 py-2 text-black" : "rounded-full border border-line px-3 py-2",
									children: choice
								}, ci, false, {
									fileName: _jsxFileName,
									lineNumber: 1313,
									columnNumber: 15
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1313,
								columnNumber: 13
							}, this)
						]
					}, qi, true, {
						fileName: _jsxFileName,
						lineNumber: 1312,
						columnNumber: 11
					}, this)),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: grade,
						className: "mt-3 rounded-2xl bg-accent px-5 py-3 text-lg font-medium text-black",
						children: "Kontrol et"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1314,
						columnNumber: 11
					}, this),
					quizNote ? /* @__PURE__ */ _jsxDEV("p", {
						className: "mt-2 text-accent",
						children: quizNote
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1315,
						columnNumber: 11
					}, this) : null
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1310,
				columnNumber: 7
			}, this) : null,
			card ? /* @__PURE__ */ _jsxDEV("div", {
				className: "mt-3 rounded-2xl border border-accent bg-bg p-4",
				children: [
					/* @__PURE__ */ _jsxDEV("h3", {
						className: "font-display text-2xl",
						children: card.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1317,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "mt-2 flex items-start gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("p", {
								className: "flex-1 text-lg",
								children: card.fact
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1318,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(SpeakButton, { text: `${card.name}. ${card.fact}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1318,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1318,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV(CraftThumb, { kind: card.kind }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1320,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-accent",
							children: "Öğrenince yeşil olur."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1321,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1319,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: learn,
						className: "mt-3 rounded-2xl bg-accent px-5 py-3 text-lg font-medium text-black",
						children: "Öğrendim"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1323,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1316,
				columnNumber: 9
			}, this) : null
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1203,
		columnNumber: 5
	}, this);
}
