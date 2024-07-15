document.addEventListener('DOMContentLoaded', () => {
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            displayUsers(users);
        });
});

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <img src="${user.profilePicture}" alt="${user.name}">
            <h2>${user.name}</h2>
            <p class="job-pos">${user.jobPosition}</p>
            <p class="email"><i class="fa-regular fa-envelope"></i>${user.email}</p>
            <p class="adress"><i class="fa-regular fa-address-card"></i>${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(userCard);
    });
}

function filterUsers() {
    const query = document.getElementById('search').value.toLowerCase();
    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const filteredUsers = users.filter(user => {
                return user.name.toLowerCase().includes(query) ||
					user.email.toLowerCase().includes(query) ||
					user.address.street.toLowerCase().includes(query) ||
					user.address.city.toLowerCase().includes(query) ||
					user.jobPosition.toLowerCase().includes(query);
            });
            displayUsers(filteredUsers);
        });
}
