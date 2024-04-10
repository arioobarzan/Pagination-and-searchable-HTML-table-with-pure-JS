var rowsPerPage = 10;
function searchTable(inputId, tableId) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(inputId);
    filter = input.value.toUpperCase();
    if (filter == '') {
        refresh_pagination(tableId,"", false);
        return;
    }
    table = document.getElementById(tableId);
    tr = table.getElementsByTagName('tr');

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1]; 
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

function showPage(page, tableId) {
    var start = (page - 1) * rowsPerPage;
    var end = start + rowsPerPage;
    var table = document.getElementById(tableId);
    var rows = table.getElementsByTagName('tr');
	document.querySelectorAll("a[class^='link_']").forEach(function(link) {
        link.style.color = "blue";
    });
    
    var currentPageLink = document.querySelector(".link_" + page);
    if (currentPageLink) {
        currentPageLink.style.color = "black";
    }
    
    for (var i = 1; i < rows.length; i++) {
        if (i <= start || i >= end + 1) {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = 'table-row';
        }
    }
}

function updatePagination(paginId, currentPage, tableId) {
	
	var table = document.getElementById(tableId);
    var totalRows = table.getElementsByTagName('tr').length;

	var totalPages = Math.ceil(totalRows / rowsPerPage);
	
    var pagin = document.getElementById(paginId);
    var links = 'صفحه: ';

    for (var i = 1; i <= totalPages; i++) {
        links += '<a href="#" class="link_' + i + '" onclick="showPage(' + i + ', \'' + tableId + '\')">' + i + '</a> ';
    }
    pagin.innerHTML = links;
}

function refresh_pagination(tableId, searchId, first, paginId="pagin") {
	if(first){
		updatePagination(paginId, 1, tableId);
		document.getElementById(searchId).innerHTML = "جستجو: <input type='text' id='searchInput' placeholder='جستجو...' onkeyup='searchTable(\"searchInput\", \""+tableId+"\")'>";
	}
    showPage(1, tableId);
	
}