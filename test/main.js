var fs = require( 'fs' )
var assert = require( 'assert' )
var inspect = require( './inspect' )
var GPT = require( '../' )

describe( 'GUID Partition Table', function() {

  describe( 'BOOTCAMP', function() {

    const DATAPATH = __dirname + '/data/bootcamp.bin'
    var data = fs.readFileSync( DATAPATH )

    it( 'should be able to parse a BootCamp GPT', function() {
      var gpt = GPT.parse( data )
      inspect.log( gpt )
    })

    it( 'in/out buffer equality', function() {
      var gpt = GPT.parse( data )
      var buffer = gpt.write()
      assert.equal( data.length, buffer.length )
      assert.deepEqual( data, buffer )
    })

    it( 'verifies', function() {
      var gpt = GPT.parse( data )
      assert.ok( gpt.verify() )
    })

  })

  describe( 'RASPBERRY PI MBR', function() {

    const DATAPATH = __dirname + '/data/raspberry.bin'
    var data = fs.readFileSync( DATAPATH )

    it( 'should throw "Invalid Signature"', function() {
      assert.throws( function() {
        GPT.parse( data )
      })
    })

  })

})
