let socket = io();
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const message = document.querySelector("#message");

    chatForm.onsubmit = e => {
        e.preventDefault();

        socket.emit(
            "send-message",
            {
                user: "John Doe",
                message: message.value,
                time: new Date(),
            },
            status => {
                const { status: stat, data } = status;

                if (stat) {
                    message.value = "";
                    const chatOutput = document.querySelector(".chat__output");
                    let p = document.createElement("p");
                    p.classList.add("host");
                    let msg = document.createElement("span");
                    msg.classList.add("message");
                    msg.innerHTML = data.message;
                    let author = document.createElement("span");
                    author.classList.add("name");
                    author.innerHTML = "self";
                    let t = document.createElement("span");
                    t.classList.add("time");
                    t.innerHTML = data.time;
                    p.appendChild(msg);
                    p.appendChild(author);
                    p.appendChild(t);

                    chatOutput.appendChild(p);
                    chatOutput.scrollTop = chatOutput.scrollHeight;
                }
            },
        );
    };

    socket.on("new-message", ({ data }) => {
        const chatOutput = document.querySelector(".chat__output");
        const { message, user, time } = data;

        let p = document.createElement("p");
        p.classList.add("guest");
        let msg = document.createElement("span");
        msg.classList.add("message");
        msg.innerHTML = message;
        let author = document.createElement("span");
        author.classList.add("name");
        author.innerHTML = user;
        let t = document.createElement("span");
        t.classList.add("time");
        t.innerHTML = time;
        p.appendChild(msg);
        p.appendChild(author);
        p.appendChild(t);

        chatOutput.appendChild(p);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });
});
