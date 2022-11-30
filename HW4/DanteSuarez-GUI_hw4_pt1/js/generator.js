
/*
    Name: Dante Suarez
    Date: 11/20/2022
    Class: GUI Programming 1
    Assignment: HW4
    Email: dante_suarez@student.uml.edu 
    Document: generator.js
*/

// Getter functions for each box of input
function get_low_col(){
    var low_col = document.getElementById("low_col").value;
    return low_col;
}

function get_high_col(){
    var high_col = document.getElementById("high_col").value;
    return high_col;
}

function get_low_row(){
    var low_row = document.getElementById("low_row").value;
    return low_row;
}

function get_high_row(){
    var high_row = document.getElementById("high_row").value;
    return high_row;
}

//Funtion that creates the table and writes it to the screen
function generate_table(){

    var validator = $("#form").validate();
    if(!validator.form()){ return; } 

    document.getElementById("low_col").className = "";
    document.getElementById("high_col").className = "";
    document.getElementById("low_row").className = "";
    document.getElementById("high_row").className = "";
    document.getElementById("multiplication_table").innerHTML = "";
    document.getElementById("message").innerHTML = "";


    var low_col = get_low_col();
    var high_col = get_high_col();
    var low_row = get_low_row();
    var high_row = get_high_row();
  
    //variables to check how many columns and rows we need
    var column_length = high_col - low_col;
    var row_length = high_row - low_row;


    //create table
    var table = document.createElement("table");
 
    //adds corner cell
    var corner_cell = document.createElement('th');
    corner_cell.innerHTML = 'x';

    var table_header = document.createElement('tr');
    table_header.appendChild(corner_cell);
  
    //For loop that creates all of the initial columns 
    for(var col = low_col, i = 0; i <= column_length; col++, i++){ 
        var tempth = document.createElement("th");
        tempth.innerHTML = col;
        table_header.appendChild(tempth);
    }

    table.appendChild(table_header);

    //For loop creates all of the necessary rows
    for(var i = 0, row = low_row; i <= row_length; i++, row++){

        var tr = document.createElement('tr');


        var tempth = document.createElement("th");
        tempth.innerHTML = row;


        tr.appendChild(tempth);


        //For loop calculates each cell and adds it to the multiplication table
        for(var col = low_col, j = 0; j <= column_length; j++, col++){

            var temptd = document.createElement('td');
            temptd.innerHTML = col * row;

            tr.appendChild(temptd);
        }

        table.appendChild(tr);

    }
    document.getElementById("multiplication_table").appendChild(table);

}

//////////////////////////////////////////////////////////////////////////
////////////////////////////    Form Validation       ////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    $("#form").validate({
        //rules
        rules: {
            low_col:{
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            high_col:{
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            low_row:{
                required: true,
                number: true,
                min: -50,
                max: 50,
            },
            high_row:{
                required: true,
                number: true,
                min: -50,
            },

        },

        //error messages
        messages: {
            low_col:{
                required: "Please enter an integer"
            },
            high_col:{
                required: "Please enter an integer",
            },
            low_row:{
                required: "Please enter an integer"
            },
            high_row:{
                required: "Please enter an integer",
            }
        },

    });

  });
