var Hr = Object.defineProperty;
var Vr = (h, e, l) => e in h ? Hr(h, e, { enumerable: !0, configurable: !0, writable: !0, value: l }) : h[e] = l;
var r = (h, e, l) => (Vr(h, typeof e != "symbol" ? e + "" : e, l), l), us = (h, e, l) => {
  if (!e.has(h))
    throw TypeError("Cannot " + l);
};
var c = (h, e, l) => (us(h, e, "read from private field"), l ? l.call(h) : e.get(h)), i = (h, e, l) => {
  if (e.has(h))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(h) : e.set(h, l);
}, u = (h, e, l, a) => (us(h, e, "write to private field"), a ? a.call(h, l) : e.set(h, l), l);
var t = (h, e, l) => (us(h, e, "access private method"), l);
const Fr = "amplitudejs", jr = "6.0.0", Or = "A JavaScript library that allows you to control the design of your media controls in your webpage -- not the browser. No dependencies (jQuery not required) https://serversideup.net/open-source/amplitudejs", Br = "dist/amplitude.js", Kr = {
  vite: "^3.0.0"
}, Yr = {
  doc: "docs"
}, Rr = [
  "dist"
], $r = {
  type: "opencollective",
  url: "https://opencollective.com/amplitudejs"
}, Wr = {
  dev: "vite",
  build: "vite build",
  prettier: "npx pretty-quick",
  preversion: "npx pretty-quick && npm run test",
  postversion: "git push && git push --tags",
  test: "jest",
  version: "npm run build && git add -A dist"
}, Jr = {
  type: "git",
  url: "git+https://github.com/521dimensions/amplitudejs.git"
}, Xr = [
  "webaudio",
  "html5",
  "javascript",
  "audio-player"
], Zr = "521 Dimensions (https://521dimensions.com)", Gr = "MIT", eh = {
  url: "https://github.com/521dimensions/amplitudejs/issues"
}, th = "https://github.com/521dimensions/amplitudejs#readme", ih = {
  name: Fr,
  version: jr,
  description: Or,
  main: Br,
  devDependencies: Kr,
  directories: Yr,
  files: Rr,
  funding: $r,
  scripts: Wr,
  repository: Jr,
  keywords: Xr,
  author: Zr,
  license: Gr,
  bugs: eh,
  homepage: th
}, n = {
  audio_element: new Audio(),
  mobile: !1,
  version: ih,
  active_metadata: {},
  active_album: "",
  active_index: 0,
  active_podcast: null,
  active_playlist: null,
  active_collection: null,
  playback_speed: 1,
  repeat: !1,
  shuffle_list: {},
  repeat_audio: !1,
  shuffle_on: !1,
  callbacks: [],
  audio: [],
  collections: [],
  debug: !0,
  default_artwork: "",
  default_playlist_art: "",
  start_audio: "",
  starting_playlist: "",
  starting_playlist_song: "",
  starting_podcast: "",
  starting_podcast_episode: "",
  volume: {
    current: 50,
    increment: 5,
    decrement: 5,
    pre_mute_level: 50
  },
  soundcloud: {
    client: "",
    use_art: !1,
    audio_count: 0,
    ready_count: 0
  },
  is_touch_moving: !1,
  buffered: 0,
  bindings: {},
  continue_next: !0,
  delay: 0,
  player_state: "stopped",
  time_format: "MM:SS",
  web_audio_api: {
    availabile: !1,
    context: null,
    source: null,
    analyser: null
  },
  visualizations: {
    available: [],
    active: [],
    backup: ""
  },
  waveforms: {
    sample_rate: 100,
    built: []
  }
};
class y {
  static writeMessage(e) {
    n.debug && console.log(e);
  }
}
class o {
  setIsMobile() {
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? n.mobile = !0 : n.mobile = !1;
  }
  static isIos() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  static isIE() {
    return window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
  }
  static isMobile() {
    return n.mobile;
  }
  static isTouchMoving() {
    return n.is_touch_moving;
  }
  static getAudioState() {
    return n.audio_element.paused ? "paused" : "playing";
  }
  static getScope() {
    return n.active_collection == "" || n.active_collection == null ? "audio" : "collection";
  }
  static getVolume() {
    return n.volume.current;
  }
  static getVolumeIncrement() {
    return n.volume.increment;
  }
  static getVolumeDecrement() {
    return n.volume.decrement;
  }
  static getPreMuteVolume() {
    return n.volume.pre_mute_level;
  }
  static setPreMuteVolume(e = null) {
    e || (e = n.volume.current), n.volume.pre_mute_level = e;
  }
  static getPlaybackSpeed() {
    return n.playback_speed;
  }
  static isCollectionShuffled(e) {
    return !!(n.collections[e] && n.collections[e].shuffled);
  }
  static setCollectionShuffled(e, l, a) {
    n.collections[e].shuffled = l, n.collections[e].audio = a;
  }
  static getCollectionAudio(e) {
    return n.collections[e].audio;
  }
  static getActiveCollection() {
    return n.active_collection;
  }
  static getActiveAudioIndex() {
    return n.active_index;
  }
  static getContinueNext() {
    return n.continue_next;
  }
  static updateBufferedTime() {
    if (n.audio_element.buffered.length - 1 >= 0) {
      let e = n.audio_element.buffered.end(n.audio_element.buffered.length - 1), l = n.audio_element.duration;
      n.buffered = e / l * 100;
    }
  }
  static getBufferedPercentage() {
    return parseFloat(n.buffered) / 100;
  }
  static isLive() {
    return n.active_metadata.live;
  }
  static getTimeFormat() {
    return n.time_format;
  }
  static getCallback(e) {
    let l = !1;
    return n.callbacks.forEach(function(a) {
      a.event == e && (l = a);
    }), l;
  }
  resetConfig() {
    n.audio_element = new Audio(), n.active_metadata = {}, n.active_album = "", n.active_index = 0, n.active_playlist = null, n.playback_speed = 1, n.audio = [], n.playlists = {}, n.start_audio = "", n.starting_playlist = "", n.starting_playlist_song = "", n.repeat = !1, n.shuffle_list = {}, n.shuffle_on = !1, n.default_artwork = "", n.default_playlist_art = "", n.debug = !0, n.callbacks = [], n.volume = {
      current: 50,
      increment: 5,
      decrement: 5,
      pre_mute_level: 50
    }, n.soundcloud = {
      client: "",
      use_art: !1,
      audio_count: 0,
      ready_count: 0
    }, n.continue_next = !0;
  }
  static setPlayerState() {
    n.audio_element.paused && n.audio_element.currentTime == 0 && (n.player_state = "stopped"), n.audio_element.paused && n.audio_element.currentTime > 0 && (n.player_state = "paused"), n.audio_element.paused || (n.player_state = "playing");
  }
}
var sl;
const Es = class {
  constructor() {
    i(this, sl, [
      "abort",
      "error",
      "loadeddata",
      "loadedmetadata",
      "loadstart",
      "pause",
      "playing",
      "play",
      "progress",
      "ratechange",
      "seeked",
      "seeking",
      "stalled",
      "suspend",
      "timeupdate",
      "volumechange",
      "waiting",
      "canplay",
      "canplaythrough",
      "durationchange",
      "ended"
    ]);
  }
  handleNativeAudioElementEvents() {
    c(this, sl).forEach(function(e) {
      n.audio_element.addEventListener(e, function() {
        Es.run(e);
      });
    });
  }
  static run(e) {
    let l = o.getCallback(e);
    if (l) {
      y.writeMessage("Running Callback for event '" + l.event + "' with method '" + l.handler + "'");
      try {
        window[l.handler]();
      } catch (a) {
        if (a.message == "CANCEL EVENT")
          throw a;
        y.writeMessage(a.message);
      }
    }
  }
};
let g = Es;
sl = new WeakMap();
var cl, Bs, Et, ds, ul, Ks, At, rs, dl, Ys, bt, hs, rl, Rs, hl, $s;
class p {
  constructor() {
    i(this, cl);
    i(this, Et);
    i(this, ul);
    i(this, At);
    i(this, dl);
    i(this, bt);
    i(this, rl);
    i(this, hl);
  }
  play() {
    t(this, cl, Bs).call(this), t(this, ul, Ks).call(this), t(this, dl, Ys).call(this), o.setPlayerState();
  }
  pause() {
    t(this, Et, ds).call(this), t(this, bt, hs).call(this), t(this, At, rs).call(this), o.setPlayerState();
  }
  stop() {
    t(this, Et, ds).call(this), this.setCurrentTime(0), t(this, bt, hs).call(this), t(this, At, rs).call(this), o.setPlayerState(), g.run("stop");
  }
  skipToLocation(e) {
    n.active_metadata.live || n.audio_element.addEventListener("canplaythrough", function() {
      n.audio_element.duration >= e && e > 0 ? n.audio_element.currentTime = e : y.writeMessage("Amplitude can't skip to a location greater than the duration of the audio or less than 0.");
    }, { once: !0 });
  }
  setVolume(e) {
    t(this, rl, Rs).call(this, e), t(this, hl, $s).call(this, e);
  }
  setAudioLocation(e) {
    n.active_metadata.live || (n.audio_element.currentTime = n.audio_element.duration * (e / 100));
  }
  setPlaybackSpeed(e) {
    n.playback_speed = e, n.audio_element.playbackRate = n.playback_speed;
  }
  setCurrentTime(e) {
    isFinite(e) && (n.audio_element.currentTime = e);
  }
}
cl = new WeakSet(), Bs = function() {
}, Et = new WeakSet(), ds = function() {
}, ul = new WeakSet(), Ks = function() {
  (n.active_metadata.live || o.isMobile() && !n.paused) && (n.audio_element.src = n.active_metadata.url, n.audio_element.load());
}, At = new WeakSet(), rs = function() {
  n.active_metadata.live && (n.audio_element.src = "", n.audio_element.load());
}, dl = new WeakSet(), Ys = function() {
  let e = n.audio_element.play();
  e !== void 0 && e.then((l) => {
  }).catch((l) => {
  }), n.audio_element.playbackRate = n.playback_speed;
}, bt = new WeakSet(), hs = function() {
  n.audio_element.pause(), n.paused = !0;
}, rl = new WeakSet(), Rs = function(e) {
  e == 0 ? n.audio_element.muted = !0 : n.audio_element.muted = !1;
}, hl = new WeakSet(), $s = function(e) {
  n.volume.current = e, n.audio_element.volume = e / 100;
};
var kt, xt, ml, Ws, pl, Js, Q, Te;
const rt = class {
  constructor() {
    i(this, ml);
    i(this, pl);
    i(this, Q);
    i(this, kt, void 0);
    i(this, xt, void 0);
    u(this, xt, o.isMobile());
  }
  initialize() {
    t(this, ml, Ws).call(this), t(this, pl, Js).call(this);
  }
  static syncUI() {
    let e = o.getAudioState();
    document.querySelectorAll(rt.globalPlayPauseQuery).forEach((a) => {
      e == "playing" ? m.setElementPlay(a) : m.setElementPause(a);
    });
  }
  static syncToPause() {
    document.querySelectorAll(rt.globalPlayPauseQuery).forEach((l) => {
      m.setElementPause(l);
    });
  }
};
let ge = rt;
kt = new WeakMap(), xt = new WeakMap(), ml = new WeakSet(), Ws = function() {
  u(this, kt, document.querySelectorAll(rt.globalPlayPauseQuery));
}, pl = new WeakSet(), Js = function() {
  c(this, kt).forEach((e) => {
    c(this, xt) ? (e.removeEventListener("touchend", t(this, Q, Te)), e.addEventListener("touchend", t(this, Q, Te))) : (e.removeEventListener("click", t(this, Q, Te)), e.addEventListener("click", t(this, Q, Te)));
  });
}, Q = new WeakSet(), Te = function() {
  if (!o.isTouchMoving()) {
    let e = new p();
    n.audio_element.paused ? e.play() : e.pause(), m.syncAll();
  }
}, r(ge, "globalPlayPauseQuery", ".amplitude-play-pause:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])");
class E {
  static collectionExists(e) {
    return !!n.collections[e];
  }
  static collectionChanged(e) {
    return n.active_collection != e;
  }
  static isCollectionShuffled(e) {
    return !!n.collections[e].shuffle;
  }
}
var Lt, It, fl, Xs, yl, Zs, z, we, vl, Gs, gl, ec;
const ht = class {
  constructor() {
    i(this, fl);
    i(this, yl);
    i(this, z);
    i(this, vl);
    i(this, gl);
    i(this, Lt, void 0);
    i(this, It, void 0);
    u(this, It, o.isMobile());
  }
  initialize() {
    t(this, fl, Xs).call(this), t(this, yl, Zs).call(this);
  }
  static syncUI() {
    let e = o.getAudioState(), l = document.querySelectorAll(ht.collectionPlayPauseQuery), a = o.getActiveCollection();
    l.forEach((s) => {
      let d = s.getAttribute("data-amplitude-collection-key");
      e == "playing" && a == d ? m.setElementPlay(s) : m.setElementPause(s);
    });
  }
  static syncToPause() {
    document.querySelectorAll(ht.collectionPlayPauseQuery).forEach((l) => {
      m.setElementPause(l);
    });
  }
};
let Ee = ht;
Lt = new WeakMap(), It = new WeakMap(), fl = new WeakSet(), Xs = function() {
  u(this, Lt, document.querySelectorAll(ht.collectionPlayPauseQuery));
}, yl = new WeakSet(), Zs = function() {
  c(this, Lt).forEach((e) => {
    c(this, It) ? (e.removeEventListener("touchend", t(this, z, we)), e.addEventListener("touchend", t(this, z, we).bind(this, e))) : (e.removeEventListener("click", t(this, z, we)), e.addEventListener("click", t(this, z, we).bind(this, e)));
  });
}, z = new WeakSet(), we = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-collection-key");
    if (!E.collectionExists(l))
      return y.writeMessage('Collection with key "' + l + '" does not exist! Please define this collection in your configuration.'), !1;
    t(this, vl, Gs).call(this, l), t(this, gl, ec).call(this), m.syncAll();
  }
}, vl = new WeakSet(), Gs = function(e) {
  if (E.collectionChanged(e)) {
    let l = new v();
    l.setActiveCollection(e), E.isCollectionShuffled(e) ? l.changeAudioCollection(e, n.collections[e].shuffle_list[0], 0, !0) : l.changeAudioCollection(e, n.collections[e].audio[0], 0);
  }
}, gl = new WeakSet(), ec = function() {
  let e = new p();
  n.audio_element.paused ? e.play() : e.pause();
}, r(Ee, "collectionPlayPauseQuery", ".amplitude-play-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])");
class Ie {
  static audioExists(e) {
    return !!n.audio[e];
  }
  static audioChanged(e, l = null) {
    return n.active_collection != l ? !0 : n.active_collection == null && l == null ? n.active_index != e : n.active_collection == collection && n.collections[l].active_index != e;
  }
}
var El, Al, tc, bl, ic, kl, lc, xl, nc, U, Me;
const me = class {
  constructor() {
    i(this, Al);
    i(this, bl);
    i(this, kl);
    i(this, xl);
    i(this, U);
    i(this, El, [
      "cover_art_url",
      "station_art_url",
      "podcast_episode_cover_art_url",
      "album_art_url"
    ]);
  }
  displayMetaData() {
    t(this, Al, tc).call(this), t(this, bl, ic).call(this);
  }
  displayCollectionMetaData() {
  }
  syncMetaData() {
    t(this, kl, lc).call(this), t(this, xl, nc).call(this), this.displayCollectionMetaData();
  }
};
let A = me;
El = new WeakMap(), Al = new WeakSet(), tc = function() {
  document.querySelectorAll(me.globalMetaDataElementsQuery).forEach((l) => {
    let a = l.getAttribute("data-amplitude-audio-info"), s = n.active_metadata[a] != null ? n.active_metadata[a] : null;
    t(this, U, Me).call(this, a, s, l);
  });
}, bl = new WeakSet(), ic = function() {
  document.querySelectorAll(me.collectionMetaDataElementsQuery).forEach((l) => {
    let a = l.getAttribute("data-amplitude-audio-info"), s = n.active_metadata[a] != null ? n.active_metadata[a] : null;
    t(this, U, Me).call(this, a, s, l);
  });
}, kl = new WeakSet(), lc = function() {
  document.querySelectorAll(me.audioMetaDataElementsQuery).forEach((l) => {
    let a = l.getAttribute("data-amplitude-audio-info"), s = l.getAttribute("data-amplitude-audio-index"), d = n.audio[s][a] != null ? n.audio[s][a] : null;
    t(this, U, Me).call(this, a, d, l);
  });
}, xl = new WeakSet(), nc = function() {
  document.querySelectorAll(me.collectionAudioMetaDataElementsQuery).forEach((l) => {
    let a = l.getAttribute("data-amplitude-audio-info"), s = l.getAttribute("data-amplitude-audio-index"), d = l.getAttribute("data-amplitude-collection-key"), f = n.collections[d].audio[s][info] != null ? n.collections[d].audio[s][info] : null;
    t(this, U, Me).call(this, a, f, l);
  });
}, U = new WeakSet(), Me = function(e, l, a) {
  c(this, El).indexOf(e) >= 0 ? (l = l || n.default_art, a.setAttribute("src", l)) : (l = l || "", a.innerHTML = l);
}, r(A, "globalMetaDataElementsQuery", "[data-amplitude-audio-info]:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])"), r(A, "collectionMetaDataElementsQuery", "[data-amplitude-audio-info][data-amplitude-collection-key]:not([data-amplitude-audio-index])"), r(A, "audioMetaDataElementsQuery", "[data-amplitude-audio-info][data-amplitude-audio-index]:not([data-amplitude-collection-key])"), r(A, "collectionAudioMetaDataElementsQuery", "[data-amplitude-audio-info][data-amplitude-audio-index][data-amplitude-collection-key]"), r(A, "collectionInfoElementsQuery", "[data-amplitude-collection-info]");
var St, Tt, Ll, ac, Il, oc, Sl, sc, Tl, cc;
const As = class {
  constructor() {
    i(this, Ll);
    i(this, Il);
    i(this, Sl);
    i(this, Tl);
    i(this, St, void 0);
    i(this, Tt, void 0);
  }
  setActive() {
    o.getScope() == "audio" && (t(this, Ll, ac).call(this), t(this, Il, oc).call(this), t(this, Sl, sc).call(this), t(this, Tl, cc).call(this));
  }
};
let qi = As;
St = new WeakMap(), Tt = new WeakMap(), Ll = new WeakSet(), ac = function() {
  u(this, St, document.querySelectorAll(As.audioContainerElementQuery));
}, Il = new WeakSet(), oc = function() {
  c(this, St).forEach(function(e) {
    e.classList.remove("amplitude-active-audio-container");
  });
}, Sl = new WeakSet(), sc = function() {
  u(this, Tt, n.active_index);
}, Tl = new WeakSet(), cc = function() {
  document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="' + c(this, Tt) + '"]:not([data-amplitude-collection-key])').forEach(function(l) {
    l.classList.add("amplitude-active-audio-container");
  });
}, r(qi, "audioContainerElementQuery", ".amplitude-audio-container[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var wt, Mt, q, b, wl, uc, Ml, dc, Cl, rc, _l, hc;
const bs = class {
  constructor(e) {
    i(this, wl);
    i(this, Ml);
    i(this, Cl);
    i(this, _l);
    i(this, wt, void 0);
    i(this, Mt, void 0);
    i(this, q, void 0);
    i(this, b, void 0);
    u(this, wt, e);
  }
  setActive() {
    o.getScope() == "collection" && (t(this, wl, uc).call(this), t(this, Ml, dc).call(this), t(this, Cl, rc).call(this), t(this, _l, hc).call(this));
  }
};
let Ni = bs;
wt = new WeakMap(), Mt = new WeakMap(), q = new WeakMap(), b = new WeakMap(), wl = new WeakSet(), uc = function() {
  u(this, Mt, document.querySelectorAll(bs.collectionAudioContainerElementQuery));
}, Ml = new WeakSet(), dc = function() {
  c(this, Mt).forEach(function(e) {
    e.classList.remove("amplitude-active-audio-container");
  });
}, Cl = new WeakSet(), rc = function() {
  u(this, b, o.getActiveCollection()), c(this, wt) ? u(this, q, n.collections[c(this, b)].active_index) : o.isCollectionShuffled(c(this, b)) ? u(this, q, n.collections[c(this, b)].shuffle_list[n.collections[c(this, b)].active_index].index) : u(this, q, n.collections[c(this, b)].active_index);
}, _l = new WeakSet(), hc = function() {
  document.querySelectorAll('.amplitude-audio-container[data-amplitude-audio-index="' + c(this, q) + '"][data-amplitude-collection-key="' + c(this, b) + '"]').forEach(function(l) {
    l.classList.add("amplitude-active-audio-container");
  });
}, r(Ni, "collectionAudioContainerElementQuery", ".amplitude-audio-container[data-amplitude-audio-index][data-amplitude-collection-key]");
var Pl, pc, Ql, fc;
class mc {
  constructor() {
    i(this, Pl);
    i(this, Ql);
  }
  setActiveContainers(e) {
    t(this, Pl, pc).call(this), t(this, Ql, fc).call(this, e);
  }
}
Pl = new WeakSet(), pc = function() {
  new qi().setActive();
}, Ql = new WeakSet(), fc = function(e) {
  new Ni(e).setActive();
};
var zl, yc, Ul, vc, ql, gc, Nl, Ec;
class Se {
  constructor() {
    i(this, zl);
    i(this, Ul);
    i(this, ql);
    i(this, Nl);
  }
  changeAudio(e, l, a = !1) {
    t(this, zl, yc).call(this, e), t(this, Ul, vc).call(this, e, l), t(this, ql, gc).call(this, a);
  }
}
zl = new WeakSet(), yc = function(e) {
  new p().stop(), m.syncAllToPause();
}, Ul = new WeakSet(), vc = function(e, l) {
  n.active_collection = null, n.audio_element.src = e.url, n.active_metadata = e, n.active_index = parseInt(l);
}, ql = new WeakSet(), gc = function(e) {
  t(this, Nl, Ec).call(this), new mc().setActiveContainers(e), g.run("audio_change");
}, Nl = new WeakSet(), Ec = function() {
  new A().displayMetaData();
};
var Ct, _t, Dl, Ac, Hl, bc, N, Ce, Vl, kc, Fl, xc, jl, Lc;
const mt = class {
  constructor() {
    i(this, Dl);
    i(this, Hl);
    i(this, N);
    i(this, Vl);
    i(this, Fl);
    i(this, jl);
    i(this, Ct, void 0);
    i(this, _t, void 0);
    u(this, _t, o.isMobile());
  }
  initialize() {
    t(this, Dl, Ac).call(this), t(this, Hl, bc).call(this);
  }
  static syncUI() {
    let e = o.getAudioState(), l = document.querySelectorAll(mt.audioPlayPauseQuery), a = o.getActiveAudioIndex();
    l.forEach((s) => {
      let d = s.getAttribute("data-amplitude-audio-index");
      e == "playing" && a == d ? m.setElementPlay(s) : m.setElementPause(s);
    });
  }
  static syncToPause() {
    document.querySelectorAll(mt.audioPlayPauseQuery).forEach((l) => {
      m.setElementPause(l);
    });
  }
};
let Ae = mt;
Ct = new WeakMap(), _t = new WeakMap(), Dl = new WeakSet(), Ac = function() {
  u(this, Ct, document.querySelectorAll(mt.audioPlayPauseQuery));
}, Hl = new WeakSet(), bc = function() {
  c(this, Ct).forEach((e) => {
    c(this, _t) ? (e.removeEventListener("touchend", t(this, N, Ce)), e.addEventListener("touchend", t(this, N, Ce).bind(this, e))) : (e.removeEventListener("click", t(this, N, Ce)), e.addEventListener("click", t(this, N, Ce).bind(this, e)));
  });
}, N = new WeakSet(), Ce = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-audio-index");
    if (!Ie.audioExists(l))
      return y.writeMessage('Audio with index "' + l + '" does not exist! Please add an audio object at this index in your configuration.'), !1;
    t(this, Vl, kc).call(this, l), t(this, Fl, xc).call(this, l), t(this, jl, Lc).call(this), m.syncAll();
  }
}, Vl = new WeakSet(), kc = function(e) {
  if (E.collectionChanged(null)) {
    let l = new v(), a = new Se();
    l.setActiveCollection(null), a.changeAudio(n.audio[e], e, !0);
  }
}, Fl = new WeakSet(), xc = function(e) {
  Ie.audioChanged(e) && new Se().changeAudio(n.audio[e], e, !0);
}, jl = new WeakSet(), Lc = function() {
  let e = new p();
  n.audio_element.paused ? e.play() : e.pause();
}, r(Ae, "audioPlayPauseQuery", ".amplitude-play-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var Pt, Qt, Ol, Ic, Bl, Sc, D, _e, Kl, Tc, Yl, wc, Rl, Mc;
const pt = class {
  constructor() {
    i(this, Ol);
    i(this, Bl);
    i(this, D);
    i(this, Kl);
    i(this, Yl);
    i(this, Rl);
    i(this, Pt, void 0);
    i(this, Qt, void 0);
    u(this, Qt, o.isMobile());
  }
  initialize() {
    t(this, Ol, Ic).call(this), t(this, Bl, Sc).call(this);
  }
  static syncUI() {
    let e = o.getAudioState();
    document.querySelectorAll(pt.collectionAudioPlayPauseQuery).forEach((a) => {
      e == "playing" ? m.setElementPlay(a) : m.setElementPause(a);
    });
  }
  static syncToPause() {
    document.querySelectorAll(pt.collectionAudioPlayPauseQuery).forEach((l) => {
      m.setElementPause(l);
    });
  }
};
let be = pt;
Pt = new WeakMap(), Qt = new WeakMap(), Ol = new WeakSet(), Ic = function() {
  u(this, Pt, document.querySelectorAll(pt.collectionAudioPlayPauseQuery));
}, Bl = new WeakSet(), Sc = function() {
  c(this, Pt).forEach((e) => {
    c(this, Qt) ? (e.removeEventListener("touchend", t(this, D, _e)), e.addEventListener("touchend", t(this, D, _e).bind(this, e))) : (e.removeEventListener("click", t(this, D, _e)), e.addEventListener("click", t(this, D, _e).bind(this, e)));
  });
}, D = new WeakSet(), _e = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-collection-key"), a = e.getAttribute("data-amplitude-audio-index");
    t(this, Kl, Tc).call(this, l, a), t(this, Yl, wc).call(this, l, a), t(this, Rl, Mc).call(this), m.syncAll();
  }
}, Kl = new WeakSet(), Tc = function(e, l) {
  if (E.collectionChanged(e)) {
    let a = new v();
    a.setActiveCollection(e), a.changeAudioCollection(e, n.collections[e].audio[l], l, !0);
  }
}, Yl = new WeakSet(), wc = function(e, l) {
  Ie.audioChanged(l, e) && new v().changeAudioCollection(e, n.collections[e].audio[l], l, !0);
}, Rl = new WeakSet(), Mc = function() {
  let e = new p();
  n.audio_element.paused ? e.play() : e.pause();
}, r(be, "collectionAudioPlayPauseQuery", ".amplitude-play-pause[data-amplitude-audio-index][data-amplitude-collection-key]");
var $l, Cc, Wl, _c, Jl, Pc, Xl, Qc;
class m {
  constructor() {
    i(this, $l);
    i(this, Wl);
    i(this, Jl);
    i(this, Xl);
  }
  setUp() {
    t(this, $l, Cc).call(this), t(this, Wl, _c).call(this), t(this, Jl, Pc).call(this), t(this, Xl, Qc).call(this);
  }
  static syncAll() {
    ge.syncUI(), Ee.syncUI(), Ae.syncUI(), be.syncUI();
  }
  static syncAllToPause() {
    ge.syncToPause(), Ee.syncToPause(), Ae.syncToPause(), be.syncToPause();
  }
  static setElementPlay(e) {
    e.classList.add("amplitude-playing"), e.classList.remove("amplitude-paused");
  }
  static setElementPause(e) {
    e.classList.remove("amplitude-playing"), e.classList.add("amplitude-paused");
  }
}
$l = new WeakSet(), Cc = function() {
  new ge().initialize();
}, Wl = new WeakSet(), _c = function() {
  new Ee().initialize();
}, Jl = new WeakSet(), Pc = function() {
  new Ae().initialize();
}, Xl = new WeakSet(), Qc = function() {
  new be().initialize();
};
var Zl, zc, zt, ms, Gl, Uc, en, qc, tn, Nc, ln, Dc, nn, Hc, an, Vc, on, Fc, sn, jc, cn, Oc, un, Bc;
class v {
  constructor() {
    i(this, Zl);
    i(this, zt);
    i(this, Gl);
    i(this, en);
    i(this, tn);
    i(this, ln);
    i(this, nn);
    i(this, an);
    i(this, on);
    i(this, sn);
    i(this, cn);
    i(this, un);
  }
  next(e = null, l = !1) {
    e || (e = n.active_collection);
    let a = t(this, Zl, zc).call(this, e);
    this.setActiveCollection(e), this.changeCollectionAudio(e, a.audio, a.index), t(this, tn, Nc).call(this, a.end, l), m.syncAll(), g.run("next"), n.repeat_audio && g.run("audio_repeated");
  }
  previous(e = null) {
    e || (e = n.active_collection);
    let l = t(this, ln, Dc).call(this, e);
    this.setActiveCollection(e), this.changeCollectionAudio(e, l.audio, l.index), new p().play(), m.syncAll(), g.run("previous"), n.repeat_audio && g.run("audio_repeated");
  }
  setActiveCollection(e) {
    n.active_collection != e && (g.run("collection_changed"), n.active_collection = e, e != null && (n.collections[e].active_index = 0));
  }
  changeAudioCollection(e, l, a, s) {
    t(this, on, Fc).call(this, l), t(this, sn, jc).call(this, e, l, a), t(this, cn, Oc).call(this, s);
  }
}
Zl = new WeakSet(), zc = function(e) {
  return n.repeat_audio ? t(this, zt, ms).call(this, e) : n.collections[e].shuffle ? t(this, Gl, Uc).call(this, e) : t(this, en, qc).call(this, e);
}, zt = new WeakSet(), ms = function(e) {
  let l = n.collections[e].active_index;
  return {
    index: nextIndex,
    audio: n.collections[e].shuffle ? n.collections[e].shuffle_list[l] : n.collections[e].audio[l],
    end: !1
  };
}, Gl = new WeakSet(), Uc = function(e) {
  let l = null, a = !1, s = n.collections[e].active_index, d = n.collections[e].shuffle_list.length;
  return parseInt(s + 1) < d ? l = parseInt(s + 1) : (l = 0, a = !0), {
    index: l,
    audio: n.collections[e].shuffleList[l],
    end: a
  };
}, en = new WeakSet(), qc = function(e) {
  let l = null, a = !1, s = n.collections[e].active_index, d = n.collections[e].audio.length;
  return parseInt(s + 1) < d ? l = parseInt(s + 1) : (l = 0, a = !0), {
    index: l,
    audio: n.collections[e].audio[l],
    end: a
  };
}, tn = new WeakSet(), Nc = function(e, l) {
  e && !n.repeat_audio || l && !n.repeat_audio && e || new p().play();
}, ln = new WeakSet(), Dc = function() {
  return n.repeat_audio ? t(this, zt, ms).call(this, collectionKey) : n.collections[collectionKey].shuffle ? t(this, nn, Hc).call(this, collectionKey) : t(this, an, Vc).call(this, collectionKey);
}, nn = new WeakSet(), Hc = function(e) {
  let l = null, a = n.collections[e].active_index, s = n.collections[e].shuffle_list.length;
  return parseInt(a - 1) >= 0 ? l = parseInt(a - 1) : l = parseInt(s - 1), {
    index: l,
    audio: n.collections[e].shuffleList[l]
  };
}, an = new WeakSet(), Vc = function(e) {
  let l = null, a = n.collections[e].active_index, s = n.collections[e].audio.length;
  return parseInt(a - 1) >= 0 ? l = parseInt(a - 1) : l = parseInt(s - 1), {
    index: l,
    audio: n.collections[e].audio[l]
  };
}, on = new WeakSet(), Fc = function(e) {
  p.stop(), m.syncAllToPause();
}, sn = new WeakSet(), jc = function(e, l, a) {
  n.audio_element = l.url, n.active_metadata = l, n.active_index = null, n.collections[e].active_index = parseInt(a);
}, cn = new WeakSet(), Oc = function(e) {
  t(this, un, Bc).call(this), new mc().setActiveContainers(e), g.run("audio_change");
}, un = new WeakSet(), Bc = function() {
  new A().displayMetaData();
};
var Ut, ps;
class lh {
  constructor() {
    i(this, Ut);
  }
  bind() {
    n.audio_element.removeEventListener("ended", t(this, Ut, ps)), n.audio_element.addEventListener("ended", t(this, Ut, ps).bind(this));
  }
}
Ut = new WeakSet(), ps = function() {
  setTimeout(function() {
    o.getScope() == "collection" && o.getContinueNext() ? new v().next(o.getActiveCollection(), !0) : (new p().stop(), m.syncAll());
  }, n.delay);
};
var dn, Kc, qt, fs, rn, Yc;
class nh {
  constructor() {
    i(this, dn);
    i(this, qt);
    i(this, rn);
  }
  bind() {
    t(this, dn, Kc).call(this);
  }
}
dn = new WeakSet(), Kc = function() {
  document.removeEventListener("keydown", t(this, qt, fs).bind(this)), document.addEventListener("keydown", t(this, qt, fs).bind(this));
}, qt = new WeakSet(), fs = function(e) {
  t(this, rn, Yc).call(this) || e.key;
}, rn = new WeakSet(), Yc = function() {
  let e = document.activeElement.tagName.toLowerCase();
  return [
    "input",
    "textarea",
    "select",
    "checkbox"
  ].indexOf(e) > -1;
};
const ks = class {
  static syncUI() {
    document.querySelectorAll(ks.globalBufferedProgressQuery).forEach(function(l) {
      isNaN(n.buffered) || (l.value = parseFloat(o.getBufferedPercentage()));
    });
  }
};
let Di = ks;
r(Di, "globalBufferedProgressQuery", "progress.amplitude-buffered-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])");
class ah {
  static syncUI() {
    let e = o.getActiveCollection();
    document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-collection-key="' + e + '"]:not([data-amplitude-audio-index])').forEach(function(a) {
      isNaN(n.buffered) || (a.value = parseFloat(o.getBufferedPercentage()));
    });
  }
}
class Rc {
  static syncUI() {
    let e = o.getActiveAudioIndex();
    document.querySelectorAll('progress.amplitude-buffered-progress[data-amplitude-audio-index="' + e + '"]:not([data-amplitude-collection-key])').forEach(function(a) {
      isNaN(n.buffered) || (a.value = parseFloat(o.getBufferedPercentage()));
    });
  }
}
r(Rc, "audioBufferedProgressQuery", "progress.amplitude-buffered-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
class oh {
  static syncAll() {
    Di.syncUI(), ah.syncUI(), Rc.syncUI();
  }
}
const xs = class {
  static syncUI(e) {
    !isNaN(e) && isFinite(e) && document.querySelectorAll(xs.globalProgressQuery).forEach((a) => {
      let s = a.max;
      a.value = e / 100 * s;
    });
  }
};
let Hi = xs;
r(Hi, "globalProgressQuery", "progress.amplitude-audio-played-progress:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])");
const Ls = class {
  static syncUI(e) {
    if (!isNaN(e) && isFinite(e)) {
      let l = document.querySelectorAll(Ls.collectionProgressQuery), a = o.getActiveCollection();
      l.forEach((s) => {
        let d = s.getAttribute("data-amplitude-collection-key"), f = s.max;
        a == d ? s.value = e / 100 * f : s.value = 0;
      });
    }
  }
};
let Vi = Ls;
r(Vi, "collectionProgressQuery", "progress.amplitude-audio-played-progress[data-amplitude-collection-key]:not([data-amplitude-audio-index])");
const Is = class {
  static syncUI(e) {
    if (!isNaN(e) && isFinite(e)) {
      let l = document.querySelectorAll(Is.audioProgressQuery), a = o.getActiveAudioIndex();
      l.forEach((s) => {
        let d = s.getAttribute("data-amplitude-audio-index"), f = s.max;
        a == d ? s.value = e / 100 * f : s.value = 0;
      });
    }
  }
};
let Fi = Is;
r(Fi, "audioProgressQuery", "progress.amplitude-audio-played-progress[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
const Ss = class {
  static syncUI(e) {
    if (!isNaN(e) && isFinite(e)) {
      let l = document.querySelectorAll(Ss.collectionAudioProgressQuery), a = o.getActiveCollection(), s = o.getActiveAudioIndex();
      l.forEach((d) => {
        let f = d.getAttribute("data-amplitude-collection-key"), w = d.getAttribute("data-amplitude-audio-index"), Ui = d.max;
        a == f && s == w ? d.value = e / 100 * Ui : d.value = 0;
      });
    }
  }
};
let ji = Ss;
r(ji, "collectionAudioProgressQuery", "progress.amplitude-audio-played-progress[data-amplitude-collection-key][data-amplitude-audio-index]");
class sh {
  constructor() {
  }
  static syncCurrentTime(e) {
    Hi.syncUI(e), Vi.syncUI(e), Fi.syncUI(e), ji.syncUI(e);
  }
}
var hn, $c, mn, Wc, pn, Jc, fn, Xc, yn, Zc, vn, Gc;
class zi {
  constructor() {
    i(this, hn);
    i(this, mn);
    i(this, pn);
    i(this, fn);
    i(this, yn);
    i(this, vn);
  }
  static percentageInSeconds(e) {
    return n.audio_element.duration * (e / 100);
  }
  computeCurrentTimes() {
    let e = {};
    return e.seconds = t(this, hn, $c).call(this), e.minutes = t(this, mn, Wc).call(this), e.hours = t(this, pn, Jc).call(this), e;
  }
  computeAudioCompletionPercentage() {
    return n.audio_element.currentTime / n.audio_element.duration * 100;
  }
  computeAudioDuration() {
    let e = {};
    return e.seconds = t(this, fn, Xc).call(this), e.minutes = t(this, yn, Zc).call(this), e.hours = t(this, vn, Gc).call(this), e;
  }
}
hn = new WeakSet(), $c = function() {
  return (Math.floor(n.audio_element.currentTime % 60) < 10 ? "0" : "") + Math.floor(n.audio_element.currentTime % 60);
}, mn = new WeakSet(), Wc = function() {
  let e = Math.floor(n.audio_element.currentTime / 60);
  return e < 10 && (e = "0" + e), e;
}, pn = new WeakSet(), Jc = function() {
  let e = Math.floor(n.audio_element.currentTime / 3600);
  return e < 10 && (e = "0" + e), e;
}, fn = new WeakSet(), Xc = function() {
  return (Math.floor(n.audio_element.duration % 60) < 10 ? "0" : "") + Math.floor(n.audio_element.duration % 60);
}, yn = new WeakSet(), Zc = function() {
  let e = Math.floor(n.audio_element.duration / 60);
  return e < 10 && (e = "0" + e), e;
}, vn = new WeakSet(), Gc = function() {
  let e = Math.floor(n.audio_element.duration / 3600);
  return e < 10 && (e = "0" + e), e;
};
var k, gn, eu, En, tu, An, iu, bn, lu;
const pe = class {
  constructor(e) {
    i(this, gn);
    i(this, En);
    i(this, An);
    i(this, bn);
    i(this, k, void 0);
    u(this, k, e);
  }
  sync() {
    t(this, gn, eu).call(this), t(this, En, tu).call(this), t(this, An, iu).call(this), t(this, bn, lu).call(this);
  }
};
let M = pe;
k = new WeakMap(), gn = new WeakSet(), eu = function() {
  let e = o.getTimeFormat(), l = document.querySelectorAll(pe.globalFormattedTimeElementQuery), a = e.replace("HH", c(this, k).hours).replace("MM", c(this, k).minutes).replace("SS", c(this, k).seconds);
  l.forEach((s) => {
    s.innerHTML = a;
  });
}, En = new WeakSet(), tu = function() {
  document.querySelectorAll(pe.globalHoursTimeElementQuery).forEach((l) => {
    l.innerHTML = c(this, k).hours;
  });
}, An = new WeakSet(), iu = function() {
  document.querySelectorAll(pe.globalMinutesTimeElementQuery).forEach((l) => {
    l.innerHTML = c(this, k).minutes;
  });
}, bn = new WeakSet(), lu = function() {
  document.querySelectorAll(pe.globalSecondsTimeElementQuery).forEach((l) => {
    l.innerHTML = c(this, k).seconds;
  });
}, r(M, "globalFormattedTimeElementQuery", ".amplitude-current-time:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])"), r(M, "globalHoursTimeElementQuery", ".amplitude-current-hours:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])"), r(M, "globalMinutesTimeElementQuery", ".amplitude-current-minutes:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])"), r(M, "globalSecondsTimeElementQuery", ".amplitude-current-seconds:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])");
var x, kn, nu, xn, au, Ln, ou, In, su;
const fe = class {
  constructor(e) {
    i(this, kn);
    i(this, xn);
    i(this, Ln);
    i(this, In);
    i(this, x, void 0);
    u(this, x, e);
  }
  sync() {
    t(this, kn, nu).call(this), t(this, xn, au).call(this), t(this, Ln, ou).call(this), t(this, In, su).call(this);
  }
};
let C = fe;
x = new WeakMap(), kn = new WeakSet(), nu = function() {
  let e = o.getTimeFormat(), l = o.getActiveCollection(), a = document.querySelectorAll(fe.collectionFormattedTimeElementQuery), s = e.replace("HH", c(this, x).hours).replace("MM", c(this, x).minutes).replace("SS", c(this, x).seconds);
  a.forEach((d) => {
    let f = d.getAttribute("data-amplitude-collection-key");
    l == f ? d.innerHTML = s : d.innerHTML = "00:00";
  });
}, xn = new WeakSet(), au = function() {
  let e = document.querySelectorAll(fe.collectionHoursTimeElementQuery), l = o.getActiveCollection();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-collection-key");
    l == s ? a.innerHTML = c(this, x).hours : a.innerHTML = "00";
  });
}, Ln = new WeakSet(), ou = function() {
  let e = document.querySelectorAll(fe.collectionMinutesTimeElementQuery), l = o.getActiveCollection();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-collection-key");
    l == s ? a.innerHTML = c(this, x).minutes : a.innerHTML = "00";
  });
}, In = new WeakSet(), su = function() {
  let e = document.querySelectorAll(fe.collectionSecondsTimeElementQuery), l = o.getActiveCollection();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-collection-key");
    l == s ? a.innerHTML = c(this, x).seconds : a.innerHTML = "00";
  });
}, r(C, "collectionFormattedTimeElementQuery", ".amplitude-current-time[data-amplitude-collection-key]:not([data-amplitude-audio-index])"), r(C, "collectionHoursTimeElementQuery", ".amplitude-current-hours[data-amplitude-collection-key]:not([data-amplitude-audio-index])"), r(C, "collectionMinutesTimeElementQuery", ".amplitude-current-minutes[data-amplitude-collection-key]:not([data-amplitude-audio-index])"), r(C, "collectionSecondsTimeElementQuery", ".amplitude-current-seconds[data-amplitude-collection-key]:not([data-amplitude-audio-index])");
var L, Sn, cu, Tn, uu, wn, du, Mn, ru;
const ye = class {
  constructor(e) {
    i(this, Sn);
    i(this, Tn);
    i(this, wn);
    i(this, Mn);
    i(this, L, void 0);
    u(this, L, e);
  }
  sync() {
    t(this, Sn, cu).call(this), t(this, Tn, uu).call(this), t(this, wn, du).call(this), t(this, Mn, ru).call(this);
  }
};
let _ = ye;
L = new WeakMap(), Sn = new WeakSet(), cu = function() {
  let e = o.getTimeFormat(), l = o.getActiveAudioIndex(), a = document.querySelectorAll(ye.audioFormattedTimeElementQuery), s = e.replace("HH", c(this, L).hours).replace("MM", c(this, L).minutes).replace("SS", c(this, L).seconds);
  a.forEach((d) => {
    let f = d.getAttribute("data-amplitude-audio-index");
    l == f ? d.innerHTML = s : d.innerHTML = "00:00";
  });
}, Tn = new WeakSet(), uu = function() {
  let e = document.querySelectorAll(ye.audioHoursTimeElementQuery), l = o.getActiveAudioIndex();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-audio-index");
    l == s ? a.innerHTML = c(this, L).hours : a.innerHTML = "00";
  });
}, wn = new WeakSet(), du = function() {
  let e = document.querySelectorAll(ye.audioMinutesTimeElementQuery), l = o.getActiveAudioIndex();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-audio-index");
    l == s ? a.innerHTML = c(this, L).minutes : a.innerHTML = "00";
  });
}, Mn = new WeakSet(), ru = function() {
  let e = document.querySelectorAll(ye.audioSecondsTimeElementQuery), l = o.getActiveAudioIndex();
  e.forEach((a) => {
    let s = a.getAttribute("data-amplitude-audio-index");
    l == s ? a.innerHTML = c(this, L).seconds : a.innerHTML = "00";
  });
}, r(_, "audioFormattedTimeElementQuery", ".amplitude-current-time[data-amplitude-audio-index]:not([data-amplitude-collection-key])"), r(_, "audioHoursTimeElementQuery", ".amplitude-current-hours[data-amplitude-audio-index]:not([data-amplitude-collection-key])"), r(_, "audioMinutesTimeElementQuery", ".amplitude-current-minutes[data-amplitude-audio-index]:not([data-amplitude-collection-key])"), r(_, "audioSecondsTimeElementQuery", ".amplitude-current-seconds[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var I, Cn, hu, _n, mu, Pn, pu, Qn, fu;
const ve = class {
  constructor(e) {
    i(this, Cn);
    i(this, _n);
    i(this, Pn);
    i(this, Qn);
    i(this, I, void 0);
    u(this, I, e);
  }
  sync() {
    t(this, Cn, hu).call(this), t(this, _n, mu).call(this), t(this, Pn, pu).call(this), t(this, Qn, fu).call(this);
  }
};
let P = ve;
I = new WeakMap(), Cn = new WeakSet(), hu = function() {
  let e = o.getTimeFormat(), l = o.getActiveCollection(), a = o.getActiveAudioIndex(), s = document.querySelectorAll(ve.collectionAudioFormattedTimeElementQuery), d = e.replace("HH", c(this, I).hours).replace("MM", c(this, I).minutes).replace("SS", c(this, I).seconds);
  s.forEach((f) => {
    let w = f.getAttribute("data-amplitude-collection-key"), Ui = f.getAttribute("data-amplitude-audio-index");
    l == w && a == Ui ? f.innerHTML = d : f.innerHTML = "00:00";
  });
}, _n = new WeakSet(), mu = function() {
  let e = document.querySelectorAll(ve.collectionAudioHoursTimeElementQuery), l = o.getActiveCollection(), a = o.getActiveAudioIndex();
  e.forEach((s) => {
    let d = s.getAttribute("data-amplitude-collection-key"), f = s.getAttribute("data-amplitude-audio-index");
    l == d && a == f ? s.innerHTML = c(this, I).hours : s.innerHTML = "00";
  });
}, Pn = new WeakSet(), pu = function() {
  let e = document.querySelectorAll(ve.collectionAudioMinutesTimeElementQuery), l = o.getActiveCollection(), a = o.getActiveAudioIndex();
  e.forEach((s) => {
    let d = s.getAttribute("data-amplitude-collection-key"), f = s.getAttribute("data-amplitude-audio-index");
    l == d && a == f ? s.innerHTML = c(this, I).minutes : s.innerHTML = "00";
  });
}, Qn = new WeakSet(), fu = function() {
  let e = document.querySelectorAll(ve.collectionAudioSecondsTimeElementQuery), l = o.getActiveCollection(), a = o.getActiveAudioIndex();
  e.forEach((s) => {
    let d = s.getAttribute("data-amplitude-collection-key"), f = s.getAttribute("data-amplitude-audio-index");
    l == d && a == f ? s.innerHTML = c(this, I).seconds : s.innerHTML = "00";
  });
}, r(P, "collectionAudioFormattedTimeElementQuery", ".amplitude-current-time[data-amplitude-collection-key][data-amplitude-audio-index]"), r(P, "collectionAudioHoursTimeElementQuery", ".amplitude-current-hours[data-amplitude-collection-key][data-amplitude-audio-index]"), r(P, "collectionAudioMinutesTimeElementQuery", ".amplitude-current-minutes[data-amplitude-collection-key][data-amplitude-audio-index]"), r(P, "collectionAudioSecondsTimeElementQuery", ".amplitude-current-seconds[data-amplitude-collection-key][data-amplitude-audio-index]");
class ch {
  syncCurrentTime(e) {
    new M(e).sync(), new C(e).sync(), new _(e).sync(), new P(e).sync();
  }
  syncDurationTime() {
  }
  resetDurationTime() {
  }
}
var Nt, Dt, zn, yu, Un, vu, H, Pe;
const qn = class {
  constructor() {
    i(this, zn);
    i(this, Un);
    i(this, H);
    i(this, Nt, void 0);
    i(this, Dt, void 0);
    u(this, Dt, o.isIE());
  }
  initialize() {
    t(this, zn, yu).call(this), t(this, Un, vu).call(this);
  }
  static syncUI(e) {
    document.querySelectorAll(qn.globalTrackerQuery).forEach((a) => {
      a.value = e;
    });
  }
};
let at = qn;
Nt = new WeakMap(), Dt = new WeakMap(), zn = new WeakSet(), yu = function() {
  u(this, Nt, document.querySelectorAll(qn.globalTrackerQuery));
}, Un = new WeakSet(), vu = function() {
  c(this, Nt).forEach((e) => {
    c(this, Dt) ? (e.removeEventListener("change", t(this, H, Pe)), e.addEventListener("change", t(this, H, Pe).bind(this, e))) : (e.removeEventListener("input", t(this, H, Pe)), e.addEventListener("input", t(this, H, Pe).bind(this, e)));
  });
}, H = new WeakSet(), Pe = function(e) {
  if (!o.isLive()) {
    let l = e.value, a = zi.percentageInSeconds(l);
    new p().setCurrentTime(a);
  }
}, r(at, "globalTrackerQuery", 'input[type="range"].amplitude-audio-tracker:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])');
var Ht, Vt, Nn, gu, Dn, Eu, V, Qe;
const Hn = class {
  constructor() {
    i(this, Nn);
    i(this, Dn);
    i(this, V);
    i(this, Ht, void 0);
    i(this, Vt, void 0);
    u(this, Vt, o.isIE());
  }
  initialize() {
    t(this, Nn, gu).call(this), t(this, Dn, Eu).call(this);
  }
  static syncUI(e) {
    let l = document.querySelectorAll(Hn.collectionTrackerQuery), a = o.getActiveCollection();
    l.forEach((s) => {
      let d = s.getAttribute("data-amplitude-collection-key");
      a == d ? s.value = e : s.value = 0;
    });
  }
};
let ot = Hn;
Ht = new WeakMap(), Vt = new WeakMap(), Nn = new WeakSet(), gu = function() {
  u(this, Ht, document.querySelectorAll(Hn.collectionTrackerQuery));
}, Dn = new WeakSet(), Eu = function() {
  c(this, Ht).forEach((e) => {
    c(this, Vt) ? (e.removeEventListener("change", t(this, V, Qe)), e.addEventListener("change", t(this, V, Qe).bind(this, e))) : (e.removeEventListener("input", t(this, V, Qe)), e.addEventListener("input", t(this, V, Qe).bind(this, e)));
  });
}, V = new WeakSet(), Qe = function(e) {
  if (!o.isLive()) {
    let l = o.getActiveCollection(), a = e.getAttribute("data-amplitude-collection-key");
    if (l == a) {
      let s = e.value, d = zi.percentageInSeconds(s);
      new p().setCurrentTime(d);
    }
  }
}, r(ot, "collectionTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key]:not([data-amplitude-audio-index])');
var Ft, jt, Vn, Au, Fn, bu, F, ze;
const jn = class {
  constructor() {
    i(this, Vn);
    i(this, Fn);
    i(this, F);
    i(this, Ft, void 0);
    i(this, jt, void 0);
    u(this, jt, o.isIE());
  }
  initialize() {
    t(this, Vn, Au).call(this), t(this, Fn, bu).call(this);
  }
  static syncUI(e) {
    let l = document.querySelectorAll(jn.audioTrackerQuery), a = o.getActiveAudioIndex();
    l.forEach((s) => {
      let d = s.getAttribute("data-amplitude-audio-index");
      a == d ? s.value = e : s.value = 0;
    });
  }
};
let st = jn;
Ft = new WeakMap(), jt = new WeakMap(), Vn = new WeakSet(), Au = function() {
  u(this, Ft, document.querySelectorAll(jn.audioTrackerQuery));
}, Fn = new WeakSet(), bu = function() {
  c(this, Ft).forEach((e) => {
    c(this, jt) ? (e.removeEventListener("change", t(this, F, ze)), e.addEventListener("change", t(this, F, ze).bind(this, e))) : (e.removeEventListener("input", t(this, F, ze)), e.addEventListener("input", t(this, F, ze).bind(this, e)));
  });
}, F = new WeakSet(), ze = function(e) {
  if (!o.isLive()) {
    let l = o.getActiveAudioIndex(), a = e.getAttribute("data-amplitude-audio-index");
    if (l == a) {
      let s = e.value, d = zi.percentageInSeconds(s);
      new p().setCurrentTime(d);
    }
  }
}, r(st, "audioTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-audio-index]:not([data-amplitude-collection-key])');
var Ot, Bt, On, ku, Bn, xu, j, Ue;
const Kn = class {
  constructor() {
    i(this, On);
    i(this, Bn);
    i(this, j);
    i(this, Ot, void 0);
    i(this, Bt, void 0);
    u(this, Bt, o.isIE());
  }
  initialize() {
    t(this, On, ku).call(this), t(this, Bn, xu).call(this);
  }
  static syncUI(e) {
    let l = document.querySelectorAll(Kn.collectionAudioTrackerQuery), a = o.getActiveCollection(), s = o.getActiveAudioIndex();
    l.forEach((d) => {
      let f = d.getAttribute("data-amplitude-collection-key"), w = d.getAttribute("data-amplitude-audio-index");
      a == f && s == w ? d.value = e : d.value = 0;
    });
  }
};
let ct = Kn;
Ot = new WeakMap(), Bt = new WeakMap(), On = new WeakSet(), ku = function() {
  u(this, Ot, document.querySelectorAll(Kn.collectionAudioTrackerQuery));
}, Bn = new WeakSet(), xu = function() {
  c(this, Ot).forEach((e) => {
    c(this, Bt) ? (e.removeEventListener("change", t(this, j, Ue)), e.addEventListener("change", t(this, j, Ue).bind(this, e))) : (e.removeEventListener("input", t(this, j, Ue)), e.addEventListener("input", t(this, j, Ue).bind(this, e)));
  });
}, j = new WeakSet(), Ue = function(e) {
  if (!o.isLive()) {
    let l = o.getActiveCollection(), a = e.getAttribute("data-amplitude-collection-key"), s = o.getActiveAudioIndex(), d = e.getAttribute("data-amplitude-audio-index");
    if (l == a && s == d) {
      let f = e.value, w = zi.percentageInSeconds(f);
      new p().setCurrentTime(w);
    }
  }
}, r(ct, "collectionAudioTrackerQuery", 'input[type="range"].amplitude-audio-tracker[data-amplitude-collection-key][data-amplitude-audio-index]');
var Yn, Iu, Rn, Su, $n, Tu, Wn, wu;
class Lu {
  constructor() {
    i(this, Yn);
    i(this, Rn);
    i(this, $n);
    i(this, Wn);
  }
  setUp() {
    t(this, Yn, Iu).call(this), t(this, Rn, Su).call(this), t(this, $n, Tu).call(this), t(this, Wn, wu).call(this);
  }
  static syncCurrentTime(e) {
    at.syncUI(e), ot.syncUI(e), st.syncUI(e), ct.syncUI(e);
  }
}
Yn = new WeakSet(), Iu = function() {
  new at().initialize();
}, Rn = new WeakSet(), Su = function() {
  new ot().initialize();
}, $n = new WeakSet(), Tu = function() {
  new st().initialize();
}, Wn = new WeakSet(), wu = function() {
  new ct().initialize();
};
var Jn, Mu, Xn, Cu, O, qe, Zn, _u, Gn, Pu;
class uh {
  constructor() {
    i(this, Jn);
    i(this, Xn);
    i(this, O);
    i(this, Zn);
    i(this, Gn);
  }
  bind() {
    t(this, Jn, Mu).call(this), t(this, Xn, Cu).call(this);
  }
}
Jn = new WeakSet(), Mu = function() {
  n.audio_element.removeEventListener("timeupdate", t(this, O, qe).bind(this)), n.audio_element.addEventListener("timeupdate", t(this, O, qe).bind(this));
}, Xn = new WeakSet(), Cu = function() {
  n.audio_element.removeEventListener("durationchange", t(this, O, qe).bind(this)), n.audio_element.addEventListener("durationchange", t(this, O, qe).bind(this));
}, O = new WeakSet(), qe = function() {
  o.updateBufferedTime(), oh.syncAll(), t(this, Zn, _u).call(this), t(this, Gn, Pu).call(this);
}, Zn = new WeakSet(), _u = function() {
  if (!o.isLive()) {
    let e = new zi(), l = e.computeCurrentTimes(), a = e.computeAudioCompletionPercentage(), s = e.computeAudioDuration(), d = new ch();
    d.syncCurrentTime(l), d.syncDurationTime(l, s), Lu.syncCurrentTime(a), sh.syncCurrentTime(a);
  }
}, Gn = new WeakSet(), Pu = function() {
};
var ea, Qu, ta, zu, ia, Uu, la, qu, vs, rh, na, Nu;
class dh {
  constructor() {
    i(this, ea);
    i(this, ta);
    i(this, ia);
    i(this, la);
    i(this, vs);
    i(this, na);
  }
  initializeAllEvents() {
    y.writeMessage("Starting initialization of event handlers..."), t(this, ea, Qu).call(this), t(this, ta, zu).call(this), t(this, ia, Uu).call(this), t(this, la, qu).call(this), t(this, na, Nu).call(this);
  }
}
ea = new WeakSet(), Qu = function() {
  document.addEventListener("touchmove", () => {
    n.is_touch_moving = !0;
  }), document.addEventListener("touchend", () => {
    n.is_touch_moving || (n.is_touch_moving = !1);
  });
}, ta = new WeakSet(), zu = function() {
  new uh().bind();
}, ia = new WeakSet(), Uu = function() {
  new nh().bind();
}, la = new WeakSet(), qu = function() {
  new lh().bind();
}, vs = new WeakSet(), rh = function() {
  new ProgressEvent().bind();
}, na = new WeakSet(), Nu = function() {
};
var Kt, Yt, aa, Du, oa, Hu, B, Ne;
const Ts = class {
  constructor() {
    i(this, aa);
    i(this, oa);
    i(this, B);
    i(this, Kt, void 0);
    i(this, Yt, void 0);
    u(this, Yt, o.isMobile());
  }
  initialize() {
    t(this, aa, Du).call(this), t(this, oa, Hu).call(this);
  }
};
let Oi = Ts;
Kt = new WeakMap(), Yt = new WeakMap(), aa = new WeakSet(), Du = function() {
  u(this, Kt, document.querySelectorAll(Ts.collectionNextQuery));
}, oa = new WeakSet(), Hu = function() {
  c(this, Kt).forEach((e) => {
    c(this, Yt) ? (e.removeEventListener("touchend", t(this, B, Ne)), e.addEventListener("touchend", t(this, B, Ne))) : (e.removeEventListener("click", t(this, B, Ne)), e.addEventListener("click", t(this, B, Ne)));
  });
}, B = new WeakSet(), Ne = function() {
  let e = this.getAttribute("data-amplitude-collection-key");
  e == n.active_collection ? new v().next(e) : y.writeMessage("You can not go to the next audio on a playlist that is not being played!");
}, r(Oi, "collectionNextQuery", ".amplitude-next[data-amplitude-collection-key]");
var Rt, $t, sa, Vu, ca, Fu, K, De;
const ws = class {
  constructor() {
    i(this, sa);
    i(this, ca);
    i(this, K);
    i(this, Rt, void 0);
    i(this, $t, void 0);
    u(this, $t, o.isMobile());
  }
  initialize() {
    t(this, sa, Vu).call(this), t(this, ca, Fu).call(this);
  }
};
let Bi = ws;
Rt = new WeakMap(), $t = new WeakMap(), sa = new WeakSet(), Vu = function() {
  u(this, Rt, document.querySelectorAll(ws.globalNextQuery));
}, ca = new WeakSet(), Fu = function() {
  c(this, Rt).forEach((e) => {
    c(this, $t) ? (e.removeEventListener("touchend", t(this, K, De)), e.addEventListener("touchend", t(this, K, De))) : (e.removeEventListener("click", t(this, K, De)), e.addEventListener("click", t(this, K, De)));
  });
}, K = new WeakSet(), De = function() {
  o.getScope() == "collection" ? new v().next() : y.writeMessage("You can only navigate next when you are playing a collection.");
}, r(Bi, "globalNextQuery", ".amplitude-next:not([data-amplitude-collection-key])");
var ua, ju, da, Ou;
class hh {
  constructor() {
    i(this, ua);
    i(this, da);
  }
  setUp() {
    t(this, ua, ju).call(this), t(this, da, Ou).call(this);
  }
}
ua = new WeakSet(), ju = function() {
  new Bi().initialize();
}, da = new WeakSet(), Ou = function() {
  new Oi().initialize();
};
var Wt, Jt, ra, Bu, ha, Ku, Y, He;
const ft = class {
  constructor() {
    i(this, ra);
    i(this, ha);
    i(this, Y);
    i(this, Wt, void 0);
    i(this, Jt, void 0);
    u(this, Jt, o.isIE());
  }
  setUp() {
    t(this, ra, Bu).call(this), t(this, ha, Ku).call(this);
  }
  static syncElements() {
    document.querySelectorAll(ft.volumeSliderElementQuery).forEach(function(l) {
      l.value = o.getVolume();
    });
  }
};
let he = ft;
Wt = new WeakMap(), Jt = new WeakMap(), ra = new WeakSet(), Bu = function() {
  u(this, Wt, document.querySelectorAll(ft.volumeSliderElementQuery));
}, ha = new WeakSet(), Ku = function() {
  o.isIos() ? Debug.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4") : c(this, Wt).forEach((e) => {
    c(this, Jt) ? (e.removeEventListener("change", t(this, Y, He)), e.addEventListener("change", t(this, Y, He))) : (e.removeEventListener("input", t(this, Y, He)), e.addEventListener("input", t(this, Y, He)));
  });
}, Y = new WeakSet(), He = function() {
  new p().setVolume(this.value), T.syncElements(), ft.syncElements();
}, r(he, "volumeSliderElementQuery", 'input[type="range"].amplitude-volume-slider');
var Xt, Zt, ma, Yu, pa, Ru, R, Ve;
const yt = class {
  constructor() {
    i(this, ma);
    i(this, pa);
    i(this, R);
    i(this, Xt, void 0);
    i(this, Zt, void 0);
    u(this, Zt, o.isMobile());
  }
  setUp() {
    t(this, ma, Yu).call(this), t(this, pa, Ru).call(this);
  }
  static syncElements() {
    document.querySelectorAll(yt.muteElementQuery).forEach(function(l) {
      o.getVolume() == 0 ? (l.classList.remove("amplitude-not-muted"), l.classList.add("amplitude-muted")) : (l.classList.add("amplitude-not-muted"), l.classList.remove("amplitude-muted"));
    });
  }
};
let T = yt;
Xt = new WeakMap(), Zt = new WeakMap(), ma = new WeakSet(), Yu = function() {
  u(this, Xt, document.querySelectorAll(yt.muteElementQuery));
}, pa = new WeakSet(), Ru = function() {
  o.isIos() ? y.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4") : c(this, Xt).forEach((e) => {
    c(this, Zt) ? (e.removeEventListener("touchend", t(this, R, Ve)), e.addEventListener("touchend", t(this, R, Ve))) : (e.removeEventListener("click", t(this, R, Ve)), e.addEventListener("click", t(this, R, Ve)));
  });
}, R = new WeakSet(), Ve = function() {
  if (!o.isTouchMoving()) {
    let e = new p();
    o.getVolume() == 0 ? e.setVolume(o.getPreMuteVolume()) : (o.setPreMuteVolume(), e.setVolume(0)), yt.syncElements(), he.syncElements();
  }
}, r(T, "muteElementQuery", ".amplitude-mute");
var Gt, ei, fa, $u, ya, Wu, $, Fe;
const Ms = class {
  constructor() {
    i(this, fa);
    i(this, ya);
    i(this, $);
    i(this, Gt, void 0);
    i(this, ei, void 0);
    u(this, ei, o.isMobile());
  }
  initialize() {
    t(this, fa, $u).call(this), t(this, ya, Wu).call(this);
  }
};
let Ki = Ms;
Gt = new WeakMap(), ei = new WeakMap(), fa = new WeakSet(), $u = function() {
  u(this, Gt, document.querySelectorAll(Ms.globalPauseQuery));
}, ya = new WeakSet(), Wu = function() {
  c(this, Gt).forEach((e) => {
    c(this, ei) ? (e.removeEventListener("touchend", t(this, $, Fe)), e.addEventListener("touchend", t(this, $, Fe))) : (e.removeEventListener("click", t(this, $, Fe)), e.addEventListener("click", t(this, $, Fe)));
  });
}, $ = new WeakSet(), Fe = function() {
  o.isTouchMoving() || (new p().pause(), m.syncAll());
}, r(Ki, "globalPauseQuery", ".amplitude-pause:not([data-amplitude-audio-index]):not([data-amplitude-collection-key])");
var ti, ii, va, Ju, ga, Xu, W, je;
const Cs = class {
  constructor() {
    i(this, va);
    i(this, ga);
    i(this, W);
    i(this, ti, void 0);
    i(this, ii, void 0);
    u(this, ii, o.isMobile());
  }
  initialize() {
    t(this, va, Ju).call(this), t(this, ga, Xu).call(this);
  }
};
let Yi = Cs;
ti = new WeakMap(), ii = new WeakMap(), va = new WeakSet(), Ju = function() {
  u(this, ti, document.querySelectorAll(Cs.collectionPauseQuery));
}, ga = new WeakSet(), Xu = function() {
  c(this, ti).forEach((e) => {
    c(this, ii) ? (e.removeEventListener("touchend", t(this, W, je)), e.addEventListener("touchend", t(this, W, je))) : (e.removeEventListener("click", t(this, W, je)), e.addEventListener("click", t(this, W, je)));
  });
}, W = new WeakSet(), je = function() {
  if (!o.isTouchMoving()) {
    let e = this.getAttribute("data-amplitude-collection-key");
    config.active_collection == e && (new p().pause(), m.syncAll());
  }
}, r(Yi, "collectionPauseQuery", ".amplitude-pause[data-amplitude-collection-key]:not([data-amplitude-audio-index])");
var li, ni, Ea, Zu, Aa, Gu, J, Oe;
const _s = class {
  constructor() {
    i(this, Ea);
    i(this, Aa);
    i(this, J);
    i(this, li, void 0);
    i(this, ni, void 0);
    u(this, ni, o.isMobile());
  }
  initialize() {
    t(this, Ea, Zu).call(this), t(this, Aa, Gu).call(this);
  }
};
let Ri = _s;
li = new WeakMap(), ni = new WeakMap(), Ea = new WeakSet(), Zu = function() {
  u(this, li, document.querySelectorAll(_s.audioPauseQuery));
}, Aa = new WeakSet(), Gu = function() {
  c(this, li).forEach((e) => {
    c(this, ni) ? (e.removeEventListener("touchend", t(this, J, Oe)), e.addEventListener("touchend", t(this, J, Oe))) : (e.removeEventListener("click", t(this, J, Oe)), e.addEventListener("click", t(this, J, Oe)));
  });
}, J = new WeakSet(), Oe = function() {
  if (!o.isTouchMoving()) {
    let e = this.getAttribute("data-amplitude-audio-index");
    o.getScope() == "audio" && n.active_index == e && (new p().pause(), m.syncAll());
  }
}, r(Ri, "audioPauseQuery", ".amplitude-pause[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var ai, oi, ba, ed, ka, td, X, Be;
const Ps = class {
  constructor() {
    i(this, ba);
    i(this, ka);
    i(this, X);
    i(this, ai, void 0);
    i(this, oi, void 0);
    u(this, oi, o.isMobile());
  }
  initialize() {
    t(this, ba, ed).call(this), t(this, ka, td).call(this);
  }
};
let $i = Ps;
ai = new WeakMap(), oi = new WeakMap(), ba = new WeakSet(), ed = function() {
  u(this, ai, document.querySelectorAll(Ps.collectionAudioPauseQuery));
}, ka = new WeakSet(), td = function() {
  c(this, ai).forEach((e) => {
    c(this, oi) ? (e.removeEventListener("touchend", t(this, X, Be)), e.addEventListener("touchend", t(this, X, Be).bind(this, e))) : (e.removeEventListener("click", t(this, X, Be)), e.addEventListener("click", t(this, X, Be).bind(this, e)));
  });
}, X = new WeakSet(), Be = function() {
  if (!o.isTouchMoving()) {
    let e = element.getAttribute("data-amplitude-collection-key"), l = element.getAttribute("data-amplitude-audio-index");
    n.active_collection == e && n.collections[e].active_index == l && (new p().pause(), m.syncAll());
  }
}, r($i, "collectionAudioPauseQuery", ".amplitude-pause[data-amplitude-collection-key][data-amplitude-audio-index]");
var xa, id, La, ld, Ia, nd, Sa, ad;
class mh {
  constructor() {
    i(this, xa);
    i(this, La);
    i(this, Ia);
    i(this, Sa);
  }
  setUp() {
    t(this, xa, id).call(this), t(this, La, ld).call(this), t(this, Ia, nd).call(this), t(this, Sa, ad).call(this);
  }
}
xa = new WeakSet(), id = function() {
  new Ki().initialize();
}, La = new WeakSet(), ld = function() {
  new Yi().initialize();
}, Ia = new WeakSet(), nd = function() {
  new Ri().initialize();
}, Sa = new WeakSet(), ad = function() {
  new $i().initialize();
};
var si, ci, Ta, od, wa, sd, Z, Ke;
const Qs = class {
  constructor() {
    i(this, Ta);
    i(this, wa);
    i(this, Z);
    i(this, si, void 0);
    i(this, ci, void 0);
    u(this, ci, o.isMobile());
  }
  initialize() {
    t(this, Ta, od).call(this), t(this, wa, sd).call(this);
  }
};
let Wi = Qs;
si = new WeakMap(), ci = new WeakMap(), Ta = new WeakSet(), od = function() {
  u(this, si, document.querySelectorAll(Qs.globalPlayQuery));
}, wa = new WeakSet(), sd = function() {
  c(this, si).forEach((e) => {
    c(this, ci) ? (e.removeEventListener("touchend", t(this, Z, Ke)), e.addEventListener("touchend", t(this, Z, Ke))) : (e.removeEventListener("click", t(this, Z, Ke)), e.addEventListener("click", t(this, Z, Ke)));
  });
}, Z = new WeakSet(), Ke = function() {
  new p().play(), m.syncAll();
}, r(Wi, "globalPlayQuery", ".amplitude-play:not([data-amplitude-audio-index]):not([data-amplitude-collection-index])");
var ui, di, Ma, cd, Ca, ud, G, Ye, _a, dd, Pa, rd;
const zs = class {
  constructor() {
    i(this, Ma);
    i(this, Ca);
    i(this, G);
    i(this, _a);
    i(this, Pa);
    i(this, ui, void 0);
    i(this, di, void 0);
    u(this, di, o.isMobile());
  }
  initialize() {
    t(this, Ma, cd).call(this), t(this, Ca, ud).call(this);
  }
};
let Ji = zs;
ui = new WeakMap(), di = new WeakMap(), Ma = new WeakSet(), cd = function() {
  u(this, ui, document.querySelectorAll(zs.collectionPlayQuery));
}, Ca = new WeakSet(), ud = function() {
  c(this, ui).forEach((e) => {
    c(this, di) ? (e.removeEventListener("touchend", t(this, G, Ye)), e.addEventListener("touchend", t(this, G, Ye))) : (e.removeEventListener("click", t(this, G, Ye)), e.addEventListener("click", t(this, G, Ye)));
  });
}, G = new WeakSet(), Ye = function() {
  if (!o.isTouchMoving()) {
    let e = this.getAttribute("data-amplitude-collection-key");
    if (!E.collectionExists(e))
      return y.writeMessage('Collection with key "' + e + '" does not exist! Please define this collection in your configuration.'), !1;
    t(this, _a, dd).call(this, e), t(this, Pa, rd).call(this), m.syncAll();
  }
}, _a = new WeakSet(), dd = function(e) {
  if (E.collectionChanged(e)) {
    let l = new v();
    l.setActiveCollection(e), E.isCollectionShuffled(e) ? l.changeAudioCollection(e, n.collections[e].shuffle_list[0], 0, !0) : l.changeAudioCollection(e, n.collections[e].audio[0], 0);
  }
}, Pa = new WeakSet(), rd = function() {
  new p().play();
}, r(Ji, "collectionPlayQuery", ".amplitude-play[data-amplitude-collection-key]:not([data-amplitude-audio-index])");
var ri, hi, Qa, hd, za, md, ee, Re, Ua, pd, qa, fd, Na, yd;
const Us = class {
  constructor() {
    i(this, Qa);
    i(this, za);
    i(this, ee);
    i(this, Ua);
    i(this, qa);
    i(this, Na);
    i(this, ri, void 0);
    i(this, hi, void 0);
    u(this, hi, o.isMobile());
  }
  initialize() {
    t(this, Qa, hd).call(this), t(this, za, md).call(this);
  }
};
let Xi = Us;
ri = new WeakMap(), hi = new WeakMap(), Qa = new WeakSet(), hd = function() {
  u(this, ri, document.querySelectorAll(Us.audioPlayQuery));
}, za = new WeakSet(), md = function() {
  c(this, ri).forEach((e) => {
    c(this, hi) ? (e.removeEventListener("touchend", t(this, ee, Re)), e.addEventListener("touchend", t(this, ee, Re).bind(this, e))) : (e.removeEventListener("click", t(this, ee, Re)), e.addEventListener("click", t(this, ee, Re).bind(this, e)));
  });
}, ee = new WeakSet(), Re = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-audio-index");
    if (!Ie.audioExists(l))
      return y.writeMessage('Audio with index "' + l + '" does not exist! Please add an audio object at this index in your configuration.'), !1;
    t(this, Ua, pd).call(this, l), t(this, qa, fd).call(this, l), t(this, Na, yd).call(this), m.syncAll();
  }
}, Ua = new WeakSet(), pd = function(e) {
  if (E.collectionChanged(null)) {
    let l = new v(), a = new Se();
    l.setActiveCollection(null), a.changeAudio(n.audio[e], e, !0);
  }
}, qa = new WeakSet(), fd = function(e) {
  Ie.audioChanged(e) && new Se().changeAudio(n.audio[e], e, !0);
}, Na = new WeakSet(), yd = function() {
  new p().play();
}, r(Xi, "audioPlayQuery", ".amplitude-play[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var mi, pi, Da, vd, Ha, gd, te, $e, Va, Ed, Fa, Ad, ja, bd;
const qs = class {
  constructor() {
    i(this, Da);
    i(this, Ha);
    i(this, te);
    i(this, Va);
    i(this, Fa);
    i(this, ja);
    i(this, mi, void 0);
    i(this, pi, void 0);
    u(this, pi, o.isMobile());
  }
  initialize() {
    t(this, Da, vd).call(this), t(this, Ha, gd).call(this);
  }
};
let Zi = qs;
mi = new WeakMap(), pi = new WeakMap(), Da = new WeakSet(), vd = function() {
  u(this, mi, document.querySelectorAll(qs.collectionAudioPlayQuery));
}, Ha = new WeakSet(), gd = function() {
  c(this, mi).forEach((e) => {
    c(this, pi) ? (e.removeEventListener("touchend", t(this, te, $e)), e.addEventListener("touchend", t(this, te, $e))) : (e.removeEventListener("click", t(this, te, $e)), e.addEventListener("click", t(this, te, $e)));
  });
}, te = new WeakSet(), $e = function() {
  if (!o.isTouchMoving()) {
    let e = this.getAttribute("data-amplitude-collection-key"), l = this.getAttribute("data-amplitude-audio-index");
    t(this, Va, Ed).call(this, e, l), t(this, Fa, Ad).call(this, e, l), t(this, ja, bd).call(this), m.syncAll();
  }
}, Va = new WeakSet(), Ed = function(e, l) {
  if (E.collectionChanged(e)) {
    let a = new v();
    a.setActiveCollection(e), a.changeAudioCollection(e, n.collections[e].audio[l], l, !0);
  }
}, Fa = new WeakSet(), Ad = function(e, l) {
  Ie.audioChanged(l, e) && new v().changeAudioCollection(e, n.collections[e].audio[l], l, !0);
}, ja = new WeakSet(), bd = function() {
  new p().play();
}, r(Zi, "collectionAudioPlayQuery", ".amplitude-play[data-amplitude-audio-index][data-amplitude-collection-key]");
var Oa, kd, Ba, xd, Ka, Ld, Ya, Id;
class ph {
  constructor() {
    i(this, Oa);
    i(this, Ba);
    i(this, Ka);
    i(this, Ya);
  }
  setUp() {
    t(this, Oa, kd).call(this), t(this, Ba, xd).call(this), t(this, Ka, Ld).call(this), t(this, Ya, Id).call(this);
  }
}
Oa = new WeakSet(), kd = function() {
  new Wi().initialize();
}, Ba = new WeakSet(), xd = function() {
  new Ji().initialize();
}, Ka = new WeakSet(), Ld = function() {
  new Xi().initialize();
}, Ya = new WeakSet(), Id = function() {
  new Zi().initialize();
};
var fi, yi, Ra, Sd, $a, Td, ie, We;
const vt = class {
  constructor() {
    i(this, Ra);
    i(this, $a);
    i(this, ie);
    i(this, fi, void 0);
    i(this, yi, void 0);
    u(this, yi, o.isMobile());
  }
  setUp() {
    t(this, Ra, Sd).call(this), t(this, $a, Td).call(this);
  }
  static syncElements() {
    document.querySelectorAll(vt.playbackSpeedElementQuery).forEach(function(l) {
      switch (l.classList.remove("amplitude-playback-speed-10"), l.classList.remove("amplitude-playback-speed-15"), l.classList.remove("amplitude-playback-speed-20"), o.getPlaybackSpeed()) {
        case 1:
          l.classList.add("amplitude-playback-speed-10");
          break;
        case 1.5:
          l.classList.add("amplitude-playback-speed-15");
          break;
        case 2:
          l.classList.add("amplitude-playback-speed-20");
          break;
      }
    });
  }
};
let ut = vt;
fi = new WeakMap(), yi = new WeakMap(), Ra = new WeakSet(), Sd = function() {
  u(this, fi, document.querySelectorAll(vt.playbackSpeedElementQuery));
}, $a = new WeakSet(), Td = function() {
  c(this, fi).forEach((e) => {
    c(this, yi) ? (e.removeEventListener("touchend", t(this, ie, We)), e.addEventListener("touchend", t(this, ie, We))) : (e.removeEventListener("click", t(this, ie, We)), e.addEventListener("click", t(this, ie, We)));
  });
}, ie = new WeakSet(), We = function() {
  if (!o.isTouchMoving()) {
    let e = new p();
    switch (o.getPlaybackSpeed()) {
      case 1:
        e.setPlaybackSpeed(1.5);
        break;
      case 1.5:
        e.setPlaybackSpeed(2);
        break;
      case 2:
        e.setPlaybackSpeed(1);
        break;
    }
    vt.syncElements();
  }
}, r(ut, "playbackSpeedElementQuery", ".amplitude-playback-speed");
var vi, gi, Wa, wd, Ja, Md, le, Je;
const Ns = class {
  constructor() {
    i(this, Wa);
    i(this, Ja);
    i(this, le);
    i(this, vi, void 0);
    i(this, gi, void 0);
    u(this, gi, o.isMobile());
  }
  initialize() {
    t(this, Wa, wd).call(this), t(this, Ja, Md).call(this);
  }
};
let Gi = Ns;
vi = new WeakMap(), gi = new WeakMap(), Wa = new WeakSet(), wd = function() {
  u(this, vi, document.querySelectorAll(Ns.collectionPreviousQuery));
}, Ja = new WeakSet(), Md = function() {
  c(this, vi).forEach((e) => {
    c(this, gi) ? (e.removeEventListener("touchend", t(this, le, Je)), e.addEventListener("touchend", t(this, le, Je))) : (e.removeEventListener("click", t(this, le, Je)), e.addEventListener("click", t(this, le, Je)));
  });
}, le = new WeakSet(), Je = function() {
  o.isTouchMoving() || (this.getAttribute("data-amplitude-collection-key") == config.active_collection ? new v().previous() : y.writeMessage("You can not go to the previous audio on a playlist that is not being played!"));
}, r(Gi, "collectionPreviousQuery", ".amplitude-previous[data-amplitude-collection-key]");
var Ei, Ai, Xa, Cd, Za, _d, ne, Xe;
const Ds = class {
  constructor() {
    i(this, Xa);
    i(this, Za);
    i(this, ne);
    i(this, Ei, void 0);
    i(this, Ai, void 0);
    u(this, Ai, o.isMobile());
  }
  initialize() {
    t(this, Xa, Cd).call(this), t(this, Za, _d).call(this);
  }
};
let el = Ds;
Ei = new WeakMap(), Ai = new WeakMap(), Xa = new WeakSet(), Cd = function() {
  u(this, Ei, document.querySelectorAll(Ds.globalPreviousQuery));
}, Za = new WeakSet(), _d = function() {
  c(this, Ei).forEach((e) => {
    c(this, Ai) ? (e.removeEventListener("touchend", t(this, ne, Xe)), e.addEventListener("touchend", t(this, ne, Xe))) : (e.removeEventListener("click", t(this, ne, Xe)), e.addEventListener("click", t(this, ne, Xe)));
  });
}, ne = new WeakSet(), Xe = function() {
  o.isTouchMoving() || (o.getScope() == "collection" ? new v().previous() : y.writeMessage("You can only navigate previous when you are playing a collection."));
}, r(el, "globalPreviousQuery", ".amplitude-previous:not([data-amplitude-collection-key])");
var Ga, Pd, eo, Qd;
class fh {
  constructor() {
    i(this, Ga);
    i(this, eo);
  }
  setUp() {
    t(this, Ga, Pd).call(this), t(this, eo, Qd).call(this);
  }
}
Ga = new WeakSet(), Pd = function() {
  new el().initialize();
}, eo = new WeakSet(), Qd = function() {
  new Gi().initialize();
};
var to, io, Ud, lo, qd;
class zd {
  constructor(e) {
    i(this, io);
    i(this, lo);
    i(this, to, void 0);
    u(this, to, e);
  }
  toggleShuffle(e) {
    if (o.isCollectionShuffled(e))
      o.setCollectionShuffled(e, !1, []);
    else {
      let a = t(this, io, Ud).call(this, e);
      o.setCollectionShuffled(e, !0, a);
    }
  }
}
to = new WeakMap(), io = new WeakSet(), Ud = function(e) {
  let l = o.getCollectionAudio(e), a = new Array(l.length);
  l.forEach((s, d) => {
    a[d] = s[d];
  });
  for (let s = l.length - 1; s > 0; s--) {
    let d = Math.floor(Math.random() * l.length + 1);
    t(this, lo, qd).call(this, a, s, d - 1);
  }
  return a;
}, lo = new WeakSet(), qd = function(e, l, a) {
  let s = e[l];
  e[l] = e[a], e[a] = s;
};
var bi, ki, no, Nd, ao, Dd, ae, Ze;
const oo = class {
  constructor() {
    i(this, no);
    i(this, ao);
    i(this, ae);
    i(this, bi, void 0);
    i(this, ki, void 0);
    u(this, ki, o.isMobile());
  }
  initialize() {
    t(this, no, Nd).call(this), t(this, ao, Dd).call(this);
  }
  static syncUI(e) {
    document.querySelectorAll('.amplitude-shuffle[data-amplitude-collection="' + e + '"]').forEach((a) => {
      o.isCollectionShuffled(e) ? (a.classList.add("amplitude-shuffle-on"), a.classList.remove("amplitude-shuffle-off")) : (a.classList.add("amplitude-shuffle-off"), a.classList.remove("amplitude-shuffle-on"));
    });
  }
};
let dt = oo;
bi = new WeakMap(), ki = new WeakMap(), no = new WeakSet(), Nd = function() {
  u(this, bi, document.querySelectorAll(oo.collectionShuffleQuery));
}, ao = new WeakSet(), Dd = function() {
  c(this, bi).forEach((e) => {
    c(this, ki) ? (e.removeEventListener("touchend", t(this, ae, Ze)), e.addEventListener("touchend", t(this, ae, Ze))) : (e.removeEventListener("click", t(this, ae, Ze)), e.addEventListener("click", t(this, ae, Ze)));
  });
}, ae = new WeakSet(), Ze = function() {
  let e = this.getAttribute("data-amplitude-collection-key");
  new zd(e).toggleShuffle(), oo.syncUI(e);
}, r(dt, "collectionShuffleQuery", ".amplitude-shuffle[data-amplitude-collection-key]");
var xi, Li, so, Hd, co, Vd, oe, Ge;
const gt = class {
  constructor() {
    i(this, so);
    i(this, co);
    i(this, oe);
    i(this, xi, void 0);
    i(this, Li, void 0);
    u(this, Li, o.isMobile());
  }
  initialize() {
    t(this, so, Hd).call(this), t(this, co, Vd).call(this);
  }
  static syncUI() {
    let e = document.querySelectorAll(gt.globalShuffleQuery), l = o.getActiveCollection();
    e.forEach((a) => {
      o.isCollectionShuffled(l) ? (a.classList.add("amplitude-shuffle-on"), a.classList.remove("amplitude-shuffle-off")) : (a.classList.add("amplitude-shuffle-off"), a.classList.remove("amplitude-shuffle-on"));
    });
  }
};
let tl = gt;
xi = new WeakMap(), Li = new WeakMap(), so = new WeakSet(), Hd = function() {
  u(this, xi, document.querySelectorAll(gt.globalShuffleQuery));
}, co = new WeakSet(), Vd = function() {
  c(this, xi).forEach((e) => {
    c(this, Li) ? (e.removeEventListener("touchend", t(this, oe, Ge)), e.addEventListener("touchend", t(this, oe, Ge))) : (e.removeEventListener("click", t(this, oe, Ge)), e.addEventListener("click", t(this, oe, Ge)));
  });
}, oe = new WeakSet(), Ge = function() {
  if (o.getScope() == "collection") {
    let e = o.getActiveCollection();
    new zd(collectionKey).toggleShuffle(), gt.syncUI(), dt.syncUI(e);
  } else
    y.writeMessage("You can only shuffle a collection if you are playing a collection.");
}, r(tl, "globalShuffleQuery", ".amplitude-shuffle:not([data-amplitude-collection-key])");
var uo, Fd, ro, jd;
class yh {
  constructor() {
    i(this, uo);
    i(this, ro);
  }
  setUp() {
    t(this, uo, Fd).call(this), t(this, ro, jd).call(this);
  }
}
uo = new WeakSet(), Fd = function() {
  new tl().initialize();
}, ro = new WeakSet(), jd = function() {
  new dt().initialize();
};
var Ii, Si, ho, Od, mo, Bd, se, et, po, Kd, fo, Yd, yo, Rd, vo, $d;
const Hs = class {
  constructor() {
    i(this, ho);
    i(this, mo);
    i(this, se);
    i(this, po);
    i(this, fo);
    i(this, yo);
    i(this, vo);
    i(this, Ii, void 0);
    i(this, Si, void 0);
    u(this, Si, o.isMobile());
  }
  initialize() {
    t(this, ho, Od).call(this), t(this, mo, Bd).call(this);
  }
};
let il = Hs;
Ii = new WeakMap(), Si = new WeakMap(), ho = new WeakSet(), Od = function() {
  u(this, Ii, document.querySelectorAll(Hs.audioSkipToElementQuery));
}, mo = new WeakSet(), Bd = function() {
  c(this, Ii).forEach((e) => {
    c(this, Si) ? (e.removeEventListener("touchend", t(this, se, et)), e.addEventListener("touchend", t(this, se, et).bind(this, e))) : (e.removeEventListener("click", t(this, se, et)), e.addEventListener("click", t(this, se, et).bind(this, e)));
  });
}, se = new WeakSet(), et = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-audio-index"), a = e.getAttribute("data-amplitude-location");
    t(this, po, Kd).call(this, l, a) && (t(this, fo, Yd).call(this, l), t(this, yo, Rd).call(this), m.syncAll(), t(this, vo, $d).call(this, a));
  }
}, po = new WeakSet(), Kd = function(e, l) {
  return e == null ? (y.writeMessage("You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element."), !1) : l == null ? (y.writeMessage("You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element."), !1) : !0;
}, fo = new WeakSet(), Yd = function(e) {
  new Se().changeAudio(n.audio[parseInt(e)], parseInt(e), !0);
}, yo = new WeakSet(), Rd = function() {
  new p().play();
}, vo = new WeakSet(), $d = function(e) {
  new p().skipToLocation(parseInt(e));
}, r(il, "audioSkipToElementQuery", ".amplitude-skip-to[data-amplitude-audio-index]:not([data-amplitude-collection-key])");
var Ti, wi, go, Wd, Eo, Jd, ce, tt, Ao, Xd, bo, Zd, ko, Gd, xo, er, Lo, tr;
const Vs = class {
  constructor() {
    i(this, go);
    i(this, Eo);
    i(this, ce);
    i(this, Ao);
    i(this, bo);
    i(this, ko);
    i(this, xo);
    i(this, Lo);
    i(this, Ti, void 0);
    i(this, wi, void 0);
    u(this, wi, o.isMobile());
  }
  initialize() {
    t(this, go, Wd).call(this), t(this, Eo, Jd).call(this);
  }
};
let ll = Vs;
Ti = new WeakMap(), wi = new WeakMap(), go = new WeakSet(), Wd = function() {
  u(this, Ti, document.querySelectorAll(Vs.collectionAudioSkipToElementQuery));
}, Eo = new WeakSet(), Jd = function() {
  c(this, Ti).forEach((e) => {
    c(this, wi) ? (e.removeEventListener("touchend", t(this, ce, tt)), e.addEventListener("touchend", t(this, ce, tt).bind(this, e))) : (e.removeEventListener("click", t(this, ce, tt)), e.addEventListener("click", t(this, ce, tt).bind(this, e)));
  });
}, ce = new WeakSet(), tt = function(e) {
  if (!o.isTouchMoving()) {
    let l = e.getAttribute("data-amplitude-audio-index"), a = e.getAttribute("data-amplitude-collection-key"), s = e.getAttribute("data-amplitude-location");
    t(this, Ao, Xd).call(this, l, a, s) && (t(this, bo, Zd).call(this, a), t(this, ko, Gd).call(this, l, a), t(this, xo, er).call(this), m.syncAll(), t(this, Lo, tr).call(this, s));
  }
}, Ao = new WeakSet(), Xd = function(e, l, a) {
  return e == null ? (Debug.writeMessage("You must add a `data-amplitude-audio-index` attribute to your `amplitude-skip-to` element."), !1) : l == null ? (Debug.writeMessage("You must add a valid `data-amplitude-collection-key` attribute to your `amplitude-skip-to` element."), !1) : a == null ? (Debug.writeMessage("You must add a `data-amplitude-location` attribute in seconds to your `amplitude-skip-to` element."), !1) : !0;
}, bo = new WeakSet(), Zd = function(e) {
  E.collectionChanged(e) && new v().setActiveCollection(e);
}, ko = new WeakSet(), Gd = function(e, l) {
  new v().changeAudioCollection(l, config.collections[l].audio[parseInt(e)], parseInt(e), !0);
}, xo = new WeakSet(), er = function() {
  new p().play();
}, Lo = new WeakSet(), tr = function(e) {
  new p().skipToLocation(parseInt(e));
}, r(ll, "collectionAudioSkipToElementQuery", ".amplitude-skip-to[data-amplitude-audio-index][data-amplitude-collection-key]");
var Io, ir, So, lr;
class vh {
  constructor() {
    i(this, Io);
    i(this, So);
  }
  setUp() {
    t(this, Io, ir).call(this), t(this, So, lr).call(this);
  }
}
Io = new WeakSet(), ir = function() {
  new il().initialize();
}, So = new WeakSet(), lr = function() {
  new ll().initialize();
};
var Mi, Ci, To, nr, wo, ar, ue, it;
const Fs = class {
  constructor() {
    i(this, To);
    i(this, wo);
    i(this, ue);
    i(this, Mi, void 0);
    i(this, Ci, void 0);
    u(this, Ci, o.isMobile());
  }
  setUp() {
    t(this, To, nr).call(this), t(this, wo, ar).call(this);
  }
};
let nl = Fs;
Mi = new WeakMap(), Ci = new WeakMap(), To = new WeakSet(), nr = function() {
  u(this, Mi, document.querySelectorAll(Fs.stopElementQuery));
}, wo = new WeakSet(), ar = function() {
  c(this, Mi).forEach((e) => {
    c(this, Ci) ? (e.removeEventListener("touchend", t(this, ue, it)), e.addEventListener("touchend", t(this, ue, it))) : (e.removeEventListener("click", t(this, ue, it)), e.addEventListener("click", t(this, ue, it)));
  });
}, ue = new WeakSet(), it = function() {
  o.isTouchMoving() || (new p().stop(), m.syncAll());
}, r(nl, "stopElementQuery", ".amplitude-stop");
var ke, _i, Mo, or, Co, sr, de, lt;
const js = class {
  constructor() {
    i(this, Mo);
    i(this, Co);
    i(this, de);
    i(this, ke, void 0);
    i(this, _i, void 0);
    u(this, _i, o.isMobile());
  }
  setUp() {
    t(this, Mo, or).call(this), t(this, Co, sr).call(this);
  }
};
let al = js;
ke = new WeakMap(), _i = new WeakMap(), Mo = new WeakSet(), or = function() {
  u(this, ke, document.querySelectorAll(js.volumeDownElementQuery));
}, Co = new WeakSet(), sr = function() {
  c(this, ke).length > 0 && o.isIos() ? y.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4") : c(this, ke).forEach((e) => {
    c(this, _i) ? (e.removeEventListener("touchend", t(this, de, lt)), e.addEventListener("touchend", t(this, de, lt))) : (e.removeEventListener("click", t(this, de, lt)), e.addEventListener("click", t(this, de, lt)));
  });
}, de = new WeakSet(), lt = function() {
  if (!o.isTouchMoving()) {
    let e = new p(), l = o.getVolume(), a = o.getVolumeDecrement();
    l - a > 0 ? e.setVolume(l - a) : e.setVolume(0), T.syncElements(), he.syncElements();
  }
}, r(al, "volumeDownElementQuery", ".amplitude-volume-down");
var xe, Pi, _o, cr, Po, ur, re, nt;
const Os = class {
  constructor() {
    i(this, _o);
    i(this, Po);
    i(this, re);
    i(this, xe, void 0);
    i(this, Pi, void 0);
    u(this, Pi, o.isMobile());
  }
  setUp() {
    t(this, _o, cr).call(this), t(this, Po, ur).call(this);
  }
};
let ol = Os;
xe = new WeakMap(), Pi = new WeakMap(), _o = new WeakSet(), cr = function() {
  u(this, xe, document.querySelectorAll(Os.volumeUpElementQuery));
}, Po = new WeakSet(), ur = function() {
  c(this, xe).length > 0 && o.isIos() ? y.writeMessage("iOS does NOT allow volume to be set through javascript: https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW4") : c(this, xe).forEach((e) => {
    c(this, Pi) ? (e.removeEventListener("touchend", t(this, re, nt)), e.addEventListener("touchend", t(this, re, nt))) : (e.removeEventListener("click", t(this, re, nt)), e.addEventListener("click", t(this, re, nt)));
  });
}, re = new WeakSet(), nt = function() {
  if (!o.isTouchMoving()) {
    let e = new p(), l = o.getVolume(), a = o.getVolumeIncrement();
    l + a <= 100 ? e.setVolume(l + a) : e.setVolume(100), T.syncElements(), he.syncElements();
  }
}, r(ol, "volumeUpElementQuery", ".amplitude-volume-up");
var Qo, dr, zo, rr, Uo, hr, qo, mr, No, pr, Do, fr, Ho, yr, Vo, vr, Fo, gr, jo, Er, Oo, Ar, Bo, br, Ko, kr, Yo, xr, Ro, Lr;
class gh {
  constructor() {
    i(this, Qo);
    i(this, zo);
    i(this, Uo);
    i(this, qo);
    i(this, No);
    i(this, Do);
    i(this, Ho);
    i(this, Vo);
    i(this, Fo);
    i(this, jo);
    i(this, Oo);
    i(this, Bo);
    i(this, Ko);
    i(this, Yo);
    i(this, Ro);
  }
  setVisualElementsDefaults() {
  }
  initializeElements() {
    t(this, Qo, dr).call(this), t(this, zo, rr).call(this), t(this, Uo, hr).call(this), t(this, qo, mr).call(this), t(this, No, pr).call(this), t(this, Do, fr).call(this), t(this, Ho, yr).call(this), t(this, Vo, vr).call(this), t(this, Fo, gr).call(this), t(this, jo, Er).call(this), t(this, Oo, Ar).call(this), t(this, Bo, br).call(this), t(this, Ko, kr).call(this), t(this, Yo, xr).call(this), t(this, Ro, Lr).call(this);
  }
}
Qo = new WeakSet(), dr = function() {
  new A().syncMetaData();
}, zo = new WeakSet(), rr = function() {
  new ph().setUp();
}, Uo = new WeakSet(), hr = function() {
  new mh().setUp();
}, qo = new WeakSet(), mr = function() {
  new m().setUp();
}, No = new WeakSet(), pr = function() {
  new hh().setUp();
}, Do = new WeakSet(), fr = function() {
  new fh().setUp();
}, Ho = new WeakSet(), yr = function() {
  new T().setUp();
}, Vo = new WeakSet(), vr = function() {
  new he().setUp();
}, Fo = new WeakSet(), gr = function() {
  new ut().setUp();
}, jo = new WeakSet(), Er = function() {
  new nl().setUp();
}, Oo = new WeakSet(), Ar = function() {
  new al().setUp();
}, Bo = new WeakSet(), br = function() {
  new ol().setUp();
}, Ko = new WeakSet(), kr = function() {
  new yh().setUp();
}, Yo = new WeakSet(), xr = function() {
  new vh().setUp();
}, Ro = new WeakSet(), Lr = function() {
  new Lu().setUp();
};
var $o, Ir, Wo, Sr, Jo, Tr, Xo, wr;
class Eh {
  constructor() {
    i(this, $o);
    i(this, Wo);
    i(this, Jo);
    i(this, Xo);
  }
  initializeCollections() {
    n.collections.length > 0 && (t(this, $o, Ir).call(this), t(this, Wo, Sr).call(this), t(this, Jo, Tr).call(this), t(this, Xo, wr).call(this));
  }
}
$o = new WeakSet(), Ir = function() {
}, Wo = new WeakSet(), Sr = function() {
  n.collections.forEach((e) => {
    e.active_index = null;
  });
}, Jo = new WeakSet(), Tr = function() {
  n.collections.forEach((e) => {
    e.shuffle = !1, e.shuffle_list = [];
  });
}, Xo = new WeakSet(), wr = function() {
  n.collections.forEach((e) => {
    e.repeat = !1;
  }), console.log(n);
};
var Zo, Mr, Go, Cr;
class Ah {
  constructor() {
    i(this, Zo);
    i(this, Go);
  }
  copyUserSettings(e) {
    this.setAudio(e.audio), this.setCollections(e.collections), this.setVolume(e.volume), this.setDebug(e.debug), this.setDefaultArtwork(e.default_artwork), this.setPlaybackSpeed(e.playback_speed), this.setCallbacks(e.callbacks);
  }
  setAudio(e) {
    n.audio = e != null ? e : [], t(this, Zo, Mr).call(this), t(this, Go, Cr).call(this);
  }
  setCollections(e) {
    n.collections = e, new Eh().initializeCollections();
  }
  setVolume(e) {
    n.volume.current = e && e.initial ? e.initial : 50, n.volume.increment = e && e.increment ? e.increment : 5, n.volume.decrement = e && e.decrement ? e.decrement : 5, T.syncElements();
  }
  setDebug(e) {
    n.debug = e != null ? e : !1;
  }
  setDefaultArtwork(e) {
    n.default_artwork = e != null ? e : !1;
  }
  setPlaybackSpeed(e) {
    n.playback_speed = e != null ? e : 1, ut.syncElements();
  }
  setCallbacks(e) {
    n.callbacks = e != null ? e : [];
  }
}
Zo = new WeakSet(), Mr = function() {
  n.audio.forEach((e, l) => {
    e.live == null && (e.live = !1);
  });
}, Go = new WeakSet(), Cr = function() {
  n.audio.forEach((e, l) => {
    e.index = l;
  });
};
var es, S, Le, gs, ts, _r, is, Pr, Qi, ys, ls, Qr, ns, zr, as, Ur, os, qr, ss, Nr, cs, Dr;
class bh {
  constructor(e, l) {
    i(this, ts);
    i(this, is);
    i(this, Qi);
    i(this, ls);
    i(this, ns);
    i(this, as);
    i(this, os);
    i(this, ss);
    i(this, cs);
    i(this, es, void 0);
    i(this, S, void 0);
    i(this, Le, void 0);
    i(this, gs, !1);
    u(this, Le, new o()), c(this, Le).setIsMobile(), u(this, S, e), u(this, es, l);
  }
  setup() {
    t(this, ts, _r).call(this, c(this, S)) ? t(this, is, Pr).call(this) : t(this, Qi, ys).call(this);
  }
}
es = new WeakMap(), S = new WeakMap(), Le = new WeakMap(), gs = new WeakMap(), ts = new WeakSet(), _r = function(e) {
  try {
    new URL(e);
  } catch {
    return y.writeMessage("AmplitudeJS must be initialized with a JSON object or a valid URL."), !1;
  }
  return !0;
}, is = new WeakSet(), Pr = function() {
  fetch(c(this, S)).then((e) => {
    if (e.status != 200)
      throw e.status;
    return e.json();
  }).then((e) => {
    u(this, S, e), t(this, Qi, ys).call(this);
  }).catch((e) => {
    y.writeMessage(e);
  });
}, Qi = new WeakSet(), ys = function() {
  t(this, ls, Qr).call(this), t(this, ns, zr).call(this), t(this, os, qr).call(this), t(this, as, Ur).call(this), t(this, ss, Nr).call(this), t(this, cs, Dr).call(this);
}, ls = new WeakSet(), Qr = function() {
  c(this, Le).resetConfig();
}, ns = new WeakSet(), zr = function() {
  new Ah().copyUserSettings(c(this, S));
}, as = new WeakSet(), Ur = function() {
  new dh().initializeAllEvents();
}, os = new WeakSet(), qr = function() {
  let e = new Se();
  n.start_audio || e.changeAudio(n.audio[0], 0);
}, ss = new WeakSet(), Nr = function() {
  new gh().initializeElements();
}, cs = new WeakSet(), Dr = function() {
  new g().handleNativeAudioElementEvents();
};
function kh(h = {}, e = null) {
  new bh(h, e).setup();
}
const xh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  init: kh
}, Symbol.toStringTag, { value: "Module" }));
function Lh() {
  return n;
}
const Ih = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getConfig: Lh
}, Symbol.toStringTag, { value: "Module" }));
function Sh() {
  return n.active_playlist;
}
const Th = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getActivePlaylist: Sh
}, Symbol.toStringTag, { value: "Module" })), wh = [
  "abort",
  "error",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "pause",
  "playing",
  "play",
  "progress",
  "ratechange",
  "seeked",
  "seeking",
  "stalled",
  "suspend",
  "timeupdate",
  "volumechange",
  "waiting",
  "canplay",
  "canplaythrough",
  "durationchange",
  "ended"
];
function Mh(h, e) {
  wh.indexOf(h) > -1 ? n.audio_element.addEventListener(h, e) : y.writeMessage("Invalid event listener. Please see all valid events here: https://www.w3schools.com/tags/ref_av_dom.asp");
}
const Ch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addAudioEventListener: Mh
}, Symbol.toStringTag, { value: "Module" })), Ph = function() {
  return {
    ...xh,
    ...Ih,
    ...Th,
    ...Ch
  };
}();
export {
  Ph as default
};
//# sourceMappingURL=amplitude.mjs.map
