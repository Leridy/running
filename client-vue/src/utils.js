function hasClass(elements, cName) {
	return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
};
exports.addClass = function(elements, cName) {
	if (!hasClass(elements, cName)) {
		elements.className += " " + cName;
	};
}
exports.removeClass = function(elements, cName) {
	if (hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
	};
}