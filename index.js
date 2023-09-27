var canvas=document.getElementById("my_screen");
var content=canvas.getContext("2d");
var xCenter=canvas.width/2;
var yCenter=canvas.height/2;


var engine=null;

function start(){
    var count=document.getElementById("count").value;
    document.getElementById("displayCOUNT").innerHTML=count;

    if(engine!=null){
        clearInterval(engine);
    }
    console.log("---");

    content.fillStyle="#ff0000";

    var deltaPhi=2*Math.PI/(count*1000);

function build(){
    function cross(x,y){
                 content.strokeStyle="#000000";
                 content.beginPath();
                 var r=10;
                 content.moveTo(x-r,y-r);
                 content.lineTo(x+r,y+r);
                 content.moveTo(x+r,y-r);
                 content.lineTo(x-r,y+r);
                 content.stroke();
    }
    
    var len=(minLength+maxLength)/2;
    var a_plus_b=len/Math.PI;//сумма полуосей a+b
    var a=a_plus_b/(1+k);
    var c=e*a;
    //var massstab=canvas.width/(2*a);
    var massstab=17.23570824538507*12.7/56.6;
    //console.log(massstab)
    var leftFocus=xCenter-c*massstab;
    var rightFocus=xCenter+c*massstab;
    var b=a*k;
    var p=Math.pow(b,2)/a;
    var tooth=0;
    var xOld;
    var yOld;
    var x;
    var y;
    content.clearRect(0,0,canvas.width,canvas.height);
    
    /*content.beginPath();
    content.fillStyle="gray";
    content.fillRect(0,0,298/2*massstab,210*massstab);
    content.fill();*/ 

    content.beginPath();
    content.strokeStyle="brown";
    var X
    var deltaX=knot/12.7*massstab;
    var Y0=xCenter-15;
    var Y1
    for(var kk=-30;kk<31;kk++){
                X=xCenter+kk*deltaX;
                content.moveTo(X,Y0);
                switch(Math.abs(kk%10)){
                     case 0:Y1=Y0+10;
                     break;
                     case 5:Y1=Y0+8;
                     break;
                     default:Y1=Y0+5;
                }
                content.lineTo(X,Y1);             
    }
    content.stroke();  

    content.beginPath();
    content.strokeStyle="green";
    content.moveTo(xCenter+100+knot*massstab,yCenter);
    content.lineTo(xCenter+100,yCenter);
    content.lineTo(xCenter+100,yCenter-knot*massstab);
    content.lineTo(xCenter+100+knot*massstab,yCenter-knot*massstab);
    content.lineTo(xCenter+100+knot*massstab,yCenter-2*knot*massstab);
    content.stroke(); 
    content.beginPath();
    content.strokeStyle="blue";
    content.font="18px Arial";
    content.strokeText(knot+" мм. - ланка ланцюга",xCenter+110,yCenter-10);
    content.stroke();

   
    
    cross(xCenter,yCenter)
    
    var length;
    var oldLength=0;
    var i=0;
    //var oldPhi=0;
    do{
        var phi=deltaPhi*i;
        
        /*var rho=p*massstab/(1+e*Math.cos(phi));
        x=rightFocus+rho*Math.cos(phi);
        y=yCenter-rho*Math.sin(phi);*/

        var R=a*massstab;
        x=xCenter+R*Math.cos(phi)*k;
        y=yCenter-R*Math.sin(phi);
        if(i>0){
             //content.lineTo(x,y);
             length=oldLength+Math.sqrt(Math.pow(x-xOld,2)+Math.pow(y-yOld,2));
             
        }else{
             //content.moveTo(x,y);
             length=0;
        }
        if(length>=tooth*knot*massstab){
                 tooth++;
                 
                 content.strokeStyle="#ff0000";
                 content.beginPath();
                 content.arc(x,y,massstab*knot/2,-3*Math.PI/2-phi,-Math.PI/2-phi);
                 content.stroke();
                 
                 cross(x,y);
                 
                 xOld=x;
                 yOld=y;
                 oldLength=length;
        }
        i++;
    }while(tooth<=count);
    if(phi>2*Math.PI){
        minLength=len;
    }else{
        maxLength=len;
    }
    if(maxLength-minLength<0.001){
        clearInterval(engine);
    }
}
    var knot=12.7;
    var e=document.getElementById("e").value;
    document.getElementById("displayE").innerHTML=e;
    var k=Math.sqrt(1-Math.pow(e,2));//коэффициент сжатия k=b/a
    document.getElementById("displayK").innerHTML=k;
    var minLength=count*knot/2;//длина в дюймах
    var maxLength=minLength*4;
    engine=setInterval(build,40);
}

start();
