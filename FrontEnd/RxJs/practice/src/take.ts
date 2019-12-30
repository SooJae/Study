import { Observable, fromEvent } from "rxjs";
import {} from 'rxjs/operators';

function(button) {
	var buttonClicks = fromEvent(button, "click");

	// Use take() to listen for only one button click
	// and unsubscribe.
	buttonClicks.
		// Insert take() call here
		forEach(function(clickEvent) {
			alert("Button was clicked once. Stopping Traversal.");
		});
}
		