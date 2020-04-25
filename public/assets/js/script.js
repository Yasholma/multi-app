document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.onsubmit = e => {
        e.preventDefault();
        const item = document.querySelector("#item");
        const duration = document.querySelector("#duration");

        const todo = {
            item: item.value,
            duration: duration.value,
            completed: 0,
        };

        fetch("/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        })
            .then(response => response.json())
            .then(res => {
                location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Completed Todo Action
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkboxe => {
        checkboxe.onclick = function (e) {
            e.preventDefault();
            const itemId = e.currentTarget.id;

            fetch(`/todo/${itemId}`, { method: "PUT" })
                .then(response => response.json())
                .then(res => {
                    location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        };
    });

    // Delete Todo
    const deleteBtns = document.querySelectorAll(".delete").forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const itemId = e.currentTarget.id;

            fetch(`/todo/${itemId}`, { method: "DELETE" })
                .then(res => {
                    location.reload();
                })
                .catch(err => {
                    console.log(err);
                });
        };
    });
});
