
	function run(symbol,wort,style){
	    var s=document.getElementById('WS').innerHTML;
	    var s1='';
	    for(var i=0;i<s.length;i++){
		if(s[i]==symbol){
		    s1+='<span class="'+style+'">'+wort+'</span>';
		    continue;
		}
		s1+=s[i];
	    }
	    document.getElementById('WS').innerHTML=s1;
	}

