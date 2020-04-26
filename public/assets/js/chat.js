function autoScroll() {
    const chatOutputLastChild = document.querySelector(".chat__output")
        .lastElementChild;
    chatOutputLastChild.scrollIntoView({ behavior: "smooth" });
}

function createMessage(userType, message, time, user = "Self") {
    const chatOutput = document.querySelector(".chat__output");
    let p = document.createElement("p");
    p.classList.add(userType);
    let msg = document.createElement("span");
    msg.classList.add("message");
    msg.innerHTML = message;
    let author = document.createElement("span");
    author.classList.add("name");
    author.style.marginRight = "0.2rem";
    author.innerHTML = user;
    let t = document.createElement("span");
    t.classList.add("time");
    t.innerHTML = time;
    p.appendChild(msg);
    p.appendChild(author);
    p.appendChild(t);
    chatOutput.appendChild(p);
}

let socket = io();
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chat-form");
    const message = document.querySelector("#message");
    const chatOutput = document.querySelector(".chat__output");

    // Manual Scroll Init
    let manualScroll = false;
    let currentScrollTop = chatOutput.scrollTop;

    chatOutput.addEventListener("scroll", function () {
        currentScrollTop = this.scrollTop;
    });

    chatForm.onsubmit = e => {
        e.preventDefault();
        socket.emit(
            "send-message",
            {
                user: "John Doe",
                message: message.value,
                time: moment().format(),
            },
            status => {
                const { status: stat, data } = status;

                if (stat) {
                    message.value = "";
                    createMessage("host", data.message, data.time);
                    autoScroll();
                }
            },
        );
    };

    socket.on("new-message", ({ data }) => {
        const { message, user, time } = data;
        // createMessage("guest", message, time, user);

        // autoScroll();
        const chatOutput = document.querySelector(".chat__output");
        const ch = chatOutput.clientHeight;
        const sh = chatOutput.scrollHeight;
        const st = chatOutput.scrollTop;

        if (sh - ch <= st + 3) {
            createMessage("guest", message, time, user);
            autoScroll();
        } else {
            createMessage("guest", message, time, user);
        }
    });
});
