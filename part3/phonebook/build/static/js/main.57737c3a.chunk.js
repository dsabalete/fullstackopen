(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t(15),r=t.n(a),o=t(6),i=t(3),u=t(4),s=t.n(u),l="/api/persons",h=t(0),d=function(e){var n=e.handle,t=e.filter;return Object(h.jsxs)("div",{children:["filter shown with ",Object(h.jsx)("input",{onChange:n,value:t})]})},b=function(e){var n=e.handleSubmit,t=e.handleChangeName,c=e.handleChangeNumber,a=e.newName,r=e.newNumber;return Object(h.jsxs)("form",{onSubmit:n,children:[Object(h.jsxs)("div",{children:["name: ",Object(h.jsx)("input",{onChange:t,value:a})]}),Object(h.jsxs)("div",{children:["number: ",Object(h.jsx)("input",{onChange:c,value:r})]}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var n=e.person,t=e.handleRemove;return Object(h.jsxs)("div",{children:[n.name," ",n.number," ",Object(h.jsx)("button",{onClick:t,children:"delete"})]},n.name)},f=function(e){var n=e.persons,t=e.filter,c=e.deletePerson;return Object(h.jsx)("div",{children:n.filter((function(e){return!t.length||e.name.toLowerCase().includes(t)})).map((function(e){return Object(h.jsx)(j,{person:e,handleRemove:function(){return c(e)}},e.name)}))})},m=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"message",children:n})},O=function(e){var n=e.message;return null===n?null:Object(h.jsx)("div",{className:"error",children:n})},v=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(""),u=Object(i.a)(r,2),j=u[0],v=u[1],p=Object(c.useState)(""),g=Object(i.a)(p,2),w=g[0],x=g[1],k=Object(c.useState)(""),N=Object(i.a)(k,2),S=N[0],C=N[1],y=Object(c.useState)(null),P=Object(i.a)(y,2),E=P[0],D=P[1],I=Object(c.useState)(null),J=Object(i.a)(I,2),L=J[0],R=J[1];Object(c.useEffect)((function(){s.a.get(l).then((function(e){return e.data})).then((function(e){a(e)})).catch((function(e){B("Error while getting contacts from Phonebook")}))}),[]);var T=function(e){D(e),setTimeout((function(){D(null)}),5e3)},B=function(e){R(e),setTimeout((function(){R(null)}),5e3)};return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"Phonebook"}),Object(h.jsx)(m,{message:E}),Object(h.jsx)(O,{message:L}),Object(h.jsx)(d,{handle:function(e){var n=e.target.value;C(n.toLowerCase())},filter:S}),Object(h.jsx)("h3",{children:"add a new"}),Object(h.jsx)(b,{handleSubmit:function(e){if(e.preventDefault(),j.length){if(t.map((function(e){return e.name})).includes(j)){if(window.confirm("".concat(j," is already added to the phonebook, replace the old number with the new one?"))){var n=t.filter((function(e){return e.name===j}))[0],c=Object(o.a)(Object(o.a)({},n),{},{number:w});(i=c.id,u=c,s.a.put("".concat(l,"/").concat(i),u).then((function(e){return e.data}))).then((function(e){var n=e,r=t.filter((function(e){return e.id!==c.id})).concat(n);a(r),T("".concat(n.name,"'s number has been updated"))})).catch((function(e){B("Information of ".concat(c.name," has already removed from server")),a(t.filter((function(e){return e.id!==c.id})))}))}}else(r={name:j,number:w},s.a.post(l,r).then((function(e){return e.data}))).then((function(e){a(t.concat(e)),T("".concat(e.name," has been added to the phonebook"))})).catch((function(e){B("Something went wrong while creating a new person")}));v(""),x("")}var r,i,u},handleChangeName:function(e){v(e.target.value)},handleChangeNumber:function(e){x(e.target.value)},newName:j,newNumber:w}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)(f,{persons:t,filter:S,deletePerson:function(e){var n;window.confirm("Delete ".concat(e.name,"?"))&&(n=e.id,s.a.delete("".concat(l,"/").concat(n))).then((function(n){if(200===n.status){var c=t.filter((function(n){return n.id!==e.id}));a(c),T("".concat(e.name," has been removed from phonebook"))}})).catch((function(e){B("Something went wrong while removing person in phonebook")}))}})]})};t(39);r.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.57737c3a.chunk.js.map