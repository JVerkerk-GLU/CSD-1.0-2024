function stateMachine() {
    this.map = new Map();
    this.current = null;
    
    this.Add = function(stateName, drawFn, clickFn) {
        if (!this.map.has(stateName))
            this.map.set(stateName, new state(drawFn, clickFn));
    }

    this.Draw = function() {
        if (this.current)
            this.current.Draw();
    }

    this.Click = function() {
        if (this.current)
            this.current.Click();
    }

    this.Goto = function(target) {
        if(this.map.has(target) && this.map.get(target))
        {
            this.current = this.map.get(target);
            this.current.Start();
        }
    }
}

function state(drawFn, clickFn) {
    this.initialized = false;
    this.draw_fn = drawFn;
    this.click_fn = clickFn;

    this.Start = function() {
        this.initialized = false;
    }

    this.Draw = function() {
        if (this.draw_fn)
            this.draw_fn(this.initialized);
        this.initialized = true;
    }

    this.Click = function() {
        if (this.click_fn)
            this.click_fn();
    }
}