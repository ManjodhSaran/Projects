var head = document.querySelector('head');
function headfn(){
	let title = document.createElement('title');
	head.appendChild(title);
	title.appendChild(document.createTextNode('Shotspot'));
	title.title = 'http://notes4u0001.gq/ss.html';
}headfn();
var body = document.querySelector('body');
var header = document.createElement('header');body.appendChild(header);
var main = document.createElement('main');body.appendChild(main);
var headingh1 = document.createElement('h1');
var container = document.createElement('div');
var containerseries = document.createElement('div');
function headerfn(){
	let a = document.createElement('a');
	header.appendChild(a);
	a.href = 'shotspot.html';

	let img = document.createElement('img');
	a.appendChild(img);
	img.src = 'img/logo.png';

	let h1 = document.createElement('h1');
	a.appendChild(h1);
	h1.className += 'changecolor';
	h1.appendChild(document.createTextNode('SHOT SPOT'));

	let ul = document.createElement('ul');
	header.appendChild(ul);
	ul.className += 'bar-menu animated bounceInDown';
	ul.id = 'bar-list';

	let nav = ['','LATEST','BOLLYWOOD','HOLLYWOOD','WEB SERIES'];
	for(var num = 1 ; num < 5 ; num++ ){
		let li = document.createElement('li');
		ul.appendChild(li);
		let a1 = document.createElement('a');
		li.appendChild(a1);
		a1.href = '#';
		a1.id = 'nav' + num ;
		if(num === 1){a1.addEventListener("click",slatest);}
		if(num === 2){a1.addEventListener("click",sbollywood);}
		if(num === 3){a1.addEventListener("click",shollywood);}
		if(num === 4){a1.addEventListener("click",sseries);}
		a1.appendChild(document.createTextNode(nav[num]));
	} 

	let li = document.createElement('li');
	ul.appendChild(li);
	li.className += 'downloader';
	let img1 = document.createElement('img')
	li.appendChild(img1);
	img1.src = 'https://i0.wp.com/windowstan.com/wp-content/uploads/2019/02/Internet-Download-Manager-logo-Windowstan.png?fit=200%2C200&ssl=1';
	
	let a1 = document.createElement('a');
	li.appendChild(a1);
	a1.href = 'https://doc-04-28-docs.googleusercontent.com/docs/securesc/ub0h1j9fhu6j2jjr4gl5h4j33fh2i1kk/3pcr2fk5fsi8ov4lmsb0amfpliq48imq/1585817475000/01267896872855643408/01267896872855643408/1kv1h0libhZkI10caYH4feLOnpP48RjDE?e=download&authuser=9';
	a1.target = '_blank';
	a1.appendChild(document.createTextNode('IDM'));

	let i = document.createElement('i');
	header.appendChild(i);
	i.className += 'fa fa-bars bar-icon';
	i.addEventListener("click",showbar);
}headerfn();
function mainfn(){
	var heading = document.createElement('div');
	main.appendChild(heading);
	heading.id = 'heading';
	heading.appendChild(document.createElement('p')).appendChild(document.createTextNode(updated));
	heading.appendChild(headingh1).appendChild(document.createTextNode('latest'));
	searchfn();tags();pages();movies();spages();series();
	main.appendChild(document.createElement('br'));
}mainfn();	
function movies(){
	main.appendChild(container);
	container.id = 'container';
	for (var num = 0 ; num < mname.length ; num++) {
		let div = document.createElement('div');
		container.appendChild(div);
		div.className += mname[num].slice(0,1)+" "+mname[num].slice(0,2)+" "+mname[num].slice(0,3)+" "+mname[num].slice(0,4)+" "+mname[num].slice(0,5)+" "+mname[num].slice(0,6)+" "+mname[num].slice(0,7)+" "+mname[num].slice(0,8)+" movie "+tagmovies[num];
		div.id = 'movie'+num;
		div.title = mname[num];
		div.style.display = 'none';
		div.addEventListener('mouseover',function(){showall(this);});
		div.addEventListener('mouseout',function(){hideall(this);});

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

		let p = document.createElement('p');		
		divin.appendChild(p);
		p.appendChild(document.createTextNode(mname[num]));

		let link = document.createElement('a');		
		divin.appendChild(link);
		link.href = mlink[num];
		link.target = '_blank';
		link.appendChild(document.createTextNode('Download'));
		link.title = 'Download '+mname[num];
	}
	for(var num = 0 ; num < 20 ; num++ ){
		document.getElementById('movie'+num).style.display = 'block';
	}
}
function series(){	
	main.appendChild(containerseries);
	containerseries.id = 'containerseries';
	let divsearch1 = document.createElement('div');
	containerseries.appendChild(divsearch1);
	divsearch1.className += 'searchdivs';
	divsearch1.id = 'divsearch1';
	divsearch1.style.display = 'none';

	let h12 = document.createElement('h1');		
	divsearch1.appendChild(h12);
	h12.id = 'resulthead2';

	var linkcounter=0;
	for (var num = 0 ; num < sname.length ; num++ ){
		let div = document.createElement('div');
		containerseries.appendChild(div);
		div.className += sname[num].slice(0,1)+" "+sname[num].slice(0,2)+" "+sname[num].slice(0,3)+" "+sname[num].slice(0,4)+" "+sname[num].slice(0,5)+" "+sname[num].slice(0,6)+" "+sname[num].slice(0,7)+" "+sname[num].slice(0,8)+" series webseries web "+tagseries[num]; 
		div.id = 'series'+num;
		div.title = sname[num];
		div.style.display = 'none';
		div.addEventListener('mouseover',function(){showall1(this);});
		div.addEventListener('mouseout',function(){hideall1(this);});

		let img = document.createElement('img');	
		div.appendChild(img);
		img.id = 'img'+num;
		img.src = simg[num];
		img.alt = 'Image Not Available';

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
function pages(){
	let pagediv = document.createElement('div');
	container.appendChild(pagediv);
	pagediv.id = 'pages';
	pagediv.className += 'page';
	pagediv.appendChild(document.createElement('a')).appendChild(document.createTextNode('page no.:- '));
	let tpages =  (mname.length / 20).toString()[0];tpages++;
	for(var i = 0 ; i < tpages ; i++ ){
		let a1 = document.createElement('a');
		pagediv.appendChild(a1);
		a1.href = '#';
		a1.innerHTML = i+1 ;
		a1.addEventListener ("click",function(){pagefn(this);});
	}
}
function pagefn(a){
	for(var num = 0; num <mname.length ; num++ ){
		document.getElementById('movie'+num).style.display = 'none';
	}
	let pageno = a.innerHTML-1;
	let start = pageno*20;
	let stop = ((pageno+1)*20)-1;
	if(stop > mname.length){
		stop = mname.length; 
	}
	for(var num = pageno*20 ; num < stop   ; num++ ){
		document.getElementById('movie'+num).style.display = 'block';
	}
}
function spages(){
	let pagediv = document.createElement('div');
	container.appendChild(pagediv);
	pagediv.id = 'spages';
	pagediv.className += 'page';
	pagediv.style.display = 'none';
	pagediv.appendChild(document.createElement('a')).appendChild(document.createTextNode('page no.:- '));
	let tpages =  (sname.length / 10).toString()[0];tpages++;
	for(var i = 0 ; i < tpages ; i++ ){
		let a1 = document.createElement('a');
		pagediv.appendChild(a1);
		a1.href = '#';
		a1.innerHTML = i+1 ;
		a1.addEventListener ("click",function(){spagefn(this);});
	}
}
function spagefn(a){
	for(var num = 0; num <sname.length ; num++ ){
		document.getElementById('series'+num).style.display = 'none';
	}
	let pageno = a.innerHTML-1;
	let start = pageno*10;
	let stop = ((pageno+1)*10)-1;
	if(stop > sname.length){
		stop = sname.length; 
	}
	for(var num = pageno*10 ; num <= stop ; num++ ){
		document.getElementById('series'+num).style.display = 'block';
	}
}
var footer = document.createElement('footer');
body.appendChild(footer);
function footerfn(){
	let divup = document.createElement('div');
	footer.appendChild(divup);
	divup.className += 'footerup';

	let div = document.createElement('div');
	divup.appendChild(div);
	div.className += "footer1";
	div.appendChild(document.createElement('h1')).appendChild(document.createTextNode('About Us'));
	div.appendChild(document.createElement('h3')).appendChild(document.createTextNode('EMAIL:shotspot39@gmail.com'));
	div.appendChild(document.createElement('h4')).appendChild(document.createTextNode('JUST FOR ENTERTAINMENT PURPOSE'));

	var socialimg = ['img/gh.png', 'img/insta.png', 'img/fb.png', 'img/yt.png'];
	let div2 = document.createElement('div');
	divup.appendChild(div2);
	div2.className += "footer2";
	let ul = document.createElement('ul');
	div2.appendChild(ul);
	for(var num = 0 ; num < socialimg.length ;num++){
		let li = document.createElement('li');
		ul.appendChild(li);
		let a = document.createElement('a');
		li.appendChild(a);
		a.href = '';
		a.target = '_blank';
		let img = document.createElement('img');
		a.appendChild(img);
		img.src = socialimg[num] ;
		img.alt = 'image not found';
	}

	let div3 = document.createElement('div');
	footer.appendChild(div3);
	div3.className += 'footer3';

	let div3in1 = document.createElement('div');
	div3.appendChild(div3in1);
	div3in1.className += 'movielist';
	div3in1.appendChild(document.createElement('h3')).appendChild(document.createTextNode('movies('+mname.length+')'));
	let ul1 = document.createElement('ul');
	div3in1.appendChild(ul1);
	for (var num = 0 ; num < mname.length ; num++){
		let li1 = document.createElement('li');
		ul1.appendChild(li1);
		let a1 = document.createElement('a');
		li1.appendChild(a1);
		a1.appendChild(document.createTextNode(mname[num]));
		a1.href = '#';
		a1.addEventListener ("click",function(){tagfn(this);});
	}

	let div3in2 = document.createElement('div');
	div3.appendChild(div3in2);
	div3in2.className += 'movielist';
	div3in2.appendChild(document.createElement('h3')).appendChild(document.createTextNode('series('+sname.length+')'));
	let ul2 = document.createElement('ul');
	div3in2.appendChild(ul2);
	for (var num = 0 ; num < sname.length ; num++){
		let li2 = document.createElement('li');
		ul2.appendChild(li2);
		let a2 = document.createElement('a');
		li2.appendChild(a2);
		a2.appendChild(document.createTextNode(sname[num]));
		a2.href = '#';
		a2.addEventListener ("click",function(){tagfn(this);});
		
	}

	let div3in3 = document.createElement('div');
	div3.appendChild(div3in3);
	div3in3.className += 'movielist';

	let div3in4 = document.createElement('div');
	div3.appendChild(div3in4);
	div3in4.className += 'movielist';

	var footerlist = ['home','|','site disclaimer','|','contact us','|','about us','|','dmca']
	let div4 = document.createElement('div');
	footer.appendChild(div4);
	div4.className += 'footer4';
	
	let ul3 = document.createElement('ul');
	div4.appendChild(ul3);
	for(var num = 0 ; num < footerlist.length ; num++){
		let li = document.createElement('li');
		ul3.appendChild(li);
		let a = document.createElement('a');
		li.appendChild(a);
		a.href = '#';
		a.innerHTML = footerlist[num];
	}
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
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0; num < 20 ; num++ ){
		document.getElementById('movie'+num).style.display = 'block';
	}searchcounter = 0;
	for(var num = 0; num < sname.length ; num++ ){
		document.getElementById('series'+num).style.display = 'none';
	}
	document.getElementById('divsearch').style.display = 'none';
	document.getElementById('divsearch1').style.display = 'none';
	document.getElementById('pages').style.display = 'block';
	document.getElementById('spages').style.display = 'none';
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
}
var searchcounter=0;var result = 0;var result1 = 0;
function searchfn1(){
	document.getElementById('backbtnid').style.display = 'block';
	document.getElementById('divsearch').style.display='block';
	document.getElementById('divsearch1').style.display='block';
	document.getElementById('pages').style.display = 'none';
	document.getElementById('spages').style.display = 'none';
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
	let taglist = ['hollywood','bollywood','punjabi','web Series','action','comedy','thriller','drama','romantic','adventure','game of thrones','black mirror','mirzapur','pirates of the caribbean','resident evil','transporter','goosebumps','terminator','final destination','twilight','night at museum'];

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

	let divsearch = document.createElement('div');
	main.appendChild(divsearch);
	divsearch.className += 'searchdivs';
	divsearch.id = 'divsearch';
	divsearch.style.display = 'none';

	divsearch.appendChild(document.createElement('h1')).id = 'resulthead1';
}
function tagfn(a){
	document.getElementById('backbtnid').style.display = 'block';
	document.getElementById('divsearch').style.display='block';
	document.getElementById('divsearch1').style.display='block';
	document.getElementById('pages').style.display = 'none';
	document.getElementById('spages').style.display = 'none';
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
	var value1 = searchvalue;var valueall = value1.toLowerCase();var valuef = valueall.charAt(0);
	for(var num = 0; num < mname.length ; num++ ){
		if(document.getElementsByClassName(valueall)[num] !== undefined ){
			document.getElementsByClassName(valueall)[num].style.display = 'block';
			result++;	
		}
	}
	document.getElementById('resulthead1').appendChild(document.createTextNode('MOVIES : '+searchvalue+' (Total Result :'+ result+' )'));
	document.getElementById('resulthead2').appendChild(document.createTextNode('SERIES : '+searchvalue));
}
function slatest(){
	headingh1.innerHTML = 'latest';
	document.getElementById('spages').style.display = 'none';
	document.getElementById('pages').style.display = 'block';
	document.getElementById('nav1').style.color = 'hotpink'; document.getElementById('nav2').style.color = '#000000'; document.getElementById('nav3').style.color = '#000000'; document.getElementById('nav4').style.color = '#000000';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0 ; num < 20 ; num++){
		document.getElementById('movie'+num).style.display = 'block';
	}
	for(var num = 0; num <sname.length ; num++ ){
		document.getElementById('series'+num).style.display = 'none';
	}
}
function sbollywood(){
	backbtnfn();
	document.getElementById('pages').style.display = 'none';
	document.getElementById('spages').style.display = 'none';
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
	document.getElementById('pages').style.display = 'none';
	document.getElementById('spages').style.display = 'none';
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
	document.getElementById('pages').style.display = 'none';
	document.getElementById('spages').style.display = 'block';
	document.getElementById('nav1').style.color = '#000000'; document.getElementById('nav2').style.color = '#000000'; document.getElementById('nav3').style.color = '#000000'; document.getElementById('nav4').style.color = 'hotpink';
	for(var num = 0 ; num < mname.length ; num++){
		document.getElementById('movie'+num).style.display = 'none';
	}
	for(var num = 0 ; num < 10 ; num++){
		document.getElementById('series'+num).style.display = 'block';
	}
}
function showall(movieid){
	let getid = movieid.id.slice('5'); 
	document.getElementById('image'+getid).style.filter="grayscale(40%) blur(5px)";
	document.getElementById('md'+getid).style.display='block';
}
function hideall(movieid){
	let getid = movieid.id.slice('5'); 	
	document.getElementById('image'+getid).style.filter="grayscale(0%) blur(0px)";
	document.getElementById('md'+getid).style.display='none';
}
function showall1(seriesid){
	let getid = seriesid.id.slice('6'); 
	document.getElementById('img'+getid).style.filter="grayscale(40%) blur(5px)";
	document.getElementById('sd'+getid).style.display='block';
}
function hideall1(seriesid){
	let getid = seriesid.id.slice('6');
	document.getElementById('img'+getid).style.filter="grayscale(0%) blur(0px)";
	document.getElementById('sd'+getid).style.display='none';
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