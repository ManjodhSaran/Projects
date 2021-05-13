function searchfn1(){
		
		document.getElementById('backbtnid').style.display = 'block';
		//document.getElementById('divsearch').style.display = 'block';

		if(searchcounter > 0){
			document.getElementById('divsearch').remove();
			document.getElementById('divsearch1').remove();
			
		}searchcounter++;

		result=0;
		result1=0;

		
		for(var num = 0; num <latestcounter ; num++ ){
			document.getElementById('movie'+num).style.display = 'none';
		}

		var value = document.getElementById('search-input').value;
		console.log("Search-Value : "+value);

		
		
		var str = value;//console.log("str : "+str);
		var strvalue = str.toUpperCase();//console.log("strvalue : "+strvalue);
		var fc_str = strvalue.charAt(0);//console.log("fc_str : "+fc_str);
		var linkcounter = 0;

		for(var num = 0; num < latestcounter ; num++ ){
			
			console.log(num);

			let strmovie1 = mname[num];//console.log("strmovie1 : "+strmovie1);
			let fc_str1 = strmovie1.charAt(0);//console.log("fc_str1 : "+fc_str1);
			let fw_str1 = strmovie1.split(" ");//console.log("fw_str1 : "+fw_str1);

			if(strmovie1 === strvalue){

				console.log("SEARCH MOVIES LEVEL 1");
				let h11 = document.createElement('h1');		
				main.appendChild(h11);
				h11.appendChild(document.createTextNode("MOVIE : "+strvalue));
				document.getElementById('movie'+num).style.display = 'block';
				result++;
						
			}else if(fc_str1 === fc_str){
				if(result === 0){
					console.log("SEARCH MOVIES LEVEL 2");
					let h11 = document.createElement('h1');		
					main.appendChild(h11);
					h11.appendChild(document.createTextNode("MOVIE : "+fc_str1));
					result++;
				}	
				document.getElementById('movie'+num).style.display = 'block';
					
			}
			/*
			if(fw_str1[0] === strvalue || fw_str1[1] === strvalue|| fw_str1[2] === strvalue
				|| fw_str1[3] === strvalue){
				if(result === 0){
					let h11 = document.createElement('h1');		
					divsearch.appendChild(h11);
					h11.appendChild(document.createTextNode("MOVIE : "+strvalue));
					result++;
				
					let div = document.createElement('div');
					divsearch.appendChild(div);
					div.className += "movie"; 
					div.id = 'movie'+num;

					let img = document.createElement('img');	
					div.appendChild(img);
					img.id = 'image'+num;
					img.src = mimg[num];
					img.style = 'filter : grayscale(0%) blur(0px);';

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
				}
			}
			*/	
		}

		
		for(var num = 0; num < last ; num++ ){

			if(sname[num] === 'NULL'){
				break;
			}else{
				let strseries = sname[num];//console.log("strseries : "+strseries);
				let fc_str11 = strseries.charAt(0);//console.log("fc_str11 : "+fc_str11);
				let fw_str11 = strseries.split(" ");

				if(strseries === strvalue){
					let h12 = document.createElement('h1');		
					main.appendChild(h12);
					h12.appendChild(document.createTextNode("SERIES : "+strseries));
					h12.style = 'margin: 50px 0px 5px 0px; width:100%; ';
					document.getElementById('series'+num).style.display = 'block';
					result1++;
		
				}else if(fc_str11 === fc_str){
					if(result1 === 0){
						let h12 = document.createElement('h1');		
						main.appendChild(h12);
						h12.appendChild(document.createTextNode("SERIES : "+fc_str11));
						result1++;
					}
					document.getElementById('series'+num).style.display = 'block';
				}
				
				/*
				if(fw_str11[0] === strvalue || fw_str11[1] === strvalue|| fw_str11[2] === strvalue
				|| fw_str11[3] === strvalue){
					if(result1 === 0){
						let h12 = document.createElement('h1');		
						divsearch1.appendChild(h12);
						h12.appendChild(document.createTextNode("SERIES : "+fc_str11));
						result1++;
					
						let div = document.createElement('div');
						divsearch1.appendChild(div);
						div.className += "series"; 
						div.id = 'series'+num;

						let img = document.createElement('img');	
						div.appendChild(img);
						img.id = 'img'+num;
						img.src = simg[num];

						let divin = document.createElement('div');
						div.appendChild(divin);
						divin.className += "sd"; 
						divin.id= 'sd'+num;

						let h3 = document.createElement('h3');		
						divin.appendChild(h3);
						h3.appendChild(document.createTextNode(sname[num]));

						let ul = document.createElement('ul');		
						divin.appendChild(ul);

						for (var num1 = 0 ; num1 < sepi[num] ; num1++){
							let li = document.createElement('li');		
							ul.appendChild(li);
							let link = document.createElement('a');		
							li.appendChild(link);
							//link.href = slink[num];
							link.target = '_blank';
							//linkcounter++;
							if(sepi[num] > 1){
								link.appendChild(document.createTextNode('Episode '+(num1+1)));
							}else{
								link.appendChild(document.createTextNode('Download All Episodes'));
							}
						}
					}
				}
				*/
			}
		}	
	
		if(result === 0 && result1 === 0 ){
			let h1 = document.createElement('h1');		
			divsearch.appendChild(h1);
			h1.appendChild(document.createTextNode("NO MOVIE FOUND"));
		}
		
	}




	function latest(){
			let latest = document.createElement('div');
			main.appendChild(latest);
			latest.id = 'latest';
			latest.style.display = 'block';

			let p = document.createElement('p');
			latest.appendChild(p);
			p.appendChild(document.createTextNode(updated));

			let h1 = document.createElement('h1');
			latest.appendChild(h1);
			h1.appendChild(document.createTextNode('LATEST'));

			searchfn();
			tags();

			for(var num = 0; num < last ; num++ ){
				if(mname[num] === 'NULL'){
					break;
				}else{
					latestin();
					latestcounter++;
				}
			}

			function latestin(){
				let div = document.createElement('div');
				latest.appendChild(div);
				div.className += "movie "+classname[num]; 
				div.id = 'movie'+num;
				div.title = mname[num];

				let img = document.createElement('img');	
				div.appendChild(img);
				img.id = 'image'+num;
				img.src = mimg[num];
				img.style = 'filter : grayscale(0%) blur(0px);';
				img.alt = 'Imane Not Available';

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
				//div.addEventListener ("mouseover",function(){showfull(num);},false);
				//div.addEventListener ("mouseout",function(){hidefull(num);},false);
			}
		}latest();

	function bolly(){
		let bolly = document.createElement('div');
		main.appendChild(bolly);
		bolly.id = 'bollywood';
		bolly.style.display = 'none';

		let h1 = document.createElement('h1');
		bolly.appendChild(h1);
		h1.appendChild(document.createTextNode('BOLLYWOOD'));	

		for(var num = 0; num < last ; num++ ){
			if(bname[num] === 'NULL'){
				break;
			}else{
				bollyin();
			}
		}

		function bollyin(){	
			let div = document.createElement('div');
			bolly.appendChild(div);
			div.className += "movie"; 
			div.id = 'movie'+num;
			div.title = bname[num];

			let img = document.createElement('img');	
			div.appendChild(img);
			img.id = 'image'+num;
			img.src = bimg[num];
			img.alt = 'Image Not Available';

			let divin = document.createElement('div');
			div.appendChild(divin);
			divin.className += "md"; 
			divin.id= 'md'+num;

			let h3 = document.createElement('h3');		
			divin.appendChild(h3);
			h3.appendChild(document.createTextNode(bname[num]));

			let link = document.createElement('a');		
			divin.appendChild(link);
			link.href = blink[num];
			link.target = '_blank';
			link.appendChild(document.createTextNode('Download'));	
		}	
	}bolly();

	function holly(){
		let holly = document.createElement('div');
		main.appendChild(holly);
		holly.id = 'hollywood';
		holly.style.display = 'none';

		let h1 = document.createElement('h1');
		holly.appendChild(h1);
		h1.appendChild(document.createTextNode('HOLLYWOOD'));


		var hollywoodcounter = 0;
		for(var num = 0; num < last ; num++ ){
			if(hname[num] === 'NULL'){
				break;
			}else{
				hollyin();
				hollywoodcounter++;
			}
		}	

		function hollyin(){		
			let div = document.createElement('div');
			holly.appendChild(div);
			div.className += "movie"; 
			div.id = 'movie latest '+num;
			div.title = hname[num];

			let img = document.createElement('img');	
			div.appendChild(img);
			img.id = 'image'+num;
			img.src = himg[num];
			img.alt = 'Imane Not Available';


			let divin = document.createElement('div');
			div.appendChild(divin);
			divin.className += "md"; 
			divin.id= 'md'+num;

			let h3 = document.createElement('h3');		
			divin.appendChild(h3);
			h3.appendChild(document.createTextNode(hname[num]));

			let link = document.createElement('a');		
			divin.appendChild(link);
			link.href = hlink[num];
			link.target = '_blank';
			link.appendChild(document.createTextNode('Download'));	
		}	
	}holly();

	
		document.onmousedown = function(e) {
	  		console.log(e.target.id);
		}


