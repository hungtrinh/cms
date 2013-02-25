/*1320699949,176832694*/

if (window.CavalryLogger) {
	CavalryLogger.start_js([ "CMl8d" ]);
}

if (!window.FB)
	window.FB = {
		_apiKey : null,
		_session : null,
		_userStatus : 'unknown',
		_logging : true,
		_inCanvas : ((window.location.search.indexOf('fb_sig_in_iframe=1') > -1)
				|| (window.location.search.indexOf('session=') > -1)
				|| (window.location.search.indexOf('signed_request=') > -1)
				|| (window.name.indexOf('iframe_canvas') > -1) || (window.name
				.indexOf('app_runner') > -1)),
		_https : (window.name.indexOf('_fb_https') > -1),
		_domain : {
			api : 'https://api.facebook.com/',
			api_read : 'https://api-read.facebook.com/',
			cdn : 'http://static.ak.fbcdn.net/',
			https_cdn : 'https://s-static.ak.fbcdn.net/',
			graph : 'https://graph.facebook.com/',
			staticfb : 'http://static.ak.facebook.com/',
			https_staticfb : 'https://s-static.ak.facebook.com/',
			www : 'http://www.facebook.com/',
			https_www : 'https://www.facebook.com/',
			m : 'http://m.facebook.com/',
			https_m : 'https://m.facebook.com/'
		},
		_locale : null,
		_localeIsRtl : false,
		getDomain : function(a) {
			switch (a) {
			case 'api':
				return FB._domain.api;
			case 'api_read':
				return FB._domain.api_read;
			case 'cdn':
				return (window.location.protocol == 'https:' || FB._https) ? FB._domain.https_cdn
						: FB._domain.cdn;
			case 'cdn_foreign':
				return FB._domain.cdn_foreign;
			case 'https_cdn':
				return FB._domain.https_cdn;
			case 'graph':
				return FB._domain.graph;
			case 'staticfb':
				return (document.referrer.indexOf('https:') == 0 || FB._https) ? FB._domain.https_staticfb
						: FB._domain.staticfb;
			case 'https_staticfb':
				return FB._domain.https_staticfb;
			case 'www':
				return (window.location.protocol == 'https:' || FB._https) ? FB._domain.https_www
						: FB._domain.www;
			case 'https_www':
				return FB._domain.https_www;
			case 'm':
				return (window.location.protocol == 'https:' || FB._https) ? FB._domain.https_m
						: FB._domain.m;
			case 'https_m':
				return FB._domain.https_m;
			}
		},
		copy : function(d, c, b, e) {
			for ( var a in c)
				if (b || typeof d[a] === 'undefined')
					d[a] = e ? e(c[a]) : c[a];
			return d;
		},
		create : function(c, h) {
			var e = window.FB, d = c ? c.split('.') : [], a = d.length;
			for ( var b = 0; b < a; b++) {
				var g = d[b];
				var f = e[g];
				if (!f) {
					f = (h && b + 1 == a) ? h : {};
					e[g] = f;
				}
				e = f;
			}
			return e;
		},
		provide : function(c, b, a) {
			return FB.copy(typeof c == 'string' ? FB.create(c) : c, b, a);
		},
		guid : function() {
			return 'f'
					+ (Math.random() * (1 << 30)).toString(16).replace('.', '');
		},
		log : function(a) {
			if (FB._logging)
				if (window.Debug && window.Debug.writeln) {
					window.Debug.writeln(a);
				} else if (window.console)
					window.console.log(a);
			if (FB.Event)
				FB.Event.fire('fb.log', a);
		},
		$ : function(a) {
			return document.getElementById(a);
		}
	};
FB.provide('Intl', {
	_punctCharClass : ('[' + '.!?' + '\u3002' + '\uFF01' + '\uFF1F' + '\u0964'
			+ '\u2026' + '\u0EAF' + '\u1801' + '\u0E2F' + '\uFF0E' + ']'),
	_endsInPunct : function(a) {
		if (typeof a != 'string')
			return false;
		return a.match(new RegExp(FB.Intl._punctCharClass + '[' + ')"' + "'"
				+ '\u00BB' + '\u0F3B' + '\u0F3D' + '\u2019' + '\u201D'
				+ '\u203A' + '\u3009' + '\u300B' + '\u300D' + '\u300F'
				+ '\u3011' + '\u3015' + '\u3017' + '\u3019' + '\u301B'
				+ '\u301E' + '\u301F' + '\uFD3F' + '\uFF07' + '\uFF09'
				+ '\uFF3D' + '\s' + ']*$'));
	},
	_tx : function(d, a) {
		if (a !== undefined)
			if (typeof a != 'object') {
				FB.log('The second arg to FB.Intl._tx() must be an Object for '
						+ 'tx(' + d + ', ...)');
			} else {
				var c;
				for ( var b in a)
					if (a.hasOwnProperty(b)) {
						if (FB.Intl._endsInPunct(a[b])) {
							c = new RegExp('\{' + b + '\}'
									+ FB.Intl._punctCharClass + '*', 'g');
						} else
							c = new RegExp('\{' + b + '\}', 'g');
						d = d.replace(c, a[b]);
					}
			}
		return d;
	},
	tx : function(b, a) {
		function c(e, d) {
			void (0);
		}
		if (!FB.Intl._stringTable)
			return null;
		return FBIntern.Intl._tx(FB.Intl._stringTable[b], a);
	}
});
function AppUseTracker() {
	if (!AppUseTracker.instance)
		AppUseTracker.instance = this;
	return AppUseTracker.instance;
}
copy_properties(AppUseTracker.prototype, {
	instance : null,
	endpoint : '/ajax/apps/usage_update.php',
	INITIAL_PING : 0,
	ONGOING_PING : 1,
	DISCOVERY_PING : 2,
	_application_id : 0,
	_is_game : 0,
	_createRequest : function(a) {
		return new AsyncRequest().setURI(this.endpoint).setMethod('POST')
				.setData({
					app : this._application_id,
					is_game : this._is_game,
					type : a
				});
	},
	init : function(a, f, g, e, c, d, b) {
		if (window != window.top)
			return;
		this.cleanup();
		PageTransitions.registerHandler(this.catchPageTransition.bind(this));
		this._application_id = a;
		this._is_game = f;
		this._timers.push(setTimeout(function() {
			this._createRequest(this.INITIAL_PING).send();
			var i = this._createRequest(this.ONGOING_PING);
			this._timers.push(setInterval(i.send.bind(i), e));
			if (window.EagleEye && d) {
				var h = {
					app : this._application_id,
					is_game : this._is_game,
					client_start_ts : Date.now()
				};
				if (b)
					h.impression_id = b;
				this._timers.push(setInterval(function(j) {
					h.client_ts = Date.now();
					EagleEye.log('canvas-heartbeat', h);
				}, d));
			}
		}.bind(this), g));
		if (c)
			this._timers.push(setTimeout(function() {
				this._createRequest(this.DISCOVERY_PING).send();
			}.bind(this), c));
	},
	catchPageTransition : function(a) {
		this.cleanup();
	},
	cleanup : function() {
		if (this._timers)
			for (i = 0; i < this._timers.length; i++)
				clearInterval(this._timers[i]);
		this._timers = [];
	}
});
function ComposerAttachment() {
	this._container = null;
}
copy_properties(ComposerAttachment, {
	setupThumbnails : function(a, b) {
		var c = new ImageSandbox();
		c.onfinish = function() {
			a = c.getImages();
			for ( var d = a.length - 1; d >= 0; d--)
				if (a[d].width
						&& (a[d].height < 50 || a[d].width < 50
								|| a[d].height / a[d].width > 3 || a[d].width
								/ a[d].height > 3))
					a.splice(d, 1);
			if (!a.length) {
				CSS.removeClass(b, 'loading');
				CSS.removeClass(b.parentNode, 'has_image');
				var e = b;
				while (e.parentNode && e.tagName.toLowerCase() != 'form')
					e = e.parentNode;
				e = e.getElementsByTagName('input');
				for ( var d = 0; d < e.length; d++)
					if (e[d].name.indexOf('[params][images]') != -1)
						e[d].parentNode.removeChild(e[d]);
				return;
			}
			for ( var f = 0; f < a.length - 1; f++)
				for ( var g = a.length - 1; g >= f; g--)
					if (a[f].width * a[f].height < a[g].width * a[g].height) {
						temp = a[f];
						a[f] = a[g];
						a[g] = temp;
					}
			var e = b;
			while (e.parentNode && e.tagName.toLowerCase() != 'form')
				e = e.parentNode;
			e = e.getElementsByTagName('input');
			for ( var d = 0; d < e.length; d++)
				if (e[d].name.indexOf('[params][images]') != -1) {
					e = e[d];
					break;
				}
			CSS.removeClass(b, 'loading');
			new ThumbnailSelector(b, e, a);
		}.bind(this);
		c.loadImages(a);
	}
});
copy_properties(ComposerAttachment.prototype, {
	containerReady : function(d, e) {
		this._container = d;
		var c = d.getElementsByTagName('input');
		var a = [ '' ];
		for ( var b = 0; b < c.length; b++)
			if (c[b].type == 'text' || c[b].type == 'hidden')
				a.push('<input type="hidden" name="'
						+ htmlspecialchars(c[b].name) + '" value="'
						+ htmlspecialchars(c[b].value) + '" />');
		if (e) {
			a.push('&nbsp;');
			d.innerHTML = a.join('');
			CSS.addClass(d, 'share_attachment_loading');
		} else
			d.innerHTML += a.join('');
	},
	_renderInputsRecursive : function(c, d) {
		if (d === null)
			return '';
		var a = [];
		if (typeof (d) == 'object') {
			for ( var b in d)
				a.push(this._renderInputsRecursive(c + '[' + b + ']', d[b]));
		} else if (typeof (d) != 'function')
			a.push('<input type="hidden" name="', c, '" value="',
					htmlspecialchars(d), '" />');
		return a.join('');
	},
	_asyncCallback : function(b) {
		var a = b.getPayload().html;
		CSS.removeClass(this._container, 'share_attachment_loading');
		DOM.setContent(this._container, HTML(a));
	}
});
function ThumbnailSelector(f, d, c) {
	var b = [
			'<div class="thumbnail_stage"><h4>'
					+ _tx("Choose a Thumbnail")
					+ '</h4><div class="selector clearfix"><div class="arrows clearfix">',
			'<span class="left"><a href="#" class="arrow disabled">&nbsp;</a></span>',
			'<span class="right"><a href="#" class="arrow ',
			c.length > 1 ? 'enabled' : 'disabled', '">&nbsp;</a></span>',
			'</div><div class="counter"><span>1 of ', c.length,
			'</span></div></div>' ];
	for ( var e = 0; e < c.length; e++)
		b.push('<div class="thumbnail', e == 0 ? ' thumbnail_selected'
				: ' thumbnail_unselected', '">',
				'<img class="img_loading" src="', c[e].src,
				'" onload="adjustImage(this);" />', '</div>');
	b
			.push('<label style="white-space:nowrap"><input name="no_picture" type="checkbox" onclick="this.parentNode.parentNode.parentNode.thumbnail.use_thumbnail(this.checked)" />'
					+ _tx("No Picture") + '</label></div>');
	f.innerHTML = b.join('');
	this.images = c;
	this.input = d;
	d.value = this.images[0].src;
	this.obj = f;
	this.obj.thumbnail = this;
	this.label = f.getElementsByTagName('span')[2];
	this.index = 0;
	var a = f.getElementsByTagName('a');
	this.left = a[0];
	this.right = a[1];
	this.left.onclick = this.left_arrow_press.bind(this);
	this.right.onclick = this.right_arrow_press.bind(this);
	this.left.onselectstart = this.right.onselectstart = function() {
		return false;
	};
	this.left.onmousedown = this.right.onmousedown = this._onmousedown;
	this.left.onmouseout = this.right.onmouseout = this._onmouseout;
}
copy_properties(ThumbnailSelector.prototype,
		{
			use_thumbnail : function(a) {
				if (!a) {
					this.move_selection(0);
					CSS.removeClass(this.obj, 'thumbnail_dont_use');
				} else {
					this.input.value = '';
					CSS.addClass(this.obj, 'thumbnail_dont_use');
				}
			},
			_onmousedown : function() {
				CSS.addClass(this, 'active');
				return false;
			},
			_onmouseout : function() {
				CSS.removeClass(this, 'active');
			},
			left_arrow_press : function() {
				CSS.addClass(this.left, 'active');
				this.move_selection(-1);
				return false;
			},
			right_arrow_press : function() {
				CSS.removeClass(this.right, 'active');
				this.move_selection(1);
				return false;
			},
			move_selection : function(f) {
				var d = this.index + f;
				if (d >= 0 && d < this.images.length) {
					var b = this.obj.getElementsByTagName('div');
					var e = 0;
					this.index = d;
					for ( var c = 0; c < b.length; c++) {
						var a = b[c].className;
						if (!CSS.hasClass(b[c], 'thumbnail '))
							continue;
						var g = e == d;
						if (a.indexOf(g ? '_unselected' : '_selected') != -1)
							CSS.setClass(b[c], a.replace(
									/thumbnail_(?:un)?selected/,
									g ? 'thumbnail_selected'
											: 'thumbnail_unselected'));
						e++;
					}
					this.label.innerHTML = _tx("{selected} of {total}", {
						selected : (d + 1),
						total : e
					});
					CSS.setClass(this.left, this.left.className.replace(
							/[^ ]+abled/, d == 0 ? 'disabled' : 'enabled'));
					CSS.setClass(this.right, this.right.className.replace(
							/[^ ]+abled/,
							d == this.images.length - 1 ? 'disabled'
									: 'enabled'));
					this.input.value = this.images[d].src;
				}
			}
		});
