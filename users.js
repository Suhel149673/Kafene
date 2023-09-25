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
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        function (data) {           
            data.map((item) => {
                createRows(item)              
            })
            searchFun();
            $('#resetBtn').click(function (e) { 
                e.preventDefault();
                $('#searchBox').val('');
                $('#table-data tr').css('display','')
            });
        },
    );
    function createRows(data) {
        let tr = (`
        <tr class="table-row">
            <td class="text-secondary">${data.id}</td>
            <td class="text-secondary"><img src=${data.profilePic}/></td>
            <td class="text-secondary">${data.fullName}</td>
            <td class="text-primary">${data.dob}</td>
            <td class="text-secondary">${data.gender}</td>
            <td class="text-secondary">${data.currentCity}, ${data.currentCountry}</td>
        </tr>`)
        $('#table-data').append(tr);
    }


    const searchFun = () => {
        $('#searchForm').submit((e) => {
            let searchValue = document.getElementById('searchBox').value.toUpperCase();
            e.preventDefault();
            if (searchValue.length < 2) {
                alert('Please enter atleast 2 characters');
                $('#table-data tr').css('display','')
            } else {
                $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchValue}`,
                    function () {

                        let tablebody = document.getElementById('table-data');
                        let tr = tablebody.getElementsByTagName('tr');
                        for (let i = 0; i < tr.length; i++) {
                            let td = tr[i].getElementsByTagName('td')[2];
                            if (td) {
                                let textValue = td.textContent || td.innerHTML;

                                if (textValue.toUpperCase().indexOf(searchValue) > -1) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = 'none';
                                }
                            }
                        }
                    },
                );
            }
        })
    }
});