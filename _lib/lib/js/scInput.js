var isEventSupported = (function(){
	var TAGNAMES = {
		'select':'input','change':'input',
		'submit':'form','reset':'form',
		'error':'img','load':'img','abort':'img'
	}
	function isEventSupported(eventName) {
		var el = document.createElement(TAGNAMES[eventName] || 'div');
		eventName = 'on' + eventName;
		var isSupported = (eventName in el);
		if (!isSupported) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] == 'function';
		}
		el = null;
		return isSupported;
	}
	return isEventSupported;
})();

function isMacOs() {
	//return navigator && navigator.appVersion && navigator.appVersion.indexOf('Mac') != -1;
	return false;
}

var _scOnInputSupport = isEventSupported('input');
var _scMacOs = isMacOs();

function scLoadScInput(elemSelector) {
	if (_scOnInputSupport && !_scMacOs) {
		$(elemSelector).scInput();
	}
	else {
		$(elemSelector).listen();
	}
}

var getStringCodePoints = (function() {
	function surrogatePairToCodePoint(charCode1, charCode2) {
		return ((charCode1 & 0x3FF) << 10) + (charCode2 & 0x3FF) + 0x10000;
	}
	return function(str) {
		var codePoints = [], i = 0, charCode;
		while (i < str.length) {
			charCode = str.charCodeAt(i);
			if ((charCode & 0xF800) == 0xD800) {
				codePoints.push(surrogatePairToCodePoint(charCode, str.charCodeAt(++i)));
			} else {
				codePoints.push(charCode);
			}
			++i;
		}
		return codePoints;
	}
})();