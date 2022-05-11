import Phaser from 'phaser'

export default class TilemapScene extends Phaser.Scene
{
	// constructor() 
	// {
	// 	super('tilemapscene')
	// }

	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	// private faune!: Phaser.GameObjects.Sprite
	private faune!: Phaser.Physics.Arcade.Sprite

	preload()
	{
		this.load.tilemapTiledJSON('tilemap', 'assets/superMap.json')
		this.load.image('tiles', 'assets/basictiles.png')

		this.load.atlas('faune', 'assets/fauna.png' ,'assets/fauna.json')

		this.cursors = this.input.keyboard.createCursorKeys()
	}

  create()
  {

		this.add.sprite(0, 0, 'char')

		const map = this.make.tilemap({ key: 'tilemap' })
		const tileset = map.addTilesetImage('basictiles', 'tiles')


		map.createLayer('ground', tileset)
		// map.createLayer('above', tileset)

		const wallsLayer = map.createLayer('above', tileset)

		wallsLayer.setCollisionByProperty({ collides: true })

		const debugGraphics = this.add.graphics().setAlpha(0.5)
		wallsLayer.renderDebug(debugGraphics, {
			tileColor: null,
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
			faceColor: new Phaser.Display.Color(40, 39, 37, 255)
		})

		this.faune = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png')
		this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.5)

		this.anims.create({
			key: 'faune-idle-down',
			frames: [{
				key: 'faune',
				frame: 'walk-down-3.png'
			}]
		})

		this.anims.create({
			key: 'faune-idle-up',
			frames: [{
				key: 'faune',
				frame: 'walk-up-3.png'
			}]
		})

		this.anims.create({
			key: 'faune-idle-side',
			frames: [{
				key: 'faune',
				frame: 'walk-side-3.png'
			}]
		})


		this.anims.create({
			key: 'faune-run-down',
			frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png'}),
			repeat: -1,
			frameRate: 15
		})

		this.anims.create({
			key: 'faune-run-up',
			frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png'}),
			repeat: -1,
			frameRate: 15
		})

		this.anims.create({
			key: 'faune-run-side',
			frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png'}),
			repeat: -1,
			frameRate: 15
		})


		this.faune.anims.play('faune-idle-down')

		this.physics.add.collider(this.faune, wallsLayer);
  }

	update(t: number, dt: number) 
	{
		if(!this.cursors || !this.faune) 
		{
			return
		} 

		const speed = 100

		if(this.cursors.left?.isDown)
		{
			this.faune.anims.play('faune-run-side', true)
			this.faune.setVelocity(-speed, 0)
			this.faune.scaleX = -1
			this.faune.body.offset.x = 24
		}
		else if(this.cursors.right?.isDown) 
		{
			this.faune.anims.play('faune-run-side', true)
			this.faune.setVelocity(speed, 0)
			this.faune.scaleX = 1
			this.faune.body.offset.x = 8
		}
		else if(this.cursors.up?.isDown) 
		{
			this.faune.anims.play('faune-run-up', true)
			this.faune.setVelocity(0, -speed)
		}
		else if(this.cursors.down?.isDown) 
		{
			this.faune.anims.play('faune-run-down', true)
			this.faune.setVelocity(0, speed)
		}
		else 
		{
			this.faune.play('faune-idle-down')
			this.faune.setVelocity(0, 0)
		} 
	}
}