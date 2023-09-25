$(document).ready(function () {
    if(localStorage.getItem('login') !== 'true'){
        location.assign('./index.html')
    }
    const logoutButton = document.getElementById('logout');
    logoutButton.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('login', false)
        location.assign('./index.html')
    }
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
        function (data) {
            data.map((item) => {    
                createRows(item)
                $('#count').html(data.length)
            })
        },
    );
    function createRows(data) {
        let tr = (`
        <tr class="table-row">
            <td class="text-secondary">${data.id}</td>
            <td class="text-primary">${data.medicineName}</td>
            <td class="text-secondary">${data.medicineBrand}</td>
            <td class="text-primary">${data.expiryDate}</td>
            <td class="text-secondary">$${data.unitPrice}</td>
            <td class="text-secondary">${data.stock}</td>
        </tr>`)
        $('#table-data').append(tr);
    }

    var Lowstock = document.getElementById('Lowstock');
    Lowstock.addEventListener('change', function (e) {
        e.preventDefault();
        let tablebody = document.getElementById('table-data');
        let tr = tablebody.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[5];
            if (td) {
                let textValue = td.textContent || td.innerHTML;
                if (textValue < 100){
                    if(this.checked === true){
                        tr[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1 );
                    }else{
                        tr[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1 );
                    }     
                }
            }
        }
    })

    
    var Expired = document.getElementById('Expired');
    Expired.addEventListener('change', function (e) {
        e.preventDefault();
        let tablebody = document.getElementById('table-data');
        let tr = tablebody.getElementsByTagName('tr');
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td')[3];
            if (td) {
                let textValue = myParser(td.textContent || td.innerHTML);
                if (new Date(textValue).getTime() < new Date().getTime()){
                    if(this.checked === true){
                        tr[i].style.display = "";
                        $('#count').html(parseInt($('#count').html()) + 1 );
                    }else{
                        tr[i].style.display = "none";
                        $('#count').html(parseInt($('#count').html()) - 1 );
                    }     
                }
            }
        }
    })


   

    function myParser (date) {
        var arr = date.split('-');
        return arr.join(' ')
    }
});