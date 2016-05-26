

$(document).ready(function(){
  var myStadiums = []

  $.ajax({
    url: '/parks_visited.json',
    method: 'GET',

  })
  .done(function(data) {
      myStadiums = data;
      console.log('hello')
      console.log(data)
      data.forEach(function(stadium) {
        var tr = $('<tr style="color:blue; font-size:30px; margin:5%;">');
        var $name = $('<td>').text(stadium.stadiumName).css("font-family", "Fugaz One")
        if (stadium.visited) {
          $name.css("text-decoration", "line-through")
        }
        tr.append( $name );
        $controls = $('<td>');

        var $deletebutton = $('<a>').text('Delete').css("color", "white").css("margin", "5%")


        $controls.append($deletebutton);

        tr.append($controls);
        $name.on('click', function(){
        console.log('hi')
        $name.css('text-decoration', 'line-through')
        return(stadium.visited = true)
      });

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

      })

      })
    })
  console.log(myStadiums)








