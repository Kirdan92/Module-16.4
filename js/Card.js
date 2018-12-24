// KLASA KANBAN CARD
function Card(id, name) {
  	var self = this;

  	this.id = id;
    this.name = name || 'No name given';
  	this.element = generateTemplate('card-template', { description: this.name }, 'li');

  	this.element.querySelector('.card').addEventListener('click', function (event) {
    	event.stopPropagation();

      if (event.target.classList.contains('btn-delete')) {
      		self.removeCard();
    	}
      if (event.target.classList.contains('btn-modify')) {
        var description = prompt('Enter new card name');
          self.modifyCard(description);
      }
  	});
}
Card.prototype = {
	removeCard: function() {
  var self = this;

  fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      self.element.parentNode.removeChild(self.element); // Czy tu ma byc self ?
    })
  },
  modifyCard: function(description) {
    var self = this;
    this.description = description;

    fetch(prefix + baseUrl + '/card/' + self.id, {method: 'PUT', headers: myHeaders})
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
          self.element.querySelector('p').innerHTML = description;
      });
  }
}