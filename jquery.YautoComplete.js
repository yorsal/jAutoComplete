/**
 * autocomplete 
 * @param  {object} options
 *   {string} containerClass  
 *   {string} selectedClass 
 *   {array} source 
 *   {string} sourceUrl 
 *   {string} itemTag 
 *   {number} bounce 
 * @author  yorsal
 */
;(function($) {

    $.fn.YautoComplete = function(options) {
        var defaultVal = {

            containerClass: '',
            selectedClass: 'selected',
            source: [],
            sourceUrl: 'data.php',
            sourceCallback: function(){},
            itemTag: 'a',
            bounce: 300
        };　　
        var options = $.extend(defaultVal, options),
            timer;

        /**
         * initialize the layout.
         * @param  {object} self
         * @return 
         */
        function init(self) 
        {

            var containerTpl = $('<div class="' + options.containerClass + '"></div>');

            self.parent().css({
                position: 'relative'
            });

            containerTpl.css({
                position: 'absolute',
                width: '100%',
                top: self.outerHeight()
            });


            self.after(containerTpl);


        }

        function keyEnterHandler(self) 
        {
            var container = self.next(),
                value = container.find('.' + options.selectedClass).text();
            self.val(value);
            container.html('');
        }

        function keyUpDownHandler(self, item) 
        {

            if (item.is(options.itemTag))
            {
                var container = self.next();

                container.find('.' + options.selectedClass).removeClass('selected');

                item.addClass('selected');

                self.val(item.text());

            }

        }

        function renderList(self) 
        {
            var tpl = '',
                container = self.next(),
                source = options.source;

            clearTimeout(timer);

            if ($.trim(self.val()) != '') {
                if ($.isFunction(source)) {

                    timer = setTimeout(function() {

                        $.ajax({
                            dataType: 'json',
                            url: options.sourceUrl,
                            data: source(),
                            success: function(res) {
                                renderHandle(res, self);
                                source();
                                options.sourceCallback();
                            }
                        });
                    }, options.bounce);

                } else if ($.isArray(source)) {
                    renderHandle(source, self, true);
                }

            } else {
                container.html('');
            }


        }

        function renderHandle(data, self, searchFlag) 
        {

            var tpl = '',
                index = 0,
                inputValue = self.val(),
                container = self.next();

            for (var i = 0; i < data.length; i++) {
                var dataValue = data[i].value + '';

                if (searchFlag) 
                {
                    if (dataValue.indexOf(inputValue) != -1) 
                    {
                        var selectedClass = '';
                        if (index == 0) selectedClass = options.selectedClass;
                        tpl += '<' + options.itemTag + ' class="' + selectedClass + '">' + dataValue + '</' + options.itemTag + '>';
                        index++;
                    }

                } 
                else 
                {
                    var selectedClass = '';
                    if (i == 0) selectedClass = options.selectedClass;
                    tpl += '<' + options.itemTag + ' class="' + selectedClass + '">' + dataValue + '</' + options.itemTag + '>';
                }
            }
            container.html(tpl);
        }

        return this.each(function() {


            var self = $(this);

            init(self);

            $(document).on('keyup', function(e) {
                if (e.which == 13) 
                { //回车
                    keyEnterHandler(self);
                }
            });

            self.on('propertychange, keyup', function(e) { //绑定input输入事件
                //console.log(e.which);
                if (e.which == 38) 
                { //up
                    keyUpDownHandler(self, self.next().find('.' + options.selectedClass).prev());
                } 
                else if (e.which == 40) 
                { //down
                    keyUpDownHandler(self, self.next().find('.' + options.selectedClass).next());
                } 
                else if (e.which == 13) //回车
                {
                    return;
                } 
                else //render
                {
                    renderList(self);
                }

            });

            self.next().on('click', ' > ', function() { //绑定
                var value = $(this).text();
                self.val(value);
                self.next().html('');
            });




        });
    }


})(jQuery);