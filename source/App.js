/*

	Copyright 2014 Jan Thiemen Postema

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

*/

enyo.kind({
	name: "App",
	kind: "Panels",
	classes: "panels-sample-panels enyo-unselectable enyo-fit",
	arrangerKind: "CollapsingArranger",
	components: [
		{kind: "enyo.Signals", onbackbutton: "handleBackGesture"},
		{layoutKind: "FittableRowsLayout", components: [
			{kind: "PortsHeader", allowHtml: true, title: "File Manager", classes: "enyo-fill", taglines: [
				"Help translating!",
				"http://tiny.cc/slfmngr",
				"Look at all those files!"
			], components: [
				{kind: "onyx.Button", content: "Settings", ontap: "openSettings"}
			]},
			{kind: "List", name: "mainList", fit: true, touch: true, onSetupItem: "buildList", components: [
                {name: "item", style: "padding: 10px;", dir: false, classes: "panels-sample-item enyo-border-box", onhold: "itemHold", ontap: "itemTap", components: [
					{name: "thumbnail", kind: "Image", classes: "panels-sample-thumbnail"},
					{name: "title", classes: "panels-sample-title"}
				]}
			]}
		]},
		{name: "itemView", fit: true, kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Button", content: "Back", ontap: "showList"},
				{name: "file_title", content: "Header"},
			]},
			{tag: "br"},
			{kind: "Scroller", horizontal: "hidden", classes: "scroller", fit: true, touch: true, components:[
				{kind: "onyx.Groupbox", components: [
					{kind: "onyx.GroupboxHeader", name: "groupboxheader", content: "File information"},
					{name: "type", content: "Type: ", style: "padding: 8px; color: black;"},
					{name: "size", content: "Size: ", style: "padding: 8px; color: black;"},
					{name: "fileExtension", content: "File extension: ", style: "padding: 8px; color: black;"},
					{name: "full_path", content: "Full path: ", style: "padding: 8px; color: black;"},
				]},
				{kind:"onyx.Button", disabled: true, name: "removeButton", ontap: "remove", content: "Remove", classes: "onyx-negative"},
				{name: "mkDirPopup", kind: "onyx.Popup", floating: true, centered: true, style: "padding: 10px", components: [
					{kind: "onyx.InputDecorator", style: "color: black;", name: "newDirContainer", components: [
						{kind: "onyx.Input", style: "color: black;", name: "newDir",  placeholder: "Enter new folder name"}
					]},
					{kind:"onyx.Button", name: "createDirButton", ontap: "createDir", content: "Create folder", classes: "onyx-dark"}
				]},
				{kind:"onyx.Button", name: "createDirPopupButton", disabled: true, ontap: "createDirPopup", content: "New folder", classes: "onyx-dark"},
				{kind:"onyx.Button", name: "openFileButton", disabled: true, ontap: "openFile", content: "Open file", classes: "onyx-dark"},
				//move item list part
				{kind:"onyx.Button", name: "copyItemButton", disabled: true, ontap: "handleCopyTap", content: "Copy", classes: "onyx-dark"},
				{kind:"onyx.Button", name: "moveItemButton", disabled: true, ontap: "handleMoveTap", content: "Move", classes: "onyx-dark"},
				{name: "moveItemPopup", kind: "onyx.Popup", fit: true, floating: true,  style: "height: 95%; width: 100%;", components: [
					{kind:"onyx.Button", name: "moveItemListCloseButton", ontap: "moveItemCloseButton", fit: true, content: "Back"},
					{kind:"onyx.Button", name: "moveItemListButton", ontap: "moveItemSelectButton", fit: true, content: "Select folder"},
					{kind: "List", name: "moveList", style: "height: 90%; width: 95%;", touch: true, onSetupItem: "buildMoveList", components: [
						{name: "itemMove", style: "padding: 10px;", dir: false, classes: "panels-sample-item enyo-border-box", ontap: "moveItemTap", components: [
							{name: "thumbnailMove", kind: "Image", classes: "panels-sample-thumbnail"},
							{name: "titleMove", classes: "panels-sample-title"}
						]}
					]}
				]},
				{tag: "br"},
				{tag: "br"},
				{kind: "onyx.Groupbox", showing: false, name: "imageContainer", components: [
					{kind: "onyx.GroupboxHeader", name: "imageHeader", content: "Image"},
						{name: "imageItem", kind: "Image", style: "max-width: 100%; max-height: 100%;"},
				]},
				//end of move item list part
				{name: "errorPopupBase", kind: "onyx.Popup", floating: true, centered: true, style: "padding: 10px", components: [
					{name: "errorPopup", allowHtml: true, content: "Popup..."}
				]},
				{name: "languageSelectorPopup", kind: "onyx.Popup", floating: true, centered: true, style: "padding: 10px", components: [
					//{allowHtml: true, content: "Pick a language. Keep in mind, not all languages are ready. To help translating, go to <a href='http://tiny.cc/slfmngr'>click here</a>"},
					//{tag: "br"},
					{kind: "onyx.PickerDecorator", style:"padding:10px;", onSelect: "pickerHandler", components: [
						{allowHtml: true, content: "Pick a language. Keep in mind, not all languages are ready. To help translating, go to <a href='http://tiny.cc/slfmngr'>click here</a>"},
						{kind: "onyx.Picker", name: "languages", components: [
							{content: 'English', active:true},
							{content: 'Spanish'},
							{content: 'German'},
							{content: 'Dutch'},
							{content: 'Portuguese'}																																																							
						]},
					]},
					{kind:"onyx.Button", name: "selectLanguageButton", ontap: "selectLanguage", fit: true, content: "Select"}
				]}
			]}
		]},
		{name: "settingsView", fit: true, kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Button", content: "Back", ontap: "showList"},
				{name: "settingstitle", content: "Settings"},
			]},
			{tag: "br"},
			{kind: "Scroller", horizontal: "hidden", classes: "scroller", fit: true, touch: true, components:[
				{kind: "onyx.PickerDecorator", style:"padding:10px; width: calc(100% - 20px);", onSelect: "pickerHandler", components: [
					{allowHtml: true, content: "Pick a language. Keep in mind, not all languages are ready. To help translating, go to <a href='http://tiny.cc/slfmngr'>click here</a>"},
					{kind: "onyx.Picker", name: "languagesSettings", components: [
						{content: 'English', active:true},
						{content: 'Spanish'},
						{content: 'German'},
						{content: 'Dutch'},
						{content: 'Portuguese'}																																																							
					]},
				]},
				{kind:"onyx.Button", name: "selectLanguageButtonSettings", ontap: "selectLanguage", fit: true, content: "Save language"},
				{kind: "onyx.PickerDecorator", name: "storageDecorator", style:"padding:10px; width: calc(100% - 20px);", onSelect: "storageHandler", components: [
					{allowHtml: true, content: "Default storage: "},
					{kind: "onyx.Picker", name: "storageSettings"},
				]},
				{kind:"onyx.Button", name: "selectStorageButtonSettings", ontap: "selectStorage", fit: true, content: "Save default"}
			]}
		]}
	],
	//REPLACEMENTS FOR WebOS SERVICES//
	/*
	* getDirs() This function returns the contents of a given folder, which is then interpreted by getDirsComplete (an inheritance from the webOS version)
	*/
	getDirs: function(nextFolder) {
		/*if (navigator.getDeviceStorages) {
			console.log(navigator.getDeviceStorages("sdcard"));
			lsDefault = localStorage.getItem("defaultstorage");
			if(typeof lsDefault !== 'undefined' && lsDefault !== null) {
				//The default storage is already set
				defaultStorage = parseInt(localStorage.getItem("defaultstorage"));
			} else {
				availableStorages = navigator.getDeviceStorages("sdcard");
				console.log(
				//if(availableStorages.length == 1) localStorage.setItem("defaultstorage") = 0;
				else {
					for(i=0;i<availableStorages.length;i++) {
						console.log(availableStorages[i]);
					}
				}
			}
			availableStorages = navigator.getDeviceStorages("sdcard");
			if (isNaN(defaultStorage)) defaultStorage = 0;
			console.log(localStorage.getItem("defaultstorage"));
			this.sdcard = availableStorages[defaultStorage];
			if(availableStorages.length > 1) {
				for(var x = 0; x < availableStorages.length - 1; x++) {
					this.$.storageSettings.createComponent({content: availableStorages[x].storageName});
				}
				this.$.storageSettings.render()
				this.$.storageDecorator.show();
				this.$.selectStorageButtonSettings.show();
			} else {
				this.$.storageDecorator.hide();
				this.$.selectStorageButtonSettings.hide();
			}
		} else {*/
			this.sdcard = navigator.getDeviceStorage("sdcard");
			this.$.storageDecorator.hide();
			this.$.selectStorageButtonSettings.hide();
		//}
		
		console.log(navigator.getDeviceStorage("sdcard").storageName);
		var dirs = [];
		var files = [];
		while(nextFolder.charAt(0) === '/') nextFolder = nextFolder.substr(1);
		var cursor = this.sdcard.enumerate(nextFolder);
		console.log(nextFolder);
		parent = this;
		
		cursor.onsuccess = function () {
			var file = this.result;
			if (file != null) {
			
				current = file.name.replace(nextFolder,"");
				while(current.charAt(0) === '/') current = current.substr(1);
				current = current.split("/");
				//console.log(current);
				if (dirs.indexOf(current[0]) == -1 && files.indexOf(current[0]) == -1) {
					if (current.length > 1) {
						console.log("dir");
						dirs.push(current[0]);
					} else if (current[0] != ".dir"){
						console.log("file");
						files.push(current[0]);
					}
				}
			} else this.done = true;
			
			if (!this.done) {
				this.continue();
			} else {
				data = {"dirs": dirs, "files": files};
				parent.getDirsComplete(data);
			}
		}
		cursor.onerror = function () {
			console.warn("No file found: " + this.error);
		}
	},
	getFileSize: function(filename) {
		var sdcard = navigator.getDeviceStorage('sdcard');

		while(filename.charAt(0) === '/') filename = filename.substr(1);
		var request = sdcard.get(filename);
		parent = this;
		request.onsuccess = function () {
			var file = this.result;
			if (file.size > 1000000000) {
				var size = file.size / 1000000000;
				var type = "gb";
			} else if (file.size > 1000000) {
				var size = file.size / 1000000;
				var type = "mb";
			} else if (file.size > 1000) {
				var size = file.size / 1000;
				var type = "kb";
			} else {
				var size = file.size;
				var type = "bytes";
			}
			parent.$.size.setContent(parent.getString("Size: ")+size+" "+type);
		}

		request.onerror = function () {
			console.warn("Unable to get the file: " + this.error);
		}

	},
	getFileType: function(filename) {
		var sdcard = navigator.getDeviceStorage('sdcard');

		while(filename.charAt(0) === '/') filename = filename.substr(1);
		var request = sdcard.get(filename);
		parent = this;
		request.onsuccess = function () {
			console.log(this.result);
			var file = this.result;
			parent.$.type.setContent(parent.getString("Type: ")+file.type);
			//return file.size;
		}

		request.onerror = function () {
			console.warn("Unable to get the file: " + this.error);
		}

	},
	openFile: function() {
		var sdcard = navigator.getDeviceStorage('sdcard');
		console.log(sdcard);
		var current = this.selectedItem.full_path;
		while(current.charAt(0) === '/') current = current.substr(1);
		var request = sdcard.get(current);
		parent = this;

		request.onsuccess = function () {
			var file = this.result;
			var activity = new MozActivity({
				name: "open",
				data: {
					type: file.type,
					blob: file
				}
			});
			activity.onsuccess = function() {
				console.log("A file has been retrieved");
			};
			activity.onerror = function() {
				var activity = new MozActivity({
					name: "view",
					data: {
						type: file.type,
						url: "file://"+current
					}
				});
				activity.onsuccess = function() {
					console.log("A file has been retrieved");
				};
				activity.onerror = function() {
					parent.$.errorPopup.setContent(parent.getString("Error: no file handler available"));
					parent.$.errorPopupBase.show();
				};
			};
		}

		request.onerror = function () {
			parent.$.errorPopup.setContent(parent.getString("Error: unable to retrieve the file"));
			parent.$.errorPopupBase.show();
		}
	},
	remove: function() {
		var sdcard = navigator.getDeviceStorage('sdcard');
		
		var current = this.selectedItem.full_path;
		while(current.charAt(0) === '/') current = current.substr(1);
		var request = sdcard.delete(current);
		parent = this;

		request.onsuccess = function () {
			parent.$.errorPopup.setContent(parent.getString('Item deleted. Press "../" to go back.'));
			parent.$.errorPopupBase.show();
		}

		request.onerror = function () {
			//console.log("Unable to delete the file: " + this.error);
			parent.$.errorPopup.setContent(parent.getString('Item could not be deleted. Errormessage: ')+this.error);
			parent.$.errorPopupBase.show();
		}
	},
	moveFile: function(oldPath, newPath) {
		var sdcard = navigator.getDeviceStorage('sdcard');
		while(oldPath.charAt(0) === '/') oldPath = oldPath.substr(1);
		while(newPath.charAt(0) === '/') newPath = newPath.substr(1);

		if (this.currentMode == "move") var message = "moved";
		else var message = "copied";
		
		var request = sdcard.get(oldPath);
		parent = this;
		request.onsuccess = function () {
			var file = this.result;
			var request = sdcard.addNamed(file, newPath);

			request.onsuccess = function () {
				var name = this.result;
				if (this.currentMode == "move") {
					var requestDel = sdcard.delete(oldPath);

					requestDel.onsuccess = function () {
						parent.$.moveItemPopup.hide();
						parent.$.errorPopup.setContent(parent.getString("Item copied!"));
						parent.$.errorPopupBase.show();
					};

					requestDel.onerror = function () {
						parent.$.moveItemPopup.hide();
						parent.$.errorPopup.setContent(parent.getString("Item could not be ")+message);
						parent.$.errorPopupBase.show();
					};
				} else {
					parent.$.moveItemPopup.hide();
					parent.$.errorPopup.setContent(parent.getString("Item ")+message);
					parent.$.errorPopupBase.show();
				}
			} 
			
			// An error typically occur if a file with the same name already exist
			request.onerror = function () {
				parent.$.moveItemPopup.hide();
				parent.$.errorPopup.setContent(parent.getString("Item could not be ")+message);
				parent.$.errorPopupBase.show();
			}
		}
		request.onerror = function () {
			parent.$.moveItemPopup.hide();
			parent.$.errorPopup.setContent(parent.getString("Item could not be ")+message);
			parent.$.errorPopupBase.show();
		}		
	},
	//Move file list
	handleMoveTap: function(inSender, inEvent) {
		this.currentMode = "move";
		this.moveItemOpen();
	},
	handleCopyTap: function(inSender, inEvent) {
		this.currentMode = "copy";
		this.moveItemOpen();
	},
	moveItemCloseButton: function(inSender, inEvent) {
		this.$.moveItemPopup.hide();
	},
	moveItemOpen: function(inSender, inEvent) {
		this.$.moveItemPopup.show();
		this.currentList = "move";
		this.currentMoveDir = "";
		this.getDirs(this.currentMoveDir);
	},
	moveItemTap: function(inSender, inEvent) {
		this.selectedMoveItem = this.moveResults[inEvent.index];
		this.currentList = "move";
		
		if (this.selectedMoveItem.dir) {
			if (this.selectedMoveItem.title == "../") {
				//build the path of the underlying directory
				dirsArray = this.currentMoveDir.substring(1).split("/");
				var currentDirTemp = "";
				for (var i = 0; i < dirsArray.length-1; i++) {
					currentDirTemp += "/"+dirsArray[i];
				}
				if (currentDirTemp == "") currentDirTemp = "/";
				this.currentMoveDir = currentDirTemp;
			} else {
				this.currentMoveDir += "/"+this.selectedMoveItem.title;
			}
		this.getDirs(this.currentMoveDir);
		}
	},
	moveItemSelectButton: function(inSender, inEvent) {
		this.moveFile(this.selectedItem.full_path, this.currentMoveDir+"/"+this.selectedItem.title);
	},
	initMoveList: function() {
		this.$.moveList.setCount(this.moveResults.length);
		this.$.moveList.reset();
	},
	buildMoveList: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.moveResults[i];
		this.$.itemMove.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
        this.$.itemMove.dir = item.dir;
		this.$.thumbnailMove.setSrc(item.thumbnail);
		this.$.titleMove.setContent(item.title || this.getString("Untitled"));
	},
	//End of move file list
	createDirPopup: function() {
		this.$.mkDirPopup.show();
	},
	initList: function() {
		this.$.mainList.setCount(this.results.length);
		this.$.mainList.reset();
	},
	rendered: function() {
		if (localStorage.getItem("firstuse") != "true") this.showFirstUse();
		else this.loadStrings(localStorage.getItem("language"));
		this.inherited(arguments);
		this.currentList = "main";
		this.currentDir = "";
		this.getDirs(this.currentDir);
	},
	openSettings: function() {
		this.setIndex(2);
	},
	loadStrings: function(locale) {
		console.log("Loading language: "+locale);
		var request = new enyo.Ajax( { url: 'resources/'+locale+'.json', method: 'GET' } ).response( this, 'initStrings' ).go();
	},
	initStrings: function(inSender, inEvent) {
		this.strings = JSON.parse(inSender.xhrResponse.body);
		this.setContents();
	},
	getString: function(string) {
		return this.strings[string];
	},
	setContents: function() {
		this.$.file_title.setContent(this.getString("Header"));
		this.$.groupboxheader.setContent(this.getString("File information"));
		this.$.type.setContent(this.getString("Type: "));
		this.$.size.setContent(this.getString("Size: "));
		this.$.fileExtension.setContent(this.getString("File extension: "));
		this.$.full_path.setContent(this.getString("Full path: "));
		this.$.removeButton.setContent(this.getString("Remove"));
		this.$.createDirButton.setContent(this.getString("Create folder"));
		this.$.createDirPopupButton.setContent(this.getString("New folder"));
		this.$.openFileButton.setContent(this.getString("Open file"));
		this.$.copyItemButton.setContent(this.getString("Copy"));
		this.$.moveItemButton.setContent(this.getString("Move"));
		this.$.imageHeader.setContent(this.getString("Image"));
		this.$.errorPopup.setContent(this.getString("Popup..."));
		if(localStorage.getItem("firstuse") != "true") {
			this.$.errorPopup.setContent(this.getString('welcome'));
			this.$.errorPopupBase.show();
			localStorage.setItem("firstuse","true");
		}
	},
	showFirstUse: function() {
		this.$.languageSelectorPopup.show();
	},
	pickerHandler: function(inSender, inEvent) {
		this.selected = inEvent.selected.content;
		console.log(inEvent.selected);
	},
	selectLanguage: function() {
		var selected = this.selected;
		console.log(selected);
		if (selected == "English") var locale = "en_en";
		else if (selected == "Spanish") var locale = "es_es";
		else if (selected == "German") var locale = "de_de";
		else if (selected == "Dutch") var locale = "nl_nl";
		else if (selected == "Portuguese") var locale = "pt_pt";
		else var locale = "en_en";
		
		this.$.languageSelectorPopup.hide();
		
		localStorage.setItem("language",locale);
		this.loadStrings(locale);
	},
	reflow: function() {
		this.inherited(arguments);
	},
	buildList: function(inSender, inEvent) {
		var i = inEvent.index;
		var item = this.results[i];
		this.$.item.addRemoveClass("onyx-selected", inSender.isSelected(inEvent.index));
        this.$.item.dir = item.dir;
		this.$.thumbnail.setSrc(item.thumbnail);
		this.$.title.setContent(item.title || this.getString("Untitled"));
	},
	enableButtons: function() {
		this.$.removeButton.setDisabled(false);
		this.$.createDirPopupButton.setDisabled(false);
		this.$.openFileButton.setDisabled(false);
	},
	
	handleItemTap: function() {
		this.currentList = "main";
		this.$.moveItemButton.setDisabled(false);
		this.$.copyItemButton.setDisabled(false);
		this.enableButtons();
		
		if (this.selectedItem.dir) {
			if (this.selectedItem.title == "../") {
				//build the path of the underlying directory
				dirsArray = this.currentDir.substring(1).split("/");
				var currentDirTemp = "";
				for (var i = 0; i < dirsArray.length-1; i++) {
					currentDirTemp += "/"+dirsArray[i];
				}
				if (currentDirTemp == "") currentDirTemp = "/";
				this.currentDir = currentDirTemp;
				this.$.file_title.setContent(this.currentDir);
			} else {
				this.currentDir += "/"+this.selectedItem.title;
				this.$.file_title.setContent(this.selectedItem.title);
			}
			this.getDirs(this.currentDir);
			this.selectedItem['full_path'] = this.currentDir;
			this.$.type.setContent(this.getString("Type: folder"));
			this.$.size.hide();
			this.$.fileExtension.hide();
			this.$.createDirPopupButton.show();
			this.$.newDirContainer.show();
			this.$.openFileButton.hide();
			this.$.imageContainer.hide();
			this.$.moveItemButton.hide();
			this.$.copyItemButton.hide();
		} else {
			this.selectedItem['full_path'] = this.currentDir+"/"+this.selectedItem.title;
			this.$.file_title.setContent(this.selectedItem.title);
			//Check if item is an image
			var fileExtensionArr =  this.selectedItem.title.split(".");
			var fileExtension = fileExtensionArr[fileExtensionArr.length -1].toLowerCase();
			this.$.fileExtension.show();
			this.$.fileExtension.setContent(this.getString("File extension: ")+fileExtension);
			this.getFileType(this.selectedItem.full_path);
			this.$.size.show();
			this.$.createDirPopupButton.hide();
			this.$.newDirContainer.hide();
			this.$.openFileButton.show();
			this.$.moveItemButton.show();
			this.$.copyItemButton.show();
		}
		var current = this.selectedItem.full_path;
		while(current.charAt(0) === '/') current = current.substr(1);
		this.$.full_path.setContent(current);
		this.getFileSize(this.selectedItem.full_path);
	},
	
	itemTap: function(inSender, inEvent) {
		this.selectedItem = this.results[inEvent.index];
		this.handleItemTap();
	},
	itemHold: function(inSender, inEvent) {
		this.selectedItem = this.results[inEvent.index];
		this.handleItemTap();
		this.setIndex(1);
	},
	getDirsComplete: function(result) {
		//var result = inEvent.data;
		var dirs = result.dirs; 
		var files = result.files; 
		if (this.currentList == "main") {
			this.results = [];
			this.results.push({'thumbnail': 'assets/icon_folder.png','title':"../","dir":true});
			for (var i = 0; i < dirs.length; i++) {
				if (!dirs[i] == "") this.results.push({'thumbnail': 'assets/icon_folder.png','title':dirs[i],"dir":true});
			}
			for (var i = 0; i < files.length; i++) {
				if (!files[i] == "") this.results.push({'thumbnail': 'assets/icon_file.png','title':files[i],"dir":false});
			}
			this.initList();
		} else {
			this.moveResults = [];
			this.moveResults.push({'thumbnail': 'assets/icon_folder.png','title':"../","dir":true});
			for (var i = 0; i < dirs.length; i++) {
				if (!dirs[i] == "") this.moveResults.push({'thumbnail': 'assets/icon_folder.png','title':dirs[i],"dir":true});
			}
			this.initMoveList();
		}
	},
	createDir: function(inSender, inEvent) {
		var folderName = this.selectedItem.full_path+"/"+this.$.newDir.getValue();
		while(folderName.charAt(0) === '/') folderName = folderName.substr(1);
		var sdcard = navigator.getDeviceStorage("sdcard");
		var file = new Blob(["This is a dummy file in order for the device storage api to recognize this folder. This file is created by SL-Filemngr."], {type: "text/plain"});
		parent = this;
		var request = sdcard.addNamed(file, folderName+"/.dir");

		request.onsuccess = function () {
			var name = this.result;
			parent.$.errorPopup.setContent(parent.getString("Folder created"));
			parent.$.errorPopupBase.show();
		}

		// An error typically occur if a file with the same name already exist
		request.onerror = function () {
			parent.$.errorPopup.setContent(parent.getString("Folder could not be created. Error message: ")+this.error);
			parent.$.errorPopupBase.show();
		}

		this.$.mkDirPopup.hide();
	},
	openFileComplete: function(inSender, inEvent) {
		if (!inEvent.data.returnValue) {
			this.$.errorPopup.setContent(inEvent.data.errorText);
			this.$.errorPopupBase.show();
		}
	},
	storageHandler: function(inSender, inEvent) {
		this.selectedStorage = inEvent.selected.index;
		console.log(this.selectedStorage);
	},
	selectStorage: function() {
		localStorage.setItem("defaultstorage", this.selectedStorage);
		this.currentDir = "";
		this.getDirs(this.currentDir);
	},
	showList: function() {
		this.setIndex(0);
	}
});
