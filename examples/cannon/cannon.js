window.addEventListener('load',function(e) {
  var Q = window.Q = Quintus()
                     .include('Input,Sprites,Scenes,SVG,Physics,UI,2D')
                     .svgOnly()
                     .setup('quintus',{ maximize: true });
					 
  Q.state.set("score", 0);
  Q.state.set("the_ball", 1);
  Q.Sprite.extend('CannonBall',{
    init: function(props) {
      this._super({
        shape: 'circle',
        color: 'gray',
        r: 9,
        restitution: 0.5,
        density: 0,
        x: props.dx * 50 + 10,
        y: props.dy * 50 + 210,
        seconds: 12
      });
      this.add('physics');
      this.on('step',this,'countdown');
    },
	// randoon: function() {
		// coloor : ['red', 'blue', 'green', 'yellow']
		// return coloor[1]
	// },
    countdown: function(dt) {
      this.p.seconds -= dt;
      if(this.p.seconds < 0) {
		Q.state.set("the_ball", 1);
        this.destroy();
      } else if(this.p.seconds < 500) {
        this.set({ "fill-opacity": this.p.seconds });
      }
    }
  });

  Q.Sprite.extend('Cannon',{
    init: function(props) {
      this._super({
        shape:'polygon',
        color: randomColor2(),
        points: [[ 0,0 ], [0,-5], [5,-10], [8, -11], [40, -11], 
                  [ 40, 11], [8, 11], [5, 10], [0, 5] ],
        x: 10,
        y: 210
      });
    },

    fire: function() {
		if(Q.state.get("the_ball") == 1)
		{
		  var dx = Math.cos(this.p.angle / 180 * Math.PI),
			  dy = Math.sin(this.p.angle / 180 * Math.PI),
			  ball = new Q.CannonBall({ dx: dx, dy: dy, angle: this.p.angle });
		  Q.stage().insert(ball);
		  ball.physics.velocity(dx*400,dy*400);
		  Q.state.set("the_ball", 0);
		}
    }
  });

  //var targetCount = 0;
  	Q.Sprite.extend('Target',{
    init: function(props) {
      this._super( Q._extend(props,{
        shape: 'block',
      }));
      //targetCount++;
      this.add('physics');
      this.on('contact',this,'checkHit');
    },

    checkHit: function(sprite) {
	  if(sprite instanceof Q.CannonBall) {
		//alert(CannonBall.x);
		//targetCount--;
		if(Q.state.get("the_color") == Q.state.get("rnd_color_1")){
			Q.state.set("score", Q.state.get("score")+ 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		else
		{
			Q.state.set("score", Q.state.get("score")- 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		
		this.destroy();
    	}
	}});


 	Q.Sprite.extend('Target2',{
    init: function(props) {
      this._super( Q._extend(props,{
        shape: 'block',
      }));
      //targetCount++;
      this.add('physics');
      this.on('contact',this,'checkHit');
    },

    checkHit: function(sprite) {
	  if(sprite instanceof Q.CannonBall) {
		//alert(CannonBall.x);
		//targetCount--;
		if(Q.state.get("the_color") == Q.state.get("rnd_color_2")){
			Q.state.set("score", Q.state.get("score")+ 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		else
		{
			Q.state.set("score", Q.state.get("score")- 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		this.destroy();
    	}
	}});
	 	Q.Sprite.extend('Target3',{
    init: function(props) {
      this._super( Q._extend(props,{
        shape: 'block',
      }));
      //targetCount++;
      this.add('physics');
      this.on('contact',this,'checkHit');
    },

    checkHit: function(sprite) {
	  if(sprite instanceof Q.CannonBall) {
		//alert(CannonBall.x);
		//targetCount--;
		if(Q.state.get("the_color") == Q.state.get("rnd_color_3")){
			Q.state.set("score", Q.state.get("score")+ 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		else
		{
			Q.state.set("score", Q.state.get("score")- 5);
			Q.state.set("the_ball", 1);
			Q.stageScene('level');
			alert(Q.state.get("score"));
		}
		this.destroy();
    	}
	}});

	Q.scene('level',new Q.Scene(function(stage) {

    //var label = stage.insert(new Q.UI.Text({x:10, y: 0, label: stage.options.label }));
    //container.fit(20);
    
    targetCount = 0;
    stage.add("world");
    stage.insert(new Q.Sprite({ 
      x: 250, y: 250, w: 700, h: 50, type:"static"
	}));
	stage.insert(new Q.Sprite({ w: 50, h:150, x: 150, y: 200, type:"static"}));
    stage.insert(new Q.Sprite({ w: 50, h:150, x: 270, y: 200, type:"static"}));
	stage.insert(new Q.Sprite({ w: 50, h:150, x: 390, y: 200, type:"static"}));
	stage.insert(new Q.Sprite({ w: 50, h:150, x: 510, y: 200, type:"static"}));
	
    stage.insert(new Q.Target({ w: 68, h:5, x: 210, y: 100, color: randomColor3()}));
	stage.insert(new Q.Target2({ w: 68, h:5, x: 330, y: 100, color: randomColor4()}));	
	stage.insert(new Q.Target3({ w: 68, h:5, x: 450, y: 100, color: randomColor5()}));

    //stage.insert(new Q.Sprite({ w: 10, h:50, x: 500, y: 200 }));
    //stage.insert(new Q.Sprite({ w: 10, h:50, x: 550, y: 200 }));
    //stage.insert(new Q.Sprite({ w: 70, h:10, x: 525, y: 170 }));
    //stage.insert(new Q.Sprite({ w: 10, h:50, x: 500, y: 130 }));
    //stage.insert(new Q.Sprite({ w: 10, h:50, x: 550, y: 130 }));
    //stage.insert(new Q.Sprite({ w: 70, h:10, x: 525, y: 110 }));

    //stage.insert(new Q.Sprite({
    //  points: [[ 0,0 ], [ 50, -50 ],[150, -50],[200,0]],
    //  x: 200,
    //  y: 225,
    //  type:'static',
    //  shape: 'polygon'
    //}));

	//stage.insert(new Q.Sprite({ w: 25, h:25, x: 300, y: 115 }));

    stage.each(function() { this.add("physics") });

    //stage.insert(new Q.Target({ x: 525, y: 90 }));
    //stage.insert(new Q.Target({ x: 300, y: 90 }));
    stage.insert(new Q.Sprite({ w: 30, h:30, x: 10, y: 210, 
                                color: "black"}));

    stage.cannon = stage.insert(new Q.Cannon());
    stage.viewport(600,400);
    stage.centerOn(300,100);
	
  }));

	Q.stageScene("level");
    var cannonMove=function(e) {
    var stage = Q.stage(0), 
        cannon = stage.cannon,
        touch = e.changedTouches ?  
                e.changedTouches[0] : e,
        point = stage.browserToWorld(touch.pageX,touch.pageY);
   
    	var angle = Math.atan2(point.y - cannon.p.y,
                           point.x - cannon.p.x);
	    cannon.p.angle = angle * 180 / Math.PI;
	    e.preventDefault();
  	};
	
	function randomColor2() {
		var num = parseInt(randomNumber(1,3));
		var randomColor = "";

		if(num === 1) {
			randomColor = "red";
			Q.state.set("the_color", 1);
		}
		if(num === 2) {
			randomColor = "green";
			Q.state.set("the_color", 2);
		}
		if(num === 3) {
			randomColor = "blue";
			Q.state.set("the_color", 3);
		}
		return randomColor;
  	};
	
	function randomColor3() {
		var num = parseInt(randomNumber(1,3));
		var randomColor = "";

		if(num === 1) {
			randomColor = "red";
			Q.state.set("rnd_color_1", 1);
		}
		if(num === 2) {
			randomColor = "green";
			Q.state.set("rnd_color_1", 2);
		}
		if(num === 3) {
			randomColor = "blue";
			Q.state.set("rnd_color_1", 3);
		}
		return randomColor;
  	};
	
	function randomColor4() {
		do{
			var num = parseInt(randomNumber(1,3));
		}while(Q.state.get("rnd_color_1") == num)
			
		var randomColor = "";
		if(num === 1){
			randomColor = "red";
			Q.state.set("rnd_color_2", 1);
		}
		if(num === 2) {
			randomColor = "green";
			Q.state.set("rnd_color_2", 2);
		}
		if(num === 3) {
			randomColor = "blue";
			Q.state.set("rnd_color_2", 3);
		}
		return randomColor;
  	};
	
	function randomColor5() {
		// do{
			// var num = parseInt(randomNumber(1,3));
		// }while(Q.state.get("rnd_color_1") == num || Q.state.get("rnd_color_2") == num)
		var num = 3;
		
		var randomColor = "";

		if(num === 1) {
			randomColor = "red";
			Q.state.set("rnd_color_3", 1);
		}
		if(num === 2) {
			randomColor = "green";
			Q.state.set("rnd_color_3", 2);
		}
		if(num === 3) {
			randomColor = "blue";
			Q.state.set("rnd_color_3", 3);
		}
		return randomColor;
  	};
	
	function randomNumber(min,max) {
		return min + Math.random() * (max - min);
	}
	
    Q._each(["touchstart","mousemove","touchmove"],function(evt) {
        Q.wrapper.addEventListener(evt,cannonMove);
    },this);

	var canonFire=function(e) {
		Q.stage(0).cannon.fire();
   		e.preventDefault();
	}
	Q._each(["touchend","mouseup"],function(evt) {
		Q.wrapper.addEventListener(evt,canonFire);
	});
});

