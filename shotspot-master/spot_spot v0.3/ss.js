var head = document.querySelector('head');
function headfn(){
	let title = document.createElement('title');
	head.appendChild(title);
	title.appendChild(document.createTextNode('Shotspot'));
	title.title = 'http://notes4u0001.gq/shotspot.html';
}headfn();	
var body = document.querySelector('body');
var main = document.createElement('main');body.appendChild(main);
var headingh1 = document.createElement('h1');
function mainfn(){
	var heading = document.createElement('div');
	main.appendChild(heading);
	heading.id = 'heading';
	heading.appendChild(document.createElement('p')).appendChild(document.createTextNode(updated));
	heading.appendChild(headingh1).appendChild(document.createTextNode('latest'));
	searchfn();tags();movies();series();
}mainfn();	
function movies(){
	for (var num = 0 ; num < mname.length ; num++) {
		let div = document.createElement('div');
		main.appendChild(div);
		div.className += mname[num].charAt(0)+ " movie "+tagmovies[num];
		div.id = 'movie'+num;
		div.title = mname[num];

		let img = document.createElement('img');	
		div.appendChild(img);
		img.id = 'image'+num;
		img.src = mimg[num];
		img.style = 'filter : grayscale(0%) blur(0px);';
		img.alt = 'Image Not Available';

		let divin = document.createElement('div');
		div.appendChild(divin);
		divin.className += "md"; 
		divin.id= 'md'+num;

		let h3 = document.createElement('h3');		
		divin.appendChild(h3);
		h3.appendChild(document.createTextNode(mname[num]));

		let link = document.createElement('a');		
		divin.appendChild(link);
		link.href = mlink[num];
		link.target = '_blank';
		link.appendChild(document.createTextNode('Download'));
		link.title = 'Download '+mname[num];
	}
}
function series(){	
	let divsearch1 = document.createElement('div');
	main.appendChild(divsearch1);
	divsearch1.className += 'searchdivs';
	divsearch1.id = 'divsearch1';
	divsearch1.style.display = 'none';

	let h12 = document.createElement('h1');		
	divsearch1.appendChild(h12);
	h12.id = 'resulthead2';

	var linkcounter=0;
	for (var num = 0 ; num < sname.length ; num++ ){
		let div = document.createElement('div');
		main.appendChild(div);
		div.className += sname[num].charAt(0)+" series webseries "+tagseries[num]; 
		div.id = 'series'+num;
		div.title = sname[num];
		div.style.display = 'none';

		let img = document.createElement('img');	
		div.appendChild(img);
		img.id = 'img'+num;
		img.src = simg[num];
		img.alt = 'Imae Not Available';

		let divin = document.createElement('div');
		div.appendChild(divin);
		divin.className += "sd"; 
		divin.id= 'sd'+num;

		divin.appendChild(document.createElement('h3')).appendChild(document.createTextNode(sname[num]));

		let ul = document.createElement('ul');		
		divin.appendChild(ul);

		for (var num1 = 0 ; num1 < sepi[num] ; num1++){
			let li = document.createElement('li');		
			ul.appendChild(li);
			let link = document.createElement('a');		
			li.appendChild(link);
			link.href = slink[linkcounter];
			link.target = '_blank';
			linkcounter++;
			if(sepi[num] > 1){
				link.appendChild(document.createTextNode('Episode '+(num1+1)));
				link.title = 'Download '+sname[num]+'-Episode '+(num1+1);
			}else{
				link.appendChild(document.createTextNode('Download All Episodes'));
				link.title = 'Download '+sname[num]+'-All Episodes';
			}
		}
	}		
}
var footer = document.createElement('footer');
body.appendChild(footer);
function footerfn(){
	let div = document.createElement('div');
	footer.appendChild(div);
	div.className += "footer1";
	div.appendChild(document.createElement('h1')).appendChild(document.createTextNode('About Us'));
	div.appendChild(document.createElement('h3')).appendChild(document.createTextNode('EMAIL:shotspot39@gmail.com'));
	div.appendChild(document.createElement('h4')).appendChild(document.createTextNode('JUST FOR ENTERTAINMENT PURPOSE'));
}footerfn();
function showbar(){
	let x =document.getElementById('bar-list');
	if(x.style.display === 'none'){
		x.style.display = 'block';
	}else{
		x.style.display = 'none';
	}
}
function backbtnfn(){
	document.getElementById('backbtnid').style.display = 'none';
	document.getElementById('tags').style.display='block';
	for(var num = 0; num < mname.length ; num++ ){
		document.getElementById('movie'+num).style.display = 'block';
	}searchcounter = 0;
	document.getElementById('divsearch').style.display = 'none';
	document.getElementById('divsearch1').style.display = 'none';
}
function searchfn(){
	let search = document.createElement('div');
	main.appendChild(search);
	search.className += 'search';
	search.id = 'searchid';

	let backbtn = document.createElement('button');
	search.appendChild(backbtn);
	backbtn.className += 'backbtn';
	backbtn.id = 'backbtnid';
	backbtn.appendChild(document.createTextNode("BACK"));
	backbtn.addEventListener ("click",backbtnfn);
	backbtn.style.display = 'none';

	let searchin = document.createElement('div');
	search.appendChild(searchin);
	searchin.className += 'searchin';
	searchin.id = 'searchinid';

	let input = document.createElement('input');
	searchin.appendChild(input);
	input.id = 'search-input';
	input.type = 'text';
	input.placeholder = 'Search....';
	input.name = 'search';

	let button = document.createElement('button');
	searchin.appendChild(button);

	let icon = document.createElement('i')
	button.appendChild(icon);
	icon.className += 'fa fa-search';
	icon.addEventListener ("click",searchfn1);
	icon.addEventListener ("keypress",searchfn1);

	let divsearch = document.createElement('div');
	main.appendChild(divsearch);
	divsearch.className += 'searchdivs';
	divsearch.id = 'divsearch';
	divsearch.style.display = 'none';

	divsearch.appendChild(document.createElement('h1')).id = 'resulthead1';
}
var searchcounter=0;var result = 0;var result1 = 0;
function searchfn1(){
	document.getElementById('backbtnid').style.display = 'block';
	document.getElementById('divsearch').style.display='block';
	document.getElementById('divsearch1').style.display='block';
	document.getElementById('tags').style.display='none';
	document.getElementById('resulthead1').innerHTML = "";
	document.getElementById('resulthead2').innerHTML = "";
	result=0;result1=0;
	for(var num = 0; num <mname.length ; num++ ){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0; num <sname.length ; num++ ){
		document.getElementById('series'+num).style.display = 'none';
	}
	var searchvalue = document.getElementById('search-input').value;
	console.log("Search-Value : "+searchvalue);
	var value1 = searchvalue;var valueall = value1.toLowerCase();var valuef = valueall.charAt(0);
	for(var num = 0; num < mname.length ; num++ ){
		if(document.getElementsByClassName(valueall)[num] !== undefined ){
			document.getElementsByClassName(valueall)[num].style.display = 'block';
			result++;	
		}
	}
	document.getElementById('resulthead1').appendChild(document.createTextNode('MOVIES : '+searchvalue+' (Total Result :'+ result+' )'));
	document.getElementById('resulthead2').appendChild(document.createTextNode('SERIES : '+searchvalue));
	if(result === 0 && result1 === 0 ){
		divsearch.appendChild(document.createElement('h1')).appendChild(document.createTextNode("NO MOVIE FOUND"));
	}
}
function tags(){
	let taglist = ['hollywood','bollywood','punjabi','web Series','action','comedy','thriller','drama','romantic','adventure'];

	let div = document.createElement('div');
	main.appendChild(div);
	div.id = 'tags';
	
	let p1 = document.createElement('p');
	div.appendChild(p1);
	p1.appendChild(document.createTextNode('Tags :-'));

	for(var i = 0 ; i < taglist.length ; i++){
		let a = document.createElement('a');
		div.appendChild(a);
		a.href = '#';
		a.addEventListener ("click",function(){tagfn(this);});
		a.appendChild(document.createTextNode(taglist[i].charAt(0).toUpperCase() + taglist[i].slice(1)));
	}
}
function tagfn(a){
	document.getElementById('backbtnid').style.display = 'block';
	document.getElementById('divsearch').style.display='block';
	document.getElementById('divsearch1').style.display='block';
	document.getElementById('tags').style.display='none';
	document.getElementById('resulthead1').innerHTML = "";
	document.getElementById('resulthead2').innerHTML = "";
	result=0;result1=0;
	for(var num = 0; num <mname.length ; num++ ){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0; num <sname.length ; num++ ){
		document.getElementById('series'+num).style.display = 'none';
	}
	var searchvalue = a.innerHTML;
	console.log("Search-Value : "+searchvalue);
	var value1 = searchvalue;var valueall = value1.toLowerCase();var valuef = valueall.charAt(0);
	for(var num = 0; num < mname.length ; num++ ){
		if(document.getElementsByClassName(valueall)[num] !== undefined ){
			document.getElementsByClassName(valueall)[num].style.display = 'block';
			result++;	
		}
	}
	document.getElementById('resulthead1').appendChild(document.createTextNode('MOVIES : '+searchvalue+' (Total Result :'+ result+' )'));
	document.getElementById('resulthead2').appendChild(document.createTextNode('SERIES : '+searchvalue));
	if(result === 0 && result1 === 0 ){
		divsearch.appendChild(document.createElement('h1')).appendChild(document.createTextNode("NO MOVIE FOUND"));
	}
}
function slatest(){
	headingh1.innerHTML = 'latest';
	document.getElementById('nav1').style.color = 'hotpink'; document.getElementById('nav2').style.color = '#000000'; document.getElementById('nav3').style.color = '#000000'; document.getElementById('nav4').style.color = '#000000';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'block';
	}
}
function sbollywood(){
	headingh1.innerHTML = 'bollywood';
	document.getElementById('nav1').style.color = '#000000'; document.getElementById('nav2').style.color = 'hotpink'; document.getElementById('nav3').style.color = '#000000'; document.getElementById('nav4').style.color = '#000000';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementsByClassName("bollywood")[num].style.display = 'block';
	}
}
function shollywood(){
	headingh1.innerHTML = 'hollywood';
	document.getElementById('nav1').style.color = '#000000'; document.getElementById('nav2').style.color = '#000000'; document.getElementById('nav3').style.color = 'hotpink'; document.getElementById('nav4').style.color = '#000000';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0 ; num < sname.length ; num++){
		document.getElementById('series'+num).style.display = 'none';
	}
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementsByClassName("hollywood")[num].style.display = 'block';
	}
}
function sseries(){
	headingh1.innerHTML = 'web series';
	document.getElementById('nav1').style.color = '#000000'; document.getElementById('nav2').style.color = '#000000'; document.getElementById('nav3').style.color = '#000000'; document.getElementById('nav4').style.color = 'hotpink';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0 ; num < sname.length ; num++){
		document.getElementById('series'+num).style.display = 'block';
	}
}
var options = {
	  bottom: '64px',
	  right: '32px',
	  left: 'unset',
	  time: '1s',
	  mixColor: '#fff',
	  backgroundColor: 'rgb(114,248,252)',
	  buttonColorDark: 'rgb(0,0,0,0)',
	  buttonColorLight: '#fff',
	  saveInCookies: false,
	  label: 'Dark Mode',
	  autoMatchOsTheme: true}
const darkmode = new Darkmode(options);darkmode.showWidget();
document.onkeyup = function(e){
	switch(e.which){
		case 13: searchfn1(); break;
		case 8: backbtnfn(); break;
		case 3: return false; break;
	}
};	
//alert("TO SEE NEW CONTENT CLEAR CACHE\n PC = PRESS->CTRL + SHIFT + R\nMobile = Goto History->Clear browing data");