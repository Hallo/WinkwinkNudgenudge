Crafty.scene('Game', function() {
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[this.player.at().x][this.player.at().y] = true;

  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge || Math.random() < 0.03 && !this.occupied[x][y]) {
        Crafty.e('Tree').at(x, y);
        console.log(x + ' tree ' + y)
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        Crafty.e('Bush').at(x, y);
        console.log(x + ' bush ' + y)
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.04 && !this.occupied[x][y]) {
        Crafty.e('Rock').at(x, y);
        console.log(x + ' rock ' + y)
        this.occupied[x][y] = true;
      }
    }
  }

  var max_villages = 1;
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      if (Math.random() < 0.02) {
        if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
          Crafty.e('Village').at(x, y);
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
              'assets/hunter.png',
              'assets/units/english_knight.png',
              'assets/units/french_soldier.png',
              'assets/units/english_knight_sprite2.png',
              'assets/door_knock_3x.mp3',
              'assets/door_knock_3x.ogg',
              'assets/door_knock_3x.aac'], function(){

    Crafty.sprite(32, 'assets/16x16_forest_3.png', {
      spr_tree:    [0, 0],
      spr_bush:    [1, 0],
      spr_village: [0, 1],
      spr_rock:    [1, 1]
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
