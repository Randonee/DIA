package note.server.controller.view;


import dia.util.UriUtil;
import dia.util.ConversionUtil;
import note.model.domain.*;
import note.client.platform.html.view.note.NoteView;

#if php
import php.Lib;
import php.Web;
#elseif neko
import neko.Lib;
import neko.Web;
#end

import dia.util.Settings;


class NoteViewController extends ViewControllerBase
{
    override public function handleRequest() : Void
    {
        var data:Dynamic = {};
        try
        { 
           data.notes = Lambda.array(Note.manager.search($uid > 0));
        }
        catch(error:Dynamic)
        {
            trace(error);
        }

    	addCssFile("style/comon.css");
    	addCoreJS("note/client/platform/html/view/note/NoteView");
        addCoreJS("note/client/platform/html/view/note/Header");
        addCoreJS("note/client/platform/html/view/note/NoteDisplay");

    	showView("note.client.platform.html.view.note.NoteView", data);
    }
}