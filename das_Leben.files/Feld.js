	function gitter(m,n){
		for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				context.strokeRect(j*a,i*a,a,a);
			}
		}
		context.stroke();
	}

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


        bestimmen(i,j,farbe){
            this.feld[i][j]=farbe;
        }

        was(i,j){
            return feld[i][j];
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
				    if (was(j, i) != null) {
					    count++;
				    }
			    }
		    }
		    return count;
	    }


        naechstePhase(){
            var prototyp=new Feld(this.m,this.n);
            for(var i=0;i<this.m;i++){
                for(var j=0;j<this.n;j++){

                }
            }
        }


        alles_putzen() {
		    for (var y = 0; y < m; y++) {
			    for (var x = 0; x < n; x++) {
				    putzen(y, x);
			    }
		    }
	    }

        zufaellig(){
            
        }

        ausdrucken(){
            for(var i=0;i<this.m;i++){
                f="";
                for(var j=0;j<this.n;j++){
                    f+=this.feld[i][j]+" ";
                }
                console.log(f);
            }
        }

    }