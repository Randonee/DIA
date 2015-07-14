note.client.platform.html.view.note.NoteView = $hxClasses['note.client.platform.html.view.note.NoteView'] = function(props) {
	dia.js.JSView.call(this,note.client.platform.html.view.note.NoteView.TEMPLATE,props);
	this.refreshList();
};
note.client.platform.html.view.note.NoteView.__name__ = ["note","client","platform","html","view","note","NoteView"];
note.client.platform.html.view.note.NoteView.__super__ = dia.js.JSView;
for(var k in dia.js.JSView.prototype ) note.client.platform.html.view.note.NoteView.prototype[k] = dia.js.JSView.prototype[k];
note.client.platform.html.view.note.NoteView.prototype.notes = null;
note.client.platform.html.view.note.NoteView.prototype.hideViews = function() {
};
note.client.platform.html.view.note.NoteView.prototype.handleNotice = function(notice) {
	switch(notice[1]) {
	case 0:
		var status = notice[3];
		var data = notice[2];
		this.notes.push(data.note);
		break;
	case 2:
		var status1 = notice[3];
		var data1 = notice[2];
		dia.util.CollectionUtil.removeById(this.notes,data1.noteId);
		break;
	case 1:
		var status2 = notice[3];
		var data2 = notice[2];
		var note1 = dia.util.CollectionUtil.getById(this.notes,data2.note.uid);
		note1.name = data2.note.name;
		note1.body = data2.note.body;
		break;
	}
	this.refreshList();
	dia.js.JSView.prototype.handleNotice.call(this,notice);
};
note.client.platform.html.view.note.NoteView.prototype.refreshList = function() {
	var list = "<ul>";
	var _g = 0;
	var _g1 = this.notes;
	while(_g < _g1.length) {
		var note1 = _g1[_g];
		++_g;
		list += "<li><a href=\"javascript:;\" onclick=\"" + this.view + ".onListItemClick(" + note1.uid + ")\">" + note1.name + "</a> <a href=\"javascript:;\" onclick=\"" + this.view + ".onDeleteNote(" + note1.uid + ")\">(delete)</a> </li>";
	}
	list += "</ul>";
	this.getElement("notesList").innerHTML = list;
};
note.client.platform.html.view.note.NoteView.prototype.onDeleteNote = function(noteId) {
	this.signal.dispatch(dia.client.hap.Hap.DeleteNoteHap(new dia.client.hap.DeleteNoteHapData(noteId)));
};
note.client.platform.html.view.note.NoteView.prototype.onListItemClick = function(noteId) {
	this.noteDisplay.set_visible(true);
	this.noteDisplay.update(dia.util.CollectionUtil.getById(this.notes,noteId));
};
note.client.platform.html.view.note.NoteView.prototype.onAddNote = function() {
	this.signal.dispatch(dia.client.hap.Hap.AddNoteHap(new dia.client.hap.AddNoteHapData("New Note","")));
};
note.client.platform.html.view.note.NoteView.prototype.header = null;
note.client.platform.html.view.note.NoteView.prototype.noteDisplay = null;
note.client.platform.html.view.note.NoteView.prototype.__class__ = note.client.platform.html.view.note.NoteView;
note.client.platform.html.view.note.NoteView.prototype.__properties__ = $extend(dia.js.JSView.prototype.__properties__, {});
