var honeycomb = document.querySelector("#honeycomb"),
mousetrail = document.querySelector("#mousetrail");

honeycomb.width = window.innerWidth;
honeycomb.height = window.innerHeight;
mousetrail.width = window.innerWidth;
mousetrail.height = window.innerHeight;

var cxh = honeycomb.getContext("2d"),
cxm = mousetrail.getContext("2d"),
w = honeycomb.width,
h = honeycomb.height,
yd = 16,
xd = 2*yd*Math.sin(Math.PI/3),
numHexW = Math.ceil(w/(2*xd))+1,
numHexH = Math.ceil(h/(3*yd))+1,
mx,
my;

cxh.strokeStyle = "#FFE1B9";
cxh.lineWidth = 1;

function create() {
	var yBase;
	cxh.beginPath();

	for(var i = 0; i < numHexH; i++) {
		yBase = (i*3+2)*yd - i%2*yd;
		cxh.moveTo(0,yBase);
		for(var j = 1; j <= numHexW; j++) {
			if(i%2){
				cxh.lineTo((2*j-1)*xd,yBase+yd);
				cxh.lineTo(2*j*xd,yBase);
				cxh.moveTo(2*j*xd,yBase-2*yd);
				cxh.lineTo(2*j*xd,yBase);
			} else {
				cxh.lineTo((2*j-1)*xd,yBase-yd);
				cxh.lineTo((2*j-1)*xd,yBase-3*yd);
				cxh.moveTo((2*j-1)*xd,yBase-yd);
				cxh.lineTo(2*j*xd,yBase);
			}
		}
	}
	cxh.stroke();
	cxh.closePath();
}
create();

cxm.strokeStyle = "#FF9900";
cxm.lineWidth = 1;
cxm.fillStyle = "#FFE0B2";

function makeHoney(mx, my) {
	cxm.clearRect(0,0,w,h);

	var hexCx, hexCy,
	xl = mx%xd,
	xr = xd-mx%xd,
	yu = my%(3*yd),
	yb = 3*yd-my%(3*yd),
	hlu = Math.sqrt(Math.pow(xl,2)+Math.pow(yu,2)),
	hlb = Math.sqrt(Math.pow(xl,2)+Math.pow(yb,2)),
	hru = Math.sqrt(Math.pow(xr,2)+Math.pow(yu,2)),
	hrb = Math.sqrt(Math.pow(xr,2)+Math.pow(yb,2));

	if(	(mx % (2*xd) < xd && my % (6*yd) < 3*yd) ||
		(mx % (2*xd) > xd && my % (6*yd) >= 3*yd) ){
		if(hlu<hrb){
			hexCx = mx-xl;
			hexCy = my-yu;
		} else {
			hexCx = mx+xr;
			hexCy = my+yb;
		}
	} else {
		if(hlb<hru){
			hexCx = mx-xl;
			hexCy = my+yb;
		} else {
			hexCx = mx+xr;
			hexCy = my-yu;
		}
	}
	cxm.moveTo(hexCx-xd, hexCy-yd);
	cxm.beginPath();
	cxm.lineTo(hexCx, hexCy-2*yd);
	cxm.lineTo(hexCx+xd, hexCy-yd);
	cxm.lineTo(hexCx+xd, hexCy+yd);
	cxm.lineTo(hexCx, hexCy+2*yd);
	cxm.lineTo(hexCx-xd, hexCy+yd);
	cxm.lineTo(hexCx-xd, hexCy-yd);
	cxm.closePath();
	cxm.fill();
	cxm.stroke();
}

function init(e){
	mx = e.clientX;
	my = e.clientY;
	makeHoney(mx, my);
}

mousetrail.addEventListener("mousemove", init, false);

window.addEventListener("resize", function(){
  honeycomb.width = window.innerWidth;
  honeycomb.height = window.innerHeight;
  mousetrail.width = window.innerWidth;
  mousetrail.height = window.innerHeight;
  w = honeycomb.width;
  h = honeycomb.height;
  numHexW = Math.ceil(w/(2*xd))+1;
  numHexH = Math.ceil(h/(3*yd))+1;
  cxh = honeycomb.getContext("2d");
  cxm = mousetrail.getContext("2d");
  cxh.strokeStyle = "#FFE1B9";
  cxh.lineWidth = 1;
  create();
  cxm.strokeStyle = "#FF9900";
  cxm.lineWidth = 1;
  cxm.fillStyle = "#FFE0B2";
});