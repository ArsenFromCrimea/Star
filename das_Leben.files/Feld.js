	function gitter(m,n){
		for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				context.strokeRect(j*a,i*a,a,a);
			}
		}
		context.stroke();
	}


    function zeigen(spiel){
        context.strokeStyle="gray";
        for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
				context.strokeRect(j*a,i*a,a,a);
			}
		}
        context.stroke();
        for(var i=0;i<m;i++){
			for(var j=0;j<n;j++){
                if(spiel.ist_tot(i,j)){
                    context.fillStyle="white";
                }else{
                    context.fillStyle=spiel.die_farbe(i,j);
                }
                context.fillRect(j*a+1,i*a+1,a-2,a-2);
			}
		}
    }


    var BLINKER = [
		"111"
    ];

    var UHR = [
        "0010",
		"1100",
		"0011",
		"0100"
    ];

    var KROETE = [
			"0110",
			"1000",
			"0001",
			"0110"
    ];

    var BIPOLE = [
			"1100",
			"1000",
			"0001",
			"0011"
    ];

    var TRIPOLE = [
			"11000",
			"10000",
			"01010",
			"00001",
			"00011"
    ];

    var PULSATOR = [
			"11111111",
			"10111101",
			"11111111"
    ];

	var TUEMMLER = [
			"001101100",
			"000000000",
			"000101000",
			"110101011",
			"111000111"
    ];

    var OKTAGON = [
			"00100100",
			"00100100",
			"11011011",
			"00100100",
			"00100100",
			"11011011",
			"00100100",
			"00100100"
    ];

    var VERSCHWINDEN = [
			"111",
			"101",
			"101",
			"000",
			"101",
			"101",
			"111"
    ];
    var GLEITER = [
			"010",
			"001",
			"111"
    ];

    var WAAGERECHTER_SEGLER = [
			"01111",
			"10001",
			"00001",
			"10010"
    ];
	
	var SEGLER_NACH_LINKS = [
			"01001",
			"10000",
			"10001",
			"11110"
    ];

    var SENKRECHTER_SEGLER = [
			"01010",
			"00001",
			"10001",
			"00001",
			"01001",
			"00111"
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


		reset(suppe){
			this.alles_putzen();
			if(suppe){
				for (var y = 0; y < this.m; y++) {
					for (var x = 0; x < this.n; x++) {
						if (Math.random() < 0.5) {
							this.bestimmen(y,x,"black");
						} else {
							this.putzen(y,x);
						}
					}
				}
			}
			else{
				this.figur(BLINKER,3,2,"blue");
				this.figur(UHR,17,3,"yellow");
				this.figur(KROETE,5,17,"red");
				this.figur(BIPOLE,17,18,"gray");
				this.figur(TRIPOLE,40,2,"green");
				this.figur(PULSATOR,40,15,"cyan");
				this.figur(TUEMMLER,39,34,"red");
				this.figur(OKTAGON,4,42,"yellow");
				this.figur(VERSCHWINDEN,59,44,"green");
				this.figur(GLEITER,50,8,"blue");
				this.figur(WAAGERECHTER_SEGLER,5,53,"cyan");
				this.figur(SEGLER_NACH_LINKS,65,25,"red");
				this.figur(SENKRECHTER_SEGLER,28,1,"black");
			}
			
		}


        figur(figur,y,x,farbe){
            for (var i = 0; i < figur.length; i++) {
			    for (var j = 0; j < figur[0].length; j++) {
				    if (figur[i].charAt(j) == '1') {
					    this.bestimmen(i + x, j + y, farbe);
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
            if(this.ist_innerhalb(i,j)){
                return this.feld[i][j];
            }
            return null;
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
            if (j>=n) return false;
            return true;
        }

        wieviel_nachbarn(y, x) {
		    var count = 0;
		    for (var i = y - 1; i <= y + 1; i++) {
			    for (var j = x - 1; j <= x + 1; j++) {
				    if (i == y && j == x) {
					    continue;
				    }
				    if (!this.ist_tot(i, j)) {
					    count++;
				    }
			    }
		    }
		    return count;
	    }


        welche_farbe(y,x) {
            var f
		    for (var i = y - 1; i <= y + 1; i++) {
			    for (var j = x - 1; j <= x + 1; j++) {
				    if (i == y && j == x) {
					    continue;
				    }
                    f=this.die_farbe(i,j);
				    if (f!=null) {
					    return f;
				    }
			    }
		    }
		    return null;
	    }


        naechstePhase(skizze){
            skizze.alles_putzen();
            var i
            var j
            var na
            for(i=0;i<this.m;i++){
                for(j=0;j<this.n;j++){
                    na=this.wieviel_nachbarn(i,j);
                    if(this.ist_tot(i,j)){ //gebären
                        if(na==3){
                            skizze.bestimmen(i,j,this.welche_farbe(i,j));
                        }
                    }else{
                        if(na==2||na==3){ //überleben
                            skizze.bestimmen(i,j,this.die_farbe(i,j));
                        }else{
                            
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
		    for (var y = 0; y < this.m; y++) {
			    for (var x = 0; x < this.n; x++) {
				    this.putzen(y, x);
			    }
		    }
	    }

      

     

    }