document.addEventListener("DOMContentLoaded", function () {
    // Function to set the background image
    function setBackgroundImage() {
        // Specify the collection ID from Unsplash
        const collectionId = "25161643"; // Replace with your actual collection ID

        // Call Unsplash API to get a random image from the specified collection
        fetch(`https://source.unsplash.com/collection/${collectionId}/random`)
            .then(response => {
                // Get the URL of the random image
                let imageUrl = response.url;

                // Set the background image
                document.getElementById("background").style.backgroundImage = `url('${imageUrl}')`;
            })
            .catch(error => console.error("Error fetching image:", error));
    }

    // Function to fetch a random quote with the author
    function fetchQuote() {
        return fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(data => {
                return {
                    quote: data.content,
                    author: data.author
                };
            })
            .catch(error => {
                console.error("Error fetching quote:", error);
                return {
                    quote: "An error occurred while fetching the quote.",
                    author: "Unknown"
                };
            });
    }

    // Function to update the quote and author
    function updateQuote() {
        fetchQuote().then(result => {
            document.getElementById("quote").textContent = `"${result.quote}"`;
            document.getElementById("author").textContent = `- ${result.author}`;
        });
    }

    function updateTodoList() {
        const todoList = document.getElementById("todoList");
        todoList.innerHTML = '';

        // Retrieve stored tasks from chrome storage
        chrome.storage.local.get('todoistTasks', function (result) {
            const tasks = result.todoistTasks || [];

            tasks.forEach(task => {
                const li = document.createElement("li");
                li.textContent = task.content;
                todoList.appendChild(li);
            });
        });
    }

    // Initial content setup on page load
    setBackgroundImage();
    updateQuote();
    updateTodoList();

    // Get Quote button event listener
    document.getElementById("getQuoteButton").addEventListener("click", updateQuote);

    // Refresh button event listener
    document.getElementById("refreshButton").addEventListener("click", function () {
        setBackgroundImage();
        updateQuote();
    });

    // Add Todo button event listener
    document.getElementById("addTodoButton").addEventListener("click", addTodo);
});
