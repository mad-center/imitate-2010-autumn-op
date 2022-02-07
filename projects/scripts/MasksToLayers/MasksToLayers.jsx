
/*
  "MasksToLayers.jsx"
  www.nabscripts.com 04.2006
  (revised 04.2007)
  (revised 02.2009)
      
  Place each mask of each selected layer on separate layers.
*/

{

	// user variables
	var WANT_TO_USE_ADD_BLENDING_MODE_FOR_THE_NEW_LAYERS                         =  false;
	var WANT_TO_MOVE_ANCHOR_POINT_TO_MASK_CENTER_FOR_THE_NEW_LAYERS    =  true;
	var WANT_TO_DISABLE_AUDIO_FOR_THE_NEW_LAYERS                                        =  true;
	var WANT_TO_TURN_OFF_VISIBILITY_FOR_INITIAL_SELECTION                            =  true;
	// end of user variables
	
	/*-----------------------------------------------------------------------------------------------------------------*/
	function removeLayerMasksExceptOne(layer, idToKeep)
	/*-----------------------------------------------------------------------------------------------------------------*/
	{
		for (var id = layer.Masks.numProperties; id > 0; id--)
		{
			if (id != idToKeep)
			{
				layer.Masks.property(id).remove();
			}
		}
	}
	
   /*-----------------------------------------------------------------------------------------------------------------*/	
	function getBezierPoint(pts,t)
    /*-----------------------------------------------------------------------------------------------------------------*/	
	{
        var cX = 3 * (pts[1][0]-pts[0][0]);
        var bX = 3 * (pts[2][0]-pts[1][0]) - cX;
        var aX = pts[3][0] - pts[0][0] - bX - cX;
        
        var cY = 3 * (pts[1][1]-pts[0][1]);
        var bY = 3 * (pts[2][1]-pts[1][1]) - cY;
        var aY = pts[3][1] - pts[0][1] - bY - cY;    
        
        var X = aX * Math.pow(t,3) + bX * Math.pow(t,2) + cX * t + pts[0][0];
        var Y = aY * Math.pow(t,3) + bY * Math.pow(t,2) + cY * t + pts[0][1];    
        
        return [X,Y]; 
    }

	/*-----------------------------------------------------------------------------------------------------------------*/	
	function moveAnchorPointToMaskCenter(layer)
	/*-----------------------------------------------------------------------------------------------------------------*/
	{
		var curTime = layer.containingComp.time;
		var shape = layer.Masks.property(1).maskShape.valueAtTime(curTime, false);
         var verts = shape.vertices;
		var intan = shape.inTangents;
		var outtan = shape.outTangents;           			
		
		// Discretization variables
		var numPts = 100;  
		var dt = 1 / (numPts - 1);                           
					
		// Top, Bottom, Left, Right of the mask bounding box
		var T = Infinity;
		var B = -Infinity;
		var L = Infinity;
		var R = -Infinity;
		
		// Add first vertex if it's a closed mask
		if (shape.closed) 
		{ 
			verts.push(verts[0]);
			intan.push(intan[0]);
			outtan.push(outtan[0]);
		}                        
	
		// Loop through each vertex
		for (var j = 0; j < verts.length - 1; j++) 
		{
			var pts = [verts[j], verts[j + 1]];                       
			var ins = [intan[j], intan[j + 1]];
			var outs = [outtan[j],outtan[j + 1]];
			
			var ctrlPts = [pts[0], pts[0] + outs[0], pts[1] + ins[1], pts[1]]; 
			
			var curve = new Array();                            
			
			curve.push(getBezierPoint(ctrlPts, 0));
			
			for (var n = 0; n < numPts; n++) 
			{
				curve.push(getBezierPoint(ctrlPts, n * dt)); 
				
				// Current segment
				var tail = curve[n];
				var head = curve[n + 1];
				
				var curT = Math.min(tail[1], head[1]);
				var curB = Math.max(tail[1], head[1]);
				var curL = Math.min(tail[0], head[0]);
				var curR = Math.max(tail[0], head[0]);
				
				// Update box coords
				if (curT < T) T = curT;
				if (curB > B) B = curB;
				if (curL < L) L = curL;
				if (curR > R) R = curR;
			}                       
		}                         
		
		// Reposition anchor point and adjust position
		var Xoffset = (R - L) / 2;
		var Yoffset = (B - T) / 2;
		
		var t = curTime;                
		var preExprB = false;
		
		var anchPt = layer.anchorPoint;
		var pos = layer.position;                
		
		var x = L + Xoffset;
		var y = T + Yoffset;
		var z = 0;                            
		
		var offset = [x,y,z] - anchPt.valueAtTime(t, preExprB);                                        
		
		var newAnchPt = [x,y,z];
		var newPos = pos.valueAtTime(t, preExprB) + offset;                
		
		if (anchPt.numKeys)
		{
			anchPt.setValueAtTime(t, newAnchPt);
		}
		else
		{
			anchPt.setValue(newAnchPt);
		}
	
		if (pos.numKeys)
		{
			pos.setValueAtTime(t, newPos);
		}
		else
		{
			pos.setValue(newPos);
		}	
	}

	/*-----------------------------------------------------------------------------------------------------------------*/
	function masksToLayers(layers)
	/*-----------------------------------------------------------------------------------------------------------------*/	
	{
		for (var layerId = 0; layerId < layers.length; layerId++) 
		{
			var layer = layers[layerId];
			
			if (layer.parent)
			{
				alert("\nParenting is not supported. Skipping layer '" + layer.name + "'...", "Masks To Layers");
				continue;
			}
		
			for (var maskId = 1; maskId <= layer.Masks.numProperties; maskId++) 
			{
				var dupLayer = layer.duplicate();
				
				removeLayerMasksExceptOne(dupLayer, maskId);
				
				dupLayer.name = (layer.name + " - " + layer.Masks.property(maskId).name).substring(0,31);			
				
				dupLayer.audioEnabled = !WANT_TO_DISABLE_AUDIO_FOR_THE_NEW_LAYERS;
				
				if (WANT_TO_USE_ADD_BLENDING_MODE_FOR_THE_NEW_LAYERS)
				{
					dupLayer.blendingMode = BlendingMode.ADD;
				}
				if (WANT_TO_MOVE_ANCHOR_POINT_TO_MASK_CENTER_FOR_THE_NEW_LAYERS)
				{
					moveAnchorPointToMaskCenter(dupLayer);
				}				
			}
		
			if (WANT_TO_TURN_OFF_VISIBILITY_FOR_INITIAL_SELECTION)
			{
				layer.enabled = false;
			}	
		}
	}

	/*-----------------------------------------------------------------------------------------------------------------*/	
	function main()
	/*-----------------------------------------------------------------------------------------------------------------*/
	{
		if (!app.project)
			return;
			
		var comp = app.project.activeItem;
		if (!comp || !(comp instanceof CompItem)) 
		{
			alert("Select at least one layer.", "Masks To Layers");
			return;
		}
					
		app.beginUndoGroup("Masks To Layers");
		
		masksToLayers(comp.selectedLayers);
		
		app.endUndoGroup();	
	}

	main();

}

