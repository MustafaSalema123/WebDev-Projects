var dataTable;


$(document).ready(function () {
    loadDataTable();

});


function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url:'/Admin/user/getall'},
        "columns": [
            { data: 'name', "width": "25%" },
            { data: 'email', "width": "15%" },
            { data: 'phoneNumber', "width": "10%" },
            { data: 'company.name', "width": "15%" },
            { data: 'role', "width": "10%" }

    
        ]
    });


} 
