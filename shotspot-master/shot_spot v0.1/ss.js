//alert("REFRESH To See New Content!");

function showbar(){
	var x =document.getElementById('bar-list');
	if(x.style.display === 'none'){
		x.style.display = 'block';
	}else{
		x.style.display = 'none';
	}
}

/*var options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌓', // default: ''
  autoMatchOsTheme: true // default: true
}
const darkmode = new Darkmode(options);
darkmode.showWidget();*/

	var a=document.getElementById('latest');
	var b=document.getElementById('bollywood');
	var c=document.getElementById('hollywood');
	var d=document.getElementById('netflix');
	var e=document.getElementById('prime');
function slatest(){
	if(a.style.display === 'none'){
		a.style.display = 'block';
		b.style.display = 'none';
		c.style.display = 'none';
		d.style.display = 'none';
		e.style.display = 'none';
	}
}
function sbollywood(){
	if(b.style.display === 'none'){
		a.style.display = 'none';
		b.style.display = 'block';
		c.style.display = 'none';
		d.style.display = 'none';
		e.style.display = 'none';
	}else{
		a.style.display = 'block';
		b.style.display = 'none';
	}
}
function shollywood(){
	if(c.style.display === 'none'){
		a.style.display = 'none';
		b.style.display = 'none';
		c.style.display = 'block';
		d.style.display = 'none';
		e.style.display = 'none';
	}else{
		a.style.display = 'block';
		c.style.display = 'none';
	}
}
function snetflix(){
	if(d.style.display === 'none'){
		a.style.display = 'none';
		b.style.display = 'none';
		c.style.display = 'none';
		d.style.display = 'block';
		e.style.display = 'none';
	}else{
		a.style.display = 'block';
		d.style.display = 'none';
	}
}
function sprime(){
	if(e.style.display === 'none'){
		a.style.display = 'none';
		b.style.display = 'none';
		c.style.display = 'none';
		d.style.display = 'none';
		e.style.display = 'block';
	}else{
		a.style.display = 'block';
		e.style.display = 'none';
	}
}

function showall(num){
	var img  = document.getElementById('img'+num);
	var list = document.getElementById('sd'+num);
	img.style.filter="grayscale(40%) blur(10px)";
	list.style.display='block';
}
function hideall(num){
	var img  = document.getElementById('img'+num);
	var list = document.getElementById('sd'+num);
	img.style.filter="grayscale(0%) blur(0px)";
	list.style.display='none';
}

function showfull(num){
	var img  = document.getElementById('image'+num);
	var list = document.getElementById('md'+num);
	img.style.filter="grayscale(40%) blur(10px)";
	list.style.display='block';
}
function hidefull(num){
	var img  = document.getElementById('image'+num);
	var list = document.getElementById('md'+num);
	img.style.filter="grayscale(0%) blur(0px)";
	list.style.display='none';
}

var image1 = 'https://www.pinkvilla.com/files/panga-new-poster-kangana-ranaut-jassie-gill-neena-gupta-paint-a-happy-picture-as-a-family-check-it-out.jpg';

var name1 = 'movie_name'

function addElement(start,last){

	for (var num;num >= last; num++) {
		const element = document.createElement('div');
		const image = document.createElement('img');
		element.class = 'movie' ;
		element.id = 'movie'+[num] ;
		element = document.createtextnode('<h3>'+name[num]);
		image.src = image+[num] ;
		image.id = 'image'+[num];
	}

}