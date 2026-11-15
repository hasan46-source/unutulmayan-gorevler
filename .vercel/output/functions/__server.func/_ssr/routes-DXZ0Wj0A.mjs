import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as bodyLabel, n as MARKERS, o as localAnswer, r as MISSIONS, t as KIND_LABEL } from "./archive-CGhdDMCc.mjs";
import { r as Send, t as X } from "../_libs/lucide-react.mjs";
import { _ as SphereGeometry, a as CircleGeometry, b as Vector3, c as DirectionalLight, d as MeshLambertMaterial, f as Object3D, g as Scene, h as SRGBColorSpace, i as CanvasTexture, l as Mesh, m as Raycaster, n as AmbientLight, o as ConeGeometry, p as PerspectiveCamera, r as BoxGeometry, s as CylinderGeometry, t as WebGLRenderer, u as MeshBasicMaterial, v as TorusGeometry, y as Vector2 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DXZ0Wj0A.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askArchive = createServerFn({ method: "POST" }).validator((input) => {
	const raw = typeof input === "object" && input && "question" in input ? input.question : "";
	return { question: typeof raw === "string" ? raw.trim().slice(0, 400) : "" };
}).handler(createSsrRpc("003cf64b65b8a2b8162217da3d81b443e76487bafe017ee3ae5f7b33e198f663"));
var SUGGESTIONS = [
	"Apollo 20 neden iptal edildi?",
	"Phoenix nasıl yeniden doğdu?",
	"VIPER ne işe yarayacaktı?",
	"Apollo 15 nereye indi?"
];
function ArchiveChat() {
	const [question, setQuestion] = (0, import_react.useState)("");
	const [turns, setTurns] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function ask(raw) {
		const q = raw.trim();
		if (!q || busy) return;
		setQuestion("");
		setBusy(true);
		setTurns((prev) => [...prev, {
			role: "user",
			text: q
		}]);
		try {
			const res = await askArchive({ data: { question: q } });
			const text = res.ok ? res.text : localAnswer(q);
			setTurns((prev) => [...prev, {
				role: "assistant",
				text
			}]);
		} catch {
			setTurns((prev) => [...prev, {
				role: "assistant",
				text: localAnswer(q)
			}]);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto w-full max-w-2xl rounded-2xl border border-line bg-surface p-4 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-fg",
				children: "Siteye sor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Grok yalnızca bu sitedeki görevlere ve haritadaki yerlere göre cevap verir."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex max-h-64 flex-col gap-2 overflow-y-auto",
				children: [turns.map((turn, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: turn.role === "user" ? "ml-auto max-w-[90%] rounded-xl bg-accent px-3 py-2 text-sm text-bg" : "mr-auto max-w-[90%] rounded-xl border border-line bg-bg px-3 py-2 text-sm text-fg",
					children: turn.text
				}, i)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Bakıyorum…"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					ask(question);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: question,
					onChange: (e) => setQuestion(e.target.value),
					maxLength: 400,
					placeholder: "Örn. Apollo 20 neden iptal edildi?",
					className: "min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-3 text-base text-fg outline-none placeholder:text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "submit",
					disabled: busy,
					className: "inline-flex items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-bg disabled:opacity-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
						size: 16,
						"aria-hidden": true
					}), "Sor"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void ask(s),
					className: "rounded-full border border-line px-3 py-2 text-sm text-fg",
					children: s
				}, s))
			})
		]
	});
}
var COLORS = {
	c: 8238335,
	l: 14711365,
	p: 6021258
};
function latLonToVec(lat, lon, radius) {
	const f = (lon + 180) * Math.PI / 180;
	const t = (90 - lat) * Math.PI / 180;
	return new Vector3(-radius * Math.cos(f) * Math.sin(t), radius * Math.cos(t), radius * Math.sin(f) * Math.sin(t));
}
function makeTexture(body) {
	const w = 1024;
	const h = 512;
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const g = canvas.getContext("2d");
	if (!g) return new CanvasTexture(canvas);
	const moon = body === "moon";
	const base = moon ? "#8d8d90" : "#a8582f";
	const dk = moon ? "40,40,46" : "70,30,20";
	const lt = moon ? "220,220,225" : "230,170,130";
	let seed = moon ? 7 : 3;
	const rnd = () => {
		seed = seed * 16807 % 2147483647;
		return seed / 2147483647;
	};
	g.fillStyle = base;
	g.fillRect(0, 0, w, h);
	const blob = (x, y, rad, col, a) => {
		const gr = g.createRadialGradient(x, y, 0, x, y, rad);
		gr.addColorStop(0, `rgba(${col},${a})`);
		gr.addColorStop(1, `rgba(${col},0)`);
		g.fillStyle = gr;
		g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
	};
	for (let i = 0; i < 220; i++) blob(rnd() * w, rnd() * h, 18 + rnd() * 70, rnd() < .5 ? dk : lt, .05 + rnd() * .08);
	const crater = (x, y, rad) => {
		const gr = g.createRadialGradient(x - rad * .25, y - rad * .25, rad * .1, x, y, rad);
		gr.addColorStop(0, `rgba(${dk},.45)`);
		gr.addColorStop(.82, `rgba(${dk},.25)`);
		gr.addColorStop(.93, `rgba(${lt},.65)`);
		gr.addColorStop(1, `rgba(${lt},0)`);
		g.fillStyle = gr;
		g.beginPath();
		g.arc(x, y, rad, 0, Math.PI * 2);
		g.fill();
	};
	for (let i = 0; i < (moon ? 700 : 420); i++) crater(rnd() * w, rnd() * h, 2 + rnd() ** 3 * 18);
	if (!moon) {
		g.fillStyle = "rgba(240,240,248,.8)";
		g.fillRect(0, 0, w, 12);
		g.fillRect(0, 500, w, 12);
	}
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	return tex;
}
function GlobeView({ body, focusId, onPick }) {
	const hostRef = (0, import_react.useRef)(null);
	const onPickRef = (0, import_react.useRef)(onPick);
	onPickRef.current = onPick;
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		host.appendChild(renderer.domElement);
		renderer.domElement.className = "block h-full w-full cursor-grab touch-none";
		const scene = new Scene();
		const camera = new PerspectiveCamera(40, 1, .1, 20);
		camera.position.z = 3.15;
		scene.add(new AmbientLight(16777215, .55));
		const sun = new DirectionalLight(16777215, 1.05);
		sun.position.set(-3, 2, 4);
		scene.add(sun);
		const pivot = new Object3D();
		const group = new Object3D();
		pivot.add(group);
		scene.add(pivot);
		const texture = makeTexture(body);
		const sphere = new Mesh(new SphereGeometry(1, 64, 48), new MeshLambertMaterial({ map: texture }));
		group.add(sphere);
		const markers = MARKERS.filter((m) => m.body === body);
		const dots = [];
		for (const marker of markers) {
			const dot = new Mesh(new SphereGeometry(.028, 12, 10), new MeshBasicMaterial({ color: COLORS[marker.kind] }));
			dot.position.copy(latLonToVec(marker.lat, marker.lon, 1.02));
			dot.userData.marker = marker;
			group.add(dot);
			dots.push(dot);
		}
		group.rotation.y = -Math.PI / 2;
		pivot.rotation.x = .25;
		let dragging = false;
		let moved = 0;
		let sx = 0;
		let sy = 0;
		let auto = true;
		let yawTarget = group.rotation.y;
		let pitchTarget = pivot.rotation.x;
		let focusing = false;
		let frame = 0;
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
		const canvas = renderer.domElement;
		const down = (e) => {
			dragging = true;
			auto = false;
			focusing = false;
			moved = 0;
			sx = e.clientX;
			sy = e.clientY;
			canvas.setPointerCapture(e.pointerId);
		};
		const move = (e) => {
			if (!dragging) return;
			const dx = e.clientX - sx;
			const dy = e.clientY - sy;
			sx = e.clientX;
			sy = e.clientY;
			moved += Math.abs(dx) + Math.abs(dy);
			group.rotation.y += dx * .007;
			pivot.rotation.x = Math.max(-1.2, Math.min(1.2, pivot.rotation.x + dy * .007));
		};
		const up = (e) => {
			dragging = false;
			if (moved > 6) return;
			const rect = canvas.getBoundingClientRect();
			const ndc = new Vector2((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
			const ray = new Raycaster();
			ray.setFromCamera(ndc, camera);
			const marker = ray.intersectObjects(dots)[0]?.object.userData.marker;
			if (marker) onPickRef.current(marker);
		};
		canvas.addEventListener("pointerdown", down);
		canvas.addEventListener("pointermove", move);
		canvas.addEventListener("pointerup", up);
		canvas.addEventListener("pointercancel", () => {
			dragging = false;
		});
		const api = { focus(id) {
			const marker = markers.find((m) => m.id === id);
			if (!marker) return;
			const target = Math.PI / 2 - (marker.lon + 180) * Math.PI / 180;
			yawTarget = target + 2 * Math.PI * Math.round((group.rotation.y - target) / (2 * Math.PI));
			pitchTarget = Math.max(-1, Math.min(1, marker.lat * Math.PI / 180 * .7));
			auto = false;
			focusing = true;
		} };
		host.dataset.ready = "1";
		host.__focus = api.focus;
		const loop = () => {
			frame = requestAnimationFrame(loop);
			if (focusing) {
				group.rotation.y += (yawTarget - group.rotation.y) * .1;
				pivot.rotation.x += (pitchTarget - pivot.rotation.x) * .1;
				if (Math.abs(yawTarget - group.rotation.y) < .004 && Math.abs(pitchTarget - pivot.rotation.x) < .004) focusing = false;
			} else if (auto) group.rotation.y += .0016;
			renderer.render(scene, camera);
		};
		loop();
		return () => {
			cancelAnimationFrame(frame);
			ro.disconnect();
			canvas.removeEventListener("pointerdown", down);
			canvas.removeEventListener("pointermove", move);
			canvas.removeEventListener("pointerup", up);
			texture.dispose();
			sphere.geometry.dispose();
			sphere.material.dispose();
			for (const dot of dots) {
				dot.geometry.dispose();
				dot.material.dispose();
			}
			renderer.dispose();
			canvas.remove();
		};
	}, [body]);
	(0, import_react.useEffect)(() => {
		if (!focusId || !hostRef.current) return;
		hostRef.current.__focus?.(focusId);
	}, [focusId, body]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hostRef,
		className: "h-full w-full"
	});
}
function addBox(scene, w, h, d, color, x, y, z) {
	const mesh = new Mesh(new BoxGeometry(w, h, d), new MeshLambertMaterial({ color }));
	mesh.position.set(x, y, z);
	scene.add(mesh);
	return mesh;
}
function SiteDiorama({ marker }) {
	const hostRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		const renderer = new WebGLRenderer({ antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
		renderer.setClearColor(marker.body === "moon" ? 461072 : 1312772);
		host.appendChild(renderer.domElement);
		const scene = new Scene();
		const camera = new PerspectiveCamera(42, 1, .1, 80);
		scene.add(new AmbientLight(16777215, .45));
		const sun = new DirectionalLight(16774368, 1.15);
		sun.position.set(6, 10, 4);
		scene.add(sun);
		const groundColor = marker.body === "moon" ? 7237236 : 9061936;
		const ground = new Mesh(new CircleGeometry(7, 48), new MeshLambertMaterial({ color: groundColor }));
		ground.rotation.x = -Math.PI / 2;
		scene.add(ground);
		const apollo15 = marker.id === "a15";
		if (apollo15) {
			addBox(scene, .7, .42, .7, 14145500, 0, .55, 0);
			addBox(scene, .9, .16, .9, 12886362, 0, .28, 0);
			for (const [x, z] of [
				[.38, .38],
				[-.38, .38],
				[.38, -.38],
				[-.38, -.38]
			]) {
				const leg = new Mesh(new CylinderGeometry(.035, .05, .46, 8), new MeshLambertMaterial({ color: 10132130 }));
				leg.position.set(x, .23, z);
				scene.add(leg);
				const pad = new Mesh(new CylinderGeometry(.12, .12, .03, 10), new MeshLambertMaterial({ color: 7829374 }));
				pad.position.set(x, .02, z);
				scene.add(pad);
			}
			addBox(scene, .55, .18, .85, 15263982, 1.45, .16, .35);
			for (const [x, z] of [
				[1.22, .05],
				[1.68, .05],
				[1.22, .65],
				[1.68, .65]
			]) {
				const wheel = new Mesh(new CylinderGeometry(.1, .1, .08, 12), new MeshLambertMaterial({ color: 2236968 }));
				wheel.rotation.z = Math.PI / 2;
				wheel.position.set(x, .1, z);
				scene.add(wheel);
			}
			const rille = new Mesh(new BoxGeometry(.45, .18, 4.2), new MeshLambertMaterial({ color: 3816002 }));
			rille.position.set(-1.7, .02, .2);
			scene.add(rille);
		} else if (marker.kind === "c") {
			const ring = new Mesh(new TorusGeometry(1.3, .18, 12, 40), new MeshLambertMaterial({ color: marker.body === "moon" ? 5592412 : 6959908 }));
			ring.rotation.x = -Math.PI / 2;
			ring.position.y = .05;
			scene.add(ring);
			const bowl = new Mesh(new SphereGeometry(.7, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), new MeshLambertMaterial({
				color: marker.body === "moon" ? 4868688 : 6040604,
				side: 1
			}));
			bowl.rotation.x = Math.PI;
			bowl.position.y = .02;
			scene.add(bowl);
		} else {
			addBox(scene, .55, .7, .55, 13684950, 0, .45, 0);
			addBox(scene, .85, .12, .85, 12096590, 0, .08, 0);
			if (marker.kind === "l") addBox(scene, .7, .16, 1.05, 15000810, 1.3, .14, .2);
			else {
				const beacon = new Mesh(new ConeGeometry(.18, .55, 8), new MeshLambertMaterial({ color: 6021258 }));
				beacon.position.set(1.1, .28, 0);
				scene.add(beacon);
			}
		}
		let frame = 0;
		let drag = false;
		let yaw = .6;
		let pitch = .55;
		let px = 0;
		let py = 0;
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
		const canvas = renderer.domElement;
		canvas.className = "block h-full w-full cursor-grab touch-none";
		canvas.addEventListener("pointerdown", (e) => {
			drag = true;
			px = e.clientX;
			py = e.clientY;
		});
		canvas.addEventListener("pointermove", (e) => {
			if (!drag) return;
			yaw += (e.clientX - px) * .008;
			pitch = Math.max(.25, Math.min(1.15, pitch + (e.clientY - py) * .006));
			px = e.clientX;
			py = e.clientY;
		});
		const end = () => {
			drag = false;
		};
		canvas.addEventListener("pointerup", end);
		canvas.addEventListener("pointerleave", end);
		const loop = () => {
			frame = requestAnimationFrame(loop);
			if (!drag) yaw += .003;
			const r = apollo15 ? 5.2 : 4.4;
			camera.position.set(Math.sin(yaw) * r, 1.1 + pitch * 1.6, Math.cos(yaw) * r);
			camera.lookAt(0, .25, 0);
			renderer.render(scene, camera);
		};
		loop();
		return () => {
			cancelAnimationFrame(frame);
			ro.disconnect();
			scene.traverse((obj) => {
				const mesh = obj;
				if (mesh.geometry) mesh.geometry.dispose();
				const mat = mesh.material;
				if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
				else if (mat) mat.dispose();
			});
			renderer.dispose();
			canvas.remove();
		};
	}, [marker]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: hostRef,
		className: "h-72 w-full overflow-hidden rounded-xl bg-bg md:h-80"
	});
}
var FILTERS = [
	{
		id: "all",
		label: "Hepsi"
	},
	{
		id: "moon",
		label: "Ay"
	},
	{
		id: "mars",
		label: "Mars"
	},
	{
		id: "earth",
		label: "Dünya"
	}
];
function matches(body, filter) {
	if (filter === "all") return true;
	if (body === "both") return filter === "moon" || filter === "mars";
	return body === filter;
}
function Home() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [mission, setMission] = (0, import_react.useState)(null);
	const [marker, setMarker] = (0, import_react.useState)(null);
	const [focusId, setFocusId] = (0, import_react.useState)(null);
	const missions = (0, import_react.useMemo)(() => MISSIONS.filter((item) => matches(item.body, filter)), [filter]);
	const markers = (0, import_react.useMemo)(() => filter === "moon" || filter === "mars" ? MARKERS.filter((m) => m.body === filter) : [], [filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto max-w-3xl px-5 pb-6 pt-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.22em] text-ice uppercase",
						children: "Uzay arşivinden"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 font-display text-5xl leading-none text-fg md:text-6xl",
						children: ["Unutulmayan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "Görevler"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl text-muted",
						children: "NASA’nın Ay ve Mars için hazırladığı ama yarım kalan planlar. Bir de Dünya’da radarı susmuş, radyometresi hâlâ uçan SMAP."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveChat, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-5 pb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex flex-wrap justify-center gap-2",
						role: "group",
						"aria-label": "Filtre",
						children: FILTERS.map((item) => {
							const on = filter === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								onClick: () => {
									setFilter(item.id);
									setFocusId(null);
								},
								className: on ? "rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg" : "rounded-full border border-line bg-surface px-4 py-2 text-sm text-fg",
								children: item.label
							}, item.id);
						})
					}),
					filter === "moon" || filter === "mars" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-8 rounded-2xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: filter === "moon" ? "Ay haritası" : "Mars haritası"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: "Sürükleyerek döndür. Turuncu iniş, mavi yüzey şekli, yeşil planlanan yer. Noktaya basınca 3D sahne açılır."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-80 overflow-hidden rounded-xl bg-bg md:h-96",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobeView, {
									body: filter,
									focusId,
									onPick: (picked) => {
										setMarker(picked);
										setFocusId(picked.id);
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: markers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setFocusId(item.id);
										setMarker(item);
									},
									className: "inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.kind === "c" ? "h-2 w-2 rounded-full bg-ice" : item.kind === "p" ? "h-2 w-2 rounded-full bg-ok" : "h-2 w-2 rounded-full bg-accent" }), item.name]
								}, item.id))
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative ml-2 border-l border-line pl-6",
						children: missions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "relative mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: item.body === "mars" ? "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-ice" : item.body === "earth" ? "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-ok" : "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMission(item),
								className: "w-full rounded-2xl border border-line bg-surface p-5 text-left transition-colors hover:border-accent",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 text-sm text-muted",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-display text-base text-accent",
												children: item.year
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border border-line px-2 py-0.5",
												children: bodyLabel(item.body)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border border-ice px-2 py-0.5 text-ice",
												children: item.status
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-fg",
										children: item.summary
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 border-t border-dashed border-line pt-3 text-sm text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-fg",
											children: "Bugün: "
										}), item.legacy]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-accent",
										children: "Ayrıntıları oku"
									})
								]
							})]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-10 max-w-lg text-center font-display text-xl text-fg",
						children: "“Bir görevin iptal edilmesi, fikrin ölmesi demek değildir.”"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-line px-5 py-8 text-center text-sm text-muted",
				children: [
					"Bilgilendirme sayfasıdır, NASA’nın resmî sitesi değildir. SMAP özeti",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "text-ice underline",
						href: "https://www.earthdata.nasa.gov/data/platforms/space-based-platforms/smap",
						children: "NASA Earthdata"
					}),
					" ",
					"platform sayfasına dayanır."
				]
			}),
			mission ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 overflow-y-auto bg-bg/80 px-4 py-8",
				onClick: () => setMission(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "mission-title",
					className: "mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-6",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Kapat",
							onClick: () => setMission(null),
							className: "float-right rounded-full border border-line p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								mission.year,
								" · ",
								bodyLabel(mission.body),
								" · ",
								mission.status
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "mission-title",
							className: "mt-2 font-display text-3xl",
							children: mission.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3 text-fg",
							children: mission.long.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: paragraph }, paragraph.slice(0, 24)))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 border-t border-dashed border-line pt-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "Bugün: "
							}), mission.legacy]
						})
					]
				})
			}) : null,
			marker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 overflow-y-auto bg-bg/80 px-4 py-8",
				onClick: () => setMarker(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "site-title",
					className: "mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-5",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Kapat",
							onClick: () => setMarker(null),
							className: "float-right rounded-full border border-line p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-ice",
							children: KIND_LABEL[marker.kind]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "site-title",
							className: "mt-1 font-display text-3xl",
							children: marker.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteDiorama, { marker })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-fg",
							children: marker.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Sahneyi sürükleyerek döndürebilirsin."
						})
					]
				})
			}) : null
		]
	});
}
//#endregion
export { Home as component };
