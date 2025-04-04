document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('signup-form');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const userId = document.getElementById("user-id").value; 
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // 비밀번호 확인
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userData = {
            username: username,
            email: email,
            userId: userId,
            password: password
        };

        try {
            const response = await fetch("/api/member/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert("회원가입 성공! 로그인 페이지로 이동합니다.");
                window.location.href = "/login"; // 로그인 페이지로 이동
            } else {
                const errorData = await response.json();
                alert(`회원가입 실패: ${errorData.message}`);
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert("서버와의 연결에 문제가 발생했습니다.");
        }
    });
});
