Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    })
  },

    at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, spr_tree');
  },
});

Crafty.c('Bush', {
  init: function() {
    this.requires('Actor, Solid, spr_fsoldier');
  },
});

Crafty.c('Rock', {
  init: function() {
    this.requires('Actor, Solid, spr_knight');
  },
});

Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
      .fourway(1)
      .stopOnSolids()
      .onHit('Village', this.visitVillage)
      .reel('PlayerMovingDown', 1000, 0, 0, 3)
      .reel('PlayerMovingRight', 1000, 0, 2, 3)
      .reel('PlayerMovingUp', 1000, 0, 1, 3)
      .reel('PlayerMovingLeft', 1000, 0, 3, 3);

    this.bind('NewDirection', function(data) {
      if (data.x > 0) {
        this.animate('PlayerMovingRight', -1);
      } else if (data.x < 0) {
        this.animate('PlayerMovingLeft', -1);
      } else if (data.y > 0) {
        this.animate('PlayerMovingDown', -1);
      } else if (data.y < 0) {
        this.animate('PlayerMovingUp', -1);
      } else {
        this.pauseAnimation();
      }
    });
  },

  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);
    return this;
  },

  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  visitVillage: function(data) {
    villlage = data[0].obj;
    villlage.visit();
  }
});

Crafty.c('Village', {
  init: function() {
    this.requires('Actor, spr_village');
  },

    visit: function() {
    this.destroy();
    Crafty.trigger('VillageVisited', this);
  }
});
