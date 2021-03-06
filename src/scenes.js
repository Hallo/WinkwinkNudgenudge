Crafty.scene('Game', function() {
  var level_1 =
"++++++++++++++++++,\
+                +,\
+    H      RRR  +,\
+           R    +,\
+++++++++++++  --+,\
+  P  +     +    +,\
+     +  F  +--  +,\
+     +  F  +    +,\
+     +  F  +  --+,\
+     +  F  +    +,\
+     +     +--  +,\
+     +     +    +,\
+     +     +  --+,\
+     +     +    +,\
+     +++++++--  +,\
+M               +,\
+                +,\
++++++++++++++++++".split(',');

  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (x < level_1.length && y < level_1[x].length){
        if (level_1[y][x] === '+') {
          Crafty.e('Tree').at(x, y);
        } else if (level_1[y][x] === 'H') {
          Crafty.e('Village').at(x, y);
        } else if (level_1[y][x] === 'P') {
          this.player = Crafty.e('PlayerCharacter').at(x, y);
        } else if (level_1[y][x] === 'R') {
          Crafty.e('Rock').at(x, y);
        } else if (level_1[y][x] === '-') {
          Crafty.e('Bush').at(x, y);
        } else if (level_1[y][x] === 'F') {
          Crafty.e('Fsoldier').at(x, y);
        } else if (level_1[y][x] === 'M') {
          Crafty.e('Hamster').at(x, y);
        }
      }
    }

  }

  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('VillageVisited');
});


Crafty.scene('Victory', function() {
  Crafty.e('2D, DOM, Text')
    .attr({ x: Game.width()/2 - 256, y: Game.height()/2-128, w: Game.width() })
    .textFont({ size: '100px', weight: 'bold', type: 'italic' })
    .textFont({family: 'Arial'})
    .text('Victory!');

  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  this.unbind('KeyDown');
});

Crafty.scene('Loading', function(){
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);

  Crafty.load(['assets/16x16_forest_3.png',
              'assets/objects/tree.jpg',
              'assets/objects/rock.jpg',
              'assets/objects/bush.jpg',
              'assets/hunter.png',
              'assets/units/english_knight.png',
              'assets/units/french_soldier.png',
              'assets/units/english_knight_sprite2.png',
              'assets/door_knock_3x.mp3',
              'assets/door_knock_3x.ogg',
              'assets/door_knock_3x.aac'], function(){

    Crafty.sprite(32, 'assets/objects/tree.jpg', {
      spr_tree: [0, 0]
    });

    Crafty.sprite(32, 'assets/objects/bush.jpg', {
      spr_bush: [0, 0]
    });

    Crafty.sprite(32, 'assets/objects/rock.jpg', {
      spr_rock: [0, 0]
    });

    Crafty.sprite(32, 'assets/objects/elder.jpg', {
      spr_village: [0, 0]
    });

    Crafty.sprite(64, 'assets/objects/hamster.jpg', {
      spr_hamster: [0, 0]
    });

    Crafty.sprite(32, 'assets/units/english_knight.png', {
      spr_knight:  [0, 0]
    });

    Crafty.sprite(32, 'assets/units/french_soldier.png', {
      spr_fsoldier:  [0, 0]
    });

    Crafty.sprite(32, 'assets/units/english_knight_sprite2.png', {
      spr_player: [1, 0]
    }, 0, 2);

     Crafty.audio.add({
      knock: ['assets/door_knock_3x.mp3',
              'assets/door_knock_3x.ogg',
              'assets/door_knock_3x.aac']
    });

    Crafty.scene('Game');
  })
});
