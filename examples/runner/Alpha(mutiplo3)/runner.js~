window.addEventListener("load",function() {

var Q = window.Q = Quintus()
        .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI")
        .setup({ maximize: true })
        .controls().touch()

var SPRITE_BOX = 1;

Q.gravityY = 2000;

Q.Sprite.extend("Player",{

  init: function(p) {

    this._super(p,{
      sheet: "player",
      sprite: "player",
      collisionMask: SPRITE_BOX,
      x: 40,
      y: 555,
      scale:0.9,
      standingPoints: [ [ -16, 44], [ -23, 35 ], [-23,-48], [23,-48], [23, 35 ], [ 16, 44 ]],
      duckingPoints : [ [ -16, 44], [ -23, 35 ], [-23,-10], [23,-10], [23, 35 ], [ 16, 44 ]],
      speed: 500,
      jump: -800,
      live:3
    });

    this.p.points = this.p.standingPoints;

    this.add("2d, animation");
  },

  step: function(dt) {
    this.p.vx += (this.p.speed - this.p.vx)/4;

    if(this.p.y > 555) {
      this.p.y = 555;
      this.p.landed = 1;
      this.p.vy = 0;
    } else {
      this.p.landed = 0;
    }

    if(Q.inputs['up'] && this.p.landed > 0) {
      this.p.vy = this.p.jump;
    }

    this.p.points = this.p.standingPoints;
    if(this.p.landed) {
      if(Q.inputs['down']) {
        this.play("duck_right");
        this.p.points = this.p.duckingPoints;
      } else {
        this.play("walk_right");
      }
    } else {
      this.play("jump_right");
    }

    this.stage.viewport.centerOn(this.p.x + 300, 400 );

  }


});

var locallive=1;//Q('Player').p.live;

Q.Sprite.extend("Box",{

  init: function() {

    var levels = [ 565, 540, 500, 450 ];
    var col=getRandomColor();

    var player = Q("Player").first();
    this._super({color:col,text:Math.floor((Math.random() * 100) + 1),//"100",
      x: player.p.x + Q.width ,// + 50,
      y: levels[Math.floor(Math.random() * 3)],
      //frame: Math.floor((Math.random() * 10) + 0),//  Math.random() < 0.5 ? 1 : 0
      scale: 1.5,
      type: SPRITE_BOX,
      sheet: "numbers",
      vx: 200-scrore*50,
      vy: 0,
      ay: 0,
      theta: 0//(300 * Math.random() + 200) * (Math.random() < 0.5 ? 1 : -1)

    });




    this.on("hit");
  },

  step: function(dt) {
    this.p.x += this.p.vx * dt;


    this.p.vy += this.p.ay * dt;
    this.p.y += this.p.vy * dt;
    if(this.p.y != 565) {
      this.p.angle += this.p.theta * dt;
    }

    if(this.p.y > 800) { this.destroy(); }

  },

  draw: function(ctx) {
    ctx.strokeStyle=this.p.color;//"gray"
    ctx.lineWidth = "5";
    ctx.strokeRect(-this.p.cx,
                 -this.p.cy,
                 this.p.w,
                 this.p.h);

    ctx.fillStyle = getRandomColor();//"black";
    ctx.font='italic 30pt Lucida Console';//"20pt cartoon ";
    ctx.fillText(this.p.text,-this.p.cx+10,(this.p.h/2)-40);


},
  hit: function() {

    this.destroy();

    if(succestest(parseInt(this.p.text))) locallive--;
    else {
      scrore++;
    }

    if(locallive==0)
    {
     locallive=1;
     var textend="Game Over!"+"\nScore:"+scrore;
     Q.stageScene("endGame",1, {label: textend});

     Q.stage().pause();
    }

  }


});
//----------







//-----------

var scrore=0,num=1;
var color='#'+Math.floor(Math.random()*16777215).toString(16);
function succestest(number){

  switch (operation) {
    case "Multiplo de 3":return isMulti3(number);break;
    case "Primo":return isPrime(number);break;


    default: return isPrime(number);break;
  }
}

function isPrime(number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return true;//number > 1;
}

function isMulti3(number){

  if(number%3==0)return true;
  else return false;

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


Q.GameObject.extend("BoxThrower",{
  init: function() {
    this.p = {
      launchDelay: 0.75,
      launchRandom: 1,
      launch: 2
    }
  },

  update: function(dt) {
    this.p.launch -= dt;

    if(this.p.launch < 0) {
      this.stage.insert(new Q.Box());
      this.p.launch = this.p.launchDelay + this.p.launchRandom * Math.random();
    }
  }

});

Q.scene("level1",function(stage) {

  stage.insert(new Q.Repeater({ asset: "background-wall.png",
                                speedX: 0.5 }));

  stage.insert(new Q.Repeater({ asset: "background-floor.png",
                                repeatY: false,
                                speedX: 1.0,
                                y: 300 }));

  stage.insert(new Q.BoxThrower());

  //stage.insert(new Q.LabelSprite());
  //var Square = stage.insert(new Q.Square());
  stage.insert(new Q.Player());
  stage.add("viewport");

});

Q.scene('endGame',function(stage) {
  var box = stage.insert(new Q.UI.Container({
    x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
  }));

  var button = box.insert(new Q.UI.Button({ x: 10+5, y: 25, fill: "#CCCCCC",
                                           label: "Play Again" }))

   //var button2 = box.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
                    //                       label: "Play Again" }))

  var label = box.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
                                        label: stage.options.label }));
  button.on("click",function() {
    window.location.reload();
  });
  box.fit(20);

});

var operation;
Q.scene('hud',function(stage) {
  var container = stage.insert(new Q.UI.Container({
    x: 200, y: 0
  }));

  var live = container.insert(new Q.UI.Text({x:50, y: 5,
    label:"No topar los: " + operation, color: "white" }));
//*/
  container.fit(20);
});

Q.load("player.json, player.png, background-wall.png, background-floor.png, numbs1-9(2).png, numbs1-9(2).json", function() {
    Q.compileSheets("player.png","player.json");
    Q.compileSheets("numbs1-9(2).png","numbs1-9(2).json");
    Q.animations("player", {
      walk_right: { frames: [0,1,2,3,4,5,6,7,8,9,10], rate: 1/15, flip: false, loop: true },
      jump_right: { frames: [13], rate: 1/10, flip: false },
      stand_right: { frames:[14], rate: 1/10, flip: false },
      duck_right: { frames: [15], rate: 1/10, flip: false },
    });
    operation="Primo";//"Multiplo de 3";
    Q.stageScene("level1");
    Q.stageScene('hud', 3);





});


});
