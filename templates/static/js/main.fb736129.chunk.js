(this["webpackJsonptor-gate-ui"]=this["webpackJsonptor-gate-ui"]||[]).push([[0],{25:function(e,t,n){e.exports={component:"MessageList_component__T1NsJ",empty:"MessageList_empty__3_q-z"}},41:function(e,t,n){e.exports={component:"UserHeader_component__20QYx",pulse:"UserHeader_pulse__22NGg"}},42:function(e,t,n){e.exports={component:"RoomHeader_component__2p9iP"}},43:function(e,t,n){e.exports={component:"WelcomeScreen_component__3yqm3",pulse:"WelcomeScreen_pulse__1-ohf"}},44:function(e,t,n){e.exports={component:"ChatList_component__2VSoj"}},45:function(e,t,n){e.exports={component:"CreateMessageForm_component__35sSt"}},46:function(e,t,n){e.exports={component:"Message_component__3zNqu",online:"Message_online__X-RT1"}},48:function(e,t,n){e.exports={component:"AddContactForm_component__dAtTw"}},84:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var o=n(1),s=n.n(o),c=n(39),i=n.n(c),r=n(20),a=n(10),u=n(7),m=n(16),d=n(17),j=n(19),l=n(18),b=n(40),p=n.n(b),O=(n(84),n(41)),h=n.n(O),f=n(0),x=function(e){var t=e.onion;e.onClick;return Object(f.jsx)("header",{className:h.a.component,children:Object(f.jsxs)("div",{children:[Object(f.jsx)("h3",{children:"Share to start chat:"}),Object(f.jsx)("h5",{children:t&&"".concat(t)})]})})},S=n(42),g=n.n(S),_=function(e){var t=e.state.current,n=e.actions;n.setSidebar,n.setUserList;return Object(f.jsx)("header",{className:g.a.component,children:t&&Object(f.jsx)("h1",{children:t.username})})},v=n(43),E=n.n(v),R=function(){return Object(f.jsx)("section",{children:Object(f.jsxs)("div",{className:E.a.component,children:[Object(f.jsx)("span",{role:"img","aria-label":"post",children:Object(f.jsx)("svg",{viewBox:"0 0 59 80",children:Object(f.jsxs)("g",{children:[Object(f.jsx)("path",{d:"M48.417 49.444L38.585 73.229 36.012 71.394 41.802 56.726 31.211 59.519C31.211 59.519 26.022 42.42 26.513 30.837 26.218 22.744 27.644 16.96 30.167 13.6 34.274 8.408 42.099 3.953 49.793 7.645 54.701 9.869 57.658 13.889 58.107 17.824 59.479 34.859 38.498 41.817 38.498 41.817L38.085 38.191C38.085 38.191 44.945 35.464 49.105 29.553 53.266 23.643 51.245 15.88 46.569 14.464 42.061 13.577 37.34 18.757 36.516 27.966 34.721 41.776 39.393 52.006 39.393 52.006L48.417 49.444M0 62.396L15.402 74.372 16.522 71.783 8.26 65.71 16.853 63.305C16.853 63.305 10.998 47.535 10.597 32.251 10.229 27.354 9.896 11.684 15.924 8.975 16.976 7.213 18.743 5.903 18.743 5.903 18.743 5.903 3.467 4.584 4.184 32.453 5.706 51.166 9.451 59.821 9.451 59.821L0 62.396"}),Object(f.jsx)("path",{d:"M29.91,61.761 L38.969,59.263 L30.045,80 L11.998,66.538 L19.098,64.644 C19.098,64.644 3.276,20.694 21.128,5.095 C32.325,-3.789 43.164,3.999 42.965,4.872 C40.203,4.812 37.842,5.844 37.842,5.844 C37.842,5.844 31.789,3.265 27.475,12.503 C23.719,20.705 22.048,34.474 29.91,61.761"}),Object(f.jsx)("path",{d:"M41.806,17.606 C42.599,24.356 38.244,27.206 38.244,27.206 L37.819,30.659 C37.819,30.659 47.709,25.549 45.669,15.819 C44.566,15.913 42.212,17.242 41.806,17.606"})]})})}),Object(f.jsxs)("p",{children:["Security communication is easy",Object(f.jsx)("br",{}),"fetch messages using Tor."]})]})})},y=n(44),U=n.n(y),M=function(e){e.user;var t=e.contacts,n=void 0===t?[]:t,o=(e.messages,e.current),s=e.actions;return Object(f.jsx)("ul",{className:U.a.component,children:n.map((function(e){return Object(f.jsx)("li",{disabled:e.onion===o.onion,onClick:function(t){return s.setContact(e)},children:Object(f.jsx)("col-",{children:Object(f.jsx)("p",{children:e.username})})},e.onion)}))})},C=n(45),N=n.n(C),T=function(e){var t=e.state,n=t.socket,o=t.current,s=e.actions,c=(s.getUserMessages,s.sendMessage);return Object(f.jsxs)("form",{className:N.a.component,onSubmit:function(e){e.preventDefault();var t=e.target[0].value.trim();0!==t.length&&(e.target[0].value="",c(n,o.onion,t))},children:[Object(f.jsx)("input",{placeholder:"Type a Message.."}),Object(f.jsx)("button",{type:"submit",children:Object(f.jsx)("svg",{children:Object(f.jsx)("use",{xlinkHref:"index.svg#send"})})})]})},G=n(25),I=n.n(G),A=n(46),k=n.n(A),w=n(47),L=n.n(w),D=function(e){Object(j.a)(n,e);var t=Object(l.a)(n);function n(){return Object(m.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){var e=this.props.contact,t=this.props.message;return this.props.message&&Object(f.jsx)("li",{className:k.a.component,children:Object(f.jsxs)("div",{children:[Object(f.jsxs)("span",{children:[" ",Object(f.jsx)("b",{children:0===t.direction?e.username:"Me"})," "]}),Object(f.jsx)("span",{children:t.timestamp}),Object(f.jsx)("p",{children:Object(f.jsx)(L.a,{properties:{target:"_blank"},children:t.message})})]})},t.timestamp)}}]),n}(s.a.Component),F=Object(f.jsxs)("div",{className:I.a.empty,children:[Object(f.jsx)("span",{role:"img","aria-label":"post",children:"\ud83d\udcdd"}),Object(f.jsx)("h2",{children:"No Messages Yet"}),Object(f.jsx)("p",{children:"Be the first to post in this room or invite someone to join the room"})]}),W=function(e){var t=e.messages,n=e.contact;return Object(f.jsx)("ul",{id:"messages",className:I.a.component,children:t?Object(f.jsx)("wrapper-",{children:t&&t.reverse().map((function(e){return Object(f.jsx)(D,{message:e,contact:n})}))}):F})},q=Object.freeze({ADD_USER:"ADD_USER",GET_USERS:"GET_USERS",GET_USER_MESSAGES:"GET_USER_MESSAGES",NEW_USER_MESSAGE:"NEW_USER_MESSAGE",SEND_USER_MESSAGE:"SEND_USER_MESSAGE"}),H=n(48),z=n.n(H),B=function(e){var t=e.submit;return Object(f.jsxs)("form",{className:z.a.component,onSubmit:function(e){e.preventDefault(),t({onion:e.target[0].value}),e.target[0].value=""},children:[Object(f.jsx)("input",{placeholder:"Add contact..",type:"text",required:!0}),Object(f.jsx)("button",{type:"submit",children:Object(f.jsx)("svg",{children:Object(f.jsx)("use",{xlinkHref:"index.svg#add"})})})]})},J=function(e){Object(j.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(m.a)(this,n);for(var o=arguments.length,s=new Array(o),c=0;c<o;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={myOnion:"",messages:{}},e.actions={setUser:function(t){return e.setState({user:t})},setContact:function(t){e.setState({current:t}),e.actions.scrollToEnd()},joinRoom:function(t){e.actions.setRoom(t),e.actions.subscribeToRoom(t),e.state.messages[t.id]&&e.actions.setCursor(t.id,Object.keys(e.state.messages[t.id]).pop())},subscribeToRoom:function(t){return!e.state.myOnion.roomSubscriptions[t.id]&&e.state.myOnion.subscribeToRoom({roomId:t.id,hooks:{onMessage:e.actions.addMessage}})},createRoom:function(t){return e.state.myOnion.createRoom(t).then(e.actions.joinRoom)},createConvo:function(t){if(t.user.id!==e.state.myOnion.id){var n=e.state.myOnion.rooms.find((function(n){return n.name===t.user.id+e.state.myOnion.id||n.name===e.state.myOnion.id+t.user.id}));n?e.actions.joinRoom(n):e.actions.createRoom({name:e.state.myOnion.id+t.user.id,addUserIds:[t.user.id],private:!0})}},addUserToRoom:function(t){var n=t.userId,o=t.roomId,s=void 0===o?e.state.room.id:o;return e.state.myOnion.addUserToRoom({userId:n,roomId:s}).then(e.actions.setRoom)},removeUserFromRoom:function(t){var n=t.userId,o=t.roomId,s=void 0===o?e.state.room.id:o;return n===e.state.myOnion.id?e.state.myOnion.leaveRoom({roomId:s}):e.state.myOnion.removeUserFromRoom({userId:n,roomId:s}).then(e.actions.setRoom)},setCursor:function(t,n){return e.state.myOnion.setReadCursor({roomId:t,position:parseInt(n)}).then((function(t){return e.forceUpdate()}))},addMessage:function(t){var n=t.room.id,o=t.id;(e.setState((function(e){return{messages:Object(u.a)(Object(u.a)({},e.messages),{},Object(a.a)({},n,Object(u.a)(Object(u.a)({},e.messages[n]),{},Object(a.a)({},o,t))))}})),n===e.state.room.id)&&(((e.state.myOnion.readCursor({roomId:n})||{}).position||0)<o&&e.actions.setCursor(n,o),e.actions.scrollToEnd());e.actions.showNotification(t)},runCommand:function(t){var n={invite:function(t){var n=Object(r.a)(t,1)[0];return e.actions.addUserToRoom({userId:n})},remove:function(t){var n=Object(r.a)(t,1)[0];return e.actions.removeUserFromRoom({userId:n})},leave:function(t){Object(r.a)(t,1)[0];return e.actions.removeUserFromRoom({userId:e.state.myOnion.id})}},o=t.split(" ")[0],s=t.split(" ").slice(1),c=n[o];c&&c(s).catch(console.log)},scrollToEnd:function(e){return setTimeout((function(){var e=document.querySelector("#messages");e&&(e.scrollTop=1e5)}),0)},showNotification:function(t){"Notification"in window&&e.state.myOnion.id&&e.state.myOnion.id!==t.senderId&&"hidden"===document.visibilityState&&new Notification("New Message from ".concat(t.sender.id),{body:t.text,icon:t.sender.avatarURL}).addEventListener("click",(function(n){e.actions.joinRoom(t.room),window.focus()}))},addUser:function(e,t){e.emit(q.ADD_USER,t)},getUsers:function(e){e.emit(q.GET_USERS,{})},getUserMessages:function(e,t){t&&e.emit(q.GET_USER_MESSAGES,{onion:t})},sendMessage:function(e,t,n){e.emit(q.SEND_USER_MESSAGE,{onion:t,message:n})}},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this,t=p()("http://127.0.0.1:5000");this.setState({socket:t}),t.on(q.ADD_USER,(function(e){console.log("add user")})),t.on(q.GET_USERS,(function(t){var n=t;e.setState({myOnion:n.onion,contacts:n.contacts})})),t.on(q.GET_USER_MESSAGES,(function(t){var n=t,o=n.onion,s=n.messages;e.setState((function(e){return{messages:Object(u.a)(Object(u.a)({},e.messages),{},Object(a.a)({},o,s))}}))})),t.on(q.NEW_USER_MESSAGE,(function(e){console.log("new message")})),t.on(q.SEND_USER_MESSAGE,(function(e){console.log("send message")})),this.timer=setInterval((function(){e.actions.getUsers(t),e.state.current&&e.actions.getUserMessages(t,e.state.current.onion)}),1e3)}},{key:"componentWillUnmount",value:function(){this.timer=null}},{key:"render",value:function(){var e=this,t=this.state,n=t.myOnion,o=t.current,s=t.contacts,c=t.messages,i=t.socket,r=this.actions.addUser;return Object(f.jsxs)("main",{children:[Object(f.jsxs)("aside",{"data-open":!0,children:[Object(f.jsx)(x,{onion:n,onClick:function(){return e.setState({addContactModalShow:!0})}}),Object(f.jsx)(M,{user:n,contacts:s,messages:o&&c[o.onion],current:o||{},actions:this.actions}),Object(f.jsx)(B,{submit:function(e){r(i,e)}})]}),Object(f.jsxs)("section",{children:[Object(f.jsx)(_,{state:this.state,actions:this.actions}),o?Object(f.jsx)("row-",{children:Object(f.jsxs)("col-",{children:[Object(f.jsx)(W,{contact:o,messages:o&&c[o.onion]}),Object(f.jsx)(T,{state:this.state,actions:this.actions})]})}):Object(f.jsx)(R,{})]})]})}}]),n}(s.a.Component),Y=J;function P(){return Object(f.jsx)(Y,{})}i.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(P,{})}),document.getElementById("root"))}},[[98,1,2]]]);
//# sourceMappingURL=main.fb736129.chunk.js.map