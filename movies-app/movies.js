let currentId = 0;

moviesList = []


$(function(){
    $("#new-movie-form").on("submit", function(e){
        
        //creative new list and append to the Dom
        e.preventDefault();
        let title = $('#title').val();
        let rating= $('#rating').val();
        
        

        const moviesData = {title, rating, currentId};
        const appendNewList = createMovieDataHTML(moviesData);
        
        currentId++
        moviesList.push(moviesData);

        $('#movie-table-body').append(appendNewList);
        $(this).trigger('reset')
    });

    //remove list
    $('#movie-table-body').on('click', '.btn-danger', function(e){
        
        let removeListIdx = moviesList.findIndex(movies => movies.currentId === $(e.target).data('deleteId'));
        
        moviesList.splice(removeListIdx, 1);

        // $(e.target.parentElement.parentElement).remove();
        $(e.target).closest('tr').remove();
     });

     $('.fas').on("click", function(e){
         let direction = $(e.target).hasClass("fa-sort-down")? "down": "up";
         let keyToSortBy = $(e.target).attr('id');
         let sortmoviesList = sortBy(moviesList, keyToSortBy, direction);

         $('#movie-table-body').empty();
         
         for(let movies of sortmoviesList){
            const appendSortist = createMovieDataHTML(movies);
            $('#movie-table-body').append(appendSortist);
         }

         $(e.target).toggleClass("fa-sort-down");
         $(e.target).toggleClass("fa-sort-up");
     })

});

function sortBy(arry, keyToSortBy, direction){
        return arry.sort(function(a, b){
            if(keyToSortBy === "rating"){
                a[keyToSortBy] = parseInt(a[keyToSortBy]);
                b[keyToSortBy] = parseInt(b[keyToSortBy]);
            }
            if(a[keyToSortBy] > b[keyToSortBy]){
                return direction === "up"? 1 : -1;
            }
            else if(b[keyToSortBy]> a[keyToSortBy]){
                return direction === "up"? -1 : 1;
            }
            return 0
        });
}



function createMovieDataHTML(data){
    return `<tr>
    <td>${data.title}</td>
    <td>${data.rating}</td>
    <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    
    </tr>`
}