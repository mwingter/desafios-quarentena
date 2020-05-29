const TNT_SIZE = 30;

const MIN_TNT_SPEED_MULTIPLIER = 0.3;
const MAX_TNT_SPEED_MULTIPLIER = 0.1;

/**
* This is a class declaration
* This class is responsible for defining the TNT behavior
*
* This class extends the Entity class, which is responsible for binding the element's
* positons and directions. If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Tnt extends Entity {
	/**
	* Store all existing isntances of tnts, for easier tracking
	* @type { Tnt[] }
	*/
	static allTntElements = [];

	/**
	* @argument { HTMLDivElement } containerElement The HTML element in which the tnt should be created
	* @argument { Vector } initialPosition The initial position of the tnt
	*/
	constructor (
		containerElement,
		initialPosition,
	) {
		const size = TNT_SIZE;
		const direction = Vector.random;

		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, new Vector(1, 1).scale(size), initialPosition, direction);

		// Assigns the hook's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/tnt.png')";

		// Add element to tnt list, for easier tracking.
		Tnt.allTntElements.push(this);
	}

	/**
	* When this object is hooked, it should slow the hook down. This function will
	* tell the hook how much should it slow down.
	* @returns { number } A speed multiplier
	*/
	calculateHookSpeedMultiplier () {
		const sizePercentage = 50;
		const speedMultiplier = sizePercentage * (MAX_TNT_SPEED_MULTIPLIER - MIN_TNT_SPEED_MULTIPLIER) + MIN_TNT_SPEED_MULTIPLIER;
		return speedMultiplier;
	}

	/**
	* This method removes the Entity's element from the DOM, and the entities list
	* Note that this methods overrides the parent class's delete method. This is to
	* allow for behavior extension.
	*/
	delete () {
		// This is to call the parent class's delete method
		super.delete();

		// Here, we will find the index of the entity, and use it to remove the element from the
		// movableEntities array.
		// If you don't know how the splice method works, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
		// If you dont't know how the findIndex method works, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
		const index = Tnt.allTntElements.findIndex(e => e === this);
		if (index !== -1) Tnt.allTntElements.splice(index, 1);
	}
}