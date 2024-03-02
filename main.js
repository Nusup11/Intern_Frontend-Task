document.addEventListener("DOMContentLoaded", function () {
  const refreshBtn = document.getElementById("refreshBtn");
  const sortByNameBtn = document.getElementById("sortByNameBtn");
  const sortByEmailBtn = document.getElementById("sortByEmailBtn");
  const filterInput = document.getElementById("filterInput");
  const userList = document.getElementById("userList");
  const errorMessage = document.getElementById("errorMessage");

  refreshBtn.addEventListener("click", fetchUsers);
  sortByNameBtn.addEventListener("click", () => sortUsers("name"));
  sortByEmailBtn.addEventListener("click", () => sortUsers("email"));
  filterInput.addEventListener("input", filterUsers);

  let usersData = [];

  function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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
      userCard.classList.add("user-card");
      userCard.innerHTML = `<h3>${user.name}</h3><p>Email: ${user.email}</p><p>Phone: ${user.phone}</p>`;
      userList.appendChild(userCard);
    });
  }

  function sortUsers(key) {
    usersData.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    displayUsers(usersData);
  }

  function filterUsers() {
    const searchTerm = filterInput.value.toLowerCase();
    const filteredUsers = usersData.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    displayUsers(filteredUsers);
  }

  fetchUsers();
});
