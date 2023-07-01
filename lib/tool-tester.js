var w;
(function(e) {
  e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment";
})(w || (w = {}));
function Qt(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Oe(e) {
  var t = e == null ? void 0 : e.host;
  return (t == null ? void 0 : t.shadowRoot) === e;
}
function Le(e) {
  return Object.prototype.toString.call(e) === "[object ShadowRoot]";
}
function Vr(e) {
  return e.includes(" background-clip: text;") && !e.includes(" -webkit-background-clip: text;") && (e = e.replace(" background-clip: text;", " -webkit-background-clip: text; background-clip: text;")), e;
}
function at(e) {
  try {
    var t = e.rules || e.cssRules;
    return t ? Vr(Array.from(t).map(Xt).join("")) : null;
  } catch {
    return null;
  }
}
function Xt(e) {
  var t = e.cssText;
  if (Ur(e))
    try {
      t = at(e.styleSheet) || t;
    } catch {
    }
  return t;
}
function Ur(e) {
  return "styleSheet" in e;
}
var pt = function() {
  function e() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
  return e.prototype.getId = function(t) {
    var r;
    if (!t)
      return -1;
    var i = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
    return i ?? -1;
  }, e.prototype.getNode = function(t) {
    return this.idNodeMap.get(t) || null;
  }, e.prototype.getIds = function() {
    return Array.from(this.idNodeMap.keys());
  }, e.prototype.getMeta = function(t) {
    return this.nodeMetaMap.get(t) || null;
  }, e.prototype.removeNodeFromMap = function(t) {
    var r = this, i = this.getId(t);
    this.idNodeMap.delete(i), t.childNodes && t.childNodes.forEach(function(n) {
      return r.removeNodeFromMap(n);
    });
  }, e.prototype.has = function(t) {
    return this.idNodeMap.has(t);
  }, e.prototype.hasNode = function(t) {
    return this.nodeMetaMap.has(t);
  }, e.prototype.add = function(t, r) {
    var i = r.id;
    this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r);
  }, e.prototype.replace = function(t, r) {
    var i = this.getNode(t);
    if (i) {
      var n = this.nodeMetaMap.get(i);
      n && this.nodeMetaMap.set(r, n);
    }
    this.idNodeMap.set(t, r);
  }, e.prototype.reset = function() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }, e;
}();
function Jt() {
  return new pt();
}
function mt(e) {
  var t = e.element, r = e.maskInputOptions, i = e.tagName, n = e.type, s = e.value, a = e.maskInputFn, o = s || "", l = n && n.toLowerCase();
  return (r[i.toLowerCase()] || l && r[l]) && (a ? o = a(o, t) : o = "*".repeat(o.length)), o;
}
var Ct = "__rrweb_original__";
function Gr(e) {
  var t = e.getContext("2d");
  if (!t)
    return !0;
  for (var r = 50, i = 0; i < e.width; i += r)
    for (var n = 0; n < e.height; n += r) {
      var s = t.getImageData, a = Ct in s ? s[Ct] : s, o = new Uint32Array(a.call(t, i, n, Math.min(r, e.width - i), Math.min(r, e.height - n)).data.buffer);
      if (o.some(function(l) {
        return l !== 0;
      }))
        return !1;
    }
  return !0;
}
function Pr(e, t) {
  return !e || !t || e.type !== t.type ? !1 : e.type === w.Document ? e.compatMode === t.compatMode : e.type === w.DocumentType ? e.name === t.name && e.publicId === t.publicId && e.systemId === t.systemId : e.type === w.Comment || e.type === w.Text || e.type === w.CDATA ? e.textContent === t.textContent : e.type === w.Element ? e.tagName === t.tagName && JSON.stringify(e.attributes) === JSON.stringify(t.attributes) && e.isSVG === t.isSVG && e.needBlock === t.needBlock : !1;
}
function gt(e) {
  var t = e.type;
  return e.hasAttribute("data-rr-is-password") ? "password" : t ? t.toLowerCase() : null;
}
var Zr = 1, Hr = new RegExp("[^a-z0-9-_:]"), We = -2;
function qt() {
  return Zr++;
}
function Yr(e) {
  if (e instanceof HTMLFormElement)
    return "form";
  var t = e.tagName.toLowerCase().trim();
  return Hr.test(t) ? "div" : t;
}
function zr(e) {
  return e.cssRules ? Array.from(e.cssRules).map(function(t) {
    return t.cssText || "";
  }).join("") : "";
}
function Kr(e) {
  var t = "";
  return e.indexOf("//") > -1 ? t = e.split("/").slice(0, 3).join("/") : t = e.split("/")[0], t = t.split("?")[0], t;
}
var be, St, jr = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm, Qr = /^(?:[a-z+]+:)?\/\//i, Xr = /^www\..*/i, Jr = /^(data:)([^,]*),(.*)/i;
function Qe(e, t) {
  return (e || "").replace(jr, function(r, i, n, s, a, o) {
    var l = n || a || o, c = i || s || "";
    if (!l)
      return r;
    if (Qr.test(l) || Xr.test(l) || Jr.test(l))
      return "url(".concat(c).concat(l).concat(c, ")");
    if (l[0] === "/")
      return "url(".concat(c).concat(Kr(t) + l).concat(c, ")");
    var u = t.split("/"), d = l.split("/");
    u.pop();
    for (var h = 0, p = d; h < p.length; h++) {
      var f = p[h];
      f !== "." && (f === ".." ? u.pop() : u.push(f));
    }
    return "url(".concat(c).concat(u.join("/")).concat(c, ")");
  });
}
var qr = /^[^ \t\n\r\u000c]+/, $r = /^[, \t\n\r\u000c]+/;
function ei(e, t) {
  if (t.trim() === "")
    return t;
  var r = 0;
  function i(c) {
    var u, d = c.exec(t.substring(r));
    return d ? (u = d[0], r += u.length, u) : "";
  }
  for (var n = []; i($r), !(r >= t.length); ) {
    var s = i(qr);
    if (s.slice(-1) === ",")
      s = Te(e, s.substring(0, s.length - 1)), n.push(s);
    else {
      var a = "";
      s = Te(e, s);
      for (var o = !1; ; ) {
        var l = t.charAt(r);
        if (l === "") {
          n.push((s + a).trim());
          break;
        } else if (o)
          l === ")" && (o = !1);
        else if (l === ",") {
          r += 1, n.push((s + a).trim());
          break;
        } else
          l === "(" && (o = !0);
        a += l, r += 1;
      }
    }
  }
  return n.join(", ");
}
function Te(e, t) {
  if (!t || t.trim() === "")
    return t;
  var r = e.createElement("a");
  return r.href = t, r.href;
}
function ti(e) {
  return !!(e.tagName === "svg" || e.ownerSVGElement);
}
function yt() {
  var e = document.createElement("a");
  return e.href = "", e.href;
}
function $t(e, t, r, i) {
  return i && (r === "src" || r === "href" && !(t === "use" && i[0] === "#") || r === "xlink:href" && i[0] !== "#" || r === "background" && (t === "table" || t === "td" || t === "th") ? Te(e, i) : r === "srcset" ? ei(e, i) : r === "style" ? Qe(i, yt()) : t === "object" && r === "data" ? Te(e, i) : i);
}
function er(e, t, r) {
  return (e === "video" || e === "audio") && t === "autoplay";
}
function ri(e, t, r) {
  try {
    if (typeof t == "string") {
      if (e.classList.contains(t))
        return !0;
    } else
      for (var i = e.classList.length; i--; ) {
        var n = e.classList[i];
        if (t.test(n))
          return !0;
      }
    if (r)
      return e.matches(r);
  } catch {
  }
  return !1;
}
function Xe(e, t, r) {
  if (!e)
    return !1;
  if (e.nodeType !== e.ELEMENT_NODE)
    return r ? Xe(e.parentNode, t, r) : !1;
  for (var i = e.classList.length; i--; ) {
    var n = e.classList[i];
    if (t.test(n))
      return !0;
  }
  return r ? Xe(e.parentNode, t, r) : !1;
}
function tr(e, t, r) {
  try {
    var i = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
    if (i === null)
      return !1;
    if (typeof t == "string") {
      if (i.classList.contains(t) || i.closest(".".concat(t)))
        return !0;
    } else if (Xe(i, t, !0))
      return !0;
    if (r && (i.matches(r) || i.closest(r)))
      return !0;
  } catch {
  }
  return !1;
}
function ii(e, t, r) {
  var i = e.contentWindow;
  if (i) {
    var n = !1, s;
    try {
      s = i.document.readyState;
    } catch {
      return;
    }
    if (s !== "complete") {
      var a = setTimeout(function() {
        n || (t(), n = !0);
      }, r);
      e.addEventListener("load", function() {
        clearTimeout(a), n = !0, t();
      });
      return;
    }
    var o = "about:blank";
    if (i.location.href !== o || e.src === o || e.src === "")
      return setTimeout(t, 0), e.addEventListener("load", t);
    e.addEventListener("load", t);
  }
}
function ni(e, t, r) {
  var i = !1, n;
  try {
    n = e.sheet;
  } catch {
    return;
  }
  if (!n) {
    var s = setTimeout(function() {
      i || (t(), i = !0);
    }, r);
    e.addEventListener("load", function() {
      clearTimeout(s), i = !0, t();
    });
  }
}
function si(e, t) {
  var r = t.doc, i = t.mirror, n = t.blockClass, s = t.blockSelector, a = t.maskTextClass, o = t.maskTextSelector, l = t.inlineStylesheet, c = t.maskInputOptions, u = c === void 0 ? {} : c, d = t.maskTextFn, h = t.maskInputFn, p = t.dataURLOptions, f = p === void 0 ? {} : p, g = t.inlineImages, C = t.recordCanvas, m = t.keepIframeSrcFn, y = t.newlyAddedElement, v = y === void 0 ? !1 : y, b = oi(r, i);
  switch (e.nodeType) {
    case e.DOCUMENT_NODE:
      return e.compatMode !== "CSS1Compat" ? {
        type: w.Document,
        childNodes: [],
        compatMode: e.compatMode
      } : {
        type: w.Document,
        childNodes: []
      };
    case e.DOCUMENT_TYPE_NODE:
      return {
        type: w.DocumentType,
        name: e.name,
        publicId: e.publicId,
        systemId: e.systemId,
        rootId: b
      };
    case e.ELEMENT_NODE:
      return li(e, {
        doc: r,
        blockClass: n,
        blockSelector: s,
        inlineStylesheet: l,
        maskInputOptions: u,
        maskInputFn: h,
        dataURLOptions: f,
        inlineImages: g,
        recordCanvas: C,
        keepIframeSrcFn: m,
        newlyAddedElement: v,
        rootId: b
      });
    case e.TEXT_NODE:
      return ai(e, {
        maskTextClass: a,
        maskTextSelector: o,
        maskTextFn: d,
        rootId: b
      });
    case e.CDATA_SECTION_NODE:
      return {
        type: w.CDATA,
        textContent: "",
        rootId: b
      };
    case e.COMMENT_NODE:
      return {
        type: w.Comment,
        textContent: e.textContent || "",
        rootId: b
      };
    default:
      return !1;
  }
}
function oi(e, t) {
  if (t.hasNode(e)) {
    var r = t.getId(e);
    return r === 1 ? void 0 : r;
  }
}
function ai(e, t) {
  var r, i = t.maskTextClass, n = t.maskTextSelector, s = t.maskTextFn, a = t.rootId, o = e.parentNode && e.parentNode.tagName, l = e.textContent, c = o === "STYLE" ? !0 : void 0, u = o === "SCRIPT" ? !0 : void 0;
  if (c && l) {
    try {
      e.nextSibling || e.previousSibling || !((r = e.parentNode.sheet) === null || r === void 0) && r.cssRules && (l = zr(e.parentNode.sheet));
    } catch (d) {
      console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(d), e);
    }
    l = Qe(l, yt());
  }
  return u && (l = "SCRIPT_PLACEHOLDER"), !c && !u && l && tr(e, i, n) && (l = s ? s(l) : l.replace(/[\S]/g, "*")), {
    type: w.Text,
    textContent: l || "",
    isStyle: c,
    rootId: a
  };
}
function li(e, t) {
  for (var r = t.doc, i = t.blockClass, n = t.blockSelector, s = t.inlineStylesheet, a = t.maskInputOptions, o = a === void 0 ? {} : a, l = t.maskInputFn, c = t.dataURLOptions, u = c === void 0 ? {} : c, d = t.inlineImages, h = t.recordCanvas, p = t.keepIframeSrcFn, f = t.newlyAddedElement, g = f === void 0 ? !1 : f, C = t.rootId, m = ri(e, i, n), y = Yr(e), v = {}, b = e.attributes.length, R = 0; R < b; R++) {
    var D = e.attributes[R];
    er(y, D.name, D.value) || (v[D.name] = $t(r, y, D.name, D.value));
  }
  if (y === "link" && s) {
    var _ = Array.from(r.styleSheets).find(function(T) {
      return T.href === e.href;
    }), B = null;
    _ && (B = at(_)), B && (delete v.rel, delete v.href, v._cssText = Qe(B, _.href));
  }
  if (y === "style" && e.sheet && !(e.innerText || e.textContent || "").trim().length) {
    var B = at(e.sheet);
    B && (v._cssText = Qe(B, yt()));
  }
  if (y === "input" || y === "textarea" || y === "select") {
    var Y = e.value, z = e.checked;
    if (v.type !== "radio" && v.type !== "checkbox" && v.type !== "submit" && v.type !== "button" && Y) {
      var X = gt(e);
      v.value = mt({
        element: e,
        type: X,
        tagName: y,
        value: Y,
        maskInputOptions: o,
        maskInputFn: l
      });
    } else
      z && (v.checked = z);
  }
  if (y === "option" && (e.selected && !o.select ? v.selected = !0 : delete v.selected), y === "canvas" && h) {
    if (e.__context === "2d")
      Gr(e) || (v.rr_dataURL = e.toDataURL(u.type, u.quality));
    else if (!("__context" in e)) {
      var $ = e.toDataURL(u.type, u.quality), J = document.createElement("canvas");
      J.width = e.width, J.height = e.height;
      var ie = J.toDataURL(u.type, u.quality);
      $ !== ie && (v.rr_dataURL = $);
    }
  }
  if (y === "img" && d) {
    be || (be = r.createElement("canvas"), St = be.getContext("2d"));
    var W = e, K = W.crossOrigin;
    W.crossOrigin = "anonymous";
    var L = function() {
      W.removeEventListener("load", L);
      try {
        be.width = W.naturalWidth, be.height = W.naturalHeight, St.drawImage(W, 0, 0), v.rr_dataURL = be.toDataURL(u.type, u.quality);
      } catch (T) {
        console.warn("Cannot inline img src=".concat(W.currentSrc, "! Error: ").concat(T));
      }
      K ? v.crossOrigin = K : W.removeAttribute("crossorigin");
    };
    W.complete && W.naturalWidth !== 0 ? L() : W.addEventListener("load", L);
  }
  if ((y === "audio" || y === "video") && (v.rr_mediaState = e.paused ? "paused" : "played", v.rr_mediaCurrentTime = e.currentTime), g || (e.scrollLeft && (v.rr_scrollLeft = e.scrollLeft), e.scrollTop && (v.rr_scrollTop = e.scrollTop)), m) {
    var q = e.getBoundingClientRect(), S = q.width, I = q.height;
    v = {
      class: v.class,
      rr_width: "".concat(S, "px"),
      rr_height: "".concat(I, "px")
    };
  }
  return y === "iframe" && !p(v.src) && (e.contentDocument || (v.rr_src = v.src), delete v.src), {
    type: w.Element,
    tagName: y,
    attributes: v,
    childNodes: [],
    isSVG: ti(e) || void 0,
    needBlock: m,
    rootId: C
  };
}
function U(e) {
  return e == null ? "" : e.toLowerCase();
}
function ci(e, t) {
  if (t.comment && e.type === w.Comment)
    return !0;
  if (e.type === w.Element) {
    if (t.script && (e.tagName === "script" || e.tagName === "link" && (e.attributes.rel === "preload" || e.attributes.rel === "modulepreload") && e.attributes.as === "script" || e.tagName === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && e.attributes.href.endsWith(".js")))
      return !0;
    if (t.headFavicon && (e.tagName === "link" && e.attributes.rel === "shortcut icon" || e.tagName === "meta" && (U(e.attributes.name).match(/^msapplication-tile(image|color)$/) || U(e.attributes.name) === "application-name" || U(e.attributes.rel) === "icon" || U(e.attributes.rel) === "apple-touch-icon" || U(e.attributes.rel) === "shortcut icon")))
      return !0;
    if (e.tagName === "meta") {
      if (t.headMetaDescKeywords && U(e.attributes.name).match(/^description|keywords$/))
        return !0;
      if (t.headMetaSocial && (U(e.attributes.property).match(/^(og|twitter|fb):/) || U(e.attributes.name).match(/^(og|twitter):/) || U(e.attributes.name) === "pinterest"))
        return !0;
      if (t.headMetaRobots && (U(e.attributes.name) === "robots" || U(e.attributes.name) === "googlebot" || U(e.attributes.name) === "bingbot"))
        return !0;
      if (t.headMetaHttpEquiv && e.attributes["http-equiv"] !== void 0)
        return !0;
      if (t.headMetaAuthorship && (U(e.attributes.name) === "author" || U(e.attributes.name) === "generator" || U(e.attributes.name) === "framework" || U(e.attributes.name) === "publisher" || U(e.attributes.name) === "progid" || U(e.attributes.property).match(/^article:/) || U(e.attributes.property).match(/^product:/)))
        return !0;
      if (t.headMetaVerification && (U(e.attributes.name) === "google-site-verification" || U(e.attributes.name) === "yandex-verification" || U(e.attributes.name) === "csrf-token" || U(e.attributes.name) === "p:domain_verify" || U(e.attributes.name) === "verify-v1" || U(e.attributes.name) === "verification" || U(e.attributes.name) === "shopify-checkout-api-token"))
        return !0;
    }
  }
  return !1;
}
function we(e, t) {
  var r = t.doc, i = t.mirror, n = t.blockClass, s = t.blockSelector, a = t.maskTextClass, o = t.maskTextSelector, l = t.skipChild, c = l === void 0 ? !1 : l, u = t.inlineStylesheet, d = u === void 0 ? !0 : u, h = t.maskInputOptions, p = h === void 0 ? {} : h, f = t.maskTextFn, g = t.maskInputFn, C = t.slimDOMOptions, m = t.dataURLOptions, y = m === void 0 ? {} : m, v = t.inlineImages, b = v === void 0 ? !1 : v, R = t.recordCanvas, D = R === void 0 ? !1 : R, _ = t.onSerialize, B = t.onIframeLoad, Y = t.iframeLoadTimeout, z = Y === void 0 ? 5e3 : Y, X = t.onStylesheetLoad, $ = t.stylesheetLoadTimeout, J = $ === void 0 ? 5e3 : $, ie = t.keepIframeSrcFn, W = ie === void 0 ? function() {
    return !1;
  } : ie, K = t.newlyAddedElement, L = K === void 0 ? !1 : K, q = t.preserveWhiteSpace, S = q === void 0 ? !0 : q, I = si(e, {
    doc: r,
    mirror: i,
    blockClass: n,
    blockSelector: s,
    maskTextClass: a,
    maskTextSelector: o,
    inlineStylesheet: d,
    maskInputOptions: p,
    maskTextFn: f,
    maskInputFn: g,
    dataURLOptions: y,
    inlineImages: b,
    recordCanvas: D,
    keepIframeSrcFn: W,
    newlyAddedElement: L
  });
  if (!I)
    return console.warn(e, "not serialized"), null;
  var T;
  i.hasNode(e) ? T = i.getId(e) : ci(I, C) || !S && I.type === w.Text && !I.isStyle && !I.textContent.replace(/^\s+|\s+$/gm, "").length ? T = We : T = qt();
  var M = Object.assign(I, { id: T });
  if (i.add(e, M), T === We)
    return null;
  _ && _(e);
  var j = !c;
  if (M.type === w.Element) {
    j = j && !M.needBlock, delete M.needBlock;
    var de = e.shadowRoot;
    de && Le(de) && (M.isShadowHost = !0);
  }
  if ((M.type === w.Document || M.type === w.Element) && j) {
    C.headWhitespace && M.type === w.Element && M.tagName === "head" && (S = !1);
    for (var le = {
      doc: r,
      mirror: i,
      blockClass: n,
      blockSelector: s,
      maskTextClass: a,
      maskTextSelector: o,
      skipChild: c,
      inlineStylesheet: d,
      maskInputOptions: p,
      maskTextFn: f,
      maskInputFn: g,
      slimDOMOptions: C,
      dataURLOptions: y,
      inlineImages: b,
      recordCanvas: D,
      preserveWhiteSpace: S,
      onSerialize: _,
      onIframeLoad: B,
      iframeLoadTimeout: z,
      onStylesheetLoad: X,
      stylesheetLoadTimeout: J,
      keepIframeSrcFn: W
    }, oe = 0, Se = Array.from(e.childNodes); oe < Se.length; oe++) {
      var me = Se[oe], N = we(me, le);
      N && M.childNodes.push(N);
    }
    if (Qt(e) && e.shadowRoot)
      for (var ee = 0, V = Array.from(e.shadowRoot.childNodes); ee < V.length; ee++) {
        var me = V[ee], N = we(me, le);
        N && (Le(e.shadowRoot) && (N.isShadow = !0), M.childNodes.push(N));
      }
  }
  return e.parentNode && Oe(e.parentNode) && Le(e.parentNode) && (M.isShadow = !0), M.type === w.Element && M.tagName === "iframe" && ii(e, function() {
    var P = e.contentDocument;
    if (P && B) {
      var ce = we(P, {
        doc: P,
        mirror: i,
        blockClass: n,
        blockSelector: s,
        maskTextClass: a,
        maskTextSelector: o,
        skipChild: !1,
        inlineStylesheet: d,
        maskInputOptions: p,
        maskTextFn: f,
        maskInputFn: g,
        slimDOMOptions: C,
        dataURLOptions: y,
        inlineImages: b,
        recordCanvas: D,
        preserveWhiteSpace: S,
        onSerialize: _,
        onIframeLoad: B,
        iframeLoadTimeout: z,
        onStylesheetLoad: X,
        stylesheetLoadTimeout: J,
        keepIframeSrcFn: W
      });
      ce && B(e, ce);
    }
  }, z), M.type === w.Element && M.tagName === "link" && M.attributes.rel === "stylesheet" && ni(e, function() {
    if (X) {
      var P = we(e, {
        doc: r,
        mirror: i,
        blockClass: n,
        blockSelector: s,
        maskTextClass: a,
        maskTextSelector: o,
        skipChild: !1,
        inlineStylesheet: d,
        maskInputOptions: p,
        maskTextFn: f,
        maskInputFn: g,
        slimDOMOptions: C,
        dataURLOptions: y,
        inlineImages: b,
        recordCanvas: D,
        preserveWhiteSpace: S,
        onSerialize: _,
        onIframeLoad: B,
        iframeLoadTimeout: z,
        onStylesheetLoad: X,
        stylesheetLoadTimeout: J,
        keepIframeSrcFn: W
      });
      P && X(e, P);
    }
  }, J), M;
}
function ui(e, t) {
  var r = t || {}, i = r.mirror, n = i === void 0 ? new pt() : i, s = r.blockClass, a = s === void 0 ? "rr-block" : s, o = r.blockSelector, l = o === void 0 ? null : o, c = r.maskTextClass, u = c === void 0 ? "rr-mask" : c, d = r.maskTextSelector, h = d === void 0 ? null : d, p = r.inlineStylesheet, f = p === void 0 ? !0 : p, g = r.inlineImages, C = g === void 0 ? !1 : g, m = r.recordCanvas, y = m === void 0 ? !1 : m, v = r.maskAllInputs, b = v === void 0 ? !1 : v, R = r.maskTextFn, D = r.maskInputFn, _ = r.slimDOM, B = _ === void 0 ? !1 : _, Y = r.dataURLOptions, z = r.preserveWhiteSpace, X = r.onSerialize, $ = r.onIframeLoad, J = r.iframeLoadTimeout, ie = r.onStylesheetLoad, W = r.stylesheetLoadTimeout, K = r.keepIframeSrcFn, L = K === void 0 ? function() {
    return !1;
  } : K, q = b === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : b === !1 ? {
    password: !0
  } : b, S = B === !0 || B === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaDescKeywords: B === "all",
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaAuthorship: !0,
    headMetaVerification: !0
  } : B === !1 ? {} : B;
  return we(e, {
    doc: e,
    mirror: n,
    blockClass: a,
    blockSelector: l,
    maskTextClass: u,
    maskTextSelector: h,
    skipChild: !1,
    inlineStylesheet: f,
    maskInputOptions: q,
    maskTextFn: R,
    maskInputFn: D,
    slimDOMOptions: S,
    dataURLOptions: Y,
    inlineImages: C,
    recordCanvas: y,
    preserveWhiteSpace: z,
    onSerialize: X,
    onIframeLoad: $,
    iframeLoadTimeout: J,
    onStylesheetLoad: ie,
    stylesheetLoadTimeout: W,
    keepIframeSrcFn: L,
    newlyAddedElement: !1
  });
}
var bt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
function di(e, t) {
  t === void 0 && (t = {});
  var r = 1, i = 1;
  function n(S) {
    var I = S.match(/\n/g);
    I && (r += I.length);
    var T = S.lastIndexOf(`
`);
    i = T === -1 ? i + S.length : S.length - T;
  }
  function s() {
    var S = { line: r, column: i };
    return function(I) {
      return I.position = new a(S), f(), I;
    };
  }
  var a = function() {
    function S(I) {
      this.start = I, this.end = { line: r, column: i }, this.source = t.source;
    }
    return S;
  }();
  a.prototype.content = e;
  var o = [];
  function l(S) {
    var I = new Error("".concat(t.source || "", ":").concat(r, ":").concat(i, ": ").concat(S));
    if (I.reason = S, I.filename = t.source, I.line = r, I.column = i, I.source = e, t.silent)
      o.push(I);
    else
      throw I;
  }
  function c() {
    var S = h();
    return {
      type: "stylesheet",
      stylesheet: {
        source: t.source,
        rules: S,
        parsingErrors: o
      }
    };
  }
  function u() {
    return p(/^{\s*/);
  }
  function d() {
    return p(/^}/);
  }
  function h() {
    var S, I = [];
    for (f(), g(I); e.length && e.charAt(0) !== "}" && (S = L() || q()); )
      S !== !1 && (I.push(S), g(I));
    return I;
  }
  function p(S) {
    var I = S.exec(e);
    if (I) {
      var T = I[0];
      return n(T), e = e.slice(T.length), I;
    }
  }
  function f() {
    p(/^\s*/);
  }
  function g(S) {
    S === void 0 && (S = []);
    for (var I; I = C(); )
      I !== !1 && S.push(I), I = C();
    return S;
  }
  function C() {
    var S = s();
    if (!(e.charAt(0) !== "/" || e.charAt(1) !== "*")) {
      for (var I = 2; e.charAt(I) !== "" && (e.charAt(I) !== "*" || e.charAt(I + 1) !== "/"); )
        ++I;
      if (I += 2, e.charAt(I - 1) === "")
        return l("End of comment missing");
      var T = e.slice(2, I - 2);
      return i += 2, n(T), e = e.slice(I), i += 2, S({
        type: "comment",
        comment: T
      });
    }
  }
  function m() {
    var S = p(/^([^{]+)/);
    if (S)
      return he(S[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function(I) {
        return I.replace(/,/g, "‌");
      }).split(/\s*(?![^(]*\)),\s*/).map(function(I) {
        return I.replace(/\u200C/g, ",");
      });
  }
  function y() {
    var S = s(), I = p(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
    if (I) {
      var T = he(I[0]);
      if (!p(/^:\s*/))
        return l("property missing ':'");
      var M = p(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/), j = S({
        type: "declaration",
        property: T.replace(bt, ""),
        value: M ? he(M[0]).replace(bt, "") : ""
      });
      return p(/^[;\s]*/), j;
    }
  }
  function v() {
    var S = [];
    if (!u())
      return l("missing '{'");
    g(S);
    for (var I; I = y(); )
      I !== !1 && (S.push(I), g(S)), I = y();
    return d() ? S : l("missing '}'");
  }
  function b() {
    for (var S, I = [], T = s(); S = p(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/); )
      I.push(S[1]), p(/^,\s*/);
    if (I.length)
      return T({
        type: "keyframe",
        values: I,
        declarations: v()
      });
  }
  function R() {
    var S = s(), I = p(/^@([-\w]+)?keyframes\s*/);
    if (I) {
      var T = I[1];
      if (I = p(/^([-\w]+)\s*/), !I)
        return l("@keyframes missing name");
      var M = I[1];
      if (!u())
        return l("@keyframes missing '{'");
      for (var j, de = g(); j = b(); )
        de.push(j), de = de.concat(g());
      return d() ? S({
        type: "keyframes",
        name: M,
        vendor: T,
        keyframes: de
      }) : l("@keyframes missing '}'");
    }
  }
  function D() {
    var S = s(), I = p(/^@supports *([^{]+)/);
    if (I) {
      var T = he(I[1]);
      if (!u())
        return l("@supports missing '{'");
      var M = g().concat(h());
      return d() ? S({
        type: "supports",
        supports: T,
        rules: M
      }) : l("@supports missing '}'");
    }
  }
  function _() {
    var S = s(), I = p(/^@host\s*/);
    if (I) {
      if (!u())
        return l("@host missing '{'");
      var T = g().concat(h());
      return d() ? S({
        type: "host",
        rules: T
      }) : l("@host missing '}'");
    }
  }
  function B() {
    var S = s(), I = p(/^@media *([^{]+)/);
    if (I) {
      var T = he(I[1]);
      if (!u())
        return l("@media missing '{'");
      var M = g().concat(h());
      return d() ? S({
        type: "media",
        media: T,
        rules: M
      }) : l("@media missing '}'");
    }
  }
  function Y() {
    var S = s(), I = p(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
    if (I)
      return S({
        type: "custom-media",
        name: he(I[1]),
        media: he(I[2])
      });
  }
  function z() {
    var S = s(), I = p(/^@page */);
    if (I) {
      var T = m() || [];
      if (!u())
        return l("@page missing '{'");
      for (var M = g(), j; j = y(); )
        M.push(j), M = M.concat(g());
      return d() ? S({
        type: "page",
        selectors: T,
        declarations: M
      }) : l("@page missing '}'");
    }
  }
  function X() {
    var S = s(), I = p(/^@([-\w]+)?document *([^{]+)/);
    if (I) {
      var T = he(I[1]), M = he(I[2]);
      if (!u())
        return l("@document missing '{'");
      var j = g().concat(h());
      return d() ? S({
        type: "document",
        document: M,
        vendor: T,
        rules: j
      }) : l("@document missing '}'");
    }
  }
  function $() {
    var S = s(), I = p(/^@font-face\s*/);
    if (I) {
      if (!u())
        return l("@font-face missing '{'");
      for (var T = g(), M; M = y(); )
        T.push(M), T = T.concat(g());
      return d() ? S({
        type: "font-face",
        declarations: T
      }) : l("@font-face missing '}'");
    }
  }
  var J = K("import"), ie = K("charset"), W = K("namespace");
  function K(S) {
    var I = new RegExp("^@" + S + "\\s*([^;]+);");
    return function() {
      var T = s(), M = p(I);
      if (M) {
        var j = { type: S };
        return j[S] = M[1].trim(), T(j);
      }
    };
  }
  function L() {
    if (e[0] === "@")
      return R() || B() || Y() || D() || J() || ie() || W() || X() || z() || _() || $();
  }
  function q() {
    var S = s(), I = m();
    return I ? (g(), S({
      type: "rule",
      selectors: I,
      declarations: v()
    })) : l("selector missing");
  }
  return lt(c());
}
function he(e) {
  return e ? e.replace(/^\s+|\s+$/g, "") : "";
}
function lt(e, t) {
  for (var r = e && typeof e.type == "string", i = r ? e : t, n = 0, s = Object.keys(e); n < s.length; n++) {
    var a = s[n], o = e[a];
    Array.isArray(o) ? o.forEach(function(l) {
      lt(l, i);
    }) : o && typeof o == "object" && lt(o, i);
  }
  return r && Object.defineProperty(e, "parent", {
    configurable: !0,
    writable: !0,
    enumerable: !1,
    value: t || null
  }), e;
}
var At = {
  script: "noscript",
  altglyph: "altGlyph",
  altglyphdef: "altGlyphDef",
  altglyphitem: "altGlyphItem",
  animatecolor: "animateColor",
  animatemotion: "animateMotion",
  animatetransform: "animateTransform",
  clippath: "clipPath",
  feblend: "feBlend",
  fecolormatrix: "feColorMatrix",
  fecomponenttransfer: "feComponentTransfer",
  fecomposite: "feComposite",
  feconvolvematrix: "feConvolveMatrix",
  fediffuselighting: "feDiffuseLighting",
  fedisplacementmap: "feDisplacementMap",
  fedistantlight: "feDistantLight",
  fedropshadow: "feDropShadow",
  feflood: "feFlood",
  fefunca: "feFuncA",
  fefuncb: "feFuncB",
  fefuncg: "feFuncG",
  fefuncr: "feFuncR",
  fegaussianblur: "feGaussianBlur",
  feimage: "feImage",
  femerge: "feMerge",
  femergenode: "feMergeNode",
  femorphology: "feMorphology",
  feoffset: "feOffset",
  fepointlight: "fePointLight",
  fespecularlighting: "feSpecularLighting",
  fespotlight: "feSpotLight",
  fetile: "feTile",
  feturbulence: "feTurbulence",
  foreignobject: "foreignObject",
  glyphref: "glyphRef",
  lineargradient: "linearGradient",
  radialgradient: "radialGradient"
};
function hi(e) {
  var t = At[e.tagName] ? At[e.tagName] : e.tagName;
  return t === "link" && e.attributes._cssText && (t = "style"), t;
}
function fi(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
var rr = /([^\\]):hover/, pi = new RegExp(rr.source, "g");
function Et(e, t) {
  var r = t == null ? void 0 : t.stylesWithHoverClass.get(e);
  if (r)
    return r;
  var i = di(e, {
    silent: !0
  });
  if (!i.stylesheet)
    return e;
  var n = [];
  if (i.stylesheet.rules.forEach(function(o) {
    "selectors" in o && (o.selectors || []).forEach(function(l) {
      rr.test(l) && n.push(l);
    });
  }), n.length === 0)
    return e;
  var s = new RegExp(n.filter(function(o, l) {
    return n.indexOf(o) === l;
  }).sort(function(o, l) {
    return l.length - o.length;
  }).map(function(o) {
    return fi(o);
  }).join("|"), "g"), a = e.replace(s, function(o) {
    var l = o.replace(pi, "$1.\\:hover");
    return "".concat(o, ", ").concat(l);
  });
  return t == null || t.stylesWithHoverClass.set(e, a), a;
}
function Nt() {
  var e = /* @__PURE__ */ new Map();
  return {
    stylesWithHoverClass: e
  };
}
function mi(e, t) {
  var r = t.doc, i = t.hackCss, n = t.cache;
  switch (e.type) {
    case w.Document:
      return r.implementation.createDocument(null, "", null);
    case w.DocumentType:
      return r.implementation.createDocumentType(e.name || "html", e.publicId, e.systemId);
    case w.Element: {
      var s = hi(e), a;
      e.isSVG ? a = r.createElementNS("http://www.w3.org/2000/svg", s) : a = r.createElement(s);
      var o = {};
      for (var l in e.attributes)
        if (Object.prototype.hasOwnProperty.call(e.attributes, l)) {
          var c = e.attributes[l];
          if (!(s === "option" && l === "selected" && c === !1) && c !== null) {
            if (c === !0 && (c = ""), l.startsWith("rr_")) {
              o[l] = c;
              continue;
            }
            var u = s === "textarea" && l === "value", d = s === "style" && l === "_cssText";
            if (d && i && typeof c == "string" && (c = Et(c, n)), (u || d) && typeof c == "string") {
              for (var h = r.createTextNode(c), p = 0, f = Array.from(a.childNodes); p < f.length; p++) {
                var g = f[p];
                g.nodeType === a.TEXT_NODE && a.removeChild(g);
              }
              a.appendChild(h);
              continue;
            }
            try {
              if (e.isSVG && l === "xlink:href")
                a.setAttributeNS("http://www.w3.org/1999/xlink", l, c.toString());
              else if (l === "onload" || l === "onclick" || l.substring(0, 7) === "onmouse")
                a.setAttribute("_" + l, c.toString());
              else if (s === "meta" && e.attributes["http-equiv"] === "Content-Security-Policy" && l === "content") {
                a.setAttribute("csp-content", c.toString());
                continue;
              } else
                s === "link" && (e.attributes.rel === "preload" || e.attributes.rel === "modulepreload") && e.attributes.as === "script" || s === "link" && e.attributes.rel === "prefetch" && typeof e.attributes.href == "string" && e.attributes.href.endsWith(".js") || (s === "img" && e.attributes.srcset && e.attributes.rr_dataURL ? a.setAttribute("rrweb-original-srcset", e.attributes.srcset) : a.setAttribute(l, c.toString()));
            } catch {
            }
          }
        }
      var C = function(y) {
        var v = o[y];
        if (s === "canvas" && y === "rr_dataURL") {
          var b = document.createElement("img");
          b.onload = function() {
            var D = a.getContext("2d");
            D && D.drawImage(b, 0, 0, b.width, b.height);
          }, b.src = v.toString(), a.RRNodeType && (a.rr_dataURL = v.toString());
        } else if (s === "img" && y === "rr_dataURL") {
          var R = a;
          R.currentSrc.startsWith("data:") || (R.setAttribute("rrweb-original-src", e.attributes.src), R.src = v.toString());
        }
        if (y === "rr_width")
          a.style.width = v.toString();
        else if (y === "rr_height")
          a.style.height = v.toString();
        else if (y === "rr_mediaCurrentTime" && typeof v == "number")
          a.currentTime = v;
        else if (y === "rr_mediaState")
          switch (v) {
            case "played":
              a.play().catch(function(D) {
                return console.warn("media playback error", D);
              });
              break;
            case "paused":
              a.pause();
              break;
          }
      };
      for (var m in o)
        C(m);
      if (e.isShadowHost)
        if (!a.shadowRoot)
          a.attachShadow({ mode: "open" });
        else
          for (; a.shadowRoot.firstChild; )
            a.shadowRoot.removeChild(a.shadowRoot.firstChild);
      return a;
    }
    case w.Text:
      return r.createTextNode(e.isStyle && i ? Et(e.textContent, n) : e.textContent);
    case w.CDATA:
      return r.createCDATASection(e.textContent);
    case w.Comment:
      return r.createComment(e.textContent);
    default:
      return null;
  }
}
function Fe(e, t) {
  var r = t.doc, i = t.mirror, n = t.skipChild, s = n === void 0 ? !1 : n, a = t.hackCss, o = a === void 0 ? !0 : a, l = t.afterAppend, c = t.cache;
  if (i.has(e.id)) {
    var u = i.getNode(e.id), d = i.getMeta(u);
    if (Pr(d, e))
      return i.getNode(e.id);
  }
  var h = mi(e, { doc: r, hackCss: o, cache: c });
  if (!h)
    return null;
  if (e.rootId && i.getNode(e.rootId) !== r && i.replace(e.rootId, r), e.type === w.Document && (r.close(), r.open(), e.compatMode === "BackCompat" && e.childNodes && e.childNodes[0].type !== w.DocumentType && (e.childNodes[0].type === w.Element && "xmlns" in e.childNodes[0].attributes && e.childNodes[0].attributes.xmlns === "http://www.w3.org/1999/xhtml" ? r.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">') : r.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">')), h = r), i.add(h, e), (e.type === w.Document || e.type === w.Element) && !s)
    for (var p = function(m) {
      var y = Fe(m, {
        doc: r,
        mirror: i,
        skipChild: !1,
        hackCss: o,
        afterAppend: l,
        cache: c
      });
      if (!y)
        return console.warn("Failed to rebuild", m), "continue";
      if (m.isShadow && Qt(h) && h.shadowRoot)
        h.shadowRoot.appendChild(y);
      else if (e.type === w.Document && m.type == w.Element) {
        var v = y, b = null;
        v.childNodes.forEach(function(R) {
          R.nodeName === "BODY" && (b = R);
        }), b ? (v.removeChild(b), h.appendChild(y), v.appendChild(b)) : h.appendChild(y);
      } else
        h.appendChild(y);
      l && l(y, m.id);
    }, f = 0, g = e.childNodes; f < g.length; f++) {
      var C = g[f];
      p(C);
    }
  return h;
}
function gi(e, t) {
  function r(a) {
    t(a);
  }
  for (var i = 0, n = e.getIds(); i < n.length; i++) {
    var s = n[i];
    e.has(s) && r(e.getNode(s));
  }
}
function yi(e, t) {
  var r = t.getMeta(e);
  if ((r == null ? void 0 : r.type) === w.Element) {
    var i = e;
    for (var n in r.attributes)
      if (Object.prototype.hasOwnProperty.call(r.attributes, n) && n.startsWith("rr_")) {
        var s = r.attributes[n];
        n === "rr_scrollLeft" && (i.scrollLeft = s), n === "rr_scrollTop" && (i.scrollTop = s);
      }
  }
}
function vi(e, t) {
  var r = t.doc, i = t.onVisit, n = t.hackCss, s = n === void 0 ? !0 : n, a = t.afterAppend, o = t.cache, l = t.mirror, c = l === void 0 ? new pt() : l, u = Fe(e, {
    doc: r,
    mirror: c,
    skipChild: !1,
    hackCss: s,
    afterAppend: a,
    cache: o
  });
  return gi(c, function(d) {
    i && i(d), yi(d, c);
  }), u;
}
function te(e, t, r = document) {
  const i = { capture: !0, passive: !0 };
  return r.addEventListener(e, t, i), () => r.removeEventListener(e, t, i);
}
const Ae = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
let Tt = {
  map: {},
  getId() {
    return console.error(Ae), -1;
  },
  getNode() {
    return console.error(Ae), null;
  },
  removeNodeFromMap() {
    console.error(Ae);
  },
  has() {
    return console.error(Ae), !1;
  },
  reset() {
    console.error(Ae);
  }
};
typeof window < "u" && window.Proxy && window.Reflect && (Tt = new Proxy(Tt, {
  get(e, t, r) {
    return t === "map" && console.error(Ae), Reflect.get(e, t, r);
  }
}));
function Ve(e, t, r = {}) {
  let i = null, n = 0;
  return function(...s) {
    const a = Date.now();
    !n && r.leading === !1 && (n = a);
    const o = t - (a - n), l = this;
    o <= 0 || o > t ? (i && (clearTimeout(i), i = null), n = a, e.apply(l, s)) : !i && r.trailing !== !1 && (i = setTimeout(() => {
      n = r.leading === !1 ? 0 : Date.now(), i = null, e.apply(l, s);
    }, o));
  };
}
function tt(e, t, r, i, n = window) {
  const s = n.Object.getOwnPropertyDescriptor(e, t);
  return n.Object.defineProperty(e, t, i ? r : {
    set(a) {
      setTimeout(() => {
        r.set.call(this, a);
      }, 0), s && s.set && s.set.call(this, a);
    }
  }), () => tt(e, t, s || {}, !0);
}
function Ue(e, t, r) {
  try {
    if (!(t in e))
      return () => {
      };
    const i = e[t], n = r(i);
    return typeof n == "function" && (n.prototype = n.prototype || {}, Object.defineProperties(n, {
      __rrweb_original__: {
        enumerable: !1,
        value: i
      }
    })), e[t] = n, () => {
      e[t] = i;
    };
  } catch {
    return () => {
    };
  }
}
function ir(e) {
  var t, r, i, n, s, a;
  const o = e.document;
  return {
    left: o.scrollingElement ? o.scrollingElement.scrollLeft : e.pageXOffset !== void 0 ? e.pageXOffset : (o == null ? void 0 : o.documentElement.scrollLeft) || ((r = (t = o == null ? void 0 : o.body) === null || t === void 0 ? void 0 : t.parentElement) === null || r === void 0 ? void 0 : r.scrollLeft) || ((i = o == null ? void 0 : o.body) === null || i === void 0 ? void 0 : i.scrollLeft) || 0,
    top: o.scrollingElement ? o.scrollingElement.scrollTop : e.pageYOffset !== void 0 ? e.pageYOffset : (o == null ? void 0 : o.documentElement.scrollTop) || ((s = (n = o == null ? void 0 : o.body) === null || n === void 0 ? void 0 : n.parentElement) === null || s === void 0 ? void 0 : s.scrollTop) || ((a = o == null ? void 0 : o.body) === null || a === void 0 ? void 0 : a.scrollTop) || 0
  };
}
function nr() {
  return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight;
}
function sr() {
  return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth;
}
function re(e, t, r, i) {
  if (!e)
    return !1;
  const n = e.nodeType === e.ELEMENT_NODE ? e : e.parentElement;
  if (!n)
    return !1;
  try {
    if (typeof t == "string") {
      if (n.classList.contains(t) || i && n.closest("." + t) !== null)
        return !0;
    } else if (Xe(n, t, i))
      return !0;
  } catch {
  }
  return !!(r && (n.matches(r) || i && n.closest(r) !== null));
}
function Ii(e, t) {
  return t.getId(e) !== -1;
}
function it(e, t) {
  return t.getId(e) === We;
}
function or(e, t) {
  if (Oe(e))
    return !1;
  const r = t.getId(e);
  return t.has(r) ? e.parentNode && e.parentNode.nodeType === e.DOCUMENT_NODE ? !1 : e.parentNode ? or(e.parentNode, t) : !0 : !0;
}
function ct(e) {
  return !!e.changedTouches;
}
function ar(e = window) {
  "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach), Node.prototype.contains || (Node.prototype.contains = (...t) => {
    let r = t[0];
    if (!(0 in t))
      throw new TypeError("1 argument is required");
    do
      if (this === r)
        return !0;
    while (r = r && r.parentNode);
    return !1;
  });
}
function Ci(e) {
  const t = {}, r = (n, s) => {
    const a = {
      value: n,
      parent: s,
      children: []
    };
    return t[n.node.id] = a, a;
  }, i = [];
  for (const n of e) {
    const { nextId: s, parentId: a } = n;
    if (s && s in t) {
      const o = t[s];
      if (o.parent) {
        const l = o.parent.children.indexOf(o);
        o.parent.children.splice(l, 0, r(n, o.parent));
      } else {
        const l = i.indexOf(o);
        i.splice(l, 0, r(n, null));
      }
      continue;
    }
    if (a in t) {
      const o = t[a];
      o.children.push(r(n, o));
      continue;
    }
    i.push(r(n, null));
  }
  return i;
}
function lr(e, t) {
  t(e.value);
  for (let r = e.children.length - 1; r >= 0; r--)
    lr(e.children[r], t);
}
function _e(e, t) {
  return !!(e.nodeName === "IFRAME" && t.getMeta(e));
}
function cr(e, t) {
  return !!(e.nodeName === "LINK" && e.nodeType === e.ELEMENT_NODE && e.getAttribute && e.getAttribute("rel") === "stylesheet" && t.getMeta(e));
}
function ur(e, t) {
  var r, i;
  const n = (i = (r = e.ownerDocument) === null || r === void 0 ? void 0 : r.defaultView) === null || i === void 0 ? void 0 : i.frameElement;
  if (!n || n === t)
    return {
      x: 0,
      y: 0,
      relativeScale: 1,
      absoluteScale: 1
    };
  const s = n.getBoundingClientRect(), a = ur(n, t), o = s.height / n.clientHeight;
  return {
    x: s.x * a.relativeScale + a.x,
    y: s.y * a.relativeScale + a.y,
    relativeScale: o,
    absoluteScale: a.absoluteScale * o
  };
}
function Ie(e) {
  return !!(e != null && e.shadowRoot);
}
function ke(e, t) {
  const r = e[t[0]];
  return t.length === 1 ? r : ke(r.cssRules[t[1]].cssRules, t.slice(2));
}
function wt(e) {
  const t = [...e], r = t.pop();
  return { positions: t, index: r };
}
function Si(e) {
  const t = /* @__PURE__ */ new Set(), r = [];
  for (let i = e.length; i--; ) {
    const n = e[i];
    t.has(n.id) || (r.push(n), t.add(n.id));
  }
  return r;
}
class dr {
  constructor() {
    this.id = 1, this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map();
  }
  getId(t) {
    var r;
    return (r = this.styleIDMap.get(t)) !== null && r !== void 0 ? r : -1;
  }
  has(t) {
    return this.styleIDMap.has(t);
  }
  add(t, r) {
    if (this.has(t))
      return this.getId(t);
    let i;
    return r === void 0 ? i = this.id++ : i = r, this.styleIDMap.set(t, i), this.idStyleMap.set(i, t), i;
  }
  getStyle(t) {
    return this.idStyleMap.get(t) || null;
  }
  reset() {
    this.styleIDMap = /* @__PURE__ */ new WeakMap(), this.idStyleMap = /* @__PURE__ */ new Map(), this.id = 1;
  }
  generateId() {
    return this.id++;
  }
}
function hr(e) {
  var t, r;
  let i = null;
  return ((r = (t = e.getRootNode) === null || t === void 0 ? void 0 : t.call(e)) === null || r === void 0 ? void 0 : r.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && e.getRootNode().host && (i = e.getRootNode().host), i;
}
function bi(e) {
  let t = e, r;
  for (; r = hr(t); )
    t = r;
  return t;
}
function Ai(e) {
  const t = e.ownerDocument;
  if (!t)
    return !1;
  const r = bi(e);
  return t.contains(r);
}
function fr(e) {
  const t = e.ownerDocument;
  return t ? t.contains(e) || Ai(e) : !1;
}
var E = /* @__PURE__ */ ((e) => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e))(E || {}), A = /* @__PURE__ */ ((e) => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e))(A || {}), O = /* @__PURE__ */ ((e) => (e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e))(O || {}), fe = /* @__PURE__ */ ((e) => (e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e))(fe || {}), pe = /* @__PURE__ */ ((e) => (e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e))(pe || {}), F = /* @__PURE__ */ ((e) => (e.Start = "start", e.Pause = "pause", e.Resume = "resume", e.Resize = "resize", e.Finish = "finish", e.FullsnapshotRebuilded = "fullsnapshot-rebuilded", e.LoadStylesheetStart = "load-stylesheet-start", e.LoadStylesheetEnd = "load-stylesheet-end", e.SkipStart = "skip-start", e.SkipEnd = "skip-end", e.MouseInteraction = "mouse-interaction", e.EventCast = "event-cast", e.CustomEvent = "custom-event", e.Flush = "flush", e.StateChange = "state-change", e.PlayBack = "play-back", e.Destroy = "destroy", e))(F || {});
function Mt(e) {
  return "__ln" in e;
}
class Ei {
  constructor() {
    this.length = 0, this.head = null;
  }
  get(t) {
    if (t >= this.length)
      throw new Error("Position outside of list range");
    let r = this.head;
    for (let i = 0; i < t; i++)
      r = (r == null ? void 0 : r.next) || null;
    return r;
  }
  addNode(t) {
    const r = {
      value: t,
      previous: null,
      next: null
    };
    if (t.__ln = r, t.previousSibling && Mt(t.previousSibling)) {
      const i = t.previousSibling.__ln.next;
      r.next = i, r.previous = t.previousSibling.__ln, t.previousSibling.__ln.next = r, i && (i.previous = r);
    } else if (t.nextSibling && Mt(t.nextSibling) && t.nextSibling.__ln.previous) {
      const i = t.nextSibling.__ln.previous;
      r.previous = i, r.next = t.nextSibling.__ln, t.nextSibling.__ln.previous = r, i && (i.next = r);
    } else
      this.head && (this.head.previous = r), r.next = this.head, this.head = r;
    this.length++;
  }
  removeNode(t) {
    const r = t.__ln;
    this.head && (r.previous ? (r.previous.next = r.next, r.next && (r.next.previous = r.previous)) : (this.head = r.next, this.head && (this.head.previous = null)), t.__ln && delete t.__ln, this.length--);
  }
}
const Rt = (e, t) => `${e}@${t}`;
class Ni {
  constructor() {
    this.frozen = !1, this.locked = !1, this.texts = [], this.attributes = [], this.removes = [], this.mapRemoves = [], this.movedMap = {}, this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.processMutations = (t) => {
      t.forEach(this.processMutation), this.emit();
    }, this.emit = () => {
      if (this.frozen || this.locked)
        return;
      const t = [], r = new Ei(), i = (o) => {
        let l = o, c = We;
        for (; c === We; )
          l = l && l.nextSibling, c = l && this.mirror.getId(l);
        return c;
      }, n = (o) => {
        if (!o.parentNode || !fr(o))
          return;
        const l = Oe(o.parentNode) ? this.mirror.getId(hr(o)) : this.mirror.getId(o.parentNode), c = i(o);
        if (l === -1 || c === -1)
          return r.addNode(o);
        const u = we(o, {
          doc: this.doc,
          mirror: this.mirror,
          blockClass: this.blockClass,
          blockSelector: this.blockSelector,
          maskTextClass: this.maskTextClass,
          maskTextSelector: this.maskTextSelector,
          skipChild: !0,
          newlyAddedElement: !0,
          inlineStylesheet: this.inlineStylesheet,
          maskInputOptions: this.maskInputOptions,
          maskTextFn: this.maskTextFn,
          maskInputFn: this.maskInputFn,
          slimDOMOptions: this.slimDOMOptions,
          dataURLOptions: this.dataURLOptions,
          recordCanvas: this.recordCanvas,
          inlineImages: this.inlineImages,
          onSerialize: (d) => {
            _e(d, this.mirror) && this.iframeManager.addIframe(d), cr(d, this.mirror) && this.stylesheetManager.trackLinkElement(d), Ie(o) && this.shadowDomManager.addShadowRoot(o.shadowRoot, this.doc);
          },
          onIframeLoad: (d, h) => {
            this.iframeManager.attachIframe(d, h), this.shadowDomManager.observeAttachShadow(d);
          },
          onStylesheetLoad: (d, h) => {
            this.stylesheetManager.attachLinkElement(d, h);
          }
        });
        u && t.push({
          parentId: l,
          nextId: c,
          node: u
        });
      };
      for (; this.mapRemoves.length; )
        this.mirror.removeNodeFromMap(this.mapRemoves.shift());
      for (const o of this.movedSet)
        Dt(this.removes, o, this.mirror) && !this.movedSet.has(o.parentNode) || n(o);
      for (const o of this.addedSet)
        !kt(this.droppedSet, o) && !Dt(this.removes, o, this.mirror) || kt(this.movedSet, o) ? n(o) : this.droppedSet.add(o);
      let s = null;
      for (; r.length; ) {
        let o = null;
        if (s) {
          const l = this.mirror.getId(s.value.parentNode), c = i(s.value);
          l !== -1 && c !== -1 && (o = s);
        }
        if (!o)
          for (let l = r.length - 1; l >= 0; l--) {
            const c = r.get(l);
            if (c) {
              const u = this.mirror.getId(c.value.parentNode);
              if (i(c.value) === -1)
                continue;
              if (u !== -1) {
                o = c;
                break;
              } else {
                const h = c.value;
                if (h.parentNode && h.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                  const p = h.parentNode.host;
                  if (this.mirror.getId(p) !== -1) {
                    o = c;
                    break;
                  }
                }
              }
            }
          }
        if (!o) {
          for (; r.head; )
            r.removeNode(r.head.value);
          break;
        }
        s = o.previous, r.removeNode(o.value), n(o.value);
      }
      const a = {
        texts: this.texts.map((o) => ({
          id: this.mirror.getId(o.node),
          value: o.value
        })).filter((o) => this.mirror.has(o.id)),
        attributes: this.attributes.map((o) => ({
          id: this.mirror.getId(o.node),
          attributes: o.attributes
        })).filter((o) => this.mirror.has(o.id)),
        removes: this.removes,
        adds: t
      };
      !a.texts.length && !a.attributes.length && !a.removes.length && !a.adds.length || (this.texts = [], this.attributes = [], this.removes = [], this.addedSet = /* @__PURE__ */ new Set(), this.movedSet = /* @__PURE__ */ new Set(), this.droppedSet = /* @__PURE__ */ new Set(), this.movedMap = {}, this.mutationCb(a));
    }, this.processMutation = (t) => {
      if (!it(t.target, this.mirror))
        switch (t.type) {
          case "characterData": {
            const r = t.target.textContent;
            !re(t.target, this.blockClass, this.blockSelector, !1) && r !== t.oldValue && this.texts.push({
              value: tr(t.target, this.maskTextClass, this.maskTextSelector) && r ? this.maskTextFn ? this.maskTextFn(r) : r.replace(/[\S]/g, "*") : r,
              node: t.target
            });
            break;
          }
          case "attributes": {
            const r = t.target;
            let i = t.attributeName, n = t.target.getAttribute(i);
            if (i === "value") {
              const a = gt(r);
              n = mt({
                element: r,
                maskInputOptions: this.maskInputOptions,
                tagName: r.tagName,
                type: a,
                value: n,
                maskInputFn: this.maskInputFn
              });
            }
            if (re(t.target, this.blockClass, this.blockSelector, !1) || n === t.oldValue)
              return;
            let s = this.attributes.find((a) => a.node === t.target);
            if (r.tagName === "IFRAME" && i === "src" && !this.keepIframeSrcFn(n))
              if (!r.contentDocument)
                i = "rr_src";
              else
                return;
            if (s || (s = {
              node: t.target,
              attributes: {}
            }, this.attributes.push(s)), i === "type" && r.tagName === "INPUT" && (t.oldValue || "").toLowerCase() === "password" && r.setAttribute("data-rr-is-password", "true"), i === "style") {
              const a = this.doc.createElement("span");
              t.oldValue && a.setAttribute("style", t.oldValue), (s.attributes.style === void 0 || s.attributes.style === null) && (s.attributes.style = {});
              const o = s.attributes.style;
              for (const l of Array.from(r.style)) {
                const c = r.style.getPropertyValue(l), u = r.style.getPropertyPriority(l);
                (c !== a.style.getPropertyValue(l) || u !== a.style.getPropertyPriority(l)) && (u === "" ? o[l] = c : o[l] = [c, u]);
              }
              for (const l of Array.from(a.style))
                r.style.getPropertyValue(l) === "" && (o[l] = !1);
            } else
              er(r.tagName, i) || (s.attributes[i] = $t(this.doc, r.tagName, i, n));
            break;
          }
          case "childList": {
            if (re(t.target, this.blockClass, this.blockSelector, !0))
              return;
            t.addedNodes.forEach((r) => this.genAdds(r, t.target)), t.removedNodes.forEach((r) => {
              const i = this.mirror.getId(r), n = Oe(t.target) ? this.mirror.getId(t.target.host) : this.mirror.getId(t.target);
              re(t.target, this.blockClass, this.blockSelector, !1) || it(r, this.mirror) || !Ii(r, this.mirror) || (this.addedSet.has(r) ? (ut(this.addedSet, r), this.droppedSet.add(r)) : this.addedSet.has(t.target) && i === -1 || or(t.target, this.mirror) || (this.movedSet.has(r) && this.movedMap[Rt(i, n)] ? ut(this.movedSet, r) : this.removes.push({
                parentId: n,
                id: i,
                isShadow: Oe(t.target) && Le(t.target) ? !0 : void 0
              })), this.mapRemoves.push(r));
            });
            break;
          }
        }
    }, this.genAdds = (t, r) => {
      if (!this.processedNodeManager.inOtherBuffer(t, this)) {
        if (this.mirror.hasNode(t)) {
          if (it(t, this.mirror))
            return;
          this.movedSet.add(t);
          let i = null;
          r && this.mirror.hasNode(r) && (i = this.mirror.getId(r)), i && i !== -1 && (this.movedMap[Rt(this.mirror.getId(t), i)] = !0);
        } else
          this.addedSet.add(t), this.droppedSet.delete(t);
        re(t, this.blockClass, this.blockSelector, !1) || (t.childNodes.forEach((i) => this.genAdds(i)), Ie(t) && t.shadowRoot.childNodes.forEach((i) => {
          this.processedNodeManager.add(i, this), this.genAdds(i, t);
        }));
      }
    };
  }
  init(t) {
    [
      "mutationCb",
      "blockClass",
      "blockSelector",
      "maskTextClass",
      "maskTextSelector",
      "inlineStylesheet",
      "maskInputOptions",
      "maskTextFn",
      "maskInputFn",
      "keepIframeSrcFn",
      "recordCanvas",
      "inlineImages",
      "slimDOMOptions",
      "dataURLOptions",
      "doc",
      "mirror",
      "iframeManager",
      "stylesheetManager",
      "shadowDomManager",
      "canvasManager",
      "processedNodeManager"
    ].forEach((r) => {
      this[r] = t[r];
    });
  }
  freeze() {
    this.frozen = !0, this.canvasManager.freeze();
  }
  unfreeze() {
    this.frozen = !1, this.canvasManager.unfreeze(), this.emit();
  }
  isFrozen() {
    return this.frozen;
  }
  lock() {
    this.locked = !0, this.canvasManager.lock();
  }
  unlock() {
    this.locked = !1, this.canvasManager.unlock(), this.emit();
  }
  reset() {
    this.shadowDomManager.reset(), this.canvasManager.reset();
  }
}
function ut(e, t) {
  e.delete(t), t.childNodes.forEach((r) => ut(e, r));
}
function Dt(e, t, r) {
  return e.length === 0 ? !1 : pr(e, t, r);
}
function pr(e, t, r) {
  const { parentNode: i } = t;
  if (!i)
    return !1;
  const n = r.getId(i);
  return e.some((s) => s.id === n) ? !0 : pr(e, i, r);
}
function kt(e, t) {
  return e.size === 0 ? !1 : mr(e, t);
}
function mr(e, t) {
  const { parentNode: r } = t;
  return r ? e.has(r) ? !0 : mr(e, r) : !1;
}
let Be;
function Ti(e) {
  Be = e;
}
function wi() {
  Be = void 0;
}
const x = (e) => Be ? (...r) => {
  try {
    return e(...r);
  } catch (i) {
    if (Be && Be(i) === !0)
      return;
    throw i;
  }
} : e, Ce = [];
function Ge(e) {
  try {
    if ("composedPath" in e) {
      const t = e.composedPath();
      if (t.length)
        return t[0];
    } else if ("path" in e && e.path.length)
      return e.path[0];
    return e.target;
  } catch {
    return e.target;
  }
}
function gr(e, t) {
  var r, i;
  const n = new Ni();
  Ce.push(n), n.init(e);
  let s = window.MutationObserver || window.__rrMutationObserver;
  const a = (i = (r = window == null ? void 0 : window.Zone) === null || r === void 0 ? void 0 : r.__symbol__) === null || i === void 0 ? void 0 : i.call(r, "MutationObserver");
  a && window[a] && (s = window[a]);
  const o = new s(x(n.processMutations.bind(n)));
  return o.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    characterData: !0,
    characterDataOldValue: !0,
    childList: !0,
    subtree: !0
  }), o;
}
function Mi({ mousemoveCb: e, sampling: t, doc: r, mirror: i }) {
  if (t.mousemove === !1)
    return () => {
    };
  const n = typeof t.mousemove == "number" ? t.mousemove : 50, s = typeof t.mousemoveCallback == "number" ? t.mousemoveCallback : 500;
  let a = [], o;
  const l = Ve(x((d) => {
    const h = Date.now() - o;
    e(a.map((p) => (p.timeOffset -= h, p)), d), a = [], o = null;
  }), s), c = x(Ve(x((d) => {
    const h = Ge(d), { clientX: p, clientY: f } = ct(d) ? d.changedTouches[0] : d;
    o || (o = Date.now()), a.push({
      x: p,
      y: f,
      id: i.getId(h),
      timeOffset: Date.now() - o
    }), l(typeof DragEvent < "u" && d instanceof DragEvent ? A.Drag : d instanceof MouseEvent ? A.MouseMove : A.TouchMove);
  }), n, {
    trailing: !1
  })), u = [
    te("mousemove", c, r),
    te("touchmove", c, r),
    te("drag", c, r)
  ];
  return x(() => {
    u.forEach((d) => d());
  });
}
function Ri({ mouseInteractionCb: e, doc: t, mirror: r, blockClass: i, blockSelector: n, sampling: s }) {
  if (s.mouseInteraction === !1)
    return () => {
    };
  const a = s.mouseInteraction === !0 || s.mouseInteraction === void 0 ? {} : s.mouseInteraction, o = [];
  let l = null;
  const c = (u) => (d) => {
    const h = Ge(d);
    if (re(h, i, n, !0))
      return;
    let p = null, f = u;
    if ("pointerType" in d) {
      switch (d.pointerType) {
        case "mouse":
          p = fe.Mouse;
          break;
        case "touch":
          p = fe.Touch;
          break;
        case "pen":
          p = fe.Pen;
          break;
      }
      p === fe.Touch ? O[u] === O.MouseDown ? f = "TouchStart" : O[u] === O.MouseUp && (f = "TouchEnd") : fe.Pen;
    } else
      ct(d) && (p = fe.Touch);
    p !== null ? (l = p, (f.startsWith("Touch") && p === fe.Touch || f.startsWith("Mouse") && p === fe.Mouse) && (p = null)) : O[u] === O.Click && (p = l, l = null);
    const g = ct(d) ? d.changedTouches[0] : d;
    if (!g)
      return;
    const C = r.getId(h), { clientX: m, clientY: y } = g;
    x(e)(Object.assign({ type: O[f], id: C, x: m, y }, p !== null && { pointerType: p }));
  };
  return Object.keys(O).filter((u) => Number.isNaN(Number(u)) && !u.endsWith("_Departed") && a[u] !== !1).forEach((u) => {
    let d = u.toLowerCase();
    const h = c(u);
    if (window.PointerEvent)
      switch (O[u]) {
        case O.MouseDown:
        case O.MouseUp:
          d = d.replace("mouse", "pointer");
          break;
        case O.TouchStart:
        case O.TouchEnd:
          return;
      }
    o.push(te(d, h, t));
  }), x(() => {
    o.forEach((u) => u());
  });
}
function yr({ scrollCb: e, doc: t, mirror: r, blockClass: i, blockSelector: n, sampling: s }) {
  const a = x(Ve(x((o) => {
    const l = Ge(o);
    if (!l || re(l, i, n, !0))
      return;
    const c = r.getId(l);
    if (l === t && t.defaultView) {
      const u = ir(t.defaultView);
      e({
        id: c,
        x: u.left,
        y: u.top
      });
    } else
      e({
        id: c,
        x: l.scrollLeft,
        y: l.scrollTop
      });
  }), s.scroll || 100));
  return te("scroll", a, t);
}
function Di({ viewportResizeCb: e }) {
  let t = -1, r = -1;
  const i = x(Ve(x(() => {
    const n = nr(), s = sr();
    (t !== n || r !== s) && (e({
      width: Number(s),
      height: Number(n)
    }), t = n, r = s);
  }), 200));
  return te("resize", i, window);
}
function xt(e, t) {
  const r = Object.assign({}, e);
  return t || delete r.userTriggered, r;
}
const ki = ["INPUT", "TEXTAREA", "SELECT"], Ot = /* @__PURE__ */ new WeakMap();
function xi({ inputCb: e, doc: t, mirror: r, blockClass: i, blockSelector: n, ignoreClass: s, maskInputOptions: a, maskInputFn: o, sampling: l, userTriggeredOnInput: c }) {
  function u(m) {
    let y = Ge(m);
    const v = m.isTrusted, b = y && y.tagName;
    if (y && b === "OPTION" && (y = y.parentElement), !y || !b || ki.indexOf(b) < 0 || re(y, i, n, !0) || y.classList.contains(s))
      return;
    let R = y.value, D = !1;
    const _ = gt(y) || "";
    _ === "radio" || _ === "checkbox" ? D = y.checked : (a[b.toLowerCase()] || a[_]) && (R = mt({
      element: y,
      maskInputOptions: a,
      tagName: b,
      type: _,
      value: R,
      maskInputFn: o
    })), d(y, x(xt)({ text: R, isChecked: D, userTriggered: v }, c));
    const B = y.name;
    _ === "radio" && B && D && t.querySelectorAll(`input[type="radio"][name="${B}"]`).forEach((Y) => {
      Y !== y && d(Y, x(xt)({
        text: Y.value,
        isChecked: !D,
        userTriggered: !1
      }, c));
    });
  }
  function d(m, y) {
    const v = Ot.get(m);
    if (!v || v.text !== y.text || v.isChecked !== y.isChecked) {
      Ot.set(m, y);
      const b = r.getId(m);
      x(e)(Object.assign(Object.assign({}, y), { id: b }));
    }
  }
  const p = (l.input === "last" ? ["change"] : ["input", "change"]).map((m) => te(m, x(u), t)), f = t.defaultView;
  if (!f)
    return () => {
      p.forEach((m) => m());
    };
  const g = f.Object.getOwnPropertyDescriptor(f.HTMLInputElement.prototype, "value"), C = [
    [f.HTMLInputElement.prototype, "value"],
    [f.HTMLInputElement.prototype, "checked"],
    [f.HTMLSelectElement.prototype, "value"],
    [f.HTMLTextAreaElement.prototype, "value"],
    [f.HTMLSelectElement.prototype, "selectedIndex"],
    [f.HTMLOptionElement.prototype, "selected"]
  ];
  return g && g.set && p.push(...C.map((m) => tt(m[0], m[1], {
    set() {
      x(u)({
        target: this,
        isTrusted: !1
      });
    }
  }, !1, f))), x(() => {
    p.forEach((m) => m());
  });
}
function Je(e) {
  const t = [];
  function r(i, n) {
    if (He("CSSGroupingRule") && i.parentRule instanceof CSSGroupingRule || He("CSSMediaRule") && i.parentRule instanceof CSSMediaRule || He("CSSSupportsRule") && i.parentRule instanceof CSSSupportsRule || He("CSSConditionRule") && i.parentRule instanceof CSSConditionRule) {
      const a = Array.from(i.parentRule.cssRules).indexOf(i);
      n.unshift(a);
    } else if (i.parentStyleSheet) {
      const a = Array.from(i.parentStyleSheet.cssRules).indexOf(i);
      n.unshift(a);
    }
    return n;
  }
  return r(e, t);
}
function ge(e, t, r) {
  let i, n;
  return e ? (e.ownerNode ? i = t.getId(e.ownerNode) : n = r.getId(e), {
    styleId: n,
    id: i
  }) : {};
}
function Oi({ styleSheetRuleCb: e, mirror: t, stylesheetManager: r }, { win: i }) {
  if (!i.CSSStyleSheet || !i.CSSStyleSheet.prototype)
    return () => {
    };
  const n = i.CSSStyleSheet.prototype.insertRule;
  i.CSSStyleSheet.prototype.insertRule = new Proxy(n, {
    apply: x((u, d, h) => {
      const [p, f] = h, { id: g, styleId: C } = ge(d, t, r.styleMirror);
      return (g && g !== -1 || C && C !== -1) && e({
        id: g,
        styleId: C,
        adds: [{ rule: p, index: f }]
      }), u.apply(d, h);
    })
  });
  const s = i.CSSStyleSheet.prototype.deleteRule;
  i.CSSStyleSheet.prototype.deleteRule = new Proxy(s, {
    apply: x((u, d, h) => {
      const [p] = h, { id: f, styleId: g } = ge(d, t, r.styleMirror);
      return (f && f !== -1 || g && g !== -1) && e({
        id: f,
        styleId: g,
        removes: [{ index: p }]
      }), u.apply(d, h);
    })
  });
  let a;
  i.CSSStyleSheet.prototype.replace && (a = i.CSSStyleSheet.prototype.replace, i.CSSStyleSheet.prototype.replace = new Proxy(a, {
    apply: x((u, d, h) => {
      const [p] = h, { id: f, styleId: g } = ge(d, t, r.styleMirror);
      return (f && f !== -1 || g && g !== -1) && e({
        id: f,
        styleId: g,
        replace: p
      }), u.apply(d, h);
    })
  }));
  let o;
  i.CSSStyleSheet.prototype.replaceSync && (o = i.CSSStyleSheet.prototype.replaceSync, i.CSSStyleSheet.prototype.replaceSync = new Proxy(o, {
    apply: x((u, d, h) => {
      const [p] = h, { id: f, styleId: g } = ge(d, t, r.styleMirror);
      return (f && f !== -1 || g && g !== -1) && e({
        id: f,
        styleId: g,
        replaceSync: p
      }), u.apply(d, h);
    })
  }));
  const l = {};
  Ye("CSSGroupingRule") ? l.CSSGroupingRule = i.CSSGroupingRule : (Ye("CSSMediaRule") && (l.CSSMediaRule = i.CSSMediaRule), Ye("CSSConditionRule") && (l.CSSConditionRule = i.CSSConditionRule), Ye("CSSSupportsRule") && (l.CSSSupportsRule = i.CSSSupportsRule));
  const c = {};
  return Object.entries(l).forEach(([u, d]) => {
    c[u] = {
      insertRule: d.prototype.insertRule,
      deleteRule: d.prototype.deleteRule
    }, d.prototype.insertRule = new Proxy(c[u].insertRule, {
      apply: x((h, p, f) => {
        const [g, C] = f, { id: m, styleId: y } = ge(p.parentStyleSheet, t, r.styleMirror);
        return (m && m !== -1 || y && y !== -1) && e({
          id: m,
          styleId: y,
          adds: [
            {
              rule: g,
              index: [
                ...Je(p),
                C || 0
              ]
            }
          ]
        }), h.apply(p, f);
      })
    }), d.prototype.deleteRule = new Proxy(c[u].deleteRule, {
      apply: x((h, p, f) => {
        const [g] = f, { id: C, styleId: m } = ge(p.parentStyleSheet, t, r.styleMirror);
        return (C && C !== -1 || m && m !== -1) && e({
          id: C,
          styleId: m,
          removes: [
            { index: [...Je(p), g] }
          ]
        }), h.apply(p, f);
      })
    });
  }), x(() => {
    i.CSSStyleSheet.prototype.insertRule = n, i.CSSStyleSheet.prototype.deleteRule = s, a && (i.CSSStyleSheet.prototype.replace = a), o && (i.CSSStyleSheet.prototype.replaceSync = o), Object.entries(l).forEach(([u, d]) => {
      d.prototype.insertRule = c[u].insertRule, d.prototype.deleteRule = c[u].deleteRule;
    });
  });
}
function vr({ mirror: e, stylesheetManager: t }, r) {
  var i, n, s;
  let a = null;
  r.nodeName === "#document" ? a = e.getId(r) : a = e.getId(r.host);
  const o = r.nodeName === "#document" ? (i = r.defaultView) === null || i === void 0 ? void 0 : i.Document : (s = (n = r.ownerDocument) === null || n === void 0 ? void 0 : n.defaultView) === null || s === void 0 ? void 0 : s.ShadowRoot, l = Object.getOwnPropertyDescriptor(o == null ? void 0 : o.prototype, "adoptedStyleSheets");
  return a === null || a === -1 || !o || !l ? () => {
  } : (Object.defineProperty(r, "adoptedStyleSheets", {
    configurable: l.configurable,
    enumerable: l.enumerable,
    get() {
      var c;
      return (c = l.get) === null || c === void 0 ? void 0 : c.call(this);
    },
    set(c) {
      var u;
      const d = (u = l.set) === null || u === void 0 ? void 0 : u.call(this, c);
      if (a !== null && a !== -1)
        try {
          t.adoptStyleSheets(c, a);
        } catch {
        }
      return d;
    }
  }), x(() => {
    Object.defineProperty(r, "adoptedStyleSheets", {
      configurable: l.configurable,
      enumerable: l.enumerable,
      get: l.get,
      set: l.set
    });
  }));
}
function Li({ styleDeclarationCb: e, mirror: t, ignoreCSSAttributes: r, stylesheetManager: i }, { win: n }) {
  const s = n.CSSStyleDeclaration.prototype.setProperty;
  n.CSSStyleDeclaration.prototype.setProperty = new Proxy(s, {
    apply: x((o, l, c) => {
      var u;
      const [d, h, p] = c;
      if (r.has(d))
        return s.apply(l, [d, h, p]);
      const { id: f, styleId: g } = ge((u = l.parentRule) === null || u === void 0 ? void 0 : u.parentStyleSheet, t, i.styleMirror);
      return (f && f !== -1 || g && g !== -1) && e({
        id: f,
        styleId: g,
        set: {
          property: d,
          value: h,
          priority: p
        },
        index: Je(l.parentRule)
      }), o.apply(l, c);
    })
  });
  const a = n.CSSStyleDeclaration.prototype.removeProperty;
  return n.CSSStyleDeclaration.prototype.removeProperty = new Proxy(a, {
    apply: x((o, l, c) => {
      var u;
      const [d] = c;
      if (r.has(d))
        return a.apply(l, [d]);
      const { id: h, styleId: p } = ge((u = l.parentRule) === null || u === void 0 ? void 0 : u.parentStyleSheet, t, i.styleMirror);
      return (h && h !== -1 || p && p !== -1) && e({
        id: h,
        styleId: p,
        remove: {
          property: d
        },
        index: Je(l.parentRule)
      }), o.apply(l, c);
    })
  }), x(() => {
    n.CSSStyleDeclaration.prototype.setProperty = s, n.CSSStyleDeclaration.prototype.removeProperty = a;
  });
}
function Fi({ mediaInteractionCb: e, blockClass: t, blockSelector: r, mirror: i, sampling: n }) {
  const s = x((o) => Ve(x((l) => {
    const c = Ge(l);
    if (!c || re(c, t, r, !0))
      return;
    const { currentTime: u, volume: d, muted: h, playbackRate: p } = c;
    e({
      type: o,
      id: i.getId(c),
      currentTime: u,
      volume: d,
      muted: h,
      playbackRate: p
    });
  }), n.media || 500)), a = [
    te("play", s(0)),
    te("pause", s(1)),
    te("seeked", s(2)),
    te("volumechange", s(3)),
    te("ratechange", s(4))
  ];
  return x(() => {
    a.forEach((o) => o());
  });
}
function _i({ fontCb: e, doc: t }) {
  const r = t.defaultView;
  if (!r)
    return () => {
    };
  const i = [], n = /* @__PURE__ */ new WeakMap(), s = r.FontFace;
  r.FontFace = function(l, c, u) {
    const d = new s(l, c, u);
    return n.set(d, {
      family: l,
      buffer: typeof c != "string",
      descriptors: u,
      fontSource: typeof c == "string" ? c : JSON.stringify(Array.from(new Uint8Array(c)))
    }), d;
  };
  const a = Ue(t.fonts, "add", function(o) {
    return function(l) {
      return setTimeout(x(() => {
        const c = n.get(l);
        c && (e(c), n.delete(l));
      }), 0), o.apply(this, [l]);
    };
  });
  return i.push(() => {
    r.FontFace = s;
  }), i.push(a), x(() => {
    i.forEach((o) => o());
  });
}
function Bi(e) {
  const { doc: t, mirror: r, blockClass: i, blockSelector: n, selectionCb: s } = e;
  let a = !0;
  const o = x(() => {
    const l = t.getSelection();
    if (!l || a && (l != null && l.isCollapsed))
      return;
    a = l.isCollapsed || !1;
    const c = [], u = l.rangeCount || 0;
    for (let d = 0; d < u; d++) {
      const h = l.getRangeAt(d), { startContainer: p, startOffset: f, endContainer: g, endOffset: C } = h;
      re(p, i, n, !0) || re(g, i, n, !0) || c.push({
        start: r.getId(p),
        startOffset: f,
        end: r.getId(g),
        endOffset: C
      });
    }
    s({ ranges: c });
  });
  return o(), te("selectionchange", o);
}
function Wi(e, t) {
  const { mutationCb: r, mousemoveCb: i, mouseInteractionCb: n, scrollCb: s, viewportResizeCb: a, inputCb: o, mediaInteractionCb: l, styleSheetRuleCb: c, styleDeclarationCb: u, canvasMutationCb: d, fontCb: h, selectionCb: p } = e;
  e.mutationCb = (...f) => {
    t.mutation && t.mutation(...f), r(...f);
  }, e.mousemoveCb = (...f) => {
    t.mousemove && t.mousemove(...f), i(...f);
  }, e.mouseInteractionCb = (...f) => {
    t.mouseInteraction && t.mouseInteraction(...f), n(...f);
  }, e.scrollCb = (...f) => {
    t.scroll && t.scroll(...f), s(...f);
  }, e.viewportResizeCb = (...f) => {
    t.viewportResize && t.viewportResize(...f), a(...f);
  }, e.inputCb = (...f) => {
    t.input && t.input(...f), o(...f);
  }, e.mediaInteractionCb = (...f) => {
    t.mediaInteaction && t.mediaInteaction(...f), l(...f);
  }, e.styleSheetRuleCb = (...f) => {
    t.styleSheetRule && t.styleSheetRule(...f), c(...f);
  }, e.styleDeclarationCb = (...f) => {
    t.styleDeclaration && t.styleDeclaration(...f), u(...f);
  }, e.canvasMutationCb = (...f) => {
    t.canvasMutation && t.canvasMutation(...f), d(...f);
  }, e.fontCb = (...f) => {
    t.font && t.font(...f), h(...f);
  }, e.selectionCb = (...f) => {
    t.selection && t.selection(...f), p(...f);
  };
}
function Vi(e, t = {}) {
  const r = e.doc.defaultView;
  if (!r)
    return () => {
    };
  Wi(e, t);
  const i = gr(e, e.doc), n = Mi(e), s = Ri(e), a = yr(e), o = Di(e), l = xi(e), c = Fi(e), u = Oi(e, { win: r }), d = vr(e, e.doc), h = Li(e, {
    win: r
  }), p = e.collectFonts ? _i(e) : () => {
  }, f = Bi(e), g = [];
  for (const C of e.plugins)
    g.push(C.observer(C.callback, r, C.options));
  return x(() => {
    Ce.forEach((C) => C.reset()), i.disconnect(), n(), s(), a(), o(), l(), c(), u(), d(), h(), p(), f(), g.forEach((C) => C());
  });
}
function He(e) {
  return typeof window[e] < "u";
}
function Ye(e) {
  return !!(typeof window[e] < "u" && window[e].prototype && "insertRule" in window[e].prototype && "deleteRule" in window[e].prototype);
}
class Lt {
  constructor(t) {
    this.generateIdFn = t, this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
  }
  getId(t, r, i, n) {
    const s = i || this.getIdToRemoteIdMap(t), a = n || this.getRemoteIdToIdMap(t);
    let o = s.get(r);
    return o || (o = this.generateIdFn(), s.set(r, o), a.set(o, r)), o;
  }
  getIds(t, r) {
    const i = this.getIdToRemoteIdMap(t), n = this.getRemoteIdToIdMap(t);
    return r.map((s) => this.getId(t, s, i, n));
  }
  getRemoteId(t, r, i) {
    const n = i || this.getRemoteIdToIdMap(t);
    if (typeof r != "number")
      return r;
    const s = n.get(r);
    return s || -1;
  }
  getRemoteIds(t, r) {
    const i = this.getRemoteIdToIdMap(t);
    return r.map((n) => this.getRemoteId(t, n, i));
  }
  reset(t) {
    if (!t) {
      this.iframeIdToRemoteIdMap = /* @__PURE__ */ new WeakMap(), this.iframeRemoteIdToIdMap = /* @__PURE__ */ new WeakMap();
      return;
    }
    this.iframeIdToRemoteIdMap.delete(t), this.iframeRemoteIdToIdMap.delete(t);
  }
  getIdToRemoteIdMap(t) {
    let r = this.iframeIdToRemoteIdMap.get(t);
    return r || (r = /* @__PURE__ */ new Map(), this.iframeIdToRemoteIdMap.set(t, r)), r;
  }
  getRemoteIdToIdMap(t) {
    let r = this.iframeRemoteIdToIdMap.get(t);
    return r || (r = /* @__PURE__ */ new Map(), this.iframeRemoteIdToIdMap.set(t, r)), r;
  }
}
class Ui {
  constructor(t) {
    this.iframes = /* @__PURE__ */ new WeakMap(), this.crossOriginIframeMap = /* @__PURE__ */ new WeakMap(), this.crossOriginIframeMirror = new Lt(qt), this.crossOriginIframeRootIdMap = /* @__PURE__ */ new WeakMap(), this.mutationCb = t.mutationCb, this.wrappedEmit = t.wrappedEmit, this.stylesheetManager = t.stylesheetManager, this.recordCrossOriginIframes = t.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new Lt(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = t.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this));
  }
  addIframe(t) {
    this.iframes.set(t, !0), t.contentWindow && this.crossOriginIframeMap.set(t.contentWindow, t);
  }
  addLoadListener(t) {
    this.loadListener = t;
  }
  attachIframe(t, r) {
    var i;
    this.mutationCb({
      adds: [
        {
          parentId: this.mirror.getId(t),
          nextId: null,
          node: r
        }
      ],
      removes: [],
      texts: [],
      attributes: [],
      isAttachIframe: !0
    }), (i = this.loadListener) === null || i === void 0 || i.call(this, t), t.contentDocument && t.contentDocument.adoptedStyleSheets && t.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(t.contentDocument.adoptedStyleSheets, this.mirror.getId(t.contentDocument));
  }
  handleMessage(t) {
    const r = t;
    if (r.data.type !== "rrweb" || r.origin !== r.data.origin || !t.source)
      return;
    const n = this.crossOriginIframeMap.get(t.source);
    if (!n)
      return;
    const s = this.transformCrossOriginEvent(n, r.data.event);
    s && this.wrappedEmit(s, r.data.isCheckout);
  }
  transformCrossOriginEvent(t, r) {
    var i;
    switch (r.type) {
      case E.FullSnapshot: {
        this.crossOriginIframeMirror.reset(t), this.crossOriginIframeStyleMirror.reset(t), this.replaceIdOnNode(r.data.node, t);
        const n = r.data.node.id;
        return this.crossOriginIframeRootIdMap.set(t, n), this.patchRootIdOnNode(r.data.node, n), {
          timestamp: r.timestamp,
          type: E.IncrementalSnapshot,
          data: {
            source: A.Mutation,
            adds: [
              {
                parentId: this.mirror.getId(t),
                nextId: null,
                node: r.data.node
              }
            ],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
          }
        };
      }
      case E.Meta:
      case E.Load:
      case E.DomContentLoaded:
        return !1;
      case E.Plugin:
        return r;
      case E.Custom:
        return this.replaceIds(r.data.payload, t, ["id", "parentId", "previousId", "nextId"]), r;
      case E.IncrementalSnapshot:
        switch (r.data.source) {
          case A.Mutation:
            return r.data.adds.forEach((n) => {
              this.replaceIds(n, t, [
                "parentId",
                "nextId",
                "previousId"
              ]), this.replaceIdOnNode(n.node, t);
              const s = this.crossOriginIframeRootIdMap.get(t);
              s && this.patchRootIdOnNode(n.node, s);
            }), r.data.removes.forEach((n) => {
              this.replaceIds(n, t, ["parentId", "id"]);
            }), r.data.attributes.forEach((n) => {
              this.replaceIds(n, t, ["id"]);
            }), r.data.texts.forEach((n) => {
              this.replaceIds(n, t, ["id"]);
            }), r;
          case A.Drag:
          case A.TouchMove:
          case A.MouseMove:
            return r.data.positions.forEach((n) => {
              this.replaceIds(n, t, ["id"]);
            }), r;
          case A.ViewportResize:
            return !1;
          case A.MediaInteraction:
          case A.MouseInteraction:
          case A.Scroll:
          case A.CanvasMutation:
          case A.Input:
            return this.replaceIds(r.data, t, ["id"]), r;
          case A.StyleSheetRule:
          case A.StyleDeclaration:
            return this.replaceIds(r.data, t, ["id"]), this.replaceStyleIds(r.data, t, ["styleId"]), r;
          case A.Font:
            return r;
          case A.Selection:
            return r.data.ranges.forEach((n) => {
              this.replaceIds(n, t, ["start", "end"]);
            }), r;
          case A.AdoptedStyleSheet:
            return this.replaceIds(r.data, t, ["id"]), this.replaceStyleIds(r.data, t, ["styleIds"]), (i = r.data.styles) === null || i === void 0 || i.forEach((n) => {
              this.replaceStyleIds(n, t, ["styleId"]);
            }), r;
        }
    }
  }
  replace(t, r, i, n) {
    for (const s of n)
      !Array.isArray(r[s]) && typeof r[s] != "number" || (Array.isArray(r[s]) ? r[s] = t.getIds(i, r[s]) : r[s] = t.getId(i, r[s]));
    return r;
  }
  replaceIds(t, r, i) {
    return this.replace(this.crossOriginIframeMirror, t, r, i);
  }
  replaceStyleIds(t, r, i) {
    return this.replace(this.crossOriginIframeStyleMirror, t, r, i);
  }
  replaceIdOnNode(t, r) {
    this.replaceIds(t, r, ["id", "rootId"]), "childNodes" in t && t.childNodes.forEach((i) => {
      this.replaceIdOnNode(i, r);
    });
  }
  patchRootIdOnNode(t, r) {
    t.type !== w.Document && !t.rootId && (t.rootId = r), "childNodes" in t && t.childNodes.forEach((i) => {
      this.patchRootIdOnNode(i, r);
    });
  }
}
class Gi {
  constructor(t) {
    this.shadowDoms = /* @__PURE__ */ new WeakSet(), this.restoreHandlers = [], this.mutationCb = t.mutationCb, this.scrollCb = t.scrollCb, this.bypassOptions = t.bypassOptions, this.mirror = t.mirror, this.init();
  }
  init() {
    this.reset(), this.patchAttachShadow(Element, document);
  }
  addShadowRoot(t, r) {
    if (!Le(t) || this.shadowDoms.has(t))
      return;
    this.shadowDoms.add(t);
    const i = gr(Object.assign(Object.assign({}, this.bypassOptions), { doc: r, mutationCb: this.mutationCb, mirror: this.mirror, shadowDomManager: this }), t);
    this.restoreHandlers.push(() => i.disconnect()), this.restoreHandlers.push(yr(Object.assign(Object.assign({}, this.bypassOptions), { scrollCb: this.scrollCb, doc: t, mirror: this.mirror }))), setTimeout(() => {
      t.adoptedStyleSheets && t.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(t.adoptedStyleSheets, this.mirror.getId(t.host)), this.restoreHandlers.push(vr({
        mirror: this.mirror,
        stylesheetManager: this.bypassOptions.stylesheetManager
      }, t));
    }, 0);
  }
  observeAttachShadow(t) {
    !t.contentWindow || !t.contentDocument || this.patchAttachShadow(t.contentWindow.Element, t.contentDocument);
  }
  patchAttachShadow(t, r) {
    const i = this;
    this.restoreHandlers.push(Ue(t.prototype, "attachShadow", function(n) {
      return function(s) {
        const a = n.call(this, s);
        return this.shadowRoot && fr(this) && i.addShadowRoot(this.shadowRoot, r), a;
      };
    }));
  }
  reset() {
    this.restoreHandlers.forEach((t) => {
      try {
        t();
      } catch {
      }
    }), this.restoreHandlers = [], this.shadowDoms = /* @__PURE__ */ new WeakSet();
  }
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Pi(e, t) {
  var r = {};
  for (var i in e)
    Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (r[i] = e[i]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, i = Object.getOwnPropertySymbols(e); n < i.length; n++)
      t.indexOf(i[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[n]) && (r[i[n]] = e[i[n]]);
  return r;
}
function ve(e, t, r, i) {
  function n(s) {
    return s instanceof r ? s : new r(function(a) {
      a(s);
    });
  }
  return new (r || (r = Promise))(function(s, a) {
    function o(u) {
      try {
        c(i.next(u));
      } catch (d) {
        a(d);
      }
    }
    function l(u) {
      try {
        c(i.throw(u));
      } catch (d) {
        a(d);
      }
    }
    function c(u) {
      u.done ? s(u.value) : n(u.value).then(o, l);
    }
    c((i = i.apply(e, t || [])).next());
  });
}
var Me = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", xe = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var ze = 0; ze < Me.length; ze++)
  xe[Me.charCodeAt(ze)] = ze;
var Zi = function(e) {
  var t = new Uint8Array(e), r, i = t.length, n = "";
  for (r = 0; r < i; r += 3)
    n += Me[t[r] >> 2], n += Me[(t[r] & 3) << 4 | t[r + 1] >> 4], n += Me[(t[r + 1] & 15) << 2 | t[r + 2] >> 6], n += Me[t[r + 2] & 63];
  return i % 3 === 2 ? n = n.substring(0, n.length - 1) + "=" : i % 3 === 1 && (n = n.substring(0, n.length - 2) + "=="), n;
}, Hi = function(e) {
  var t = e.length * 0.75, r = e.length, i, n = 0, s, a, o, l;
  e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
  var c = new ArrayBuffer(t), u = new Uint8Array(c);
  for (i = 0; i < r; i += 4)
    s = xe[e.charCodeAt(i)], a = xe[e.charCodeAt(i + 1)], o = xe[e.charCodeAt(i + 2)], l = xe[e.charCodeAt(i + 3)], u[n++] = s << 2 | a >> 4, u[n++] = (a & 15) << 4 | o >> 2, u[n++] = (o & 3) << 6 | l & 63;
  return c;
};
const Ft = /* @__PURE__ */ new Map();
function Yi(e, t) {
  let r = Ft.get(e);
  return r || (r = /* @__PURE__ */ new Map(), Ft.set(e, r)), r.has(t) || r.set(t, []), r.get(t);
}
const Ir = (e, t, r) => {
  if (!e || !(Sr(e, t) || typeof e == "object"))
    return;
  const i = e.constructor.name, n = Yi(r, i);
  let s = n.indexOf(e);
  return s === -1 && (s = n.length, n.push(e)), s;
};
function Ke(e, t, r) {
  if (e instanceof Array)
    return e.map((i) => Ke(i, t, r));
  if (e === null)
    return e;
  if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray)
    return {
      rr_type: e.constructor.name,
      args: [Object.values(e)]
    };
  if (e instanceof ArrayBuffer) {
    const i = e.constructor.name, n = Zi(e);
    return {
      rr_type: i,
      base64: n
    };
  } else {
    if (e instanceof DataView)
      return {
        rr_type: e.constructor.name,
        args: [
          Ke(e.buffer, t, r),
          e.byteOffset,
          e.byteLength
        ]
      };
    if (e instanceof HTMLImageElement) {
      const i = e.constructor.name, { src: n } = e;
      return {
        rr_type: i,
        src: n
      };
    } else if (e instanceof HTMLCanvasElement) {
      const i = "HTMLImageElement", n = e.toDataURL();
      return {
        rr_type: i,
        src: n
      };
    } else {
      if (e instanceof ImageData)
        return {
          rr_type: e.constructor.name,
          args: [Ke(e.data, t, r), e.width, e.height]
        };
      if (Sr(e, t) || typeof e == "object") {
        const i = e.constructor.name, n = Ir(e, t, r);
        return {
          rr_type: i,
          index: n
        };
      }
    }
  }
  return e;
}
const Cr = (e, t, r) => [...e].map((i) => Ke(i, t, r)), Sr = (e, t) => !![
  "WebGLActiveInfo",
  "WebGLBuffer",
  "WebGLFramebuffer",
  "WebGLProgram",
  "WebGLRenderbuffer",
  "WebGLShader",
  "WebGLShaderPrecisionFormat",
  "WebGLTexture",
  "WebGLUniformLocation",
  "WebGLVertexArrayObject",
  "WebGLVertexArrayObjectOES"
].filter((n) => typeof t[n] == "function").find((n) => e instanceof t[n]);
function zi(e, t, r, i) {
  const n = [], s = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype);
  for (const a of s)
    try {
      if (typeof t.CanvasRenderingContext2D.prototype[a] != "function")
        continue;
      const o = Ue(t.CanvasRenderingContext2D.prototype, a, function(l) {
        return function(...c) {
          return re(this.canvas, r, i, !0) || setTimeout(() => {
            const u = Cr([...c], t, this);
            e(this.canvas, {
              type: pe["2D"],
              property: a,
              args: u
            });
          }, 0), l.apply(this, c);
        };
      });
      n.push(o);
    } catch {
      const l = tt(t.CanvasRenderingContext2D.prototype, a, {
        set(c) {
          e(this.canvas, {
            type: pe["2D"],
            property: a,
            args: [c],
            setter: !0
          });
        }
      });
      n.push(l);
    }
  return () => {
    n.forEach((a) => a());
  };
}
function _t(e, t, r) {
  const i = [];
  try {
    const n = Ue(e.HTMLCanvasElement.prototype, "getContext", function(s) {
      return function(a, ...o) {
        return re(this, t, r, !0) || "__context" in this || (this.__context = a), s.apply(this, [a, ...o]);
      };
    });
    i.push(n);
  } catch {
    console.error("failed to patch HTMLCanvasElement.prototype.getContext");
  }
  return () => {
    i.forEach((n) => n());
  };
}
function Bt(e, t, r, i, n, s, a) {
  const o = [], l = Object.getOwnPropertyNames(e);
  for (const c of l)
    if (![
      "isContextLost",
      "canvas",
      "drawingBufferWidth",
      "drawingBufferHeight"
    ].includes(c))
      try {
        if (typeof e[c] != "function")
          continue;
        const u = Ue(e, c, function(d) {
          return function(...h) {
            const p = d.apply(this, h);
            if (Ir(p, a, this), !re(this.canvas, i, n, !0)) {
              const f = Cr([...h], a, this), g = {
                type: t,
                property: c,
                args: f
              };
              r(this.canvas, g);
            }
            return p;
          };
        });
        o.push(u);
      } catch {
        const d = tt(e, c, {
          set(h) {
            r(this.canvas, {
              type: t,
              property: c,
              args: [h],
              setter: !0
            });
          }
        });
        o.push(d);
      }
  return o;
}
function Ki(e, t, r, i, n) {
  const s = [];
  return s.push(...Bt(t.WebGLRenderingContext.prototype, pe.WebGL, e, r, i, n, t)), typeof t.WebGL2RenderingContext < "u" && s.push(...Bt(t.WebGL2RenderingContext.prototype, pe.WebGL2, e, r, i, n, t)), () => {
    s.forEach((a) => a());
  };
}
function ji(e, t) {
  var r = atob(e);
  if (t) {
    for (var i = new Uint8Array(r.length), n = 0, s = r.length; n < s; ++n)
      i[n] = r.charCodeAt(n);
    return String.fromCharCode.apply(null, new Uint16Array(i.buffer));
  }
  return r;
}
function Qi(e, t, r) {
  var i = t === void 0 ? null : t, n = r === void 0 ? !1 : r, s = ji(e, n), a = s.indexOf(`
`, 10) + 1, o = s.substring(a) + (i ? "//# sourceMappingURL=" + i : ""), l = new Blob([o], { type: "application/javascript" });
  return URL.createObjectURL(l);
}
function Xi(e, t, r) {
  var i;
  return function(s) {
    return i = i || Qi(e, t, r), new Worker(i, s);
  };
}
var Ji = Xi("Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICAgJ3VzZSBzdHJpY3QnOwoKICAgIC8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKg0KICAgIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLg0KDQogICAgUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55DQogICAgcHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLg0KDQogICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICJBUyBJUyIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEgNCiAgICBSRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkNCiAgICBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsDQogICAgSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NDQogICAgTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1INCiAgICBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SDQogICAgUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS4NCiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqLw0KDQogICAgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikgew0KICAgICAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH0NCiAgICAgICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7DQogICAgICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvclsidGhyb3ciXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9DQogICAgICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfQ0KICAgICAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpOw0KICAgICAgICB9KTsNCiAgICB9CgogICAgLyoKICAgICAqIGJhc2U2NC1hcnJheWJ1ZmZlciAxLjAuMSA8aHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlcj4KICAgICAqIENvcHlyaWdodCAoYykgMjAyMSBOaWtsYXMgdm9uIEhlcnR6ZW4gPGh0dHBzOi8vaGVydHplbi5jb20+CiAgICAgKiBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZQogICAgICovCiAgICB2YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7CiAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguCiAgICB2YXIgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpOwogICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykgewogICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7CiAgICB9CiAgICB2YXIgZW5jb2RlID0gZnVuY3Rpb24gKGFycmF5YnVmZmVyKSB7CiAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnOwogICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykgewogICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTsKICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07CiAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107CiAgICAgICAgfQogICAgICAgIGlmIChsZW4gJSAzID09PSAyKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nOwogICAgICAgIH0KICAgICAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7CiAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JzsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIGJhc2U2NDsKICAgIH07CgogICAgY29uc3QgbGFzdEJsb2JNYXAgPSBuZXcgTWFwKCk7DQogICAgY29uc3QgdHJhbnNwYXJlbnRCbG9iTWFwID0gbmV3IE1hcCgpOw0KICAgIGZ1bmN0aW9uIGdldFRyYW5zcGFyZW50QmxvYkZvcih3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucykgew0KICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgew0KICAgICAgICAgICAgY29uc3QgaWQgPSBgJHt3aWR0aH0tJHtoZWlnaHR9YDsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgaWYgKHRyYW5zcGFyZW50QmxvYk1hcC5oYXMoaWQpKQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNwYXJlbnRCbG9iTWFwLmdldChpZCk7DQogICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2NyZWVuID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh3aWR0aCwgaGVpZ2h0KTsNCiAgICAgICAgICAgICAgICBvZmZzY3JlZW4uZ2V0Q29udGV4dCgnMmQnKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5QnVmZmVyID0geWllbGQgYmxvYi5hcnJheUJ1ZmZlcigpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGJhc2U2NCA9IGVuY29kZShhcnJheUJ1ZmZlcik7DQogICAgICAgICAgICAgICAgdHJhbnNwYXJlbnRCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZTY0Ow0KICAgICAgICAgICAgfQ0KICAgICAgICAgICAgZWxzZSB7DQogICAgICAgICAgICAgICAgcmV0dXJuICcnOw0KICAgICAgICAgICAgfQ0KICAgICAgICB9KTsNCiAgICB9DQogICAgY29uc3Qgd29ya2VyID0gc2VsZjsNCiAgICB3b3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHsNCiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsNCiAgICAgICAgICAgIGlmICgnT2Zmc2NyZWVuQ2FudmFzJyBpbiBnbG9iYWxUaGlzKSB7DQogICAgICAgICAgICAgICAgY29uc3QgeyBpZCwgYml0bWFwLCB3aWR0aCwgaGVpZ2h0LCBkYXRhVVJMT3B0aW9ucyB9ID0gZS5kYXRhOw0KICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcGFyZW50QmFzZTY0ID0gZ2V0VHJhbnNwYXJlbnRCbG9iRm9yKHdpZHRoLCBoZWlnaHQsIGRhdGFVUkxPcHRpb25zKTsNCiAgICAgICAgICAgICAgICBjb25zdCBvZmZzY3JlZW4gPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHdpZHRoLCBoZWlnaHQpOw0KICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IG9mZnNjcmVlbi5nZXRDb250ZXh0KCcyZCcpOw0KICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoYml0bWFwLCAwLCAwKTsNCiAgICAgICAgICAgICAgICBiaXRtYXAuY2xvc2UoKTsNCiAgICAgICAgICAgICAgICBjb25zdCBibG9iID0geWllbGQgb2Zmc2NyZWVuLmNvbnZlcnRUb0Jsb2IoZGF0YVVSTE9wdGlvbnMpOw0KICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBibG9iLnR5cGU7DQogICAgICAgICAgICAgICAgY29uc3QgYXJyYXlCdWZmZXIgPSB5aWVsZCBibG9iLmFycmF5QnVmZmVyKCk7DQogICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0ID0gZW5jb2RlKGFycmF5QnVmZmVyKTsNCiAgICAgICAgICAgICAgICBpZiAoIWxhc3RCbG9iTWFwLmhhcyhpZCkgJiYgKHlpZWxkIHRyYW5zcGFyZW50QmFzZTY0KSA9PT0gYmFzZTY0KSB7DQogICAgICAgICAgICAgICAgICAgIGxhc3RCbG9iTWFwLnNldChpZCwgYmFzZTY0KTsNCiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdvcmtlci5wb3N0TWVzc2FnZSh7IGlkIH0pOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICBpZiAobGFzdEJsb2JNYXAuZ2V0KGlkKSA9PT0gYmFzZTY0KQ0KICAgICAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQgfSk7DQogICAgICAgICAgICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHsNCiAgICAgICAgICAgICAgICAgICAgaWQsDQogICAgICAgICAgICAgICAgICAgIHR5cGUsDQogICAgICAgICAgICAgICAgICAgIGJhc2U2NCwNCiAgICAgICAgICAgICAgICAgICAgd2lkdGgsDQogICAgICAgICAgICAgICAgICAgIGhlaWdodCwNCiAgICAgICAgICAgICAgICB9KTsNCiAgICAgICAgICAgICAgICBsYXN0QmxvYk1hcC5zZXQoaWQsIGJhc2U2NCk7DQogICAgICAgICAgICB9DQogICAgICAgICAgICBlbHNlIHsNCiAgICAgICAgICAgICAgICByZXR1cm4gd29ya2VyLnBvc3RNZXNzYWdlKHsgaWQ6IGUuZGF0YS5pZCB9KTsNCiAgICAgICAgICAgIH0NCiAgICAgICAgfSk7DQogICAgfTsKCn0pKCk7Cgo=", null, !1);
class qi {
  constructor(t) {
    this.pendingCanvasMutations = /* @__PURE__ */ new Map(), this.rafStamps = { latestId: 0, invokeId: null }, this.frozen = !1, this.locked = !1, this.processMutation = (l, c) => {
      (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(l) || this.pendingCanvasMutations.set(l, []), this.pendingCanvasMutations.get(l).push(c);
    };
    const { sampling: r = "all", win: i, blockClass: n, blockSelector: s, recordCanvas: a, dataURLOptions: o } = t;
    this.mutationCb = t.mutationCb, this.mirror = t.mirror, a && r === "all" && this.initCanvasMutationObserver(i, n, s), a && typeof r == "number" && this.initCanvasFPSObserver(r, i, n, s, {
      dataURLOptions: o
    });
  }
  reset() {
    this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers();
  }
  freeze() {
    this.frozen = !0;
  }
  unfreeze() {
    this.frozen = !1;
  }
  lock() {
    this.locked = !0;
  }
  unlock() {
    this.locked = !1;
  }
  initCanvasFPSObserver(t, r, i, n, s) {
    const a = _t(r, i, n), o = /* @__PURE__ */ new Map(), l = new Ji();
    l.onmessage = (f) => {
      const { id: g } = f.data;
      if (o.set(g, !1), !("base64" in f.data))
        return;
      const { base64: C, type: m, width: y, height: v } = f.data;
      this.mutationCb({
        id: g,
        type: pe["2D"],
        commands: [
          {
            property: "clearRect",
            args: [0, 0, y, v]
          },
          {
            property: "drawImage",
            args: [
              {
                rr_type: "ImageBitmap",
                args: [
                  {
                    rr_type: "Blob",
                    data: [{ rr_type: "ArrayBuffer", base64: C }],
                    type: m
                  }
                ]
              },
              0,
              0
            ]
          }
        ]
      });
    };
    const c = 1e3 / t;
    let u = 0, d;
    const h = () => {
      const f = [];
      return r.document.querySelectorAll("canvas").forEach((g) => {
        re(g, i, n, !0) || f.push(g);
      }), f;
    }, p = (f) => {
      if (u && f - u < c) {
        d = requestAnimationFrame(p);
        return;
      }
      u = f, h().forEach((g) => ve(this, void 0, void 0, function* () {
        var C;
        const m = this.mirror.getId(g);
        if (o.get(m))
          return;
        if (o.set(m, !0), ["webgl", "webgl2"].includes(g.__context)) {
          const v = g.getContext(g.__context);
          ((C = v == null ? void 0 : v.getContextAttributes()) === null || C === void 0 ? void 0 : C.preserveDrawingBuffer) === !1 && (v == null || v.clear(v.COLOR_BUFFER_BIT));
        }
        const y = yield createImageBitmap(g);
        l.postMessage({
          id: m,
          bitmap: y,
          width: g.width,
          height: g.height,
          dataURLOptions: s.dataURLOptions
        }, [y]);
      })), d = requestAnimationFrame(p);
    };
    d = requestAnimationFrame(p), this.resetObservers = () => {
      a(), cancelAnimationFrame(d);
    };
  }
  initCanvasMutationObserver(t, r, i) {
    this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
    const n = _t(t, r, i), s = zi(this.processMutation.bind(this), t, r, i), a = Ki(this.processMutation.bind(this), t, r, i, this.mirror);
    this.resetObservers = () => {
      n(), s(), a();
    };
  }
  startPendingCanvasMutationFlusher() {
    requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  startRAFTimestamping() {
    const t = (r) => {
      this.rafStamps.latestId = r, requestAnimationFrame(t);
    };
    requestAnimationFrame(t);
  }
  flushPendingCanvasMutations() {
    this.pendingCanvasMutations.forEach((t, r) => {
      const i = this.mirror.getId(r);
      this.flushPendingCanvasMutationFor(r, i);
    }), requestAnimationFrame(() => this.flushPendingCanvasMutations());
  }
  flushPendingCanvasMutationFor(t, r) {
    if (this.frozen || this.locked)
      return;
    const i = this.pendingCanvasMutations.get(t);
    if (!i || r === -1)
      return;
    const n = i.map((a) => Pi(a, ["type"])), { type: s } = i[0];
    this.mutationCb({ id: r, type: s, commands: n }), this.pendingCanvasMutations.delete(t);
  }
}
class $i {
  constructor(t) {
    this.trackedLinkElements = /* @__PURE__ */ new WeakSet(), this.styleMirror = new dr(), this.mutationCb = t.mutationCb, this.adoptedStyleSheetCb = t.adoptedStyleSheetCb;
  }
  attachLinkElement(t, r) {
    "_cssText" in r.attributes && this.mutationCb({
      adds: [],
      removes: [],
      texts: [],
      attributes: [
        {
          id: r.id,
          attributes: r.attributes
        }
      ]
    }), this.trackLinkElement(t);
  }
  trackLinkElement(t) {
    this.trackedLinkElements.has(t) || (this.trackedLinkElements.add(t), this.trackStylesheetInLinkElement(t));
  }
  adoptStyleSheets(t, r) {
    if (t.length === 0)
      return;
    const i = {
      id: r,
      styleIds: []
    }, n = [];
    for (const s of t) {
      let a;
      if (this.styleMirror.has(s))
        a = this.styleMirror.getId(s);
      else {
        a = this.styleMirror.add(s);
        const o = Array.from(s.rules || CSSRule);
        n.push({
          styleId: a,
          rules: o.map((l, c) => ({
            rule: Xt(l),
            index: c
          }))
        });
      }
      i.styleIds.push(a);
    }
    n.length > 0 && (i.styles = n), this.adoptedStyleSheetCb(i);
  }
  reset() {
    this.styleMirror.reset(), this.trackedLinkElements = /* @__PURE__ */ new WeakSet();
  }
  trackStylesheetInLinkElement(t) {
  }
}
class en {
  constructor() {
    this.nodeMap = /* @__PURE__ */ new WeakMap(), this.loop = !0, this.periodicallyClear();
  }
  periodicallyClear() {
    requestAnimationFrame(() => {
      this.clear(), this.loop && this.periodicallyClear();
    });
  }
  inOtherBuffer(t, r) {
    const i = this.nodeMap.get(t);
    return i && Array.from(i).some((n) => n !== r);
  }
  add(t, r) {
    this.nodeMap.set(t, (this.nodeMap.get(t) || /* @__PURE__ */ new Set()).add(r));
  }
  clear() {
    this.nodeMap = /* @__PURE__ */ new WeakMap();
  }
  destroy() {
    this.loop = !1;
  }
}
function Q(e) {
  return Object.assign(Object.assign({}, e), { timestamp: Date.now() });
}
let H, je, nt, qe = !1;
const ae = Jt();
function Pe(e = {}) {
  const { emit: t, checkoutEveryNms: r, checkoutEveryNth: i, blockClass: n = "rr-block", blockSelector: s = null, ignoreClass: a = "rr-ignore", maskTextClass: o = "rr-mask", maskTextSelector: l = null, inlineStylesheet: c = !0, maskAllInputs: u, maskInputOptions: d, slimDOMOptions: h, maskInputFn: p, maskTextFn: f, hooks: g, packFn: C, sampling: m = {}, dataURLOptions: y = {}, mousemoveWait: v, recordCanvas: b = !1, recordCrossOriginIframes: R = !1, recordAfter: D = e.recordAfter === "DOMContentLoaded" ? e.recordAfter : "load", userTriggeredOnInput: _ = !1, collectFonts: B = !1, inlineImages: Y = !1, plugins: z, keepIframeSrcFn: X = () => !1, ignoreCSSAttributes: $ = /* @__PURE__ */ new Set([]), errorHandler: J } = e;
  Ti(J);
  const ie = R ? window.parent === window : !0;
  let W = !1;
  if (!ie)
    try {
      window.parent.document && (W = !1);
    } catch {
      W = !0;
    }
  if (ie && !t)
    throw new Error("emit function is required");
  v !== void 0 && m.mousemove === void 0 && (m.mousemove = v), ae.reset();
  const K = u === !0 ? {
    color: !0,
    date: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
    textarea: !0,
    select: !0,
    password: !0
  } : d !== void 0 ? d : { password: !0 }, L = h === !0 || h === "all" ? {
    script: !0,
    comment: !0,
    headFavicon: !0,
    headWhitespace: !0,
    headMetaSocial: !0,
    headMetaRobots: !0,
    headMetaHttpEquiv: !0,
    headMetaVerification: !0,
    headMetaAuthorship: h === "all",
    headMetaDescKeywords: h === "all"
  } : h || {};
  ar();
  let q, S = 0;
  const I = (N) => {
    for (const ee of z || [])
      ee.eventProcessor && (N = ee.eventProcessor(N));
    return C && !W && (N = C(N)), N;
  };
  H = (N, ee) => {
    var V;
    if (!((V = Ce[0]) === null || V === void 0) && V.isFrozen() && N.type !== E.FullSnapshot && !(N.type === E.IncrementalSnapshot && N.data.source === A.Mutation) && Ce.forEach((P) => P.unfreeze()), ie)
      t == null || t(I(N), ee);
    else if (W) {
      const P = {
        type: "rrweb",
        event: I(N),
        origin: window.location.origin,
        isCheckout: ee
      };
      window.parent.postMessage(P, "*");
    }
    if (N.type === E.FullSnapshot)
      q = N, S = 0;
    else if (N.type === E.IncrementalSnapshot) {
      if (N.data.source === A.Mutation && N.data.isAttachIframe)
        return;
      S++;
      const P = i && S >= i, ce = r && N.timestamp - q.timestamp > r;
      (P || ce) && je(!0);
    }
  };
  const T = (N) => {
    H(Q({
      type: E.IncrementalSnapshot,
      data: Object.assign({ source: A.Mutation }, N)
    }));
  }, M = (N) => H(Q({
    type: E.IncrementalSnapshot,
    data: Object.assign({ source: A.Scroll }, N)
  })), j = (N) => H(Q({
    type: E.IncrementalSnapshot,
    data: Object.assign({ source: A.CanvasMutation }, N)
  })), de = (N) => H(Q({
    type: E.IncrementalSnapshot,
    data: Object.assign({ source: A.AdoptedStyleSheet }, N)
  })), le = new $i({
    mutationCb: T,
    adoptedStyleSheetCb: de
  }), oe = new Ui({
    mirror: ae,
    mutationCb: T,
    stylesheetManager: le,
    recordCrossOriginIframes: R,
    wrappedEmit: H
  });
  for (const N of z || [])
    N.getMirror && N.getMirror({
      nodeMirror: ae,
      crossOriginIframeMirror: oe.crossOriginIframeMirror,
      crossOriginIframeStyleMirror: oe.crossOriginIframeStyleMirror
    });
  const Se = new en();
  nt = new qi({
    recordCanvas: b,
    mutationCb: j,
    win: window,
    blockClass: n,
    blockSelector: s,
    mirror: ae,
    sampling: m.canvas,
    dataURLOptions: y
  });
  const me = new Gi({
    mutationCb: T,
    scrollCb: M,
    bypassOptions: {
      blockClass: n,
      blockSelector: s,
      maskTextClass: o,
      maskTextSelector: l,
      inlineStylesheet: c,
      maskInputOptions: K,
      dataURLOptions: y,
      maskTextFn: f,
      maskInputFn: p,
      recordCanvas: b,
      inlineImages: Y,
      sampling: m,
      slimDOMOptions: L,
      iframeManager: oe,
      stylesheetManager: le,
      canvasManager: nt,
      keepIframeSrcFn: X,
      processedNodeManager: Se
    },
    mirror: ae
  });
  je = (N = !1) => {
    H(Q({
      type: E.Meta,
      data: {
        href: window.location.href,
        width: sr(),
        height: nr()
      }
    }), N), le.reset(), me.init(), Ce.forEach((V) => V.lock());
    const ee = ui(document, {
      mirror: ae,
      blockClass: n,
      blockSelector: s,
      maskTextClass: o,
      maskTextSelector: l,
      inlineStylesheet: c,
      maskAllInputs: K,
      maskTextFn: f,
      slimDOM: L,
      dataURLOptions: y,
      recordCanvas: b,
      inlineImages: Y,
      onSerialize: (V) => {
        _e(V, ae) && oe.addIframe(V), cr(V, ae) && le.trackLinkElement(V), Ie(V) && me.addShadowRoot(V.shadowRoot, document);
      },
      onIframeLoad: (V, P) => {
        oe.attachIframe(V, P), me.observeAttachShadow(V);
      },
      onStylesheetLoad: (V, P) => {
        le.attachLinkElement(V, P);
      },
      keepIframeSrcFn: X
    });
    if (!ee)
      return console.warn("Failed to snapshot the document");
    H(Q({
      type: E.FullSnapshot,
      data: {
        node: ee,
        initialOffset: ir(window)
      }
    }), N), Ce.forEach((V) => V.unlock()), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && le.adoptStyleSheets(document.adoptedStyleSheets, ae.getId(document));
  };
  try {
    const N = [], ee = (P) => {
      var ce;
      return x(Vi)({
        mutationCb: T,
        mousemoveCb: (G, rt) => H(Q({
          type: E.IncrementalSnapshot,
          data: {
            source: rt,
            positions: G
          }
        })),
        mouseInteractionCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.MouseInteraction }, G)
        })),
        scrollCb: M,
        viewportResizeCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.ViewportResize }, G)
        })),
        inputCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.Input }, G)
        })),
        mediaInteractionCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.MediaInteraction }, G)
        })),
        styleSheetRuleCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.StyleSheetRule }, G)
        })),
        styleDeclarationCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.StyleDeclaration }, G)
        })),
        canvasMutationCb: j,
        fontCb: (G) => H(Q({
          type: E.IncrementalSnapshot,
          data: Object.assign({ source: A.Font }, G)
        })),
        selectionCb: (G) => {
          H(Q({
            type: E.IncrementalSnapshot,
            data: Object.assign({ source: A.Selection }, G)
          }));
        },
        blockClass: n,
        ignoreClass: a,
        maskTextClass: o,
        maskTextSelector: l,
        maskInputOptions: K,
        inlineStylesheet: c,
        sampling: m,
        recordCanvas: b,
        inlineImages: Y,
        userTriggeredOnInput: _,
        collectFonts: B,
        doc: P,
        maskInputFn: p,
        maskTextFn: f,
        keepIframeSrcFn: X,
        blockSelector: s,
        slimDOMOptions: L,
        dataURLOptions: y,
        mirror: ae,
        iframeManager: oe,
        stylesheetManager: le,
        shadowDomManager: me,
        processedNodeManager: Se,
        canvasManager: nt,
        ignoreCSSAttributes: $,
        plugins: ((ce = z == null ? void 0 : z.filter((G) => G.observer)) === null || ce === void 0 ? void 0 : ce.map((G) => ({
          observer: G.observer,
          options: G.options,
          callback: (rt) => H(Q({
            type: E.Plugin,
            data: {
              plugin: G.name,
              payload: rt
            }
          }))
        }))) || []
      }, g);
    };
    oe.addLoadListener((P) => {
      try {
        N.push(ee(P.contentDocument));
      } catch (ce) {
        console.warn(ce);
      }
    });
    const V = () => {
      je(), N.push(ee(document)), qe = !0;
    };
    return document.readyState === "interactive" || document.readyState === "complete" ? V() : (N.push(te("DOMContentLoaded", () => {
      H(Q({
        type: E.DomContentLoaded,
        data: {}
      })), D === "DOMContentLoaded" && V();
    })), N.push(te("load", () => {
      H(Q({
        type: E.Load,
        data: {}
      })), D === "load" && V();
    }, window))), () => {
      N.forEach((P) => P()), Se.destroy(), qe = !1, wi();
    };
  } catch (N) {
    console.warn(N);
  }
}
Pe.addCustomEvent = (e, t) => {
  if (!qe)
    throw new Error("please add custom event after start recording");
  H(Q({
    type: E.Custom,
    data: {
      tag: e,
      payload: t
    }
  }));
};
Pe.freezePage = () => {
  Ce.forEach((e) => e.freeze());
};
Pe.takeFullSnapshot = (e) => {
  if (!qe)
    throw new Error("please take full snapshot after start recording");
  je(e);
};
Pe.mirror = ae;
var k;
(function(e) {
  e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment";
})(k || (k = {}));
var tn = function() {
  function e() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
  return e.prototype.getId = function(t) {
    var r;
    if (!t)
      return -1;
    var i = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
    return i ?? -1;
  }, e.prototype.getNode = function(t) {
    return this.idNodeMap.get(t) || null;
  }, e.prototype.getIds = function() {
    return Array.from(this.idNodeMap.keys());
  }, e.prototype.getMeta = function(t) {
    return this.nodeMetaMap.get(t) || null;
  }, e.prototype.removeNodeFromMap = function(t) {
    var r = this, i = this.getId(t);
    this.idNodeMap.delete(i), t.childNodes && t.childNodes.forEach(function(n) {
      return r.removeNodeFromMap(n);
    });
  }, e.prototype.has = function(t) {
    return this.idNodeMap.has(t);
  }, e.prototype.hasNode = function(t) {
    return this.nodeMetaMap.has(t);
  }, e.prototype.add = function(t, r) {
    var i = r.id;
    this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r);
  }, e.prototype.replace = function(t, r) {
    var i = this.getNode(t);
    if (i) {
      var n = this.nodeMetaMap.get(i);
      n && this.nodeMetaMap.set(r, n);
    }
    this.idNodeMap.set(t, r);
  }, e.prototype.reset = function() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }, e;
}();
function rn() {
  return new tn();
}
function nn(e) {
  const t = {}, r = /;(?![^(]*\))/g, i = /:(.+)/, n = /\/\*.*?\*\//g;
  return e.replace(n, "").split(r).forEach(function(s) {
    if (s) {
      const a = s.split(i);
      a.length > 1 && (t[dt(a[0].trim())] = a[1].trim());
    }
  }), t;
}
function Wt(e) {
  const t = [];
  for (const r in e) {
    const i = e[r];
    if (typeof i != "string")
      continue;
    const n = ln(r);
    t.push(`${n}: ${i};`);
  }
  return t.join(" ");
}
const sn = /-([a-z])/g, on = /^--[a-zA-Z0-9-]+$/, dt = (e) => on.test(e) ? e : e.replace(sn, (t, r) => r ? r.toUpperCase() : ""), an = /\B([A-Z])/g, ln = (e) => e.replace(an, "-$1").toLowerCase();
class se {
  constructor(...t) {
    this.parentElement = null, this.parentNode = null, this.firstChild = null, this.lastChild = null, this.previousSibling = null, this.nextSibling = null, this.ELEMENT_NODE = Z.ELEMENT_NODE, this.TEXT_NODE = Z.TEXT_NODE;
  }
  get childNodes() {
    const t = [];
    let r = this.firstChild;
    for (; r; )
      t.push(r), r = r.nextSibling;
    return t;
  }
  contains(t) {
    if (t instanceof se) {
      if (t.ownerDocument !== this.ownerDocument)
        return !1;
      if (t === this)
        return !0;
    } else
      return !1;
    for (; t.parentNode; ) {
      if (t.parentNode === this)
        return !0;
      t = t.parentNode;
    }
    return !1;
  }
  appendChild(t) {
    throw new Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.");
  }
  insertBefore(t, r) {
    throw new Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.");
  }
  removeChild(t) {
    throw new Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.");
  }
  toString() {
    return "RRNode";
  }
}
function cn(e) {
  return class br extends e {
    constructor(...r) {
      super(r), this.nodeType = Z.DOCUMENT_NODE, this.nodeName = "#document", this.compatMode = "CSS1Compat", this.RRNodeType = k.Document, this.textContent = null, this.ownerDocument = this;
    }
    get documentElement() {
      return this.childNodes.find((r) => r.RRNodeType === k.Element && r.tagName === "HTML") || null;
    }
    get body() {
      var r;
      return ((r = this.documentElement) === null || r === void 0 ? void 0 : r.childNodes.find((i) => i.RRNodeType === k.Element && i.tagName === "BODY")) || null;
    }
    get head() {
      var r;
      return ((r = this.documentElement) === null || r === void 0 ? void 0 : r.childNodes.find((i) => i.RRNodeType === k.Element && i.tagName === "HEAD")) || null;
    }
    get implementation() {
      return this;
    }
    get firstElementChild() {
      return this.documentElement;
    }
    appendChild(r) {
      const i = r.RRNodeType;
      if ((i === k.Element || i === k.DocumentType) && this.childNodes.some((s) => s.RRNodeType === i))
        throw new Error(`RRDomException: Failed to execute 'appendChild' on 'RRNode': Only one ${i === k.Element ? "RRElement" : "RRDoctype"} on RRDocument allowed.`);
      const n = vt(this, r);
      return n.parentElement = null, n;
    }
    insertBefore(r, i) {
      const n = r.RRNodeType;
      if ((n === k.Element || n === k.DocumentType) && this.childNodes.some((a) => a.RRNodeType === n))
        throw new Error(`RRDomException: Failed to execute 'insertBefore' on 'RRNode': Only one ${n === k.Element ? "RRElement" : "RRDoctype"} on RRDocument allowed.`);
      const s = Mr(this, r, i);
      return s.parentElement = null, s;
    }
    removeChild(r) {
      return Rr(this, r);
    }
    open() {
      this.firstChild = null, this.lastChild = null;
    }
    close() {
    }
    write(r) {
      let i;
      if (r === '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">' ? i = "-//W3C//DTD XHTML 1.0 Transitional//EN" : r === '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">' && (i = "-//W3C//DTD HTML 4.0 Transitional//EN"), i) {
        const n = this.createDocumentType("html", i, "");
        this.open(), this.appendChild(n);
      }
    }
    createDocument(r, i, n) {
      return new br();
    }
    createDocumentType(r, i, n) {
      const s = new (Ar(se))(r, i, n);
      return s.ownerDocument = this, s;
    }
    createElement(r) {
      const i = new (Er(se))(r);
      return i.ownerDocument = this, i;
    }
    createElementNS(r, i) {
      return this.createElement(i);
    }
    createTextNode(r) {
      const i = new (Nr(se))(r);
      return i.ownerDocument = this, i;
    }
    createComment(r) {
      const i = new (Tr(se))(r);
      return i.ownerDocument = this, i;
    }
    createCDATASection(r) {
      const i = new (wr(se))(r);
      return i.ownerDocument = this, i;
    }
    toString() {
      return "RRDocument";
    }
  };
}
function Ar(e) {
  return class extends e {
    constructor(r, i, n) {
      super(), this.nodeType = Z.DOCUMENT_TYPE_NODE, this.RRNodeType = k.DocumentType, this.name = r, this.publicId = i, this.systemId = n, this.nodeName = r, this.textContent = null;
    }
    toString() {
      return "RRDocumentType";
    }
  };
}
function Er(e) {
  return class extends e {
    constructor(r) {
      super(), this.nodeType = Z.ELEMENT_NODE, this.RRNodeType = k.Element, this.attributes = {}, this.shadowRoot = null, this.tagName = r.toUpperCase(), this.nodeName = r.toUpperCase();
    }
    get textContent() {
      let r = "";
      return this.childNodes.forEach((i) => r += i.textContent), r;
    }
    set textContent(r) {
      this.firstChild = null, this.lastChild = null, this.appendChild(this.ownerDocument.createTextNode(r));
    }
    get classList() {
      return new dn(this.attributes.class, (r) => {
        this.attributes.class = r;
      });
    }
    get id() {
      return this.attributes.id || "";
    }
    get className() {
      return this.attributes.class || "";
    }
    get style() {
      const r = this.attributes.style ? nn(this.attributes.style) : {}, i = /\B([A-Z])/g;
      return r.setProperty = (n, s, a) => {
        if (i.test(n))
          return;
        const o = dt(n);
        s ? r[o] = s : delete r[o], a === "important" && (r[o] += " !important"), this.attributes.style = Wt(r);
      }, r.removeProperty = (n) => {
        if (i.test(n))
          return "";
        const s = dt(n), a = r[s] || "";
        return delete r[s], this.attributes.style = Wt(r), a;
      }, r;
    }
    getAttribute(r) {
      return this.attributes[r] || null;
    }
    setAttribute(r, i) {
      this.attributes[r] = i;
    }
    setAttributeNS(r, i, n) {
      this.setAttribute(i, n);
    }
    removeAttribute(r) {
      delete this.attributes[r];
    }
    appendChild(r) {
      return vt(this, r);
    }
    insertBefore(r, i) {
      return Mr(this, r, i);
    }
    removeChild(r) {
      return Rr(this, r);
    }
    attachShadow(r) {
      const i = this.ownerDocument.createElement("SHADOWROOT");
      return this.shadowRoot = i, i;
    }
    dispatchEvent(r) {
      return !0;
    }
    toString() {
      let r = "";
      for (const i in this.attributes)
        r += `${i}="${this.attributes[i]}" `;
      return `${this.tagName} ${r}`;
    }
  };
}
function un(e) {
  return class extends e {
    attachShadow(r) {
      throw new Error("RRDomException: Failed to execute 'attachShadow' on 'RRElement': This RRElement does not support attachShadow");
    }
    play() {
      this.paused = !1;
    }
    pause() {
      this.paused = !0;
    }
  };
}
function Nr(e) {
  return class extends e {
    constructor(r) {
      super(), this.nodeType = Z.TEXT_NODE, this.nodeName = "#text", this.RRNodeType = k.Text, this.data = r;
    }
    get textContent() {
      return this.data;
    }
    set textContent(r) {
      this.data = r;
    }
    toString() {
      return `RRText text=${JSON.stringify(this.data)}`;
    }
  };
}
function Tr(e) {
  return class extends e {
    constructor(r) {
      super(), this.nodeType = Z.COMMENT_NODE, this.nodeName = "#comment", this.RRNodeType = k.Comment, this.data = r;
    }
    get textContent() {
      return this.data;
    }
    set textContent(r) {
      this.data = r;
    }
    toString() {
      return `RRComment text=${JSON.stringify(this.data)}`;
    }
  };
}
function wr(e) {
  return class extends e {
    constructor(r) {
      super(), this.nodeName = "#cdata-section", this.nodeType = Z.CDATA_SECTION_NODE, this.RRNodeType = k.CDATA, this.data = r;
    }
    get textContent() {
      return this.data;
    }
    set textContent(r) {
      this.data = r;
    }
    toString() {
      return `RRCDATASection data=${JSON.stringify(this.data)}`;
    }
  };
}
class dn {
  constructor(t, r) {
    if (this.classes = [], this.add = (...i) => {
      for (const n of i) {
        const s = String(n);
        this.classes.indexOf(s) >= 0 || this.classes.push(s);
      }
      this.onChange && this.onChange(this.classes.join(" "));
    }, this.remove = (...i) => {
      this.classes = this.classes.filter((n) => i.indexOf(n) === -1), this.onChange && this.onChange(this.classes.join(" "));
    }, t) {
      const i = t.trim().split(/\s+/);
      this.classes.push(...i);
    }
    this.onChange = r;
  }
}
function vt(e, t) {
  return t.parentNode && t.parentNode.removeChild(t), e.lastChild ? (e.lastChild.nextSibling = t, t.previousSibling = e.lastChild) : (e.firstChild = t, t.previousSibling = null), e.lastChild = t, t.nextSibling = null, t.parentNode = e, t.parentElement = e, t.ownerDocument = e.ownerDocument, t;
}
function Mr(e, t, r) {
  if (!r)
    return vt(e, t);
  if (r.parentNode !== e)
    throw new Error("Failed to execute 'insertBefore' on 'RRNode': The RRNode before which the new node is to be inserted is not a child of this RRNode.");
  return t === r || (t.parentNode && t.parentNode.removeChild(t), t.previousSibling = r.previousSibling, r.previousSibling = t, t.nextSibling = r, t.previousSibling ? t.previousSibling.nextSibling = t : e.firstChild = t, t.parentElement = e, t.parentNode = e, t.ownerDocument = e.ownerDocument), t;
}
function Rr(e, t) {
  if (t.parentNode !== e)
    throw new Error("Failed to execute 'removeChild' on 'RRNode': The RRNode to be removed is not a child of this RRNode.");
  return t.previousSibling ? t.previousSibling.nextSibling = t.nextSibling : e.firstChild = t.nextSibling, t.nextSibling ? t.nextSibling.previousSibling = t.previousSibling : e.lastChild = t.previousSibling, t.previousSibling = null, t.nextSibling = null, t.parentElement = null, t.parentNode = null, t;
}
var Z;
(function(e) {
  e[e.PLACEHOLDER = 0] = "PLACEHOLDER", e[e.ELEMENT_NODE = 1] = "ELEMENT_NODE", e[e.ATTRIBUTE_NODE = 2] = "ATTRIBUTE_NODE", e[e.TEXT_NODE = 3] = "TEXT_NODE", e[e.CDATA_SECTION_NODE = 4] = "CDATA_SECTION_NODE", e[e.ENTITY_REFERENCE_NODE = 5] = "ENTITY_REFERENCE_NODE", e[e.ENTITY_NODE = 6] = "ENTITY_NODE", e[e.PROCESSING_INSTRUCTION_NODE = 7] = "PROCESSING_INSTRUCTION_NODE", e[e.COMMENT_NODE = 8] = "COMMENT_NODE", e[e.DOCUMENT_NODE = 9] = "DOCUMENT_NODE", e[e.DOCUMENT_TYPE_NODE = 10] = "DOCUMENT_TYPE_NODE", e[e.DOCUMENT_FRAGMENT_NODE = 11] = "DOCUMENT_FRAGMENT_NODE";
})(Z || (Z = {}));
const ht = {
  svg: "http://www.w3.org/2000/svg",
  "xlink:href": "http://www.w3.org/1999/xlink",
  xmlns: "http://www.w3.org/2000/xmlns/"
}, hn = {
  altglyph: "altGlyph",
  altglyphdef: "altGlyphDef",
  altglyphitem: "altGlyphItem",
  animatecolor: "animateColor",
  animatemotion: "animateMotion",
  animatetransform: "animateTransform",
  clippath: "clipPath",
  feblend: "feBlend",
  fecolormatrix: "feColorMatrix",
  fecomponenttransfer: "feComponentTransfer",
  fecomposite: "feComposite",
  feconvolvematrix: "feConvolveMatrix",
  fediffuselighting: "feDiffuseLighting",
  fedisplacementmap: "feDisplacementMap",
  fedistantlight: "feDistantLight",
  fedropshadow: "feDropShadow",
  feflood: "feFlood",
  fefunca: "feFuncA",
  fefuncb: "feFuncB",
  fefuncg: "feFuncG",
  fefuncr: "feFuncR",
  fegaussianblur: "feGaussianBlur",
  feimage: "feImage",
  femerge: "feMerge",
  femergenode: "feMergeNode",
  femorphology: "feMorphology",
  feoffset: "feOffset",
  fepointlight: "fePointLight",
  fespecularlighting: "feSpecularLighting",
  fespotlight: "feSpotLight",
  fetile: "feTile",
  feturbulence: "feTurbulence",
  foreignobject: "foreignObject",
  glyphref: "glyphRef",
  lineargradient: "linearGradient",
  radialgradient: "radialGradient"
};
let ne = null;
function ue(e, t, r, i = t.mirror || t.ownerDocument.mirror) {
  e = fn(e, t, r, i);
  const n = e.childNodes, s = t.childNodes;
  (n.length > 0 || s.length > 0) && Dr(Array.from(n), s, e, r, i), pn(e, t, r, i);
}
function fn(e, t, r, i) {
  var n;
  if (r.afterAppend && !ne && (ne = /* @__PURE__ */ new WeakSet(), setTimeout(() => {
    ne = null;
  }, 0)), !It(e, t)) {
    const s = $e(t, r.mirror, i);
    (n = e.parentNode) === null || n === void 0 || n.replaceChild(s, e), e = s;
  }
  switch (t.RRNodeType) {
    case k.Document: {
      if (!Ee(e, t, r.mirror, i)) {
        const s = i.getMeta(t);
        s && (r.mirror.removeNodeFromMap(e), e.close(), e.open(), r.mirror.add(e, s), ne == null || ne.add(e));
      }
      break;
    }
    case k.Element: {
      const s = e, a = t;
      switch (a.tagName) {
        case "IFRAME": {
          const o = e.contentDocument;
          if (!o)
            break;
          ue(o, t.contentDocument, r, i);
          break;
        }
      }
      if (a.shadowRoot) {
        s.shadowRoot || s.attachShadow({ mode: "open" });
        const o = s.shadowRoot.childNodes, l = a.shadowRoot.childNodes;
        (o.length > 0 || l.length > 0) && Dr(Array.from(o), l, s.shadowRoot, r, i);
      }
      break;
    }
  }
  return e;
}
function pn(e, t, r, i) {
  var n;
  switch (t.RRNodeType) {
    case k.Document: {
      const s = t.scrollData;
      s && r.applyScroll(s, !0);
      break;
    }
    case k.Element: {
      const s = e, a = t;
      switch (mn(s, a, i), a.scrollData && r.applyScroll(a.scrollData, !0), a.inputData && r.applyInput(a.inputData), a.tagName) {
        case "AUDIO":
        case "VIDEO": {
          const o = e, l = a;
          l.paused !== void 0 && (l.paused ? o.pause() : o.play()), l.muted !== void 0 && (o.muted = l.muted), l.volume !== void 0 && (o.volume = l.volume), l.currentTime !== void 0 && (o.currentTime = l.currentTime), l.playbackRate !== void 0 && (o.playbackRate = l.playbackRate);
          break;
        }
        case "CANVAS": {
          const o = t;
          if (o.rr_dataURL !== null) {
            const l = document.createElement("img");
            l.onload = () => {
              const c = s.getContext("2d");
              c && c.drawImage(l, 0, 0, l.width, l.height);
            }, l.src = o.rr_dataURL;
          }
          o.canvasMutations.forEach((l) => r.applyCanvas(l.event, l.mutation, e));
          break;
        }
        case "STYLE": {
          const o = s.sheet;
          o && t.rules.forEach((l) => r.applyStyleSheetMutation(l, o));
          break;
        }
      }
      break;
    }
    case k.Text:
    case k.Comment:
    case k.CDATA: {
      e.textContent !== t.data && (e.textContent = t.data);
      break;
    }
  }
  ne != null && ne.has(e) && (ne.delete(e), (n = r.afterAppend) === null || n === void 0 || n.call(r, e, r.mirror.getId(e)));
}
function mn(e, t, r) {
  const i = e.attributes, n = t.attributes;
  for (const s in n) {
    const a = n[s], o = r.getMeta(t);
    if (o != null && o.isSVG && ht[s])
      e.setAttributeNS(ht[s], s, a);
    else if (t.tagName === "CANVAS" && s === "rr_dataURL") {
      const l = document.createElement("img");
      l.src = a, l.onload = () => {
        const c = e.getContext("2d");
        c && c.drawImage(l, 0, 0, l.width, l.height);
      };
    } else
      e.setAttribute(s, a);
  }
  for (const { name: s } of Array.from(i))
    s in n || e.removeAttribute(s);
  t.scrollLeft && (e.scrollLeft = t.scrollLeft), t.scrollTop && (e.scrollTop = t.scrollTop);
}
function Dr(e, t, r, i, n) {
  let s = 0, a = e.length - 1, o = 0, l = t.length - 1, c = e[s], u = e[a], d = t[o], h = t[l], p, f;
  for (; s <= a && o <= l; )
    if (c === void 0)
      c = e[++s];
    else if (u === void 0)
      u = e[--a];
    else if (Ee(c, d, i.mirror, n))
      ue(c, d, i, n), c = e[++s], d = t[++o];
    else if (Ee(u, h, i.mirror, n))
      ue(u, h, i, n), u = e[--a], h = t[--l];
    else if (Ee(c, h, i.mirror, n)) {
      try {
        r.insertBefore(c, u.nextSibling);
      } catch (g) {
        console.warn(g);
      }
      ue(c, h, i, n), c = e[++s], h = t[--l];
    } else if (Ee(u, d, i.mirror, n)) {
      try {
        r.insertBefore(u, c);
      } catch (g) {
        console.warn(g);
      }
      ue(u, d, i, n), u = e[--a], d = t[++o];
    } else {
      if (!p) {
        p = {};
        for (let C = s; C <= a; C++) {
          const m = e[C];
          m && i.mirror.hasNode(m) && (p[i.mirror.getId(m)] = C);
        }
      }
      f = p[n.getId(d)];
      const g = e[f];
      if (f !== void 0 && g && Ee(g, d, i.mirror, n)) {
        try {
          r.insertBefore(g, c);
        } catch (C) {
          console.warn(C);
        }
        ue(g, d, i, n), e[f] = void 0;
      } else {
        const C = $e(d, i.mirror, n);
        r.nodeName === "#document" && c && (C.nodeType === C.DOCUMENT_TYPE_NODE && c.nodeType === c.DOCUMENT_TYPE_NODE || C.nodeType === C.ELEMENT_NODE && c.nodeType === c.ELEMENT_NODE) && (r.removeChild(c), i.mirror.removeNodeFromMap(c), c = e[++s]);
        try {
          r.insertBefore(C, c || null), ue(C, d, i, n);
        } catch (m) {
          console.warn(m);
        }
      }
      d = t[++o];
    }
  if (s > a) {
    const g = t[l + 1];
    let C = null;
    for (g && (C = i.mirror.getNode(n.getId(g))); o <= l; ++o) {
      const m = $e(t[o], i.mirror, n);
      try {
        r.insertBefore(m, C), ue(m, t[o], i, n);
      } catch (y) {
        console.warn(y);
      }
    }
  } else if (o > l)
    for (; s <= a; s++) {
      const g = e[s];
      if (!(!g || g.parentNode !== r))
        try {
          r.removeChild(g), i.mirror.removeNodeFromMap(g);
        } catch (C) {
          console.warn(C);
        }
    }
}
function $e(e, t, r) {
  const i = r.getId(e), n = r.getMeta(e);
  let s = null;
  if (i > -1 && (s = t.getNode(i)), s !== null && It(s, e))
    return s;
  switch (e.RRNodeType) {
    case k.Document:
      s = new Document();
      break;
    case k.DocumentType:
      s = document.implementation.createDocumentType(e.name, e.publicId, e.systemId);
      break;
    case k.Element: {
      let a = e.tagName.toLowerCase();
      a = hn[a] || a, n && "isSVG" in n && (n != null && n.isSVG) ? s = document.createElementNS(ht.svg, a) : s = document.createElement(e.tagName);
      break;
    }
    case k.Text:
      s = document.createTextNode(e.data);
      break;
    case k.Comment:
      s = document.createComment(e.data);
      break;
    case k.CDATA:
      s = document.createCDATASection(e.data);
      break;
  }
  n && t.add(s, Object.assign({}, n));
  try {
    ne == null || ne.add(s);
  } catch {
  }
  return s;
}
function It(e, t) {
  return e.nodeType !== t.nodeType ? !1 : e.nodeType !== e.ELEMENT_NODE || e.tagName.toUpperCase() === t.tagName;
}
function Ee(e, t, r, i) {
  const n = r.getId(e), s = i.getId(t);
  return n === -1 || n !== s ? !1 : It(e, t);
}
class De extends cn(se) {
  constructor(t) {
    super(), this.UNSERIALIZED_STARTING_ID = -2, this._unserializedId = this.UNSERIALIZED_STARTING_ID, this.mirror = Tn(), this.scrollData = null, t && (this.mirror = t);
  }
  get unserializedId() {
    return this._unserializedId--;
  }
  createDocument(t, r, i) {
    return new De();
  }
  createDocumentType(t, r, i) {
    const n = new gn(t, r, i);
    return n.ownerDocument = this, n;
  }
  createElement(t) {
    const r = t.toUpperCase();
    let i;
    switch (r) {
      case "AUDIO":
      case "VIDEO":
        i = new yn(r);
        break;
      case "IFRAME":
        i = new Cn(r, this.mirror);
        break;
      case "CANVAS":
        i = new vn(r);
        break;
      case "STYLE":
        i = new In(r);
        break;
      default:
        i = new Ze(r);
        break;
    }
    return i.ownerDocument = this, i;
  }
  createComment(t) {
    const r = new bn(t);
    return r.ownerDocument = this, r;
  }
  createCDATASection(t) {
    const r = new An(t);
    return r.ownerDocument = this, r;
  }
  createTextNode(t) {
    const r = new Sn(t);
    return r.ownerDocument = this, r;
  }
  destroyTree() {
    this.firstChild = null, this.lastChild = null, this.mirror.reset();
  }
  open() {
    super.open(), this._unserializedId = this.UNSERIALIZED_STARTING_ID;
  }
}
const gn = Ar(se);
class Ze extends Er(se) {
  constructor() {
    super(...arguments), this.inputData = null, this.scrollData = null;
  }
}
class yn extends un(Ze) {
}
class vn extends Ze {
  constructor() {
    super(...arguments), this.rr_dataURL = null, this.canvasMutations = [];
  }
  getContext() {
    return null;
  }
}
class In extends Ze {
  constructor() {
    super(...arguments), this.rules = [];
  }
}
class Cn extends Ze {
  constructor(t, r) {
    super(t), this.contentDocument = new De(), this.contentDocument.mirror = r;
  }
}
const Sn = Nr(se), bn = Tr(se), An = wr(se);
function En(e) {
  return e instanceof HTMLFormElement ? "FORM" : e.tagName.toUpperCase();
}
function kr(e, t, r, i) {
  let n;
  switch (e.nodeType) {
    case Z.DOCUMENT_NODE:
      i && i.nodeName === "IFRAME" ? n = i.contentDocument : (n = t, n.compatMode = e.compatMode);
      break;
    case Z.DOCUMENT_TYPE_NODE: {
      const a = e;
      n = t.createDocumentType(a.name, a.publicId, a.systemId);
      break;
    }
    case Z.ELEMENT_NODE: {
      const a = e, o = En(a);
      n = t.createElement(o);
      const l = n;
      for (const { name: c, value: u } of Array.from(a.attributes))
        l.attributes[c] = u;
      a.scrollLeft && (l.scrollLeft = a.scrollLeft), a.scrollTop && (l.scrollTop = a.scrollTop);
      break;
    }
    case Z.TEXT_NODE:
      n = t.createTextNode(e.textContent || "");
      break;
    case Z.CDATA_SECTION_NODE:
      n = t.createCDATASection(e.data);
      break;
    case Z.COMMENT_NODE:
      n = t.createComment(e.textContent || "");
      break;
    case Z.DOCUMENT_FRAGMENT_NODE:
      n = i.attachShadow({ mode: "open" });
      break;
    default:
      return null;
  }
  let s = r.getMeta(e);
  return t instanceof De && (s || (s = xr(n, t.unserializedId), r.add(e, s)), t.mirror.add(n, Object.assign({}, s))), n;
}
function Nn(e, t = rn(), r = new De()) {
  function i(n, s) {
    const a = kr(n, r, t, s);
    if (a !== null)
      if ((s == null ? void 0 : s.nodeName) !== "IFRAME" && n.nodeType !== Z.DOCUMENT_FRAGMENT_NODE && (s == null || s.appendChild(a), a.parentNode = s, a.parentElement = s), n.nodeName === "IFRAME") {
        const o = n.contentDocument;
        o && i(o, a);
      } else
        (n.nodeType === Z.DOCUMENT_NODE || n.nodeType === Z.ELEMENT_NODE || n.nodeType === Z.DOCUMENT_FRAGMENT_NODE) && (n.nodeType === Z.ELEMENT_NODE && n.shadowRoot && i(n.shadowRoot, a), n.childNodes.forEach((o) => i(o, a)));
  }
  return i(e, null), r;
}
function Tn() {
  return new wn();
}
class wn {
  constructor() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
  getId(t) {
    var r;
    if (!t)
      return -1;
    const i = (r = this.getMeta(t)) === null || r === void 0 ? void 0 : r.id;
    return i ?? -1;
  }
  getNode(t) {
    return this.idNodeMap.get(t) || null;
  }
  getIds() {
    return Array.from(this.idNodeMap.keys());
  }
  getMeta(t) {
    return this.nodeMetaMap.get(t) || null;
  }
  removeNodeFromMap(t) {
    const r = this.getId(t);
    this.idNodeMap.delete(r), t.childNodes && t.childNodes.forEach((i) => this.removeNodeFromMap(i));
  }
  has(t) {
    return this.idNodeMap.has(t);
  }
  hasNode(t) {
    return this.nodeMetaMap.has(t);
  }
  add(t, r) {
    const i = r.id;
    this.idNodeMap.set(i, t), this.nodeMetaMap.set(t, r);
  }
  replace(t, r) {
    const i = this.getNode(t);
    if (i) {
      const n = this.nodeMetaMap.get(i);
      n && this.nodeMetaMap.set(r, n);
    }
    this.idNodeMap.set(t, r);
  }
  reset() {
    this.idNodeMap = /* @__PURE__ */ new Map(), this.nodeMetaMap = /* @__PURE__ */ new WeakMap();
  }
}
function xr(e, t) {
  switch (e.RRNodeType) {
    case k.Document:
      return {
        id: t,
        type: e.RRNodeType,
        childNodes: []
      };
    case k.DocumentType: {
      const r = e;
      return {
        id: t,
        type: e.RRNodeType,
        name: r.name,
        publicId: r.publicId,
        systemId: r.systemId
      };
    }
    case k.Element:
      return {
        id: t,
        type: e.RRNodeType,
        tagName: e.tagName.toLowerCase(),
        attributes: {},
        childNodes: []
      };
    case k.Text:
      return {
        id: t,
        type: e.RRNodeType,
        textContent: e.textContent || ""
      };
    case k.Comment:
      return {
        id: t,
        type: e.RRNodeType,
        textContent: e.textContent || ""
      };
    case k.CDATA:
      return {
        id: t,
        type: e.RRNodeType,
        textContent: ""
      };
  }
}
function Or(e) {
  return { all: e = e || /* @__PURE__ */ new Map(), on: function(t, r) {
    var i = e.get(t);
    i ? i.push(r) : e.set(t, [r]);
  }, off: function(t, r) {
    var i = e.get(t);
    i && (r ? i.splice(i.indexOf(r) >>> 0, 1) : e.set(t, []));
  }, emit: function(t, r) {
    var i = e.get(t);
    i && i.slice().map(function(n) {
      n(r);
    }), (i = e.get("*")) && i.slice().map(function(n) {
      n(t, r);
    });
  } };
}
const Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Or
}, Symbol.toStringTag, { value: "Module" }));
function Rn(e = window, t = document) {
  if ("scrollBehavior" in t.documentElement.style && e.__forceSmoothScrollPolyfill__ !== !0)
    return;
  const r = e.HTMLElement || e.Element, i = 468, n = {
    scroll: e.scroll || e.scrollTo,
    scrollBy: e.scrollBy,
    elementScroll: r.prototype.scroll || l,
    scrollIntoView: r.prototype.scrollIntoView
  }, s = e.performance && e.performance.now ? e.performance.now.bind(e.performance) : Date.now;
  function a(m) {
    const y = ["MSIE ", "Trident/", "Edge/"];
    return new RegExp(y.join("|")).test(m);
  }
  const o = a(e.navigator.userAgent) ? 1 : 0;
  function l(m, y) {
    this.scrollLeft = m, this.scrollTop = y;
  }
  function c(m) {
    return 0.5 * (1 - Math.cos(Math.PI * m));
  }
  function u(m) {
    if (m === null || typeof m != "object" || m.behavior === void 0 || m.behavior === "auto" || m.behavior === "instant")
      return !0;
    if (typeof m == "object" && m.behavior === "smooth")
      return !1;
    throw new TypeError("behavior member of ScrollOptions " + m.behavior + " is not a valid value for enumeration ScrollBehavior.");
  }
  function d(m, y) {
    if (y === "Y")
      return m.clientHeight + o < m.scrollHeight;
    if (y === "X")
      return m.clientWidth + o < m.scrollWidth;
  }
  function h(m, y) {
    const v = e.getComputedStyle(m, null)["overflow" + y];
    return v === "auto" || v === "scroll";
  }
  function p(m) {
    const y = d(m, "Y") && h(m, "Y"), v = d(m, "X") && h(m, "X");
    return y || v;
  }
  function f(m) {
    for (; m !== t.body && p(m) === !1; )
      m = m.parentNode || m.host;
    return m;
  }
  function g(m) {
    const y = s();
    let v, b, R, D = (y - m.startTime) / i;
    D = D > 1 ? 1 : D, v = c(D), b = m.startX + (m.x - m.startX) * v, R = m.startY + (m.y - m.startY) * v, m.method.call(m.scrollable, b, R), (b !== m.x || R !== m.y) && e.requestAnimationFrame(g.bind(e, m));
  }
  function C(m, y, v) {
    let b, R, D, _;
    const B = s();
    m === t.body ? (b = e, R = e.scrollX || e.pageXOffset, D = e.scrollY || e.pageYOffset, _ = n.scroll) : (b = m, R = m.scrollLeft, D = m.scrollTop, _ = l), g({
      scrollable: b,
      method: _,
      startTime: B,
      startX: R,
      startY: D,
      x: y,
      y: v
    });
  }
  e.scroll = e.scrollTo = function() {
    if (arguments[0] !== void 0) {
      if (u(arguments[0]) === !0) {
        n.scroll.call(e, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : e.scrollX || e.pageXOffset, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : e.scrollY || e.pageYOffset);
        return;
      }
      C.call(e, t.body, arguments[0].left !== void 0 ? ~~arguments[0].left : e.scrollX || e.pageXOffset, arguments[0].top !== void 0 ? ~~arguments[0].top : e.scrollY || e.pageYOffset);
    }
  }, e.scrollBy = function() {
    if (arguments[0] !== void 0) {
      if (u(arguments[0])) {
        n.scrollBy.call(e, arguments[0].left !== void 0 ? arguments[0].left : typeof arguments[0] != "object" ? arguments[0] : 0, arguments[0].top !== void 0 ? arguments[0].top : arguments[1] !== void 0 ? arguments[1] : 0);
        return;
      }
      C.call(e, t.body, ~~arguments[0].left + (e.scrollX || e.pageXOffset), ~~arguments[0].top + (e.scrollY || e.pageYOffset));
    }
  }, r.prototype.scroll = r.prototype.scrollTo = function() {
    if (arguments[0] === void 0)
      return;
    if (u(arguments[0]) === !0) {
      if (typeof arguments[0] == "number" && arguments[1] === void 0)
        throw new SyntaxError("Value could not be converted");
      n.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left : typeof arguments[0] != "object" ? ~~arguments[0] : this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top : arguments[1] !== void 0 ? ~~arguments[1] : this.scrollTop);
      return;
    }
    const m = arguments[0].left, y = arguments[0].top;
    C.call(this, this, typeof m > "u" ? this.scrollLeft : ~~m, typeof y > "u" ? this.scrollTop : ~~y);
  }, r.prototype.scrollBy = function() {
    if (arguments[0] !== void 0) {
      if (u(arguments[0]) === !0) {
        n.elementScroll.call(this, arguments[0].left !== void 0 ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== void 0 ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
        return;
      }
      this.scroll({
        left: ~~arguments[0].left + this.scrollLeft,
        top: ~~arguments[0].top + this.scrollTop,
        behavior: arguments[0].behavior
      });
    }
  }, r.prototype.scrollIntoView = function() {
    if (u(arguments[0]) === !0) {
      n.scrollIntoView.call(this, arguments[0] === void 0 ? !0 : arguments[0]);
      return;
    }
    const m = f(this), y = m.getBoundingClientRect(), v = this.getBoundingClientRect();
    m !== t.body ? (C.call(this, m, m.scrollLeft + v.left - y.left, m.scrollTop + v.top - y.top), e.getComputedStyle(m).position !== "fixed" && e.scrollBy({
      left: y.left,
      top: y.top,
      behavior: "smooth"
    })) : e.scrollBy({
      left: v.left,
      top: v.top,
      behavior: "smooth"
    });
  };
}
class Dn {
  constructor(t = [], r) {
    this.timeOffset = 0, this.raf = null, this.actions = t, this.speed = r.speed;
  }
  addAction(t) {
    const r = this.raf === !0;
    if (!this.actions.length || this.actions[this.actions.length - 1].delay <= t.delay)
      this.actions.push(t);
    else {
      const i = this.findActionIndex(t);
      this.actions.splice(i, 0, t);
    }
    r && (this.raf = requestAnimationFrame(this.rafCheck.bind(this)));
  }
  start() {
    this.timeOffset = 0, this.lastTimestamp = performance.now(), this.raf = requestAnimationFrame(this.rafCheck.bind(this));
  }
  rafCheck() {
    const t = performance.now();
    for (this.timeOffset += (t - this.lastTimestamp) * this.speed, this.lastTimestamp = t; this.actions.length; ) {
      const r = this.actions[0];
      if (this.timeOffset >= r.delay)
        this.actions.shift(), r.doAction();
      else
        break;
    }
    this.actions.length > 0 ? this.raf = requestAnimationFrame(this.rafCheck.bind(this)) : this.raf = !0;
  }
  clear() {
    this.raf && (this.raf !== !0 && cancelAnimationFrame(this.raf), this.raf = null), this.actions.length = 0;
  }
  setSpeed(t) {
    this.speed = t;
  }
  isActive() {
    return this.raf !== null;
  }
  findActionIndex(t) {
    let r = 0, i = this.actions.length - 1;
    for (; r <= i; ) {
      const n = Math.floor((r + i) / 2);
      if (this.actions[n].delay < t.delay)
        r = n + 1;
      else if (this.actions[n].delay > t.delay)
        i = n - 1;
      else
        return n + 1;
    }
    return r;
  }
}
function Vt(e, t) {
  if (e.type === E.IncrementalSnapshot && e.data.source === A.MouseMove && e.data.positions && e.data.positions.length) {
    const r = e.data.positions[0].timeOffset, i = e.timestamp + r;
    return e.delay = i - t, i - t;
  }
  return e.delay = e.timestamp - t, e.delay;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function Ut(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var i, n, s = r.call(e), a = [];
  try {
    for (; (t === void 0 || t-- > 0) && !(i = s.next()).done; )
      a.push(i.value);
  } catch (o) {
    n = { error: o };
  } finally {
    try {
      i && !i.done && (r = s.return) && r.call(s);
    } finally {
      if (n)
        throw n.error;
    }
  }
  return a;
}
var Re;
(function(e) {
  e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped";
})(Re || (Re = {}));
var Lr = { type: "xstate.init" };
function st(e) {
  return e === void 0 ? [] : [].concat(e);
}
function Ne(e) {
  return { type: "xstate.assign", assignment: e };
}
function Gt(e, t) {
  return typeof (e = typeof e == "string" && t && t[e] ? t[e] : e) == "string" ? { type: e } : typeof e == "function" ? { type: e.name, exec: e } : e;
}
function et(e) {
  return function(t) {
    return e === t;
  };
}
function Fr(e) {
  return typeof e == "string" ? { type: e } : e;
}
function Pt(e, t) {
  return { value: e, context: t, actions: [], changed: !1, matches: et(e) };
}
function Zt(e, t, r) {
  var i = t, n = !1;
  return [e.filter(function(s) {
    if (s.type === "xstate.assign") {
      n = !0;
      var a = Object.assign({}, i);
      return typeof s.assignment == "function" ? a = s.assignment(i, r) : Object.keys(s.assignment).forEach(function(o) {
        a[o] = typeof s.assignment[o] == "function" ? s.assignment[o](i, r) : s.assignment[o];
      }), i = a, !1;
    }
    return !0;
  }), i, n];
}
function _r(e, t) {
  t === void 0 && (t = {});
  var r = Ut(Zt(st(e.states[e.initial].entry).map(function(a) {
    return Gt(a, t.actions);
  }), e.context, Lr), 2), i = r[0], n = r[1], s = { config: e, _options: t, initialState: { value: e.initial, actions: i, context: n, matches: et(e.initial) }, transition: function(a, o) {
    var l, c, u = typeof a == "string" ? { value: a, context: e.context } : a, d = u.value, h = u.context, p = Fr(o), f = e.states[d];
    if (f.on) {
      var g = st(f.on[p.type]);
      try {
        for (var C = function(L) {
          var q = typeof Symbol == "function" && Symbol.iterator, S = q && L[q], I = 0;
          if (S)
            return S.call(L);
          if (L && typeof L.length == "number")
            return { next: function() {
              return L && I >= L.length && (L = void 0), { value: L && L[I++], done: !L };
            } };
          throw new TypeError(q ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }(g), m = C.next(); !m.done; m = C.next()) {
          var y = m.value;
          if (y === void 0)
            return Pt(d, h);
          var v = typeof y == "string" ? { target: y } : y, b = v.target, R = v.actions, D = R === void 0 ? [] : R, _ = v.cond, B = _ === void 0 ? function() {
            return !0;
          } : _, Y = b === void 0, z = b ?? d, X = e.states[z];
          if (B(h, p)) {
            var $ = Ut(Zt((Y ? st(D) : [].concat(f.exit, D, X.entry).filter(function(L) {
              return L;
            })).map(function(L) {
              return Gt(L, s._options.actions);
            }), h, p), 3), J = $[0], ie = $[1], W = $[2], K = b ?? d;
            return { value: K, context: ie, actions: J, changed: b !== d || J.length > 0 || W, matches: et(K) };
          }
        }
      } catch (L) {
        l = { error: L };
      } finally {
        try {
          m && !m.done && (c = C.return) && c.call(C);
        } finally {
          if (l)
            throw l.error;
        }
      }
    }
    return Pt(d, h);
  } };
  return s;
}
var Ht = function(e, t) {
  return e.actions.forEach(function(r) {
    var i = r.exec;
    return i && i(e.context, t);
  });
};
function Br(e) {
  var t = e.initialState, r = Re.NotStarted, i = /* @__PURE__ */ new Set(), n = { _machine: e, send: function(s) {
    r === Re.Running && (t = e.transition(t, s), Ht(t, Fr(s)), i.forEach(function(a) {
      return a(t);
    }));
  }, subscribe: function(s) {
    return i.add(s), s(t), { unsubscribe: function() {
      return i.delete(s);
    } };
  }, start: function(s) {
    if (s) {
      var a = typeof s == "object" ? s : { context: e.config.context, value: s };
      t = { value: a.value, actions: [], context: a.context, matches: et(a.value) };
    }
    return r = Re.Running, Ht(t, Lr), n;
  }, stop: function() {
    return r = Re.Stopped, i.clear(), n;
  }, get state() {
    return t;
  }, get status() {
    return r;
  } };
  return n;
}
function kn(e, t) {
  for (let r = e.length - 1; r >= 0; r--) {
    const i = e[r];
    if (i.type === E.Meta && i.timestamp <= t)
      return e.slice(r);
  }
  return e;
}
function xn(e, { getCastFn: t, applyEventsSynchronously: r, emitter: i }) {
  const n = _r({
    id: "player",
    context: e,
    initial: "paused",
    states: {
      playing: {
        on: {
          PAUSE: {
            target: "paused",
            actions: ["pause"]
          },
          CAST_EVENT: {
            target: "playing",
            actions: "castEvent"
          },
          END: {
            target: "paused",
            actions: ["resetLastPlayedEvent", "pause"]
          },
          ADD_EVENT: {
            target: "playing",
            actions: ["addEvent"]
          }
        }
      },
      paused: {
        on: {
          PLAY: {
            target: "playing",
            actions: ["recordTimeOffset", "play"]
          },
          CAST_EVENT: {
            target: "paused",
            actions: "castEvent"
          },
          TO_LIVE: {
            target: "live",
            actions: ["startLive"]
          },
          ADD_EVENT: {
            target: "paused",
            actions: ["addEvent"]
          }
        }
      },
      live: {
        on: {
          ADD_EVENT: {
            target: "live",
            actions: ["addEvent"]
          },
          CAST_EVENT: {
            target: "live",
            actions: ["castEvent"]
          }
        }
      }
    }
  }, {
    actions: {
      castEvent: Ne({
        lastPlayedEvent: (s, a) => a.type === "CAST_EVENT" ? a.payload.event : s.lastPlayedEvent
      }),
      recordTimeOffset: Ne((s, a) => {
        let o = s.timeOffset;
        return "payload" in a && "timeOffset" in a.payload && (o = a.payload.timeOffset), Object.assign(Object.assign({}, s), { timeOffset: o, baselineTime: s.events[0].timestamp + o });
      }),
      play(s) {
        var a;
        const { timer: o, events: l, baselineTime: c, lastPlayedEvent: u } = s;
        o.clear();
        for (const f of l)
          Vt(f, c);
        const d = kn(l, c);
        let h = u == null ? void 0 : u.timestamp;
        (u == null ? void 0 : u.type) === E.IncrementalSnapshot && u.data.source === A.MouseMove && (h = u.timestamp + ((a = u.data.positions[0]) === null || a === void 0 ? void 0 : a.timeOffset)), c < (h || 0) && i.emit(F.PlayBack);
        const p = new Array();
        for (const f of d)
          if (!(h && h < c && (f.timestamp <= h || f === u)))
            if (f.timestamp < c)
              p.push(f);
            else {
              const g = t(f, !1);
              o.addAction({
                doAction: () => {
                  g();
                },
                delay: f.delay
              });
            }
        r(p), i.emit(F.Flush), o.start();
      },
      pause(s) {
        s.timer.clear();
      },
      resetLastPlayedEvent: Ne((s) => Object.assign(Object.assign({}, s), { lastPlayedEvent: null })),
      startLive: Ne({
        baselineTime: (s, a) => (s.timer.start(), a.type === "TO_LIVE" && a.payload.baselineTime ? a.payload.baselineTime : Date.now())
      }),
      addEvent: Ne((s, a) => {
        const { baselineTime: o, timer: l, events: c } = s;
        if (a.type === "ADD_EVENT") {
          const { event: u } = a.payload;
          Vt(u, o);
          let d = c.length - 1;
          if (!c[d] || c[d].timestamp <= u.timestamp)
            c.push(u);
          else {
            let f = -1, g = 0;
            for (; g <= d; ) {
              const C = Math.floor((g + d) / 2);
              c[C].timestamp <= u.timestamp ? g = C + 1 : d = C - 1;
            }
            f === -1 && (f = g), c.splice(f, 0, u);
          }
          const h = u.timestamp < o, p = t(u, h);
          h ? p() : l.isActive() && l.addAction({
            doAction: () => {
              p();
            },
            delay: u.delay
          });
        }
        return Object.assign(Object.assign({}, s), { events: c });
      })
    }
  });
  return Br(n);
}
function On(e) {
  const t = _r({
    id: "speed",
    context: e,
    initial: "normal",
    states: {
      normal: {
        on: {
          FAST_FORWARD: {
            target: "skipping",
            actions: ["recordSpeed", "setSpeed"]
          },
          SET_SPEED: {
            target: "normal",
            actions: ["setSpeed"]
          }
        }
      },
      skipping: {
        on: {
          BACK_TO_NORMAL: {
            target: "normal",
            actions: ["restoreSpeed"]
          },
          SET_SPEED: {
            target: "normal",
            actions: ["setSpeed"]
          }
        }
      }
    }
  }, {
    actions: {
      setSpeed: (r, i) => {
        "payload" in i && r.timer.setSpeed(i.payload.speed);
      },
      recordSpeed: Ne({
        normalSpeed: (r) => r.timer.speed
      }),
      restoreSpeed: (r) => {
        r.timer.setSpeed(r.normalSpeed);
      }
    }
  });
  return Br(t);
}
const Ln = (e) => [
  `.${e} { background: currentColor }`,
  "noscript { display: none !important; }"
], Yt = /* @__PURE__ */ new Map();
function Wr(e, t) {
  let r = Yt.get(e);
  return r || (r = /* @__PURE__ */ new Map(), Yt.set(e, r)), r.has(t) || r.set(t, []), r.get(t);
}
function ye(e, t, r) {
  return (i) => ve(this, void 0, void 0, function* () {
    if (i && typeof i == "object" && "rr_type" in i)
      if (r && (r.isUnchanged = !1), i.rr_type === "ImageBitmap" && "args" in i) {
        const n = yield ye(e, t, r)(i.args);
        return yield createImageBitmap.apply(null, n);
      } else if ("index" in i) {
        if (r || t === null)
          return i;
        const { rr_type: n, index: s } = i;
        return Wr(t, n)[s];
      } else if ("args" in i) {
        const { rr_type: n, args: s } = i, a = window[n];
        return new a(...yield Promise.all(s.map(ye(e, t, r))));
      } else {
        if ("base64" in i)
          return Hi(i.base64);
        if ("src" in i) {
          const n = e.get(i.src);
          if (n)
            return n;
          {
            const s = new Image();
            return s.src = i.src, e.set(i.src, s), s;
          }
        } else if ("data" in i && i.rr_type === "Blob") {
          const n = yield Promise.all(i.data.map(ye(e, t, r)));
          return new Blob(n, {
            type: i.type
          });
        }
      }
    else if (Array.isArray(i))
      return yield Promise.all(i.map(ye(e, t, r)));
    return i;
  });
}
function Fn(e, t) {
  try {
    return t === pe.WebGL ? e.getContext("webgl") || e.getContext("experimental-webgl") : e.getContext("webgl2");
  } catch {
    return null;
  }
}
const _n = [
  "WebGLActiveInfo",
  "WebGLBuffer",
  "WebGLFramebuffer",
  "WebGLProgram",
  "WebGLRenderbuffer",
  "WebGLShader",
  "WebGLShaderPrecisionFormat",
  "WebGLTexture",
  "WebGLUniformLocation",
  "WebGLVertexArrayObject"
];
function Bn(e, t) {
  if (!(t != null && t.constructor))
    return;
  const { name: r } = t.constructor;
  if (!_n.includes(r))
    return;
  const i = Wr(e, r);
  i.includes(t) || i.push(t);
}
function Wn({ mutation: e, target: t, type: r, imageMap: i, errorHandler: n }) {
  return ve(this, void 0, void 0, function* () {
    try {
      const s = Fn(t, r);
      if (!s)
        return;
      if (e.setter) {
        s[e.property] = e.args[0];
        return;
      }
      const a = s[e.property], o = yield Promise.all(e.args.map(ye(i, s))), l = a.apply(s, o);
      Bn(s, l);
      const c = !1;
    } catch (s) {
      n(e, s);
    }
  });
}
function Vn({ event: e, mutation: t, target: r, imageMap: i, errorHandler: n }) {
  return ve(this, void 0, void 0, function* () {
    try {
      const s = r.getContext("2d");
      if (t.setter) {
        s[t.property] = t.args[0];
        return;
      }
      const a = s[t.property];
      if (t.property === "drawImage" && typeof t.args[0] == "string")
        i.get(e), a.apply(s, t.args);
      else {
        const o = yield Promise.all(t.args.map(ye(i, s)));
        a.apply(s, o);
      }
    } catch (s) {
      n(t, s);
    }
  });
}
function zt({ event: e, mutation: t, target: r, imageMap: i, canvasEventMap: n, errorHandler: s }) {
  return ve(this, void 0, void 0, function* () {
    try {
      const a = n.get(e) || t, o = "commands" in a ? a.commands : [a];
      if ([pe.WebGL, pe.WebGL2].includes(t.type)) {
        for (let l = 0; l < o.length; l++) {
          const c = o[l];
          yield Wn({
            mutation: c,
            type: t.type,
            target: r,
            imageMap: i,
            errorHandler: s
          });
        }
        return;
      }
      for (let l = 0; l < o.length; l++) {
        const c = o[l];
        yield Vn({
          event: e,
          mutation: c,
          target: r,
          imageMap: i,
          errorHandler: s
        });
      }
    } catch (a) {
      s(t, a);
    }
  });
}
const Un = 10 * 1e3, Gn = 5 * 1e3, Pn = Or || Mn, Kt = "[replayer]", ot = {
  duration: 500,
  lineCap: "round",
  lineWidth: 3,
  strokeStyle: "red"
};
function jt(e) {
  return e.type == E.IncrementalSnapshot && (e.data.source == A.TouchMove || e.data.source == A.MouseInteraction && e.data.type == O.TouchStart);
}
class Zn {
  constructor(t, r) {
    if (this.usingVirtualDom = !1, this.virtualDom = new De(), this.mouseTail = null, this.tailPositions = [], this.emitter = Pn(), this.legacy_missingNodeRetryMap = {}, this.cache = Nt(), this.imageMap = /* @__PURE__ */ new Map(), this.canvasEventMap = /* @__PURE__ */ new Map(), this.mirror = Jt(), this.styleMirror = new dr(), this.firstFullSnapshot = null, this.newDocumentQueue = [], this.mousePos = null, this.touchActive = null, this.lastMouseDownEvent = null, this.lastSelectionData = null, this.constructedStyleMutations = [], this.adoptedStyleSheets = [], this.handleResize = (o) => {
      this.iframe.style.display = "inherit";
      for (const l of [this.mouseTail, this.iframe])
        l && (l.setAttribute("width", String(o.width)), l.setAttribute("height", String(o.height)));
    }, this.applyEventsSynchronously = (o) => {
      for (const l of o) {
        switch (l.type) {
          case E.DomContentLoaded:
          case E.Load:
          case E.Custom:
            continue;
          case E.FullSnapshot:
          case E.Meta:
          case E.Plugin:
          case E.IncrementalSnapshot:
            break;
        }
        this.getCastFn(l, !0)();
      }
    }, this.getCastFn = (o, l = !1) => {
      let c;
      switch (o.type) {
        case E.DomContentLoaded:
        case E.Load:
          break;
        case E.Custom:
          c = () => {
            this.emitter.emit(F.CustomEvent, o);
          };
          break;
        case E.Meta:
          c = () => this.emitter.emit(F.Resize, {
            width: o.data.width,
            height: o.data.height
          });
          break;
        case E.FullSnapshot:
          c = () => {
            var d;
            if (this.firstFullSnapshot) {
              if (this.firstFullSnapshot === o) {
                this.firstFullSnapshot = !0;
                return;
              }
            } else
              this.firstFullSnapshot = !0;
            this.rebuildFullSnapshot(o, l), (d = this.iframe.contentWindow) === null || d === void 0 || d.scrollTo(o.data.initialOffset), this.styleMirror.reset();
          };
          break;
        case E.IncrementalSnapshot:
          c = () => {
            if (this.applyIncremental(o, l), !l && (o === this.nextUserInteractionEvent && (this.nextUserInteractionEvent = null, this.backToNormal()), this.config.skipInactive && !this.nextUserInteractionEvent)) {
              for (const d of this.service.state.context.events)
                if (!(d.timestamp <= o.timestamp) && this.isUserInteraction(d)) {
                  d.delay - o.delay > Un * this.speedService.state.context.timer.speed && (this.nextUserInteractionEvent = d);
                  break;
                }
              if (this.nextUserInteractionEvent) {
                const d = this.nextUserInteractionEvent.delay - o.delay, h = {
                  speed: Math.min(Math.round(d / Gn), this.config.maxSpeed)
                };
                this.speedService.send({ type: "FAST_FORWARD", payload: h }), this.emitter.emit(F.SkipStart, h);
              }
            }
          };
          break;
      }
      return () => {
        c && c();
        for (const h of this.config.plugins || [])
          h.handler && h.handler(o, l, { replayer: this });
        this.service.send({ type: "CAST_EVENT", payload: { event: o } });
        const d = this.service.state.context.events.length - 1;
        if (!this.config.liveMode && o === this.service.state.context.events[d]) {
          const h = () => {
            d < this.service.state.context.events.length - 1 || (this.backToNormal(), this.service.send("END"), this.emitter.emit(F.Finish));
          };
          let p = 50;
          o.type === E.IncrementalSnapshot && o.data.source === A.MouseMove && o.data.positions.length && (p += Math.max(0, -o.data.positions[0].timeOffset)), setTimeout(h, p);
        }
        this.emitter.emit(F.EventCast, o);
      };
    }, !(r != null && r.liveMode) && t.length < 2)
      throw new Error("Replayer need at least 2 events.");
    const i = {
      speed: 1,
      maxSpeed: 360,
      root: document.body,
      loadTimeout: 0,
      skipInactive: !1,
      showWarning: !0,
      showDebug: !1,
      blockClass: "rr-block",
      liveMode: !1,
      insertStyleRules: [],
      triggerFocus: !0,
      UNSAFE_replayCanvas: !1,
      pauseAnimation: !0,
      mouseTail: ot,
      useVirtualDom: !0,
      logger: console
    };
    this.config = Object.assign({}, i, r), this.handleResize = this.handleResize.bind(this), this.getCastFn = this.getCastFn.bind(this), this.applyEventsSynchronously = this.applyEventsSynchronously.bind(this), this.emitter.on(F.Resize, this.handleResize), this.setupDom();
    for (const o of this.config.plugins || [])
      o.getMirror && o.getMirror({ nodeMirror: this.mirror });
    this.emitter.on(F.Flush, () => {
      if (this.usingVirtualDom) {
        const o = {
          mirror: this.mirror,
          applyCanvas: (l, c, u) => {
            zt({
              event: l,
              mutation: c,
              target: u,
              imageMap: this.imageMap,
              canvasEventMap: this.canvasEventMap,
              errorHandler: this.warnCanvasMutationFailed.bind(this)
            });
          },
          applyInput: this.applyInput.bind(this),
          applyScroll: this.applyScroll.bind(this),
          applyStyleSheetMutation: (l, c) => {
            l.source === A.StyleSheetRule ? this.applyStyleSheetRule(l, c) : l.source === A.StyleDeclaration && this.applyStyleDeclaration(l, c);
          },
          afterAppend: (l, c) => {
            for (const u of this.config.plugins || [])
              u.onBuild && u.onBuild(l, { id: c, replayer: this });
          }
        };
        if (this.iframe.contentDocument)
          try {
            ue(this.iframe.contentDocument, this.virtualDom, o, this.virtualDom.mirror);
          } catch (l) {
            console.warn(l);
          }
        if (this.virtualDom.destroyTree(), this.usingVirtualDom = !1, Object.keys(this.legacy_missingNodeRetryMap).length)
          for (const l in this.legacy_missingNodeRetryMap)
            try {
              const c = this.legacy_missingNodeRetryMap[l], u = $e(c.node, this.mirror, this.virtualDom.mirror);
              ue(u, c.node, o, this.virtualDom.mirror), c.node = u;
            } catch (c) {
              this.warn(c);
            }
        this.constructedStyleMutations.forEach((l) => {
          this.applyStyleSheetMutation(l);
        }), this.constructedStyleMutations = [], this.adoptedStyleSheets.forEach((l) => {
          this.applyAdoptedStyleSheet(l);
        }), this.adoptedStyleSheets = [];
      }
      if (this.mousePos && (this.moveAndHover(this.mousePos.x, this.mousePos.y, this.mousePos.id, !0, this.mousePos.debugData), this.mousePos = null), this.touchActive === !0 ? this.mouse.classList.add("touch-active") : this.touchActive === !1 && this.mouse.classList.remove("touch-active"), this.touchActive = null, this.lastMouseDownEvent) {
        const [o, l] = this.lastMouseDownEvent;
        o.dispatchEvent(l);
      }
      this.lastMouseDownEvent = null, this.lastSelectionData && (this.applySelection(this.lastSelectionData), this.lastSelectionData = null);
    }), this.emitter.on(F.PlayBack, () => {
      this.firstFullSnapshot = null, this.mirror.reset(), this.styleMirror.reset();
    });
    const n = new Dn([], {
      speed: this.config.speed
    });
    this.service = xn({
      events: t.map((o) => r && r.unpackFn ? r.unpackFn(o) : o).sort((o, l) => o.timestamp - l.timestamp),
      timer: n,
      timeOffset: 0,
      baselineTime: 0,
      lastPlayedEvent: null
    }, {
      getCastFn: this.getCastFn,
      applyEventsSynchronously: this.applyEventsSynchronously,
      emitter: this.emitter
    }), this.service.start(), this.service.subscribe((o) => {
      this.emitter.emit(F.StateChange, {
        player: o
      });
    }), this.speedService = On({
      normalSpeed: -1,
      timer: n
    }), this.speedService.start(), this.speedService.subscribe((o) => {
      this.emitter.emit(F.StateChange, {
        speed: o
      });
    });
    const s = this.service.state.context.events.find((o) => o.type === E.Meta), a = this.service.state.context.events.find((o) => o.type === E.FullSnapshot);
    if (s) {
      const { width: o, height: l } = s.data;
      setTimeout(() => {
        this.emitter.emit(F.Resize, {
          width: o,
          height: l
        });
      }, 0);
    }
    a && setTimeout(() => {
      var o;
      this.firstFullSnapshot || (this.firstFullSnapshot = a, this.rebuildFullSnapshot(a), (o = this.iframe.contentWindow) === null || o === void 0 || o.scrollTo(a.data.initialOffset));
    }, 1), this.service.state.context.events.find(jt) && this.mouse.classList.add("touch-device");
  }
  get timer() {
    return this.service.state.context.timer;
  }
  on(t, r) {
    return this.emitter.on(t, r), this;
  }
  off(t, r) {
    return this.emitter.off(t, r), this;
  }
  setConfig(t) {
    Object.keys(t).forEach((r) => {
      t[r], this.config[r] = t[r];
    }), this.config.skipInactive || this.backToNormal(), typeof t.speed < "u" && this.speedService.send({
      type: "SET_SPEED",
      payload: {
        speed: t.speed
      }
    }), typeof t.mouseTail < "u" && (t.mouseTail === !1 ? this.mouseTail && (this.mouseTail.style.display = "none") : (this.mouseTail || (this.mouseTail = document.createElement("canvas"), this.mouseTail.width = Number.parseFloat(this.iframe.width), this.mouseTail.height = Number.parseFloat(this.iframe.height), this.mouseTail.classList.add("replayer-mouse-tail"), this.wrapper.insertBefore(this.mouseTail, this.iframe)), this.mouseTail.style.display = "inherit"));
  }
  getMetaData() {
    const t = this.service.state.context.events[0], r = this.service.state.context.events[this.service.state.context.events.length - 1];
    return {
      startTime: t.timestamp,
      endTime: r.timestamp,
      totalTime: r.timestamp - t.timestamp
    };
  }
  getCurrentTime() {
    return this.timer.timeOffset + this.getTimeOffset();
  }
  getTimeOffset() {
    const { baselineTime: t, events: r } = this.service.state.context;
    return t - r[0].timestamp;
  }
  getMirror() {
    return this.mirror;
  }
  play(t = 0) {
    var r, i;
    this.service.state.matches("paused") ? this.service.send({ type: "PLAY", payload: { timeOffset: t } }) : (this.service.send({ type: "PAUSE" }), this.service.send({ type: "PLAY", payload: { timeOffset: t } })), (i = (r = this.iframe.contentDocument) === null || r === void 0 ? void 0 : r.getElementsByTagName("html")[0]) === null || i === void 0 || i.classList.remove("rrweb-paused"), this.emitter.emit(F.Start);
  }
  pause(t) {
    var r, i;
    t === void 0 && this.service.state.matches("playing") && this.service.send({ type: "PAUSE" }), typeof t == "number" && (this.play(t), this.service.send({ type: "PAUSE" })), (i = (r = this.iframe.contentDocument) === null || r === void 0 ? void 0 : r.getElementsByTagName("html")[0]) === null || i === void 0 || i.classList.add("rrweb-paused"), this.emitter.emit(F.Pause);
  }
  resume(t = 0) {
    this.warn("The 'resume' was deprecated in 1.0. Please use 'play' method which has the same interface."), this.play(t), this.emitter.emit(F.Resume);
  }
  destroy() {
    this.pause(), this.config.root.removeChild(this.wrapper), this.emitter.emit(F.Destroy);
  }
  startLive(t) {
    this.service.send({ type: "TO_LIVE", payload: { baselineTime: t } });
  }
  addEvent(t) {
    const r = this.config.unpackFn ? this.config.unpackFn(t) : t;
    jt(r) && this.mouse.classList.add("touch-device"), Promise.resolve().then(() => this.service.send({ type: "ADD_EVENT", payload: { event: r } }));
  }
  enableInteract() {
    this.iframe.setAttribute("scrolling", "auto"), this.iframe.style.pointerEvents = "auto";
  }
  disableInteract() {
    this.iframe.setAttribute("scrolling", "no"), this.iframe.style.pointerEvents = "none";
  }
  resetCache() {
    this.cache = Nt();
  }
  setupDom() {
    this.wrapper = document.createElement("div"), this.wrapper.classList.add("replayer-wrapper"), this.config.root.appendChild(this.wrapper), this.mouse = document.createElement("div"), this.mouse.classList.add("replayer-mouse"), this.wrapper.appendChild(this.mouse), this.config.mouseTail !== !1 && (this.mouseTail = document.createElement("canvas"), this.mouseTail.classList.add("replayer-mouse-tail"), this.mouseTail.style.display = "inherit", this.wrapper.appendChild(this.mouseTail)), this.iframe = document.createElement("iframe");
    const t = ["allow-same-origin"];
    this.config.UNSAFE_replayCanvas && t.push("allow-scripts"), this.iframe.style.display = "none", this.iframe.setAttribute("sandbox", t.join(" ")), this.disableInteract(), this.wrapper.appendChild(this.iframe), this.iframe.contentWindow && this.iframe.contentDocument && (Rn(this.iframe.contentWindow, this.iframe.contentDocument), ar(this.iframe.contentWindow));
  }
  rebuildFullSnapshot(t, r = !1) {
    if (!this.iframe.contentDocument)
      return this.warn("Looks like your replayer has been destroyed.");
    Object.keys(this.legacy_missingNodeRetryMap).length && this.warn("Found unresolved missing node map", this.legacy_missingNodeRetryMap), this.legacy_missingNodeRetryMap = {};
    const i = [], n = (o, l) => {
      this.collectIframeAndAttachDocument(i, o);
      for (const c of this.config.plugins || [])
        c.onBuild && c.onBuild(o, {
          id: l,
          replayer: this
        });
    };
    this.usingVirtualDom && (this.virtualDom.destroyTree(), this.usingVirtualDom = !1), this.mirror.reset(), vi(t.data.node, {
      doc: this.iframe.contentDocument,
      afterAppend: n,
      cache: this.cache,
      mirror: this.mirror
    }), n(this.iframe.contentDocument, t.data.node.id);
    for (const { mutationInQueue: o, builtNode: l } of i)
      this.attachDocumentToIframe(o, l), this.newDocumentQueue = this.newDocumentQueue.filter((c) => c !== o);
    const { documentElement: s, head: a } = this.iframe.contentDocument;
    this.insertStyleRules(s, a), this.service.state.matches("playing") || this.iframe.contentDocument.getElementsByTagName("html")[0].classList.add("rrweb-paused"), this.emitter.emit(F.FullsnapshotRebuilded, t), r || this.waitForStylesheetLoad(), this.config.UNSAFE_replayCanvas && this.preloadAllImages();
  }
  insertStyleRules(t, r) {
    var i;
    const n = Ln(this.config.blockClass).concat(this.config.insertStyleRules);
    if (this.config.pauseAnimation && n.push("html.rrweb-paused *, html.rrweb-paused *:before, html.rrweb-paused *:after { animation-play-state: paused !important; }"), this.usingVirtualDom) {
      const s = this.virtualDom.createElement("style");
      this.virtualDom.mirror.add(s, xr(s, this.virtualDom.unserializedId)), t.insertBefore(s, r), s.rules.push({
        source: A.StyleSheetRule,
        adds: n.map((a, o) => ({
          rule: a,
          index: o
        }))
      });
    } else {
      const s = document.createElement("style");
      t.insertBefore(s, r);
      for (let a = 0; a < n.length; a++)
        (i = s.sheet) === null || i === void 0 || i.insertRule(n[a], a);
    }
  }
  attachDocumentToIframe(t, r) {
    const i = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror, n = [], s = (a, o) => {
      this.collectIframeAndAttachDocument(n, a);
      const l = i.getMeta(a);
      if ((l == null ? void 0 : l.type) === w.Element && (l == null ? void 0 : l.tagName.toUpperCase()) === "HTML") {
        const { documentElement: c, head: u } = r.contentDocument;
        this.insertStyleRules(c, u);
      }
      if (!this.usingVirtualDom)
        for (const c of this.config.plugins || [])
          c.onBuild && c.onBuild(a, {
            id: o,
            replayer: this
          });
    };
    Fe(t.node, {
      doc: r.contentDocument,
      mirror: i,
      hackCss: !0,
      skipChild: !1,
      afterAppend: s,
      cache: this.cache
    }), s(r.contentDocument, t.node.id);
    for (const { mutationInQueue: a, builtNode: o } of n)
      this.attachDocumentToIframe(a, o), this.newDocumentQueue = this.newDocumentQueue.filter((l) => l !== a);
  }
  collectIframeAndAttachDocument(t, r) {
    if (_e(r, this.mirror)) {
      const i = this.newDocumentQueue.find((n) => n.parentId === this.mirror.getId(r));
      i && t.push({
        mutationInQueue: i,
        builtNode: r
      });
    }
  }
  waitForStylesheetLoad() {
    var t;
    const r = (t = this.iframe.contentDocument) === null || t === void 0 ? void 0 : t.head;
    if (r) {
      const i = /* @__PURE__ */ new Set();
      let n, s = this.service.state;
      const a = () => {
        s = this.service.state;
      };
      this.emitter.on(F.Start, a), this.emitter.on(F.Pause, a);
      const o = () => {
        this.emitter.off(F.Start, a), this.emitter.off(F.Pause, a);
      };
      r.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
        l.sheet || (i.add(l), l.addEventListener("load", () => {
          i.delete(l), i.size === 0 && n !== -1 && (s.matches("playing") && this.play(this.getCurrentTime()), this.emitter.emit(F.LoadStylesheetEnd), n && clearTimeout(n), o());
        }));
      }), i.size > 0 && (this.service.send({ type: "PAUSE" }), this.emitter.emit(F.LoadStylesheetStart), n = setTimeout(() => {
        s.matches("playing") && this.play(this.getCurrentTime()), n = -1, o();
      }, this.config.loadTimeout));
    }
  }
  preloadAllImages() {
    return ve(this, void 0, void 0, function* () {
      this.service.state;
      const t = () => {
        this.service.state;
      };
      this.emitter.on(F.Start, t), this.emitter.on(F.Pause, t);
      const r = [];
      for (const i of this.service.state.context.events)
        i.type === E.IncrementalSnapshot && i.data.source === A.CanvasMutation && (r.push(this.deserializeAndPreloadCanvasEvents(i.data, i)), ("commands" in i.data ? i.data.commands : [i.data]).forEach((s) => {
          this.preloadImages(s, i);
        }));
      return Promise.all(r);
    });
  }
  preloadImages(t, r) {
    if (t.property === "drawImage" && typeof t.args[0] == "string" && !this.imageMap.has(r)) {
      const i = document.createElement("canvas"), n = i.getContext("2d"), s = n == null ? void 0 : n.createImageData(i.width, i.height);
      s == null || s.data, JSON.parse(t.args[0]), n == null || n.putImageData(s, 0, 0);
    }
  }
  deserializeAndPreloadCanvasEvents(t, r) {
    return ve(this, void 0, void 0, function* () {
      if (!this.canvasEventMap.has(r)) {
        const i = {
          isUnchanged: !0
        };
        if ("commands" in t) {
          const n = yield Promise.all(t.commands.map((s) => ve(this, void 0, void 0, function* () {
            const a = yield Promise.all(s.args.map(ye(this.imageMap, null, i)));
            return Object.assign(Object.assign({}, s), { args: a });
          })));
          i.isUnchanged === !1 && this.canvasEventMap.set(r, Object.assign(Object.assign({}, t), { commands: n }));
        } else {
          const n = yield Promise.all(t.args.map(ye(this.imageMap, null, i)));
          i.isUnchanged === !1 && this.canvasEventMap.set(r, Object.assign(Object.assign({}, t), { args: n }));
        }
      }
    });
  }
  applyIncremental(t, r) {
    var i, n, s;
    const { data: a } = t;
    switch (a.source) {
      case A.Mutation: {
        try {
          this.applyMutation(a, r);
        } catch (o) {
          this.warn(`Exception in mutation ${o.message || o}`, a);
        }
        break;
      }
      case A.Drag:
      case A.TouchMove:
      case A.MouseMove:
        if (r) {
          const o = a.positions[a.positions.length - 1];
          this.mousePos = {
            x: o.x,
            y: o.y,
            id: o.id,
            debugData: a
          };
        } else
          a.positions.forEach((o) => {
            const l = {
              doAction: () => {
                this.moveAndHover(o.x, o.y, o.id, r, a);
              },
              delay: o.timeOffset + t.timestamp - this.service.state.context.baselineTime
            };
            this.timer.addAction(l);
          }), this.timer.addAction({
            doAction() {
            },
            delay: t.delay - ((i = a.positions[0]) === null || i === void 0 ? void 0 : i.timeOffset)
          });
        break;
      case A.MouseInteraction: {
        if (a.id === -1)
          break;
        const o = new Event(O[a.type].toLowerCase()), l = this.mirror.getNode(a.id);
        if (!l)
          return this.debugNodeNotFound(a, a.id);
        this.emitter.emit(F.MouseInteraction, {
          type: a.type,
          target: l
        });
        const { triggerFocus: c } = this.config;
        switch (a.type) {
          case O.Blur:
            "blur" in l && l.blur();
            break;
          case O.Focus:
            c && l.focus && l.focus({
              preventScroll: !0
            });
            break;
          case O.Click:
          case O.TouchStart:
          case O.TouchEnd:
          case O.MouseDown:
          case O.MouseUp:
            r ? (a.type === O.TouchStart ? this.touchActive = !0 : a.type === O.TouchEnd && (this.touchActive = !1), a.type === O.MouseDown ? this.lastMouseDownEvent = [l, o] : a.type === O.MouseUp && (this.lastMouseDownEvent = null), this.mousePos = {
              x: a.x,
              y: a.y,
              id: a.id,
              debugData: a
            }) : (a.type === O.TouchStart && (this.tailPositions.length = 0), this.moveAndHover(a.x, a.y, a.id, r, a), a.type === O.Click ? (this.mouse.classList.remove("active"), this.mouse.offsetWidth, this.mouse.classList.add("active")) : a.type === O.TouchStart ? (this.mouse.offsetWidth, this.mouse.classList.add("touch-active")) : a.type === O.TouchEnd ? this.mouse.classList.remove("touch-active") : l.dispatchEvent(o));
            break;
          case O.TouchCancel:
            r ? this.touchActive = !1 : this.mouse.classList.remove("touch-active");
            break;
          default:
            l.dispatchEvent(o);
        }
        break;
      }
      case A.Scroll: {
        if (a.id === -1)
          break;
        if (this.usingVirtualDom) {
          const o = this.virtualDom.mirror.getNode(a.id);
          if (!o)
            return this.debugNodeNotFound(a, a.id);
          o.scrollData = a;
          break;
        }
        this.applyScroll(a, r);
        break;
      }
      case A.ViewportResize:
        this.emitter.emit(F.Resize, {
          width: a.width,
          height: a.height
        });
        break;
      case A.Input: {
        if (a.id === -1)
          break;
        if (this.usingVirtualDom) {
          const o = this.virtualDom.mirror.getNode(a.id);
          if (!o)
            return this.debugNodeNotFound(a, a.id);
          o.inputData = a;
          break;
        }
        this.applyInput(a);
        break;
      }
      case A.MediaInteraction: {
        const o = this.usingVirtualDom ? this.virtualDom.mirror.getNode(a.id) : this.mirror.getNode(a.id);
        if (!o)
          return this.debugNodeNotFound(a, a.id);
        const l = o;
        try {
          a.currentTime !== void 0 && (l.currentTime = a.currentTime), a.volume !== void 0 && (l.volume = a.volume), a.muted !== void 0 && (l.muted = a.muted), a.type === 1 && l.pause(), a.type === 0 && l.play(), a.type === 4 && (l.playbackRate = a.playbackRate);
        } catch (c) {
          this.warn(`Failed to replay media interactions: ${c.message || c}`);
        }
        break;
      }
      case A.StyleSheetRule:
      case A.StyleDeclaration: {
        this.usingVirtualDom ? a.styleId ? this.constructedStyleMutations.push(a) : a.id && ((n = this.virtualDom.mirror.getNode(a.id)) === null || n === void 0 || n.rules.push(a)) : this.applyStyleSheetMutation(a);
        break;
      }
      case A.CanvasMutation: {
        if (!this.config.UNSAFE_replayCanvas)
          return;
        if (this.usingVirtualDom) {
          const o = this.virtualDom.mirror.getNode(a.id);
          if (!o)
            return this.debugNodeNotFound(a, a.id);
          o.canvasMutations.push({
            event: t,
            mutation: a
          });
        } else {
          const o = this.mirror.getNode(a.id);
          if (!o)
            return this.debugNodeNotFound(a, a.id);
          zt({
            event: t,
            mutation: a,
            target: o,
            imageMap: this.imageMap,
            canvasEventMap: this.canvasEventMap,
            errorHandler: this.warnCanvasMutationFailed.bind(this)
          });
        }
        break;
      }
      case A.Font: {
        try {
          const o = new FontFace(a.family, a.buffer ? new Uint8Array(JSON.parse(a.fontSource)) : a.fontSource, a.descriptors);
          (s = this.iframe.contentDocument) === null || s === void 0 || s.fonts.add(o);
        } catch (o) {
          this.warn(o);
        }
        break;
      }
      case A.Selection: {
        if (r) {
          this.lastSelectionData = a;
          break;
        }
        this.applySelection(a);
        break;
      }
      case A.AdoptedStyleSheet: {
        this.usingVirtualDom ? this.adoptedStyleSheets.push(a) : this.applyAdoptedStyleSheet(a);
        break;
      }
    }
  }
  applyMutation(t, r) {
    if (this.config.useVirtualDom && !this.usingVirtualDom && r && (this.usingVirtualDom = !0, Nn(this.iframe.contentDocument, this.mirror, this.virtualDom), Object.keys(this.legacy_missingNodeRetryMap).length))
      for (const c in this.legacy_missingNodeRetryMap)
        try {
          const u = this.legacy_missingNodeRetryMap[c], d = kr(u.node, this.virtualDom, this.mirror);
          d && (u.node = d);
        } catch (u) {
          this.warn(u);
        }
    const i = this.usingVirtualDom ? this.virtualDom.mirror : this.mirror;
    t.removes = t.removes.filter((c) => i.getNode(c.id) ? !0 : (this.warnNodeNotFound(t, c.id), !1)), t.removes.forEach((c) => {
      var u;
      const d = i.getNode(c.id);
      if (!d)
        return;
      let h = i.getNode(c.parentId);
      if (!h)
        return this.warnNodeNotFound(t, c.parentId);
      if (c.isShadow && Ie(h) && (h = h.shadowRoot), i.removeNodeFromMap(d), h)
        try {
          h.removeChild(d), this.usingVirtualDom && d.nodeName === "#text" && h.nodeName === "STYLE" && ((u = h.rules) === null || u === void 0 ? void 0 : u.length) > 0 && (h.rules = []);
        } catch (p) {
          if (p instanceof DOMException)
            this.warn("parent could not remove child in mutation", h, d, t);
          else
            throw p;
        }
    });
    const n = Object.assign({}, this.legacy_missingNodeRetryMap), s = [], a = (c) => {
      let u = null;
      return c.nextId && (u = i.getNode(c.nextId)), c.nextId !== null && c.nextId !== void 0 && c.nextId !== -1 && !u;
    }, o = (c) => {
      var u, d;
      if (!this.iframe.contentDocument)
        return this.warn("Looks like your replayer has been destroyed.");
      let h = i.getNode(c.parentId);
      if (!h)
        return c.node.type === w.Document ? this.newDocumentQueue.push(c) : s.push(c);
      c.node.isShadow && (Ie(h) || h.attachShadow({ mode: "open" }), h = h.shadowRoot);
      let p = null, f = null;
      if (c.previousId && (p = i.getNode(c.previousId)), c.nextId && (f = i.getNode(c.nextId)), a(c))
        return s.push(c);
      if (c.node.rootId && !i.getNode(c.node.rootId))
        return;
      const g = c.node.rootId ? i.getNode(c.node.rootId) : this.usingVirtualDom ? this.virtualDom : this.iframe.contentDocument;
      if (_e(h, i)) {
        this.attachDocumentToIframe(c, h);
        return;
      }
      const C = (v, b) => {
        if (!this.usingVirtualDom)
          for (const R of this.config.plugins || [])
            R.onBuild && R.onBuild(v, { id: b, replayer: this });
      }, m = Fe(c.node, {
        doc: g,
        mirror: i,
        skipChild: !0,
        hackCss: !0,
        cache: this.cache,
        afterAppend: C
      });
      if (c.previousId === -1 || c.nextId === -1) {
        n[c.node.id] = {
          node: m,
          mutation: c
        };
        return;
      }
      const y = i.getMeta(h);
      if (y && y.type === w.Element && y.tagName === "textarea" && c.node.type === w.Text) {
        const v = Array.isArray(h.childNodes) ? h.childNodes : Array.from(h.childNodes);
        for (const b of v)
          b.nodeType === h.TEXT_NODE && h.removeChild(b);
      } else if ((y == null ? void 0 : y.type) === w.Document) {
        const v = h;
        c.node.type === w.DocumentType && ((u = v.childNodes[0]) === null || u === void 0 ? void 0 : u.nodeType) === Node.DOCUMENT_TYPE_NODE && v.removeChild(v.childNodes[0]), m.nodeName === "HTML" && v.documentElement && v.removeChild(v.documentElement);
      }
      if (p && p.nextSibling && p.nextSibling.parentNode ? h.insertBefore(m, p.nextSibling) : f && f.parentNode ? h.contains(f) ? h.insertBefore(m, f) : h.insertBefore(m, null) : h.appendChild(m), C(m, c.node.id), this.usingVirtualDom && m.nodeName === "#text" && h.nodeName === "STYLE" && ((d = h.rules) === null || d === void 0 ? void 0 : d.length) > 0 && (h.rules = []), _e(m, this.mirror)) {
        const v = this.mirror.getId(m), b = this.newDocumentQueue.find((R) => R.parentId === v);
        b && (this.attachDocumentToIframe(b, m), this.newDocumentQueue = this.newDocumentQueue.filter((R) => R !== b));
      }
      (c.previousId || c.nextId) && this.legacy_resolveMissingNode(n, h, m, c);
    };
    t.adds.forEach((c) => {
      o(c);
    });
    const l = Date.now();
    for (; s.length; ) {
      const c = Ci(s);
      if (s.length = 0, Date.now() - l > 500) {
        this.warn("Timeout in the loop, please check the resolve tree data:", c);
        break;
      }
      for (const u of c)
        i.getNode(u.value.parentId) ? lr(u, (h) => {
          o(h);
        }) : this.debug("Drop resolve tree since there is no parent for the root node.", u);
    }
    Object.keys(n).length && Object.assign(this.legacy_missingNodeRetryMap, n), Si(t.texts).forEach((c) => {
      var u;
      const d = i.getNode(c.id);
      if (!d)
        return t.removes.find((h) => h.id === c.id) ? void 0 : this.warnNodeNotFound(t, c.id);
      if (d.textContent = c.value, this.usingVirtualDom) {
        const h = d.parentNode;
        ((u = h == null ? void 0 : h.rules) === null || u === void 0 ? void 0 : u.length) > 0 && (h.rules = []);
      }
    }), t.attributes.forEach((c) => {
      const u = i.getNode(c.id);
      if (!u)
        return t.removes.find((d) => d.id === c.id) ? void 0 : this.warnNodeNotFound(t, c.id);
      for (const d in c.attributes)
        if (typeof d == "string") {
          const h = c.attributes[d];
          if (h === null)
            u.removeAttribute(d);
          else if (typeof h == "string")
            try {
              if (d === "_cssText" && (u.nodeName === "LINK" || u.nodeName === "STYLE"))
                try {
                  const p = i.getMeta(u);
                  Object.assign(p.attributes, c.attributes);
                  const f = Fe(p, {
                    doc: u.ownerDocument,
                    mirror: i,
                    skipChild: !0,
                    hackCss: !0,
                    cache: this.cache
                  }), g = u.nextSibling, C = u.parentNode;
                  if (f && C) {
                    C.removeChild(u), C.insertBefore(f, g), i.replace(c.id, f);
                    break;
                  }
                } catch {
                }
              u.setAttribute(d, h);
            } catch (p) {
              this.warn("An error occurred may due to the checkout feature.", p);
            }
          else if (d === "style") {
            const p = h, f = u;
            for (const g in p)
              if (p[g] === !1)
                f.style.removeProperty(g);
              else if (p[g] instanceof Array) {
                const C = p[g];
                f.style.setProperty(g, C[0], C[1]);
              } else {
                const C = p[g];
                f.style.setProperty(g, C);
              }
          }
        }
    });
  }
  applyScroll(t, r) {
    var i, n;
    const s = this.mirror.getNode(t.id);
    if (!s)
      return this.debugNodeNotFound(t, t.id);
    const a = this.mirror.getMeta(s);
    if (s === this.iframe.contentDocument)
      (i = this.iframe.contentWindow) === null || i === void 0 || i.scrollTo({
        top: t.y,
        left: t.x,
        behavior: r ? "auto" : "smooth"
      });
    else if ((a == null ? void 0 : a.type) === w.Document)
      (n = s.defaultView) === null || n === void 0 || n.scrollTo({
        top: t.y,
        left: t.x,
        behavior: r ? "auto" : "smooth"
      });
    else
      try {
        s.scrollTo({
          top: t.y,
          left: t.x,
          behavior: r ? "auto" : "smooth"
        });
      } catch {
      }
  }
  applyInput(t) {
    const r = this.mirror.getNode(t.id);
    if (!r)
      return this.debugNodeNotFound(t, t.id);
    try {
      r.checked = t.isChecked, r.value = t.text;
    } catch {
    }
  }
  applySelection(t) {
    try {
      const r = /* @__PURE__ */ new Set(), i = t.ranges.map(({ start: n, startOffset: s, end: a, endOffset: o }) => {
        const l = this.mirror.getNode(n), c = this.mirror.getNode(a);
        if (!l || !c)
          return;
        const u = new Range();
        u.setStart(l, s), u.setEnd(c, o);
        const d = l.ownerDocument, h = d == null ? void 0 : d.getSelection();
        return h && r.add(h), {
          range: u,
          selection: h
        };
      });
      r.forEach((n) => n.removeAllRanges()), i.forEach((n) => {
        var s;
        return n && ((s = n.selection) === null || s === void 0 ? void 0 : s.addRange(n.range));
      });
    } catch {
    }
  }
  applyStyleSheetMutation(t) {
    var r;
    let i = null;
    t.styleId ? i = this.styleMirror.getStyle(t.styleId) : t.id && (i = ((r = this.mirror.getNode(t.id)) === null || r === void 0 ? void 0 : r.sheet) || null), i && (t.source === A.StyleSheetRule ? this.applyStyleSheetRule(t, i) : t.source === A.StyleDeclaration && this.applyStyleDeclaration(t, i));
  }
  applyStyleSheetRule(t, r) {
    var i, n, s, a;
    if ((i = t.adds) === null || i === void 0 || i.forEach(({ rule: o, index: l }) => {
      try {
        if (Array.isArray(l)) {
          const { positions: c, index: u } = wt(l);
          ke(r.cssRules, c).insertRule(o, u);
        } else {
          const c = l === void 0 ? void 0 : Math.min(l, r.cssRules.length);
          r == null || r.insertRule(o, c);
        }
      } catch {
      }
    }), (n = t.removes) === null || n === void 0 || n.forEach(({ index: o }) => {
      try {
        if (Array.isArray(o)) {
          const { positions: l, index: c } = wt(o);
          ke(r.cssRules, l).deleteRule(c || 0);
        } else
          r == null || r.deleteRule(o);
      } catch {
      }
    }), t.replace)
      try {
        (s = r.replace) === null || s === void 0 || s.call(r, t.replace);
      } catch {
      }
    if (t.replaceSync)
      try {
        (a = r.replaceSync) === null || a === void 0 || a.call(r, t.replaceSync);
      } catch {
      }
  }
  applyStyleDeclaration(t, r) {
    t.set && ke(r.rules, t.index).style.setProperty(t.set.property, t.set.value, t.set.priority), t.remove && ke(r.rules, t.index).style.removeProperty(t.remove.property);
  }
  applyAdoptedStyleSheet(t) {
    var r;
    const i = this.mirror.getNode(t.id);
    if (!i)
      return;
    (r = t.styles) === null || r === void 0 || r.forEach((o) => {
      var l;
      let c = null, u = null;
      if (Ie(i) ? u = ((l = i.ownerDocument) === null || l === void 0 ? void 0 : l.defaultView) || null : i.nodeName === "#document" && (u = i.defaultView), !!u)
        try {
          c = new u.CSSStyleSheet(), this.styleMirror.add(c, o.styleId), this.applyStyleSheetRule({
            source: A.StyleSheetRule,
            adds: o.rules
          }, c);
        } catch {
        }
    });
    const n = 10;
    let s = 0;
    const a = (o, l) => {
      const c = l.map((u) => this.styleMirror.getStyle(u)).filter((u) => u !== null);
      Ie(o) ? o.shadowRoot.adoptedStyleSheets = c : o.nodeName === "#document" && (o.adoptedStyleSheets = c), c.length !== l.length && s < n && (setTimeout(() => a(o, l), 0 + 100 * s), s++);
    };
    a(i, t.styleIds);
  }
  legacy_resolveMissingNode(t, r, i, n) {
    const { previousId: s, nextId: a } = n, o = s && t[s], l = a && t[a];
    if (o) {
      const { node: c, mutation: u } = o;
      r.insertBefore(c, i), delete t[u.node.id], delete this.legacy_missingNodeRetryMap[u.node.id], (u.previousId || u.nextId) && this.legacy_resolveMissingNode(t, r, c, u);
    }
    if (l) {
      const { node: c, mutation: u } = l;
      r.insertBefore(c, i.nextSibling), delete t[u.node.id], delete this.legacy_missingNodeRetryMap[u.node.id], (u.previousId || u.nextId) && this.legacy_resolveMissingNode(t, r, c, u);
    }
  }
  moveAndHover(t, r, i, n, s) {
    const a = this.mirror.getNode(i);
    if (!a)
      return this.debugNodeNotFound(s, i);
    const o = ur(a, this.iframe), l = t * o.absoluteScale + o.x, c = r * o.absoluteScale + o.y;
    this.mouse.style.left = `${l}px`, this.mouse.style.top = `${c}px`, n || this.drawMouseTail({ x: l, y: c }), this.hoverElements(a);
  }
  drawMouseTail(t) {
    if (!this.mouseTail)
      return;
    const { lineCap: r, lineWidth: i, strokeStyle: n, duration: s } = this.config.mouseTail === !0 ? ot : Object.assign({}, ot, this.config.mouseTail), a = () => {
      if (!this.mouseTail)
        return;
      const o = this.mouseTail.getContext("2d");
      !o || !this.tailPositions.length || (o.clearRect(0, 0, this.mouseTail.width, this.mouseTail.height), o.beginPath(), o.lineWidth = i, o.lineCap = r, o.strokeStyle = n, o.moveTo(this.tailPositions[0].x, this.tailPositions[0].y), this.tailPositions.forEach((l) => o.lineTo(l.x, l.y)), o.stroke());
    };
    this.tailPositions.push(t), a(), setTimeout(() => {
      this.tailPositions = this.tailPositions.filter((o) => o !== t), a();
    }, s / this.speedService.state.context.timer.speed);
  }
  hoverElements(t) {
    var r;
    (r = this.lastHoveredRootNode || this.iframe.contentDocument) === null || r === void 0 || r.querySelectorAll(".\\:hover").forEach((n) => {
      n.classList.remove(":hover");
    }), this.lastHoveredRootNode = t.getRootNode();
    let i = t;
    for (; i; )
      i.classList && i.classList.add(":hover"), i = i.parentElement;
  }
  isUserInteraction(t) {
    return t.type !== E.IncrementalSnapshot ? !1 : t.data.source > A.Mutation && t.data.source <= A.Input;
  }
  backToNormal() {
    this.nextUserInteractionEvent = null, !this.speedService.state.matches("normal") && (this.speedService.send({ type: "BACK_TO_NORMAL" }), this.emitter.emit(F.SkipEnd, {
      speed: this.speedService.state.context.normalSpeed
    }));
  }
  warnNodeNotFound(t, r) {
    this.warn(`Node with id '${r}' not found. `, t);
  }
  warnCanvasMutationFailed(t, r) {
    this.warn("Has error on canvas update", r, "canvas mutation:", t);
  }
  debugNodeNotFound(t, r) {
    this.debug(`Node with id '${r}' not found. `, t);
  }
  warn(...t) {
    this.config.showWarning && this.config.logger.warn(Kt, ...t);
  }
  debug(...t) {
    this.config.showDebug && this.config.logger.log(Kt, ...t);
  }
}
let ft = [];
function Hn() {
  return Pe({
    emit(t) {
      console.log("event: ", t), ft.push(t);
    }
  });
}
function Yn(e) {
  const t = new Zn(e);
  return t.play(), t;
}
function qn() {
  const e = document.createElement("button");
  e.innerText = "录制屏幕";
  let t;
  function r() {
    t = Hn();
  }
  e.addEventListener("click", r);
  const i = document.createElement("button");
  i.innerText = "结束";
  function n() {
    t(), localStorage.setItem("__rrweb__", JSON.stringify(ft)), ft = [];
  }
  i.addEventListener("click", n);
  const s = document.createElement("div");
  return s.appendChild(e), s.appendChild(i), s.style.position = "fixed", s.style.right = "0", s.style.bottom = "0", s;
}
function $n() {
  const e = document.createElement("link");
  e.setAttribute("href", "https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"), e.setAttribute("rel", "stylesheet");
  const t = document.createElement("button");
  t.innerText = "播放";
  function r() {
    const n = JSON.parse(localStorage.getItem("__rrweb__") || "[]");
    Yn(n);
  }
  t.addEventListener("click", r);
  const i = document.createElement("div");
  return i.appendChild(t), document.head.appendChild(e), i.style.position = "fixed", i.style.right = "0", i.style.bottom = "0", i;
}
function es() {
}
export {
  qn as getDefaultUI,
  $n as getPlayUI,
  es as initTester,
  Hn as record,
  Yn as replay
};
