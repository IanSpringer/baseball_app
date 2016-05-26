
$(document).ready(function(){

  $.ajax({
    url: '/parks_visited.json',
    method: 'GET',

  })
  .done(function(data) {
      console.log('hello')
      data.forEach(function(stadium) {
        var tr = $('<tr style="color:white">');
        var $name = $('<td>').text(stadium.stadiumName)
        if (stadium.visited) {
          $name.css("text-decoration", "line-through")
        }
        tr.append( $name );

        $controls = $('<td>');
        var $editButton = $('<a>').text('Edit').attr( 'href', '/parks_visited/' + stadium._id);
        var $deletebutton = $('<a>').text('Delete').addClass('');

        $controls.append($editButton);
        $controls.append($deletebutton);

        tr.append($controls);

        $deletebutton.on('click', function(){
          console.log(stadium._id + "clicked");
          $.ajax({
            url: '/parks_visited/' + stadium._id,
            method: 'DELETE',
            success: function(){
              console.log("deleted");
              tr.remove();
            }
          });
        });

        $('#tbody').append(tr);

      });

  });

});
