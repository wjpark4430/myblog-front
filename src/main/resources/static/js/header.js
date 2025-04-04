document.addEventListener("DOMContentLoaded", function () {
    const authButton = document.getElementById("auth-button");

    fetch("/api/auth/check", { credentials: "include" })
        .then(response => {
            if (response.ok) {
                // 로그인 상태일 때
                authButton.textContent = "Logout";
                authButton.href = "#";
                authButton.addEventListener("click", function () {
                    fetch("/api/logout", { method: "POST", credentials: "include" })
                        .then(() => {
                            alert("로그아웃 되었습니다.");
                            window.location.reload();
                        });
                });
            } else {
                throw new Error("로그인되지 않음");
            }
        })
        .catch(error => {
            // 로그인 상태가 아닐 때
            console.log("로그인 상태 아님:", error);
            authButton.textContent = "Login";
            authButton.href = "/login";
        });
});
