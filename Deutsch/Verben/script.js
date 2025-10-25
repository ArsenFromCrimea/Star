	function run_equivalence(){
	    var s=document.getElementById('WS').innerHTML;
	    var s1='';
	    for(var i=0;i<s.length;i++){
		if(s[i]=='#'){
		    s1+='<span class="green">&#8800</span>';
		    continue;
		}
		if(s[i]=='='){
		    s1+='<span class="green">=</span>';
		    continue;
		}
		s1+=s[i];
	    }
	    document.getElementById('WS').innerHTML=s1;
	}
	function run(){
	    var s=document.getElementById('WS').innerHTML;
	    var s1='';
	    for(var i=0;i<s.length;i++){
		if(s[i]=='µ'){
		    s1+='<span class="red">zu</span>';
		    continue;
		}
		s1+=s[i];
	    }
	    document.getElementById('WS').innerHTML=s1;
	}

