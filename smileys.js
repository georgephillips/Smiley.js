(function ($) {
	var smileys = [
			":(",
			":)",
			":O",
			":D",
			":p",
			":*",
			":-)",
			":-(",
			":-O",
			":-D",
			";)",
			";-)",
			":P",
			"xD"
		],
		extras = {
			"<3": true,
			"&lt;3": true
		},
		smileParts = {
			"O": "middle-mouth",
			"D": "middle-mouth",
			"d": "middle-mouth",
			"p": "low-mouth",
			"*": "high-mouth",
			"-": "nose",
			"P": "middle-mouth"
		},
		oppositeSmileParts = {
			"p": "d",
			")": "(",
			"(": ")",
			"P": "d"
		},
		reverseSmileys = [];

	for (var i = 0; i < smileys.length; i++) {
		var reverse = "";
		for (var j = smileys[i].length - 1; j >= 0; j--) {
			var character = smileys[i][j];
			if (character in oppositeSmileParts) {
				reverse += oppositeSmileParts[smileys[i][j]];
			} else {
				reverse += smileys[i][j];
			}
		}
		reverseSmileys.push(reverse);
	}

	function toggleSmiley() {
		$(this).toggleClass("active");
	}

	function prepareSmileys(html) {
		for (var extra in extras) {
			html = checkForSmiley(html, extra, extras[extra]);
		}
		for (var i = smileys.length - 1; i >= 0; i--) {
			html = checkForSmiley(html, smileys[i], false);
		}
		for (var i = reverseSmileys.length - 1; i >= 0; i--) {
			html = checkForSmiley(html, reverseSmileys[i], true);
		}
		return html;
	}

	function checkForSmiley(html, smiley, isReverse) {
		var index = html.indexOf(smiley),
			replace = null;

		while (index >= 0) {
			if (replace === null) {
				replace = prepareSmiley(smiley, isReverse);
			}
			html = replaceString(html, replace, index, index + smiley.length);

		  	index = html.indexOf(smiley, index + replace.length);
		}
		return html;
	}

	function prepareSmiley(smiley, isReverse) {
		var html = '<span class="smiley-wrapper"><span class="smiley' + 
						(isReverse ? ' smiley-reverse' : '') + 
					'">';
		for (var i = 0; i < smiley.length; i++) {
			if (smiley[i] in smileParts) {
				html += '<span class="' + smileParts[smiley[i]] + '">' + smiley[i] + '</span>';
			} else {
				html += smiley[i];
			}
		};
		html += '</span></span>';
			return html;
	}

	function replaceString(string, replace, from, to) {
		return string.substring(0, from) + replace + string.substring(to);
	}

	function fixSmiles($el) {
		var smiles = prepareSmileys($el.html());
		$el.html(smiles);
	}

	$(document).on("click", ".smiley", toggleSmiley);

    $.fn.smilify = function() {
    	var $els = $(this).each(function () {
			fixSmiles($(this));
    	});
		setTimeout(function () {
			$els.find(".smiley").each(toggleSmiley);
		}, 20);
        return this;
    };
}(jQuery));