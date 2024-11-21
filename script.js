const output = document.getElementById('output');
const API_KEY = 'b9a55314792171de11a199b3691f76ea0c4719e47a4729791b1430cffec340a4';
const BASE_URL = 'https://gorest.co.in/public/v2/users';

function getData() {
    fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched Data:', data);  
        if (data && data.length > 0) {
            output.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`; 
        } else {
            output.innerHTML = 'No data found or empty response.'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);  
        output.innerHTML = 'Failed to fetch data. Please check the console for details.';
    });
}

document.getElementById('addUserForm').addEventListener('submit', function(e) {
    e.preventDefault();  
    
    const name = document.getElementById('addName').value;
    const email = document.getElementById('addEmail').value;
    const gender = document.getElementById('addGender').value;
    const status = document.getElementById('addStatus').value;
    
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            gender: gender,
            status: status
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('User Added:', data);
        getData(); 
    })
    .catch(error => console.error('Error:', error));
});


document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();  

    const userId = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const status = 'active'; 


    if (!userId || !name || !email) {
        alert('Please provide all fields: User ID, Name, and Email.');
        return;
    }

    fetch(`${BASE_URL}/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            status: status
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(JSON.stringify(err)); 
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('User Updated:', data);  
        getData(); 
    })
    .catch(error => {
        console.error('Error:', error); 
        alert(`Error: ${error.message}`);  
    });
});

function deleteUser() {
    const userId = document.getElementById('deleteUserId').value;
    
    fetch(`${BASE_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    })
    .then(response => {
        if (response.status === 204) {
            console.log('User Deleted');
            getData();
        } else {
            console.log('Failed to delete user');
        }
    })
    .catch(error => console.error('Error:', error));
}
