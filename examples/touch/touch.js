// # Qeintus Touch and Drag Example
//
// [Run the example](../quintus/examples/touch/index.html)
//
// This example creates a number of random convex shapes 
// and then adds touch and drag support to them.
window.addEventListener('load',function() {


  // Set up a standard Quintus instance with only the 
  // Sprites and Scene module (for the stage support) loaded.
  var Q = window.Q = Quintus().include("Sprites, Scenes, Input, Touch, UI");
  Q.setup({ maximize: true })
       .controls(true)
      .touch(Q.SPRITE_ALL);
  // Sprite class for the randomly shapes
  //
  //
  //
Q.Sprite.extend("Player",{
  init: function(p) {
    this._super(p, {
      strength: 100,
      score: 0,
    });
  }
});



Q.Sprite.extend("Ball",{
  init:function(p) {
    this._super(p,{
      asset: "ball.png",
      color: "bla     ck",
      x:Math.random()*Q.width,
      y:Math.random()*Q.height,
      h:60,
      w:60,
      vx: 50,
      vy: -400,

    }); 

     this.on("drag");
     this.on("touchEnd");
  },

    drag: function(touch) {
       this.p.dragging = true;
       //this.destroy()
       //this.p.x = touch.origX + touch.dx;
       //
       //this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
        //eliminate shape
        this.destroy()
//        stage.options.score+=1
     },
step: function(dt) {
        // Falling and rolling functions
        this.p.y +=  ( Math.floor((Math.random() * 5) + 1)) ;
        this.p.angle += 2 ;

        
        if(this.p.over) { 
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

        // Respawn from top
        if(this.p.y>Q.height) {
            this.p.y=0;
            Q("Player").p.strength-10;
        }
                

     }
  });


Q.Sprite.extend("Ball",{
  init:function(p) {
    this._super(p,{
      asset: "ball2.png",
      color: "black",
      x:Math.random()*Q.width,
      y:Math.random()*Q.height,
      h:60,
      w:60

    }); 

     this.on("drag");
     this.on("touchEnd");
  },

    drag: function(touch) {
       this.p.dragging = true;
       //this.destroy()
       //this.p.x = touch.origX + touch.dx;
       //
       //this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
        //eliminate shape
        this.destroy()
//        stage.options.score+=1
     },
step: function(dt) {
        // Falling and rolling functions
        this.p.y +=  ( Math.floor((Math.random() * 5) + 1)) ;
        this.p.angle += 2 ;

        
        if(this.p.over) { 
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

        // Respawn from top
        if(this.p.y>Q.height) {
            this.p.y=0;
            Q("Player").p.strength-10;
        }
                

     }
  });

/*
Q.load(["ball2.png"],function() {
  var ball = new Q.Ball();
  Q.gameLoop(function(dt) {
    ball.update(dt);
    Q.clear();
    ball.render(Q.ctx);
  });
});
*/

Q.Sprite.extend("Rectangle",{
  init:function(p) {
    this._super(p,{
      //asset: "ball.png",
      color: "black",
      x:Math.random()*Q.width,
      y:Math.random()*Q.height,
      h:50,
      w:80,
      vx: 50,
      vy: -400,

    }); 

     this.on("drag");
     this.on("touchEnd");
  },

    drag: function(touch) {
       this.p.dragging = true;
       //this.destroy()
       //this.p.x = touch.origX + touch.dx;
       //
       //this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
        //eliminate shape
        this.destroy()
//        stage.options.score+=1
     },
step: function(dt) {
        // Falling and rolling functions
        this.p.y +=  ( Math.floor((Math.random() * 5) + 1)) ;
        this.p.angle += 2 ;

        
        if(this.p.over) { 
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

        // Respawn from top
        if(this.p.y>Q.height) {
            this.p.y=0;
            Q("Player").p.strength-10;
        }
                

     }
  });


Q.Sprite.extend("Square",{
  init: function(p) {
    this._super(p,{
      color: "red",
      w: 50,
      h: 50,
      x:Math.random()*Q.width,
      y:Math.random()*Q.height

    });
     this.on("drag");
     this.on("touchEnd");
  },
    drag: function(touch) {
       this.p.dragging = true;
       //this.destroy()
       //this.p.x = touch.origX + touch.dx;
       //
       //this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
        //eliminate shape
        console.log(this.p.n);
        this.destroy();
//        stage.options.score+=1
     },
step: function(dt) {
        // Falling and rolling functions
        this.p.y +=  ( Math.floor((Math.random() * 5) + 1)) ;
        this.p.angle += 2 ;

        
        if(this.p.over) { 
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

        // Respawn from top
        if(this.p.y>Q.height) {
            this.p.y=0;
            Q("Player").p.strength-10;
        }
                

     }
  });


  Q.Sprite.extend("RandomShape", {
     init: function(p) {
       n = Math.floor(Math.random()*3)+1;
      
      if (n==1) {
       this._super(p,{
      color: "red",
      w: 50,
      h: 50,
      x:Math.random()*Q.width,
      y:Math.random()*Q.height,
      n:n

    });

     }
     else if (n==2) {
       this._super(p,{
      //asset: "ball.png",
      color: "black",
      x:Math.random()*Q.width,
      y:Math.random()*Q.height,
      h:50,
      w:80,
      vx: 50,
      vy: -400,
      n:n

    }); 
      
      } 
      else if (n==3) { 
 // Create a random shape (defined below)
      p =this.createShape(p);
       this._super(p);
      }
      // Initialize the p hash
      

       // Listen for a drag events, sent by the
       // touch module
       this.on("drag");
       this.on("touchEnd");
     },

     drag: function(touch) {
       this.p.dragging = true;
       //this.destroy()
       //this.p.x = touch.origX + touch.dx;
       //
       //this.p.y = touch.origY + touch.dy;
     },

     touchEnd: function(touch) {
       this.p.dragging = false;
        //eliminate shape
        this.destroy();

        console.log(""+this.p.n);

       // console.log(""+Q.stageScene("hud").items[0].p.strength);
        //Q.stageScene("hud").items[0].p.strength=Q.stageScene("hud").items[0].p.strength-10
//        stage.options.score+=1
     },

     createShape: function(p) {
        var angle = Math.random()*2*Math.PI,
            numPoints = 3 ,
            minX = 0, maxX = 0,
            minY = 0, maxY = 0,
            curX, curY,
            dy = -10
        p = p || {};
        p.points = [];
        x: 0; 
        y: 300;
        vx: 50;
        vy: -400;
       var startAmount = 40;

        for(var i = 0;i < numPoints;i++) {
          curX = Math.floor(Math.cos(angle)*startAmount);
          curY = Math.floor(Math.sin(angle)*startAmount);
          
          if(curX < minX) minX = curX;
          if(curX > maxX) maxX = curX;

          if(curY < minY) minY = curY;
          if(curY > maxY) maxY = curY;

          p.points.push([curX,curY]);

          startAmount += Math.floor(Math.random()*10);
          angle += (Math.PI * 2) / (numPoints+1);
        };


        maxX += 30;
        minX -= 30;
        maxY += 30;
        minY -= 30;

        p.w = maxX - minX;
        p.h = maxY - minY;

        for(var i = 0;i < numPoints;i++) {
          p.points[i][0] -= minX + p.w/2;
          p.points[i][1] -= minY + p.h/2;
        }


        p.x = Math.random()*Q.width;
        p.y = Math.random()*Q.height;
        p.cx = p.w/2;
        p.cy = p.h/2;
        p.angle = angle;
        p.type = 1;
        p.vx=50;
        p.vy=-400;
       
       return p;
       
               },



     // If the mousemove event below sets the
     // hit variable, scale this sucker up a bit.
     //
     // Also move to avoid collisions with any other sprites
    
    step: function(dt) {
        // Falling and rolling functions
        this.p.y +=  ( Math.floor((Math.random() * 5) + 1)) ;
        this.p.angle += 2 ;

        
        if(this.p.over) { 
         this.p.scale = 1.2;
       } else {
         this.p.scale = 1.;
       }

        // Respawn from top
        if(this.p.y>Q.height) {
            this.p.y=0;
          
        }
                

      var maxCol = 3, collided = false, p = this.p;
      p.hit = false;
      while((collided = this.stage.search(this)) && maxCol > 0) {
        if(collided) {
          // If we're dragging, move other objects
          // otherwise, move us
          if(this.p.dragging) { 
            collided.obj.p.x += collided.separate[0] + Math.floor((Math.random() * 3) + 1);
            collided.obj.p.y += collided.separate[1] + Math.floor((Math.random() * 3) + 1);
          } else {
            this.p.x -= collided.separate[0] + Math.floor((Math.random() * 3) + 1) ;
            this.p.y -= collided.separate[1] + Math.floor((Math.random() * 3) + 1);
          }
        }
        maxCol--;
      }


     }


  });

  // Number of shapes to add to the page
  var numShapes = 10;

Q.scene('hud',function(stage) {
  var player1= stage.insert(new Q.Player());
  
  var container = stage.insert(new Q.UI.Container({
    x: 50, y: 0
  }));

  var label = container.insert(new Q.UI.Text({x:20, y: 60,
    label: "Score: "+ player1.p.score, color: "red" }));


  var strength = container.insert(new Q.UI.Text({x:20, y: 20,
    label: "Health: " +player1.p.strength+ '%', color: "red" }));

  container.fit(60);
});

  // Scene that actually adds shapes onto the stage 
 Q.scene("start",new Q.Scene(function(stage) {
   var shapesLeft = numShapes;

   while(shapesLeft-- > 0) {
      stage.insert(new Q.RandomShape());
     // stage.insert(new Q.Square());
     // stage.insert(new Q.Rectangle());

     // stage.insert(new Q.Ball());
      
    }
  }));

  // Finally call `stageScene` to start the show
  Q.stageScene("start");
 // Q.stageScene('hud',3);

 Q.stageScene('hud', 3);
  // Render the elements
  // Turning Q.debug and Q.debugFill on will render
  // the sprites' collision meshes, which is all we want
  // in this situation, otherwise nothing would get rendered
  Q.debug = true;
  Q.debugFill = true;

  var currentObj = null;
  // Touch events do most of the work for us, but the
  // touch system doesn't handle mousemouse events, so lets add
  // in an event listener and use `Stage.locate` to highlight
  // sprites on desktop.
  Q.el.addEventListener('mousemove',function(e) {
    var x = e.offsetX || e.layerX,
        y = e.offsetY || e.layerY,
        stage = Q.stage();

    // Use the helper methods from the Input Module on Q to
    // translate from canvas to stage
    var stageX = Q.canvasToStageX(x, stage),
        stageY = Q.canvasToStageY(y, stage);

    // Find the first object at that position on the stage
    var obj = stage.locate(stageX,stageY);

    
    // Set a `hit` property so the step method for the 
    // sprite can handle scale appropriately
    if(currentObj) { currentObj.p.over = false; }
    if(obj) {
      currentObj = obj;
      obj.p.over = true;
    }
  });

});

