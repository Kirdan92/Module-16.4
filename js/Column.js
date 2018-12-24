function Column(id ,name) {
  	var self = this;

  	this.id = id;
  	this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  	this.element.querySelector('.column').addEventListener('click', function (event) {
		if (event.target.classList.contains('add-card')) {
			
		  	var cardName = prompt("Enter the name of the card");
		  	var data = new FormData();
			data.append('bootcamp_kanban_column_id', self.id);
			data.append('name', cardName);

		  	

		  	fetch(prefix + baseUrl + '/card', {
	      		method: 'POST',
	      		headers: myHeaders,
	      		body: data
		    })
		    .then(function(resp) {
		      	return resp.json();
		    })
		    .then(function(resp) {
		      	var card = new Card(resp.id. cardName);
		      	self.addCard(card);
		    });
		}
  		
	    if (event.target.classList.contains('btn-delete')) {
	      	self.removeColumn();
	    }

	    if (event.target.classList.contains('modify-column')) {
	    	var newName = prompt('Enter new column name');
	      	self.modifyColumn(newName);   	
	      	self.name = newName;
	    }
	

	});
}

Column.prototype = {
	addCard: function(card) {
	  this.element.querySelector('ul').appendChild(card.element);

	},
	removeColumn: function() {
	  var self = this;
	  fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
	    .then(function(resp) {
      		return resp.json();
	    })
	    .then(function(resp) {
      		self.element.parentNode.removeChild(self.element);
	    });
	},
	modifyColumn: function(newName) {
		var self = this;
		this.newName = newName;
		var data = new FormData();	
		data.append('name', newName);

		fetch(prefix + baseUrl + '/column/' + self.id, {method: 'PUT', headers: myHeaders, body: data})
		.then(function(resp) {
			return resp.json();
		})
		.then(function(resp) {
			
      		self.element.querySelector('h2').innerHTML = self.newName;
	    });
	}
};