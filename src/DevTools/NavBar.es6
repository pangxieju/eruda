import util from '../lib/util'

export default class NavBar extends util.Emitter
{
    constructor($el)
    {
        super();

        util.evalCss(require('./NavBar.scss'));

        this._$el = $el;
        $el.html('<ul></ul><div class="eruda-bottom-bar"></div>');
        this._$ul = $el.find('ul');
        this._$bottomBar = $el.find('.eruda-bottom-bar');
        this._len = 0;
        this._height = 55;

        this._bindEvent();
    }
    add(name)
    {
        let $bottomBar = this._$bottomBar;

        this._len++;
        this._$ul.prepend(`<li>${name}</li>`);
        $bottomBar.css('left', util.pxToNum($bottomBar.css('left')) + ITEM_WIDTH);
        this._resetStyle();
    }
    setHeight(height)
    {
        this._height = height;
        this._resetStyle();
    }
    activeTool(name)
    {
        let self = this;

        this._$ul.find('li').each(function (idx)
        {
            let $this = util.$(this);

            if ($this.text() === name)
            {
                $this.addClass('eruda-active');
                self._$bottomBar.css('left', ITEM_WIDTH * idx);
            } else
            {
                $this.rmClass('eruda-active');
            }
        });
    }
    _resetStyle()
    {
        let height = this._height;

        this._$el.css('height', height);
        this._$ul.css({width: this._len * ITEM_WIDTH});
        this._$ul.find('li').css({
            'height': height,
            'lineHeight': height
        });
    }
    _bindEvent()
    {
        let self = this;

        this._$ul.on('click', 'li', function ()
        {
            self.emit('showTool', util.$(this).text());
        });
    }
}

const ITEM_WIDTH = 69;
