function GrabzIt(key)
{
	return new (function(key)
	{	
		this.key = key;
		
		this.Create = function(url, options)
		{
			var protocol = '//';
			if (window.location.protocol != 'https' && window.location.protocol != 'http')
			{
				protocol = 'http://';
			}

			var grabzItUrl = protocol + 'api.grabz.it/services/javascript.ashx?key='+encodeURIComponent(this.key)+'&url=' + encodeURIComponent(url);

			for(var k in options)
			{
				if (k != 'format' && k != 'cache' && k != 'customWaterMarkId' && k != 'quality'
				&& k != 'country' && k != 'filename' && k != 'errorid' && k != 'errorclass' &&
				k != 'onfinish' && k != 'onerror' && k != 'delay' && k != 'bwidth' && k != 'bheight' &&
				k != 'height' && k != 'width' && k != 'target' && k != 'requestas' && k != 'download' && k != 'suppresserrors' && k != 'displayid' && k != 'displayclass' && k != 'background' && k != 'pagesize' && k != 'orientation' && k != 'includelinks' && k != 'includeoutline' && k != 'title' && k != 'coverurl' && k != 'mtop' && k != 'mleft' && k != 'mbottom' && k != 'mright' && k != 'tabletoinclude' && k != 'includeheadernames' && k != 'includealltables' && k != 'start' && k != 'duration' && k != 'speed' && k != 'fps' && k != 'repeat' && k != 'reverse')
				{
					throw "Option " + k + " not recognized!";
				}
				
				var v = options[k];
				if (v != null)
                		{
					grabzItUrl += '&' + k + '=' + encodeURIComponent(v);
				}
			}

			var scriptNode = document.createElement('script');
			scriptNode.src = grabzItUrl;

			return scriptNode;
		};		

		this.AddTo = function(container, url, options)
		{
			var elem = null;
			if (typeof container == 'string' || container instanceof String)
			{
				elem = document.getElementById(container);
				if (elem == null)
				{
					throw "An element with the id " + container + " was not found";
				}
			}
			else if (container.nodeType === 1)
			{
				elem = container;
			}

			if (elem == null)
			{
				throw "No valid element was provided to attach the screenshot to";
			}

			elem.appendChild(this.Create(url, options));
		}
	})(key);
}

function GrabzItPreviewFinished(id)
{
	var obj = document.getElementById("grabzit-screenshot-result");

	if (obj != null)
	{
		obj.removeAttribute("id");
		var children = obj.parentNode.parentNode.childNodes;

		for (var j = 0; j < children.length; j++)
		{
			if (children[j].className == "grabzit-preview-loader")
			{
				children[j].style.display = "none";
			}
			if (children[j].className == "grabzit-preview-screenshot-frame")
			{
				children[j].style.display = "block";
			}				
		}	
	}
}

function GrabzItPreview(key, options)
{
	this._guid = function()
	{
    	return this._s4() + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' + this._s4() + '-' + this._s4() + this._s4() + this._s4();
	}

	this._s4 = function() 
	{
    	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	
	this._getJSFunction = function(jsAttribute)
	{
		if (jsAttribute != null)
		{
			return jsAttribute + ";";
		}
		return "";
	}

	var __construct = function(that) 
	{	
		var width = 197;
		var height = 154;

		if (options != null)
		{
			if (options.width != null)
			{
				width = options.width;
			}
			if (options.height != null)
			{
				height = options.height;
			}
		}
		else		
		{
			options = new Array();
		}
		
		var links = document.getElementsByClassName("grabzit-preview");

		for (var i = 0; i < links.length; i++)
		{
			var link = links[i];
			var href = link.getAttribute("href");
			if (link.getAttribute("grabzit-href") != null)
			{
				href = link.getAttribute("grabzit-href");
			}	
			var captionText = link.getAttribute("title");
			var guid = that._guid();
			
			var rect = link.getBoundingClientRect()
			var pos = rect.left;
			var leftOrRight = "left";
			
			if ((pos + width + 50) > window.innerWidth)
			{
				leftOrRight = "right";
				pos = 10;
			}
			
			var div = document.createElement('div');
			div.setAttribute("style","display:none;z-index:100000;position:fixed;"+leftOrRight+":"+pos+"px;");
			div.id = guid;
			div.className = "grabzit-preview-container";

			var divLoading = document.createElement('div');
			divLoading.setAttribute("style","width:"+width+"px;height:"+height+"px;");
			divLoading.className = "grabzit-preview-loader";

			var img = document.createElement('img');
			img.src = "data:image/gif;base64,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";
			
			img.setAttribute("style","width:66px;height:66px;margin-left:"+(Math.round(width/2)-(66/2))+"px;margin-top:"+(Math.round(height/2)-(66/2))+"px;");

			divLoading.appendChild(img);

			div.appendChild(divLoading);

			var divFrame = document.createElement('div');
			divFrame.setAttribute("style","display:none;width:"+width+"px;height:"+height+"px;");
			divFrame.className = "grabzit-preview-screenshot-frame";
			
			options['width'] = width;
			options['height'] = height;
			options['displayid'] = 'grabzit-screenshot-result';
			options['errorid'] = 'grabzit-screenshot-result';
			options['errorclass'] = 'grabzit-preview-error';
			options['displayclass'] = 'grabzit-preview-screenshot';
			options['onfinish'] = 'GrabzItPreviewFinished';
			options['onerror'] = 'GrabzItPreviewFinished';
			
			try
			{
				GrabzIt(key).AddTo(divFrame, href, options);			
			}
			catch(e)			
			{
				alert(e);
			}
			
			div.appendChild(divFrame);			

			var divCaption = document.createElement('div');
			divCaption.innerHTML = captionText;
			divCaption.className = "grabzit-preview-caption";
			div.appendChild(divCaption);

			link.parentNode.insertBefore(div, link.nextSibling);
			link.setAttribute('onmouseout', that._getJSFunction(link.getAttribute('onmouseout')) + "document.getElementById('"+guid+"').style.display='none';");
			link.setAttribute('onmouseover', that._getJSFunction(link.getAttribute('onmouseover')) + "document.getElementById('"+guid+"').style.display='block';");
		}
	}(this)
}