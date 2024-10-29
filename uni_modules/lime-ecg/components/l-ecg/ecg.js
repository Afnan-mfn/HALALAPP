function t(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function i(t,i){for(var e=0;i.length>e;e++){var r=i[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function e(t,e,r){return e&&i(t.prototype,e),r&&i(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(t,i){return function(t){if(Array.isArray(t))return t}(t)||function(t,i){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==e)return;var r,n,s=[],o=!0,a=!1;try{for(e=e.call(t);!(o=(r=e.next()).done)&&(s.push(r.value),!i||s.length!==i);o=!0);}catch(t){a=!0,n=t}finally{try{o||null==e.return||e.return()}finally{if(a)throw n}}return s}(t,i)||s(t,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||s(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,i){if(t){if("string"==typeof t)return o(t,i);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?o(t,i):void 0}}function o(t,i){(null==i||i>t.length)&&(i=t.length);for(var e=0,r=Array(i);i>e;e++)r[e]=t[e];return r}var a=function(){function i(e,r){t(this,i),this.canvas=void 0,this.options=void 0,this.queue=[],this.lastX=0,this.lastY=0,this.padding=[1,.5],this.currentY=0,this.currentX=0,this.timeId=void 0,this.pointsLast=[],this.drawInterval=20,this.width=0,this.height=0,this.canvas=e,this.options=r,this.drawInterval=Math.floor(1/r.frameSize*1e3*r.step),this.width=Math.floor(e.width/r.gridSize)*r.gridSize,this.height=Math.floor(e.height/r.gridSize/10)*r.gridSize*10}return e(i,[{key:"draw",value:function(){var t=this.canvas.offscreen,i=this.height,e=this.width,n=this.options,s=n.lineColor,o=n.yOffset,a=n.clearGap,h=n.step,l=n.yMax,u=n.gridSize,c=n.speedRatio,d=n.frameSize,v=n.waveHeight,f=r(this.padding,1)[0],p=(i-v)/2;t.beginPath(),t.strokeStyle=s,t.clearRect(0===this.lastX?f-2:f+this.lastX,o,a,i);for(var y=0;h>y;y++)this.currentY=0===this.queue.length?v/2:-1*this.queue.shift()/l*v+v,this.currentY>v&&(this.currentY=v),this.pointsLast[1]&&0!==this.lastX?(t.moveTo(f+this.pointsLast[1].x,o+this.pointsLast[1].y+p),t.lineTo(f+this.lastX,o+this.lastY+p)):t.moveTo(f+this.lastX,o+this.lastY+p),t.lineTo(f+this.currentX,o+this.currentY+p),this.lastX=this.currentX,this.lastY=this.currentY,this.currentX+=25*u*c/d,e-f>f+this.currentX||(this.currentX=0,this.lastX=0),this.pointsLast.push({x:this.lastX,y:this.lastY}),this.pointsLast.length>3&&this.pointsLast.shift();t.stroke(),t.draw&&t.draw(!0)}},{key:"addData",value:function(t){var i;(i=this.queue).push.apply(i,n(t))}}]),i}(),h=function(){function i(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,i),this.canvas=void 0,this.options={bgColor:"",ampTime:"",textColor:"",lineColor:[],gridSize:5,gridLength:[]},this.wave=void 0,this.timeId=void 0,this.isPlay=!1,this.waveOptions={lineColor:"red",frameSize:250,speedRatio:1,clearGap:20,step:10,yMax:0,yOffset:0,waveHeight:100},this.canvas=e,Object.assign(this.options,r),Object.assign(this.waveOptions,{yMax:e.height,gridSize:r.gridSize},this.options.wave),this.init()}return e(i,[{key:"init",value:function(){this.drawBG(),this.setWave()}},{key:"_draw",value:function(){var t=this.canvas.context;t.draw&&t.draw()}},{key:"drawBG",value:function(){this.options.bgColor&&this.drawBackground(),this.options.lineColor.length&&(this.drawMd(),this.drawLg()),this.options.ampTime&&this.drawTxt(),this._draw()}},{key:"drawBackground",value:function(){var t=this.canvas,i=t.context,e=t.width,r=t.height;i.fillStyle=this.options.bgColor,i.fillRect(0,0,e,r),this._draw()}},{key:"drawMd",value:function(){var t=this.canvas,i=t.context,e=t.width,n=t.height,s=r(this.options.lineColor,1),o=this.options.gridSize;i.strokeStyle=s[0],i.strokeWidth=1,i.beginPath();for(var a=.5;e>a;a+=o)i.moveTo(a,0),i.lineTo(a,n),i.stroke();for(var h=.5;n>h;h+=o)i.moveTo(0,h),i.lineTo(e,h),i.stroke();i.closePath()}},{key:"drawLg",value:function(){var t=this.canvas,i=t.context,e=t.width,n=t.height,s=r(this.options.lineColor,2),o=this.options.gridSize;i.strokeStyle=s[1],i.strokeWidth=1,i.beginPath();for(var a=5*o,h=e+.5,l=n+.5,u=0,c=0,d=.5;h>d;d+=a)i.moveTo(d,0),i.lineTo(d,l),i.stroke(),c=d;for(var v=.5;l>v;v+=a)i.moveTo(0,v),i.lineTo(h,v),i.stroke(),u=v;i.moveTo(c+a,0),i.lineTo(c+a,u+a),i.lineTo(0,u+a),i.stroke(),i.closePath()}},{key:"drawTxt",value:function(){var t=this.canvas,i=t.context,e=t.height,r=this.options.textColor;i.font="10px Arial",i.fontWeight="300",i.fillStyle=r,i.fillText(this.options.ampTime,10,e-10)}},{key:"update",value:function(t){this.wave?this.wave.addData(t):console.warn("wave no init")}},{key:"pause",value:function(){clearTimeout(this.timeId),this.isPlay=!1}},{key:"step",value:function(){this.wave&&this.wave.queue.length?(this.isPlay=!0,this.wave.draw(),this.timeId=setTimeout(this.step.bind(this),this.wave.drawInterval)):this.pause()}},{key:"resume",value:function(){this.isPlay||this.step()}},{key:"setWave",value:function(){this.wave||(this.wave=new a(this.canvas,this.waveOptions))}}]),i}();export{h as Ecg,a as Wave};