
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

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
////////////////////////////    Slider Widget       //////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

$(document).ready(function() {

      
    //Low column slider
    $("#low_col_slider").slider({

        //Default value, min and max
        value: 0,
        min: -50,
        max: 50,

        //update text box value if slider moves
        slide: function(event, ui) {
            $("#low_col").val(ui.value);
        },

        //generate table
        change: function(event, ui){
            generate_table();
        }
    });

    //move slider is the text box value changes
    $("#low_col").on("keyup", function() {
        $("#low_col_slider").slider("value", this.value);
    });
  
    //High column slider
    $("#high_col_slider").slider({

        //default value min and max values
        value: 0,
        min: -50,
        max: 50,

        //update text box if slider moves
        slide: function(event, ui) {
            $("#high_col").val(ui.value);
        },

        //gen table
        change: function(event, ui){
            generate_table();
        }
    });

    //move slider if text box value changes
    $("#high_col").on("keyup", function() {
        $("#high_col_slider").slider("value", this.value);
    });
  
    //Low row slider
    $("#low_row_slider").slider({
        //default value, min and max
        value: 0,
        min: -50,
        max: 50,

        //update text box value
        slide: function(event, ui) {
            $("#low_row").val(ui.value);
        },

        //generate table if there is a change
        change: function(event, ui){
            generate_table();
        }
    });

    //move slider if text box value changes
    $("#low_row").on("keyup", function() {
        $("#low_row_slider").slider("value", this.value);
    });
  
    //High row slider
    $("#high_row_slider").slider({

        //deafult value, min and max
        value: 0,
        min: -50,
        max: 50,

        //update text box value
        slide: function(event, ui) {
            $("#high_row").val(ui.value);
        },

        //gen table if there's a change
        change: function(event, ui){
            generate_table();
        } 
    });

    //move slider if text box value changes
    $("#high_row").on("keyup", function() {
        $("#high_row_slider").slider("value", this.value);
    });

});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//////////////////////     Tab Widget       //////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
    
    //Hide buttons at start because there are no tabs
    $("#tabs_cont").tabs().hide();
    $(".tabs_button").hide();

    //Code to make the tab display when it is clicked
    $("#tabs_cont").click("selectedTab", function(event,  ui){

        var tab = $("#tabs_cont").tabs('option', 'active');
        document.getElementById("tabs_cont").scrollIntoView(true);

    })
});

//function to duplicate the table so it can be added under its tab
function duplicate_table(table_var) {
    //get table by ID
    var table = document.getElementById(table_var);

    //duplicates table and resets the ID to make it a completely different
    //table
    var duplicate = table.cloneNode(true);
    duplicate.id="";
    return duplicate;
}

//function to actually create the tab
function create_new_tab(tab_length){
    //create variables for the list item and the link
    var new_tab = document.createElement("li");
    var new_link = document.createElement('a');
    

    //sets the text of the tab title
    new_link.innerHTML = 'Tab ' + tab_length;

    //sets the link to the new table
    new_link.href = '#' + 'Col-' + get_low_col() +'-' + get_high_col() + '-Row-'+
    get_low_row() + '-' + get_high_row();


    //appends new link to tab
    new_tab.appendChild(new_link);
    document.getElementById("tabs_list").appendChild(new_tab);
    numtabs++;
}

var numtabs = 1;
//function to add a new tab to the list of tabs
function add_tab(){
     
    //Make sure values are valid before adding to a tab
    if(!($("#form").validate().form())){ 
        return; 
    } 

    //show the tab elements now that there will actually be one
    $("#tabs_cont").tabs().show();
    $(".tabs_button").show();

    //calls create tab function
    create_new_tab(numtabs);

    //gets new table
    var div = document.createElement("div");
    div.id = 'Col-' + get_low_col() +'-' + get_high_col() + '-Row-'+
    get_low_row() + '-' + get_high_row();
    div.class = "new_table";
    
    //calls the function to duplicate the table and set it to a var
    var table_dupe = duplicate_table("multiplication_table");

    //add the new table and refresh the tabs
    div.appendChild(table_dupe);
    document.getElementById("tabs_cont").appendChild(div);
    $("#tabs_cont").tabs("refresh");

};

//////////////////////////////////////////////////////////////////////////
////////////////////////////    Fin.    //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////