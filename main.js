document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("refreshBtn");
  const sortByNameBtn = document.getElementById("sortByNameBtn");
  const sortByEmailBtn = document.getElementById("sortByEmailBtn");
  const filterInput = document.getElementById("filterInput");
  const userList = document.getElementById("userList");
  const errorMessage = document.getElementById("errorMessage");

  refreshBtn.addEventListener("click", () => {
    toggleButtonColor(refreshBtn);
    fetchUsers();
  });
  sortByNameBtn.addEventListener("click", () => {
    toggleButtonColor(sortByNameBtn);
    sortUsers("name");
  });
  sortByEmailBtn.addEventListener("click", () => {
    toggleButtonColor(sortByEmailBtn);
    sortUsers("email");
  });

  let usersData = [];

  function toggleButtonColor(button) {
    button.classList.toggle("clicked");
  }

  function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        usersData = data;
        displayUsers(usersData);
        errorMessage.textContent = "";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        errorMessage.textContent =
          "Error fetching data. Please try again later.";
        userList.innerHTML = "";
      });
  }

  function displayUsers(users) {
    userList.innerHTML = "";
    users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";
      userCard.innerHTML = `<h3>${user.name}</h3><p>Email: ${user.email}</p><p>Phone: ${user.phone}</p>`;
      userList.appendChild(userCard);
    });
  }

  function sortUsers(key) {
    usersData.sort((a, b) => a[key].localeCompare(b[key]));
    displayUsers(usersData);
  }

  function filterUsers() {
    const searchTerm = filterInput.value.toLowerCase();
    const filteredUsers = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
  }

  filterInput.addEventListener("input", filterUsers);
  fetchUsers();
});
