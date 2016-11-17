/**
 * @author mrdoob / http://mrdoob.com/
 */

import { MMDLoader } from './loaders/MMDLoader.js';
import { OutlineEffect } from './effects/OutlineEffect.js';

import { ModelElement } from './model.js';
import { Box3, DirectionalLight } from './three.modules.js';

class MmdModelElement extends ModelElement {

	constructor() {

		super();

		var scope = this;

		scope.renderer = new OutlineEffect( scope.renderer );

		var light = new DirectionalLight( 0x888888 );
		light.position.set( 1, 1, 1 );
		scope.scene.add( light );

		var light = new DirectionalLight( 0x888888, 0.5 );
		light.position.set( - 1, - 1, - 1 );
		scope.scene.add( light );

		scope.cameraDistance = 1;

		function animate( time ) {

			time /= 2000;

			var distance = scope.cameraDistance / 2;

			scope.camera.position.x = Math.sin( time ) * distance;
			scope.camera.position.y = distance / 3;
			scope.camera.position.z = Math.cos( time ) * distance;
			scope.camera.lookAt( scope.scene.position );

			scope.renderer.render( scope.scene, scope.camera );

			requestAnimationFrame( animate );

		}

		requestAnimationFrame( animate );

	}

	static get observedAttributes() { return [ 'src' ]; }

	attributeChangedCallback( attribute, oldValue, newValue ) {

		var scope = this;

		if ( attribute === 'src' ) {

			new MMDLoader().loadModel( newValue, function ( object ) {

				object.position.y = -18;
				scope.cameraDistance = new Box3().setFromObject( object ).getSize().length();
				scope.scene.add( object );

			} );

		}

	}

}

customElements.define( 'model-mmd', MmdModelElement );
