(function ($) { 
  $.fn.YautoComplete = function (options) {//options 经常用这个表示有许多个参数。 
    var defaultVal = { 
        completeContainer: '',

    }; 
    　　　　　　//默认值 
    var obj = $.extend(defaultVal, options); 

    return this.each(function () 
    { 

      var selObject = $(this),//获取当前对象
          dataContainerObject = obj.completeContainer == 'parent'?selObject.parent().next():selObject.next(),
          value = selObject.attr('data-value-name');


      $(document).keyup(function(e)
      {
        if (e.keyCode == '13') //回车
        {
          var value = dataContainerObject.find('.inner a.selected span').text();

          selObject.val(value);
          dataContainerObject.html('<div class="inner"></div>');
        }

      });

      //-----
      selObject.bind('propertychange, keyup', function(e){
        
        if (e.keyCode == '38') //up
        {

          var itemObject = dataContainerObject.find('.inner a.selected').prev();
          if (itemObject.is('a'))
          {
            dataContainerObject.find('.inner a').removeClass('selected');
            itemObject.addClass('selected');
            selObject.val(itemObject.find('span').text());

          }
          
        }
        else if (e.keyCode == '40')//down
        {
          var itemObject = dataContainerObject.find('.inner a.selected').next();
          if (itemObject.is('a'))
          {
            dataContainerObject.find('.inner a').removeClass('selected');
            itemObject.addClass('selected');
            selObject.val(itemObject.find('span').text());

          }
        }
        else if (e.keyCode == '13')
        {

        }
        else
        {
          
          $.ajax({
            url: dataContainerObject.attr('data-url'),
            data:{
              value: selObject.val(),
              member_group_id: dataContainerObject.attr('data-param-member-group-id'),
            },
            success: function(res)
            {
              var tpl = '';
              if (res.code == 1)
              {
                var data = res.data;
                for (var i = 0; i < data.length; i++)
                {
                  if (i == 0) 
                    tpl += '<a href="javascript:;" data-id="'+ data[i].id +'" data-group="'+ data[i].member_group_id +'" class="item simple_tag block selected">['+ data[i].id +'] <span>'+ data[i][value] +'</span></a> ';
                  else
                    tpl += '<a href="javascript:;" data-id="'+ data[i].id +'" data-group="'+ data[i].member_group_id +'" class="item simple_tag block">['+ data[i].id +'] <span>'+ data[i][value] +'</span></a> ';
                  
                }

                
                
              }
              dataContainerObject.find('.inner').html(tpl);

              if (res.data.length)
              {
                dataContainerObject.find('.inner').slimscroll({ height: 400 });
              }
              else
              {
                dataContainerObject.html('<div class="inner"></div>');
              }
            }
          })

        }
        
      });

      dataContainerObject.delegate('.item', 'click', function(){
        var self = $(this),
          value = self.find('span').text();
        selObject.val(value);
        dataContainerObject.html('<div class="inner"></div>');


      });  
     
    }); 
  } 
})(jQuery); 