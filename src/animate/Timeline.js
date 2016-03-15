/**
 * @module PixiAnimate
 * @namespace PIXI.animate
 */
(function(PIXI)
{
	// Import libraries
	var Tween = PIXI.animate.Tween;

	// constructor
	/**
	 * The Timeline class represents a
	 * @class Timeline
	 * @param {DisplayObject} Target The target for this string of tweens.
	 * @extends Array
	 * @constructor
	 **/
	function Timeline(target)
	{
		Array.call(this);

		// public properties:
		/**
		 * The target DisplayObject.
		 * @property target
		 * @type DisplayObject
		 **/
		this.target = target;

		/**
		 * Current properties in the tween, to make building the timeline more
		 * efficient.
		 * @property _currentProps
		 * @type Object
		 * @private
		 **/
		this._currentProps = {};
	}

	var p = Timeline.prototype = Object.create(Array.prototype);

	// public methods:
	/**
	 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the normal ticking system)
	 * and managed by this timeline. Adding a tween to multiple timelines will result in unexpected behaviour.
	 * @method addTween
	 * @param tween The tween(s) to add. Accepts multiple arguments.
	 * @return Tween The first tween that was passed in.
	 **/
	p.addTween = function(instance, properties, startFrame, duration, ease)
	{
		//ownership of startProps is passed to the new Tween - this object should not be reused
		var startProps = {};
		var prop;
		//figure out what the starting values for this tween should be
		for (prop in properties)
		{
			//if we have already set that property in an earlier tween, use the ending value
			if (this._currentProps.hasOwnProperty(prop))
				startProps[prop] = this._currentProps[prop];
			//otherwise, get the current value
			else
			{
				var startValue = startProps[prop] = getPropFromShorthand(instance, prop);
				//go through previous tweens to set the value so that when the timeline loops
				//around, the values are set properly - having each tween know what came before
				//allows us to set to a specific frame without running through the entire timeline
				for (var i = this.length - 1; i >= 0; --i)
				{
					this[i].startProps[prop] = startValue;
					this[i].endProps[prop] = startValue;
				}
			}
		}
		//create the new Tween and add it to the list
		var tween = new Tween(instance, startProps, properties, startFrame, duration, ease);
		this.push(tween);
		//update starting values for the next tween - if tweened values included "p", then Tween
		//parsed that to add additional data that is required
		properties = tween.endProps;
		for (prop in properties)
		{
			this._currentProps[prop] = properties[prop];
		}
	};

	function getPropFromShorthand(target, prop)
	{
		switch (prop)
		{
			case "x":
				return target.position.x;
			case "y":
				return target.position.y;
			case "sx":
				return target.scale.x;
			case "sy":
				return target.scale.y;
			case "kx":
				return target.skew.x;
			case "ky":
				return target.skew.y;
			case "r":
				return target.rotation;
			case "a":
				return target.alpha;
			case "v":
				return target.visible;
			case "m":
				return target.mask;
				// case "t":
				//   return target.tint;
				// case "c": 
				//   return target.colorTransform;
				//not sure if we'll actually handle graphics this way?
				//g: return null;
		}
		return null;
	}

	// Assign to namespace
	PIXI.animate.Timeline = Timeline;

}(PIXI));