function ImageSandbox() {
	this.obj = document.createElement('div');
	this.obj.style.left = this.obj.style.top = '-100px';
	this.obj.style.width = this.obj.style.height = '1px';
	this.obj.style.overflow = 'hidden';
	this.images = 0;
	this.done = 0;
	DOM.getRootElement().appendChild(this.obj);
}
copy_properties(ImageSandbox.prototype, {
	loadImages : function(b) {
		this.images = b.length;
		for ( var a = 0; a < b.length; a++)
			new ImageSandboxLoader(this, b[a]);
	},
	onImageLoaded : function(a) {
		this.done++;
		this._stateChange();
	},
	onImageFailed : function(a) {
		a.destroy();
		this.images--;
		this._stateChange();
	},
	getImages : function() {
		var c = new Array();
		var a = this.obj.getElementsByTagName('img');
		for ( var b = 0; b < a.length; b++)
			c.push(a[b]);
		return c;
	},
	_stateChange : function() {
		if (this.done == this.images)
			if (this.onfinish)
				this.onfinish();
	}
});
function ImageSandboxLoader(b, a) {
	this._timeout = 4000;
	this._start = Date.now();
	this._sandbox = b;
	if (typeof a != 'object')
		a = {
			src : a
		};
	this._obj = document.createElement('img');
	this._obj.onload = function() {
		if (this._pollImage)
			this._pollImage(1);
	}.bind(this);
	this._obj.onerror = function() {
		if (this._pollImage)
			this._pollImage(2);
	}.bind(this);
	copy_properties(this._obj, a);
	this._sandbox.obj.appendChild(this._obj);
	if (this._pollImage !== null)
		this._pollImage();
}
copy_properties(ImageSandboxLoader.prototype, {
	_pollImage : function(a) {
		if (a == 1) {
			this._pollImage = null;
			this._sandbox.onImageLoaded(this);
		} else if (a == 2) {
			this._pollImage = null;
			this._sandbox.onImageFailed(this);
		} else if (image_has_failed(this._obj)) {
			this._pollImage(2);
		} else if (image_has_loaded(this._obj)) {
			this._pollImage(1);
		} else if ((this._start + this._timeout) < Date.now()) {
			this._pollImage(2);
		} else
			setTimeout(function() {
				if (this._pollImage)
					this._pollImage();
			}.bind(this), 20);
	},
	destroy : function() {
		DOM.remove(this._obj);
		this._obj = null;
	}
});
function UrlDetector(a) {
	this.element = a;
	this.lastCharCount = 0;
	this.lastScrapedURL = null;
	this.detectionInterval = null;
	this.suppressDetection = bagofholding;
	Event.listen(a, 'focus', this.startDetectionInterval.bind(this));
	Event.listen(a, 'blur', this.stopDetectionInterval.bind(this));
	var b = DOM.isNodeOfType(this.element, [ 'input', 'textarea' ]);
	copy_properties(this, {
		getText : b ? function() {
			return this.element.value;
		} : function() {
			return DOM.getText(this.element);
		},
		setText : b ? function(c) {
			this.element.value = c;
		} : function(c) {
			DOM.setContent(this.element, c);
		}
	});
}
Class.mixin(UrlDetector, 'Arbiter', {
	getText : bagofholding,
	setText : bagofholding,
	setSuppressDetectionCheck : function(a) {
		this.suppressDetection = a;
	},
	startDetectionInterval : function() {
		if (this.detectionInterval || this.suppressDetection())
			return;
		this.detectionInterval = setInterval(this.detectionIntervalFire
				.bind(this), 250);
	},
	stopDetectionInterval : function() {
		this.detectionInterval = clearInterval(this.detectionInterval);
	},
	detectionIntervalFire : function() {
		if (this.suppressDetection())
			return;
		var a = this.getText().length;
		if ((a - this.lastCharCount) > 5 || (this.lastCharCount == 0 && a > 1))
			var b = true;
		this.lastCharCount = a;
		var c = this.detectUrl(b);
		if (c)
			this.inform('urlDetected', c);
	},
	detectUrl : function(d) {
		var g = '', f = this.getText(), e = -1, a = -1;
		if (d) {
			g = f.match(/(?:^|[^a-z])(www\.\S+)/mi);
			if (g) {
				e = f.indexOf(g[1]);
				a = e + g[1].length;
				g = "http://" + g[1];
			} else {
				var c = f.match(/(http|fb):\/\/\S*/i);
				if (c) {
					g = c[0];
					e = f.indexOf(c[0]);
					a = e + c[0].length;
				}
			}
		} else {
			g = f.match(/(?:^|[^a-z])(www\.\S+[\s|\)|\!])/mi);
			if (g) {
				e = f.indexOf(g[1]);
				a = e + g[1].length;
				g = "http://" + g[1];
			} else {
				var c = f.match(/(http|fb):\/\/\S*[\s|\)|\!]/i);
				if (c) {
					g = c[0];
					e = f.indexOf(c[0]);
					a = e + c[0].length;
				}
			}
		}
		if (g) {
			g = g.replace(/[\s|\)]/g, '');
			while (true) {
				var b = g.charAt(g.length - 1);
				if (!b.match(/[,|.|\!]/))
					break;
				g = g.substr(0, g.length - 1);
			}
			if (g != this.lastScrapedURL) {
				this.lastScrapedURL = g;
				if (g.search('fb:') == 0)
					this.setText(f.substr(0, e) + f.substr(a));
			} else
				g = '';
		}
		return g;
	}
});
function wall_video_thumb_adjust(a, b) {
	if (ua.ie() >= 6 && ua.ie() < 7) {
		a.style.marginTop = (-1 * b.height - 3) + 'px';
		a.style.paddingTop = (b.height - 19) + 'px';
	}
	a.style.display = 'block';
}
function attachments(a) {
	this.attachment_added = false;
	this.attachment_oid = null;
	this.attachment_app_id = null;
	this.is_share = false;
	this.attached_share = false;
	this.scrape_last_count = 0;
	this.dialog = null;
	this.wall_attachments = {};
	this.last_url_scraped = null;
	this.context = a;
	this.edit_container_id = 'attachment_edit_container_' + a;
	this.edit_loading_id = 'attachment_edit_loading_' + a;
	this.edit_id = 'attachment_edit_' + a;
	this.view_container_id = 'attachment_view_container_' + a;
	this.view_wrapper_id = 'attachment_view_wrapper_' + a;
	this.view_id = 'attachment_view_' + a;
	this.remove_id = 'attachment_remove_' + a;
	this.view_loading_id = 'attachment_view_loading_' + a;
	this.is_active = false;
}
attachments.prototype.remove_attachment_view = function() {
	var c = ge(this.view_container_id);
	var a = ge(this.view_id);
	if (this.attachment_added && a) {
		this.removed = true;
		c.removeChild(a);
		hide(this.view_wrapper_id);
		if (ge('attachment_buttons_list'))
			show('attachment_buttons_list');
		var b = ge(this.remove_id);
		CSS.setClass(b, b.className.replace(' edit', ''));
	}
	this.attachment_added = false;
	this.attachment_oid = null;
	this.attachment_app_id = null;
	this.is_share = false;
	this.attached_share = false;
};
attachments.prototype.get_all_form_elements = function(a) {
	var f = [];
	if (a) {
		var b = a.getElementsByTagName('input');
		for ( var e = 0; e < b.length; e++)
			f.push(b[e]);
		var c = a.getElementsByTagName('select');
		for ( var e = 0; e < c.length; e++)
			f.push(c[e]);
		var d = a.getElementsByTagName('textarea');
		for ( var e = 0; e < d.length; e++)
			f.push(d[e]);
	}
	return f;
};
attachments.prototype.fix_app_inputs_on_send = function() {
	var a = ge(this.view_id);
	if (!this.attachment_added || !a)
		return;
	function b(e, f) {
		return $N('input', {
			name : e,
			id : e,
			value : f,
			type : 'hidden'
		});
	}
	if (!this.attached_share) {
		new_inputs = [];
		new_inputs.push(b('attachment[oid]', this.attachment_oid));
		new_inputs.push(b('attachment[app_id]', this.attachment_app_id));
		if (a.is_app) {
			new_inputs.push(b('attachment[type]', 14));
			new_inputs.push(b('attachment[app][message_sent]', true));
		}
		for ( var c = 0, d = new_inputs.length; c < d; c++)
			a.appendChild(new_inputs[c]);
	}
};
function BasePrivacyWidget() {
}
Class.mixin(BasePrivacyWidget, 'Arbiter', {
	init : function(a, c, b) {
		this._controllerId = a;
		this._root = $(a);
		this._options = copy_properties(b || {}, c || {});
		this._formDataKey = 'privacy_data';
	},
	getData : function() {
		return this._model.getData();
	},
	_getPrivacyData : function(a) {
		a = a || this._fbid;
		var b = {};
		b[a] = this.getData();
		return b;
	},
	getRoot : function() {
		return this._root;
	},
	_initSelector : function(a) {
		this._selector = a;
		Selector.listen(a, 'select', function(b) {
			var c = b.option;
			if (CSS.hasClass(c, 'notSelectable'))
				return;
			var d = Selector.getOptionValue(c);
			this._onMenuSelect(d);
		}.bind(this));
		Event.listen(a, 'click', function() {
			this.inform('menuActivated');
		}.bind(this));
	},
	_isCustomSetting : function(a) {
		return (a == PrivacyBaseValue.CUSTOM);
	},
	_updateSelector : function(a) {
		var b = this._model.objects;
		if (b && b.length) {
			selected_value = b[0];
		} else
			selected_value = this._model.value;
		Selector.setSelected(this._selector, selected_value + '');
		Arbiter.inform(UIPrivacyWidget.GLOBAL_PRIVACY_UPDATED_SELECTOR, {
			id : this._controllerId,
			value : selected_value
		});
		if (!this._isCustomSetting(selected_value))
			return;
		var c = Selector
				.getOption(this._selector, PrivacyBaseValue.CUSTOM + '');
		if (c)
			c.setAttribute('data-label', a || _tx("Custom"));
		Selector.updateSelector(this._selector);
	},
	_onPrivacyChanged : function() {
		this._saveFormData();
		Arbiter.inform('Form/change', {
			node : this.getRoot()
		});
		this.inform('privacyChanged', this.getData());
		Arbiter.inform(UIPrivacyWidget.GLOBAL_PRIVACY_CHANGED_EVENT, {
			fbid : this._fbid,
			data : this.getData()
		});
	},
	_saveFormData : function() {
		var b = DOM.find(this._root, 'div.UIPrivacyWidget_Form');
		DOM.empty(b);
		var a = {};
		if (this._options.useLegacyFormData) {
			a[this._formDataKey] = this.getData();
		} else
			a[this._formDataKey] = this._getPrivacyData();
		Form.createHiddenInputs(a, b);
	}
});
function UIPrivacyWidget() {
	this.parent.construct(this);
}
copy_properties(UIPrivacyWidget, {
	GLOBAL_PRIVACY_CHANGED_EVENT : 'UIPrivacyWidget/globalPrivacyChanged',
	GLOBAL_PRIVACY_UPDATED_SELECTOR : 'UIPrivacyWidget/globalUpdatedSelector',
	instances : {},
	getInstance : function(a) {
		return this.instances[a];
	}
});
Class.extend(UIPrivacyWidget, 'BasePrivacyWidget');
Class
		.mixin(
				UIPrivacyWidget,
				'Arbiter',
				{
					init : function(i, a, b, h, c, e, g) {
						var f = {
							autoSave : false,
							saveAsDefaultFbid : 0,
							initialExplanation : '',
							useLegacyFormData : false,
							composerEvents : false,
							everyoneOrFriendsOnly : false
						};
						if (b == '0')
							b = 0;
						this.parent.init(a, g, f);
						this._lists = c;
						this._networks = e;
						this._fbid = b;
						this._row = h;
						this._groups = {};
						this._showingDialog = false;
						this._includeOnlyMe = Selector.getOption(i,
								PrivacyBaseValue.SELF + '') !== null;
						for ( var d in e)
							this._groups[e[d].fbid] = d;
						UIPrivacyWidget.instances[this._controllerId] = this;
						this._initSelector(i);
						this.setData(this._row,
								this._options.initialExplanation, true);
						this._saveFormData();
						if (this._options.composerEvents == 'resettodefault') {
							Arbiter.subscribe('composer/publish',
									this.resetToDefault.bind(this));
						} else if (this._options.composerEvents == 'savetodefault')
							Arbiter.subscribe('composer/publish',
									this.saveToDefault.bind(this));
					},
					resetToDefault : function() {
						this._model = this._originalModel.clone();
						this._modelClone = this._originalModel.clone();
						this._updateSelector(this._options.initialExplanation);
						this._saveFormData();
						return this;
					},
					saveToDefault : function() {
						this._modelClone = this._model.clone();
						this._saveFormData();
					},
					revert : function() {
						this._model = this._modelClone.clone();
						this._updateSelector(this._previousDescription);
						this._saveFormData();
						return this;
					},
					getValue : function() {
						return this._model.value;
					},
					getDefaultValue : function() {
						return this._originalModel.value;
					},
					isEveryonePrivacy : function() {
						return this._model.value == PrivacyBaseValue.EVERYONE;
					},
					dialogOpen : function() {
						return this._dialog && this._dialog.getRoot();
					},
					setData : function(b, a, c) {
						this._model = new PrivacyModel();
						this._model.init(b.value, b.friends, b.networks,
								b.objects, b.lists, b.lists_x, b.list_anon,
								b.ids_anon, b.list_x_anon, b.ids_x_anon,
								b.tdata);
						this._modelClone = this._model.clone();
						if (c)
							this._originalModel = this._model.clone();
						this._previousDescription = a;
						this._customModel = null;
						this._updateSelector(a);
					},
					setLists : function(a) {
						this._lists = a;
						return this;
					},
					setNetworks : function(a) {
						this._networks = a;
						return this;
					},
					_isCustomSetting : function(a) {
						if (this._options.everyoneOrFriendsOnly) {
							return (a != PrivacyBaseValue.EVERYONE && a != PrivacyBaseValue.ALL_FRIENDS);
						} else
							return (a == PrivacyBaseValue.CUSTOM || a == PrivacyBaseValue.SELF
									&& !this._includeOnlyMe);
					},
					_onMenuSelect : function(b) {
						this._modelClone = this._model.clone();
						var a = this._isCustomSetting(this._model.value);
						var c = this._isCustomSetting(b);
						if (a && !c)
							this._customModel = this._model.clone();
						if (!(a && c)) {
							this._model.value = b;
							this._resetModelAuxiliaryData();
						}
						if (b == PrivacyBaseValue.CUSTOM) {
							if (this._customModel) {
								this._model = this._customModel.clone();
							} else if (this._modelClone.value != PrivacyBaseValue.CUSTOM)
								this._model.friends = PrivacyFriendsValue.ALL_FRIENDS;
							this._showDialog();
						} else {
							if (this._groups[b]) {
								this._model = new PrivacyModel();
								this._model.value = PrivacyBaseValue.CUSTOM;
								this._model.objects = [ b ];
							}
							this._onPrivacyChanged();
							if (this._options.autoSave)
								this._saveSetting();
						}
						this._updateSelector();
					},
					_showDialog : function() {
						this._showingDialog = true;
						if (!this._fbid) {
							this._model.list_x_anon = 0;
							this._model.list_anon = 0;
						}
						var a = {
							controller_id : this._controllerId,
							privacy_data : this.getData(),
							fbid : this._fbid,
							save_as_default_fbid : this._options.saveAsDefaultFbid
						};
						this._dialog = new Dialog()
								.setAsync(
										new AsyncRequest(
												'/ajax/privacy/privacy_widget_dialog.php')
												.setData(a)).show();
						return false;
					},
					_resetModelAuxiliaryData : function() {
						if (this._model.value != PrivacyBaseValue.CUSTOM) {
							this._model.lists_x = this._model.lists = this._model.networks = this._model.ids_anon = this._model.ids_x_anon = [];
							this._model.list_x_anon = 0;
							this._model.list_anon = 0;
						}
					},
					_saveSetting : function(a) {
						a = a || this._fbid;
						new AsyncRequest('/ajax/privacy/widget_save.php')
								.setData(
										{
											privacy_data : this
													._getPrivacyData(a),
											old_privacy_data : this._modelClone
													.getData(),
											fbid : a
										}).setHandler(
										this._handleResponse.bind(this))
								.setErrorHandler(this._handleError.bind(this))
								.send();
					},
					_handleResponse : function(b) {
						var a = b.getPayload();
						this.setData(a.privacy_row, a.explanation);
					},
					_handleError : function(a) {
						AsyncResponse.defaultErrorHandler(a);
						this.revert();
					},
					_updateButtonIcon : function() {
						var d = Selector.getSelectedOptions(this._selector)[0];
						if (d) {
							var c = DOM.scry(d, '.img')[0];
							var a = Selector.getSelectorButton(this._selector);
							if (c) {
								Button.setIcon(a, c.cloneNode(true));
							} else {
								var b = DOM.scry(a, '.img')[0];
								b && DOM.remove(b);
							}
						}
					},
					_updateSelector : function(a) {
						this.parent._updateSelector(a);
						if (this._options.dynamicIcon)
							this._updateButtonIcon();
					}
				});
