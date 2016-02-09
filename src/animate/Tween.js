(function(PIXI)
{
	var Tween = function(target, startProps, endProps, startFrame, duration, ease)
	{
		//target display object
		this.target = target;

		//properties at the start of the tween
		this.startProps = startProps;

		//properties at the end of the tween, as well as any properties that are set
		//instead of tweened
		this.endProps = {};
		var prop;

		//make a copy to safely include any unchanged values from the start of the tween
		for (prop in endProps)
		{
			this.endProps[prop] = endProps[prop];
			//for a synchronized movieclip, add additional data so we always know that it is correct
			if (prop == "p")
			{
				this.endProps.p.parentSP = startFrame;
			}
		}

		//copy in any starting properties don't change
		for (prop in startProps)
		{
			if (!this.endProps.hasOwnProperty(prop))
				this.endProps[prop] = startProps[prop];
		}
		//duration of tween in frames. For a keyframe with no tweening, the duration
		//will be 0.
		this.duration = duration;

		//the frame that the tween starts on
		this.startFrame = startFrame;

		//the frame that the tween ends on
		this.endFrame = startFrame + duration;

		//easing function to use, if any
		this.ease = ease;
	};

	// Reference to the prototype
	var p = Tween.prototype;

	//standard tweening
	function lerpValue(start, end, t)
	{
		return start + (end - start) * t;
	}

	//split r, g, b into separate values for tweening
	function lerpColor(start, end, t)
	{
		//split start color into components
		var sR = start >> 16 & 0xFF;
		var sG = start >> 8 & 0xFF;
		var sB = start & 0xFF;
		//split end color into components
		var eR = end >> 16 & 0xFF;
		var eG = end >> 8 & 0xFF;
		var eB = end & 0xFF;
		//lerp red
		var r = sR + (eR - sR) * percent;
		//clamp red to valid values
		if (r < 0)
			r = 0;
		else if (r > 255)
			r = 255;
		//lerp green
		var g = sG + (eG - sG) * percent;
		//clamp green to valid values
		if (g < 0)
			g = 0;
		else if (g > 255)
			g = 255;
		//lerp blue
		var b = sB + (eB - sB) * percent;
		//clamp blue to valid values
		if (b < 0)
			b = 0;
		else if (b > 255)
			b = 255;

		var combined = (r << 16) | (g << 8) | b;
		return combined;
	}

	var PI = Math.PI;
	var TWO_PI = PI * 2;

	//handle 355 -> 5 degrees only going through a 10 degree change instead of
	//the long way around
	//Math from http://stackoverflow.com/a/2708740
	function lerpRotation(start, end, t)
	{
		var difference = Math.abs(end - start);
		if (difference > PI)
		{
			// We need to add on to one of the values.
			if (end > start)
			{
				// We'll add it on to start...
				start += TWO_PI;
			}
			else
			{
				// Add it on to end.
				end += PI + TWO_PI;
			}
		}

		// Interpolate it.
		var value = (start + ((end - start) * t));

		// wrap to 0-2PI
		/*if (value >= 0 && value <= TWO_PI)
			return value;
		return value % TWO_PI;*/

		//just return, as it's faster
		return value;
	}

	Tween.propDict = {
		//position
		x: lerpValue,
		y: lerpValue,
		//scale
		sx: lerpValue,
		sy: lerpValue,
		//skew
		kx: lerpValue,
		ky: lerpValue,
		//rotation
		r: lerpRotation,
		//alpha
		a: lerpValue,
		//tinting
		t: lerpColor,
		//values to be set
		v: null, //visible
		m: null, //mask
		g: null, //not sure if we'll actually handle graphics this way?
		p: null // (Flash) Graphic position/mode
	};

	p.setPosition = function(currentFrame)
	{
		//if this is a single frame with no tweening, or at the end of the tween, then
		//just speed up the process by setting values
		if (currentFrame >= this.endFrame)
		{
			this.setToEnd();
			return;
		}

		var time = (currentFrame - this.startFrame) / this.duration;
		if (this.ease)
			time = this.ease(time);
		var startProps = this.startProps;
		var endProps = this.endProps;
		for (var prop in endProps)
		{
			var lerp = Tween.propDict[prop];
			if (lerp)
				setPropFromShorthand(target, prop, lerp(startProps[prop], endProps[prop], time));
		}
	};

	p.setToEnd = function()
	{
		var endProps = this.endProps;
		for (var prop in endProps)
		{
			setPropFromShorthand(target, prop, endProps[prop]);
		}
	};

	function setPropFromShorthand(target, prop, value)
	{
		switch (prop)
		{
			case "x":
				target.position.x = value;
				break;
			case "y":
				target.position.y = value;
				break;
			case "sx":
				target.scale.x = value;
				break;
			case "sy":
				target.scale.y = value;
				break;
			case "kx":
				target.skew.x = value;
				break;
			case "ky":
				target.skew.y = value;
				break;
			case "r":
				target.rotation = value;
				break;
			case "a":
				target.alpha = value;
				break;
			case "t":
				target.tint = value;
				break;
			case "v":
				target.visible = value;
				break;
			case "m":
				target.mask = value;
				break;
				//g: null,//not sure if we'll actually handle graphics this way?
			case "p":
				if (value)
				{
					target.mode = value.m;
					target.startPosition = value.sp;
					target.parentStartPosition = value.parentSP;
					if (target.mode == 1) //MovieClip.SINGLE_FRAME
					{
						target.gotoAndStop(target.startPosition);
					}
				}
				else
				{
					//clear target mode/start position (make it an independent movieclip)
					target.mode = 0; //MovieClip.INDEPENDENT
					target.startPosition = -1;
					target.parentStartPosition = -1;
				}
				break;
		}
	}


	// Assign to namespace
	PIXI.animate.Tween = Tween;

}(PIXI));