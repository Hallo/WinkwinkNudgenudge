Game = {
  map_grid: {
    width:  18,
    height: 18,
    tile: {
      width:  32,
      height: 32
    }
  },

  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  start: function() {
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(87, 109, 20)');

    Crafty.scene('Loading');
  }
}

$text_css = { 'font-size': '60px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' }
