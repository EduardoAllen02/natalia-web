// Natalia · figura 3D del hero y selector de industria.
// La esfera toma su color de --theme-accent-rgb / --theme-soft-rgb / --theme-ink-rgb,
// las mismas variables que el carrusel de llamadas reescribe al cambiar de industria.
import * as THREE from "../vendor/three.module.js";

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mismos tonos que CALLS en call-carousel.js (accent, soft, ink).
const NICHES = [
  { accent: [211, 123, 39], soft: [255, 241, 226], ink: [150, 80, 24], done: "Pedido enviado a cocina", line: "Lobos Pizza y Snacks, buenas tardes. ¿En qué le puedo ayudar?", from: "Restaurante" },
  { accent: [57, 121, 201], soft: [234, 242, 252], ink: [36, 89, 150], done: "Cita registrada y confirmada", line: "Clínica Horizonte, buenas tardes. ¿Con quién tengo el gusto?", from: "Clínica" },
  { accent: [47, 152, 114], soft: [231, 246, 239], ink: [33, 108, 82], done: "Caso creado y asignado a soporte", line: "Nova Atención, buenas tardes. ¿En qué le ayudo?", from: "Call center" },
  { accent: [7, 157, 162], soft: [226, 247, 247], ink: [10, 85, 88], done: "Diagnóstico programado", line: "Taller Motor Norte, buenas tardes. ¿En qué le podemos ayudar?", from: "Taller" },
];

const readVar = (name) => getComputedStyle(root).getPropertyValue(name).split(",").map((v) => parseFloat(v) || 0);

// ── Selector de industria del hero ──────────────────────────────────────────
const buttons = [...document.querySelectorAll(".nx-niches button")];
const doneLabel = document.querySelector("[data-nx-done]");
const lineLabel = document.querySelector("[data-nx-line]");
const fromLabel = document.querySelector("[data-nx-from]");
let tween = null;

function paint(index) {
  buttons.forEach((b, i) => b.setAttribute("aria-pressed", String(i === index)));
  const n = NICHES[index];
  if (doneLabel) doneLabel.textContent = n.done;
  if (lineLabel) lineLabel.textContent = n.line;
  if (fromLabel) fromLabel.textContent = n.from;
}

function tweenTheme(index) {
  const to = NICHES[index];
  const from = { accent: readVar("--theme-accent-rgb"), soft: readVar("--theme-soft-rgb"), ink: readVar("--theme-ink-rgb") };
  const start = performance.now();
  cancelAnimationFrame(tween);
  const step = (now) => {
    const p = reduced ? 1 : Math.min(1, (now - start) / 520);
    const e = p * p * (3 - 2 * p);
    for (const key of ["accent", "soft", "ink"]) {
      const mixed = from[key].map((c, i) => Math.round(c + (to[key][i] - c) * e));
      root.style.setProperty(`--theme-${key}-rgb`, mixed.join(", "));
    }
    if (p < 1) tween = requestAnimationFrame(step);
  };
  tween = requestAnimationFrame(step);
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    paint(index);
    tweenTheme(index);
    // Deja el carrusel de llamadas en la misma industria.
    const tab = document.getElementById(`call-tab-${index}`);
    if (tab && tab.getAttribute("aria-selected") !== "true") tab.click();
  });
});

// Si el visitante cambia de industria en el carrusel, el hero lo refleja.
const tabs = [...document.querySelectorAll("#call-switcher [role=tab]")];
if (tabs.length) {
  new MutationObserver(() => {
    const index = tabs.findIndex((t) => t.getAttribute("aria-selected") === "true");
    if (index >= 0) paint(index);
  }).observe(document.getElementById("call-switcher"), { attributes: true, subtree: true, attributeFilter: ["aria-selected"] });
}

// ── Figura 3D ───────────────────────────────────────────────────────────────
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = /* glsl */ `
uniform float uTime; uniform float uWobble;
varying vec3 vN; varying vec3 vV;
${NOISE}
void main(){
  float d = snoise(normal*1.2 + uTime*.18) * uWobble;
  vec4 mv = modelViewMatrix * vec4(position + normal*d, 1.);
  vN = normalize(normalMatrix * normalize(normal + d*.6*vec3(snoise(normal*2.+uTime*.1))));
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uAlpha;
varying vec3 vN; varying vec3 vV;
float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
void main(){
  vec3 n = normalize(vN);
  vec3 l = normalize(vec3(-.55,.75,.6));
  float g = dot(n,l)*.5+.5;
  float f = pow(1.-max(dot(n,vV),0.),2.4);
  vec3 col = mix(uC, uB, smoothstep(0.,.55,g));
  col = mix(col, uA, smoothstep(.45,1.,g));
  col = mix(col, vec3(1.), smoothstep(.82,1.,g)*.6);
  float spec = pow(max(dot(reflect(-l,n),vV),0.),38.);
  col += spec*.35 + f*vec3(1.)*.4;
  col += (hash(gl_FragCoord.xy)-.5)*.045;
  gl_FragColor = vec4(col, uAlpha);
}`;