var TargetedPrivacyConsts = {
	GENDER_BOTH : 0,
	GENDER_MALE : 1,
	GENDER_FEMALE : 2,
	LOC_ALL : 0,
	LOC_REGION : 1,
	LOC_CITY : 2
};
function TargetedPrivacyModel() {
	this.value = PrivacyBaseValue.EVERYONE;
	this.countries = [];
	this.countries_names = [];
	this.location_type = TargetedPrivacyConsts.LOC_ALL;
	this.location_ids = [];
	this.location_ids_names = [];
	this.locales = [];
	this.locales_names = [];
	this.gender = TargetedPrivacyConsts.GENDER_BOTH;
	this.age_min = 0;
	this.age_max = 0;
	return this;
}
TargetedPrivacyModel.prototype = {
	init : function(m, c, d, j, h, i, b, a, e, f, g, k, l) {
		this.value = m;
		this.countries = c.clone();
		this.countries_names = d.clone();
		this.location_type = j;
		this.location_ids = h.clone();
		this.location_ids_names = i.clone();
		this.age_min = b;
		this.age_max = a;
		this.gender = e;
		this.locales = f.clone();
		this.locales_names = g.clone();
		this.see_regions = l;
		this.see_cities = k;
	},
	getData : function() {
		var d = {};
		if (this.value == PrivacyBaseValue.EVERYONE)
			return d;
		var b = [ 'countries', 'location_type', 'location_ids', 'age_min',
				'age_max', 'gender', 'locales' ];
		for ( var c = 0; c < b.length; ++c) {
			var a = b[c];
			d[a] = this[a];
		}
		return d;
	}
};
function UITargetedPrivacyWidget() {
	this.parent.construct(this);
}
copy_properties(UITargetedPrivacyWidget, {
	DIALOG_URI : '/ajax/privacy/targeted_privacy_widget_dialog.php',
	instances : {},
	getInstance : function(a) {
		return this.instances[a];
	}
});
Class.extend(UITargetedPrivacyWidget, 'BasePrivacyWidget');
Class.mixin(UITargetedPrivacyWidget, 'Arbiter', {
	init : function(d, a, c) {
		var b = {
			useLegacyFormData : true
		};
		this.parent.init(a, b);
		this._profileId = c;
		this._model = new TargetedPrivacyModel();
		this._formDataKey = 'targeted_privacy_data';
		UITargetedPrivacyWidget.instances[this._controllerId] = this;
		this._initSelector(d);
		this._saveFormData();
	},
	reset : function() {
		this._model = new TargetedPrivacyModel();
		this._updateSelector();
		this._saveFormData();
		return this;
	},
	_onMenuSelect : function(a) {
		if (a == PrivacyBaseValue.EVERYONE)
			this._model = new TargetedPrivacyModel();
		this._saveFormData();
		this._updateSelector();
		if (this._isCustomSetting(a))
			this._showDialog();
	},
	_showDialog : function() {
		var a = {
			controller_id : this._controllerId,
			profile_id : this._profileId
		};
		this._dialog = new Dialog().setAsync(
				new AsyncRequest().setURI(UITargetedPrivacyWidget.DIALOG_URI)
						.setData(a)).setModal(true).show();
	}
});
function FeedFormBase() {
	this._storyType = 63;
	this._feedData = null;
	this._uri = '/fbml/ajax/prompt_feed.php';
	this._buttonCallback = null;
	this._isNile = false;
	this._supportsUserMessage = false;
	this._userMessagePrompt = '';
	this._userMessage = {
		value : ''
	};
	this._privacyWidget = null;
	this._currentSize = 0;
	this._connectLocation = 0;
	this._postId = null;
	this._hasTargets = false;
	this._profileType = 0;
	this._targeted = false;
}
FeedFormBase.SIZES = {
	small : 1,
	medium : 2
};
FeedFormBase.AUTO_PUBLISH_OPTIONS = {
	never : 2,
	small : 4,
	medium : 5
};
FeedFormBase.PROFILE_TYPE = {
	user : 101,
	page : 102,
	group : 103
};
FeedFormBase.shouldShowLoadingToSelf = false;
FeedFormBase.shouldShowLoadingToOthers = false;
FeedFormBase.prototype.setStoryType = function(a) {
	this._storyType = a;
	return this;
};
FeedFormBase.prototype.setProfileType = function(a) {
	this._profileType = a;
	return this;
};
FeedFormBase.prototype.setForm = function(a) {
	if (this._elements)
		return null;
	this._form = $(a);
	return this;
};
FeedFormBase.prototype.setElements = function(a) {
	if (this._form)
		return null;
	this._elements = a;
	return this;
};
FeedFormBase.prototype.setFeedData = function(a) {
	this._feedData = a;
	return this;
};
FeedFormBase.prototype.setAppId = function(a) {
	this._appid = a;
	return this;
};
FeedFormBase.prototype.setConnectLocation = function(a) {
	this._connectLocation = a;
	return this;
};
FeedFormBase.prototype.setUserMessagePrompt = function(a) {
	this._userMessagePrompt = a;
	return this;
};
FeedFormBase.prototype.setUserMessage = function(a) {
	if (a)
		if (typeof a == 'string') {
			this._userMessage = {
				value : a
			};
		} else
			this._userMessage = a;
	return this;
};
FeedFormBase.prototype.setURI = function(a) {
	this._uri = a;
	return this;
};
FeedFormBase.prototype.setContinuation = function(a) {
	this._continuation = a;
	return this;
};
FeedFormBase.prototype.setButtonCallback = function(a) {
	this._buttonCallback = a;
	return this;
};
FeedFormBase.prototype.setPrivacyWidget = function(a, b) {
	this._targeted = b;
	if (b) {
		this._privacyWidget = UITargetedPrivacyWidget.getInstance(a);
	} else
		this._privacyWidget = $(a);
	return this;
};
FeedFormBase.prototype._selectSize = function(a) {
	var b = a.size;
	if (b != this._currentSize) {
		CSS.removeClass(this._selectedSize, 'Tabset_selected');
		animation($('preview_' + this._currentSize)).to('opacity', 0).hide()
				.duration(150).go();
		animation($('preview_' + b)).duration(150).checkpoint().show().from(
				'opacity', 0).to('opacity', 1).duration(150).go();
		this._selectedSize = a;
		this._currentSize = b;
		CSS.addClass(this._selectedSize, 'Tabset_selected');
	}
	return false;
};
FeedFormBase.prototype.attachHandlers = function(a) {
	if (!this._isNile)
		this._attachSizeHandlers(a);
	var b = DOM.scry($('preview_container'), 'a');
	b.forEach(function(c) {
		Event.listen(c, 'click', function(d) {
			d.kill();
		});
	});
	if (this._supportsUserMessage)
		$('feedform_user_message').focus();
	return this;
};
FeedFormBase.prototype._attachSizeHandlers = function(b) {
	var f = this._selectorOptions;
	var d = this._feedformFilter;
	for ( var c = 0; c < f.length; c++) {
		var e = $(d + '_' + f[c].size);
		var a = $(d + '_' + f[c].size + '_anchor');
		var g = f[c].size;
		f[c].node = e;
		if (CSS.hasClass(e, 'Tabset_selected')) {
			this._selectedSize = f[c];
			this._currentSize = g;
		}
		Event.listen(a, 'click', this._selectSize.bind(this, f[c]));
	}
	return true;
};
FeedFormBase.prototype._finish = function() {
	this._enableSubmitButtons();
	if (this._dialog)
		this._dialog.hide();
	if (this._continuation)
		this._continuation(this._postId, null, {
			user_message : this._userMessage.value
		});
};
FeedFormBase.prototype.shouldShowLoading = function() {
	return false;
};
FeedFormBase.prototype.showDialog = function(a) {
	this._dialog = new Dialog().setContentWidth(580).setClassName(
			'interaction_form').setAsync(a).setHandler(
			this.handleButton.bind(this)).onloadRegister(
			this.attachHandlers.bind(this));
	if (this.shouldShowLoading())
		this._dialog.show();
	return this;
};
FeedFormBase.prototype._confirm = function(b) {
	if (this._isNile && this._supportsUserMessage) {
		user_message = Input.getValue($('feedform_user_message'));
		this._userMessage.value = b.user_message = user_message;
	}
	var a = new AsyncRequest().setURI(this._uri).setData(b).setHandler(
			this.showConfirmed.bind(this));
	new Dialog().setAsync(a);
};
FeedFormBase.prototype.handleButton = function(a) {
	if (this._buttonCallback)
		this._buttonCallback(a);
	if (a.name == "publish") {
		var b = this._dialog ? this._dialog.getButtonElement(a.name) : a;
		if (b)
			b.disabled = true;
		this.confirmFeed();
		return false;
	} else if (a.name == "cancel")
		this.cancelFeed();
};
FeedFormBase.prototype.cancelFeed = function() {
	this._finish();
};
FeedFormBase.prototype.attachProperties = function(a) {
	copy_properties(this, a);
	if (this._continuationJS) {
		this._continuation = new Function(this._continuationJS);
		delete this._continuationJS;
	}
	return this;
};
FeedFormBase.prototype._showBase = function(b) {
	var a = new AsyncRequest().setURI(this._uri).setHandler(function(c) {
		var d = c.getPayload().userData;
		this.attachProperties(d);
		if (d.no_dialog_shown)
			this._finish();
		return true;
	}.bind(this)).setErrorHandler(this._showApplicationError.bind(this))
			.setData(b);
	this.showDialog(a);
	return this;
};
FeedFormBase.prototype.showConfirmed = function(b) {
	var a;
	if (this._profileType == FeedFormBase.PROFILE_TYPE.page) {
		a = _tx("The post is now visible on the Page's Wall and home pages of people who like this.");
	} else if (this._profileType == FeedFormBase.PROFILE_TYPE.group) {
		a = _tx("The post is now visible on the group's Wall.");
	} else if (this._hasTargets) {
		a = _tx("The post is now visible on your friend's Wall.");
	} else
		a = _tx("The post is now visible on your Wall and your friends' home pages.");
	this.showConfirmedWithMessage(a, b);
};
FeedFormBase.prototype.showConfirmedWithMessage = function(c, e) {
	this.attachProperties(e.payload.userData);
	var b = '<div class="interim_status">' + c + '</div>';
	var f = _tx("Post Published");
	if (this._dialog) {
		this._dialog.setBody(b);
		this._dialog.setTitle(f);
		this._dialog.setButtons(Dialog.OK);
		this._dialog.setButtonsMessage('');
	} else {
		$('dialog_body').innerHTML = b;
		var d = ge('publish');
		if (d != null)
			DOM.remove(d);
		if (this._privacyWidget)
			if (this._targeted) {
				DOM.remove(this._privacyWidget.getRoot());
			} else
				DOM.remove(this._privacyWidget);
		var a = ge('cancel');
		if (a != null)
			a.value = _tx("Finished");
	}
	setTimeout(this._finish.bind(this), 2500);
	return false;
};
FeedFormBase.prototype._enableSubmitButtons = function() {
	var b = [ 'send', 'publish' ];
	for ( var c = 0; c < b.length; c++) {
		var a = ge(b[c]);
		if (a) {
			a.disabled = false;
			break;
		}
	}
};
FeedFormBase.prototype._showApplicationError = function(b) {
	this._enableSubmitButtons();
	var d = b.getPayload().userData;
	var c = function(f) {
		var g = _tx("There was an application error. Please try again later.");
		var e = null;
		if (f) {
			if (d && d.errorTitle) {
				g = d.errorTitle;
			} else if (b.getErrorSummary)
				g = b.getErrorSummary();
			if (d && d.errorMessage) {
				e = d.errorMessage;
			} else if (b.getErrorDescription)
				e = b.getErrorDescription();
		}
		ErrorDialog.show(g, e);
	};
	var a = b.getError();
	if (a == 1349008) {
		if (d.showDebug) {
			c(true);
		} else if (this._continuation) {
			this._continuation();
		} else
			c(false);
	} else
		c(true);
	return false;
};
function FeedForm() {
	this.parent.construct(this);
}
Class.extend(FeedForm, 'FeedFormBase');
FeedForm.attachSubmitHandler = function(b, a) {
	b.onsubmit = '';
	Event.listen(b, 'submit', function(d, c, event) {
		FeedForm.shouldShowLoadingToSelf = true;
		new FeedForm().setForm(d).setAppId(c).show();
		return false;
	}.curry(b, a));
};
FeedForm.prototype._setPublishButtonText = function(a) {
	this.publish_button.value = a;
};
FeedForm.prototype._setCancelButtonText = function(a) {
	this.cancel_button.value = a;
};
FeedForm.prototype.shouldShowLoading = function() {
	return FeedForm.shouldShowLoadingToSelf;
};
FeedForm.prototype.show = function() {
	var b = {};
	if (this._form) {
		b = {
			callback : Form.getAttribute(this._form, 'action'),
			elements : Form.serialize(this._form)
		};
	} else if (this._elements)
		b.elements = this._elements;
	var a = {
		app_id : this._appid,
		feedform_type : this._storyType,
		feed_info : this._feedData,
		user_message_prompt : this._userMessagePrompt,
		user_message : this._userMessage.value,
		preview : true,
		feed_target_type : 'self_feed',
		extern : this._connectLocation
	};
	copy_properties(a, b);
	return this._showBase(a);
};
FeedForm.prototype.cancelFeed = function() {
	this._finish();
};
FeedForm.prototype.confirmFeed = function() {
	var a = {
		feed_info : this._feedData,
		feedform_type : this._storyType,
		preview : false,
		feed_target_type : 'self_feed',
		app_id : this._appid,
		size : FeedFormBase.SIZES[this._currentSize],
		extern : this._connectLocation
	};
	if (this._privacyWidget)
		if (this._targeted) {
			a.targeted_privacy_data = this._privacyWidget.getData();
		} else
			copy_properties(a, Form.serialize(this._privacyWidget));
	this._confirm(a);
};
function MultiFeedForm() {
	this.parent.construct(this);
	this._hasTargets = true;
}
Class.extend(MultiFeedForm, 'FeedFormBase');
MultiFeedForm.prototype.setPrefillId = function(a) {
	if (a > 0) {
		this._prefillId = a;
	} else
		this._prefillId = null;
	return this;
};
MultiFeedForm.prototype.removeRecipient = function(a) {
	this._toIds = this._toIds.filter(function(b) {
		return b != a;
	});
	if (this._toIds.length == 0) {
		this._finish();
	} else
		DOM.remove('sp' + a);
	return false;
};
MultiFeedForm.prototype.confirmFeed = function() {
	var a = {
		feed_info : this._feedData,
		feedform_type : this._storyType,
		to_ids : this._toIds,
		preview : false,
		feed_target_type : 'multi_feed',
		app_id : this._appid,
		size : FeedFormBase.SIZES[this._currentSize],
		extern : this._connectLocation
	};
	this._confirm(a);
};
MultiFeedForm.prototype.shouldShowLoading = function() {
	return FeedFormBase.shouldShowLoadingToOthers;
};
MultiFeedForm.prototype.show = function() {
	var c = [];
	if (this._prefillId) {
		c.push(this._prefillId);
	} else {
		var d = this._form.getElementsByTagName('input');
		for ( var b = 0; b < d.length; b++)
			if (d[b].getAttribute('fb_protected') == 'true'
					&& (CSS.hasClass(d[b], 'fb_token_hidden_input')
							|| d[b].name == 'ids[]' || d[b].name == 'friend_selector_id')
					&& (d[b].type != 'checkbox' || d[b].checked))
				c.push(d[b].value);
	}
	this._toIds = c;
	var a = {
		app_id : this._appid,
		to_ids : this._toIds,
		callback : this._form.action,
		preview : true,
		form_id : this._form.id,
		prefill : (this.prefillId > 0),
		elements : Form.serialize(this._form),
		user_message_prompt : this._userMessagePrompt,
		user_message : this._userMessage.value,
		feed_target_type : 'multi_feed',
		extern : this._connectLocation
	};
	return this._showBase(a);
};
MultiFeedForm.prototype.attachHandlers = function(a) {
	for ( var b = 0; b < this._toIds.length; b++) {
		var c = ge('spl_' + this._toIds[b]);
		if (c)
			c.onclick = this.removeRecipient.bind(this, this._toIds[b]);
	}
	this.parent.attachHandlers(a);
	return this;
};
function TargetFeedForm() {
	this.parent.construct(this);
}
Class.extend(TargetFeedForm, 'MultiFeedForm');
TargetFeedForm.prototype.confirmFeed = function() {
	var a = {
		feed_info : this._feedData,
		feedform_type : this._storyType,
		to_ids : this._toIds,
		preview : false,
		feed_target_type : 'target_feed',
		app_id : this._appid,
		size : FeedFormBase.SIZES[this._currentSize],
		extern : this._connectLocation
	};
	this._confirm(a);
};
TargetFeedForm.prototype.setTarget = function(a) {
	this._toIds = [ a ];
	return this;
};
TargetFeedForm.prototype.show = function() {
	var a = {
		app_id : this._appid,
		to_ids : this._toIds,
		feed_info : this._feedData,
		preview : true,
		prefill : (this.prefillId > 0),
		user_message_prompt : this._userMessagePrompt,
		user_message : this._userMessage.value,
		feed_target_type : 'target_feed',
		extern : this._connectLocation
	};
	return this._showBase(a);
};
function typeaheadpro(a, c, b) {
	if (!typeaheadpro.hacks) {
		typeaheadpro.should_check_missing_events = ua.safari() < 500;
		typeaheadpro.should_simulate_keypress = ua.ie()
				|| (ua.safari() > 500 && ua.safari() < 523 || ua.safari() >= 525);
		if (typeaheadpro.should_use_iframe == undefined)
			typeaheadpro.should_use_iframe = ua.ie() < 7;
		typeaheadpro.should_use_overflow = ua.opera() < 9.5
				|| ua.safari() < 500;
		if (ua.firefox())
			this.activate_poll_on_focus_events = true;
		typeaheadpro.hacks = true;
	}
	typeaheadpro.instances = (typeaheadpro.instances || []);
	typeaheadpro.instances.push(this);
	this.instance = typeaheadpro.instances.length - 1;
	copy_properties(this, b || {});
	this.obj = a;
	this.obj.typeahead = this;
	this.attachEventListeners();
	this.want_icon_list = false;
	this.showing_icon_list = false;
	this.stop_suggestion_select = false;
	if (this.typeahead_icon_class && this.typeahead_icon_get_return) {
		this.typeahead_icon = document.createElement('div');
		CSS.addClass(this.typeahead_icon, 'typeahead_list_icon');
		CSS.addClass(this.typeahead_icon, this.typeahead_icon_class);
		this.typeahead_icon.innerHTML = '&nbsp;';
		this.setup_typeahead_icon();
		setTimeout(function() {
			this.focus();
		}.bind(this), 50);
		this.typeahead_icon.onmousedown = function(event) {
			return this.typeahead_icon_onclick(event || window.event);
		}.bind(this);
	}
	this.focused = this.focused || this.obj.offsetWidth ? true : false;
	this.focused = this.focused && !this.enumerate_on_focus;
	this.anchor = this.setup_anchor();
	this.dropdown = document.createElement('div');
	CSS.addClass(this.dropdown, 'typeahead_list');
	if (!this.focused)
		this.dropdown.style.display = 'none';
	this.anchor_block = this.anchor_block
			|| this.anchor.tagName.toLowerCase() == 'div';
	document.body.appendChild(this.dropdown);
	this.dropdown.className += ' typeahead_list_absolute';
	this.list = $N('div');
	this.dropdown.appendChild(this.list);
	this.dropdown.onmousedown = function(event) {
		return this.dropdown_onmousedown(event || window.event);
	}.bind(this);
	if (typeaheadpro.should_use_iframe && !typeaheadpro.iframe) {
		typeaheadpro.iframe = document.createElement('iframe');
		typeaheadpro.iframe.src = "/common/blank.html";
		CSS.setClass(typeaheadpro.iframe, 'typeahead_iframe');
		typeaheadpro.iframe.style.display = 'none';
		typeaheadpro.iframe.frameBorder = 0;
		document.body.appendChild(typeaheadpro.iframe);
	}
	if (typeaheadpro.should_use_iframe && typeaheadpro.iframe)
		typeaheadpro.iframe.style.zIndex = parseInt(CSS.getStyle(this.dropdown,
				'zIndex')) - 1;
	this.log_data = {
		kt : 0,
		kp : 0,
		sm : null,
		ty : 0,
		f : 1
	};
	this.results_text = '';
	this.last_key_suggestion = 0;
	this.status = 2;
	this.clear_placeholder();
	if (c)
		this.set_source(c);
	if (this.source) {
		this.selectedindex = -1;
		if (this.focused) {
			this._onfocus();
			this.show();
			this._onkeyup();
			this.set_class('');
			this.capture_submit();
		}
	} else
		this.hide();
	onleaveRegister(this._onunload.bind(this), true);
}
typeaheadpro.prototype.enumerate = false;
typeaheadpro.prototype.interactive = false;
typeaheadpro.prototype.changed = false;
typeaheadpro.prototype.render_block_size = 50;
typeaheadpro.prototype.typeahead_icon_class = false;
typeaheadpro.prototype.typeahead_icon_get_return = false;
typeaheadpro.prototype.old_value = null;
typeaheadpro.prototype.poll_handle = null;
typeaheadpro.prototype.activate_poll_on_focus_events = false;
typeaheadpro.prototype.suggestion_count = 0;
typeaheadpro.prototype.clear_value_on_blur = true;
typeaheadpro.prototype.max_results = 0;
typeaheadpro.prototype.max_display = 10;
typeaheadpro.prototype.allow_placeholders = false;
typeaheadpro.prototype.auto_select = true;
typeaheadpro.prototype.auto_select_exactmatch = false;
typeaheadpro.prototype.enumerate_on_focus = false;
typeaheadpro.dirty_instances = function() {
	if (typeaheadpro.instances)
		typeaheadpro.instances.forEach(function(a) {
			a.update_status(2);
			if (a.source)
				a.source.is_ready = false;
		});
};
typeaheadpro.prototype.set_source = function(a) {
	this.source = a;
	this.source.set_owner(this);
	this.status = 0;
	this.cache = {};
	this.last_search = 0;
	this.suggestions = [];
};
typeaheadpro.prototype.setup_anchor = function() {
	return this.obj;
};
typeaheadpro.prototype.destroy = function() {
	if (this.typeahead_icon) {
		DOM.remove(this.typeahead_icon);
		this.toggle_icon_list = function() {
		};
	}
	this.clear_render_timeouts();
	if (!this.anchor_block
			&& this.anchor.nextSibling.tagName.toLowerCase() == 'br')
		DOM.remove(this.anchor.nextSibling);
	if (this.dropdown)
		DOM.remove(this.dropdown);
	if (this.obj) {
		this.removeEventListeners();
		this.obj.typeahead = null;
		DOM.remove(this.obj);
	}
	this.anchor = this.obj = this.dropdown = null;
	delete typeaheadpro.instances[this.instance];
};
typeaheadpro.prototype.check_value = function() {
	if (this.obj) {
		var a = this.obj.value;
		if (a != this.old_value) {
			this.dirty_results();
			this.old_value = a;
			if (this.old_value === '')
				this._onselect(false);
		}
	}
};
typeaheadpro.prototype._onkeyup = function(a) {
	a = $E(a);
	this.last_key = a ? a.keyCode : -1;
	if (this.key_down == this.last_key)
		this.key_down = 0;
	var b = true;
	switch (this.last_key) {
	case KEYS.ESC:
		this.selectedindex = -1;
		this._onselect(false);
		this.hide();
		a.stop();
		b = false;
		break;
	}
	return b;
};
typeaheadpro.prototype._onkeydown = function(a) {
	a = $E(a);
	this.key_down = this.last_key = a ? a.keyCode : -1;
	this.interactive = true;
	switch (this.last_key) {
	case KEYS.PAGE_UP:
	case KEYS.PAGE_DOWN:
	case KEYS.UP:
	case KEYS.DOWN:
		this.log_data.kt += 1;
		if (typeaheadpro.should_simulate_keypress)
			this._onkeypress({
				keyCode : this.last_key
			});
		return false;
	case KEYS.TAB:
		this.log_data.kt += 1;
		this.select_suggestion(this.selectedindex);
		if (a.shiftKey) {
			this.reverse_focus();
		} else
			this.advance_focus();
		break;
	case KEYS.RETURN:
		this.log_data.sm = 'key_ret';
		if (this.select_suggestion(this.selectedindex))
			this.hide();
		if (typeof (this.submit_keydown_return) != 'undefined')
			this.submit_keydown_return = this._onsubmit(this
					.get_current_selection());
		return this.submit_keydown_return;
	case 229:
		if (!this.poll_handle)
			this.poll_handle = setInterval(this.check_value.bind(this), 100);
		break;
	default:
		this.log_data.kp += 1;
		setTimeout(bind(this, 'check_value'), this.source.check_limit);
	}
};
typeaheadpro.prototype._onkeypress = function(a) {
	a = $E(a);
	var b = 1;
	this.last_key = a ? Event.getKeyCode(a) : -1;
	this.interactive = true;
	switch (this.last_key) {
	case KEYS.PAGE_UP:
		b = this.max_display;
	case KEYS.UP:
		this.set_suggestion(b > 1 && this.selectedindex > 0
				&& this.selectedindex < b ? 0 : this.selectedindex - b);
		this.last_key_suggestion = (new Date()).getTime();
		return false;
	case KEYS.PAGE_DOWN:
		b = this.max_display;
	case KEYS.DOWN:
		if (trim(this.get_value()) == '' && !this.enumerate) {
			this.enumerate = true;
			this.results_text = null;
			this.dirty_results();
		} else {
			this.set_suggestion(this.suggestions.length <= this.selectedindex
					+ b ? this.suggestions.length - 1 : this.selectedindex + b);
			this.last_key_suggestion = (new Date()).getTime();
		}
		return false;
	case KEYS.RETURN:
		var c = null;
		if (typeof (this.submit_keydown_return) == 'undefined') {
			c = this.submit_keydown_return = this._onsubmit(this
					.get_current_selection());
		} else {
			c = this.submit_keydown_return;
			delete this.submit_keydown_return;
		}
		a.stop();
		return c;
	default:
		setTimeout(bind(this, 'check_value'), this.source.check_limit);
		break;
	}
	return true;
};
typeaheadpro.prototype._onchange = function() {
	this.changed = true;
};
typeaheadpro.prototype._onfound = function(a) {
	return this.onfound ? this.onfound.call(this, a) : true;
};
typeaheadpro.prototype._onsubmit = function(a) {
	if (this.onsubmit) {
		var b = this.onsubmit.call(this, a);
		if (b && this.obj.form) {
			if (!this.obj.form.onsubmit || this.obj.form.onsubmit())
				this.obj.form.submit();
			return false;
		}
		return b;
	} else {
		this.advance_focus();
		return false;
	}
};
typeaheadpro.prototype._onselect = function(c) {
	var b = (function() {
		if (this.onselect)
			this.onselect.call(this, c);
	}).bind(this);
	if (c.no_email) {
		var a = new AsyncRequest().setData({
			action : 'require',
			require_field : 'email',
			uid : c.i
		}).setMethod('GET').setReadOnly(true).setURI(
				'/friends/ajax/external.php');
		new Dialog().setCloseHandler(function(e) {
			var d = this.getUserData();
			if (d) {
				b();
			} else
				e.set_value('');
		}.bind(null, this)).setAsync(a).show();
	} else
		b();
};
typeaheadpro.prototype._onfocus = function() {
	if (!this.poll_handle && this.activate_poll_on_focus_events)
		this.poll_handle = setInterval(this.check_value.bind(this), 100);
	if (this.source)
		this.source.bootstrap();
	if (this.last_dropdown_mouse > (new Date()).getTime() - 10 || this.focused)
		return;
	if (this.changed)
		this.dirty_results();
	this.focused = true;
	this.changed = false;
	this.clear_placeholder();
	this.results_text = '';
	this.set_class('');
	this.show();
	this.capture_submit();
	if (this.typeahead_icon)
		show(this.typeahead_icon);
	if (this.enumerate_on_focus)
		setTimeout(function() {
			this.enumerate = true;
			this.results_text = null;
			this.dirty_results();
			this.selectedindex = -1;
			return false;
		}.bind(this), 0);
};
typeaheadpro.prototype._onblur = function(event) {
	if (this.last_dropdown_mouse
			&& this.last_dropdown_mouse > (new Date()).getTime() - 10
			&& this.is_showing_suggestions()) {
		Event.kill(event);
		setTimeout(function() {
			this.focus();
		}.bind(this), 0);
		return false;
	}
	if (!this.stop_hiding) {
		if (this.showing_icon_list)
			this.toggle_icon_list(true);
	} else {
		this.focus();
		return false;
	}
	this.focused = false;
	if (this.changed && !this.interactive) {
		this.dirty_results();
		this.changed = false;
		return;
	}
	if (!this.suggestions) {
		this._onselect(false);
	} else if (this.selectedindex >= 0
			&& (this.auto_select || this.auto_select_exactmatch))
		this.select_suggestion(this.selectedindex);
	this.hide();
	this.update_class();
	if (this.clear_value_on_blur && !this.get_value()) {
		var a = this.allow_placeholders ? this.source.gen_noinput() : '';
		this.set_value(a ? a : '');
		this.set_class('DOMControl_placeholder');
	}
	if (this.poll_handle) {
		clearInterval(this.poll_handle);
		this.poll_handle = null;
	}
};
typeaheadpro.prototype._onunload = function() {
	if (typeaheadpro.instances[this.instance])
		this.hide();
};
typeaheadpro.prototype.typeahead_icon_onclick = function(event) {
	this.stop_hiding = true;
	this.focus();
	setTimeout(function() {
		this.toggle_icon_list();
	}.bind(this), 50);
	Event.kill(event);
	return false;
};
typeaheadpro.prototype.dropdown_onmousedown = function(event) {
	this.last_dropdown_mouse = (new Date()).getTime();
};
typeaheadpro.prototype.setup_typeahead_icon = function() {
	this.typeahead_parent = document.createElement('div');
	CSS.addClass(this.typeahead_parent, 'typeahead_parent');
	this.typeahead_parent.appendChild(this.typeahead_icon);
	this.obj.parentNode.insertBefore(this.typeahead_parent, this.obj);
};
typeaheadpro.prototype.mouse_set_suggestion = function(a) {
	if (!this.visible)
		return;
	if ((new Date()).getTime() - this.last_key_suggestion > 50)
		this.set_suggestion(a);
};
typeaheadpro.prototype.capture_submit = function() {
	if (!typeaheadpro.should_check_missing_events)
		return;
	if ((!this.captured_form || this.captured_substitute != this.captured_form.onsubmit)
			&& this.obj.form) {
		this.captured_form = this.obj.form;
		this.captured_event = this.obj.form.onsubmit;
		this.captured_substitute = this.obj.form.onsubmit = function() {
			return ((this.key_down && this.key_down != KEYS.RETURN && this.key_down != KEYS.TAB) ? this.submit_keydown_return
					: (this.captured_event ? this.captured_event.apply(
							arguments, this.captured_form) : true)) ? true
					: false;
		}.bind(this);
	}
};
typeaheadpro.prototype.set_suggestion = function(b) {
	this.stop_suggestion_select = false;
	if (!this.suggestions || this.suggestions.length <= b)
		return;
	var c = this.get_suggestion_node(this.selectedindex);
	this.selectedindex = (b <= -1) ? -1 : b;
	var a = this.get_suggestion_node(this.selectedindex);
	if (c) {
		CSS.removeClass(c, 'typeahead_selected');
		CSS.addClass(c, 'typeahead_not_selected');
	}
	if (a) {
		CSS.removeClass(a, 'typeahead_not_selected');
		CSS.addClass(a, 'typeahead_selected');
	}
	this.recalc_scroll();
	this._onfound(this.get_current_selection());
};
typeaheadpro.prototype.get_suggestion_node = function(a) {
	var b = this.list.childNodes;
	return a == -1 ? null
			: b[Math.floor(a / this.render_block_size)].childNodes[a
					% this.render_block_size];
};
typeaheadpro.prototype.get_current_selection = function() {
	return this.selectedindex == -1 ? false
			: this.suggestions[this.selectedindex];
};
typeaheadpro.prototype.update_class = function() {
	if (this.suggestions
			&& this.selectedindex != -1
			&& typeahead_source.flatten_string(this.get_current_selection().t) == typeahead_source
					.flatten_string(this.get_value())) {
		this.set_class('typeahead_found');
	} else
		this.set_class('');
};
typeaheadpro.prototype.select_suggestion = function(a) {
	if (!this.stop_suggestion_select && this.current_selecting != a)
		this.current_selecting = a;
	var b = true;
	if (!this.suggestions || a == undefined || a === false
			|| this.suggestions.length <= a || a < 0) {
		this._onfound(false);
		this._onselect(false);
		this.selectedindex = -1;
		this.set_class('');
		b = false;
	} else {
		this.selectedindex = a;
		var c = this.suggestions[a].ty;
		if (c != 'web' && c != 'search')
			this.set_value(this.suggestions[a].t);
		this.set_class('typeahead_found');
		this._onfound(this.suggestions[this.selectedindex]);
		this._onselect(this.suggestions[this.selectedindex]);
	}
	if (!this.interactive) {
		this.hide();
		this.blur();
	}
	this.current_selecting = null;
	if (!b && this.ignore_invalid_suggestion)
		return false;
	return true;
};
typeaheadpro.prototype.is_showing_suggestions = function() {
	return (this.suggestions) && (this.suggestions.length > 0);
};
typeaheadpro.prototype.set_value = function(a) {
	this.obj.value = a;
};
typeaheadpro.prototype.get_value = function() {
	if (this.showing_icon_list && this.old_typeahead_value != this.obj.value)
		this.toggle_icon_list();
	if (this.want_icon_list) {
		return this.typeahead_icon_get_return;
	} else if (this.showing_icon_list)
		this.toggle_icon_list();
	return this.obj.value;
};
typeaheadpro.prototype.found_suggestions = function(p, q, e) {
	if (!p)
		p = [];
	this.suggestion_count = p.length;
	if (!e) {
		this.status = 0;
		this.add_cache(q, p);
	}
	this.clear_render_timeouts();
	if (this.get_value() == this.results_text) {
		return;
	} else if (!e) {
		this.results_text = typeahead_source.flatten_string(q);
		if (this.enumerate && trim(this.results_text) != '')
			this.enumerate = false;
	}
	if (this.dedupe_suggestions) {
		var i = DOM.scry(this.tokenizer.obj, 'input.fb_token_hidden_input');
		if (i.length > 0) {
			var d = [];
			var a = [];
			for ( var h = 0; h < i.length; h++)
				a[i[h].value] = true;
			for ( var h = 0, j = p.length; h < j; h++)
				if (p[h] && !a[p[h].i])
					d.push(p[h]);
			p = d;
		}
	}
	var c = -1;
	if (this.selectedindex > 0
			|| (this.selectedindex == 0 && !this.auto_select)) {
		var n = this.suggestions[this.selectedindex].i;
		for ( var h = 0, j = p.length; h < j; h++)
			if (p[h].i == n) {
				c = h;
				break;
			}
	}
	if (c == -1 && this.auto_select && p.length) {
		c = 0;
		this._onfound(p[0]);
	} else if (this.auto_select_exactmatch && p.length)
		if (q.toLowerCase() === p[0].t.toLowerCase()) {
			c = 0;
			this._onfound(p[0]);
		} else
			c = -1;
	this.selectedindex = c;
	this.suggestions = p;
	if (!e)
		this.real_suggestions = p;
	if (p.length) {
		var g = [], b = Math.ceil(p.length / this.render_block_size), k = {}, f, m = null;
		DOM.empty(this.list);
		for ( var h = 0; h < b; h++)
			this.list.appendChild(document.createElement('div'));
		if (c > -1) {
			f = Math.floor(c / this.render_block_size);
			k[f] = true;
			if (c % this.render_block_size > this.render_block_size / 2) {
				k[f + 1] = true;
			} else if (f != 0)
				k[f - 1] = true;
		} else
			k[0] = true;
		for ( var l in k) {
			this.render_block(l);
			sample = this.list.childNodes[l].firstChild;
		}
		this.show();
		if (b) {
			var o = sample.offsetHeight;
			this.render_timeouts = [];
			for ( var h = 1; h < b; h++)
				if (!k[h]) {
					this.list.childNodes[h].style.height = o
							* Math.min(this.render_block_size, p.length - h
									* this.render_block_size) + 'px';
					this.render_timeouts.push(setTimeout(this.render_block
							.bind(this, h), 700 + h * 50));
				}
		}
	} else {
		this.selectedindex = -1;
		this.set_message(this.status === 0 ? this.source.gen_nomatch()
				: this.source.gen_loading());
		this._onfound(false);
	}
	this.recalc_scroll();
	if (!e
			&& this.results_text != typeahead_source.flatten_string(this
					.get_value()))
		this.dirty_results();
};
typeaheadpro.prototype.render_block = function(a, h) {
	var i = this.suggestions, g = this.selectedindex, j = this.get_value(), d = this.instance, b = [], f = this.list.childNodes[a];
	for ( var c = a * this.render_block_size, e = Math.min(i.length, (a + 1)
			* this.render_block_size); c < e; c++) {
		b.push('<div class="');
		if (g == c) {
			b.push('typeahead_suggestion typeahead_selected');
		} else
			b.push('typeahead_suggestion typeahead_not_selected');
		if (c > 0 && i[c - 1].o < 0 && i[c].o >= 0)
			b.push(' typeahead_delimiter');
		b.push('" onmouseover="typeaheadpro.instances[', d,
				'].mouse_set_suggestion(', c, ')" ',
				'onmousedown="var instance=typeaheadpro.instances[', d,
				']; instance.select_suggestion(', c,
				');instance.hide();Event.kill(event);">', this.source.gen_html(
						i[c], j), '</div>');
	}
	f.innerHTML = b.join('');
	f.style.height = 'auto';
	CSS.addClass(f, 'typeahead_suggestions');
};
typeaheadpro.prototype.clear_render_timeouts = function() {
	if (this.render_timeouts) {
		for ( var a = 0; a < this.render_timeouts.length; a++)
			clearTimeout(this.render_timeouts[a]);
		this.render_timeouts = null;
	}
};
typeaheadpro.prototype.recalc_scroll = function() {
	var a = this.list.firstChild;
	if (!a)
		return;
	if (a.childNodes.length > this.max_display) {
		var c = a.childNodes[this.max_display - 1];
		var b = c.offsetTop + c.offsetHeight;
		this.dropdown.style.height = b + 'px';
		var e = this.get_suggestion_node(this.selectedindex);
		if (e) {
			var d = this.dropdown.scrollTop;
			if (e.offsetTop < d) {
				this.dropdown.scrollTop = e.offsetTop;
			} else if (e.offsetTop + e.offsetHeight > b + d)
				this.dropdown.scrollTop = e.offsetTop + e.offsetHeight - b;
		}
		if (!typeaheadpro.should_use_overflow) {
			this.dropdown.style.overflowY = 'scroll';
			this.dropdown.style.overflowX = 'hidden';
		}
	} else {
		this.dropdown.style.height = 'auto';
		if (!typeaheadpro.should_use_overflow)
			this.dropdown.style.overflowY = 'hidden';
	}
};
typeaheadpro.prototype.search_cache = function(a) {
	return this.cache[typeahead_source.flatten_string(a)];
};
typeaheadpro.prototype.add_cache = function(b, a) {
	if (this.source.cache_results)
		this.cache[typeahead_source.flatten_string(b)] = a;
};
typeaheadpro.prototype.update_status = function(a) {
	this.status = a;
	this.dirty_results();
};
typeaheadpro.prototype.set_class = function(a) {
	CSS.setClass(this.obj, (this.obj.className.replace(/typeahead_[^\s]+/g, '')
			+ ' ' + a).replace(/ {2,}/g, ' '));
};
typeaheadpro.prototype.dirty_results = function() {
	if (!this.enumerate && this.get_value().trim() == '') {
		DOM.empty(this.list);
		this.results_text = '';
		this.set_message(this.source.gen_placeholder());
		this.suggestions = [];
		this.selectedindex = -1;
		return;
	} else if (this.results_text == typeahead_source.flatten_string(this
			.get_value())) {
		return;
	} else if (this.status === 2) {
		this.set_message(this.source.gen_loading());
		return;
	}
	var c = (new Date()).getTime();
	var e = false;
	if (this.last_search <= (c - this.source.search_limit) && this.status === 0) {
		e = this.perform_search();
	} else if (this.status === 0)
		if (!this.search_timeout)
			this.search_timeout = setTimeout(function() {
				this.search_timeout = false;
				if (this.status === 0)
					this.dirty_results();
			}.bind(this), this.source.search_limit - (c - this.last_search));
	if (this.source.allow_fake_results && this.real_suggestions && !e) {
		var d = typeahead_source.tokenize(this.get_value()).sort(
				typeahead_source._sort);
		var a = [];
		for ( var b = 0; b < this.real_suggestions.length; b++)
			if (typeahead_source.check_match(d, this.real_suggestions[b].t
					+ ' ' + this.real_suggestions[b].n))
				a.push(this.real_suggestions[b]);
		if (a.length) {
			this.found_suggestions(a, this.get_value(), true);
		} else {
			this.selectedindex = -1;
			this.set_message(this.source.gen_loading());
		}
	}
};
typeaheadpro.prototype.perform_search = function() {
	if (this.get_value() == this.results_text)
		return true;
	var a;
	if ((a = this.search_cache(this.get_value())) === undefined
			&& !(a = this.source.search_value(this.get_value()))) {
		this.status = 1;
		this.last_search = (new Date()).getTime();
		return false;
	}
	this.found_suggestions(a, this.get_value(), false);
	return true;
};
typeaheadpro.prototype.set_message = function(a) {
	this.clear_render_timeouts();
	if (a) {
		this.list.innerHTML = '<div class="typeahead_message">' + a + '</div>';
		this.reset_iframe();
	} else
		this.hide();
	this.recalc_scroll();
};
typeaheadpro.prototype.reset_iframe = function() {
	if (!typeaheadpro.should_use_iframe)
		return;
	typeaheadpro.iframe.style.top = this.dropdown.style.top;
	typeaheadpro.iframe.style.left = this.dropdown.style.left;
	typeaheadpro.iframe.style.width = this.dropdown.offsetWidth + 'px';
	typeaheadpro.iframe.style.height = this.dropdown.offsetHeight + 'px';
	typeaheadpro.iframe.style.display = '';
};
typeaheadpro.prototype.advance_focus = function() {
	return this._move_focus(true);
};
typeaheadpro.prototype.reverse_focus = function() {
	return this._move_focus(false);
};
typeaheadpro.prototype._move_focus = function(c) {
	var b = this.obj.form ? Form.getInputs(this.obj.form) : Form.getInputs();
	var d = [];
	d._insert = c ? d.push : d.unshift;
	var e = !c;
	for ( var a = 0; a < b.length; a++)
		if (!c && b[a] == this.obj) {
			e = false;
		} else if (e && b[a].type != 'hidden' && b[a].tabIndex != -1
				&& b[a].offsetParent) {
			d._insert(b[a]);
		} else if (b[a] == this.obj)
			e = true;
	setTimeout(function() {
		for ( var g = 0; g < this.length; g++)
			try {
				if (this[g].offsetParent) {
					this[g].focus();
					setTimeout(function() {
						try {
							this.focus();
						} catch (h) {
						}
					}.bind(this[g]), 0);
					return;
				}
			} catch (f) {
			}
	}.bind(d ? d : []), 0);
	this.blur();
	this.hide();
};
typeaheadpro.prototype.clear_placeholder = function() {
	if (CSS.hasClass(this.obj, 'DOMControl_placeholder')) {
		this.set_value('');
		CSS.removeClass(this.obj, 'DOMControl_placeholder');
	}
};
typeaheadpro.prototype.clear = function() {
	this.set_value('');
	this.set_class('');
	this.selectedindex = -1;
	this.enumerate = false;
	this.dirty_results();
};
typeaheadpro.prototype.hide = function() {
	if (this.stop_hiding)
		return;
	this.visible = false;
	this.dropdown.style.display = 'none';
	this.clear_render_timeouts();
	if (typeaheadpro.should_use_iframe)
		typeaheadpro.iframe.style.display = 'none';
};
typeaheadpro.prototype.show = function() {
	this.visible = true;
	if (this.focused) {
		this.dropdown.style.top = elementY(this.anchor)
				+ this.anchor.offsetHeight + 'px';
		this.dropdown.style.left = elementX(this.anchor) + 'px';
		this.dropdown.style.width = (this.anchor.offsetWidth - 2) + 'px';
		this.dropdown.style.display = '';
		if (typeaheadpro.should_use_iframe) {
			typeaheadpro.iframe.style.display = '';
			this.reset_iframe();
		}
	}
};
typeaheadpro.prototype.toggle_icon_list = function(a) {
	if (this.showing_icon_list) {
		this.showing_icon_list = false;
		this.source.showing_icon_list = false;
		if (!a)
			this.focus();
		CSS.removeClass(this.typeahead_icon, 'on_selected');
		this.want_icon_list = false;
		this.showing_icon_list = false;
		this.stop_suggestion_select = true;
		if (this.obj)
			this.dirty_results();
	} else {
		this.source.showing_icon_list = true;
		this.old_typeahead_value = this.obj.value;
		this.stop_suggestion_select = true;
		this.want_icon_list = true;
		this.dirty_results();
		this.focus();
		CSS.addClass(this.typeahead_icon, 'on_selected');
		this.show();
		this.set_suggestion(-1);
		this.showing_icon_list = true;
	}
	setTimeout(function() {
		this.stop_hiding = false;
	}.bind(this), 100);
};
typeaheadpro.prototype.focus = function() {
	this.obj.focus();
};
typeaheadpro.prototype.blur = function(a) {
	if (this.obj)
		this.obj.blur(a);
};
typeaheadpro.prototype.attachEventListeners = function() {
	this._eventRefs = Event.listen(this.obj, {
		focus : this._onfocus.bind(this),
		blur : this._onblur.bind(this),
		change : this._onchange.bind(this),
		keyup : this._onkeyup.bind(this),
		keydown : this._onkeydown.bind(this),
		keypress : this._onkeypress.bind(this)
	});
};
typeaheadpro.prototype.removeEventListeners = function() {
	if (this._eventRefs)
		for ( var a in this._eventRefs)
			this._eventRefs[a].remove();
};
typeaheadpro.kill_typeahead = function(a) {
	if (a.typeahead) {
		if (!this.anchor_block)
			a.parentNode.removeChild(a.nextSibling);
		a.parentNode.removeChild(a.nextSibling);
		if (a.typeahead.source)
			a.typeahead.source = a.typeahead.source.owner = null;
		a.typeahead.removeEventListeners();
		a.typeahead = null;
	}
};
var FBML = (function() {
	var z = {};
	var za = false;
	var zr = {};
	function y(zt, zv, zu) {
		var zs = document.createElement('INPUT');
		zs.name = zt.getAttribute('idname');
		zs.type = 'hidden';
		zs.setAttribute('fb_protected', 'true');
		zs.typeahead = this;
		if (zt.form)
			zt.form.appendChild(zs);
		this._idInput = zs;
		return this.parent.construct(this, zt, zv, zu);
	}
	Class.extend(y, 'typeaheadpro');
	y.prototype.updateID = function(zs) {
		if (zs.i) {
			this._idInput.value = zs.i;
		} else if (zs.is) {
			this._idInput.value = zs.is;
		} else
			this._idInput.value = '';
	};
	y.prototype.destroy = function() {
		this._idInput.parentNode.removeChild(this._idInput);
		this._idInput.typeahead = null;
		this._idInput = null;
		this.parent.destroy();
	};
	y.prototype._onselect = function(zs) {
		this.updateID(zs);
		this.parent._onselect(zs);
	};
	var a = new Object();
	function x(zs) {
		if (window.console)
			window.console.log('Facebook FBML Mock AJAX ERROR: ' + zs);
		return false;
	}
	function g(zs, zt, zv, zu) {
		if (!zs['url'])
			return x("no input with id url in form");
		if (!zs['fb_sig_api_key'])
			return x("no input with id fb_api_key in form");
		if (zv)
			zv();
		f(zs, zt, zu);
	}
	function f(zs, zt, zu) {
		new AsyncRequest().setURI('/fbml/ajax/attach.php').setData(zs)
				.setMethod('POST').setHandler(function(zv) {
					if (zu)
						zu();
					if (!zt.removed)
						DOM.setContent(zt, HTML(zv.getPayload().html));
				}.bind(this)).send();
	}
	function h(zt) {
		if (zt == 'wall') {
			var zs = wallAttachments;
		} else if (zt == 'message')
			var zs = inboxAttachments;
		if (zs) {
			var zx = ge(zs.edit_id);
			var zv = zs.get_all_form_elements(zx);
			var zw = Object();
			for ( var zu = 0; zu < zv.length; zu++)
				if (!(zv[zu].type == "radio" || zv[zu].type == "checkbox")
						|| zv[zu].checked)
					zw[zv[zu].name] = zv[zu].value;
			zw.context = zs.context;
			zw.action = 'edit';
			f(zw, zx);
		}
	}
	function j(zs, zv, zw, zx, zt, zu) {
		this.requireLogin(zs, function() {
			return c(zw, zx, zt, zu);
		});
		return false;
	}
	function c(zz, zza, zs, zu) {
		var zy = ge(zz);
		if (!zy)
			return x("target " + zz + " not found");
		var zt = zy.getAttribute("fbcontext");
		var zx = FBML.Contexts[zt];
		if (!zs)
			return x("You must either specify a clickrewriteform (an id) or use the clickrewrite attribute inside a form");
		var zv = typeof this.PROFILE_OWNER_ID == 'undefined' ? 0
				: this.PROFILE_OWNER_ID;
		var zw = Form.serialize(zs);
		zw.fb_mockajax_context = zx;
		zw.fb_mockajax_context_hash = zt;
		zw.fb_mockajax_url = zza;
		zw.fb_target_id = zv;
		zw.fb_mockajax_rewrite_id = zz;
		new AsyncRequest()
				.setURI('/fbml/mock_ajax_proxy.php')
				.setMethod("POST")
				.setFBMLForm()
				.setData(zw)
				.setHandler(function(zzc) {
					var zzb = zzc.getPayload();
					if (zzb.ok) {
						DOM.setContent(zy, HTML(zzb.html));
					} else
						return x(zzb.error_message);
					FBML.mockAjaxResponse = zzb;
					return zzb.ok;
				}.bind(this))
				.setErrorHandler(
						function(zzb) {
							return x("Failed to successfully retrieve data from Facebook when making mock AJAX call to rewrite id "
									+ zz);
						}.bind(this)).send();
		if (zu)
			DOM.setContent(zy, HTML(zu));
		return false;
	}
	function p(zs) {
		return o(zs, "");
	}
	function q(zx) {
		var zv = null;
		if (zv = ge(zx)) {
			var zu = zv.parentNode.innerHTML;
			zv.id = 'dialog_invoked_' + zv.id;
			var zs = parseInt(zv.getAttribute('fb_dialog_width'));
			var zw = zv.cloneNode(true);
			DOM.empty(zv);
			var zt = new Dialog();
			if (zs)
				zt.setContentWidth(zs);
			zt.setStackable(true).setBody(zu).setFullBleed(true).show();
			z[zv.id] = {
				elem : zw,
				dialog : zt
			};
		}
		return false;
	}
	function s(zx) {
		var zt = null;
		var zs = 'dialog_invoked_' + zx;
		for (dialog_id in z)
			if (zt = ge(dialog_id)) {
				var zv = zt.id.replace('dialog_invoked_', '');
				var zu = null;
				if (zu = ge(zv))
					zu.id = 'dialog_closed_' + zv;
				var zw = zt.parentNode;
				DOM.empty(zw);
				zw.appendChild(z[dialog_id].elem);
				z[dialog_id].elem.id = zv;
			}
		if (z[zs].dialog)
			z[zs].dialog.hide();
	}
	function m(zs) {
		return o(zs, "none");
	}
	function r(zt) {
		var zs = ge(zt);
		if (!zs) {
			return x("Could not find target " + zt);
		} else {
			zs.style.display = (zs.style.display == "none") ? '' : 'none';
			return false;
		}
	}
	function o(zu, zs) {
		var zt = ge(zu);
		if (!zt) {
			return x("Could not find target " + zu);
		} else {
			zt.style.display = zs;
			return false;
		}
	}
	function l(zs) {
		return n(zs, '');
	}
	function k(zs) {
		return n(zs, 'disabled');
	}
	function n(zu, zs) {
		var zt = ge(zu);
		if (!zt) {
			return x("Could not find target " + zu);
		} else {
			zt.disabled = zs;
			return false;
		}
	}
	function e(zt, zs) {
		var zu;
		for (zu = zt.childNodes.length - 1; zu >= 0; zu--)
			if (zt.childNodes[zu].name
					&& zt.childNodes[zu].name.indexOf('fb_sig') == 0)
				zt.removeChild(zt.childNodes[zu]);
		for (keyVar in zs)
			DOM.appendContent(zt, $N('input', {
				name : keyVar,
				value : zs[keyVar],
				type : 'hidden'
			}));
	}
	function zc(zs, zv, zt) {
		var zw = function(zx) {
			Arbiter.subscribe('PLATFORM_HAS_SESSION_DATA', function(event, zy) {
				zt(zy.session.uid);
			});
		};
		var zu = bagofholding;
		d(zs, {
			perms : zv
		}, zw, zu);
	}
	function zl(zs, zy, zt, zv, zz, zw) {
		var zza = zt;
		var zu = zt;
		if (zw != null)
			zza = function(zzb) {
				DOM.appendContent(zw, $N('input', {
					name : 'fb_perms_approved',
					value : '1',
					type : 'hidden'
				}));
				zt.apply(this, arguments);
			}.bind(this);
		var zx = {
			perms : zy
		};
		if (zv)
			zx.enable_profile_selector = 1;
		if (zz != null) {
			zx.enable_profile_selector = 1;
			zx.profile_selector_ids = zz;
		}
		d(zs, zx, zza, zu);
	}
	function d(zs, zx, zw, zv) {
		var zu = function(zz) {
			var zza = zz && (zz.installed || zz.perms || zz.session);
			if (zza && zx && zx.perms)
				zza = v(zx.perms, zz.perms);
			if (zza) {
				this._hasGrantedPerms = true;
				zw(zz.perms);
			} else if (zv)
				zv(null);
		}.bind(this);
		var zy = function() {
			this.loginDialog = zn(zs, 'permissions.request', zx, zu, 600);
		}.bind(this);
		if (zx.perms) {
			zy();
		} else if (!this._hasGrantedPerms) {
			var zt = function(event, zz) {
				Arbiter.unsubscribe(this._arbiterSessionSubscription);
				if (zz.session.session_key) {
					zw(null);
				} else
					zy();
			};
			this._arbiterSessionSubscription = Arbiter.subscribe(
					'PLATFORM_HAS_SESSION_DATA', function(event, zz) {
						zt.bind(this, event, zz).defer();
					});
		}
	}
	function v(zv, zs) {
		var zw = true;
		var zv = zv.split(',');
		var zs = zs.split(',');
		for ( var zt = 0; zt < zv.length; zt++) {
			zw = false;
			for ( var zu = 0; zu < zs.length; zu++)
				if (zv[zt].trim() == zs[zu].trim()) {
					zw = true;
					break;
				}
			if (!zw)
				break;
		}
		return zw;
	}
	function zb(zs) {
		return this.uiServerDialogs[zs];
	}
	function zj(zs, zt, zu) {
		zn(zs, 'bookmark.add', {}, zt);
	}
	function zm(zs, zt) {
		zn(zs, 'profile.addTab', {}, zt);
	}
	function zi(zs, zu, zt) {
		zn(zs, 'friends.add', {
			id : zu
		}, zt);
	}
	function u(zs, zt) {
		b(function() {
			FB.Connect.createApplication(zs, zt);
		});
	}
	function zo(zu, zz, zv, zs, zy, zza, zx, zw, zt) {
		zn(zu, 'stream.publish', {
			actor_id : zt,
			target_id : zy,
			attachment : zv,
			action_links : zs,
			message : zz,
			user_message_prompt : zza
		}, function(zzb) {
			if (zzb && zzb.post_id) {
				zx(zzb.post_id, null, {
					user_message : zzb.message
				});
			} else
				zx(null, null, null);
		});
	}
	function zn(zs, zy, zz, zv, zzb) {
		var zu = {
			app_id : zs
		};
		for ( var zx in zu)
			if (zu.hasOwnProperty(zx))
				zz[zx] = zu[zx];
		for (zx in zz)
			if (zz[zx] instanceof Object || zz[zx] instanceof Array)
				zz[zx] = JSON.stringify(zz[zx]);
		zz.fb_server_fbml_url = FBML.isServerFBML ? document.location.href : '';
		zz.fb_iframe_referrer = document.referrer;
		var zza = '/fbml/ajax/dialog/' + zy;
		var zt = new AsyncRequest().setURI(zza).setData(zz).setReadOnly(true);
		if (ua.ie()) {
			zt.setMethod('POST');
		} else
			zt.setMethod('GET');
		var zw = new Dialog().setAsync(zt).setStackable(true).setCloseHandler(
				zv);
		if (zzb)
			zw.setContentWidth(zzb);
		zw.show();
		return zw;
	}
	function b(zs) {
		Arbiter.subscribe('PLATFORM_HAS_SESSION_DATA', function(event, zt) {
			FB.init({
				apiKey : zt.api_key,
				disableCookies : true,
				xdChannelUrl : "/xd_receiver_v0.4.php"
			});
			FB.ensureInit(function() {
				FB.Facebook.apiClient.set_session(zt.session);
				zs();
			});
		});
	}
	function zk(zs, zy, zz, zt, zx, zu, zzb, zza) {
		var zv = {
			template_id : zy,
			template_data : zz,
			body_general : zt
		};
		var zw;
		if (zx && (!hasArrayNature(zx) || zx.length > 0)) {
			if (hasArrayNature(zx))
				zx = zx[0];
			zw = new TargetFeedForm().setTarget(zx);
		} else
			zw = new FeedForm();
		zw.setContinuation(zu).setFeedData(zv).setAppId(zs)
				.setUserMessagePrompt(zzb).setUserMessage(zza).show();
	}
	function t() {
		if (this.loginDialog) {
			var zs = this.loginDialog;
			this.loginDialog = null;
			zs.close();
		}
	}
	function zh(zs, zu, zt, zv) {
		d(zs, {}, zu, zt, zv);
	}
	function i(zt) {
		var zs = Dialog.getCurrent();
		zs && zs.hide();
	}
	function ze(zt) {
		var zv = $('sp' + zt);
		var zu = zv.parentNode;
		zu.removeChild(zv);
		for ( var zs = 0; zs < zu.childNodes.length; zs++)
			if (zu.childNodes[zs].nodeName == 'SPAN')
				return false;
		i(zu);
		return false;
	}
	function zg(zt, zw, zv) {
		var zu = zw.getElementsByTagName('input');
		for ( var zs = 0; zs < zu.length; zs++)
			if (((zu[zs].name == 'emails[]') || (zu[zs].name == 'ids[]'))
					&& (zu[zs].value == zt)) {
				delNode = zu[zs].parentNode.parentNode.parentNode.parentNode.parentNode.token;
				if (delNode)
					delNode.remove(false);
			}
		ze(zt);
		return false;
	}
	function zf(zw, zv, zu) {
		if (zu) {
			if (fs.selected_ids[zw]) {
				fs.unselect(zw);
				fs.force_reset();
			} else {
				zg(zw, zv, zu);
				return false;
			}
		} else {
			var zt = zv.getElementsByTagName('input');
			for ( var zs = 0; zs < zt.length; zs++)
				if (zt[zs].getAttribute('fb_protected') == 'true'
						&& zt[zs].value == zw)
					if (zt[zs].name == 'ids[]') {
						if (zt[zs].type == 'checkbox') {
							if (zt[zs].checked)
								zt[zs].click();
						} else
							zt[zs].parentNode.parentNode.parentNode.parentNode.parentNode.token
									.remove(true);
					} else if (zt[zs].name == 'friend_selector_id') {
						zt[zs].typeahead.select_suggestion(false);
						zt[zs].typeahead.set_value('');
						zt[zs].value = '';
					}
		}
		ze(zw);
		return false;
	}
	var zp = function(zs) {
		var zv = zs.getElementsByTagName('a');
		for ( var zu = 0; zu < zv.length; zu++)
			if (!zv[zu].getAttribute('flash'))
				Event.listen(zv[zu], 'click', Event.kill);
		var zt = zs.getElementsByTagName('form');
		for ( var zu = 0; zu < zt.length; zu++)
			zt[zu].onsubmit = function() {
				return false;
			};
	};
	var w = function(zs, zt) {
		for (styleName in zt)
			zs.style[styleName] = zt[styleName];
	};
	var zd = function(zs, zt) {
		var zu = fbjs_sandbox.getSandbox(zs);
		if (zu)
			zu.setBridgeHash(zt);
	};
	var zq = function(zt, event) {
		if (zt.onsubmit)
			try {
				if (!zt.onsubmit(event))
					return;
			} catch (zs) {
				if (zs.message == "Object doesn't support this action") {
					if (!zt.onsubmit())
						return;
				} else
					throw zs;
			}
		zt.submit();
	};
	return {
		friendSelector : y,
		Contexts : a,
		attachCurlFromObject : g,
		attachFromPreview : h,
		clickRewriteAjax : j,
		clickToShow : p,
		clickToShowDialog : q,
		clickToHide : m,
		clickToEnable : l,
		clickToDisable : k,
		clickToToggle : r,
		closeDialogInvoked : s,
		createApplication : u,
		removeTokenizerRecipient : zg,
		removeReqRecipient : zf,
		cancelDialog : i,
		addHiddenInputs : e,
		requireLogin : zh,
		closeLoginDialog : t,
		showFeedDialog : zk,
		streamPublish : zo,
		promptPermissionPro : zc,
		showPermissionDialog : zl,
		isUIServerEnabled : zb,
		isServerFBML : za,
		showBookmarkDialog : zj,
		showProfileTabDialog : zm,
		showAddFriendDialog : zi,
		stripLinks : zp,
		enforceStyle : w,
		registerFBJSBridge : zd,
		submitForm : zq
	};
})();
Arbiter.subscribe('PLATFORM_UI_SERVER_DIALOGS', function(event, a) {
	FBML.uiServerDialogs = a;
});
PlatformCanvasResponse = {
	getPageInfo : function(c, a, d) {
		a.channelUrl = d.channelUrl;
		a.info = {};
		var e = c;
		var f = 0;
		var g = 0;
		while (e) {
			f += parseInt(e.offsetLeft, 10);
			g += parseInt(e.offsetTop, 10);
			e = e.offsetParent;
		}
		var b = Vector2.getViewportDimensions();
		var i = Vector2.getScrollPosition();
		var h = {
			type : 'pageInfo.update',
			clientWidth : b.x,
			clientHeight : b.y,
			scrollLeft : i.x,
			scrollTop : i.y,
			offsetLeft : f,
			offsetTop : g
		};
		XD.send(h, a.channelUrl);
	}
};
function GameFriendPresence(b, a) {
	this.user = b;
	this.friendGames = a;
	this.friendStatuses = {};
	this.recentlyOnlineFriends = {};
	this.recentlyNotifiedFriends = {};
	this.init();
}
copy_properties(GameFriendPresence, {
	FRIEND_CAME_ONLINE_NOTIFY_FREQ_MS : 120000,
	FRIEND_CAME_ONLINE : 'game_friend_presence/friend_came_online'
});
GameFriendPresence.prototype = {
	init : function() {
		for ( var a in this.friendGames)
			this.friendStatuses[a] = null;
		var c = Arbiter.subscribe('buddylist/updated', this.onBuddyListUpdated
				.bind(this));
		var b = setInterval(this.notifyRecentlyOnline.bind(this),
				GameFriendPresence.FRIEND_CAME_ONLINE_NOTIFY_FREQ_MS);
		onleaveRegister(function() {
			Arbiter.unsubscribe(c);
			clearInterval(b);
		});
		AvailableList.update();
	},
	onBuddyListUpdated : function() {
		if (!AvailableList.isReady())
			return;
		for ( var a in this.friendStatuses) {
			var b = AvailableList.get(a);
			if (this.friendStatuses[a] == AvailableList.OFFLINE
					&& b == AvailableList.ACTIVE)
				this.recentlyOnlineFriends[a] = true;
			this.friendStatuses[a] = b;
		}
	},
	notifyRecentlyOnline : function() {
		if (is_empty(this.recentlyOnlineFriends))
			return;
		var b = {};
		for ( var c in this.recentlyOnlineFriends)
			if (AvailableList.get(c) == AvailableList.ACTIVE
					&& !this.recentlyNotifiedFriends[c])
				b[c] = true;
		this.recentlyOnlineFriends = {};
		if (is_empty(b))
			return;
		var d = null;
		for ( var a in b)
			if (d === null || OrderedFriendsList.compare(a, d) < 0)
				d = a;
		this.recentlyNotifiedFriends[d] = true;
		Arbiter.inform(GameFriendPresence.FRIEND_CAME_ONLINE, {
			friend_uid : d,
			games : this.friendGames[d]
		});
	}
};
var CanvasIFrame = {
	startTime : window._cstart,
	prevTime : 0,
	shouldReportTti : true,
	hideFlashChannelUrl : null,
	numPopups : 0,
	initFlashHiding : function(a) {
		CanvasIFrame.hideFlashChannelUrl = null;
		Arbiter.subscribe('Connect.Unsafe.iframeSetupFlashHiding', function(e,
				d) {
			CanvasIFrame.hideFlashChannelUrl = d.channelUrl;
		});
		var c = function() {
			if (++CanvasIFrame.numPopups === 1)
				if (CanvasIFrame.hideFlashChannelUrl)
					XD.send({
						state : 'opened'
					}, CanvasIFrame.hideFlashChannelUrl);
		};
		var b = function() {
			if (CanvasIFrame.numPopups)
				if (--CanvasIFrame.numPopups === 0)
					if (CanvasIFrame.hideFlashChannelUrl)
						XD.send({
							state : 'closed'
						}, CanvasIFrame.hideFlashChannelUrl);
		};
		a.setOnPopups(c, b);
	},
	listenForAppTti : function() {
		Arbiter.subscribe("Connect.Unsafe.RecordIframeAppTti",
				function(c, a) {
					if (CanvasIFrame.shouldReportTti) {
						var b = a.time - CanvasIFrame.startTime
								+ CanvasIFrame.prevTime;
						if (a.channelUrl)
							XD.send({
								time_delta_ms : b,
								type : "tti"
							}, a.channelUrl);
						if (typeof window._doLogAppTti != "undefined")
							Bootloader.loadComponents('CanvasIFrameLogger',
									function() {
										CanvasIFrameLogger.log(b, a.appId);
									});
					}
				});
		Arbiter.subscribe("Connect.Unsafe.StopIframeAppTtiTimer",
				function(c, a) {
					var b = a.time - CanvasIFrame.startTime
							+ CanvasIFrame.prevTime;
					CanvasIFrame.prevTime = b;
					if (a.channelUrl)
						XD.send({
							time_delta_ms : b,
							type : "tti"
						}, a.channelUrl);
				});
		Arbiter.subscribe("Connect.Unsafe.StartIframeAppTtiTimer", function(b,
				a) {
			CanvasIFrame.startTime = a.time;
		});
	}
};
function PlatformCanvasController(b, j, l, k, c, d, a, o, n, h, g, m, f, e) {
	var i = PlatformCanvasController.singleton;
	if (i) {
		i.initApplication(b, j, l, k, c, d, a, true, h, g, f);
		return i;
	}
	PlatformCanvasController.singleton = this;
	this.uid = o;
	this._movingPage = false;
	this._content = $('content');
	this._subscriptions = [];
	this.lastRefreshAd = Date.now();
	this.tickerDisplayConfig = m;
	this.centerFixedWidthContent = e;
	this.initApplication(b, j, l, k, c, d, a, false, h, g, f);
	Arbiter
			.inform('PLATFORM_UI_SERVER_DIALOGS', n,
					Arbiter.BEHAVIOR_PERSISTENT);
	Arbiter.subscribe(GameFriendPresence.FRIEND_CAME_ONLINE,
			this.handleFriendComeOnline.bind(this));
	Arbiter.subscribe('Connect.Unsafe.setUrlHandler', function(q, p) {
		if (this.validateChannel(p))
			this.channelUrl = p;
	}.bind(this));
	PageTransitions.registerHandler(this.handlePageTransition.bind(this));
	Event.listen(window, 'resize', this.resizeTicker.bind(this));
	_pageInfo = {};
	Arbiter.subscribe('Connect.Unsafe.getPageInfo', function(r, q) {
		var p = PlatformCanvasController.prototype.getIFrameName();
		PlatformCanvasController.prototype.eachIframe(function(s, t) {
			if (s.name != p)
				return;
			PlatformCanvasResponse.getPageInfo(s, _pageInfo, q);
		});
	});
}
PlatformCanvasController.prototype = {
	getIFrameName : function() {
		return location.protocol === 'https:' ? 'iframe_canvas_fb_https'
				: 'iframe_canvas';
	},
	getIFrameID : function() {
		return 'iframe_canvas';
	},
	initApplication : function(b, j, l, k, c, d, a, i, h, g, e) {
		var f = (this.appId == null);
		this.appId = b;
		this.sessionKey = j;
		this.appName = c;
		this.callback = d;
		this.isIFrame = h;
		this.isGame = g;
		this.channelUrl = null;
		PlatformCanvasController.prototype.initFlashHiding(e, h);
		this.sessionRefresh = (l * 900);
		if (b && j && l)
			setTimeout(this.refreshAppSession.bind(this), this.sessionRefresh);
		Arbiter.inform('PLATFORM_HAS_SESSION_DATA', {
			api_key : a,
			session : {
				session_key : j,
				uid : this.uid,
				expires : l,
				secret : k
			}
		}, Arbiter.BEHAVIOR_PERSISTENT);
		if (this.isIFrame)
			Event.listen($(this.getIFrameID()), 'load', function() {
				this.channelUrl = null;
			}.bind(this));
		if (i && !f)
			this.refreshAd();
	},
	isAllowedCallbackUrl : function(b) {
		var a = new URI(this.callback);
		return a.getProtocol() === b.getProtocol()
				&& (b.getDomain() === a.getDomain() || b.getDomain().endsWith(
						'.' + a.getDomain()));
	},
	isFBXDProxy : function(a) {
		if (a.getPath() !== '/connect/xd_proxy.php')
			return false;
		return a.getDomain() === 'static.ak.fbcdn.net'
				|| a.getDomain() === 's-static.ak.fbcdn.net'
				|| a.getDomain() === 'static.beta.fbcdn.net'
				|| a.getDomain() === 's-static.beta.fbcdn.net' || 0;
	},
	validateChannel : function(c) {
		var b = new URI(c);
		if (this.isAllowedCallbackUrl(b))
			return true;
		if (!this.isFBXDProxy(b))
			return false;
		var a = new URI(URI.explodeQuery(b.getFragment()).origin);
		return this.isAllowedCallbackUrl(a);
	},
	_autoRefresh : 240000,
	_refreshAfterUserActivity : 5000,
	autoRefreshAd : function(a, b) {
		this._autoRefresh = a;
		this._refreshAfterUserActivity = b;
		UserActivity.subscribe(function() {
			var c = Date.now();
			if (c - this.lastRefreshAd >= this._autoRefresh
					- this._refreshAfterUserActivity) {
				setTimeout(this.refreshAd.bind(this),
						this._refreshAfterUserActivity);
				this.lastRefreshAd = c + this._refreshAfterUserActivity;
			}
		}.bind(this));
	},
	_numPopups : 0,
	_onOpened : null,
	_onClosed : null,
	setOnPopups : function(b, a) {
		this._onOpened = Arbiter.subscribe('layer_shown', b);
		this._onClosed = Arbiter.subscribe('layer_hidden', a);
	},
	initFlashHiding : function(a, c) {
		if (this._onClosed) {
			Arbiter.unsubscribe(this._onClosed);
			this._onClosed = null;
		}
		if (this._onOpened) {
			Arbiter.unsubscribe(this._onOpened);
			this._onOpened = null;
		}
		if (a) {
			var b = $('pagelet_canvas_content');
			var e = function() {
				if (++this._numPopups === 1)
					CSS.setStyle(b, 'visibility', 'hidden');
			}.bind(this);
			var d = function() {
				if (--this._numPopups === 0)
					CSS.setStyle(b, 'visibility', '');
			}.bind(this);
			this.setOnPopups(e, d);
		} else if (c)
			CanvasIFrame.initFlashHiding(this);
	},
	requireLogin : function() {
		var a = FB.IFrameUtil.CanvasUtilServer.loginResponse;
		FBML.requireLogin(this.appId, a.bind(null, true), a.bind(null, false),
				null, true, true);
	},
	closeLogin : function() {
		FBML.closeLoginDialog();
	},
	showFeedDialog : function(c, d, a, b, f, e) {
		FBML.showFeedDialog(this.appId, c, d, a, b,
				FB.IFrameUtil.CanvasUtilServer.loginResponse.bind(null), f, e);
	},
	refreshAppSession : function() {
		new AsyncRequest().setURI('/ajax/session.php').setData({
			app_id : this.appId,
			session_key : this.sessionKey
		}).setReadOnly(true).setHandler(
				function(b) {
					var a = b.getPayload();
					if (a.session_end > 0)
						setTimeout(this.refreshAppSession.bind(this),
								this.sessionRefresh);
				}.bind(this)).send();
	},
	changeUrlSuffix : function(c, a) {
		this.currentUri = URI.getRequestURI().getUnqualifiedURI();
		var b = new URI(this.getAppPrefix() + c);
		if (this.currentUri.toString() != b.toString()) {
			this.currentUri = b;
			this.refreshAd();
			PageTransitions.go(b.toString(), a && ua.ie());
		}
	},
	getAppPrefix : function() {
		return "/" + this.appName + "/";
	},
	refreshAd : function() {
		if (this.uid > 0)
			UIPagelet.loadFromEndpoint('WebEgoPane', 'pagelet_ego_pane', {
				pid : 9,
				data : [ this.appId ]
			}, {
				handler : this.resizeTicker.bind(this)
			});
	},
	handlePageTransition : function(a) {
		return this.handleIFrameChange(a) || this.handleApplicationChange(a)
				|| false;
	},
	handleIFrameChange : function(a) {
		if (!this.isIFrame || !this.channelUrl || this._movingPage
				|| !a.getPath().startsWith('/' + this.appName + '/'))
			return false;
		a = a.getUnqualifiedURI();
		a.setPath('/' + a.getPath().split('/').slice(2).join('/'));
		XD.send({
			path : a.toString()
		}, this.channelUrl);
		PageTransitions.transitionComplete();
		return true;
	},
	handleApplicationChange : function(i) {
		if (this._movingPage || i.getSubdomain() != 'apps')
			return false;
		var c = null;
		var a = DOM.scry(document, 'a[data-appname]');
		for ( var e = 0; e < a.length; e++)
			if (a[e].href == i) {
				c = a[e].getAttribute('data-appname');
				break;
			}
		if (!c) {
			var b = DOM.scry(document, 'div[data-appname]');
			for ( var f = 0; f < b.length; f++) {
				var g = b[f];
				if (g.getAttribute('data-ajaxify') == i) {
					c = g.getAttribute('data-appname');
					break;
				}
			}
		}
		if (!c)
			return false;
		var d = i.getPath().split('/')[1];
		DOM.empty($('pagelet_canvas_content'));
		DOM.setContent($('canvas_throbber_text'), _tx("Loading {app-name}", {
			'app-name' : c
		}));
		if (ge('pagelet_ticker'))
			new AsyncRequest().setURI(
					new URI('/ajax/canvas/applanding_story.php')).setData({
				fb_app_name : d
			}).setMethod('GET').setReadOnly(true).setHandler(
					this.insertAppLandingStories.bind(this)).send();
		var h = i.getUnqualifiedURI();
		new AsyncRequest().setURI(new URI('/ajax/canvas.php')).setData({
			fb_app_name : d,
			uri : h.toString()
		}).setMethod('GET').setReadOnly(true).setStatusElement(
				'canvas_throbber').setHandler(
				this.completeApplicationChange.bind(this)).send();
		return true;
	},
	completeApplicationChange : function(g) {
		var e = g.getPayload();
		var a = $('pagelet_canvas_footer_content');
		var d = $('pagelet_canvas_nav_content');
		var b = $('pagelet_canvas_content');
		if (this.centerFixedWidthContent) {
			CSS.conditionClass(document.body, 'center_fixed_width_app',
					!e.is_liquid);
		} else
			CSS.conditionClass(document.body, 'liquid', e.is_liquid);
		DOM.setContent(b, HTML(e.main_html));
		if (!e.app_id) {
			this.resizeTicker();
			PageTransitions.transitionComplete();
			return;
		}
		var h = this.getTicker();
		h.setCurrentAppId(e.app_id);
		if (e.ticker_channel)
			h.setPushChannel(e.ticker_channel);
		if (a) {
			var c = $('brand_info');
			var f = $('report_link');
			DOM.setContent(c, e.app_name);
			c.setAttribute('href', new URI(e.about_link));
			f.setAttribute('href', new URI('/ajax/report_app.php?app_id='
					+ e.app_id));
			f.setAttribute('title', _tx("Report problems with {app-name}", {
				'app-name' : e.app_name
			}));
		}
		PageTransitions.transitionComplete();
	},
	getTicker : function() {
		return TickerController.getInstance(DOM.scry($('pagelet_ticker'),
				'.tickerActivityStories')[0]);
	},
	insertAppLandingStories : function(b) {
		var a = b.getPayload();
		TickerController.hideStoriesByClass('.canvasAppLandingStory_'
				+ this.appId);
		if (a.content) {
			var d = this.getTicker();
			var c = $A(a.content);
			c.each(function(e) {
				if (e)
					d.queueStoryMarkup(e);
			});
		}
	},
	handleFriendComeOnline : function(b, a) {
		if (!this.isGame)
			return;
		new AsyncRequest('/ajax/canvas/friend_online_story.php').setData({
			ids : a.friend_uid,
			games : a.games
		}).setMethod('POST').setOption('asynchronous', true).setRelativeTo(
				'body').send();
	},
	goURI : function(a) {
		this._movingPage = true;
		PageTransitions.go(new URI(a));
	},
	eachIframe : function(b) {
		if (typeof b != 'function')
			return;
		var a = document.getElementsByTagName('iframe');
		for ( var c = 0; c < a.length; c++)
			b(a[c], c);
	},
	refreshUrl : function(c) {
		var a = c.href;
		if (a.startsWith(this.callback)) {
			var b = new URI(a.substring(this.callback.length));
			this.changeUrlSuffix(b, true);
		}
		return false;
	},
	resizeTicker : function() {
		if (!ge('pagelet_ticker') || ua.ie() < 7)
			return;
		var f = this.tickerDisplayConfig.non_divebar_min_ticker_height;
		var e = f + 2;
		var d = $('pagelet_ego_pane');
		var h = Parent.byClass($('pagelet_ticker'), 'canvasTicker');
		var g = DOM.find(h, '.ticker_container');
		var b = CSS.hasClass(document.body, 'canvas_fixed') ? 'viewport'
				: 'document';
		var c = Vector2.getElementDimensions(d).y;
		if (!CSS.hasClass(document.body, 'canvas_fixed'))
			c += 46;
		var a = Vector2.getViewportDimensions().y
				- Vector2.getElementPosition(h, b).y - c;
		if (a <= e) {
			CSS.setStyle(g, 'max-height', f + 'px');
			CSS.setStyle(g, 'height', f + 'px');
			CSS.removeClass(document.body, 'canvas_fixed');
		} else {
			CSS.addClass(document.body, 'canvas_fixed');
			CSS.setStyle(g, 'max-height', a + 'px');
			CSS.setStyle(g, 'height', a + 'px');
		}
	}
};
var CanvasResizer = {
	_resizeListener : null,
	_smartIframes : [],
	smartSizingFrameAdded : function() {
		this._smartIframes = [];
		PlatformCanvasController.prototype.eachIframe(function(a, b) {
			if (CSS.hasClass(a, 'smart_sizing_iframe')
					&& !CSS.hasClass(a, 'noresize')) {
				CSS.removeClass(a, 'canvas_iframe_util');
				this._smartIframes.push(a);
			}
		}.bind(this));
		this._resizeSmartFrames();
		this._resizeListener = Event.listen(window, 'resize',
				this._resizeSmartFrames.bind(this));
	},
	_resizeSmartFrames : function() {
		var b, a = document.documentElement;
		if (window.innerHeight) {
			b = window.innerHeight;
		} else if (a && a.clientHeight) {
			b = a.clientHeight;
		} else
			b = document.body.clientHeight;
		for ( var c = 0; c < this._smartIframes.length; c++)
			if (!CSS.hasClass(this._smartIframes[c], 'noresize')) {
				var d = b - elementY(this._smartIframes[c]) - 61;
				this._smartIframes[c].style.height = d
						/ (this._smartIframes.length - c) + 'px';
			}
	}
};
Arbiter.subscribe('Connect.Unsafe.setSize', function(c, b) {
	var a = PlatformCanvasController.prototype.getIFrameName();
	if (b.frame && b.frame != a)
		return;
	PlatformCanvasController.prototype.eachIframe(function(d, f) {
		if (d.name != a)
			return;
		var e = parseInt(b.height, 10);
		d.style.height = e + 'px';
		d.style.overflowY = 'hidden';
		CSS.addClass(d, 'noresize');
	});
});
Arbiter.subscribe('Connect.Unsafe.scrollTo', function(b, a) {
	var c = parseInt(a.x, 10), d = parseInt(a.y, 10);
	if (c >= 0 && d >= 0)
		window.scrollTo(c, d);
});
var CanvasIFrameLogger = {
	log : function(b, a) {
		var c = (typeof window._browser == "undefined") ? 'unknown'
				: window._browser;
		var d = {
			tti_ms : b,
			app_id : a,
			is_early_flush : typeof window._is_auto_flush != "undefined",
			browser : c
		};
		report_data('app_tti', {
			gt : d
		});
	}
};
GiftCredits = {
	dialog : null,
	callback : null,
	purchaseLock : false,
	purchaseLockExpiryThreshold : 5000,
	purchaseLockTimeoutId : null,
	getPurchaseCreditPrompt : function(b, c, d, a) {
		GiftCredits.main(b, null, null, null, d, null, null, null,
				'BuyCredits', {}, a);
	},
	getPurchaseCreditPromptPopup : function(c, d, b) {
		var n = 550, f = 150, a = typeof window.screenX != 'undefined' ? window.screenX
				: window.screenLeft, k = typeof window.screenY != 'undefined' ? window.screenY
				: window.screenTop, i = typeof window.outerWidth != 'undefined' ? window.outerWidth
				: document.documentElement.clientWidth, h = typeof window.outerHeight != 'undefined' ? window.outerHeight
				: (document.documentElement.clientHeight - 22), j = (a < 0) ? window.screen.width
				+ a
				: a, g = parseInt(j + ((i - n) / 2), 10), l = parseInt(k
				+ ((h - f) / 2.5), 10), e = ('width=' + n + ',height=' + f
				+ ',left=' + g + ',top=' + l + ',scrollbars=1'), m = URI()
				.setSubdomain('www').setPath('/dialog/pay').addQueryData({
					app_id : c,
					flow_type : 'BuyCredits',
					next : 'http://www.facebook.com/',
					display : 'popup',
					internal_popup : 'true',
					dev_purchase_params : JSON.stringify(d),
					additional_params : JSON.stringify(b)
				}).toString();
		window.open(m, 'pay', e);
	},
	redeemGiftcard : function(b, a) {
		GiftCredits.main(b, null, null, document.location.toString(), null,
				null, null, null, 'BuyCredits', {
					shortcut : 'giftcard'
				}, a);
	},
	getPrompt : function(c, n, j, d, e, l, b, f, i, h, a, m, k, g) {
		GiftCredits.main(c, n, j, d, e, l, b, f, i, h, a, m, k, g);
	},
	main : function(c, p, k, e, f, n, b, g, j, i, a, o, l, h) {
		if (window != window.top)
			return false;
		if (GiftCredits.isPurchaseLocked())
			return false;
		GiftCredits.setPurchaseLock(true);
		var m = {
			method : 'pay',
			display : 'async',
			app_id : c,
			receiver : p,
			api_key : b,
			credits_purchase : h,
			flow_type : j,
			next : e,
			dev_purchase_params : JSON.stringify(i),
			additional_params : JSON.stringify(a),
			order_info : JSON.stringify(k),
			product : o,
			package_id : l,
			canvas_url_path : document.location.pathname
		};
		var d = new AsyncRequest().setURI('/fbml/ajax/uiserver.php').setData(m)
				.setMethod('GET').setReadOnly(true).setStatusElement(
						'commerce_get_more_loading');
		GiftCredits.callback = f;
		GiftCredits.dialog = new Dialog().setAsync(d).setModal(true)
				.setCancelHandler(GiftCredits.onCancel).setCloseHandler(f)
				.show();
	},
	onCancel : function(c) {
		var b = Dialog.getCurrent();
		if (b && !(b.getButtonElement(Dialog.CANCEL) || c))
			return false;
		if (GiftCredits.callback) {
			var a = {
				error_code : 1383010,
				error_message : 'User canceled the order.'
			};
			GiftCredits.callback(a);
		}
		GiftCredits.setPurchaseLock(false);
		if (c)
			GiftCredits.dialog.hide();
	},
	isPurchaseLocked : function() {
		return GiftCredits.purchaseLock;
	},
	setPurchaseLock : function(a) {
		GiftCredits.purchaseLock = a;
		if (a) {
			GiftCredits.purchaseLockTimeoutId = setTimeout(function() {
				GiftCredits.setPurchaseLock(false);
			}, GiftCredits.purchaseLockExpiryThreshold);
		} else
			clearTimeout(GiftCredits.purchaseLockTimeoutId);
		return true;
	}
};
function triggerCreditsPromptFromXd(b, a) {
	callback = function(c) {
		XD.send({
			response : JSON.stringify(c)
		}, a.channel);
	};
	GiftCredits.getPrompt(a.app_id, a.receiver, a.order_info, a.back_url,
			callback, null, null, null, a.action, a.dev_purchase_params,
			a.additional_params, a.product, a.package_id, a.credits_purchase);
}
onloadRegister(function() {
	Arbiter.subscribe('Connect.Unsafe.Pay.Prompt', triggerCreditsPromptFromXd);
});
var FBPay = {
	registerServiceForIFrame : function() {
		if (!FBPay._rpcServer) {
			var a = {
				submitOrder : {
					asyncMethod : FBPay.onSubmitOrderRequest
				}
			};
			FBPay._rpcServer = new FB.XdComm.XdRpcServer('PaymentsServer', a);
		}
	},
	onSubmitOrderRequest : function(e, f, n) {
		var d = e.app_id;
		var j = e.order_info;
		var l = e.product;
		var k = e.package_id;
		var a = e.action;
		var m = e.receiver;
		var i = e.next_url;
		var c = e.api_key;
		var g = {
			oscif : e.oscif,
			shortcut : e.shortcut,
			deal_id : e.deal_id,
			product_id : e.product_id,
			geo : e.geo,
			credits_acquisition : e.credits_acquisition
		};
		if (e.dev_purchase_params)
			for ( var h in e.dev_purchase_params)
				g[h] = e.dev_purchase_params[h];
		var b = {
			logging_data : {
				purchase_type : e.purchase_type
			}
		};
		GiftCredits.getPrompt(d, m, j, i, f, null, c, null, a, g, b, l, k,
				e.credits_purchase);
	}
};
var PlatformFeedForm = {
	blockLinks : function() {
		var a = DOM.scry($('preview_container'), 'a');
		a.forEach(function(b) {
			Event.listen(b, 'click', function(c) {
				c.kill();
			}, Event.Priority.URGENT);
		});
		return this;
	}
};
function scribe_log(a, b) {
	new AsyncSignal('/ajax/scribe_log.php', {
		category : a,
		message : b
	}).send();
}
function textLimit(b, a) {
	var c = ge(b);
	if (c.value.length > a) {
		c.value = c.value.substring(0, a);
		if (arguments.length > 2)
			$(arguments[2]).style.display = 'block';
	}
}
function textLimitStrict(h, d, e, a, f) {
	var g = ge(h);
	if (g) {
		var c = g.value.length;
		var b = c - d;
		if (b > 0) {
			if (b > 25000) {
				g.value = g.value.substring(0, d + 25000);
				b = 25000;
			}
			$(e).style.display = 'block';
			$(a).innerHTML = b;
			$(f).disabled = true;
		} else if (c == 0) {
			$(e).style.display = 'none';
			$(f).disabled = true;
			$(a).innerHTML = 1;
		} else if ($(a).innerHTML != 0) {
			$(a).innerHTML = 0;
			$(e).style.display = 'none';
			$(f).disabled = false;
		}
	}
}
var PlaceActionLink = {
	start_claim_link : function(b) {
		var a = new AsyncRequest().setMethod('POST').setURI(
				'/ajax/places/claim/start_claim.php').setData({
			id : b
		});
		new Dialog().setAsync(a).show();
		return false;
	},
	refer_claim_link : function(b) {
		var a = new AsyncRequest().setMethod('POST').setURI(
				'/ajax/places/claim/refer_claim.php').setData({
			id : b
		});
		new Dialog().setAsync(a).show();
		return false;
	}
};