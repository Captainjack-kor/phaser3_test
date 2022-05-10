import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload()
  {
    // load the PNG file
    ///Users/Jack/basictiles.tsx
    this.load.image('basictiles', 'assets/mapTest.png')

    // load the JSON file
    this.load.tilemapTiledJSON('tilemap', 'assets/mapTest.json')
  }

  create()
  {
    // 👌 sanity check by displaying the entire tileset image
    this.add.image(0, 0, 'basictiles')
  }
}