function material(wobble, alpha = 1) {
  return new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: alpha < 1,
    uniforms: {
      uTime: { value: 0 }, uWobble: { value: wobble }, uAlpha: { value: alpha },
      uA: { value: new THREE.Color("#fff") }, uB: { value: new THREE.Color("#888") }, uC: { value: new THREE.Color("#333") },
    },
  });
}

function mount(stage) {
  const canvas = stage.querySelector("canvas");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return;
  }
  stage.classList.add("webgl");
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.z = 8;
  const group = new THREE.Group();
  scene.add(group);

  const body = material(0.1);
  const pale = material(0.03);
  const deep = material(0.03);
  const wire = material(0, 0.92);
  const main = new THREE.Mesh(new THREE.SphereGeometry(1.5, 128, 128), body);
  // Tres anillos concéntricos: la voz que sale de la esfera.
  const rings = [2.15, 2.6, 3.05].map((r, i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.04 - i * 0.008, 20, 220), wire);
    ring.rotation.set(1.22, 0.22, 0);
    return ring;
  });
  const moonA = new THREE.Mesh(new THREE.SphereGeometry(0.32, 48, 48), deep);
  const moonB = new THREE.Mesh(new THREE.SphereGeometry(0.19, 48, 48), pale);
  group.add(main, ...rings, moonA, moonB);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", (e) => {
    pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
  });

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    group.scale.setScalar(Math.min(1, (w / h) * 1.02));
    group.position.set(0.2 * (w / h), 0.05, 0);
  }
  new ResizeObserver(resize).observe(stage);
  resize();

  const white = new THREE.Color(1, 1, 1);
  const black = new THREE.Color(0, 0, 0);
  const tmp = new THREE.Color();
  function colors() {
    const a = readVar("--theme-accent-rgb").map((c) => c / 255);
    const s = readVar("--theme-soft-rgb").map((c) => c / 255);
    const k = readVar("--theme-ink-rgb").map((c) => c / 255);
    body.uniforms.uA.value.setRGB(...s).lerp(white, 0.35);
    body.uniforms.uB.value.setRGB(...a);
    body.uniforms.uC.value.setRGB(...k).lerp(black, 0.25);
    deep.uniforms.uA.value.setRGB(...a).lerp(white, 0.3);
    deep.uniforms.uB.value.setRGB(...k);
    deep.uniforms.uC.value.setRGB(...k).lerp(black, 0.55);
    for (const m of [pale, wire]) {
      m.uniforms.uA.value.copy(white);
      m.uniforms.uB.value.setRGB(...s).lerp(white, 0.3);
      m.uniforms.uC.value.copy(tmp.setRGB(...a).lerp(white, 0.35));
    }
  }

  let visible = true;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(stage);

  function frame(ms) {
    const t = ms / 1000;
    if (visible) {
      colors();
      for (const m of [body, pale, deep, wire]) m.uniforms.uTime.value = t;
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      group.rotation.y = pointer.x * 0.35;
      group.rotation.x = pointer.y * 0.2;
      // La esfera "habla": la deformación sube y baja como una voz.
      const voice = 0.5 + 0.5 * Math.sin(t * 2.1) * Math.sin(t * 0.83 + 1.3);
      body.uniforms.uWobble.value = 0.07 + voice * 0.07;
      rings.forEach((ring, i) => {
        const pulse = 1 + 0.035 * Math.sin(t * 1.6 - i * 0.9);
        ring.scale.setScalar(pulse);
        ring.rotation.z = t * (0.1 - i * 0.025);
      });
      moonA.position.set(Math.cos(t * 0.35) * 2.6, Math.sin(t * 0.35) * 0.75 + 0.2, Math.sin(t * 0.35) * 2.1);
      moonB.position.set(Math.cos(t * 0.5 + 2.4) * 2.15, -1.45 + Math.sin(t * 0.6) * 0.25, Math.sin(t * 0.5 + 2.4) * 1.5);
      main.position.y = Math.sin(t * 0.7) * 0.08;
      renderer.render(scene, camera);
    }
    if (!reduced) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.querySelectorAll(".nx-stage").forEach(mount);
