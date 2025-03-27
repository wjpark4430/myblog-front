document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("post-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // 기본 form 제출 막기

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        const postData = {
            title: title,
            content: content
        };

        try {
            const response = await fetch("/api/boards", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json" // JSON 형식으로 보냄
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error("서버 응답이 실패했습니다.");
            }

            const result = await response.json();

            window.location.href = `/boards/${result.id}`;
        } catch (error) {
            console.error("게시물 작성 실패:", error);
            alert("게시물 작성 중 오류가 발생했습니다.");
        }
    });
});
