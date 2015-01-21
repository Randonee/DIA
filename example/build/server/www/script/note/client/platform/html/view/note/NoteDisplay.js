note.client.platform.html.view.note.NoteDisplay = $hxClasses['note.client.platform.html.view.note.NoteDisplay'] = function(props) {
	dia.js.JSView.call(this,note.client.platform.html.view.note.NoteDisplay.TEMPLATE,props);
	this.nameInput = this.getElement("nameInput");
	this.bodyText = this.getElement("bodyText");
};
note.client.platform.html.view.note.NoteDisplay.__name__ = ["note","client","platform","html","view","note","NoteDisplay"];
note.client.platform.html.view.note.NoteDisplay.__super__ = dia.js.JSView;
for(var k in dia.js.JSView.prototype ) note.client.platform.html.view.note.NoteDisplay.prototype[k] = dia.js.JSView.prototype[k];
note.client.platform.html.view.note.NoteDisplay.prototype.note = null;
note.client.platform.html.view.note.NoteDisplay.prototype.nameInput = null;
note.client.platform.html.view.note.NoteDisplay.prototype.bodyText = null;
note.client.platform.html.view.note.NoteDisplay.prototype.update = function(note) {
	this.note = note;
	this.nameInput.value = note.name;
	this.bodyText.value = note.body;
};
note.client.platform.html.view.note.NoteDisplay.prototype.onUpdateNote = function() {
	this.note.name = this.nameInput.value;
	this.note.body = this.bodyText.value;
	this.signal.dispatch(dia.client.hap.Hap.UpdateNoteHap(new dia.client.hap.UpdateNoteHapData(this.note)));
};
note.client.platform.html.view.note.NoteDisplay.prototype.__class__ = note.client.platform.html.view.note.NoteDisplay;
note.client.platform.html.view.note.NoteDisplay.prototype.__properties__ = $extend(dia.js.JSView.prototype.__properties__, {});
