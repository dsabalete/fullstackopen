(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){"use strict";n.r(e);var c=n(2),o=n(15),r=n.n(o),i=n(6),a=n(3),u=n(4),s=n.n(u),j="/api/notes",l=n(0),b=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(l.jsxs)("li",{className:"note",children:[e.content,Object(l.jsx)("button",{onClick:n,children:c})]})},f=function(t){var e=t.message;return null===e?null:Object(l.jsx)("div",{className:"error",children:e})},d=function(){return Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2020"})]})},m=function(){var t=Object(c.useState)([]),e=Object(a.a)(t,2),n=e[0],o=e[1],r=Object(c.useState)("a new note..."),u=Object(a.a)(r,2),m=u[0],O=u[1],p=Object(c.useState)(!0),h=Object(a.a)(p,2),v=h[0],x=h[1],g=Object(c.useState)(null),S=Object(a.a)(g,2),k=S[0],w=S[1];Object(c.useEffect)((function(){s.a.get(j).then((function(t){return t.data})).then((function(t){o(t)}))}),[]);var y=function(t){var e=n.find((function(e){return e.id===t})),c=Object(i.a)(Object(i.a)({},e),{},{important:!e.important});(function(t,e){return s.a.put("".concat(j,"/").concat(t),e)})(t,c).then((function(){o(n.map((function(e){return e.id!==t?e:c})))})).catch((function(c){console.log(c),w("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){w(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))},N=v?n:n.filter((function(t){return t.important}));return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Notes"}),Object(l.jsx)(f,{message:k}),Object(l.jsx)("div",{children:Object(l.jsxs)("button",{onClick:function(){return x(!v)},children:["show ",v?"important":"all"]})}),Object(l.jsx)("ul",{children:N.map((function(t,e){return Object(l.jsx)(b,{note:t,toggleImportance:function(){return y(t.id)}},e)}))}),Object(l.jsxs)("form",{onSubmit:function(t){t.preventDefault();var e,c={content:m,date:(new Date).toISOString(),important:Math.random()<.5};(e=c,s.a.post(j,e).then((function(t){return t.data}))).then((function(t){o(n.concat(t)),O("")}))},children:[Object(l.jsx)("input",{value:m,onChange:function(t){O(t.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"save"})]}),Object(l.jsx)(d,{})]})};n(39);r.a.render(Object(l.jsx)(m,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.e5461163.chunk.js.map