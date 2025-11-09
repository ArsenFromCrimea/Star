	function gitter(m,n){
		for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				context.strokeRect(j*a,i*a,a,a);
			}
		}
		context.stroke();
	}


    function zeigen(spiel){
        for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				context.strokeRect(j*a,i*a,a,a);
			}
		}
        context.stroke();
        for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
                if(spiel.ist_tot(i,j)){
                    context.fillStyle="red";
                }else{
                    context.fillStyle=spiel.die_farbe(i,j);
                }
                context.fillRect(j*a+1,i*a+1,a-2,a-2);
			}
		}
    }


    var UHR = [
        "0010",
		"1100",
		"0011",
		"0100"
    ];


    
			

    class Feld{
    
        constructor(m,n){
            this.m=m;
            this.n=n;
            this.feld=[];
            for(var i=0;i<m;i++){
                this.feld[i]=[];
                for(var j=0;j<n;j++){
                    this.feld[i][j]=null;
                }
            }
        }


        figur(figur, y,x, farbe){
            for (var i = 0; i < figur.length; i++) {
			    for (var j = 0; j < figur[0].length; j++) {
				    if (figur[i].charAt(j) == '1') {
					    this.bestimmen(j + x, i + y, farbe);
				    } else {
					    //this.putzen(j + x, i + y);
				    }
			    }
		    }
        }


        bestimmen(i,j,farbe){
            this.feld[i][j]=farbe;
        }
        
        die_farbe(i,j){
            return this.feld[i][j];
        }

        ist_tot(i,j){
            //console.log(this.feld[i])
            return !this.ist_innerhalb(i,j)||this.feld[i][j]==null;
        }

        putzen(i,j){
            this.bestimmen(i,j,null);
        }

        ist_innerhalb(i,j){
            if (i<0) return false;
            if (i>=m) return false;
            if (j<0) return false;
            if (j>=m) return false;
            return true;
        }

        wieviel_nachbarn(y, x) {
		    var count = 0;
		    for (var i = y - 1; i <= y + 1; i++) {
			    for (var j = x - 1; j <= x + 1; j++) {
				    if (i == y && j == x) {
					    continue;
				    }
				    if (!this.ist_tot(j, i)) {
					    count++;
				    }
			    }
		    }
		    return count;
	    }


        naechstePhase(skizze){
            skizze.alles_putzen();
            var i
            var j
            for(i=0;i<this.m;i++){
                for(j=0;j<this.n;j++){
                    n=this.wieviel_nachbarn(i,j);
                    if(this.ist_tot(i,j)){
                        if(n==3){
                            skizze.bestimmen(i,j,"black");
                        }
                    }else{
                        if(n==2||n==3){
                           
                        }else{
                            skizze.bestimmen(i,j,"black");
                        }
                    }
                }
            }
            console.log("ein Kader")
            for(i=0;i<this.m;i++){
                for(j=0;j<this.n;j++){
                    this.bestimmen(i,j,skizze.die_farbe(i,j));
                }
            }
        }


        alles_putzen() {
		    for (var y = 0; y < m; y++) {
			    for (var x = 0; x < n; x++) {
				    this.putzen(y, x);
			    }
		    }
	    }

      

     

    }