/*	
	function clltion(){
				let div = document.createElement('div');
				latest.appendChild(div);
				div.className += "movie"; 
				div.id = 'movie'+num;

				let img = document.createElement('img');	
				div.appendChild(img);
				img.id = 'image'+num;
				img.src = mimg[num];
				img.style = 'filter : grayscale(0%) blur(0px); '

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
			}

	function addinghovereffect(){
		for(var num1 = 0 ; num1 < 25; num1++ ){
			let item = document.getElementById('movie'+num1);
			item.addEventListener( "mouseover" ,  function(){ showfull(num1) ;});
			item.addEventListener( "mouseout" ,  function(){ hidefull(num1) ;});
		}
	}//addinghovereffect();
	document.onmouseover = function(e) {
    	console.log(e.target.id);
    	showfull(e);
	}
	
	
	
	

	function showall(num){
		document.getElementById('img'+num).style.filter="grayscale(40%) blur(10px)";
		document.getElementById('sd'+num).style.display='block';
	}
	function hideall(num){
		document.getElementById('img'+num).style.filter="grayscale(0%) blur(0px)";
		document.getElementById('sd'+num).style.display='none';
	}
	<!DOCTYPE html><head><link rel="stylesheet" type="text/css" href="ss.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><script src="https://cdn.jsdelivr.net/npm/darkmode-js@1.5.5/lib/darkmode-js.min.js"></script><script src="mname.js?n=1" async></script><script src="mimg.js?n=1" async></script><script src="mlink.js?n=1" async></script><script src="ss.js?n=1" async></script></head><body><header>
<a href="ss.html"><img src="img\logo.png"></a>
<a href="ss.html"><h1 class="changecolor">SHOT SPOT</h1></a> 
<ul class="bar-menu animated bounceInDown"id="bar-list"> 
<li><a href="#" id="nav1" onclick="slatest()">LATEST</a></li> 
<li><a href="#" id="nav2" onclick="sbollywood()">BOLLYWOOD</a></li> 
<li><a href="#" id="nav3" onclick="shollywood()">HOLLYWOOD</a></li> 
<li><a href="#" id="nav4" onclick="sseries()">WEB SERIES</a></li> 
<li class="downloader"><img src="https://i0.wp.com/windowstan.com/wp-content/uploads/2019/02/Internet-Download-Manager-logo-Windowstan.png?fit=200%2C200&ssl=1"><a href="https://doc-04-28-docs.googleusercontent.com/docs/securesc/ub0h1j9fhu6j2jjr4gl5h4j33fh2i1kk/3pcr2fk5fsi8ov4lmsb0amfpliq48imq/1585817475000/01267896872855643408/01267896872855643408/1kv1h0libhZkI10caYH4feLOnpP48RjDE?e=download&authuser=9" target="_blank">IDM</a></li> 
</ul><a href="#" class="bar-icon" onclick="showbar()"><i class="fa fa-bars"></i></a></header></body></html>





*/
/*
var header = document.createElement('header');
body.appendChild(header);
headerfn();
function headerfn(){
	let a = document.createElement('a');
	header.appendChild(a);
	a.href = 'ss.html';

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

	let navfnlist = ['','slatest','sbollywood','shollywood','sseries'];
	let nav = ['','LATEST','BOLLYWOOD','HOLLYWOOD','WEB SERIES'];

	for(var num = 1 ; num < 5 ; num++ ){
		let li = document.createElement('li');
		ul.appendChild(li);
		let a1 = document.createElement('a');
		li.appendChild(a1);
		a1.href = '#';
		a1.id = 'nav' + num ;
		//a1.addEventListener("click",navfnlist[num]);
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
	i.addEventListener("touch",showbar);
}	
*/
/*
	let link1 = document.createElement('link');
	head.appendChild(link1);
	link1.ref = 'stylesheet';
	link1.type = 'text/css';
	link1.href = 'ss.css';

	let link2 = document.createElement('link');
	head.appendChild(link2);
	link2.ref = 'stylesheet';
	link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css';
	
	let link3 = document.createElement('link');
	head.appendChild(link3);
	link3.ref = 'stylesheet';
	link3.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
	
	let script = document.createElement('script');
	head.appendChild(script);
	script.src = 'mname.js?n=1';
	let script2 = document.createElement('script');
	head.appendChild(script2);
	script2.src = 'mimg.js?n=1';
	let script3 = document.createElement('script');
	head.appendChild(script3);
	script3.src = 'mlink.js?n=1';
	*/