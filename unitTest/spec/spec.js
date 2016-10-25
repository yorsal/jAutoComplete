describe("A spy with array", function() {
  
	var inputObj, inputObj2;
  

  beforeAll(function(done) {
  	jasmine.getFixtures().fixturesPath = '../unitTest/';
    loadFixtures('test.html');

    inputObj = $('.YautoComplete'),
	inputObj2 = $('.YautoComplete2');

    inputObj.YautoComplete({
		containerClass: 'demo',
		source: [{value: 111}, {value:2222}]
	});

    inputObj2.YautoComplete({
		containerClass: 'demo',
		source: function(){
			return {
				query: inputObj2.val()
			};
		},
		sourceUrl: '../data.php',
		sourceCallback: function(){
			
			done();
		}
	});

	var e = $.Event('keyup');
		inputObj2.val(1);
		e.which = 49; // 'input 1'
		inputObj2.trigger(e);

  	
	

	  
	  //console.log(inputObj.next().text());
  });
  
 
  it("tracks when type 1, it will a tag show and value be 111", function(done) {

  	var e = $.Event('keyup');
		inputObj.val(1);
		e.which = 49; // 'input 1'
		inputObj.trigger(e);
    expect(inputObj.next()).toContainElement('a');

    expect(inputObj.next().children().eq(0).text()).toEqual('111');

    done();
  });

  it("tracks when type 2, value be 2222", function(done) {
   	var e = $.Event('keyup');
		inputObj.val(2);
		e.which = 50; // 'input 2'
		inputObj.trigger(e);

    expect(inputObj.next().children().eq(0).text()).toEqual('2222');

    done();

    
  });

  it("tracks when type 1, it will a tag show and value be ", function(done) {

  	
  	
    expect(inputObj2.next()).toContainElement('a');

    expect(inputObj2.next().children().eq(0).text()).toEqual('1hello world');
    expect(inputObj2.next().children().eq(1).text()).toEqual('1hello bady');

  
    done();

    
  });


});

